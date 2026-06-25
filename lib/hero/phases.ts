import { STOPS, type StopId } from "./types";

// The pin runs across (number of stops − 1) transitions. 5 stops → 4 segments,
// mapped to scroll progress fractions [0, .25, .5, .75, 1].
export const SEGMENTS = STOPS.length - 1;

export const stopIndexOf = (id: StopId): number => STOPS.indexOf(id);

// Scroll-progress fraction (0..1) at which stop `i` sits.
export const fractionOfStop = (i: number): number => i / SEGMENTS;

// Nearest stop index for an arbitrary progress (used when (re)engaging the gate).
export const stopForProgress = (progress: number): number =>
  Math.round(progress * SEGMENTS);

// Snap-tween timing for one committed transition (also the lock duration). The
// master morph is scrubbed by this snap, so this also sets the morph's pace.
export const PHASE_DURATION = 1.3; // seconds (default / release glide)

// Per-segment snap duration. Segment 0 (HERO_REST→STATS) is the slow circle
// "breath" (gather toward the text, then relax out), so it gets a longer snap;
// the rest stay quick. Indexed by the segment being traversed = min(from, to).
export const SEGMENT_DURATIONS: readonly number[] = [1.9, 1.3, 1.3, 1.3];
export const segmentDuration = (seg: number): number =>
  SEGMENT_DURATIONS[seg] ?? PHASE_DURATION;
export const PHASE_EASE = (t: number): number =>
  // easeInOutCubic — used by Lenis.scrollTo for the committed snap.
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// After a commit, ignore trailing trackpad momentum for this long.
export const COMMIT_COOLDOWN_MS = 140;
// Wheel/touch delta needed to register a directional "intent".
export const INTENT_THRESHOLD = 8;
export const SWIPE_THRESHOLD = 48;
