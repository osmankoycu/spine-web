// HockeyStack - 152-person Series B tech company
// All numbers are mock data, internally consistent.

const COMPANY = {
  name: "HockeyStack",
  headcount: 152,
  dependents: 89,
  totalCovered: 241,
  hireYTD: 34,
  termYTD: 11,
  avgAge: 31.4,
};

const SPINE_IMPACT = {
  savingsYTD: 487300,
  savingsPercent: 21.4,
  ticketsDeflected: 1247,
  ticketsDeflectedPct: 76,
  npsScore: 84,
  npsResponses: 118,
  agentInteractions: 4392,
  appAdoption: 94,
  surgeryAvgSavings: 16400,
  urgentCareReduction: 41,
};

const COST = {
  employerAnnual: 1824500,
  employeeAnnual: 412800,
  blendedTotal: 2237300,
  perEmployee: 12005,
  perEmployeeDelta: -2380,
  fundingMix: { levelFunded: 88, fullyInsured: 12 },
};

// Monthly trend - claims fund vs projected without Spine
const SAVINGS_TREND = [
  { m: "Jun", actual: 138, projected: 152 },
  { m: "Jul", actual: 141, projected: 156 },
  { m: "Aug", actual: 144, projected: 159 },
  { m: "Sep", actual: 139, projected: 163 },
  { m: "Oct", actual: 142, projected: 167 },
  { m: "Nov", actual: 137, projected: 169 },
  { m: "Dec", actual: 134, projected: 172 },
  { m: "Jan", actual: 131, projected: 174 },
  { m: "Feb", actual: 128, projected: 176 },
  { m: "Mar", actual: 124, projected: 178 },
  { m: "Apr", actual: 121, projected: 180 },
  { m: "May", actual: 117, projected: 182 },
];

const AGE_DIST = [
  { bucket: "18–25", count: 18 },
  { bucket: "26–35", count: 71 },
  { bucket: "36–45", count: 42 },
  { bucket: "46–55", count: 16 },
  { bucket: "56+", count: 5 },
];

const PLAN_DIST = [
  { name: "HDHP + HSA", pct: 46, color: "#1E54B8" },
  { name: "PPO Standard", pct: 28, color: "#2BB0C9" },
  { name: "PPO Premium", pct: 14, color: "#5B82DE" },
  { name: "POS", pct: 8, color: "#56C2D8" },
  { name: "Waived", pct: 4, color: "#8B95A1" },
];

const DEPENDENT_MIX = [
  { name: "Employee only", pct: 58, color: "#1E54B8" },
  { name: "+ Spouse", pct: 17, color: "#2BB0C9" },
  { name: "+ Dependent", pct: 14, color: "#5B82DE" },
  { name: "+ Family", pct: 11, color: "#56C2D8" },
];

// Spine agent engagement
const AGENTS = [
  { name: "Plan Picker",       icon: "plan",   uses: 142, delta: 12, deflected: 287, color: "#1E54B8" },
  { name: "Care Navigation",   icon: "compass",uses: 891, delta: 24, deflected: 412, color: "#2BB0C9" },
  { name: "Meds Finder",       icon: "pill",   uses: 514, delta: 18, deflected: 198, color: "#5B82DE" },
  { name: "Fight Back",        icon: "shield", uses: 87,  delta: 31, deflected: 67,  color: "#D75A1A" },
  { name: "Coverage Check",    icon: "search", uses: 1208,delta: 9,  deflected: 196, color: "#1E9E5D" },
  { name: "Family Health Hub", icon: "users",  uses: 1550,delta: 41, deflected: 87,  color: "#56C2D8" },
];

const PARTNER_BENEFITS = [
  { name: "Equinox",     category: "Fitness",     enrolled: 38, eligible: 152, hot: true },
  { name: "Carrot",      category: "Fertility",   enrolled: 14, eligible: 152, hot: false },
  { name: "Maven",       category: "Telehealth",  enrolled: 107, eligible: 152, hot: true },
  { name: "Headspace",   category: "Mental",      enrolled: 64, eligible: 152, hot: false },
  { name: "One Medical", category: "Primary",     enrolled: 89, eligible: 152, hot: true },
  { name: "Rightway",    category: "Navigation",  enrolled: 23, eligible: 152, hot: false },
];

const RISK_INDICATORS = [
  { name: "Chronic Condition Prevalence", value: 8.2, label: "Optimal",  tone: "good"  },
  { name: "High Utilizers",               value: 4.6, label: "Optimal",  tone: "good"  },
  { name: "Rx Heavy Users",               value: 2.1, label: "Optimal",  tone: "good"  },
  { name: "Maternity Probability",        value: 3.4, label: "Watch",    tone: "warn"  },
  { name: "Mental Health Indicators",     value: 12.7,label: "Elevated", tone: "danger"},
];

const UTILIZATION = [
  { name: "PCP Visits",         val: 2.1, unit: "per member", label: "Optimal",  tone: "good"  },
  { name: "Specialist Visits",  val: 1.4, unit: "per member", label: "Stable",   tone: "warn"  },
  { name: "ER Visits",          val: 0.18,unit: "per member", label: "Optimal",  tone: "good"  },
  { name: "Days in Hospital",   val: 0.31,unit: "per member", label: "Elevated", tone: "danger"},
  { name: "Telehealth Sessions",val: 4.2, unit: "per member", label: "High",     tone: "good"  },
];

