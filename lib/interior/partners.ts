// Template C · Partners — page data, one entry per slug. Copy adapted from the
// interior-content source (Heal → Spine); the savings table is illustrative.
// Rendered by TemplateC.
import type { PartnerPage } from "@/lib/interior/types";

const become = { label: "Become a partner", href: "#demo" };
const refer = { label: "Refer a client", href: "#demo" };

// Illustrative client savings-by-size — shared across partner pages (all refer
// clients who save). Figures assume ~25% average reduction.
const savingsTable = {
  columns: ["Client size", "Annual spend", "Typical saving", "PEO fees removed"] as [
    string,
    string,
    string,
    string,
  ],
  rows: [
    { size: "20 employees", spend: "$260K", saving: "$65K/yr", peo: "$28K/yr" },
    { size: "60 employees", spend: "$780K", saving: "$195K/yr", peo: "$86K/yr" },
    { size: "150 employees", spend: "$1.95M", saving: "$487K/yr", peo: "$215K/yr" },
    { size: "300 employees", spend: "$3.9M", saving: "$975K/yr", peo: "$430K/yr", highlight: true },
  ],
  caption:
    "Illustrative figures based on ~25% average reduction. Actual savings depend on the client's current plan and geography.",
};

export const partnerPages: Record<string, PartnerPage> = {
  accountants: {
    slug: "accountants",
    breadcrumb: [{ label: "Partners", href: "/partners" }, { label: "Accountants & CFOs", current: true }],
    eyebrow: "Accountants & fractional CFOs",
    h1: { pre: "Save your clients on their", accent: "largest people cost." },
    lead: "Healthcare is the second or third largest line item for most of your clients. Spine cuts it 25% on average — and frees them from PEO admin fees. Refer a client, save them tens of thousands.",
    primary: become,
    secondary: refer,
    checks: ["25% avg. client savings", "Mutual referrals", "Referral fees available"],
    stats: [
      { figure: "25%", label: "Avg. client healthcare savings" },
      { figure: "30d", label: "Avg. client migration" },
      { figure: "Yes", label: "Referral fees available" },
      { figure: "Yes", label: "Mutual referrals" },
    ],
    economics: {
      caption: "Accountant referral economics",
      sub: "Sample 50-person client",
      lines: [
        { label: "Current PEO admin fees", value: "−$96,000/yr", success: true },
        { label: "Plan optimization on Spine", value: "−$48,000/yr", success: true },
        { label: "Pharmacy + compliance savings", value: "−$30,000/yr", success: true, border: true },
      ],
      highlight: { label: "Total client annual savings", figure: "$174,000" },
      earn: { label: "You earn", value: "Referral fee or credit", note: "Available per partner agreement" },
    },
    why: {
      eyebrow: "Why accountants refer",
      heading: { pre: "You see the bloat every month.", accent: "We remove it." },
      rows: [
        { n: "01", icon: "ChartBar", title: "Quantifiable savings", body: "A free cost analysis itemizes the exact dollars your client is overpaying. Easy to share, easy to defend." },
        { n: "02", icon: "HandCoins", title: "Referral fee structure", body: "Available per partner agreement. We work within your firm's compliance and ethics framework." },
        { n: "03", icon: "TrendUp", title: "Strategic credibility", body: "Bringing a 25% healthcare cut makes you the hero — a strategic partner, not just an accountant." },
        { n: "04", icon: "ArrowsClockwise", title: "Mutual referrals", body: "We send clients who need fractional CFO services back to our partner accountants. It goes both ways." },
      ],
    },
    ledger: {
      eyebrow: "How it works",
      heading: { pre: "Partner with", accent: "Spine." },
      steps: [
        { icon: "UserPlus", title: "Reach out", body: "We review your firm, your client base, and what a partnership looks like." },
        { icon: "ChartBar", title: "Get the playbook", body: "Sample cost-analysis decks, talking points, and the referral process — documented." },
        { icon: "HandCoins", title: "Refer & grow", body: "Refer a client. We run a free cost audit. They migrate. Everyone wins." },
      ],
    },
    table: {
      eyebrow: "Client savings, by size",
      heading: { pre: "The bigger the client,", accent: "the bigger the win." },
      ...savingsTable,
    },
    community: {
      label: "In good company",
      heading: "Firms already referring their clients to Spine.",
      stats: [
        { figure: "120+", label: "partner firms" },
        { figure: "$40M+", label: "client savings delivered" },
      ],
      logos: ["Partner logo", "Partner logo", "Partner logo", "Partner logo"],
    },
    cta: {
      heading: { pre: "Make your clients", accent: "money." },
      lead: "Refer a client to Spine for a free cost audit. Save them tens of thousands. Build your strategic credibility.",
      button: { label: "Become a partner", href: "#demo" },
    },
  },

  vc: {
    slug: "vc",
    breadcrumb: [{ label: "Partners", href: "/partners" }, { label: "Venture capital", current: true }],
    eyebrow: "Venture Capital",
    h1: { pre: "Portfolio benefits,", accent: "handled." },
    lead: "Your portfolio companies are spending way too much on benefits and PEO admin. Spine is the modern alternative — free for them, fast to deploy, and a 25% cost reduction on average.",
    primary: become,
    secondary: refer,
    checks: ["Portfolio-wide deployment", "25% savings", "Founder-friendly"],
    stats: [
      { figure: "25%", label: "Avg. healthcare reduction" },
      { figure: "7–10d", label: "Avg. time to live" },
      { figure: "100%", label: "Founder satisfaction" },
      { figure: "Yes", label: "Portfolio-wide reporting" },
    ],
    economics: {
      caption: "VC portfolio impact",
      sub: "12-company fund example",
      lines: [
        { label: "12 portfolio cos · avg. 50 employees", value: "$4.2M/yr" },
        { label: "Avg. cost reduction on Spine", value: "−25%", success: true },
        { label: "Avg. time to live per portco", value: "7–10 days", border: true },
      ],
      highlight: { label: "Aggregate annual savings", figure: "$1.05M" },
      earn: { label: "Your win", value: "Founders thank you", note: "Portfolio-wide savings you report" },
    },
    why: {
      eyebrow: "Why VCs recommend",
      heading: { pre: "Your founders build.", accent: "We handle benefits." },
      rows: [
        { n: "01", icon: "RocketLaunch", title: "Founder-friendly", body: "Real benefits, day-1 ready, free for the company. Your founders love it; you look smart for the intro." },
        { n: "02", icon: "TrendDown", title: "25% avg. cost reduction", body: "Real money back into product, hiring, and growth — demonstrable savings for your portfolio reviews." },
        { n: "03", icon: "ChartBar", title: "Portfolio-wide visibility", body: "Optional quarterly reports on healthcare spend, compliance posture, and headcount across the portfolio." },
        { n: "04", icon: "Handshake", title: "VC-friendly terms", body: "Bulk introduction structures, portfolio-wide rollouts, and pricing predictability available." },
      ],
    },
    ledger: {
      eyebrow: "How it works",
      heading: { pre: "Partner with", accent: "Spine." },
      steps: [
        { icon: "Envelope", title: "Intro your portfolio", body: "A single intro email or a warm batch. We handle each portco individually." },
        { icon: "ChartBar", title: "Free audits across the portfolio", body: "We benchmark every portfolio company against peer cohorts." },
        { icon: "TrendUp", title: "Portfolio-wide impact", body: "Migrated portcos save 25% on healthcare. You report it in your annual letter." },
      ],
    },
    table: {
      eyebrow: "Portco savings, by size",
      heading: { pre: "The bigger the portco,", accent: "the bigger the win." },
      ...savingsTable,
    },
    community: {
      label: "Trusted by funds",
      heading: "Funds putting their portfolios on Spine.",
      stats: [
        { figure: "80+", label: "partner funds" },
        { figure: "$200M+", label: "portfolio savings delivered" },
      ],
      logos: ["Fund logo", "Fund logo", "Fund logo", "Fund logo"],
    },
    cta: {
      heading: { pre: "Make your founders", accent: "richer." },
      lead: "Save your portfolio aggregate millions. Free for them, easy for you.",
      button: { label: "Partner with Spine", href: "#demo" },
    },
  },

  "private-equity": {
    slug: "private-equity",
    breadcrumb: [{ label: "Partners", href: "/partners" }, { label: "Private equity", current: true }],
    eyebrow: "Private Equity",
    h1: { pre: "Cut healthcare spend", accent: "across your portfolio." },
    lead: "Healthcare is the most negotiable, optimizable line item in most PE portfolios. Spine cuts it 25% on average, kills PEO admin fees, and standardizes benefits across roll-ups. Free for portfolio cos.",
    primary: become,
    secondary: refer,
    checks: ["Portfolio-wide deployment", "25% savings", "Roll-up ready"],
    stats: [
      { figure: "25%", label: "Avg. healthcare reduction" },
      { figure: "4–6%", label: "Additional aggregated leverage" },
      { figure: "30d", label: "Avg. portco migration" },
      { figure: "Yes", label: "Sale-prep ready" },
    ],
    economics: {
      caption: "PE portfolio impact",
      sub: "Mid-market PE · 8 portcos",
      lines: [
        { label: "8 portfolio cos · 80–250 employees", value: "$14M/yr" },
        { label: "Spine rollout · avg. reduction", value: "−25%", success: true },
        { label: "Aggregated claims leverage", value: "−4–6% more", success: true, border: true },
      ],
      highlight: { label: "Aggregate annual savings", figure: "$3.5M" },
      earn: { label: "Your win", value: "EBITDA improvement", note: "Direct contribution to valuation" },
    },
    why: {
      eyebrow: "Why PE firms centralize",
      heading: { pre: "Apply portfolio scale", accent: "to benefits." },
      rows: [
        { n: "01", icon: "ChartLineUp", title: "Aggregated claims leverage", body: "Treat your portfolio as one block for negotiation. Carriers offer better terms when they see scale." },
        { n: "02", icon: "Buildings", title: "Roll-up standardization", body: "Acquire a new portco? Standardize on Spine's plan structure — no rebuilding benefits per acquisition." },
        { n: "03", icon: "CurrencyCircleDollar", title: "25% cost reduction = EBITDA", body: "Demonstrable EBITDA improvement at every portfolio company. A direct contribution to valuation." },
        { n: "04", icon: "ShieldCheck", title: "Sale-prep ready", body: "Audit-ready ACA, ERISA, multi-state — a defensible posture for every diligence, LP audit, or exit." },
      ],
    },
    ledger: {
      eyebrow: "How it works",
      heading: { pre: "From acquisition to", accent: "standardized." },
      steps: [
        { icon: "MagnifyingGlass", title: "Portfolio audit", body: "We benchmark every portfolio company and identify the biggest savings opportunities first." },
        { icon: "ArrowsClockwise", title: "Phased rollout", body: "Migrate portcos in priority order. Standardize on Spine's plan structure across the portfolio." },
        { icon: "ShieldCheck", title: "Sale-prep ready", body: "Audit-ready compliance, defensible EBITDA improvements, clean data — for every exit cycle." },
      ],
    },
    table: {
      eyebrow: "Portco savings, by size",
      heading: { pre: "The bigger the portco,", accent: "the bigger the win." },
      ...savingsTable,
    },
    community: {
      label: "PE-backed",
      heading: "PE firms standardizing benefits on Spine.",
      stats: [
        { figure: "40+", label: "PE firms" },
        { figure: "$500M+", label: "aggregate EBITDA impact" },
      ],
      logos: ["Firm logo", "Firm logo", "Firm logo", "Firm logo"],
    },
    cta: {
      heading: { pre: "Standardize benefits", accent: "across the portfolio." },
      lead: "Spine cuts healthcare spend, standardizes plans, and prepares your portfolio for clean exits. Free for portcos.",
      button: { label: "Talk to Spine PE", href: "#demo" },
    },
  },

  "fractional-hr": {
    slug: "fractional-hr",
    breadcrumb: [{ label: "Partners", href: "/partners" }, { label: "Fractional HR community", current: true }],
    eyebrow: "Fractional HR",
    h1: { pre: "The Spine", accent: "HR Community." },
    lead: "Our flagship partner network — 50+ vetted fractional HR practitioners building modern people functions. Spine handles benefits and compliance; you handle people strategy. Both grow together.",
    primary: become,
    secondary: refer,
    checks: ["50+ vetted partners", "Hand-picked by Spine", "Mutual referrals"],
    stats: [
      { figure: "50+", label: "Vetted practitioners" },
      { figure: "100%", label: "Hand-picked by Spine" },
      { figure: "0", label: "Commission to partners" },
      { figure: "4×/yr", label: "Community learning sessions" },
    ],
    economics: {
      caption: "Community at a glance",
      sub: "Flagship partner network",
      lines: [
        { label: "50+ fractional HR practitioners", value: "Vetted" },
        { label: "Focused on 20–200 person cos", value: "Same ICP" },
        { label: "Bidirectional referrals", value: "Both ways", border: true },
      ],
      highlight: { label: "Commission to partners", figure: "$0" },
      earn: { label: "You get", value: "Referrals back", note: "We route clients who need fractional HR" },
    },
    why: {
      eyebrow: "Why it works",
      heading: { pre: "Fractional HR + Spine,", accent: "better together." },
      rows: [
        { n: "01", icon: "Handshake", title: "Complementary services", body: "You bring people strategy — recruiting, performance, culture. Spine brings operational execution — benefits, compliance, payroll." },
        { n: "02", icon: "TrendUp", title: "Grow your book", body: "Spine clients often need fractional HR. We route them to community partners — and pay no admin fee for the intro." },
        { n: "03", icon: "Lightning", title: "Save 30% of your time", body: "Stop debugging benefits, drafting COBRA notices, or managing renewals. Spine handles it; you focus on people work." },
        { n: "04", icon: "LockKeyOpen", title: "No bundle, no lock-in", body: "You stay independent and set your own rate. Spine is a tool you recommend, not a competitor." },
      ],
    },
    ledger: {
      eyebrow: "How it works",
      heading: { pre: "Join the", accent: "community." },
      steps: [
        { icon: "NotePencil", title: "Apply", body: "We review your background, references, and current book. Selective — quality over quantity." },
        { icon: "PlugsConnected", title: "Onboard", body: "Get access to community resources, training, and the referral process. Co-marketing where it fits." },
        { icon: "Handshake", title: "Grow together", body: "Refer your clients to Spine for benefits and compliance. Get referrals back. Build a stronger book." },
      ],
    },
    table: {
      eyebrow: "Client savings, by size",
      heading: { pre: "The bigger the client,", accent: "the bigger the win." },
      ...savingsTable,
    },
    community: {
      label: "The community",
      heading: "50+ practitioners building modern people functions.",
      stats: [
        { figure: "50+", label: "vetted practitioners" },
        { figure: "4×/yr", label: "community learning sessions" },
      ],
      logos: ["Member", "Member", "Member", "Member"],
    },
    cta: {
      heading: { pre: "Join the", accent: "Spine HR community." },
      lead: "Build a stronger fractional HR practice with Spine as your operational partner.",
      button: { label: "Apply to join", href: "#demo" },
    },
  },
};

export const partnerSlugs = Object.keys(partnerPages);
