// Renewal-window math, shared by the step-1 timeline (client) and the lead
// email (server route needs days-to-renewal for the subject line and the
// decision deadline for the body). Pure — the clock is always a parameter.

export const DAY_MS = 24 * 60 * 60 * 1000;
// Carriers need roughly this long to quote and switch a group.
export const QUOTE_DAYS = 30;

// We ask for a renewal month, not a day; plans renew on the 1st. Next
// occurrence strictly in the future.
export function nextRenewalDate(month: number, now: Date): Date {
  const candidate = new Date(now.getFullYear(), month - 1, 1);
  if (candidate.getTime() <= now.getTime()) {
    candidate.setFullYear(candidate.getFullYear() + 1);
  }
  return candidate;
}

// Calendar-day count (both ends at local midnight, rounded) so a DST hour
// between now and the renewal can't produce an off-by-one.
export function daysToRenewal(month: number, now: Date): number {
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((nextRenewalDate(month, now).getTime() - start.getTime()) / DAY_MS);
}

// Last day to decide and still leave carriers their quote-and-switch runway.
// Calendar arithmetic (not ms) for the same DST reason.
export function decisionDeadline(month: number, now: Date): Date {
  const r = nextRenewalDate(month, now);
  return new Date(r.getFullYear(), r.getMonth(), r.getDate() - QUOTE_DAYS);
}

export const shortDate = (d: Date) =>
  d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
