import { gsap } from "@/lib/gsap";
import type { StatsController } from "./StatsController";

// STATS → BENEFITS (Section 7). The 3 STATS headline words TRAVEL up + shrink
// into a single horizontal line near the top (continuity — the same live spans
// reflow, never cross-fade); "Benefits" stays orange while "Compliance" and
// "People ops" recolour grey. Meanwhile the circles pop down and the black
// "one team" word + the CTA leave. All plain property tweens inside the SCRUBBED
// master, so it reverses for free. Twin of StatsController; the circle pop-down
// is delegated to StatsController (it owns the carriers).
//
// Coordinate space: a hidden, real-48px [data-h-benefits] jig is laid out at the
// target slot; we measure each word's UNSCALED design-space centre (gBCR÷scale,
// the TagFlow/StatsController convention) and travel the live span centre→centre
// in raw design px (the canvas then CSS-scales it). The SHRINK is a transform
// scale (cheap, scrub-interpolable); the inter-word GAPS come from the measured
// 48px line so the joined-line spacing is pixel-correct.

const ORANGE = "#ff6c16";
const GREY = "#d8d8d8"; // matches Figma node 13:290 (NOT --color-grey-word #c6c6c6)
const STATS_SIZE = 78;
const BENEFITS_SIZE = 42; // docked top-line size (must match the [data-h-benefits] jig)

type Word = {
  live: HTMLElement;
  toX: number;
  toY: number;
  toScale: number;
  active: boolean;
};

export class BenefitsController {
  private readonly stage: HTMLElement;
  private readonly stats: StatsController;
  private readonly oneTeam: HTMLElement | null;
  private readonly cta: HTMLElement | null;
  private readonly content: HTMLElement | null;
  private words: Word[] = [];

  constructor(stage: HTMLElement, stats: StatsController) {
    this.stage = stage;
    this.stats = stats;
    this.oneTeam = stage.querySelector<HTMLElement>("[data-stat-oneteam]");
    this.cta = stage.querySelector<HTMLElement>("[data-cta]");
    this.content = stage.querySelector<HTMLElement>("[data-benefits-content]");
    if (process.env.NODE_ENV !== "production") {
      (window as unknown as { __bc?: BenefitsController }).__bc = this;
    }
  }

  // Canvas scale = how much the fitRef is CSS-scaled. Read it off the JIG (it's
  // inside the canvas but NOT INTRO-scaled like the pills — a pill at build time
  // is mid-pop at scale:0, which would give 0 → NaN deltas).
  private scale(): number {
    const j = this.stage.querySelector<HTMLElement>("[data-h-benefits]");
    return j && j.offsetWidth ? j.getBoundingClientRect().width / j.offsetWidth : 1;
  }

  /** Measure each live STATS word's centre + its hidden-jig target centre, in
   *  unscaled design space, and store the travel delta + shrink. Run once at
   *  build (the headline + jig are laid out, like StatsController.measureTargets). */
  measureTargets(): void {
    const s = this.scale();
    const stageR = this.stage.getBoundingClientRect();
    const ds = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      return {
        cx: (r.left - stageR.left + r.width / 2) / s,
        cy: (r.top - stageR.top + r.height / 2) / s,
      };
    };
    const words: Word[] = [];
    for (let i = 0; i < 3; i++) {
      const live = this.stage.querySelector<HTMLElement>(`[data-stat-word="${i}"]`);
      const tgt = this.stage.querySelector<HTMLElement>(`[data-bn-word="${i}"]`);
      if (!live || !tgt) continue;
      const L = ds(live);
      const T = ds(tgt);
      words.push({
        live,
        toX: T.cx - L.cx,
        toY: T.cy - L.cy,
        toScale: BENEFITS_SIZE / STATS_SIZE,
        active: i === 0,
      });
    }
    this.words = words;
  }

  /** Segment 1 (STATS → BENEFITS) at master-time `at`. */
  buildSegment(master: gsap.core.Timeline, at: number): void {
    // The field clears FIRST: circles pop down, "one team" leaves.
    this.stats.popDown(master, at);
    if (this.oneTeam) {
      master.to(
        this.oneTeam,
        { opacity: 0, scale: 0.9, y: -8, transformOrigin: "50% 50%", duration: 0.3, ease: "power2.in", immediateRender: false },
        at,
      );
    }
    // The CTA is a HERO_REST/STATS element only — it fades out on STATS → BENEFITS
    // and never returns. fromTo so it scrubs back in on reverse.
    if (this.cta) {
      master.fromTo(
        this.cta,
        { opacity: 1 },
        { opacity: 0, duration: 0.3, ease: "power2.in", immediateRender: false },
        at,
      );
    }

    // …then the words reflow (a beat's lead-overlap so they rise as circles fall).
    const reflowAt = at + 0.05;
    for (const w of this.words) {
      master.fromTo(
        w.live,
        { x: 0, y: 0, scale: 1, transformOrigin: "50% 50%" },
        {
          x: w.toX,
          y: w.toY,
          scale: w.toScale,
          duration: 0.6,
          ease: "power3.inOut",
          immediateRender: false,
        },
        reflowAt,
      );
      if (!w.active) {
        master.fromTo(
          w.live,
          { color: ORANGE },
          { color: GREY, duration: 0.45, ease: "power2.inOut", immediateRender: false },
          reflowAt,
        );
      }
    }
    // The BENEFITS page content fades in (with a faint rise) once the words dock.
    if (this.content) {
      master.fromTo(
        this.content,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", immediateRender: false },
        at + 0.55,
      );
    }
  }

  /** Fade the page content out when LEAVING BENEFITS (→ COMPLIANCE). fromTo (not
   *  `to`) so it scrubs back in on reverse. */
  fadeOutContent(master: gsap.core.Timeline, at: number): void {
    if (!this.content) return;
    master.fromTo(
      this.content,
      { opacity: 1, y: 0 },
      { opacity: 0, y: 24, duration: 0.35, ease: "power2.in", immediateRender: false },
      at,
    );
  }

  /** Later phases (COMPLIANCE / PEOPLE_OPS): shift which word is active (orange).
   *  Geometry holds — pure colour crossfade on the already-placed spans. EXPLICIT
   *  fromTo endpoints (NOT a `to` whose recorded start can't be scrubbed in
   *  reverse) so the swap reverses cleanly on scroll-back. */
  setActiveWord(
    master: gsap.core.Timeline,
    at: number,
    fromActive: number,
    toActive: number,
  ): void {
    this.words.forEach((w, i) => {
      const from = i === fromActive ? ORANGE : GREY;
      const to = i === toActive ? ORANGE : GREY;
      if (from === to) return; // this word's colour doesn't change
      master.fromTo(
        w.live,
        { color: from },
        { color: to, duration: 0.4, ease: "power2.inOut", immediateRender: false },
        at,
      );
    });
  }

  destroy(): void {}
}
