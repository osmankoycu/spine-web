// Template D · Compare — one entry per competitor slug. Head-to-head pages that
// position Spine (the modern, AI-native alternative to brokers and PEOs, free to
// the employer) against a specific rival. Copy is grounded in Spine's real
// positioning: no co-employment, works on top of your existing payroll stack
// (Gusto, Rippling, ADP, Justworks, Deel), a dedicated consultant + AI, full
// compliance, and a 24/7 employee app. Rendered by TemplateD.
import type { ComparePage } from "@/lib/interior/types";

// "#demo" opens the Request-a-demo modal (see parts.tsx Button); Explore → home.
const demo = { label: "Get your savings estimate", href: "#demo" };
const explore = { label: "See the platform", href: "/" };
const crumb = (current: string) => [
  { label: "Compare", href: "/compare" },
  { label: current, current: true },
];

export const comparePages: Record<string, ComparePage> = {
  // ── vs TriNet PEO ────────────────────────────────────────────────
  trinet: {
    slug: "trinet",
    competitor: "TriNet",
    competitorSub: "PEO · co-employment",
    breadcrumb: crumb("vs TriNet"),
    eyebrow: "Compare · Spine vs TriNet",
    h1: { pre: "Everything TriNet does,", accent: "without the co-employment." },
    lead: "TriNet is a PEO: it puts your team on its EIN and its master medical plan, and charges a per-employee fee for the privilege. Spine gives you the same benefits, compliance, and support — on your own entity, on your own plans, free to your company.",
    primary: demo,
    secondary: explore,
    checks: ["Keep your own EIN", "$0 to your company", "Every carrier shopped"],
    snapshot: {
      title: "Spine vs TriNet · at a glance",
      points: [
        { label: "Employment", spine: "Your entity, your EIN", them: "Co-employment on TriNet's EIN" },
        { label: "Health plans", spine: "Your own group, every carrier", them: "TriNet master medical pool" },
        { label: "Cost to you", spine: "Free — carrier commission", them: "~$150–200/employee/mo" },
        { label: "Your stack", spine: "Runs on Gusto, Rippling, ADP…", them: "Forced onto TriNet's platform" },
      ],
      bottom: { label: "Est. savings, 50-person team", figure: "$90K+/yr" },
    },
    matrix: {
      eyebrow: "Line by line",
      heading: { pre: "Spine vs TriNet,", accent: "compared honestly." },
      intro: "A PEO bundles benefits, payroll, and compliance by becoming your co-employer. Spine unbundles the same outcomes and hands them back to you — without renting your headcount.",
      rows: [
        {
          label: "Employment model",
          icon: "Buildings",
          spine: "You keep your own EIN — no co-employment, ever.",
          them: "Co-employment: your team sits on TriNet's EIN.",
        },
        {
          label: "Health plans",
          icon: "FirstAidKit",
          spine: "Your own group plans, shopped across every major carrier.",
          them: "Bundled into TriNet's master medical pool.",
        },
        {
          label: "Renewals",
          icon: "ArrowsClockwise",
          spine: "AI models every carrier each cycle; claims data drives the ask down.",
          them: "Pooled risk — premiums can spike as your group grows.",
        },
        {
          label: "Cost to your company",
          icon: "Money",
          spine: "Free. We're paid by carriers, like any broker.",
          them: "Per-employee admin fees, roughly $150–200/mo each.",
        },
        {
          label: "Your tech stack",
          icon: "PlugsConnected",
          spine: "Runs on top of Gusto, Rippling, ADP, Justworks or Deel.",
          them: "You migrate onto TriNet's HRIS and payroll.",
        },
        {
          label: "Support",
          icon: "Headset",
          spine: "A named senior consultant + a 24/7 employee app.",
          them: "A shared HR service pool and case queue.",
        },
        {
          label: "Compliance",
          icon: "ShieldCheck",
          spine: "Handled end-to-end — and it stays yours if you leave.",
          them: "Handled, but tied to co-employment. Leave and it's gone.",
        },
        {
          label: "Leaving",
          icon: "Door",
          spine: "No lock-in. Your entity, plans and data are already yours.",
          them: "A PEO exit: re-secure benefits, re-rate, re-implement.",
        },
      ],
    },
    differences: {
      eyebrow: "What actually changes",
      heading: { pre: "The PEO trade-offs", accent: "you no longer have to make." },
      intro: "TriNet's model asks you to give up your entity and your plans to get enterprise benefits. Spine gives you the benefits and lets you keep both.",
      items: [
        { icon: "Signature", title: "No co-employment", body: "Hire on your own EIN. Your cap table, your equity plan, your workers' comp — none of it gets routed through a PEO." },
        { icon: "ChartLineUp", title: "Your own optimized plans", body: "Instead of a master pool, AI right-sizes plans to your actual workforce and shops every carrier — up to 25% off healthcare costs." },
        { icon: "CurrencyCircleDollar", title: "No per-employee fees", body: "PEOs charge $150–200 per employee per month. Spine is free to your company — we earn carrier commission, like every broker." },
        { icon: "PlugsConnected", title: "Keep your stack", body: "No forced migration. Spine runs on top of the payroll and HRIS you already use — Gusto, Rippling, ADP, Justworks, Deel." },
        { icon: "UserCircle", title: "A real, named expert", body: "A dedicated senior consultant on Slack or text — plus a 50+ vetted fractional-HR network — instead of a generic support pool." },
        { icon: "Door", title: "Zero exit tax", body: "There's no PEO to exit. If you ever leave Spine, your entity, plans, carriers and records are already in your name." },
      ],
    },
    fair: {
      eyebrow: "The honest take",
      heading: { pre: "Where each one", accent: "actually fits." },
      intro: "We'd rather you pick the right model than the loudest pitch. Here's the fair version.",
      themLabel: "TriNet still makes sense if…",
      themPoints: [
        { title: "You want a single legal employer", body: "If you'd rather fully outsource employer liability and are comfortable with co-employment, a PEO's bundled model can be simpler." },
        { title: "You need bundled workers' comp", body: "PEOs fold workers' comp and some employer-of-record functions into one master policy, which suits some very small or high-risk teams." },
        { title: "You have zero benefits infrastructure", body: "A brand-new company with no entity-level plans may find the all-in-one master plan easier on day one." },
      ],
      spineLabel: "Spine wins when…",
      spinePoints: [
        { title: "You're scaling and cost matters", body: "As headcount grows, per-employee PEO fees and pooled renewals get expensive. Your own optimized plans compound in your favor." },
        { title: "You want to keep your entity", body: "Fundraising, equity, and clean cap-table hygiene are far simpler when your team is on your own EIN — not a PEO's." },
        { title: "You already have a payroll stack", body: "If you run Gusto, Rippling, ADP or Deel and don't want to rip it out, Spine layers on top instead of replacing it." },
      ],
    },
    numbers: {
      eyebrow: "By the numbers",
      heading: { pre: "The case", accent: "in figures." },
      stats: [
        { figure: "$0", label: "Cost to your company, always" },
        { figure: "25%", label: "Average healthcare cost reduction" },
        { figure: "7–10d", label: "From signed BOR to live" },
        { figure: "$150+", label: "Per-employee/mo PEO fee you drop" },
      ],
    },
    switch: {
      eyebrow: "Leaving the PEO",
      heading: { pre: "Off TriNet,", accent: "onto your own entity." },
      steps: [
        { title: "Free exit audit", body: "We map your TriNet plans, rates and renewal timing, then model what your own optimized plans would cost. You see the savings in 48 hours." },
        { title: "Set up your group", body: "We stand up your own carrier plans on your EIN, sign the broker-of-record letter, and sequence the transition around your renewal so nobody loses coverage." },
        { title: "Go live in 7–10 days", body: "Employees onboard in the Heal app, compliance and multi-state tax move onto autopilot, and payroll keeps running on your existing stack." },
      ],
    },
    faq: {
      eyebrow: "Common questions",
      heading: { pre: "Switching from a PEO,", accent: "answered." },
      items: [
        { q: "Do my employees lose coverage when we leave TriNet?", a: "No. We time the move around your renewal and stand up your own plans before the PEO plans end, so coverage is continuous. Digital cards are live in the Heal app on day one." },
        { q: "Is Spine a PEO too?", a: "No. Spine is an AI-native brokerage and service layer. There's no co-employment — your team stays on your EIN and your own group plans." },
        { q: "How is it free if TriNet charges per employee?", a: "Spine is paid by carriers through standard broker commission, the same way any broker is. There are no setup fees, admin fees, or per-employee charges to your company." },
        { q: "Do we have to change payroll?", a: "No. Spine runs on top of whatever you use — Gusto, Rippling, ADP, Justworks or Deel. Leaving the PEO doesn't mean a payroll migration." },
      ],
    },
    cta: {
      heading: { pre: "See what TriNet is", accent: "really costing you." },
      lead: "Free exit audit. We pull your current PEO plans and fees, model your own optimized plans, and show you exactly what you'd save — in 48 hours.",
      button: { label: "Run my free PEO exit audit", href: "#demo" },
    },
  },

  // ── vs Rippling PEO ──────────────────────────────────────────────
  rippling: {
    slug: "rippling",
    competitor: "Rippling",
    competitorSub: "PEO · software-first",
    breadcrumb: crumb("vs Rippling"),
    eyebrow: "Compare · Spine vs Rippling",
    h1: { pre: "Rippling sells you software.", accent: "Spine runs the work." },
    lead: "Rippling's PEO is co-employment wrapped in great software — you still administer benefits yourself, in the app. Spine is a done-for-you service on your own entity: a real consultant and AI shop, optimize and run your benefits and compliance. And we run right on top of Rippling payroll.",
    primary: demo,
    secondary: explore,
    checks: ["No co-employment", "Done for you, not DIY", "Layers on Rippling payroll"],
    snapshot: {
      title: "Spine vs Rippling PEO · at a glance",
      points: [
        { label: "Model", spine: "Done-for-you service", them: "Self-serve software + PEO" },
        { label: "Employment", spine: "Your entity, your EIN", them: "Co-employment on Rippling PEO" },
        { label: "Benefits", spine: "Consultant + AI optimize them", them: "You administer them in-app" },
        { label: "Payroll", spine: "We run it on your Rippling", them: "Rippling payroll (keep it)" },
      ],
      bottom: { label: "Est. savings, 50-person team", figure: "$80K+/yr" },
    },
    matrix: {
      eyebrow: "Line by line",
      heading: { pre: "Spine vs Rippling,", accent: "compared honestly." },
      intro: "Rippling is a superb system of record — and you can keep it. The question is who actually does your benefits and compliance: software you operate, or a team that operates it for you.",
      rows: [
        {
          label: "Who does the work",
          icon: "UserCircle",
          spine: "A dedicated consultant + AI run benefits and compliance for you.",
          them: "You do it yourself inside the Rippling app.",
        },
        {
          label: "Employment model",
          icon: "Buildings",
          spine: "Your own EIN — no co-employment.",
          them: "Rippling PEO is co-employment on their EIN.",
        },
        {
          label: "Health plans",
          icon: "FirstAidKit",
          spine: "Your own group, every carrier, right-sized to your team.",
          them: "PEO master plan, or a broker you still manage.",
        },
        {
          label: "Renewals",
          icon: "ArrowsClockwise",
          spine: "AI models every carrier; claims data drives the ask down.",
          them: "Renewal quotes surfaced in software — you negotiate.",
        },
        {
          label: "Payroll",
          icon: "PlugsConnected",
          spine: "We run payroll on top of your Rippling — keep the tool.",
          them: "Rippling payroll, operated by your team.",
        },
        {
          label: "Support",
          icon: "Headset",
          spine: "A named human + a 24/7 employee app with bill defense.",
          them: "Software support tickets and a help center.",
        },
        {
          label: "Compliance",
          icon: "ShieldCheck",
          spine: "ACA, ERISA, 5500, multi-state, notices — executed for you.",
          them: "Flagged by the platform; execution is largely on you.",
        },
        {
          label: "Cost to your company",
          icon: "Money",
          spine: "Free — carrier commission. No per-seat benefits fee.",
          them: "Per-employee software + PEO pricing.",
        },
      ],
    },
    differences: {
      eyebrow: "What actually changes",
      heading: { pre: "Software prompts you.", accent: "Spine does it." },
      intro: "Rippling gives you tools and reminders. Spine gives you a team that closes the work — while you keep Rippling for what it's great at.",
      items: [
        { icon: "Robot", title: "AI-native, human-run", body: "AI triages notices in minutes and models thousands of plan configurations. In-house experts execute — you're not the one clicking through the workflow." },
        { icon: "Signature", title: "Keep your entity", body: "Rippling's PEO means co-employment. Spine leaves your team on your own EIN, so your cap table and equity plan stay clean." },
        { icon: "PlugsConnected", title: "Runs on your Rippling", body: "You don't have to choose. Keep Rippling as your HRIS and payroll — Spine layers benefits, compliance and people ops on top of it." },
        { icon: "ChartLineUp", title: "Actively optimized plans", body: "Not a master pool and not a lazy renewal. Every carrier shopped every cycle, right-sized to your workforce — up to 25% off." },
        { icon: "CreditCard", title: "A real employee app", body: "24/7 concierge, digital cards, pharmacy savings and bill negotiation — the Care Navigator disputes wrong bills for your team, in-app." },
        { icon: "ShieldCheck", title: "Compliance, executed", body: "ACA, ERISA, COBRA, Form 5500, multi-state tax and .gov notices — monitored across 10,000+ jurisdictions and actually filed by us." },
      ],
    },
    fair: {
      eyebrow: "The honest take",
      heading: { pre: "Where each one", accent: "actually fits." },
      intro: "Rippling and Spine aren't always either/or — often they're better together. Here's the fair version.",
      themLabel: "Rippling shines when…",
      themPoints: [
        { title: "You want one system of record", body: "Rippling unifies HRIS, IT, device management and payroll beautifully. As a platform, it's best-in-class — and you can keep it." },
        { title: "You prefer self-serve software", body: "If you have an ops team that likes owning benefits admin in-app and wants everything under one login, Rippling's model fits." },
        { title: "You're buying IT + HR together", body: "Rippling's device and app provisioning is a genuine differentiator that Spine doesn't try to replace." },
      ],
      spineLabel: "Spine wins when…",
      spinePoints: [
        { title: "You want it done, not DIY", body: "If benefits, compliance and people ops are a distraction, Spine runs them with a real team instead of handing you more software." },
        { title: "You don't want co-employment", body: "Spine's benefits and compliance don't require a PEO. Keep your entity and still get enterprise-grade plans." },
        { title: "You want the best of both", body: "Keep Rippling for HRIS/IT/payroll and add Spine for benefits and compliance. You lose nothing and gain a team." },
      ],
    },
    numbers: {
      eyebrow: "By the numbers",
      heading: { pre: "The case", accent: "in figures." },
      stats: [
        { figure: "$0", label: "Cost to your company, always" },
        { figure: "24/7", label: "Employee support — team + AI" },
        { figure: "10K+", label: "Compliance jurisdictions monitored" },
        { figure: "80%+", label: "Employee questions resolved without HR" },
      ],
    },
    switch: {
      eyebrow: "Adding Spine",
      heading: { pre: "Keep Rippling.", accent: "Add a team." },
      steps: [
        { title: "Connect your Rippling", body: "We link to your existing Rippling for payroll and HRIS data — read/write access in under 10 minutes. No migration, no rip-and-replace." },
        { title: "We take over benefits & compliance", body: "Sign the broker-of-record letter. Spine shops your plans, moves ACA/ERISA/5500 and multi-state tax onto autopilot, and staffs a named consultant." },
        { title: "Employees go live in days", body: "Your team gets the Heal app for concierge, cards and bill defense — while payroll keeps running on the Rippling you already know." },
      ],
    },
    faq: {
      eyebrow: "Common questions",
      heading: { pre: "Spine alongside Rippling,", accent: "answered." },
      items: [
        { q: "Do I have to leave Rippling?", a: "No. Spine runs on top of Rippling payroll and HRIS. Most teams keep Rippling as their system of record and add Spine for benefits, compliance and people ops." },
        { q: "How is Spine different from Rippling's own brokerage?", a: "Rippling's benefits are software you operate, with a transactional broker. Spine is a done-for-you service: a dedicated consultant plus AI that actively optimizes and runs your plans." },
        { q: "Does Spine mean co-employment like the Rippling PEO?", a: "No. Spine is not a PEO. Your team stays on your own EIN and your own group plans — you get the benefits without the co-employment." },
        { q: "What does Spine cost on top of Rippling?", a: "Nothing to your company. Spine is paid by carrier commission. You keep paying Rippling for its software; Spine adds the team at no cost to you." },
      ],
    },
    cta: {
      heading: { pre: "Keep the software.", accent: "Add the team." },
      lead: "Free savings estimate. We model your plans against the full market and show what Spine would save — while you keep Rippling running underneath.",
      button: { label: "Get my free estimate", href: "#demo" },
    },
  },

  // ── vs Broker + Gusto ────────────────────────────────────────────
  gusto: {
    slug: "gusto",
    competitor: "Broker + Gusto",
    competitorSub: "Payroll software + a broker",
    breadcrumb: crumb("vs Broker + Gusto"),
    eyebrow: "Compare · Spine vs Broker + Gusto",
    h1: { pre: "Gusto runs payroll.", accent: "Spine runs everything around it." },
    lead: "The classic startup stack is Gusto for payroll plus a traditional broker for benefits — which leaves compliance, renewals and employee support on your desk. Spine keeps Gusto, replaces the once-a-year broker with a consultant and AI, and takes the compliance work off your plate.",
    primary: demo,
    secondary: explore,
    checks: ["Keep Gusto", "Replace the broker", "Compliance handled"],
    snapshot: {
      title: "Spine vs Broker + Gusto · at a glance",
      points: [
        { label: "Payroll", spine: "We run it on your Gusto", them: "Gusto, run by you (keep it)" },
        { label: "Benefits", spine: "Consultant + AI, every cycle", them: "Broker, once a year" },
        { label: "Compliance", spine: "ACA, 5500, multi-state — done", them: "Left to you in Gusto" },
        { label: "Employees", spine: "24/7 app + bill defense", them: "Email your broker, wait" },
      ],
      bottom: { label: "Est. savings, 50-person team", figure: "$60K+/yr" },
    },
    matrix: {
      eyebrow: "Line by line",
      heading: { pre: "Spine vs Broker + Gusto,", accent: "compared honestly." },
      intro: "Gusto is great payroll software — and you keep it. The gap is everything a self-serve tool and a once-a-year broker leave undone: optimization, compliance execution and real support.",
      rows: [
        {
          label: "Benefits service",
          icon: "UserCircle",
          spine: "A dedicated consultant + AI, engaged every cycle.",
          them: "A broker you email — active mostly at renewal.",
        },
        {
          label: "Plan design",
          icon: "ChartLineUp",
          spine: "Every carrier shopped, right-sized to your workforce.",
          them: "Commission-driven; renewals often roll over.",
        },
        {
          label: "Renewals",
          icon: "ArrowsClockwise",
          spine: "AI models the market; claims data drives the ask down.",
          them: "Annual quote, take-it-or-leave-it increases.",
        },
        {
          label: "Compliance",
          icon: "ShieldCheck",
          spine: "ACA, ERISA, 5500, multi-state, notices — done for you.",
          them: "Gusto flags basics; the rest is on you.",
        },
        {
          label: ".gov notices",
          icon: "Warning",
          spine: "AI triage in minutes; experts draft and resolve.",
          them: "Letters land on your desk — you sort it out.",
        },
        {
          label: "Payroll",
          icon: "PlugsConnected",
          spine: "We run it on top of your Gusto — keep the tool.",
          them: "Gusto payroll, operated by your team.",
        },
        {
          label: "Employee support",
          icon: "CreditCard",
          spine: "24/7 app: concierge, cards, pharmacy, bill defense.",
          them: "Employees email HR or the broker and wait.",
        },
        {
          label: "Cost to your company",
          icon: "Money",
          spine: "Free — carrier commission, like the broker.",
          them: "Broker commission + Gusto per-seat software fee.",
        },
      ],
    },
    differences: {
      eyebrow: "What actually changes",
      heading: { pre: "The gaps Gusto + a broker", accent: "leave open." },
      intro: "Gusto handles payroll; the broker sells the plan. Spine fills everything in between — and does it for the same commission your broker already earns.",
      items: [
        { icon: "ChartLineUp", title: "An always-on broker", body: "Not a once-a-year renewal. AI shops every carrier every cycle and a senior consultant negotiates with your own claims data — up to 25% off healthcare." },
        { icon: "ShieldCheck", title: "Compliance you don't touch", body: "ACA, ERISA, COBRA, Form 5500 and state mandates — monitored across 10,000+ jurisdictions and filed for you, not left in a Gusto checklist." },
        { icon: "MapTrifold", title: "Multi-state, handled", body: "Hire in a new state and we open the SUI, withholding and new-hire reporting accounts in 3–5 days — instead of you learning each state's portal." },
        { icon: "Warning", title: "Notices resolved for you", body: "IRS, DOL and state letters get AI-triaged in minutes and resolved by our experts — with penalty protection if we ever miss one we should've caught." },
        { icon: "CreditCard", title: "A real employee app", body: "24/7 concierge, digital cards, pharmacy savings and bill negotiation. The Care Navigator disputes wrong medical bills — the average employee saves ~$340/yr." },
        { icon: "PlugsConnected", title: "You keep Gusto", body: "Nothing to migrate. Spine runs payroll on top of your Gusto and adds benefits, compliance and people ops around it." },
      ],
    },
    fair: {
      eyebrow: "The honest take",
      heading: { pre: "Where each one", accent: "actually fits." },
      intro: "Gusto is a genuinely good product — this isn't a rip-and-replace pitch. Here's the fair version.",
      themLabel: "Broker + Gusto is fine when…",
      themPoints: [
        { title: "You're very small", body: "At 2–5 people with simple needs, Gusto's self-serve payroll and a basic broker plan can be all you need — and Spine still layers on when you grow." },
        { title: "You love your broker", body: "If you have a broker who genuinely shops the market and answers fast, and you enjoy owning compliance yourself, the DIY stack can work." },
        { title: "You want to self-serve everything", body: "Teams that prefer to run benefits and compliance in-house, in software, may not want a done-for-you service." },
      ],
      spineLabel: "Spine wins when…",
      spinePoints: [
        { title: "Compliance is piling up", body: "Once you're multi-state or past ~10 people, ACA, 5500 and notices get real. Spine executes them so they never hit your desk." },
        { title: "Renewals keep climbing", body: "If your broker roll-overs mean annual increases, AI optimization and claims-data negotiation change the trajectory." },
        { title: "You want it off your plate", body: "Spine does the work for the same commission the broker already earns — plus it runs on the Gusto you keep." },
      ],
    },
    numbers: {
      eyebrow: "By the numbers",
      heading: { pre: "The case", accent: "in figures." },
      stats: [
        { figure: "$0", label: "Cost to your company, always" },
        { figure: "25%", label: "Average healthcare cost reduction" },
        { figure: "50", label: "States covered for tax & hiring" },
        { figure: "$340", label: "Avg. employee savings, per year" },
      ],
    },
    switch: {
      eyebrow: "Adding Spine",
      heading: { pre: "Keep Gusto.", accent: "Retire the busywork." },
      steps: [
        { title: "Connect your Gusto", body: "We link to your existing Gusto for payroll and census data in under 10 minutes. No migration — Gusto stays exactly where it is." },
        { title: "We replace the broker", body: "Sign the broker-of-record letter. Spine shops your plans across every carrier, and moves ACA, 5500, multi-state tax and notices onto autopilot." },
        { title: "Live in 7–10 days", body: "Your team gets the Heal app for concierge and bill defense, and a named consultant picks up your renewals — while payroll keeps running on Gusto." },
      ],
    },
    faq: {
      eyebrow: "Common questions",
      heading: { pre: "Spine alongside Gusto,", accent: "answered." },
      items: [
        { q: "Do I have to leave Gusto?", a: "No. Spine runs on top of Gusto. You keep Gusto for payroll; Spine replaces the separate broker and takes over compliance and employee support around it." },
        { q: "Isn't Gusto listed as a Spine integration partner?", a: "Yes — that's the point. Spine isn't a payroll competitor; it operates on top of Gusto. The comparison here is against the broker + Gusto's do-it-yourself compliance, not Gusto's payroll." },
        { q: "What does Spine cost if I already pay Gusto and a broker?", a: "Spine is free to your company — paid by carrier commission, the same commission your broker already earns. You keep paying Gusto's software fee; Spine adds the team at no cost." },
        { q: "What about the compliance Gusto already does?", a: "Gusto handles payroll-tax basics well. Spine handles the benefits-side and multi-state work it doesn't — ACA reporting, ERISA/5500, COBRA, state registrations and .gov notice resolution — end to end." },
      ],
    },
    cta: {
      heading: { pre: "Keep Gusto.", accent: "Upgrade everything else." },
      lead: "Free savings estimate. We model your plans against the full market and show what Spine would save — while Gusto keeps running your payroll.",
      button: { label: "Get my free estimate", href: "#demo" },
    },
  },
};

export const compareSlugs = Object.keys(comparePages);
