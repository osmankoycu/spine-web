// ── Hero state machine vocabulary ───────────────────────────────────────────

// Every logical phase the hero passes through.
// INTRO  = load animation (tag pop-in) that auto-resolves into HERO_REST.
// RELEASE = the unpin / handoff to the rest of the page (not a snap stop).
export const PHASES = [
  "INTRO",
  "HERO_REST",
  "STATS",
  "BENEFITS",
  "COMPLIANCE",
  "PEOPLE_OPS",
  "RELEASE",
] as const;
export type PhaseId = (typeof PHASES)[number];

// The pinned snap "stops" — discrete scroll positions inside the pin.
// INTRO collapses into HERO_REST (stop 0); RELEASE is reached by scrolling
// forward past the last stop, so it is not itself a stop.
export const STOPS = [
  "HERO_REST",
  "STATS",
  "BENEFITS",
  "COMPLIANCE",
  "PEOPLE_OPS",
] as const;
export type StopId = (typeof STOPS)[number];

// ── Content shapes (data-driven, Section 6) ─────────────────────────────────
export type Tag = { label: string; important?: boolean };

export type Stat = {
  value: string;
  caption?: string;
  type: "stat" | "decorative";
};
