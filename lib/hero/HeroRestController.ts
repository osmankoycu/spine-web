import { gsap } from "@/lib/gsap";
import { TagFlow } from "./TagFlow";
import { rotatingWords } from "./heroConfig";
import type { PhaseId } from "./types";

const DWELL = 1.8; // seconds a rotating word is shown before swapping
// In HERO_REST the whole tag field reads as ghosted (Figma state 2): the black
// "important" tags fade their TEXT to the page colour so every pill matches the
// faint normal ones. Pills keep their solid #e1e5ea bg — only text colour moves.
const GHOST = "#fafafa";

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

    // One push-band per center element — measured from the tight inner
    // [data-h-measure] spans for the two headline lines (so each line's band is
    // its OWN width → word-swap reflow is local to line 2), and from the
    // subtitle/CTA elements. Order matches the reveal: line1(0) → line2(1) →
    // subtitle(2) → CTA(3).
    const measures = gsap.utils.toArray<HTMLElement>("[data-h-measure]", stage);
    this.flow.setObstacles(
      [measures[0] ?? null, measures[1] ?? null, this.subtitle, this.cta],
      [{ padY: 18 }, { padY: 16 }, { padY: 16 }, { padY: 14 }],
    );
    window.addEventListener("resize", this.onResize);
  }

  /** Play the INTRO → HERO_REST opening (called once when the pop-in finishes). */
  enter(): void {
    if (this.entered || this.destroyed) return;
    this.entered = true;

    this.flow.measureHome();

    const important = gsap.utils.toArray<HTMLElement>("[data-important]", this.stage);
    const center = [...this.lines, this.subtitle, this.cta].filter(
      (el): el is HTMLElement => el != null,
    );

    if (this.reduced) {
      gsap.set(important, { color: GHOST });
      gsap.set(center, { opacity: 1, y: 0 });
      this.flow.setActive(true);
      this.flow.settle(120);
      return;
    }

    // The field ghosts out: the black "important" tags fade their text to the
    // page colour (pills stay solid) so the whole grid recedes behind the headline.
    if (important.length) {
      gsap.to(important, { color: GHOST, duration: 0.8, ease: "power2.out" });
    }
    // Field starts simulating (tags rest at home, strengths still 0 → no push)
    // so they react the instant a band's strength ramps in.
    this.flow.setActive(true);
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
    this.revealBeat(tl, this.cta, 3, 0.43, "back.out(1.6)", { y: 16, scale: 0.94 });
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

  /** The flow + rotation run only while resting in HERO_REST. */
  onPhase(phase: PhaseId): void {
    if (this.reduced) return;
    if (phase === "HERO_REST") {
      if (this.entered) {
        this.flow.setActive(true);
        this.flow.start();
        this.startRotation();
      }
    } else {
      this.stopRotation();
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
    this.rotateTl
      .to(rword, { yPercent: -45, opacity: 0, duration: 0.3, ease: "power2.in" }, 0)
      .add(() => {
        rword.textContent = rotatingWords[next];
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
  }
}
