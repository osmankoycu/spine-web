import { gsap } from "@/lib/gsap";
import { TagFlow } from "./TagFlow";
import { rotatingWords } from "./heroConfig";
import type { PhaseId } from "./types";

const DWELL = 1.8; // seconds a rotating word is shown before swapping
// In HERO_REST the whole tag field reads as ghosted: the black "important" tags
// fade their TEXT to the page colour, and EVERY pill's grey bg lightens toward
// the page so the field recedes behind the headline (less visible).
const GHOST = "#fafafa";
const REST_PILL = "#eef1f4"; // lighter pill bg in HERO_REST (was #e1e5ea)

// Owns the HERO_REST resting state (Section 4): runs the fluid TagFlow that
// opens the center around the text, pops the center content in, and loops the
// rotating word — reflow is automatic because TagFlow re-measures the text each
// frame.
export class HeroRestController {
  private readonly stage: HTMLElement;
  private readonly reduced: boolean;
  private readonly flow: TagFlow;
  private readonly rword: HTMLElement | null;
  private readonly lines: HTMLElement[];
  private readonly subtitle: HTMLElement | null;
  private readonly cta: HTMLElement | null;
  private readonly h1: HTMLElement | null;
  private readonly measure1: HTMLElement | null; // line 2's tight inner span

  private active = 0;
  private entered = false;
  private rotating = false;
  private destroyed = false;
  private timer: ReturnType<typeof setTimeout> | null = null;
  private rotateTl: gsap.core.Timeline | null = null;

  constructor(stage: HTMLElement, reduced: boolean) {
    this.stage = stage;
    this.reduced = reduced;
    this.flow = new TagFlow(stage);
    this.rword = stage.querySelector<HTMLElement>("[data-rword]");
    this.lines = gsap.utils.toArray<HTMLElement>("[data-h-line]", stage);
    this.subtitle = stage.querySelector<HTMLElement>("[data-subtitle]");
    this.cta = stage.querySelector<HTMLElement>("[data-cta]");
    this.h1 = stage.querySelector<HTMLElement>("[data-headline]");

    // One push-band per center element — measured from the tight inner
    // [data-h-measure] spans for the two headline lines (so each line's band is
    // its OWN width → word-swap reflow is local to line 2), and from the
    // subtitle/CTA elements. Order matches the reveal: line1(0) → line2(1) →
    // subtitle(2) → CTA(3).
    const measures = gsap.utils.toArray<HTMLElement>("[data-h-measure]", stage);
    this.measure1 = measures[1] ?? null;
    this.flow.setObstacles(
      [measures[0] ?? null, measures[1] ?? null, this.subtitle, this.cta],
      [{ padY: 26 }, { padY: 24 }, { padY: 15 }, { padY: 13 }],
    );
    window.addEventListener("resize", this.onResize);
    if (!reduced) {
      stage.addEventListener("pointermove", this.onPointerMove);
      stage.addEventListener("pointerleave", this.onPointerLeave);
    }
  }

  // Ambient mouse-repel: feed the cursor to the field so nearby pills flee it.
  private onPointerMove = (e: PointerEvent): void => {
    this.flow.setCursor(e.clientX, e.clientY);
  };

  private onPointerLeave = (): void => {
    this.flow.clearCursor();
  };

  /** Play the INTRO → HERO_REST opening (called once when the pop-in finishes). */
  enter(): void {
    if (this.entered || this.destroyed) return;
    this.entered = true;

    this.lockHeadlineWidth();
    this.flow.measureHome();

    const allTags = gsap.utils.toArray<HTMLElement>("[data-tag]", this.stage);
    const important = gsap.utils.toArray<HTMLElement>("[data-important]", this.stage);
    const center = [...this.lines, this.subtitle, this.cta].filter(
      (el): el is HTMLElement => el != null,
    );

    if (this.reduced) {
      gsap.set(allTags, { backgroundColor: REST_PILL });
      gsap.set(important, { color: GHOST });
      gsap.set(center, { opacity: 1, y: 0 });
      this.flow.setActive(true);
      this.flow.settle(120);
      return;
    }

    // The field ghosts out: every pill's bg lightens and the black "important"
    // tags fade their text to the page colour, so the whole grid recedes behind
    // the headline.
    gsap.to(allTags, { backgroundColor: REST_PILL, duration: 0.9, ease: "power2.out" });
    if (important.length) {
      gsap.to(important, { color: GHOST, duration: 0.8, ease: "power2.out" });
    }
    // Field starts simulating (tags rest at home, strengths still 0 → no push)
    // so they react the instant a band's strength ramps in.
    this.flow.setActive(true);
    this.flow.setRepel(true);
    this.flow.start();

    // Center fills in beat-by-beat, and each beat OPENS ITS OWN BAND: the
    // element pops in while its obstacle strength tweens 0→1 on the SAME clock,
    // so the tags there feel the growing element and physically part in step
    // (a kick at the start gives the parting an outward-wave read).
    // Each beat grows its OWN body into the field. The text pops in FAST and in
    // tight succession (tık-tık-tık-tık), but the collider grows on a slightly
    // longer eased ramp so the pills it pushes glide out smoothly (not snappy).
    const tl = gsap.timeline({ onComplete: () => this.startRotation() });
    this.revealBeat(tl, this.lines[0], 0, 0.1, "back.out(1.5)", { y: 22 });
    this.revealBeat(tl, this.lines[1], 1, 0.22, "back.out(1.5)", { y: 22 });
    this.revealBeat(tl, this.subtitle, 2, 0.33, "power3.out", { y: 16 });
    // No y-shift for the CTA (opacity finishes before a y-tween would, which read
    // as a little post-appearance "hop"); just fade + a subtle scale in place.
    this.revealBeat(tl, this.cta, 3, 0.43, "power3.out", { scale: 0.96 });
  }

