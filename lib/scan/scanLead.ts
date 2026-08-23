// Scan-side lead payload: the scan branch of the single lead pipeline
// (/api/audit, discriminated by `funnel`). Deliberately minimal — answers
// only. The server re-runs runScan() on the whitelisted answers to build the
// email, so findings can never be spoofed by a tampered payload, and there is
// no field free text could travel in: every value must be one of the
// question's own option labels or it is dropped.
import { SCAN_QUESTIONS, type ScanAnswers } from "./scanRules.ts";

export type ScanLeadPayload = {
  funnel: "scan";
  mode: "lead";
  email: string;
  ref?: string; // "yc" when arriving via the Bookface link
  answers: ScanAnswers;
};

const OPTIONS_BY_ID = new Map(SCAN_QUESTIONS.map((q) => [q.id, new Set(q.options)]));

// Keep only answers whose values are real option labels. Runs client-side in
// the builder AND server-side in the route (defense in depth).
export function sanitizeAnswers(raw: ScanAnswers): ScanAnswers {
  const out: ScanAnswers = {};
  const states = OPTIONS_BY_ID.get("states")!;
  if (Array.isArray(raw.states)) {
    const kept = raw.states.filter((s) => typeof s === "string" && states.has(s));
    if (kept.length > 0) out.states = kept.slice(0, states.size);
  }
  for (const id of ["team", "payroll", "health", "hire", "entity"] as const) {
    const v = raw[id];
    if (typeof v === "string" && OPTIONS_BY_ID.get(id)!.has(v)) out[id] = v;
  }
  return out;
}

export function buildScanLeadPayload(args: {
  email: string;
  ref: string | null;
  answers: ScanAnswers;
}): ScanLeadPayload {
  return {
    funnel: "scan",
    mode: "lead",
    email: args.email,
    ...(args.ref ? { ref: args.ref } : {}),
    answers: sanitizeAnswers(args.answers),
  };
}
