// The 45-second setup scan: question set + findings rules. Ported verbatim
// from the approved mock (spine_45sec_onboarding_flow.html) — copy, severity,
// tags, icon names, trigger logic and finding order are the spec; only the
// structure (ids, types) is ours. Pure data + pure function, no UI imports —
// unit-tested in scanRules.test.ts and re-run server-side by the lead route so
// emailed findings can't be spoofed by a tampered payload.
import { US_STATES } from "../audit/usStates.ts";

// The mock shipped eight hand-picked states plus a catch-all. Those eight stay
// as the fast path (they cover most early-stage teams), but every state is
// selectable now: the full list comes from the same source the audit's tile
// map uses, so the two funnels can never disagree on state codes.
export const SCAN_COMMON_STATES = ["CA", "NY", "TX", "WA", "CO", "FL", "IL", "MA"];
export const SCAN_REMOTE_OPTION = "Other / remote";

const ALL_STATE_CODES = US_STATES.map((s) => s.code).sort();

export const SCAN_STATES: string[] = [
  ...SCAN_COMMON_STATES,
  ...ALL_STATE_CODES.filter((c) => !SCAN_COMMON_STATES.includes(c)),
  SCAN_REMOTE_OPTION,
];

export type ScanQuestion = {
  id: "states" | "team" | "payroll" | "health" | "hire" | "entity";
  icon: string; // rendered via the scan icon map (inline Lucide)
  multi: boolean;
  q: string;
  hint: string;
  options: readonly string[];
  // When set, these options render as the fast path and the rest sit behind a
  // "show all" expander, so a 50-option question stays tap-friendly.
  common?: readonly string[];
};

export const SCAN_QUESTIONS: ScanQuestion[] = [
  {
    id: "states",
    icon: "map-pin",
    multi: true,
    q: "Where does your team work?",
    hint: "Tap all that apply. This drives what you're required to register for.",
    options: SCAN_STATES,
    common: [...SCAN_COMMON_STATES, SCAN_REMOTE_OPTION],
  },
  {
    id: "team",
    icon: "users",
    multi: false,
    q: "Who's on the team?",
    hint: "Employees and contractors trigger different obligations.",
    options: [
      "Just founders",
      "Founders + W-2 employees",
      "Founders + contractors",
      "Employees + contractors",
    ],
  },
  {
    id: "payroll",
    icon: "wallet",
    multi: false,
    q: "Running payroll?",
    hint: "",
    options: ["Not yet", "Gusto", "Rippling", "ADP", "Manual / by hand"],
  },
  {
    id: "health",
    icon: "heartbeat",
    multi: false,
    q: "How's the team covered for health?",
    hint: "",
    options: [
      "Nothing yet",
      "Individual plans / ACA",
      "COBRA from last job",
      "A spouse's plan",
      "Group plan already",
    ],
  },
  {
    id: "hire",
    icon: "user-plus",
    multi: false,
    q: "Next hire?",
    hint: "The day you hire, five things switch on at once.",
    options: ["Already hiring", "In the next 90 days", "Not soon"],
  },
  {
    id: "entity",
    icon: "building",
    multi: false,
    q: "Company structure?",
    hint: "",
    options: ["Delaware C-corp", "Incorporated elsewhere", "Not incorporated yet"],
  },
];

export type ScanAnswers = {
  states?: string[];
  team?: string;
  payroll?: string;
  health?: string;
  hire?: string;
  entity?: string;
};

export type Severity = "red" | "amber" | "green";

export type ScanFinding = {
  id: string; // stable rule id, used by tests, the lead email, and the Slack handoff
  sev: Severity;
  tag: string;
  ic: string; // icon name from the mock, mapped to inline Lucide in the report
  title: string;
  detail: string;
  action: string;
};

export const SEVERITY_LABELS: Record<Severity, string> = {
  red: "Fix now",
  amber: "Should fix",
  green: "Handled",
};

// Paced status lines for the scan animation (honest: it computes locally).
export const SCAN_LINES = [
  "Reading your setup",
  "Checking state registrations",
  "Cross-referencing filing deadlines",
  "Pricing coverage",
];

// Report disclaimer — keep verbatim (mock spec).
export const SCAN_DISCLAIMER = "Preliminary scan · confirmed by your specialist before we act";

