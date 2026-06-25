import type { Stat, Tag } from "./types";

// ── Rotating center word (HERO_REST) → resolved three-up (STATS) ────────────
export const rotatingWords = ["Benefits", "Compliance", "People ops"] as const;
export type RotatingWord = (typeof rotatingWords)[number];

// ── Copy (brand confirmed = Spine; subtitle "Heal" corrected) ───────────────
export const copy = {
  rest: {
    line1: "Let us worry about", // headline line 1
    line2Prefix: "your", // line 2, before the rotating word
    subtitle:
      "Spine replaces your broker and your PEO — lower premiums, real compliance, and 24/7 support from an in-house team plus AI. You run the company. We handle the rest.",
  },
  oneTeam: "one team",
  cta: "Get your PEO exit plan",
};

// ── BENEFITS page content (Figma node 52:727) ───────────────────────────────
// Illustrations exported to /public/benefits (tint baked in: company = blue
// #1e54b8, employees = cyan #2bb0c9; the consultant is greyscale).
export type BenefitFeature = { img: string; w: number; h: number; scale?: number; title: string; desc: string };
export const benefitsPage = {
  headline: ["Better plans.", "Lower premiums."],
  subtitle:
    "We become your broker of record. We shop every major carrier, right-size your plan to your team, and renegotiate every renewal — so your costs go down, not up.",
  consultant: {
    img: "/benefits/consultant.png",
    eyebrow: "Your dedicated benefits consultant",
    name: "Nashina Bush",
    role: "Senior Health & Benefits Broker",
    badge: "In-house",
  },
  company: {
    title: "For your company",
    color: "#1e54b8",
    features: [
      { img: "/benefits/company-carrier.png", w: 124, h: 124, title: "Every major carrier, every year.", desc: "No lazy renewals. Real shopping, every cycle." },
      { img: "/benefits/company-optimization.png", w: 223, h: 216, scale: 1.05, title: "Plan optimization & right-sizing.", desc: "AI compares thousands of configurations against your actual workforce." },
      { img: "/benefits/company-consultant.png", w: 111, h: 124, title: "Dedicated benefits consultant.", desc: "A real expert who knows your team — not a call center." },
    ] as BenefitFeature[],
  },
  employees: {
    title: "For your employees",
    color: "#2bb0c9",
    features: [
      { img: "/benefits/employee-concierge.png", w: 137, h: 132, title: "24/7 concierge.", desc: "Every benefits question answered. Every bill checked. Every claim followed up." },
      { img: "/benefits/employee-app.png", w: 154, h: 222, title: "The Spine app.", desc: "Plan selection, digital cards, pharmacy navigation, claims help — in their pocket." },
      { img: "/benefits/employee-care.png", w: 113, h: 124, scale: 1.15, title: "Care navigation.", desc: "We help employees find in-network specialists, second opinions, and fight surprise bills." },
    ] as BenefitFeature[],
  },
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

// ── STATS circle layout (Section 6) ─────────────────────────────────────────
// Single source of truth for the HERO_REST→STATS morph: where the pills travel
// to and grow into. Coords are Figma-frame CENTRES (1440×1126 design frame);
// StatsController maps them into the scaled canvas relative to the grid centre.
// `figmaAnchorY` = the Figma point that maps to the canvas centre (tuned).
export const statsLayout = {
  figmaW: 1440,
  figmaAnchorY: 472,
  // How far the circles fling out from centre (× the Figma offset). >1 spreads
  // them WIDER than the Figma frame so they fill the whole tag area; x is pushed
  // harder than y because the tag grid is much wider than it is tall. Sizes stay
  // at design px (not scaled by this).
  spreadX: 1.22,
  spreadY: 1.06,
  statSize: 200,
  preferImportantForStats: true,
  // 4 black stat circles — index aligns to stats[] (25%, $0, 24/7, 100+).
  stats: [
    { fx: 313, fy: 334 }, // 25%
    { fx: 1143, fy: 307 }, // $0
    { fx: 1077, fy: 685 }, // 24/7
    { fx: 285, fy: 674 }, // 100+
  ],
  // 10 grey decorative circles — { size, centre }.
  decoratives: [
    { size: 150, fx: 118.5, fy: 488.5 },
    { size: 150, fx: 471, fy: 819 },
    { size: 150, fx: 110, fy: 225 },
    { size: 150, fx: 922, fy: 239 },
    { size: 150, fx: 1302, fy: 511 },
    { size: 100, fx: 1360, fy: 223 },
    { size: 100, fx: 1360, fy: 783 },
    { size: 100, fx: 860, fy: 841 },
    { size: 100, fx: 94, fy: 826 },
    { size: 100, fx: 556, fy: 211 },
  ],
} as const;
