// Template A · Platform / Feature — page data, one entry per slug. Copy adapted
// from the interior-content source (Heal → Spine). Rendered by TemplateA.
import type { PlatformPage } from "@/lib/interior/types";

// "#demo" opens the Request-a-demo modal (see parts.tsx Button); Explore → home.
const demo = { label: "Request a demo", href: "#demo" };
const explore = { label: "Explore the platform", href: "/" };
const crumb = (group: string, current: string) => [
  { label: "Platform", href: "/platform" },
  { label: group },
  { label: current, current: true },
];

export const platformPages: Record<string, PlatformPage> = {
  "plan-optimization": {
    slug: "plan-optimization",
    breadcrumb: crumb("Benefits", "Plan optimization"),
    eyebrow: "Benefits · Plan optimization",
    h1: { pre: "Plan optimization.", accent: "Smarter than your broker." },
    lead: "AI compares thousands of plan configurations against your actual workforce. Every major carrier, every cycle. No lazy renewals — costs go down, not up.",
    primary: demo,
    secondary: explore,
    checks: ["Every carrier shopped", "AI-driven modeling", "25% average savings"],
    mockup: {
      title: "Plan analysis · 2026 renewal",
      status: "Optimized",
      rows: [
        { tone: "ok", title: "Aetna HMO recommended for 80% of team", sub: "Best fit · $42K annual savings" },
        { tone: "ok", title: "Switched remote 1099s to ICHRA", sub: "Compliance + cost reduction" },
        { tone: "run", title: "Mid-year pharmacy carve-out modeling", sub: "AI projects $18K savings" },
        { tone: "ok", title: "Renewal countered with claims data", sub: "Carrier cut 9% increase to 3%" },
      ],
      total: { label: "Projected annual savings", figure: "$187K" },
    },
    features: {
      eyebrow: "What you get",
      heading: { pre: "Every renewal,", accent: "optimized end-to-end." },
      intro: "We don't just shop your renewal — we model it, negotiate it, and right-size it to your actual workforce.",
      items: [
        { icon: "ChartLineUp", title: "AI plan modeling", body: "Thousands of configurations evaluated against your team's demographics, claims history, and usage." },
        { icon: "ArrowsClockwise", title: "Every carrier, every year", body: "We shop every major carrier on every renewal — not just the incumbent. No lazy roll-overs." },
        { icon: "Pill", title: "Mid-year optimization", body: "Pharmacy carve-outs, plan adjustments, and claims-data leverage between renewals." },
        { icon: "UsersThree", title: "Right-sized for your team", body: "Plans built around your actual headcount, geographies, and demographics — not a master plan." },
        { icon: "Handshake", title: "Claims-data negotiation", body: "We use your own claims data to push back on premium hikes and unlock carrier concessions." },
        { icon: "UserCircle", title: "Dedicated consultant", body: "A senior benefits expert assigned to your account — never a junior or a call center." },
      ],
    },
    how: {
      eyebrow: "How it works",
      heading: { pre: "From audit to live in", accent: "days, not months." },
      steps: [
        { title: "Free audit", body: "We pull your current plans, claims data, and renewal history. AI runs the cost analysis in 48 hours." },
        { title: "Model the optimal plan", body: "Our team and AI compare every viable configuration across every carrier. You see the savings before you commit." },
        { title: "BOR & implementation", body: "Sign the broker-of-record letter. We handle the carrier transition, employee comms, and rollout." },
      ],
    },
    numbers: {
      eyebrow: "By the numbers",
      heading: { pre: "Plan optimization,", accent: "in numbers." },
      stats: [
        { figure: "25%", label: "Average reduction in healthcare costs" },
        { figure: "$4K", label: "Saved per employee per year" },
        { figure: "48h", label: "Cost audit turnaround" },
        { figure: "0", label: "Lazy renewals. We shop every cycle." },
      ],
    },
    cta: {
      heading: { pre: "See your", accent: "savings", post: " in 48 hours." },
      lead: "Free cost audit. We pull your current plans, run them against our optimization engine, and show you exactly what you're leaving on the table.",
      button: { label: "Run free cost analysis", href: "#demo" },
    },
  },

  payroll: {
    slug: "payroll",
    breadcrumb: crumb("People Ops", "Payroll"),
    eyebrow: "People Ops · Payroll",
    h1: { pre: "Payroll runs,", accent: "done for you." },
    lead: "We run payroll on your existing stack — Gusto, Rippling, ADP, Justworks. Every cycle processed, reconciled, and filed. You hire; we handle the rest.",
    primary: demo,
    secondary: explore,
    checks: ["Works on your stack", "Tax filings included", "Reconciled every cycle"],
    mockup: {
      title: "Payroll · This week",
      status: "Processed Friday",
      rows: [
        { tone: "ok", title: "Bi-weekly payroll · $293K", sub: "47 employees · processed Friday" },
        { tone: "ok", title: "Federal & state taxes filed", sub: "All jurisdictions current" },
        { tone: "ok", title: "Reconciliation complete", sub: "0 discrepancies · balanced" },
        { tone: "run", title: "Q2 941 prep in progress", sub: "Auto-file scheduled · 06/30" },
      ],
      total: { label: "On-time rate · YTD", figure: "100%" },
    },
    features: {
      eyebrow: "What you get",
      heading: { pre: "Payroll on your existing stack —", accent: "we just run it." },
      intro: "You don't need a new payroll platform. We work on top of Gusto, Rippling, ADP, Justworks, Deel — whichever you have.",
      items: [
        { icon: "Money", title: "Every cycle processed", body: "We run payroll on time, every time. Bi-weekly, semi-monthly, monthly — your schedule, our execution." },
        { icon: "FileText", title: "Tax filings handled", body: "941s, 940s, state returns, year-end W-2s and 1099s — all prepared and filed by us." },
        { icon: "Scales", title: "Reconciliation built-in", body: "Every cycle balanced against your GL. Discrepancies flagged before they become problems." },
        { icon: "ArrowsClockwise", title: "Works on your platform", body: "Gusto, Rippling, ADP, Justworks, Deel — we operate inside your existing payroll provider, no migration needed." },
        { icon: "Globe", title: "Multi-state ready", body: "Hires in any state? We've already set up the tax accounts. Payroll runs without missing a beat." },
        { icon: "ChartBar", title: "Real-time visibility", body: "See every payroll, every filing, every payment in one dashboard. Always up-to-date." },
      ],
    },
    how: {
      eyebrow: "How it works",
      heading: { pre: "Payroll,", accent: "on rails." },
      steps: [
        { title: "Connect your platform", body: "Link Spine to your existing payroll provider. We get read/write access in under 10 minutes." },
        { title: "We run every cycle", body: "Bi-weekly, semi-monthly, monthly — we process payroll, file taxes, reconcile the books. You approve." },
        { title: "Tax season is a non-event", body: "W-2s, 1099s, 940s, 941s — all prepared, filed, and distributed by us. You don't lift a finger." },
      ],
    },
    numbers: {
      eyebrow: "By the numbers",
      heading: { pre: "Payroll,", accent: "measured." },
      stats: [
        { figure: "100%", label: "On-time rate" },
        { figure: "0", label: "Missed filings" },
        { figure: "5+", label: "Payroll platforms supported" },
        { figure: "Yes", label: "Multi-state ready" },
      ],
    },
    cta: {
      heading: { pre: "Let us run payroll on", accent: "your stack." },
      lead: "Payroll, tax filings, year-end forms — all included in Spine People Ops. Free for your company on a Spine benefits plan.",
      button: { label: "Get started", href: "#demo" },
    },
  },

  onboarding: {
    slug: "onboarding",
    breadcrumb: crumb("People Ops", "Onboarding & offboarding"),
    eyebrow: "People Ops · Lifecycle",
    h1: { pre: "Day-1 ready.", accent: "Day-last clean." },
    lead: "I-9, E-Verify, benefits enrollment, equipment, payroll setup, final paychecks, COBRA notices — every onboarding and offboarding handled, end-to-end.",
    primary: demo,
    secondary: explore,
    checks: ["I-9 + E-Verify in 24h", "Benefits enrolled day 1", "COBRA never missed"],
    mockup: {
      title: "Lifecycle queue · This week",
      status: "3 on · 2 off",
      rows: [
        { tone: "ok", title: "Sarah K. · Eng, remote-TX", sub: "Day 1 ready · I-9, benefits, payroll set" },
        { tone: "ok", title: "Marcus L. · Design, NYC", sub: "Onboarding complete · paperwork filed" },
        { tone: "run", title: "Priya R. · Sales, CA", sub: "I-9 pending · scheduled for 06/20" },
        { tone: "ok", title: "Jordan C. · Offboarded", sub: "Final paycheck issued · COBRA notice sent" },
      ],
      total: { label: "Day-1 ready rate", figure: "100%" },
    },
    features: {
      eyebrow: "What you get",
      heading: { pre: "Every lifecycle event,", accent: "handled." },
      intro: "From signed offer to vested equity exit — we run the workflow. Your team feels welcomed; your records stay clean.",
      items: [
        { icon: "NotePencil", title: "I-9 & E-Verify", body: "Within 24 hours of hire. Federal compliance, securely stored, audit-ready." },
        { icon: "Gift", title: "Benefits enrollment", body: "Day-1 benefits ready. Plan picker in the Spine app, dependents added, cards issued." },
        { icon: "CreditCard", title: "Payroll setup", body: "Direct deposit, tax forms, withholdings — all configured before their first paycheck." },
        { icon: "Package", title: "Equipment & access", body: "Coordination with IT for laptops, accounts, software access. Day-1 productivity." },
        { icon: "HandWaving", title: "Offboarding workflow", body: "Final paychecks calculated, equipment retrieval scheduled, access revoked across systems." },
        { icon: "Envelope", title: "COBRA & continuation", body: "Election notices sent within mandated 14-day window. Continuation tracked through end of period." },
      ],
    },
    how: {
      eyebrow: "How it works",
      heading: { pre: "Lifecycle,", accent: "scripted." },
      steps: [
        { title: "Add the employee", body: "In your HRIS or directly in Spine. We pick up everything from there." },
        { title: "We run the workflow", body: "I-9, E-Verify, benefits, payroll, equipment, accounts — every task tracked, every deadline met." },
        { title: "Day-1 ready, day-last clean", body: "Your new hire shows up enabled. Your separations exit clean — with COBRA, references, and records intact." },
      ],
    },
    numbers: {
      eyebrow: "By the numbers",
      heading: { pre: "Lifecycle,", accent: "measured." },
      stats: [
        { figure: "24h", label: "I-9 & E-Verify turnaround" },
        { figure: "100%", label: "Day-1 ready rate" },
        { figure: "0", label: "COBRA windows missed" },
        { figure: "48h", label: "Avg. offboarding cycle" },
      ],
    },
    cta: {
      heading: { pre: "Onboarding & offboarding,", accent: "handed off." },
      lead: "Every lifecycle workflow handled by Spine. Included in Spine People Ops.",
      button: { label: "Get started", href: "#demo" },
    },
  },

  "records-pto": {
    slug: "records-pto",
    breadcrumb: crumb("People Ops", "Employee records & PTO"),
    eyebrow: "People Ops · Day-to-day",
    h1: { pre: "Records & PTO.", accent: "Day-to-day done." },
    lead: "PTO requests, employee records, day-to-day people ops questions, HRIS data hygiene — your team's HR layer, run by Spine. Your team gets answers; you stay focused.",
    primary: demo,
    secondary: explore,
    checks: ["PTO tracking included", "Employee inquiries handled", "HRIS kept clean"],
    mockup: {
      title: "People ops queue · Live",
      status: "4 active",
      rows: [
        { tone: "ok", title: "PTO approved · 3 requests", sub: "Auto-applied to payroll" },
        { tone: "run", title: "Employee Q: 401(k) match details", sub: "AI responded · escalated to HR if needed" },
        { tone: "ok", title: "Record updated · address change", sub: "Synced to HRIS, payroll, benefits" },
        { tone: "run", title: "PTO balance audit · Q2", sub: "Reconciliation in progress" },
      ],
      total: { label: "Resolved without HR", figure: "80%" },
    },
    features: {
      eyebrow: "What you get",
      heading: { pre: "The day-to-day HR layer,", accent: "handled." },
      intro: "The small stuff piles up: PTO questions, address updates, benefit changes, anniversary milestones. We handle every one — so your team doesn't have to.",
      items: [
        { icon: "ClipboardText", title: "PTO tracking & approval", body: "Requests, balances, accruals — tracked across your HRIS and reflected in payroll automatically." },
        { icon: "ChatCircleText", title: "Employee inquiries", body: "Address changes, benefits questions, payroll concerns — answered by AI first, humans when needed." },
        { icon: "FolderOpen", title: "Records management", body: "Employee files, I-9s, tax forms, benefit elections — securely stored, audit-ready, searchable." },
        { icon: "ArrowsClockwise", title: "HRIS data hygiene", body: "Stale records cleaned, missing fields flagged, sync errors caught. Your HRIS stays accurate." },
        { icon: "Cake", title: "Milestones & eligibility", body: "Anniversary dates, benefits enrollment windows, vesting milestones — flagged before they pass." },
        { icon: "ChartBar", title: "People-ops reporting", body: "Headcount, geographies, demographics, attrition — exportable dashboards for finance and leadership." },
      ],
    },
    how: {
      eyebrow: "How it works",
      heading: { pre: "Day-to-day,", accent: "on autopilot." },
      steps: [
        { title: "Plug into your stack", body: "We integrate with your HRIS, payroll, and benefits. Spine becomes the people-ops layer on top." },
        { title: "Employees route to Spine", body: "They ask questions, request PTO, update records — through the Spine app or directly to us." },
        { title: "You focus on the work", body: "We handle the chatter. You see the dashboard. Your team feels supported." },
      ],
    },
    numbers: {
      eyebrow: "By the numbers",
      heading: { pre: "Day-to-day,", accent: "measured." },
      stats: [
        { figure: "<2h", label: "Avg. employee response time" },
        { figure: "100%", label: "Records audit-ready" },
        { figure: "80%", label: "Questions resolved without HR" },
        { figure: "0", label: "PTO disputes on our watch" },
      ],
    },
    cta: {
      heading: { pre: "Hand off", accent: "the small stuff." },
      lead: "PTO, employee records, day-to-day people ops — included in Spine People Ops.",
      button: { label: "Get started", href: "#demo" },
    },
  },

  "notice-resolution": {
    slug: "notice-resolution",
    breadcrumb: crumb("Compliance", "Notice resolution"),
    eyebrow: "Compliance · Notices",
    h1: { pre: "Every .gov letter,", accent: "handled." },
    lead: "IRS, DOL, state agencies — they all write. We read every letter, classify the urgency, draft the response, and resolve the issue. You see the summary, not the panic.",
    primary: demo,
    secondary: explore,
    checks: ["AI-first triage", "In-house expert resolution", "Full audit trail"],
    mockup: {
      title: "Notice queue · This week",
      status: "3 resolved",
      rows: [
        { tone: "ok", title: "IRS CP-180 · ACA reconciliation", sub: "Resolved · no balance due" },
        { tone: "run", title: "DOL request · ERISA SPD review", sub: "AI drafted · expert reviewing" },
        { tone: "ok", title: "CA EDD SUI rate notice", sub: "Updated rate applied" },
        { tone: "run", title: "NY DOL inquiry · PFML contributions", sub: "Response drafted · sending today" },
      ],
      total: { label: "Penalties paid by clients", figure: "0%" },
    },
    features: {
      eyebrow: "What you get",
      heading: { pre: "From letter to resolved,", accent: "automatically." },
      intro: "Government letters used to mean stress, late nights, and lawyer bills. Now they mean: a notification in Spine, and a resolved status the next day.",
      items: [
        { icon: "Robot", title: "AI triage in minutes", body: "Every notice scanned the moment it arrives. AI classifies urgency, agency, topic, and required action." },
        { icon: "PenNib", title: "Expert drafting", body: "Our in-house compliance team drafts the response — using your records, claims data, and historical filings." },
        { icon: "Phone", title: "Direct agency contact", body: "When a phone call is needed, we make it. You stay out of phone tag with the IRS." },
        { icon: "ClipboardText", title: "Full audit trail", body: "Every notice, every response, every confirmation — logged forever. Audit-ready by default." },
        { icon: "Bell", title: "You stay informed, not buried", body: "Weekly digest of what came in, what we're doing, and what's resolved. No 4-page legal letters in your inbox." },
        { icon: "ShieldCheck", title: "Penalty protection", body: "Caught a notice we should've handled? We cover the penalty. Period." },
      ],
    },
    how: {
      eyebrow: "How it works",
      heading: { pre: "From inbox to", accent: "resolved." },
      steps: [
        { title: "Notice arrives", body: "Sent to your dedicated Spine mailroom. AI classifies and routes within minutes." },
        { title: "Our experts respond", body: "Compliance specialists draft and file the response, using your records. Tracked end-to-end." },
        { title: "You get the summary", body: "Weekly digest tells you what came in, what we did, and what's closed. No surprises." },
      ],
    },
    numbers: {
      eyebrow: "By the numbers",
      heading: { pre: "Notice resolution,", accent: "measured." },
      stats: [
        { figure: "Minutes", label: "AI triage turnaround" },
        { figure: "3–5d", label: "Avg. resolution time" },
        { figure: "0%", label: "Penalties paid by clients" },
        { figure: "100%", label: "Audit trail maintained" },
      ],
    },
    cta: {
      heading: { pre: "Make every agency letter", accent: "someone else's problem." },
      lead: "Notice resolution is included in every Spine compliance plan. Stop dreading the mailbox.",
      button: { label: "Get started", href: "#demo" },
    },
  },

  "healthcare-compliance": {
    slug: "healthcare-compliance",
    breadcrumb: crumb("Compliance", "Healthcare compliance"),
    eyebrow: "Compliance · Healthcare",
    h1: { pre: "ACA, ERISA, COBRA —", accent: "on autopilot." },
    lead: "Federal healthcare compliance, handled end-to-end. No spreadsheets, no deadlines missed, no .gov portals. AI monitors every requirement; in-house experts execute every filing.",
    primary: demo,
    secondary: explore,
    checks: ["Every filing handled", "All federal & state mandates", "Real-time monitoring"],
    mockup: {
      title: "Compliance feed · Live",
      status: "All current",
      rows: [
        { tone: "ok", title: "ACA 1095-C forms filed · 47 employees", sub: "IRS confirmed" },
        { tone: "ok", title: "ERISA SPD updated for 2026 plan year", sub: "Distributed to employees" },
        { tone: "ok", title: "COBRA election notices sent", sub: "2 separations · 14-day window active" },
        { tone: "run", title: "Form 5500 prep · plan year 2026", sub: "Scheduled · auto-file 07/15" },
      ],
      total: { label: "Filings on-time rate", figure: "100%" },
    },
    features: {
      eyebrow: "What you get",
      heading: { pre: "Every healthcare filing, every deadline —", accent: "done." },
      intro: "We handle the entire healthcare compliance workflow. From plan documents to government filings to state-specific mandates — all monitored, all executed.",
      items: [
        { icon: "FileText", title: "ACA reporting", body: "1094-C and 1095-C forms filed every year. Coverage tracking, MEC verification, IRS submissions handled." },
        { icon: "ClipboardText", title: "ERISA wraps & SPDs", body: "Plan documents drafted, kept current, and distributed. SPDs, SARs, plan amendments — fully maintained." },
        { icon: "Door", title: "COBRA administration", body: "Election notices, premium collection, continuation tracking — every separation handled within the legal window." },
        { icon: "NotePencil", title: "Form 5500", body: "Annual benefit plan filing prepared, reviewed, and submitted before deadline. No more last-minute scrambles." },
        { icon: "MapTrifold", title: "State mandates", body: "California, Massachusetts, New Jersey — every state-specific healthcare requirement tracked and met." },
        { icon: "ShieldCheck", title: "Notice resolution", body: "DOL, IRS, agency letters parsed by AI and resolved by our in-house experts before they hit your desk." },
      ],
    },
    how: {
      eyebrow: "How it works",
      heading: { pre: "Compliance,", accent: "made invisible." },
      steps: [
        { title: "Audit your current state", body: "We map every requirement, every filing, every deadline against your current setup. Gaps identified in 48 hours." },
        { title: "Automate the workflow", body: "We take over filings, monitor deadlines, draft documents, and handle agency correspondence — automatically." },
        { title: "Stay current, forever", body: "Regulations change. We monitor. You don't worry about a Form 5500 again." },
      ],
    },
    numbers: {
      eyebrow: "By the numbers",
      heading: { pre: "Healthcare compliance,", accent: "in numbers." },
      stats: [
        { figure: "100%", label: "Filings on-time rate" },
        { figure: "0", label: "Missed deadlines" },
        { figure: "47", label: "Healthcare regs monitored" },
        { figure: "24/7", label: "Agency notice monitoring" },
      ],
    },
    cta: {
      heading: { pre: "Stop worrying about", accent: "healthcare compliance." },
      lead: "Free audit of your current compliance posture. We'll show you exactly what's at risk and how we'd fix it.",
      button: { label: "Free compliance audit", href: "#demo" },
    },
  },

  "multi-state-tax": {
    slug: "multi-state-tax",
    breadcrumb: crumb("Compliance", "Multi-state tax"),
    eyebrow: "Compliance · Multi-state",
    h1: { pre: "Multi-state tax & hiring.", accent: "All 50 states." },
    lead: "Registration, withholding, filings, new hire reporting — handled across every state your team is in. Hire anywhere; we get you compliant before day one.",
    primary: demo,
    secondary: explore,
    checks: ["All 50 states covered", "Registration in days", "Real-time monitoring"],
    mockup: {
      title: "State registrations · Live",
      status: "12 states active",
      rows: [
        { tone: "ok", title: "Texas SUI registration", sub: "New hire in Austin · auto-filed in 3 days" },
        { tone: "ok", title: "California PIT withholding", sub: "Active for 14 employees" },
        { tone: "ok", title: "New hire reporting · NY", sub: "Filed within 20-day window" },
        { tone: "run", title: "Massachusetts PFML setup in progress", sub: "ETA: 5 business days" },
      ],
      total: { label: "Late penalties on our watch", figure: "0" },
    },
    features: {
      eyebrow: "What you get",
      heading: { pre: "Hire anywhere.", accent: "Compliant everywhere." },
      intro: "The moment you hire in a new state, dozens of registrations kick in. We handle every one — fast.",
      items: [
        { icon: "MapTrifold", title: "State registration", body: "SUI, SUTA, withholding accounts opened in any state, typically within 3–5 business days of a new hire." },
        { icon: "Money", title: "Withholding & filings", body: "PIT, SIT, local taxes — calculated, withheld, and filed every cycle. Quarterly and annual returns handled." },
        { icon: "UserPlus", title: "New hire reporting", body: "Every new hire reported to state agencies within mandated windows. No manual paperwork." },
        { icon: "Umbrella", title: "Paid leave programs", body: "PFML in MA, NY, NJ, CA, OR, WA, etc. — registration, contributions, claims coordination." },
        { icon: "Warning", title: "Notice handling", body: "State tax notices parsed and resolved by our team before they become penalties." },
        { icon: "ClipboardText", title: "Audit-ready records", body: "Every filing, every payment, every confirmation logged in one place — exportable for audits at any time." },
      ],
    },
    how: {
      eyebrow: "How it works",
      heading: { pre: "From hire to compliant", accent: "in 3 days." },
      steps: [
        { title: "You hire in a new state", body: "Add the employee in your HRIS/payroll. Spine sees the new geography immediately." },
        { title: "We register & set up", body: "SUI, SUTA, withholding accounts, new hire report — all filed within 3–5 days. No paperwork on your end." },
        { title: "We run it forever", body: "Every filing, every notice, every renewal — handled on autopilot. You hire; we keep the company compliant." },
      ],
    },
    numbers: {
      eyebrow: "By the numbers",
      heading: { pre: "Multi-state,", accent: "in numbers." },
      stats: [
        { figure: "50", label: "States covered" },
        { figure: "3–5d", label: "Avg. registration turnaround" },
        { figure: "0", label: "Late penalties on our watch" },
        { figure: "100%", label: "Filings on-time" },
      ],
    },
    cta: {
      heading: { pre: "Hiring across states", accent: "just got easier." },
      lead: "Spine handles multi-state tax setup, withholding, filings, and notices — included in every plan. Free for your company.",
      button: { label: "Talk to compliance", href: "#demo" },
    },
  },

  "employee-concierge": {
    slug: "employee-concierge",
    breadcrumb: crumb("Benefits", "Employee concierge"),
    eyebrow: "Benefits · Employee app",
    h1: { pre: "The Spine app.", accent: "Benefits in their pocket." },
    lead: "Live now for all employees. Plan selection, digital cards, pharmacy navigation, claims help, bill negotiation — 24/7, in-house team + AI. Free for every employee on a Spine plan.",
    primary: demo,
    secondary: explore,
    checks: ["Live for all employees", "iOS + Android", "24/7 in-house team + AI"],
    mockup: {
      title: "The Spine app · Live",
      status: "Available now",
      rows: [
        { tone: "ok", title: "Chat your benefits questions", sub: "Real human + AI · responds in seconds" },
        { tone: "ok", title: "Digital insurance card", sub: "On your phone, share with any provider" },
        { tone: "run", title: "Pharmacy navigation", sub: "Find cheaper Rx alternatives in-app" },
        { tone: "ok", title: "Bill negotiation", sub: "Photograph a bill, we fight it for you" },
      ],
      total: { label: "Avg. annual savings / employee", figure: "$340" },
    },
    features: {
      eyebrow: "What you get",
      heading: { pre: "24/7 support,", accent: "in your team's pocket." },
      intro: "Your benefits aren't useful if employees can't figure them out. The Spine app makes every benefit immediate, navigable, and actionable.",
      items: [
        { icon: "ChatCircleText", title: "AI-first concierge", body: "Ask any benefits question — open enrollment, claims, networks, prescriptions. AI answers instantly; humans step in when needed." },
        { icon: "CreditCard", title: "Digital insurance cards", body: "Insurance cards in Apple Wallet. Share directly with providers, no more digging through paperwork." },
        { icon: "Pill", title: "Pharmacy savings", body: "Find generic alternatives, manufacturer coupons, and lower-cost pharmacies for every prescription." },
        { icon: "ClipboardText", title: "Bill negotiation", body: "Snap a photo of any medical bill. We review, identify errors, and negotiate it down before you pay a cent." },
        { icon: "FirstAidKit", title: "Care navigation", body: "In-network specialists, second opinions, urgent care finder — filtered by your plan and location." },
        { icon: "Bell", title: "Claims tracking", body: "Real-time status on every claim. No more waiting on hold to find out what happened to that lab work." },
      ],
    },
    how: {
      eyebrow: "How it works",
      heading: { pre: "From download to", accent: "first answer in 60 seconds." },
      steps: [
        { title: "Download the app", body: "iOS or Android. Free for every employee on a Spine plan. Onboarded the day your benefits go live." },
        { title: "Ask anything", body: "Open the app, type your question — or snap a photo of a bill. AI answers in seconds; humans pick up if you need them." },
        { title: "Save money & time", body: "Average employee saves 7+ hours per year and reduces out-of-pocket spending by ~$340 annually." },
      ],
    },
    numbers: {
      eyebrow: "By the numbers",
      heading: { pre: "Concierge", accent: "by the numbers." },
      stats: [
        { figure: "24/7", label: "Always-on support" },
        { figure: "60s", label: "Average AI response time" },
        { figure: "$340", label: "Avg. annual savings per employee" },
        { figure: "4.8★", label: "App store rating" },
      ],
    },
    cta: {
      heading: { pre: "Roll out the Spine app", accent: "to your team." },
      lead: "The app is included with every Spine benefits plan — free for every employee. Onboard your team in under 10 minutes.",
      button: { label: "Get started", href: "#demo" },
    },
  },
};

export const platformSlugs = Object.keys(platformPages);
