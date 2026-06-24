import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/reducedMotion";
import { stats, statsLayout } from "./heroConfig";
import type { PhaseId } from "./types";

// HERO_REST → STATS morph (Section 6). The pills DON'T disappear — a subset
// MORPH IN PLACE into the STATS circles (4 black stat circles + 10 grey
// drifters); the rest pop down (handled by buildHeroMaster). Everything is a
// plain property tween living inside the SCRUBBED master timeline, so the pills
// visibly travel + grow into circles as the user scrolls and reverse for free
// on scroll-back. Mirrors HeroRestController's shape (own measurement + ambient
// micro-system), wired through the same onPhaseChange hook.
//
// Coordinate space: after setupAbsolute() the grid is frozen and every pill is
// absolutely positioned at its design-px (1280 canvas) flow slot. Targets are
// computed grid-relative in that SAME design space (no scale math — the whole
// canvas is then CSS-scaled by <Hero>, exactly like TagFlow's writes). The
// headline/circles share one origin: the grid centre (640, gridH/2).

const REST_PILL = "#eef1f4"; // HeroRestController ghost bg — the morph's from-bg
const STAT_BG = "#0f0f0f";
const DECOR_BG = "rgba(234,237,241,0.6)";
const FROM_FONT = "ui-monospace, 'SF Mono', Menlo, monospace"; // Geist Mono fallback

type Carrier = {
  el: HTMLElement;
  label: HTMLElement | null;
  inner: HTMLElement | null;
  role: "stat" | "dec";
  homeW: number;
  homeH: number;
  toX: number;
  toY: number;
  size: number;
};

export class StatsController {
  private readonly stage: HTMLElement;
  private carriers: Carrier[] = [];
  private grid: HTMLElement | null = null;
  private prepared = false;
  private destroyed = false;
  private drifts: gsap.core.Tween[] = [];
  private drifting = false;

  constructor(stage: HTMLElement) {
    this.stage = stage;
    if (process.env.NODE_ENV !== "production") {
      (window as unknown as { __sc?: StatsController }).__sc = this;
    }
  }

  /** Freeze the flex grid + pin every pill absolutely at its flow slot, ONCE.
   *  Lets the morph tween width/height/x/y without ever reflowing the grid
   *  (height growth pill→circle would otherwise shove whole rows). Transparent
   *  to TagFlow: positions are unchanged, it still drives translate x/y. */
  private setupAbsolute(pills: HTMLElement[]): void {
    if (this.prepared || !pills.length) return;
    const grid = pills[0].parentElement;
    if (!grid) return;
    this.grid = grid;
    grid.style.position = "relative";
    // Read flow boxes BEFORE detaching anything from flow.
    const boxes = pills.map((el) => ({
      el,
      l: el.offsetLeft,
      t: el.offsetTop,
      w: el.offsetWidth,
      h: el.offsetHeight,
    }));
    grid.style.width = `${grid.offsetWidth}px`;
    grid.style.height = `${grid.offsetHeight}px`;
    for (const b of boxes) {
      b.el.style.position = "absolute";
      b.el.style.left = `${b.l}px`;
      b.el.style.top = `${b.t}px`;
      b.el.style.width = `${b.w}px`;
      b.el.style.height = `${b.h}px`;
      b.el.style.margin = "0";
    }
    this.prepared = true;
  }

