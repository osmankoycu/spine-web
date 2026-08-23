// Team-size buckets shared across the funnel surface: the /start router asks
// them, /scan carries them into the lead subject, /audit maps them onto the
// step-0 slider, and the bridges translate in both directions.

export const TEAM_SIZE_BUCKETS = [
  { id: "1-4", label: "1 to 4" },
  { id: "5-10", label: "5 to 10" },
  { id: "11-25", label: "11 to 25" },
  { id: "26-plus", label: "26 or more" },
] as const;

export type TeamSizeId = (typeof TEAM_SIZE_BUCKETS)[number]["id"];

const IDS = new Set<string>(TEAM_SIZE_BUCKETS.map((b) => b.id));

export function isTeamSize(v: unknown): v is TeamSizeId {
  return typeof v === "string" && IDS.has(v);
}

// Representative headcount for the audit slider (min 5 — the slider floor).
export function headcountForBucket(id: TeamSizeId): number {
  return { "1-4": 5, "5-10": 8, "11-25": 18, "26-plus": 40 }[id];
}

export function bucketForHeadcount(n: number): TeamSizeId {
  if (n <= 4) return "1-4";
  if (n <= 10) return "5-10";
  if (n <= 25) return "11-25";
  return "26-plus";
}