export function runScan(a: ScanAnswers): ScanFinding[] {
  const f: ScanFinding[] = [];
  const states = a.states ?? [];
  const inCA = states.includes("CA");
  const hasEmp = a.team === "Founders + W-2 employees" || a.team === "Employees + contractors";
  const hasCon = a.team === "Founders + contractors" || a.team === "Employees + contractors";
  const multi = states.filter((s) => s !== "Other / remote").length > 1;

  if (a.entity === "Delaware C-corp") {
    f.push({
      id: "de-franchise-tax",
      sev: "amber",
      tag: "Due Mar 1",
      ic: "clock",
      title: "Delaware franchise tax + annual report",
      detail:
        "Every DE C-corp owes this yearly. The default calculation routinely spits out a bill 10-50x larger than the assumed-par-value method. Founders panic at the number every February.",
      action: "We file it and pick the cheaper method.",
    });
  }
  if (a.entity === "Not incorporated yet") {
    f.push({
      id: "no-entity",
      sev: "amber",
      tag: "Setup",
      ic: "building",
      title: "No entity means no clean payroll or plan",
      detail:
        "You can't run compliant payroll or sponsor a group plan without an entity. Most YC companies are Delaware C-corps for investor reasons.",
      action: "We stand up the entity and everything downstream.",
    });
  }
  if (hasEmp && inCA) {
    f.push({
      id: "ca-workers-comp",
      sev: "red",
      tag: "Legally required",
      ic: "alert-triangle",
      title: "No workers' comp in California",
      detail:
        "California requires workers' comp from your first employee. Going without it exposes the company, and you personally, to penalties and stop-work orders.",
      action: "We bind a policy this week.",
    });
    f.push({
      id: "calsavers",
      sev: "amber",
      tag: "State mandate",
      ic: "shield-check",
      title: "CalSavers not addressed",
      detail:
        "California employers with at least one employee must offer a retirement plan or register with CalSavers. Penalties escalate per employee.",
      action: "We register you or set up a 401(k).",
    });
  }
  if (hasEmp) {
    f.push({
      id: "payroll-tax-registration",
      sev: "red",
      tag: "Per state",
      ic: "file-check",
      title: "Payroll tax registration missing" + (multi ? " in multiple states" : ""),
      detail:
        "You have to register for withholding and unemployment tax in every state an employee works from. " +
        (multi ? "You have people in more than one state, so this multiplies. " : "") +
        "New-hire reporting is also due within ~20 days of a start date.",
      action: "We register every state and file new-hire reports.",
    });
  }
  if (hasEmp && (a.payroll === "Not yet" || a.payroll === "Manual / by hand")) {
    f.push({
      id: "deposit-schedule",
      sev: "red",
      tag: "Deposit schedule",
      ic: "alert-triangle",
      title: "Payroll taxes not on a proper schedule",
      detail:
        "Federal (941) and state payroll taxes must be withheld and deposited on a fixed schedule. Missed or late deposits carry some of the steepest penalties the IRS charges.",
      action: "We run payroll and handle every deposit.",
    });
  }
  if (hasCon) {
    f.push({
      id: "contractor-classification",
      sev: "amber",
      tag: "Audit trigger",
      ic: "users",
      title: "Contractor classification is unreviewed",
      detail:
        "Misclassifying a worker as 1099 when they should be W-2 is a top audit trigger, and California's ABC test is strict. Back taxes and penalties land on the company.",
      action: "We review your roster and flag anyone at risk.",
    });
  }
  if (
    ["Nothing yet", "Individual plans / ACA", "COBRA from last job", "A spouse's plan"].includes(
      a.health ?? "",
    )
  ) {
    // "Other / remote" is a catch-all, not a place: naming it would read as
    // "available in Other / remote". Fall back to the generic wording instead.
    const named = states.filter((s) => s !== SCAN_REMOTE_OPTION);
    const st = inCA ? "California" : named[0] || "your state";
    f.push({
      id: "overpaying-coverage",
      sev: "amber",
      tag: "Est. savings",
      ic: "coin",
      title: "You're likely overpaying for coverage",
      detail:
        "Founders on individual, COBRA, or a spouse's plan usually pay well above a small-group rate. A 2-5 person group plan is available in " +
        st +
        ". Estimated savings: $3k-$9k/yr across the team (we confirm with real quotes).",
      action: "We quote carriers and enroll the team.",
    });
  }
  if (a.hire === "Already hiring" || a.hire === "In the next 90 days") {
    f.push({
      id: "first-hire-turnkey",
      sev: "green",
      tag: "Turnkey",
      ic: "sparkles",
      title: "Your first hire, handled end to end",
      detail:
        "The day an offer signs, payroll setup, benefits, comp, workers' comp, I-9, and state registration all fire at once. Most founders do this manually across a dozen tabs.",
      action: "Pre-armed now. One click when the offer signs.",
    });
  }
  f.push({
    id: "baseline-paperwork",
    sev: "green",
    tag: "Baseline",
    ic: "file-check",
    title: "The paperwork nobody remembers",
    detail:
      "I-9 collection and retention, required state new-hire notices, and a basic handbook. Small individually, expensive in an audit.",
    action: "We keep this current in the background.",
  });
  return f;
}

export function severityCounts(findings: ScanFinding[]): Record<Severity, number> {
  const counts: Record<Severity, number> = { red: 0, amber: 0, green: 0 };
  for (const x of findings) counts[x.sev] += 1;
  return counts;
}
