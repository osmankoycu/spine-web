// Contract between the audit page and /api/audit, plus the pure builder that
// assembles it. Aggregates ONLY, by construction: there is no field a
// per-employee row could travel in, and leadPayload.test.ts pins that the
// built payload never carries row data. The census file and its rows never
// leave the browser.
import type { CarrierId, Confidence, Tier } from "./rates.ts";
import type { HrisFormatId } from "./hrisFormats.ts";
import type { CensusAggregates } from "./censusParse.ts";

export type AuditLeadResult = {
  expectedPEPM: number;
  currentPEPM: number;
  annualOverpaymentLow: number;
  annualOverpaymentHigh: number;
  wellPriced: boolean;
  confidence: Confidence;
};

export type AuditLeadPayload = {
  // Which funnel produced this lead. The lead route branches on it; the scan
  // side's payload lives in lib/scan/scanLead.ts. Optional for back-compat —
  // the server treats a missing funnel as "audit".
  funnel?: "audit";
  // "lead" emails the Spine inbox (the default); "copy" emails the visitor
  // their own result instead ("Email me this result").
  mode?: "lead" | "copy";
  email: string;
  ref?: string; // "yc" when the visitor came via the Bookface link
  headcount: number;
  state?: string; // dominant state (census mode) or the picked one
  states?: Record<string, number>; // census state mix
  avgAge?: number;
  ageBands?: { label: string; count: number }[];
  tierCounts?: Partial<Record<Tier, number>>;
  carrier?: CarrierId;
  renewalMonth?: number; // 1–12
  premiumMonthly?: number; // as typed in step 1 or the results tightener
  censusSource: HrisFormatId | "skipped";
  result: AuditLeadResult;
};

export type CensusState =
  | { kind: "none" }
  | { kind: "skipped" }
  | { kind: "parsed"; aggregates: CensusAggregates; format: HrisFormatId };

export function dominantState(states: Record<string, number>): string | undefined {
  let best: string | undefined;
  let bestN = 0;
  for (const [code, n] of Object.entries(states)) {
    if (n > bestN) {
      best = code;
      bestN = n;
    }
  }
  return best;
}

// Assembles the wire payload from the flow's state. Pure and unit-tested:
// whatever the census parser holds (rows, names), only the aggregate fields
// enumerated here can reach the network.
export function buildAuditLeadPayload(args: {
  mode: "lead" | "copy";
  email: string;
  ref: string | null;
  preview: { headcount: number; state: string; avgAge: number };
  carrier: CarrierId | "";
  renewalMonth: number; // 0 = not set
  premium: number | null;
  census: CensusState;
  result: AuditLeadResult;
}): AuditLeadPayload {
  const aggregates = args.census.kind === "parsed" ? args.census.aggregates : null;
  return {
    funnel: "audit",
    mode: args.mode,
    email: args.email,
    ...(args.ref ? { ref: args.ref } : {}),
    headcount: aggregates?.employeeCount ?? args.preview.headcount,
    state:
      (aggregates ? dominantState(aggregates.states) : undefined) ??
      (args.preview.state || undefined),
    states: aggregates?.states,
    avgAge: aggregates?.avgAge ?? args.preview.avgAge,
    ageBands: aggregates?.ageBands,
    tierCounts: aggregates?.tierCounts,
    carrier: args.carrier || undefined,
    renewalMonth: args.renewalMonth || undefined,
    premiumMonthly: args.premium ?? undefined,
    censusSource: args.census.kind === "parsed" ? args.census.format : "skipped",
    result: {
      expectedPEPM: args.result.expectedPEPM,
      currentPEPM: args.result.currentPEPM,
      annualOverpaymentLow: args.result.annualOverpaymentLow,
      annualOverpaymentHigh: args.result.annualOverpaymentHigh,
      wellPriced: args.result.wellPriced,
      confidence: args.result.confidence,
    },
  };
}
