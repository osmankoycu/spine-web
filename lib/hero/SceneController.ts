import type Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import type { PhaseId } from "./types";
import {
  COMMIT_COOLDOWN_MS,
  fractionOfStop,
  INTENT_THRESHOLD,
  PHASE_DURATION,
  PHASE_EASE,
  SEGMENTS,
  segmentDuration,
  stopForProgress,
  SWIPE_THRESHOLD,
} from "./phases";

// Phase for each pinned stop index (0..4). INTRO precedes stop 0; RELEASE is
// reached by scrolling forward past the last stop.
const STOP_PHASE: PhaseId[] = [
  "HERO_REST",
  "STATS",
  "BENEFITS",
  "COMPLIANCE",
  "PEOPLE_OPS",
];
const LAST_STOP = STOP_PHASE.length - 1;

export type SceneRefs = {
  /** The pinned, full-viewport stage — also the ScrollTrigger trigger and the
   *  query root for phase systems (tags, center content, …) that morph in place. */
  stage: HTMLElement;
};

export type SceneControllerOptions = {
  refs: SceneRefs;
  lenis: Lenis | null;
  /** Build the master timeline (segments). Master is scrubbed by scroll progress. */
  buildMaster: (master: gsap.core.Timeline, refs: SceneRefs) => void;
  onPhaseChange?: (phase: PhaseId, stopIndex: number) => void;
  onLockChange?: (locked: boolean) => void;
  onProgress?: (progress: number) => void;
  /** Fired the instant a transition commits, BEFORE the master scrubs — lets
   *  phase systems hand their elements to the master (e.g. freeze the physics). */
  onTransitionStart?: () => void;
};

/**
 * Owns the hero as a scene state machine (Section 3.1):
 *  - one master GSAP timeline, slaved to a ScrollTrigger pin's progress;
 *  - a gesture gate that commits exactly ONE transition per input and locks
 *    further input until the snap tween completes (Section 3.7).
 *
 * Built on real scroll distance + Lenis, so it can later be flipped from SNAP
 * to scrub by simply disengaging the gate — no rewrite (Section 2).
 */
export class SceneController {
  private readonly o: SceneControllerOptions;
  private readonly lenis: Lenis | null;

  private master: gsap.core.Timeline | null = null;
  private st: ScrollTrigger | null = null;

  private currentStop = 0;
  private locked = false;
  private engaged = false;
  private introDone = false;
  private released = false;
  private destroyed = false;

  private cooldownUntil = 0;
  private touchStartY = 0;

  constructor(options: SceneControllerOptions) {
    this.o = options;
    this.lenis = options.lenis;
  }

  // ── lifecycle ──────────────────────────────────────────────────────────────
  init(): void {
    const { stage } = this.o.refs;

    this.master = gsap.timeline({ paused: true });
    this.o.buildMaster(this.master, this.o.refs);
    if (process.env.NODE_ENV !== "production") {
      const w = window as unknown as {
        __master?: gsap.core.Timeline;
        __scene?: SceneController;
      };
      w.__master = this.master;
      w.__scene = this;
    }

    this.st = ScrollTrigger.create({
      trigger: stage,
      start: "top top",
      end: () => "+=" + window.innerHeight * SEGMENTS,
      pin: stage,
      pinSpacing: true,
      anticipatePin: 1,
      // Pin via TRANSFORM, not position:fixed. Re-entering the pin from BELOW
      // (fast scroll-up after RELEASE) re-pins the stage; a fixed re-pin snaps the
      // layout (the "sekme"), while a transform re-pin just re-applies a translate
      // → no jump. Stage-relative measurements are unaffected (the transform
      // cancels in gBCR − stageR; it's translate-only so the scale ratio holds).
      pinType: "transform",
      onUpdate: (self) => {
        if (!this.introDone) return; // never render the master during INTRO
        this.master?.progress(self.progress);
        this.o.onProgress?.(self.progress);
      },
      onToggle: (self) => {
        if (self.isActive) this.engage();
        else this.disengage();
      },
    });

    // Listeners live for the controller's lifetime; they no-op unless engaged.
    window.addEventListener("wheel", this.onWheel, { passive: false });
    window.addEventListener("keydown", this.onKey, { passive: false });
    window.addEventListener("touchstart", this.onTouchStart, { passive: false });
    window.addEventListener("touchmove", this.onTouchMove, { passive: false });

    // INTRO is held until the tag pop-in finishes — TagField calls
    // completeIntro(), which opens the resting HERO_REST state.
    this.emitPhase();
  }

  destroy(): void {
    this.destroyed = true;
    window.removeEventListener("wheel", this.onWheel);
    window.removeEventListener("keydown", this.onKey);
    window.removeEventListener("touchstart", this.onTouchStart);
    window.removeEventListener("touchmove", this.onTouchMove);
    this.st?.kill();
    this.master?.kill();
    this.lenis?.start();
  }

  /** Called when the INTRO pop-in finishes; opens the resting HERO_REST state. */
  completeIntro(): void {
    if (this.introDone) return;
    this.introDone = true;
    this.emitPhase();
  }

  // ── engagement ──────────────────────────────────────────────────────────────
  private engage(): void {
    if (this.destroyed) return;
    this.engaged = true;
    this.released = false;
    this.lenis?.stop(); // gate owns scroll while pinned
    this.currentStop = clamp(stopForProgress(this.st?.progress ?? 0), 0, LAST_STOP);
    // Don't let the fling that carried us back into the pin commit a step.
    this.cooldownUntil = Date.now() + COMMIT_COOLDOWN_MS;
    // Re-entering from the released page (scrolling back UP) overshoots the
    // boundary before the gate can freeze, so the master lands on a HALF-segment
    // and the leftover momentum instantly jumps to the wrong stop. Settle cleanly
    // ONTO the entry stop instead. Skipped on the very first engage (mid-INTRO,
    // already at stop 0).
    if (this.introDone) this.settleOntoStop();
    this.emitPhase();
  }

