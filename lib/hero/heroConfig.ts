// ── Tag content shape (data-driven, Section 6) ──────────────────────────────
export type Tag = { label: string; important?: boolean };

// ── Rotating center word (HERO_REST headline) ───────────────────────────────
export const rotatingWords = ["Benefits", "Compliance", "People ops"] as const;

// ── Copy (brand confirmed = Spine; subtitle "Heal" corrected) ───────────────
// Subtitle is segmented so key terms can carry a HEAVIER weight (em) — same text,
// just emphasised — while the rest stays at the body weight. Rendered in
// HeadlineMorph.
export type SubPart = { t: string; em?: boolean };

export const copy = {
  rest: {
    line1: "Let us worry about", // headline line 1
    line2Prefix: "your", // line 2, before the rotating word
    subtitle: [
      { t: "Spine", em: true },
      { t: " is the modern alternative to " },
      { t: "brokers", em: true },
      { t: " and " },
      { t: "PEOs", em: true },
      { t: ". One team runs your " },
      { t: "healthcare", em: true },
      { t: ", " },
      { t: "payroll", em: true },
      { t: ", and " },
      { t: "compliance", em: true },
      { t: ", backed by AI and free for your company." },
    ] as SubPart[],
  },
  cta: "See how much you'd save →",
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
  "Requested time off",
  "Updated their address",
];

// Remaining grey pool (texture field — repeats are intentional).
export const tagPool: string[] = [
  "Got a raise",
  "Fired someone",
  "Had a baby",
  "Needs a new email alias",
  "Became a manager",
  "Approved PTO",
  "Reorganized the company",
  "Placed on a PIP",
  "Earned a bonus",
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
  "Switched roles",
  "Relocated the office",
  "Updated an emergency contact",
  "Completed onboarding",
  "Submitted expenses",
  "Booked a vacation",
  "Changed managers",
  "Joined a new team",
  "Updated tax forms",
  "Renewed a work visa",
  "Reported a grievance",
  "Returned from leave",
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