  /** Assign carrier pills (deterministic greedy nearest, stats first → short
   *  travel for the meaningful ones) + inject stat content. Run once, at build. */
  measureTargets(): void {
    const pills = gsap.utils.toArray<HTMLElement>("[data-tag]", this.stage);
    if (!pills.length) return;
    this.setupAbsolute(pills);
    const grid = this.grid;
    if (!grid) return;

    const gridH = grid.offsetHeight;
    const { spreadX, spreadY, figmaAnchorY, statSize } = statsLayout;
    // Figma centre → grid-relative design coords (canvas centre = grid centre).
    const map = (fx: number, fy: number) => ({
      x: 640 + (fx - 720) * spreadX,
      y: gridH / 2 + (fy - figmaAnchorY) * spreadY,
    });

    const homes = pills.map((el) => ({
      el,
      left: el.offsetLeft,
      top: el.offsetTop,
      cx: el.offsetLeft + el.offsetWidth / 2,
      cy: el.offsetTop + el.offsetHeight / 2,
      w: el.offsetWidth,
      h: el.offsetHeight,
    }));
    const taken = new Set<number>();
    const claim = (tx: number, ty: number): number => {
      let best = -1;
      let bestD = Infinity;
      homes.forEach((h, j) => {
        if (taken.has(j)) return;
        const d = Math.hypot(h.cx - tx, h.cy - ty);
        if (d < bestD) {
          bestD = d;
          best = j;
        }
      });
      if (best >= 0) taken.add(best);
      return best;
    };

    const carriers: Carrier[] = [];
    const make = (
      j: number,
      role: "stat" | "dec",
      t: { x: number; y: number },
      size: number,
    ): Carrier => {
      const h = homes[j];
      // The pill is absolutely pinned at (left, top) and the morph grows
      // width/height to `size` from that top-left corner — so the FINAL centre is
      // (left + toX + size/2). Solve toX/toY so that centre lands on the target.
      return {
        el: h.el,
        label: h.el.querySelector<HTMLElement>("[data-tag-label]"),
        inner: h.el.querySelector<HTMLElement>("[data-circle-inner]"),
        role,
        homeW: h.w,
        homeH: h.h,
        toX: t.x - h.left - size / 2,
        toY: t.y - h.top - size / 2,
        size,
      };
    };

    // 4 stat circles first (each grabs its nearest pill + gets the stat content).
    statsLayout.stats.forEach((c, i) => {
      const t = map(c.fx, c.fy);
      const j = claim(t.x, t.y);
      if (j < 0) return;
      const carrier = make(j, "stat", t, statSize);
      this.fillStat(carrier, i);
      carriers.push(carrier);
    });
    // 10 grey decoratives take the nearest remaining pills.
    statsLayout.decoratives.forEach((c) => {
      const t = map(c.fx, c.fy);
      const j = claim(t.x, t.y);
      if (j < 0) return;
      carriers.push(make(j, "dec", t, c.size));
    });

    this.carriers = carriers;
  }

  /** Inject the stat number + caption into a stat carrier's circle face. */
  private fillStat(c: Carrier, statIndex: number): void {
    const data = stats[statIndex];
    if (!c.inner || !data) return;
    c.inner.replaceChildren();
    const num = document.createElement("span");
    num.textContent = data.value;
    num.style.fontFamily = FROM_FONT;
    num.className =
      "font-bold text-white text-[38px] leading-[38px] tracking-[-0.76px]";
    const cap = document.createElement("span");
    cap.textContent = data.caption ?? "";
    cap.className = "text-white text-[15px] leading-[19.6px] tracking-[0.5px]";
    c.inner.append(num, cap);
  }

  /** The carrier elements — buildHeroMaster filters them out of the pop-down. */
  carrierEls(): HTMLElement[] {
    return this.carriers.map((c) => c.el);
  }

