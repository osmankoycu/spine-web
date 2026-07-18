// Template B · Who we serve / Audience — page data, one entry per slug. Copy
// adapted from the interior-content source (Heal → Spine); before/after and
// testimonials authored per persona. Rendered by TemplateB.
import type { AudiencePage } from "@/lib/interior/types";

const demo = { label: "Request a demo", href: "#demo" };
const explore = { label: "Explore the platform", href: "/" };

export const audiencePages: Record<string, AudiencePage> = {
  // ── BY SIZE ──────────────────────────────────────────────────────
  startups: {
    slug: "startups",
    pillIcon: "RocketLaunch",
    pillLabel: "Startups",
    h1: { pre: "From first hire to Series A.", accent: "No PEO needed." },
    lead: "Founders, your first hire deserves real benefits, not a junior PEO experience. Spine gives you enterprise-grade benefits, compliance, and people ops. Free for your company.",
    primary: demo,
    secondary: explore,
    heroImage: { src: "/who-we-serve/startups.png", alt: "A startup team reviewing benefits" },
    statRail: [
      { figure: "7–10d", label: "From signed BOR to live" },
      { figure: "$0", label: "Cost to your company" },
      { figure: "2+", label: "Minimum team size" },
      { figure: "100%", label: "Enterprise-grade carriers" },
    ],
    shift: {
      eyebrow: "The shift",
      heading: { pre: "You're a startup. Your team deserves", accent: "Fortune 500 benefits." },
      oldLabel: "The old way · a PEO",
      oldItems: [
        { title: "Co-employment lock-in", sub: "Your team is on someone else's EIN." },
        { title: "Per-employee admin fees", sub: "Costs climb with every hire." },
        { title: "Junior support, call centers", sub: "No one who actually knows your plan." },
      ],
      newLabel: "With Spine",
      newItems: [
        { title: "You keep your entity", sub: "Hire on your own EIN. No co-employment." },
        { title: "Free for employers", sub: "No setup fees, no per-employee charges." },
        { title: "A dedicated consultant", sub: "Direct line to a senior expert. No call centers." },
      ],
    },
    timeline: {
      eyebrow: "Your first 10 days",
      heading: { pre: "Startup → Spine,", accent: "in a week." },
      intro: "From signed contract to live benefits in 7–10 days. We've done it dozens of times for early-stage teams.",
      steps: [
        { icon: "MagnifyingGlass", day: "Day 0–2", title: "Free cost audit", sub: "Plans modeled, savings projected in 48h." },
        { icon: "Signature", day: "Day 2–3", title: "BOR letter signed", sub: "Spine becomes your broker of record." },
        { icon: "PlugsConnected", day: "Day 3–9", title: "Carriers set up · plans live", sub: "Employees onboarded in the Heal app." },
        { icon: "Check", day: "Day 10", title: "Compliance & payroll integrated", sub: "ACA, multi-state, filings, on autopilot.", last: true },
      ],
    },
    bento: {
      eyebrow: "Built for your stage",
      heading: { pre: "Startup-ready,", accent: "enterprise-grade." },
      feature: {
        icon: "RocketLaunch",
        title: "Live in days",
        body: "From signed contract to live benefits in 7–10 days, real carriers, real app, real support. We've done it dozens of times.",
        chips: ["Aetna", "Blue Shield", "Kaiser"],
      },
      cards: [
        { icon: "CurrencyCircleDollar", title: "Free for employers", body: "No setup fees, no admin charges. We earn carrier commission, like every broker." },
        { icon: "LockKeyOpen", title: "No co-employment", body: "You keep your entity and hire on your own EIN. We run the benefits layer on top." },
        { icon: "MapPinLine", title: "Multi-state from day 1", body: "Remote hires? We handle registration, withholding, and new-hire reporting everywhere." },
        { icon: "Headset", title: "Founder-friendly support", body: "Direct line to a dedicated consultant. No junior account managers." },
      ],
    },
    testimonial: {
      quote: {
        pre: "We onboarded our first ten hires with real Aetna plans in under two weeks, for",
        accent: "zero platform cost.",
        post: " Spine felt like having a benefits team before we could afford one.",
      },
      name: "Dana Reyes",
      role: "Co-founder & COO · Northwind (Seed, 14 people)",
    },
    cta: {
      heading: { pre: "Real benefits, from your first hire." },
      lead: "No PEO. No admin fees. No co-employment. Just enterprise-grade benefits and people ops, built for startups.",
      button: { label: "Run free cost analysis", href: "#demo" },
    },
  },

  founders: {
    slug: "founders",
    pillIcon: "Lightning",
    pillLabel: "Founders",
    h1: { pre: "Real benefits from day one.", accent: "Zero admin." },
    lead: "You're building something. You shouldn't be debating PEOs or chasing ACA filings. Spine gives you enterprise-grade benefits, payroll, and compliance, free for your company, run by experts.",
    primary: demo,
    secondary: explore,
    heroImage: { src: "/who-we-serve/founders.png", alt: "Founders planning together" },
    statRail: [
      { figure: "2+", label: "Minimum team size" },
      { figure: "7–10d", label: "From signup to live" },
      { figure: "$0", label: "Cost to your company" },
      { figure: "100%", label: "Founder-friendly" },
    ],
    shift: {
      eyebrow: "The shift",
      heading: { pre: "You're the whole ops team.", accent: "Hand off the people stack." },
      oldLabel: "The old way · DIY + a PEO",
      oldItems: [
        { title: "Benefits eat your week", sub: "CEO, COO, and head of HR, all at once." },
        { title: "ACA filings you forget", sub: "Compliance risk you can't even see." },
        { title: "Bundled PEO plans", sub: "One-size-fits-none, priced for their margin." },
      ],
      newLabel: "With Spine",
      newItems: [
        { title: "Live in 7–10 days", sub: "Real carriers, real app, zero admin." },
        { title: "Free for your company", sub: "We earn carrier commission, like every broker." },
        { title: "Same-day expert access", sub: "Slack or text your consultant directly." },
      ],
    },
    timeline: {
      eyebrow: "The founder path",
      heading: { pre: "Founder path", accent: "to Spine." },
      intro: "Whether you're starting from scratch or already have something, we get you live fast, and scale with you.",
      steps: [
        { icon: "MagnifyingGlass", day: "Step 1", title: "Free audit", sub: "Got something? We audit it. If not, we build from scratch." },
        { icon: "PlugsConnected", day: "Step 2", title: "Live in 7–10 days", sub: "Plans live, team on the Heal app, compliance and payroll integrated." },
        { icon: "Check", day: "Ongoing", title: "We grow with you", sub: "Add hires, states, complexity, Spine scales without a rebuild.", last: true },
      ],
    },
    bento: {
      eyebrow: "Built for founders",
      heading: { pre: "Built for founders,", accent: "priced for startups." },
      feature: {
        icon: "Lightning",
        title: "Live in days",
        body: "From signed BOR to live benefits in 7–10 days. We've done it for hundreds of founder-led teams, real carriers, real app, real support.",
        chips: ["Aetna", "Blue Shield", "Kaiser"],
      },
      cards: [
        { icon: "CurrencyCircleDollar", title: "Free for your company", body: "No setup, no admin, no per-employee fees. We earn carrier commission, that's how brokers work." },
        { icon: "LockKeyOpen", title: "No co-employment", body: "Keep your entity, your EIN, your equity plan. We just run the people stack on top." },
        { icon: "ChatCircleText", title: "Employee app included", body: "Free for every employee. Plan picker, digital cards, 24/7 concierge." },
        { icon: "UserCircle", title: "Direct line to your consultant", body: "A dedicated senior benefits expert. Slack us, text us, same-day response." },
      ],
    },
    testimonial: {
      quote: {
        pre: "I stopped thinking about benefits entirely. Spine got us",
        accent: "live in a week,",
        post: " and now every new hire is day-1 ready without me lifting a finger.",
      },
      name: "Marcus Vale",
      role: "Founder & CEO · Loxa (Pre-seed → Series A)",
    },
    cta: {
      heading: { pre: "Stop thinking about benefits." },
      lead: "Real benefits, no admin, no fees, built for founder-led companies.",
      button: { label: "Run free cost analysis", href: "#demo" },
    },
  },

  "mid-market": {
    slug: "mid-market",
    pillIcon: "TrendUp",
    pillLabel: "Mid-market",
    h1: { pre: "30–200 people.", accent: "Scaling fast." },
    lead: "You've outgrown the PEO. You're not ready for an in-house HR team. Spine is the modern stack for companies between 30 and 200 employees, benefits, compliance, and people ops on one platform.",
    primary: demo,
    secondary: explore,
    heroImage: { src: "/who-we-serve/mid-market.png", alt: "A mid-market team reviewing benefits" },
    statRail: [
      { figure: "25%", label: "Avg. healthcare reduction" },
      { figure: "$90–120K", label: "Annual PEO admin saved (50-person)" },
      { figure: "30d", label: "Avg. migration timeline" },
      { figure: "0", label: "Co-employment risk" },
    ],
    shift: {
      eyebrow: "The shift",
      heading: { pre: "The PEO worked at 20.", accent: "At 50, it's costing you." },
      oldLabel: "The old way · a PEO at 50",
      oldItems: [
        { title: "$90–120K/yr in admin fees", sub: "Costs you can't itemize or control." },
        { title: "Co-employment lock-in", sub: "Your team on the PEO's EIN." },
        { title: "Bundled, un-shopped plans", sub: "No leverage on renewals." },
      ],
      newLabel: "With Spine",
      newItems: [
        { title: "Unbundled, shopped every year", sub: "25% avg. healthcare reduction." },
        { title: "$0 admin fees", sub: "We earn carrier commission, nothing on top." },
        { title: "Scales with headcount & states", sub: "Multi-state from day one." },
      ],
    },
    timeline: {
      eyebrow: "The migration",
      heading: { pre: "Mid-market → Spine,", accent: "in 30 days." },
      intro: "A clean, planned migration off the PEO, no gap in coverage, no surprises for your team.",
      steps: [
        { icon: "MagnifyingGlass", day: "Week 1", title: "Audit your PEO", sub: "Itemize admin fees, plan inefficiencies, compliance gaps." },
        { icon: "Signature", day: "Week 2", title: "Plan the migration", sub: "Model the optimal plan, prep comms, coordinate carriers." },
        { icon: "PlugsConnected", day: "Weeks 3–4", title: "Go live", sub: "Benefits live, compliance moved, payroll integrated." },
        { icon: "Check", day: "Next renewal", title: "Re-shopped, re-priced", sub: "Claims data leveraged to counter the increase.", last: true },
      ],
    },
    bento: {
      eyebrow: "Re-stacked",
      heading: { pre: "Mid-market,", accent: "re-stacked." },
      feature: {
        icon: "TrendUp",
        title: "The PEO alternative",
        body: "All the services of a PEO, benefits, payroll, compliance, without the co-employment lock-in or the $150–200/employee/month fees.",
        chips: ["No lock-in", "No admin fees", "Multi-state"],
      },
      cards: [
        { icon: "CurrencyCircleDollar", title: "Free for your company", body: "We earn carrier commission. No setup, no admin, no per-employee fees." },
        { icon: "ShieldCheck", title: "Compliance handled", body: "ACA, ERISA, COBRA, multi-state tax and hiring, all on autopilot." },
        { icon: "UserCircle", title: "Dedicated team", body: "A senior benefits consultant, backed by AI + in-house experts. No call center." },
        { icon: "ChatCircleText", title: "Employee experience", body: "The Heal app gives every employee 24/7 support, bill negotiation, and care navigation." },
      ],
    },
    testimonial: {
      quote: {
        pre: "We were bleeding",
        accent: "six figures a year",
        post: " in PEO admin fees. Spine unbundled everything and cut our healthcare spend 24% in the first renewal.",
      },
      name: "Priya Nathan",
      role: "VP People · Cadence (140 people)",
    },
    cta: {
      heading: { pre: "Outgrow the PEO. Without the rebuild." },
      lead: "Free cost audit. We compare your current PEO setup against Spine and show you the exact savings.",
      button: { label: "Run free cost analysis", href: "#demo" },
    },
  },

  enterprise: {
    slug: "enterprise",
    pillIcon: "Buildings",
    pillLabel: "Enterprise",
    h1: { pre: "200+ employees.", accent: "Built for scale." },
    lead: "At enterprise scale, brokers spread juniors thin and PEOs become bottlenecks. Spine pairs senior benefits expertise with AI-powered execution, across every geography, every plan, every renewal.",
    primary: demo,
    secondary: explore,
    heroImage: { src: "/who-we-serve/enterprise.png", alt: "An enterprise team reviewing benefits" },
    statRail: [
      { figure: "4–6%", label: "Avg. renewal reduction" },
      { figure: "70%+", label: "HR ticket reduction" },
      { figure: "60–90d", label: "Avg. migration" },
      { figure: "Yes", label: "Multi-state, multi-entity ready" },
    ],
    shift: {
      eyebrow: "The shift",
      heading: { pre: "Legacy brokers don't scale.", accent: "Spine does." },
      oldLabel: "The old way · legacy broker",
      oldItems: [
        { title: "Juniors spread thin", sub: "No senior attention on your account." },
        { title: "Renewals rubber-stamped", sub: "No claims-data leverage." },
        { title: "Fragmented vendors", sub: "Broker, PEO, payroll, compliance, all separate." },
      ],
      newLabel: "With Spine",
      newItems: [
        { title: "Senior consultant + AI execution", sub: "10+ years experience, real leverage." },
        { title: "Every renewal countered", sub: "Avg. 4–6% reduction on the ask." },
        { title: "One team, every geography", sub: "Multi-state, multi-entity, one contract." },
      ],
    },
    timeline: {
      eyebrow: "The migration",
      heading: { pre: "Enterprise migration,", accent: "done right." },
      intro: "A carefully sequenced migration across carriers, geographies, and entities, with compliance handoffs planned end to end.",
      steps: [
        { icon: "MagnifyingGlass", day: "Weeks 1–3", title: "Discovery & audit", sub: "Deep audit of carriers, plans, claims data, compliance posture." },
        { icon: "Signature", day: "Weeks 3–5", title: "Migration plan", sub: "Carrier transitions, comms, and compliance handoffs sequenced carefully." },
        { icon: "PlugsConnected", day: "Days 60–90", title: "Go live & scale", sub: "Transition completes; the Spine team embeds across your operations." },
        { icon: "Check", day: "Ongoing", title: "Embedded partner", sub: "Senior team on your renewals, filings, and geographies year-round.", last: true },
      ],
    },
    bento: {
      eyebrow: "Re-engineered",
      heading: { pre: "Enterprise benefits,", accent: "re-engineered." },
      feature: {
        icon: "Buildings",
        title: "Senior expertise + AI execution",
        body: "A dedicated consultant with 10+ years of mid/large-market experience, backed by an AI-powered execution team, across every geography, every plan, every renewal.",
        chips: ["Multi-state", "Multi-entity", "Claims-data leverage"],
      },
      cards: [
        { icon: "Globe", title: "Multi-state, multi-entity", body: "Any combination of states, EINs, and entity structures. Spine scales with your complexity." },
        { icon: "ChartBar", title: "Claims-data leverage", body: "We counter every renewal with aggregated claims data. Avg. 4–6% reduction on the ask." },
        { icon: "ShieldCheck", title: "Compliance at scale", body: "ACA, ERISA, COBRA, 5500, state mandates, monitored and executed across your footprint." },
        { icon: "Headset", title: "Concierge for everyone", body: "Every employee gets 24/7 support via the Heal app. Cuts HR ticket volume 70%+." },
      ],
    },
    testimonial: {
      quote: {
        pre: "Across 40+ states and 1,200 employees, Spine is the first partner that pairs",
        accent: "senior expertise",
        post: " with execution that actually keeps up.",
      },
      name: "Ellen Cho",
      role: "CHRO · Vantage Industries (1,200+ employees)",
    },
    cta: {
      heading: { pre: "Enterprise benefits, handled." },
      lead: "Talk to our enterprise team about migrating your benefits, compliance, and people ops onto Spine.",
      button: { label: "Talk to enterprise", href: "#demo" },
    },
  },

  // ── BY TEAM ──────────────────────────────────────────────────────
  "hr-people": {
    slug: "hr-people",
    pillIcon: "UsersThree",
    pillLabel: "HR & People",
    h1: { pre: "Stop fielding", accent: "benefits questions." },
    lead: "You didn't take an HR role to spend half your day explaining COBRA. Spine handles every benefits inquiry, every compliance filing, every PTO request, so you can focus on culture, hiring, and strategy.",
    primary: demo,
    secondary: explore,
    heroImage: { src: "/who-we-serve/hr-people.png", alt: "An HR & People team meeting" },
    statRail: [
      { figure: "70%+", label: "Reduction in benefits tickets" },
      { figure: "23h", label: "Avg. weekly time saved (50-person co.)" },
      { figure: "80%+", label: "Inquiries resolved by AI + Spine team" },
      { figure: "4.8/5", label: "HR team satisfaction" },
    ],
    shift: {
      eyebrow: "The shift",
      heading: { pre: "From HR-as-helpdesk", accent: "to HR-as-strategy." },
      oldLabel: "The old way · HR as helpdesk",
      oldItems: [
        { title: "Benefits Slacks all day", sub: "Half your week explaining COBRA." },
        { title: "Compliance on your plate", sub: "ACA, ERISA, filings, your problem." },
        { title: "No time for strategy", sub: "Culture, hiring, performance sidelined." },
      ],
      newLabel: "With Spine",
      newItems: [
        { title: "80%+ of questions handled", sub: "A weekly digest, not a flood of Slacks." },
        { title: "Compliance off your plate", sub: "Filed and monitored by our team." },
        { title: "Back to real HR work", sub: "Recruiting, culture, leadership coaching." },
      ],
    },
    timeline: {
      eyebrow: "How it works",
      heading: { pre: "The queue,", accent: "off your plate." },
      intro: "Everything operational routes through Spine first, so your team only sees what actually needs them.",
      steps: [
        { icon: "PlugsConnected", day: "Step 1", title: "Spine absorbs the queue", sub: "Benefits, PTO, compliance, payroll, routed through us first." },
        { icon: "Robot", day: "Step 2", title: "AI + experts handle 80%+", sub: "Most requests resolved without you; complex stuff escalated with context." },
        { icon: "Check", day: "Ongoing", title: "You focus on what matters", sub: "Recruiting, culture, performance, the things only HR can do.", last: true },
      ],
    },
    bento: {
      eyebrow: "Elevated",
      heading: { pre: "Your HR team,", accent: "elevated." },
      feature: {
        icon: "UsersThree",
        title: "The operational layer beneath HR",
        body: "Spine isn't a replacement for your HR function, it's the operational layer under it, so your team works on what actually matters.",
        chips: ["Benefits Q&A", "Compliance", "Onboarding"],
      },
      cards: [
        { icon: "ChatCircleText", title: "Benefits Q&A handled", body: "The app + concierge field 80%+ of questions. You see a weekly digest, not a flood." },
        { icon: "ShieldCheck", title: "Compliance off your plate", body: "ACA, ERISA, COBRA, multi-state filings, handled by our team, not yours." },
        { icon: "ArrowsClockwise", title: "Onboarding & offboarding", body: "I-9, E-Verify, enrollment, final paychecks, we run the workflow, you welcome the hire." },
        { icon: "ChartBar", title: "Reporting & analytics", body: "Headcount, demographics, utilization, attrition, dashboards exportable for leadership." },
      ],
    },
    testimonial: {
      quote: {
        pre: "My team got",
        accent: "23 hours a week",
        post: " back. Benefits questions just stopped landing in my inbox, we finally do real HR again.",
      },
      name: "Sam Ortiz",
      role: "Head of People · Bright Labs (60 people)",
    },
    cta: {
      heading: { pre: "Get your time back." },
      lead: "Spine handles the day-to-day so your HR team can focus on the strategic. Free for your company.",
      button: { label: "Talk to Spine", href: "#demo" },
    },
  },

  "finance-cfo": {
    slug: "finance-cfo",
    pillIcon: "Wallet",
    pillLabel: "Finance & CFO",
    h1: { pre: "Cut healthcare spend.", accent: "Keep the benefits." },
    lead: "Healthcare is your second- or third-largest line item, and it keeps growing. Spine cuts it by 25% on average, without cutting benefits, while eliminating PEO admin fees entirely.",
    primary: demo,
    secondary: explore,
    heroImage: { src: "/who-we-serve/finance-cfo.png", alt: "A finance leader reviewing reports" },
    statRail: [
      { figure: "25%", label: "Avg. healthcare reduction" },
      { figure: "$4K", label: "Saved per employee per year" },
      { figure: "$0", label: "Broker & admin fees" },
      { figure: "4–6%", label: "Renewal savings on top" },
    ],
    shift: {
      eyebrow: "The shift",
      heading: { pre: "Your fastest-growing line item,", accent: "under control." },
      oldLabel: "The old way · unmanaged spend",
      oldItems: [
        { title: "2nd or 3rd largest line item", sub: "And growing every renewal." },
        { title: "PEO admin fees", sub: "$90–120K/yr you can't cut." },
        { title: "Renewal surprises", sub: "No forecast, no leverage." },
      ],
      newLabel: "With Spine",
      newItems: [
        { title: "25% avg. reduction", sub: "Without cutting benefits." },
        { title: "$0 broker & admin fees", sub: "We earn carrier commission only." },
        { title: "Renewals as strategy", sub: "Claims data counters every ask." },
      ],
    },
    timeline: {
      eyebrow: "How it works",
      heading: { pre: "From audit to savings", accent: "in 90 days." },
      intro: "We attack spend at every layer, admin fees, plan design, renewal negotiation, and pharmacy.",
      steps: [
        { icon: "MagnifyingGlass", day: "48 hours", title: "Free cost audit", sub: "Itemized savings model across plans, claims, and admin spend." },
        { icon: "PlugsConnected", day: "30 days", title: "Migrate & optimize", sub: "BOR transition, plan optimization, compliance handoff." },
        { icon: "Check", day: "Each renewal", title: "Renewal as a strategic event", sub: "Claims data, market intel, and AI modeling counter every ask.", last: true },
      ],
    },
    bento: {
      eyebrow: "Re-priced",
      heading: { pre: "Healthcare,", accent: "re-priced." },
      feature: {
        icon: "Wallet",
        title: "Savings at every layer",
        body: "We attack healthcare spend at admin fees, plan design, renewal negotiation, and pharmacy. Most clients see savings in their first cycle.",
        chips: ["−25% avg.", "$0 admin", "4–6% renewal"],
      },
      cards: [
        { icon: "ChartBar", title: "Plan right-sizing", body: "AI models thousands of plans against your demographics and claims. Often 10–15% on day one." },
        { icon: "TrendUp", title: "Claims-data negotiation", body: "Real claims data counters renewal asks. Avg. 4–6% improvement." },
        { icon: "Pill", title: "Pharmacy savings", body: "Carve-outs, coupons, and PBM transparency, typically 8–12% of pharmacy spend." },
        { icon: "FileText", title: "Forecasting & records", body: "Cost forecasts plugged into your model; every filing logged, audit-ready by default." },
      ],
    },
    testimonial: {
      quote: {
        pre: "Healthcare was our fastest-growing line item. Spine cut it",
        accent: "25%",
        post: " without touching coverage, and killed our PEO admin fees entirely.",
      },
      name: "Rachel Kim",
      role: "CFO · Meridian (90 people)",
    },
    cta: {
      heading: { pre: "See your savings in 48 hours." },
      lead: "Free cost analysis. We model your current setup against Spine and show you the exact savings.",
      button: { label: "Run free cost analysis", href: "#demo" },
    },
  },

  "chief-of-staff": {
    slug: "chief-of-staff",
    pillIcon: "Target",
    pillLabel: "Chief of Staff",
    h1: { pre: "One platform", accent: "that just works." },
    lead: "You're the integration layer. Benefits questions, compliance deadlines, payroll issues, employee escalations, all funnel through you. Spine consolidates the entire people stack into one team with one dashboard.",
    primary: demo,
    secondary: explore,
    heroImage: { src: "/who-we-serve/chief-of-staff.png", alt: "A chief of staff at work" },
    statRail: [
      { figure: "1", label: "Vendor relationship" },
      { figure: "1", label: "Slack channel" },
      { figure: "3-in-1", label: "Benefits, compliance, people ops" },
      { figure: "23h", label: "Avg. weekly time saved" },
    ],
    shift: {
      eyebrow: "The shift",
      heading: { pre: "From scattered", accent: "to centralized." },
      oldLabel: "The old way · you're the glue",
      oldItems: [
        { title: "Everything funnels to you", sub: "Benefits, compliance, payroll, escalations." },
        { title: "Four vendors, four contracts", sub: "Broker, PEO, payroll, compliance." },
        { title: "No single source of truth", sub: "Scattered dashboards and inboxes." },
      ],
      newLabel: "With Spine",
      newItems: [
        { title: "One team, one dashboard", sub: "The whole people stack, one place." },
        { title: "One contract, one Slack channel", sub: "Vendors consolidated." },
        { title: "Senior contact, same-day", sub: "Skip the support queue." },
      ],
    },
    timeline: {
      eyebrow: "How it works",
      heading: { pre: "Consolidated", accent: "in 30 days." },
      intro: "We absorb your broker, PEO admin, compliance vendor, and payroll specialist into one team and one contract.",
      steps: [
        { icon: "MagnifyingGlass", day: "Week 1", title: "Audit your stack", sub: "Map existing vendors, contracts, and pain points." },
        { icon: "PlugsConnected", day: "30 days", title: "Migrate", sub: "We absorb broker, compliance, and people-ops vendors, one contract, one team." },
        { icon: "Check", day: "Ongoing", title: "Run lean", sub: "One relationship, one dashboard, one Slack channel for the whole stack.", last: true },
      ],
    },
    bento: {
      eyebrow: "In one place",
      heading: { pre: "Consolidated people ops,", accent: "in one place." },
      feature: {
        icon: "Target",
        title: "One team, one platform",
        body: "No more juggling broker, PEO, payroll vendor, and HR contractor. Spine is the single platform with the single team running your entire people stack.",
        chips: ["One contract", "One dashboard", "One Slack channel"],
      },
      cards: [
        { icon: "ChartBar", title: "Real-time dashboards", body: "Every benefit, filing, and payroll cycle in one view. Exportable for leadership." },
        { icon: "UserCircle", title: "Direct senior contact", body: "Skip the support queue, a senior consultant on Slack/text, same-day response." },
        { icon: "ShieldCheck", title: "Compliance you can trust", body: "Every requirement monitored and executed. Audit-ready logs for board meetings." },
        { icon: "Handshake", title: "Vendor consolidation", body: "We replace your broker, PEO admin, compliance vendor, and payroll specialist." },
      ],
    },
    testimonial: {
      quote: {
        pre: "One dashboard, one Slack channel, one team for the",
        accent: "entire people stack.",
        post: " I stopped being the integration layer overnight.",
      },
      name: "Jordan Ellis",
      role: "Chief of Staff · Arclight (75 people)",
    },
    cta: {
      heading: { pre: "Stop being the integration layer." },
      lead: "One platform, one team, one dashboard. Spine consolidates your people stack so you can focus on running the company.",
      button: { label: "Talk to Spine", href: "#demo" },
    },
  },

  // ── BY INDUSTRY ──────────────────────────────────────────────────
  "tech-saas": {
    slug: "tech-saas",
    pillIcon: "Laptop",
    pillLabel: "Tech & SaaS",
    h1: { pre: "Built for", accent: "tech & SaaS." },
    lead: "Healthy workforce, distributed teams, fast hiring. Level-funded plans, multi-state setups, employee-first benefits, built for the way modern tech companies work.",
    primary: demo,
    secondary: explore,
    heroImage: { src: "/who-we-serve/tech-saas.png", alt: "A SaaS platform team at work" },
    statRail: [
      { figure: "20–30%", label: "Avg. healthcare savings" },
      { figure: "8–15", label: "Avg. states served" },
      { figure: "4.8/5", label: "Employee app rating" },
      { figure: "100%", label: "API-integrated stack" },
    ],
    shift: {
      eyebrow: "The shift",
      heading: { pre: "Generic plans overpay.", accent: "Optimize for your reality." },
      oldLabel: "The old way · generic plans",
      oldItems: [
        { title: "Overpaying for risk you don't have", sub: "Young, healthy, distributed team." },
        { title: "Fully-insured, un-optimized", sub: "No level-funded surplus refunds." },
        { title: "Multi-state as an afterthought", sub: "Remote hires create tax gaps." },
      ],
      newLabel: "With Spine",
      newItems: [
        { title: "Level-funded, right-sized", sub: "Pay for your team's actual claims." },
        { title: "Modern benefits built in", sub: "Mental health, fertility, wellness." },
        { title: "Multi-state native", sub: "Every state's tax & compliance, automatic." },
      ],
    },
    timeline: {
      eyebrow: "How it works",
      heading: { pre: "Tech-native,", accent: "end-to-end." },
      intro: "We benchmark you against tech peers, migrate to level-funded, and hook into your modern stack.",
      steps: [
        { icon: "MagnifyingGlass", day: "Step 1", title: "Free audit", sub: "Benchmark against tech peer cohorts; find plan-design and cost gaps." },
        { icon: "Signature", day: "Step 2", title: "Level-funded migration", sub: "Most tech teams qualify, we model the savings and migrate the carrier." },
        { icon: "Check", day: "Step 3", title: "Modern stack integration", sub: "API hooks into your HRIS, payroll, IT, and equity tools.", last: true },
      ],
    },
    bento: {
      eyebrow: "Why tech teams choose Spine",
      heading: { pre: "Optimized for", accent: "your reality." },
      feature: {
        icon: "ChartBar",
        title: "Level-funded plans",
        body: "Pay only for the claims your team actually has, and get surplus refunds at year-end. Ideal for the healthy, younger tech workforce.",
        chips: ["Surplus refunds", "Right-sized", "20–30% savings"],
      },
      cards: [
        { icon: "Globe", title: "Multi-state native", body: "Remote-first or hybrid? Every state's tax, hiring, and compliance, automatically." },
        { icon: "Lightbulb", title: "Modern benefits", body: "Mental health (Spring Health), fertility (Carrot, Maven), wellness, learning stipends." },
        { icon: "PlugsConnected", title: "Tech-native experience", body: "API integrations with Rippling, Gusto, Justworks, Deel. Slack-first support." },
        { icon: "RocketLaunch", title: "Fast hiring support", body: "Onboarding that keeps up with tech velocity, I-9, equipment, benefits, day-1 ready." },
      ],
    },
    testimonial: {
      quote: {
        pre: "Level-funded through Spine, we cut healthcare",
        accent: "27%",
        post: " and got surplus back at year-end, for a team that barely files claims.",
      },
      name: "Alex Rivera",
      role: "COO · Streamline (SaaS, 80 people)",
    },
    cta: {
      heading: { pre: "Built for the way tech works." },
      lead: "Free benchmark against tech peer cohorts. See exactly how Spine compares.",
      button: { label: "Run free cost analysis", href: "#demo" },
    },
  },

  "ai-companies": {
    slug: "ai-companies",
    pillIcon: "Robot",
    pillLabel: "AI companies",
    h1: { pre: "Benefits at", accent: "AI speed." },
    lead: "You're hiring world-class talent at hyperspeed. You can't afford to lose a hire because the benefits portal isn't ready. Spine moves at AI-company velocity, live in days, scaling with you.",
    primary: demo,
    secondary: explore,
    heroImage: { src: "/who-we-serve/ai-companies.png", alt: "An AI company building its pipeline" },
    statRail: [
      { figure: "7d", label: "From signup to live" },
      { figure: "5x", label: "Avg. AI-company growth speed" },
      { figure: "Yes", label: "Multi-state, day 1" },
      { figure: "Yes", label: "Global team coordination" },
    ],
    shift: {
      eyebrow: "The shift",
      heading: { pre: "Most stacks can't keep up.", accent: "Spine moves at your speed." },
      oldLabel: "The old way · can't keep up",
      oldItems: [
        { title: "60-day implementations", sub: "Lose a hire before benefits are ready." },
        { title: "Re-implement to scale", sub: "Every growth spurt breaks the stack." },
        { title: "No global coordination", sub: "International hires left stranded." },
      ],
      newLabel: "With Spine",
      newItems: [
        { title: "Live in 7 days", sub: "Move at AI-company velocity." },
        { title: "Scales with hyper-growth", sub: "5 hires or 50, no re-build." },
        { title: "US + global coordination", sub: "EOR handoff for international hires." },
      ],
    },
    timeline: {
      eyebrow: "How it works",
      heading: { pre: "From 0 to 50 hires,", accent: "on Spine." },
      intro: "No 60-day implementation. We launch fast and absorb every bit of growth you throw at us.",
      steps: [
        { icon: "MagnifyingGlass", day: "Day 0", title: "Free audit, fast", sub: "48-hour turnaround. Plans modeled for current and projected headcount." },
        { icon: "Signature", day: "Day 3", title: "BOR & carriers", sub: "Carriers contacted, plans set up, no 60-day implementation." },
        { icon: "PlugsConnected", day: "Day 7", title: "Live on the Heal app", sub: "Employees onboarded, plan picker, digital cards, concierge." },
        { icon: "Check", day: "Ongoing", title: "We absorb the growth", sub: "Hire 50 in a quarter or add 10 states? Every layer scales automatically.", last: true },
      ],
    },
    bento: {
      eyebrow: "Why AI teams pick Spine",
      heading: { pre: "Built for", accent: "AI-company speed." },
      feature: {
        icon: "Robot",
        title: "Hyperscale-ready",
        body: "Hire 5 people one month, 50 the next. Spine scales with you without breaking, no re-implementation, no gaps in coverage.",
        chips: ["7-day launch", "No re-build", "Multi-state"],
      },
      cards: [
        { icon: "Globe", title: "Global team support", body: "US employees end-to-end, with EOR coordination for international hires (Deel, Remote, Oyster)." },
        { icon: "Lightbulb", title: "Equity-aware benefits", body: "Your equity story is your benefits story, we align messaging with your comp framework." },
        { icon: "ChatCircleText", title: "AI-native concierge", body: "Employees expect AI-native UX. The Heal app answers instantly, with humans as backup." },
        { icon: "ChartBar", title: "Fast-feedback dashboards", body: "Real-time headcount, cost, and compliance visibility, move at investor speed." },
      ],
    },
    testimonial: {
      quote: {
        pre: "We went from 8 to 60 people in two quarters. Spine",
        accent: "scaled with us",
        post: ", new state, new hire, day-1 ready, every time.",
      },
      name: "Nina Park",
      role: "Head of Ops · Cortex AI (Series B)",
    },
    cta: {
      heading: { pre: "Move at the speed of your hiring." },
      lead: "Spine launches benefits in 7 days and scales with your hiring velocity. Built for AI-company speed.",
      button: { label: "Talk to Spine", href: "#demo" },
    },
  },

  fintech: {
    slug: "fintech",
    pillIcon: "CreditCard",
    pillLabel: "Fintech",
    h1: { pre: "Fintech benefits.", accent: "Audit-ready." },
    lead: "You're already audited by regulators, banking partners, and investors. The last thing you need is a benefits stack that adds compliance risk. Spine is built for fintech operational rigor.",
    primary: demo,
    secondary: explore,
    heroImage: { src: "/who-we-serve/fintech.png", alt: "A fintech operator reviewing finances" },
    statRail: [
      { figure: "100%", label: "Filings on-time" },
      { figure: "SOC 2", label: "Compatible documentation" },
      { figure: "50", label: "States covered" },
      { figure: "Audit-ready", label: "By default" },
    ],
    shift: {
      eyebrow: "The shift",
      heading: { pre: "Benefits shouldn't", accent: "add audit risk." },
      oldLabel: "The old way · adds risk",
      oldItems: [
        { title: "Benefits add audit exposure", sub: "One more thing regulators flag." },
        { title: "No documentation trail", sub: "Filings you can't defend." },
        { title: "Vendor risk unknowns", sub: "No SOC 2, no pass-through." },
      ],
      newLabel: "With Spine",
      newItems: [
        { title: "Audit-ready by default", sub: "Timestamped trail for every action." },
        { title: "SOC 2-compatible docs", sub: "Pass through to partners & auditors." },
        { title: "Multi-entity handled", sub: "Holdco, opco, subs, all compliant." },
      ],
    },
    timeline: {
      eyebrow: "How it works",
      heading: { pre: "Fintech-grade", accent: "operational rigor." },
      intro: "Every step documented for audit defensibility, from risk audit to pass-through to your auditors.",
      steps: [
        { icon: "MagnifyingGlass", day: "Step 1", title: "Risk audit", sub: "Audit your compliance posture, identify gaps, map a remediation path." },
        { icon: "Signature", day: "Step 2", title: "Migrate with documentation", sub: "Migration plan, comms, and carrier transitions, all documented." },
        { icon: "Check", day: "Ongoing", title: "Pass through to auditors", sub: "Documentation and SOC 2 posture pass to partners, investors, and auditors.", last: true },
      ],
    },
    bento: {
      eyebrow: "Compliance-grade",
      heading: { pre: "Compliance-grade", accent: "benefits operations." },
      feature: {
        icon: "ShieldCheck",
        title: "Audit-ready by default",
        body: "Every filing, payment, and compliance action logged with timestamps and exportable for any audit, built to pass through to your investors, banking partners, and auditors.",
        chips: ["SOC 2", "Timestamped", "Exportable"],
      },
      cards: [
        { icon: "LockKeyOpen", title: "SOC 2 compatible", body: "Spine SOC 2 documentation available for your vendor risk assessments and security reviews." },
        { icon: "FileText", title: "Regulatory-grade records", body: "Records, I-9s, elections, securely stored, version-controlled, retrievable on demand." },
        { icon: "Globe", title: "Multi-state, multi-entity", body: "Holdco, opco, subsidiaries, multi-state tax and payroll compliance across structures." },
        { icon: "Bell", title: "Proactive monitoring", body: "Regulatory changes, deadline shifts, agency updates, monitored continuously." },
      ],
    },
    testimonial: {
      quote: {
        pre: "Our banking partners audit everything. Spine's",
        accent: "audit-ready",
        post: " documentation passed through without a single follow-up.",
      },
      name: "Daniel Wu",
      role: "COO · Ledgerline (fintech, 110 people)",
    },
    cta: {
      heading: { pre: "Compliance-grade benefits for fintech." },
      lead: "Free compliance audit. We map your current posture against fintech standards and Spine's coverage.",
      button: { label: "Free compliance audit", href: "#demo" },
    },
  },

  "healthcare-biotech": {
    slug: "healthcare-biotech",
    pillIcon: "Dna",
    pillLabel: "Healthcare & Biotech",
    h1: { pre: "Benefits for the", accent: "science companies." },
    lead: "Your team includes researchers with families, engineers transitioning from academia, and execs with complex healthcare needs. Spine builds plans that work for scientists, not just startups.",
    primary: demo,
    secondary: explore,
    heroImage: { src: "/who-we-serve/healthcare-biotech.png", alt: "A healthcare & biotech team at work" },
    statRail: [
      { figure: "45%+", label: "Avg. dependent rate" },
      { figure: "Aetna+", label: "Premium carriers prioritized" },
      { figure: "Yes", label: "Lab compliance handled" },
      { figure: "Yes", label: "Fertility & family planning" },
    ],
    shift: {
      eyebrow: "The shift",
      heading: { pre: "Startup plans don't fit", accent: "science teams." },
      oldLabel: "The old way · startup plans",
      oldItems: [
        { title: "Built for young SaaS teams", sub: "Ignores dependents and families." },
        { title: "Thin provider networks", sub: "Researchers expect premium carriers." },
        { title: "No fertility/family support", sub: "A hiring disadvantage in science." },
      ],
      newLabel: "With Spine",
      newItems: [
        { title: "Family-tier plans", sub: "Modeled around 45%+ dependent rates." },
        { title: "Premium carriers prioritized", sub: "Aetna, Blue Shield, Kaiser." },
        { title: "Fertility & family planning", sub: "Carrot, Maven, Progyny built in." },
      ],
    },
    timeline: {
      eyebrow: "How it works",
      heading: { pre: "Industry-tailored", accent: "migration." },
      intro: "Carriers and plan designs tailored to scientist-led teams and the research hubs they work in.",
      steps: [
        { icon: "MagnifyingGlass", day: "Step 1", title: "Specialty audit", sub: "Benchmark against healthcare/biotech peers; tailor plans to scientist teams." },
        { icon: "PlugsConnected", day: "Step 2", title: "Migrate with care", sub: "Carriers selected for network depth in Boston, Bay Area, San Diego." },
        { icon: "Check", day: "Ongoing", title: "Ongoing optimization", sub: "Renewal strategy tuned to the utilization patterns of science workforces.", last: true },
      ],
    },
    bento: {
      eyebrow: "For science teams",
      heading: { pre: "Built for the way", accent: "science teams work." },
      feature: {
        icon: "Dna",
        title: "Premium carrier access",
        body: "Researchers and clinicians expect Aetna, Blue Shield, Kaiser, and family-friendly networks. We prioritize them, and model plans around family-tier utilization.",
        chips: ["Aetna", "Blue Shield", "Kaiser"],
      },
      cards: [
        { icon: "UsersThree", title: "Family-aware plans", body: "Science teams skew older with more dependents. We model plans around family-tier utilization." },
        { icon: "Gift", title: "Fertility & family planning", body: "Carrot, Maven, Progyny integration, often a hiring differentiator in this industry." },
        { icon: "ShieldCheck", title: "Lab-ready compliance", body: "Workers' comp, lab safety, hazardous materials, industry-specific compliance built in." },
        { icon: "FirstAidKit", title: "Care navigation", body: "Complex specialist referrals, second opinions, clinical-trial coordination in the app." },
      ],
    },
    testimonial: {
      quote: {
        pre: "Half our team has families, and they expect real coverage. Spine built",
        accent: "family-tier plans",
        post: " with the carriers our researchers actually want.",
      },
      name: "Dr. Mara Feld",
      role: "VP People · Helix Bio (San Diego + Boston)",
    },
    cta: {
      heading: { pre: "Real benefits for science teams." },
      lead: "Free audit benchmarked against healthcare and biotech peer cohorts. See exactly how Spine compares.",
      button: { label: "Run free cost analysis", href: "#demo" },
    },
  },

  "professional-services": {
    slug: "professional-services",
    pillIcon: "Briefcase",
    pillLabel: "Professional services",
    h1: { pre: "Benefits for", accent: "professional services." },
    lead: "Law firms, consultancies, agencies, accounting firms. Partner/employee mix, per-partner economics, complex billable team structures. Spine handles the operational complexity.",
    primary: demo,
    secondary: explore,
    heroImage: { src: "/who-we-serve/professional-services.png", alt: "A professional services consultant at work" },
    statRail: [
      { figure: "W-2 + K-1", label: "Partner/employee structure" },
      { figure: "Yes", label: "Variable comp tracking" },
      { figure: "Yes", label: "K-1 coordination" },
      { figure: "Multi", label: "Office, multi-state" },
    ],
    shift: {
      eyebrow: "The shift",
      heading: { pre: "One-size plans", accent: "don't fit firms." },
      oldLabel: "The old way · one-size plans",
      oldItems: [
        { title: "Partners & staff, same plan", sub: "Ignores W-2 + K-1 complexity." },
        { title: "Manual variable comp", sub: "Bonuses & distributions off-system." },
        { title: "Multi-office tax gaps", sub: "NY, SF, Chicago handled ad hoc." },
      ],
      newLabel: "With Spine",
      newItems: [
        { title: "Tiered by role", sub: "Separate structures for partners & staff." },
        { title: "Variable comp tracked", sub: "Bonuses & distributions reconciled." },
        { title: "Multi-office compliant", sub: "Every office's tax & hiring, handled." },
      ],
    },
    timeline: {
      eyebrow: "How it works",
      heading: { pre: "Migration that respects", accent: "firm complexity." },
      intro: "We map your partner/employee/contractor structure and multi-office footprint, then execute against it.",
      steps: [
        { icon: "MagnifyingGlass", day: "Step 1", title: "Firm-structure audit", sub: "Map partner/employee/contractor structure, offices, and comp complexity." },
        { icon: "Signature", day: "Step 2", title: "Tiered plan design", sub: "Separate plan structures for partners and employees; custom enrollment rules." },
        { icon: "Check", day: "Year-end", title: "Coordinated execution", sub: "Payroll, benefits, taxes, W-2s and K-1s generated and filed with your CPA.", last: true },
      ],
    },
    bento: {
      eyebrow: "For partner-employee firms",
      heading: { pre: "Built for", accent: "partner-employee firms." },
      feature: {
        icon: "Briefcase",
        title: "Partner & employee tiers",
        body: "Different plan structures for partners (W-2 + K-1) and employees, with separate enrollment and tax handling, all in one system.",
        chips: ["W-2 + K-1", "Tiered", "Multi-office"],
      },
      cards: [
        { icon: "ChartBar", title: "Variable comp tracking", body: "Bonus payouts, profit-sharing, and partner distributions coordinated with payroll and tax." },
        { icon: "Globe", title: "Multi-office support", body: "NY, SF, Chicago, Boston, DC, multi-state tax, hiring, and compliance across offices." },
        { icon: "UsersThree", title: "Tiered benefits by role", body: "Different plan tiers for partners, senior associates, and junior staff." },
        { icon: "FileText", title: "Coordinated tax filings", body: "W-2s for employees, K-1s for partners, coordinated with your CPA or finance team." },
      ],
    },
    testimonial: {
      quote: {
        pre: "Partners on K-1, associates on W-2, four offices, Spine handled the",
        accent: "whole structure",
        post: " without us re-explaining it every quarter.",
      },
      name: "Thomas Reed",
      role: "Managing Partner · Reed & Vance LLP",
    },
    cta: {
      heading: { pre: "Built for the way firms work." },
      lead: "Free audit of your current partner/employee benefits setup. We'll show you how Spine handles the complexity.",
      button: { label: "Talk to Spine", href: "#demo" },
    },
  },
};

export const audienceSlugs = Object.keys(audiencePages);
