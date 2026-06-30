import { gsap } from "@/lib/gsap";
import { TagFlow } from "./TagFlow";
import { rotatingWords } from "./heroConfig";

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
  private readonly obstacle2: HTMLElement | null; // line 2's fixed-width collider

  private active = 0;
  private entered = false;
  private rotating = false;
  private destroyed = false;
  private timer: ReturnType<typeof setTimeout> | null = null;
  private rotateTl: gsap.core.Timeline | null = null;
  private tagDrifts: gsap.core.Tween[] = [];
  private tagDrifting = false;

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
    this.obstacle2 = stage.querySelector<HTMLElement>("[data-h-obstacle]");
    // Vertical pads are kept under the row pitch (91px) so each body clears ONLY
    // its own tag row(s): a larger pad spilled over and emptied the centre of the
    // neighbouring row (the row above the headline, and the row below the button).
    // Line 2's collider is the FIXED-WIDTH [data-h-obstacle] (widest word), not
    // the live (shrinking/growing) text — so word swaps never re-push the field.
    this.flow.setObstacles(
      [measures[0] ?? null, this.obstacle2, this.subtitle, this.cta],
      [{ padY: 8 }, { padY: 8 }, { padY: 12 }, { padY: 5 }],
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
    // The "important" pills KEEP their original (darker) bg — only the rest
    // lighten — so the important set reads as a faint darker pattern in the field.
    const normalTags = allTags.filter((t) => !t.hasAttribute("data-important"));
    const center = [...this.lines, this.subtitle, this.cta].filter(
      (el): el is HTMLElement => el != null,
    );

    if (this.reduced) {
      gsap.set(normalTags, { backgroundColor: REST_PILL });
      gsap.set(important, { color: GHOST });
      gsap.set(center, { opacity: 1, y: 0 });
      this.flow.setActive(true);
      this.flow.settle(120);
      return;
    }

    // The field ghosts out: the NORMAL pills' bg lightens; the "important" pills
    // hold their darker bg (the distinction is now the BACKGROUND, not the text),
    // while their black text still fades to the page colour so nothing shouts.
    gsap.to(normalTags, { backgroundColor: REST_PILL, duration: 0.9, ease: "power2.out" });
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
    // Beat times are ~2× faster than before — the headline arrives and the field
    // parts outward in half the time. Each beat POPS in (scale overshoot via the
    // back ease) rather than just fading.
    const tl = gsap.timeline({
      onComplete: () => {
        // Drop GSAP's leftover inline transform on the CTA so its CSS hover
        // scale applies cleanly (otherwise it composes onto the reveal transform
        // and the hover bump is swallowed). Its rest state is identity anyway.
        gsap.set(this.cta, { clearProps: "transform,scale,translate,rotate" });
        this.startRotation();
      },
    });
    // NOTE: the text pops in with SCALE + fade only — no y-translate. A y-rise on
    // the copy would slide each obstacle's CENTRE as it lands, re-gating the pills
    // grazing the band's vertical edge → one extra little shift the instant the
    // type appeared. Scaling in place keeps the collider centre rock-still, so the
    // field parts exactly ONCE (during the grow ramp) and never again.
    this.revealBeat(tl, this.lines[0], 0, 0.05, "back.out(1.7)", { scale: 0.7 });
    this.revealBeat(tl, this.lines[1], 1, 0.11, "back.out(1.7)", { scale: 0.7 });
    this.revealBeat(tl, this.subtitle, 2, 0.165, "back.out(1.5)", { scale: 0.8 });
    // CTA pill pops in place (a touch stronger overshoot than the copy).
    this.revealBeat(tl, this.cta, 3, 0.215, "back.out(2)", { scale: 0.55 });
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
    // The collider grows + clears the pills well BEFORE the type lands, so the
    // (now wider) headline's bigger sweep finishes parting the field instead of
    // the text arriving mid-clear. Larger = type waits longer for the clearing.
    // The collider gets a clear head start so the field is already parting a beat
    // BEFORE the type lands (the sideways open should read slightly ahead of the
    // motto, not simultaneously).
    const LEAD = 0.4;
    const obstacle = this.flow.obstacle(obsIndex);
    if (obstacle) {
      // Smooth, slightly longer grow ramp (sine.inOut eases BOTH ends) so the
      // body parts the field with a gentle continuous glide rather than a sharp
      // power2.out shove at onset. Paired with the collider now being decoupled
      // from the text's pop-scale (TagFlow.measureObs), the parting reads as one
      // fluid open instead of the old step-step-step.
      tl.to(obstacle, { strength: 1, duration: 0.34, ease: "sine.inOut" }, at);
    }
    // Slightly slower, eased pop for the type (was a touch too snappy).
    tl.fromTo(
      el,
      { opacity: 0, ...from },
      { opacity: 1, y: 0, scale: 1, duration: 0.24, ease },
      at + LEAD,
    );
  }

  // Lock the headline (h1) to the WIDEST rotating word's line width, so the block
  // never re-centres when the word changes — only line 2 re-centres inside the
  // fixed-width headline (which we then glide in rotate()). The line-2 collider is
  // pinned to that same widest width, so the field is parted once and the tags
  // stay put through every word swap.
  private lockHeadlineWidth(): void {
    const { h1, measure1, rword, obstacle2 } = this;
    if (!h1 || !measure1 || !rword) return;
    const current = rword.textContent;
    let max = 0;
    for (const word of rotatingWords) {
      rword.textContent = word;
      max = Math.max(max, measure1.offsetWidth);
    }
    rword.textContent = current;
    h1.style.minWidth = `${Math.ceil(max)}px`;
    if (obstacle2) obstacle2.style.width = `${Math.ceil(max)}px`;
  }

  private startRotation(): void {
    if (this.rotating || this.reduced || this.destroyed) return;
    this.rotating = true;
    this.scheduleNext();
    this.startTagDrift();
  }

  private stopRotation(): void {
    this.rotating = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.rotateTl?.kill();
    this.rotateTl = null;
    this.stopTagDrift();
  }

  // Ambient bubble drift on the WHOLE tag field while resting — a gentle, slow
  // HORIZONTAL sway only (no vertical bob), so the field never moves up/down.
  // xPercent is a separate gsap transform channel, so it composes on top of
  // TagFlow's physics x (px) without fighting it.
  private startTagDrift(): void {
    if (this.tagDrifting || this.reduced || this.destroyed) return;
    this.tagDrifting = true;
    const tags = gsap.utils.toArray<HTMLElement>("[data-tag]", this.stage);
    tags.forEach((el, i) => {
      const ax = (i % 2 ? 1 : -1) * 3; // % of own size → a light ~6px sway
      this.tagDrifts.push(
        gsap.to(el, {
          xPercent: ax,
          duration: 4.8 + (i % 5) * 0.8,
          delay: (i % 7) * 0.4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          overwrite: "auto",
        }),
      );
    });
  }

  private stopTagDrift(): void {
    if (!this.tagDrifting) return;
    this.tagDrifting = false;
    for (const d of this.tagDrifts) d.kill();
    this.tagDrifts = [];
    const tags = gsap.utils.toArray<HTMLElement>("[data-tag]", this.stage);
    // overwrite "auto" → only the drift channel (xPercent/yPercent), never the
    // physics x/y (quickSetter, not a tween).
    gsap.to(tags, {
      xPercent: 0,
      yPercent: 0,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
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
      .to(rword, { yPercent: -45, opacity: 0, duration: 0.24, ease: "power2.in" }, 0)
      .add(() => {
        // Swap the word, then GLIDE ONLY line 2's text to its new centred
        // position — WHILE the word is invisible. The re-centre is a horizontal
        // move; doing it now (not during the entry) is what keeps the next word
        // rising STRAIGHT up instead of drifting in diagonally. line 1 / subtitle
        // / CTA stay put (the headline width is locked). offsetLeft is layout
        // (unscaled) space, matching the x translate inside the scaled canvas.
        const before = line2 ? line2.offsetLeft : 0;
        rword.textContent = rotatingWords[next];
        if (line2) {
          const dx = before - line2.offsetLeft;
          if (Math.abs(dx) > 0.5) {
            gsap.fromTo(
              line2,
              { x: dx },
              { x: 0, duration: 0.22, ease: "power3.out", overwrite: "auto" },
            );
          }
        }
      })
      // New word rises STRAIGHT up — starts only after the re-centre glide is
      // done, so there's no horizontal component (no diagonal).
      .fromTo(
        rword,
        { yPercent: 45, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.3, ease: "power2.out" },
        0.42,
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