  // One reveal beat. The collider GROWS FIRST (at `at`) so the pills start
  // gliding aside a beat before the text actually arrives; the text then pops in
  // (fast) into the space already opening, LEAD seconds later — so the clearing
  // leads the type instead of lagging it.
  private revealBeat(
    tl: gsap.core.Timeline,
    el: HTMLElement | null,
    obsIndex: number,
    at: number,
    ease: string,
    from: gsap.TweenVars,
  ): void {
    if (!el) return;
    const LEAD = 0.16;
    const obstacle = this.flow.obstacle(obsIndex);
    if (obstacle) {
      tl.to(obstacle, { strength: 1, duration: 0.5, ease: "power2.out" }, at);
    }
    tl.fromTo(
      el,
      { opacity: 0, ...from },
      { opacity: 1, y: 0, scale: 1, duration: 0.34, ease },
      at + LEAD,
    );
  }

  // Lock the headline (h1) to the WIDEST rotating word's line width, so the
  // block never re-centres when the word changes — only line 2 re-centres inside
  // the fixed-width headline (which we then glide in rotate()).
  private lockHeadlineWidth(): void {
    const { h1, measure1, rword } = this;
    if (!h1 || !measure1 || !rword) return;
    const current = rword.textContent;
    let max = 0;
    for (const word of rotatingWords) {
      rword.textContent = word;
      max = Math.max(max, measure1.offsetWidth);
    }
    rword.textContent = current;
    h1.style.minWidth = `${Math.ceil(max)}px`;
  }

  /** The flow + rotation run only while resting in HERO_REST. */
  onPhase(phase: PhaseId): void {
    if (this.reduced) return;
    if (phase === "HERO_REST") {
      if (this.entered) {
        this.flow.setActive(true);
        this.flow.setRepel(true); // ambient mouse-repel only while resting
        this.flow.start();
        this.startRotation();
      }
    } else {
      this.stopRotation();
      this.flow.setRepel(false);
      this.flow.stop(); // freeze tags for the master pop-down
    }
  }

  private startRotation(): void {
    if (this.rotating || this.reduced || this.destroyed) return;
    this.rotating = true;
    this.scheduleNext();
  }

  private stopRotation(): void {
    this.rotating = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.rotateTl?.kill();
    this.rotateTl = null;
  }

  private scheduleNext(): void {
    if (!this.rotating) return;
    this.timer = setTimeout(() => this.rotate(), DWELL * 1000);
  }

  private rotate(): void {
    if (!this.rotating || !this.rword || this.destroyed) return;
    const next = (this.active + 1) % rotatingWords.length;
    const rword = this.rword;

    // Swap the word with a slide+fade; TagFlow reflows automatically as the
    // headline width changes (it re-measures the text every frame).
    this.rotateTl = gsap.timeline({
      onComplete: () => {
        this.active = next;
        this.scheduleNext();
      },
    });
    const line2 = this.measure1;
    this.rotateTl
      .to(rword, { yPercent: -45, opacity: 0, duration: 0.3, ease: "power2.in" }, 0)
      .add(() => {
        // Swap the word, then GLIDE ONLY line 2's text to its new centred
        // position (the headline width is locked, so line 1 / subtitle / CTA stay
        // put — only the changing line eases across). offsetLeft is layout
        // (unscaled) space, matching the x translate inside the scaled canvas.
        const before = line2 ? line2.offsetLeft : 0;
        rword.textContent = rotatingWords[next];
        if (line2) {
          const dx = before - line2.offsetLeft;
          if (Math.abs(dx) > 0.5) {
            gsap.fromTo(
              line2,
              { x: dx },
              { x: 0, duration: 0.5, ease: "power3.out", overwrite: "auto" },
            );
          }
        }
      })
      .fromTo(
        rword,
        { yPercent: 45, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.34, ease: "power2.out" },
      );
  }

  private onResize = (): void => {
    if (!this.entered || this.destroyed) return;
    this.flow.measureHome();
  };

  destroy(): void {
    this.destroyed = true;
    this.stopRotation();
    this.flow.destroy();
    window.removeEventListener("resize", this.onResize);
    this.stage.removeEventListener("pointermove", this.onPointerMove);
    this.stage.removeEventListener("pointerleave", this.onPointerLeave);
  }
}