  /** Snap the master exactly onto the current stop — used on pin re-entry so the
   *  field resumes AT a stop, never frozen mid-segment. Locks input for the brief
   *  settle, then re-arms the cooldown so the trailing fling can't commit. */
  private settleOntoStop(): void {
    if (!this.st || !this.lenis) return;
    const raw =
      this.st.start + fractionOfStop(this.currentStop) * (this.st.end - this.st.start);
    // Land a hair INSIDE the pin end. Settling exactly on st.end toggles the pin
    // OFF — and then every back-commit re-crosses it, re-engaging + re-settling,
    // which traps the user on the last stop (can't go back). Staying just inside
    // keeps the pin live so a back swipe commits normally.
    const y = Math.min(raw, this.st.end - window.innerHeight * 0.02);
    this.setLocked(true);
    this.lenis.scrollTo(y, {
      duration: 0.3,
      easing: PHASE_EASE,
      lock: true,
      force: true,
      onComplete: () => {
        if (this.destroyed) return;
        this.cooldownUntil = Date.now() + COMMIT_COOLDOWN_MS;
        this.setLocked(false);
      },
    });
  }

  private disengage(): void {
    // Committing to the LAST stop scrolls to the exact pin end, which toggles the
    // pin inactive mid-snap. Ignore that: starting Lenis here would cancel the
    // in-flight scrollTo so its onComplete (finish → unlock) never fires and the
    // gate jams locked. The snap's own finish() restores scroll ownership.
    if (this.locked) return;
    this.engaged = false;
    this.lenis?.start();
  }

  // ── commit / release ─────────────────────────────────────────────────────────
  private step(dir: 1 | -1): void {
    if (!this.st || this.locked || !this.engaged || !this.introDone) return;
    if (Date.now() < this.cooldownUntil) return;

    if (dir > 0 && this.currentStop >= LAST_STOP) {
      this.release();
      return;
    }
    const target = this.currentStop + dir;
    if (target < 0 || target > LAST_STOP) return; // clamp at HERO_REST
    this.commitTo(target);
  }

  private commitTo(target: number): void {
    if (!this.st) return;
    this.o.onTransitionStart?.(); // freeze phase systems BEFORE the scrub begins
    this.setLocked(true);
    const y = this.st.start + fractionOfStop(target) * (this.st.end - this.st.start);
    // The segment being traversed sets the snap pace (STATS is the slow breath).
    const dur = segmentDuration(Math.min(this.currentStop, target));

    const finish = () => {
      if (this.destroyed) return;
      this.currentStop = target;
      this.cooldownUntil = Date.now() + COMMIT_COOLDOWN_MS;
      this.setLocked(false);
      this.emitPhase();
    };

    if (this.lenis) {
      this.lenis.scrollTo(y, {
        duration: dur,
        easing: PHASE_EASE,
        lock: true, // ignore user scroll input for the duration → snap integrity
        force: true,
        onComplete: finish,
      });
    } else {
      window.scrollTo(0, y);
      finish();
    }
  }

  private release(): void {
    if (!this.st || this.released) return;
    this.released = true;
    this.engaged = false;
    this.o.onPhaseChange?.("RELEASE", LAST_STOP);
    this.lenis?.start();
    // Glide past the pin end into the rest-of-page (normal scroll resumes).
    const y = this.st.end + window.innerHeight;
    this.lenis?.scrollTo(y, { duration: PHASE_DURATION, easing: PHASE_EASE, force: true });
  }

  // ── input handlers (no-op unless engaged) ────────────────────────────────────
  private onWheel = (e: WheelEvent): void => {
    if (!this.engaged) return;
    e.preventDefault();
    if (this.locked || !this.introDone) return;
    if (Math.abs(e.deltaY) < INTENT_THRESHOLD) return;
    this.step(e.deltaY > 0 ? 1 : -1);
  };

  private onKey = (e: KeyboardEvent): void => {
    if (!this.engaged) return;
    const fwd = ["ArrowDown", "PageDown", " ", "Spacebar"];
    const back = ["ArrowUp", "PageUp"];
    if (fwd.includes(e.key)) {
      e.preventDefault();
      this.step(1);
    } else if (back.includes(e.key)) {
      e.preventDefault();
      this.step(-1);
    }
  };

  private onTouchStart = (e: TouchEvent): void => {
    if (!this.engaged) return;
    this.touchStartY = e.touches[0]?.clientY ?? 0;
  };

  private onTouchMove = (e: TouchEvent): void => {
    if (!this.engaged) return;
    e.preventDefault();
    if (this.locked || !this.introDone) return;
    const dy = this.touchStartY - (e.touches[0]?.clientY ?? 0);
    if (Math.abs(dy) < SWIPE_THRESHOLD) return;
    this.touchStartY = e.touches[0]?.clientY ?? 0;
    this.step(dy > 0 ? 1 : -1);
  };

  // ── emit helpers ─────────────────────────────────────────────────────────────
  private setLocked(v: boolean): void {
    this.locked = v;
    this.o.onLockChange?.(v);
  }

  private emitPhase(): void {
    const phase: PhaseId =
      !this.introDone && this.currentStop === 0
        ? "INTRO"
        : STOP_PHASE[this.currentStop];
    this.o.onPhaseChange?.(phase, this.currentStop);
  }
}

function clamp(n: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, n));
}