const BENCHMARK = [
  { plan: "HockeyStack + Spine",   spend: 12005, employee: 2716, deductible: "Low",    network: "National", satisfaction: 84, highlight: true },
  { plan: "Market Average",  spend: 15240, employee: 4737, deductible: "Medium", network: "Broad",    satisfaction: 62 },
  { plan: "Peer Size (100–200)", spend: 14180, employee: 4120, deductible: "Medium", network: "Broad",    satisfaction: 58 },
  { plan: "Regional (West)", spend: 13720, employee: 3890, deductible: "Medium", network: "Broad",    satisfaction: 64 },
];

// State distribution (count by USPS code)
const STATE_DIST = {
  CA: 41, NY: 28, WA: 18, TX: 14, CO: 9, MA: 8, OR: 7, IL: 6,
  GA: 5, NC: 4, FL: 4, UT: 3, PA: 3, AZ: 2,
};

const RECENT_ACTIVITY = [
  { who: "Plan Picker Agent", what: "guided 4 new hires through HDHP+HSA enrollment", when: "2h ago", tone: "info" },
  { who: "Fight Back Agent",  what: "won a $4,210 out-of-network appeal for M.R.",   when: "5h ago", tone: "good" },
  { who: "Care Navigation",   what: "redirected 12 ER queries to urgent care",       when: "yesterday", tone: "info" },
  { who: "Meds Finder",       what: "switched 7 members to generic equivalents, est. $1,840/mo",  when: "yesterday", tone: "good" },
  { who: "Compliance",        what: "ACA filing prep auto-completed for Q1",         when: "2d ago", tone: "info" },
  { who: "Renewal alert",     what: "Q3 renewal review opens in 47 days",            when: "2d ago", tone: "warn" },
];

const COMPLIANCE_DOCS = [
  { name: "Summary Plan Description", status: "current",  updated: "Mar 2026" },
  { name: "ACA 1094-C / 1095-C",      status: "current",  updated: "Feb 2026" },
  { name: "ERISA Wrap Document",      status: "review",   updated: "Aug 2025" },
  { name: "COBRA Notices",            status: "current",  updated: "Apr 2026" },
  { name: "HIPAA Privacy Notice",     status: "current",  updated: "Jan 2026" },
  { name: "Section 125 POP",          status: "current",  updated: "Mar 2026" },
];

// ===== Multi-state hiring compliance =====
// Obligations that arise the moment you employ someone in a state.
// Columns of the checklist matrix.
const COMPLIANCE_REQS = [
  { key: "tax",     label: "Tax reg",       full: "State withholding & unemployment-tax registration", doc: "withholding & UI tax registration" },
  { key: "newhire", label: "New-hire report", full: "State new-hire reporting filed within deadline",  doc: "new-hire report filing" },
  { key: "posters", label: "Labor posters", full: "Required state labor-law posters distributed",      doc: "labor-law poster set · 2026" },
  { key: "sick",    label: "Sick leave",    full: "Paid sick-leave / PTO notice provided",             doc: "paid sick-leave notice" },
  { key: "wc",      label: "Workers' comp", full: "Workers' compensation coverage active",             doc: "workers' comp certificate" },
];

// Per-state status. value: ok | action | pending | na
//   ok      = satisfied
//   action  = gap, needs your attention
//   pending = Spine is filing / in progress
//   na      = not required in this state
const STATE_COMPLIANCE = [
  { code:"CA", name:"California",     count:41, neu:3, tax:"ok",     newhire:"ok",     posters:"ok",     sick:"ok",     wc:"ok" },
  { code:"NY", name:"New York",       count:28, neu:2, tax:"ok",     newhire:"ok",     posters:"ok",     sick:"ok",     wc:"ok" },
  { code:"WA", name:"Washington",     count:18, neu:1, tax:"ok",     newhire:"ok",     posters:"ok",     sick:"ok",     wc:"ok" },
  { code:"TX", name:"Texas",          count:14, neu:2, tax:"na",     newhire:"ok",     posters:"ok",     sick:"na",     wc:"na" },
  { code:"CO", name:"Colorado",       count:9,  neu:2, tax:"ok",     newhire:"action", posters:"ok",     sick:"ok",     wc:"pending" },
  { code:"OR", name:"Oregon",         count:7,  neu:1, tax:"ok",     newhire:"ok",     posters:"ok",     sick:"ok",     wc:"pending" },
  { code:"FL", name:"Florida",        count:4,  neu:2, tax:"na",     newhire:"action", posters:"action", sick:"na",     wc:"ok" },
  { code:"PA", name:"Pennsylvania",   count:3,  neu:1, tax:"action", newhire:"ok",     posters:"ok",     sick:"na",     wc:"ok" },
];

Object.assign(window, {
  COMPANY, SPINE_IMPACT, COST, SAVINGS_TREND, AGE_DIST, PLAN_DIST,
  DEPENDENT_MIX, AGENTS, PARTNER_BENEFITS, RISK_INDICATORS, UTILIZATION,
  BENCHMARK, STATE_DIST, RECENT_ACTIVITY, COMPLIANCE_DOCS,
  COMPLIANCE_REQS, STATE_COMPLIANCE,
});
