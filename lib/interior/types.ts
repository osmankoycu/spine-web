// Data shapes for the interior detail templates (A · Platform, B · Audience,
// C · Partners). Pure types — content lives in platform.ts / audiences.ts /
// partners.ts, keyed by slug, and is rendered by one template component each.

// Inline two-tone heading: ink `pre`, orange `accent`, optional ink `post`.
// For H1 the two parts render on separate lines (see `TwoTone block`).
export type TwoTone = { pre?: string; accent?: string; post?: string };

export type Cta = { label: string; href: string };

export type Breadcrumb = { label: string; href?: string; current?: boolean };

// ── Template A · Platform / Feature ────────────────────────────────
export type MockupRow = {
  tone: "ok" | "run"; // green ✓ vs orange ↻
  title: string;
  sub: string;
};

export type Feature = { icon: string; title: string; body: string };
export type Step = { title: string; body: string };
export type Stat = { figure: string; label: string };

export type PlatformPage = {
  slug: string;
  // Interface accent for the hero console mockup + feature icons + step coins.
  // "employer" = cobalt (the company's dashboard view), "employee" = aqua (the
  // employee app). Brand orange stays on the hero H1, eyebrow, CTAs and stats.
  accent?: "employer" | "employee";
  breadcrumb: Breadcrumb[]; // e.g. Platform / Benefits / Plan optimization
  eyebrow: string;
  h1: TwoTone;
  lead: string;
  primary: Cta;
  secondary: Cta;
  checks: string[];
  mockup: {
    title: string;
    status: string;
    rows: MockupRow[];
    total: { label: string; figure: string };
  };
  features: { eyebrow: string; heading: TwoTone; intro: string; items: Feature[] };
  how: { eyebrow: string; heading: TwoTone; steps: Step[] };
  numbers: { eyebrow: string; heading: TwoTone; stats: Stat[] };
  cta: { heading: TwoTone; lead: string; button: Cta };
};

// ── Template B · Who we serve / Audience ───────────────────────────
export type ShiftItem = { title: string; sub: string };
export type TimelineStep = {
  icon: string;
  day: string;
  title: string;
  sub: string;
  last?: boolean;
};
export type BentoCard = { icon: string; title: string; body: string };

export type AudiencePage = {
  slug: string;
  pillIcon: string;
  pillLabel: string; // segment name, e.g. "Startups"
  h1: TwoTone;
  lead: string;
  primary: Cta;
  secondary: Cta;
  heroImage?: { src: string; alt: string }; // right-side hero image (user-supplied)
  statRail: Stat[]; // 4 cells
  shift: {
    eyebrow: string;
    heading: TwoTone;
    oldLabel: string;
    oldItems: ShiftItem[];
    newLabel: string;
    newItems: ShiftItem[];
  };
  timeline: { eyebrow: string; heading: TwoTone; intro: string; steps: TimelineStep[] };
  bento: {
    eyebrow: string;
    heading: TwoTone;
    feature: { icon: string; title: string; body: string; chips: string[] };
    cards: BentoCard[];
  };
  testimonial: { quote: TwoTone; name: string; role: string };
  cta: { heading: TwoTone; lead: string; button: Cta };
};

// ── Template C · Partners ──────────────────────────────────────────
export type EconomicsCard = {
  caption: string;
  sub: string;
  lines: { label: string; value: string; success?: boolean; border?: boolean }[];
  highlight: { label: string; figure: string };
  earn: { label: string; value: string; note: string };
};
export type NumberedRow = { n: string; icon: string; title: string; body: string };
export type LedgerStep = { icon: string; title: string; body: string };
export type TableRow = {
  size: string;
  spend: string;
  saving: string;
  peo: string;
  highlight?: boolean;
};

export type PartnerPage = {
  slug: string;
  breadcrumb: Breadcrumb[];
  eyebrow: string;
  h1: TwoTone;
  lead: string;
  primary: Cta;
  secondary: Cta;
  checks: string[];
  stats: Stat[]; // "By the numbers" — the dark stat bar under the hero
  economics: EconomicsCard;
  why: { eyebrow: string; heading: TwoTone; rows: NumberedRow[] };
  ledger: { eyebrow: string; heading: TwoTone; steps: LedgerStep[] };
  table: {
    eyebrow: string;
    heading: TwoTone;
    columns: [string, string, string, string];
    rows: TableRow[];
    caption: string;
  };
  community: {
    label: string;
    heading: string;
    stats: Stat[];
    logos: string[]; // partner-logo labels (image slots)
  };
  cta: { heading: TwoTone; lead: string; button: Cta };
};

// ── Template D · Compare (Spine vs one competitor) ─────────────────
// A head-to-head page: white split hero with a verdict card, the signature dark
// 2-column matrix (Spine lit orange vs the competitor), concrete difference
// cards, an honest "where each wins" split, a stat bar, a switch timeline, and
// an FAQ before the tag-field closer. Content lives in lib/interior/compare.ts.

// One matrix row: a capability dimension with Spine's answer vs theirs.
export type CompareRow = { label: string; icon: string; spine: string; them: string };

// Hero verdict-card line: short label with the two sides' one-word/short answer.
export type SnapshotPoint = { label: string; spine: string; them: string };

// Honest "where each side wins" bullet.
export type FairPoint = { title: string; body: string };

// FAQ entry.
export type Faq = { q: string; a: string };

export type ComparePage = {
  slug: string;
  competitor: string; // "TriNet"
  competitorSub: string; // matrix column subtitle, e.g. "PEO · co-employment"
  breadcrumb: Breadcrumb[];
  eyebrow: string;
  h1: TwoTone;
  lead: string;
  primary: Cta;
  secondary: Cta;
  checks: string[];
  // Hero verdict card (right column) — a compact at-a-glance summary.
  snapshot: {
    title: string;
    points: SnapshotPoint[];
    bottom: { label: string; figure: string };
  };
  // The signature dark head-to-head matrix.
  matrix: {
    eyebrow: string;
    heading: TwoTone;
    intro: string;
    rows: CompareRow[];
  };
  // Concrete "what Spine does differently" cards.
  differences: { eyebrow: string; heading: TwoTone; intro: string; items: Feature[] };
  // Honest two-column "where each wins".
  fair: {
    eyebrow: string;
    heading: TwoTone;
    intro: string;
    themLabel: string;
    themPoints: FairPoint[];
    spineLabel: string;
    spinePoints: FairPoint[];
  };
  numbers: { eyebrow: string; heading: TwoTone; stats: Stat[] };
  // "How to switch" timeline (dark box).
  switch: { eyebrow: string; heading: TwoTone; steps: Step[] };
  faq: { eyebrow: string; heading: TwoTone; items: Faq[] };
  cta: { heading: TwoTone; lead: string; button: Cta };
};
