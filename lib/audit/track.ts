// Analytics for the audit funnel. The site has no analytics vendor installed
// yet, so this wrapper defines the event schema now and forwards to
// window.amplitude when a snippet is present; until then events are visible in
// the dev console. Swapping in a real vendor touches this file only.
// TODO: add the Amplitude browser snippet (needs an API key + a Spine project)
// in app/layout.tsx; no code here changes.
//
// Rule: NO PII in event properties, ever. No emails, no file contents, no
// per-employee data. Counts go in as buckets, not raw values, where specified.

export type AuditEventName =
  | "audit_view"
  | "audit_preview_interacted"
  | "audit_basics_completed"
  | "audit_census_uploaded"
  | "audit_census_skipped"
  | "audit_email_submitted"
  | "audit_result_viewed"
  | "audit_call_cta_clicked"
  // Wired in the funnel-CTA rework (Slack primary everywhere); reserved now so
  // both funnels' result_viewed → slack_cta_clicked KPI read identically.
  | "audit_slack_cta_clicked"
  // The gate lets the visitor through when the lead POST fails (forgiveness
  // policy) — this event keeps the lost lead visible once analytics is live.
  | "audit_lead_send_failed"
  // Scan funnel (/scan). Every event carries funnel:"scan"; the audit events
  // carry funnel:"audit" so the two funnels compare directly.
  | "scan_view"
  | "scan_question_answered"
  | "scan_email_submitted"
  | "scan_report_viewed"
  | "scan_slack_cta_clicked"
  | "scan_call_cta_clicked"
  | "scan_lead_send_failed"
  // The /start router entry (funnel:"router"); routed carries size + destination.
  | "router_view"
  | "router_routed";

type EventProps = Record<string, string | number | boolean>;

declare global {
  interface Window {
    amplitude?: { track?: (name: string, props?: EventProps) => void };
  }
}

export function track(name: AuditEventName, props: EventProps = {}): void {
  if (typeof window === "undefined") return;
  window.amplitude?.track?.(name, props);
  if (process.env.NODE_ENV !== "production") {
    console.debug("[audit event]", name, props);
  }
}

// Employee counts are reported as buckets so events stay non-identifying.
export function headcountBucket(n: number): string {
  if (n < 10) return "5-9";
  if (n < 25) return "10-24";
  if (n < 50) return "25-49";
  if (n < 100) return "50-99";
  if (n < 200) return "100-199";
  return "200+";
}

// Overpayment midpoint as a bucket for audit_result_viewed — never the raw
// dollar figure.
export function overpaymentBucket(low: number, high: number, wellPriced: boolean): string {
  if (wellPriced) return "none";
  const mid = (low + high) / 2;
  if (mid < 25_000) return "under-25k";
  if (mid < 75_000) return "25k-75k";
  if (mid < 150_000) return "75k-150k";
  return "150k-plus";
}