  /** Add the carrier morph to the master at segment time `at` (= 0). One tween
   *  per channel, EXPLICIT numeric endpoints (immediateRender:false, repo
   *  convention) so the scrub interpolates both ways → reverse is free. */
  buildSegment(master: gsap.core.Timeline, at: number): void {
    this.carriers.forEach((c, i) => {
      const t0 = at + i * 0.004; // tiny stagger so the field blooms, not snaps
      // Geometry — SPRINGS into the circle (overshoot + settle, not a hard snap).
      // Starts from the pill's LIVE rest translate (physics displaces the corner
      // carriers ~200px out to clear the headline; it's frozen at commit BEFORE
      // the scrub renders this, so the function-from captures that offset → the
      // morph glides from where the pill actually sits, no snap-to-home jump).
      master.fromTo(
        c.el,
        {
          x: () => +gsap.getProperty(c.el, "x"),
          y: () => +gsap.getProperty(c.el, "y"),
          width: c.homeW,
          height: c.homeH,
        },
        {
          x: c.toX,
          y: c.toY,
          width: c.size,
          height: c.size,
          duration: 0.65,
          ease: "back.out(1.5)",
          immediateRender: false,
        },
        t0,
      );
      // Background colour — smooth, NO overshoot (a spring on colour reads wrong).
      master.fromTo(
        c.el,
        { backgroundColor: REST_PILL },
        {
          backgroundColor: c.role === "stat" ? STAT_BG : DECOR_BG,
          duration: 0.4,
          ease: "power2.inOut",
          immediateRender: false,
        },
        t0,
      );
      if (c.label) {
        master.to(
          c.label,
          { opacity: 0, duration: 0.25, ease: "power1.in", immediateRender: false },
          t0,
        );
      }
      if (c.role === "stat" && c.inner) {
        master.fromTo(
          c.inner,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: "power2.out", immediateRender: false },
          t0 + 0.3,
        );
      }
    });
  }

  // ── ambient drift (STATS dwell only) ────────────────────────────────────────
  // Writes xPercent/yPercent — a SEPARATE gsap transform channel from the
  // master's x/y (px), so the two compose in one translate without overwriting.
  private startDrift(): void {
    if (this.drifting || this.destroyed || prefersReducedMotion()) return;
    this.drifting = true;
    this.carriers.forEach((c, i) => {
      // % of own size → a CLEARLY-VISIBLE bob, like a bubble drifting in a soda.
      // x and y are SEPARATE tweens with different periods so each circle traces
      // a continuous organic ellipse, never wandering far. Plain `to` (from the
      // settled xPercent 0) so there's no jump when drift kicks in; varied
      // directions/periods keep the field from pulsing in sync. The GREY
      // decoratives swing ~2× as far AND faster than the black stat circles.
      const isStat = c.role === "stat";
      const amp = isStat ? 7 : 18; // greys are smaller, so a bigger % to clear ~2× the px swing
      const durX = (isStat ? 3.2 : 1.8) + (i % 5) * 0.4;
      const durY = (isStat ? 3.8 : 2.2) + (i % 4) * 0.4; // ≠ x → elliptical
      const ax = (i % 2 ? 1 : -1) * amp;
      const ay = (i % 3 === 0 ? 1 : -1) * amp * 0.85;
      this.drifts.push(
        gsap.to(c.el, {
          xPercent: ax,
          duration: durX,
          delay: (i % 6) * 0.2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          overwrite: "auto", // only the drift channel — never the master's x/y
        }),
        gsap.to(c.el, {
          yPercent: ay,
          duration: durY,
          delay: (i % 5) * 0.25,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          overwrite: "auto",
        }),
      );
    });
  }

  private stopDrift(): void {
    if (!this.drifting) return;
    this.drifting = false;
    for (const d of this.drifts) d.kill();
    this.drifts = [];
    // Ease the drift channel back to 0 (don't hard-snap — the bob is ~15px now)
    // so leaving STATS doesn't jolt the circles by their drift offset.
    // overwrite "auto" (NOT true) — true would also kill the master's morph
    // tweens on these same elements, so the circles never re-form on a 2nd visit.
    gsap.to(this.carrierEls(), {
      xPercent: 0,
      yPercent: 0,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });
  }

  onPhase(phase: PhaseId): void {
    if (phase === "STATS") this.startDrift();
    else this.stopDrift();
  }

  destroy(): void {
    this.destroyed = true;
    this.stopDrift();
  }
}
