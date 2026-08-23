import { signHandoffToken, type HandoffSummary } from "@/lib/funnel/handoffToken";
import { isTeamSize } from "@/lib/funnel/teamSize";
import { sanitizeAnswers } from "@/lib/scan/scanLead";
import { runScan, severityCounts, type ScanAnswers } from "@/lib/scan/scanRules";

// Mints the Slack handoff token (see docs/slack-handoff.md). The report pages
// POST their context here on render; the returned token rides the Slack
// install URL's OAuth `state` param so the bot's first message can reference
// it. Summaries are built SERVER-side from whitelisted inputs (the scan
// re-runs its rules; audit numbers are clamped) — the client can't inject
// content into what the bot will say. Stateless by design: no KV in this
// repo, so the token is an HMAC-signed payload with a 1h expiry.
// Requires SLACK_HANDOFF_SECRET (server-only); degrades to 503 without it,
// and the CTAs then link to the plain install URL with no state.

const num = (v: unknown, lo: number, hi: number): number => {
  const n = typeof v === "number" ? v : NaN;
  if (!Number.isFinite(n)) return 0;
  return Math.min(hi, Math.max(lo, Math.round(n)));
};

const CONFIDENCES = new Set(["reported", "estimated", "rough"]);

function buildSummary(raw: Record<string, unknown>): HandoffSummary | null {
  if (raw.funnel === "scan") {
    const answers = sanitizeAnswers((raw.answers ?? {}) as ScanAnswers);
    const findings = runScan(answers);
    const top = findings.find((f) => f.sev === "red") ?? findings[0] ?? null;
    return {
      funnel: "scan",
      top: top ? { id: top.id, title: top.title } : null,
      counts: severityCounts(findings),
      ...(isTeamSize(raw.teamSize) ? { teamSize: raw.teamSize } : {}),
      ...(answers.states ? { states: answers.states } : {}),
    };
  }
  if (raw.funnel === "audit") {
    const r = (raw.result ?? {}) as Record<string, unknown>;
    return {
      funnel: "audit",
      wellPriced: r.wellPriced === true,
      low: num(r.annualOverpaymentLow, 0, 1_000_000_000),
      high: num(r.annualOverpaymentHigh, 0, 1_000_000_000),
      confidence:
        typeof r.confidence === "string" && CONFIDENCES.has(r.confidence)
          ? r.confidence
          : "rough",
    };
  }
  return null;
}

export async function POST(request: Request) {
  const secret = process.env.SLACK_HANDOFF_SECRET;
  if (!secret) {
    return Response.json({ error: "Handoff is not configured yet." }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  const raw = (body ?? {}) as Record<string, unknown>;

  const summary = buildSummary(raw);
  if (!summary) {
    return Response.json({ error: "Unknown funnel." }, { status: 400 });
  }

  const token = signHandoffToken(summary, {
    secret,
    now: new Date(),
    ref: raw.ref === "yc" ? "yc" : undefined,
  });
  return Response.json({ token });
}
