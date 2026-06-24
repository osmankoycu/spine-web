import type { Stat, Tag } from "./types";

// ── Rotating center word (HERO_REST) → resolved three-up (STATS) ────────────
export const rotatingWords = ["Benefits", "Compliance", "People ops"] as const;
export type RotatingWord = (typeof rotatingWords)[number];

// ── Copy (brand confirmed = Spine; subtitle "Heal" corrected) ───────────────
export const copy = {
  rest: {
    line1: "Let us worry", // headline line 1
    line2Prefix: "about your", // line 2, before the rotating word + "."
    subtitle:
      "Spine replaces your broker and your PEO — lower premiums, real compliance, and 24/7 support from an in-house team plus AI. You run the company. We handle the rest.",
  },
  oneTeam: "one team",
  cta: "Get your PEO exit plan",
};

// ── Tags (Section 6) ────────────────────────────────────────────────────────
// Curated "important" set — pop in solid black. Fixed-curated by default.
export const importantTags: string[] = [
  "Hired someone",
  "Changed work locations",
  "Switched carriers",
  "ACA compliance",
  "Lost their computer",
  "Updated withholding",
  "Changed departments",
  "COBRA paperwork",
  "Fixed a paycheck error",
  "Added a dependent",
];

// Remaining grey pool (texture field — repeats are intentional).
export const tagPool: string[] = [
  "Requested time off",
  "Needs a new email alias",
  "Fired someone",
  "Had a baby",
  "Got a raise",
  "Became a manager",
  "Approved PTO",
  "Reorganized the company",
  "Placed on a PIP",
  "Earned a bonus",
  "Updated their address",
  "Changed t-shirt sizes",
  "New hire onboarding",
  "Renewed the plan",
  "Changed phone numbers",
  "Filed a claim",
  "Moved",
  "Got promoted",
  "Needs a new app",
  "Offboarded someone",
  "Started parental leave",
  "Enrolled in benefits",
  "Changed their name",
  "Reported an injury",
  "Updated direct deposit",
  "Went fully remote",
  "Requested FMLA",
  "Joined the company",
  "Took a sabbatical",
  "Set up payroll",
];

// Toggle to randomize which tags are "important" per load (default: stable).
export const randomizeImportant = false;

// Build the data-driven tag field. The important (black) tags are SCATTERED at
// deterministic pseudo-random positions (one per slot, randomized within it) so
// they read as mixed rather than lining up in columns; the rest cycle the grey
// pool (repeats are intentional texture). Deterministic (seeded) so SSR/client
// markup match — INTRO randomizes only the pop-in *order* (in GSAP).
export function buildTags(target = 36): Tag[] {
  const out: Tag[] = [];
  let seed = 20260624;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
  const positions = new Set<number>();
  const slot = target / importantTags.length;
  for (let k = 0; k < importantTags.length; k++) {
    let pos = Math.min(target - 1, Math.floor(k * slot + rand() * slot));
    while (positions.has(pos)) pos = (pos + 1) % target;
    positions.add(pos);
  }
  let impI = 0;
  let poolI = 0;
  for (let i = 0; i < target; i++) {
    if (positions.has(i) && impI < importantTags.length) {
      out.push({ label: importantTags[impI++], important: true });
    } else {
      out.push({ label: tagPool[poolI % tagPool.length], important: false });
      poolI++;
    }
  }
  return out;
}

// ── Stat circles (Section 6) ────────────────────────────────────────────────
// 4th distinct stat = "100+ integrations" (replaces Figma's duplicate 25%).
export const stats: Stat[] = [
  { value: "25%", caption: "Average reduction in healthcare costs", type: "stat" },
  { value: "$0", caption: "Cost to your company. Free, always.", type: "stat" },
  { value: "24/7", caption: "Employee support — in-house team + AI", type: "stat" },
  { value: "100+", caption: "Integrations", type: "stat" },
];

// Scattered decorative empties (light grey) — count only; positions set in STATS.
export const decorativeCircleCount = 6;
