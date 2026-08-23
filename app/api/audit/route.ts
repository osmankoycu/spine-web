import { Resend } from "resend";
import {
  daysToRenewal,
  decisionDeadline,
  nextRenewalDate,
  shortDate,
  QUOTE_DAYS,
} from "@/lib/audit/renewal";
import type { AuditLeadPayload } from "@/lib/audit/leadPayload";
import { sanitizeAnswers } from "@/lib/scan/scanLead";
import { isTeamSize } from "@/lib/funnel/teamSize";
import {
  runScan,
  severityCounts,
  SEVERITY_LABELS,
  type ScanAnswers,
} from "@/lib/scan/scanRules";

// Single lead endpoint for the funnel surface, discriminated by `funnel`:
// the instant benefits audit (/audit, aggregates only — see
// lib/audit/leadPayload.ts) and the 45-second setup scan (/scan, whitelisted
// answers only — see lib/scan/scanLead.ts; findings are re-computed here from
// the answers, so a tampered payload can't inject email content). Mirrors the
// /api/estimate Resend pattern and reuses its env vars. mode "lead" emails
// the Spine inbox; mode "copy" (audit only) emails the visitor their result.
// The /api/audit path predates the scan funnel; kept to avoid churn.
// TODO: leads currently reuse the ESTIMATE_TO recipients (tryheal.ai
// inboxes). Add a dedicated AUDIT_TO once sales wants a separate stream.

const TO = (process.env.ESTIMATE_TO ?? "Tech@tryheal.ai,onur@tryheal.ai")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const FROM = process.env.ESTIMATE_FROM ?? "Spine <onboarding@resend.dev>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const esc = (s: string) =>
  s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const CARRIER_LABELS: Record<string, string> = {
  uhc: "UnitedHealthcare",
  aetna: "Aetna",
  cigna: "Cigna",
  bcbs: "Blue Cross Blue Shield",
  kaiser: "Kaiser Permanente",
  other: "Other / none",
};

const TIER_LABELS: Record<string, string> = {
  ee: "Employee only",
  ee_spouse: "Employee + spouse",
  ee_child: "Employee + children",
  family: "Family",
};

const SOURCE_LABELS: Record<string, string> = {
  rippling: "Rippling export",
  gusto: "Gusto export",
  deel: "Deel export",
  generic: "Generic CSV",
  skipped: "Skipped (slider estimates)",
};

const CONFIDENCE_LABELS: Record<string, string> = {
  reported: "reported (invoice total provided, ±30%)",
  estimated: "estimated (census, no invoice, ±45%)",
  rough: "rough (sliders only, ±60%)",
};

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

// Shared email rendering for both funnels.
const emailText = (heading: string, email: string, rows: [string, string][]) =>
  `${heading}\n\nWork email: ${email}\n${rows.map(([l, v]) => `${l}: ${v}`).join("\n")}\n`;

const emailHtml = (
  heading: string,
  email: string,
  rows: [string, string][],
) => `<h2 style="font-family:sans-serif">${esc(heading)}</h2>
<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
  <tr><td style="padding:4px 12px 4px 0;color:#777">Work email</td><td><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
${rows
  .map(
    ([l, v]) =>
      `  <tr><td style="padding:4px 12px 4px 0;color:#777;vertical-align:top">${esc(l)}</td><td>${esc(v)}</td></tr>`,
  )
  .join("\n")}
</table>`;

// ── Scan branch ──
// Findings are recomputed here from the whitelisted answers; nothing in the
// email body originates from free-form payload content.
function scanLeadContent(raw: Record<string, unknown>): {
  subject: string;
  rows: [string, string][];
} {
  const ycRef = raw.ref === "yc";
  const answers = sanitizeAnswers((raw.answers ?? {}) as ScanAnswers);
  const teamSize = isTeamSize(raw.teamSize) ? raw.teamSize : undefined;
  const findings = runScan(answers);
  const counts = severityCounts(findings);

  const subjectParts = [`${findings.length} findings (${counts.red} red)`];
  if (answers.states && answers.states.length > 0) {
    subjectParts.push(answers.states.join("+"));
  }
  // Size bucket (router prefill) beats the composition label in the subject.
  if (teamSize) subjectParts.push(teamSize);
  else if (answers.team) subjectParts.push(answers.team);

  const rows: [string, string][] = [];
  rows.push(["Source", ycRef ? "Bookface/YC" : "Website /scan"]);
  rows.push([
    "Summary",
    `${counts.red} fix now · ${counts.amber} should fix · ${counts.green} handled`,
  ]);
  findings.forEach((f, i) => {
    rows.push([`Finding ${i + 1}`, `[${SEVERITY_LABELS[f.sev]}] ${f.title}`]);
  });
  if (answers.states) rows.push(["States", answers.states.join(", ")]);
  if (teamSize) rows.push(["Team size", teamSize]);
  if (answers.team) rows.push(["Team", answers.team]);
  if (answers.payroll) rows.push(["Payroll", answers.payroll]);
  if (answers.health) rows.push(["Health coverage", answers.health]);
  if (answers.hire) rows.push(["Next hire", answers.hire]);
  if (answers.entity) rows.push(["Entity", answers.entity]);
  return { subject: `Scan lead: ${subjectParts.join(", ")}`, rows };
}

// Defensive parsing: numbers clamped, strings whitelisted or dropped. The
// output goes into an email, so nothing here needs to be clever — it needs to
// be bounded.
const num = (v: unknown, lo: number, hi: number): number | undefined => {
  const n = typeof v === "number" ? v : NaN;
  if (!Number.isFinite(n)) return undefined;
  return Math.min(hi, Math.max(lo, Math.round(n)));
};

type Clean = {
  mode: "lead" | "copy";
  email: string;
  ycRef: boolean;
  headcount: number;
  state?: string;
  states: [string, number][];
  avgAge?: number;
  ageBands: [string, number][];
  tierCounts: [string, number][];
  carrier?: string;
  renewalMonth?: number;
  premiumMonthly?: number;
  censusSource: string;
  result: {
    expectedPEPM: number;
    currentPEPM: number;
    low: number;
    high: number;
    wellPriced: boolean;
    confidence: string;
  };
};

function cleanPayload(body: Record<string, unknown>): Clean | null {
  const p = body as Partial<AuditLeadPayload>;
  const email = typeof p.email === "string" ? p.email.trim().slice(0, 200) : "";
  if (!EMAIL_RE.test(email)) return null;

  const stateOk = (s: unknown): s is string =>
    typeof s === "string" && /^[A-Z]{2}$/.test(s);

  const states: [string, number][] = [];
  if (p.states && typeof p.states === "object") {
    for (const [k, v] of Object.entries(p.states).slice(0, 60)) {
      const n = num(v, 1, 100_000);
      if (stateOk(k) && n) states.push([k, n]);
    }
  }
  const ageBands: [string, number][] = [];
  if (Array.isArray(p.ageBands)) {
    for (const b of p.ageBands.slice(0, 8)) {
      const label = typeof b?.label === "string" ? b.label.slice(0, 12) : "";
      const n = num(b?.count, 0, 100_000);
      if (label && n !== undefined) ageBands.push([label, n]);
    }
  }
  const tierCounts: [string, number][] = [];
  if (p.tierCounts && typeof p.tierCounts === "object") {
    for (const [k, v] of Object.entries(p.tierCounts)) {
      const n = num(v, 1, 100_000);
      if (k in TIER_LABELS && n) tierCounts.push([TIER_LABELS[k], n]);
    }
  }

  const r = (p.result ?? {}) as Record<string, unknown>;
  return {
    mode: p.mode === "copy" ? "copy" : "lead",
    email,
    ycRef: p.ref === "yc",
    headcount: num(p.headcount, 1, 100_000) ?? 0,
    state: stateOk(p.state) ? p.state : undefined,
    states,
    avgAge: num(p.avgAge, 14, 100),
    ageBands,
    tierCounts,
    carrier: typeof p.carrier === "string" && p.carrier in CARRIER_LABELS ? p.carrier : undefined,
    renewalMonth: num(p.renewalMonth, 1, 12),
    premiumMonthly: num(p.premiumMonthly, 1, 100_000_000),
    censusSource:
      typeof p.censusSource === "string" && p.censusSource in SOURCE_LABELS
        ? p.censusSource
        : "skipped",
    result: {
      expectedPEPM: num(r.expectedPEPM, 0, 100_000) ?? 0,
      currentPEPM: num(r.currentPEPM, 0, 100_000) ?? 0,
      low: num(r.annualOverpaymentLow, 0, 1_000_000_000) ?? 0,
      high: num(r.annualOverpaymentHigh, 0, 1_000_000_000) ?? 0,
      wellPriced: r.wellPriced === true,
      confidence:
        typeof r.confidence === "string" && r.confidence in CONFIDENCE_LABELS
          ? r.confidence
          : "rough",
    },
  };
}

// [label, value] rows shared by the text and HTML bodies.
function leadRows(c: Clean, now: Date): [string, string][] {
  const rows: [string, string][] = [];
  rows.push(["Source", c.ycRef ? "Bookface/YC" : "Website /audit"]);
  rows.push([
    "Verdict",
    c.result.wellPriced
      ? "Looks well-priced (honest state shown)"
      : `Overpaying ${usd(c.result.low)} to ${usd(c.result.high)} per year`,
  ]);
  rows.push(["Confidence", CONFIDENCE_LABELS[c.result.confidence]]);
  rows.push([
    "PEPM",
    `current ${usd(c.result.currentPEPM)} vs expected ${usd(c.result.expectedPEPM)}`,
  ]);
  rows.push(["Headcount", String(c.headcount)]);
  if (c.states.length > 0) {
    rows.push(["States", c.states.map(([s, n]) => `${s} ×${n}`).join(", ")]);
  } else if (c.state) {
    rows.push(["State", c.state]);
  }
  if (c.avgAge !== undefined) rows.push(["Average age", String(c.avgAge)]);
  if (c.ageBands.length > 0) {
    rows.push(["Age bands", c.ageBands.map(([l, n]) => `${l}: ${n}`).join(" · ")]);
  }
  if (c.tierCounts.length > 0) {
    rows.push(["Tiers", c.tierCounts.map(([l, n]) => `${l}: ${n}`).join(" · ")]);
  }
  if (c.carrier) rows.push(["Carrier", CARRIER_LABELS[c.carrier]]);
  if (c.premiumMonthly !== undefined) {
    rows.push(["Invoice total", `${usd(c.premiumMonthly)}/mo (provided by lead)`]);
  }
  if (c.renewalMonth !== undefined) {
    const days = daysToRenewal(c.renewalMonth, now);
    const renewal = nextRenewalDate(c.renewalMonth, now);
    rows.push([
      "Renewal",
      `${MONTH_NAMES[c.renewalMonth - 1]} 1 (${shortDate(renewal)}, in ${days} days)${
        days < 45 ? " — URGENT, under 45 days" : ""
      }`,
    ]);
    rows.push([
      "Decision deadline",
      `~${shortDate(decisionDeadline(c.renewalMonth, now))}, ${QUOTE_DAYS} days before renewal`,
    ]);
  }
  rows.push(["Census", SOURCE_LABELS[c.censusSource]]);
  return rows;
}

function leadSubject(c: Clean, now: Date): string {
  const parts = [`${c.headcount} employees`];
  if (c.state) parts.push(c.state);
  if (c.renewalMonth !== undefined) {
    parts.push(`renewal in ${daysToRenewal(c.renewalMonth, now)} days`);
  }
  return `Audit lead: ${parts.join(", ")}`;
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Email is not configured yet." }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const raw = (body ?? {}) as Record<string, unknown>;
  const resend = new Resend(apiKey);

  if (raw.funnel === "scan") {
    const email = typeof raw.email === "string" ? raw.email.trim().slice(0, 200) : "";
    if (!EMAIL_RE.test(email)) {
      return Response.json({ error: "Please enter a valid work email." }, { status: 400 });
    }
    try {
      const { subject, rows } = scanLeadContent(raw);
      const { error } = await resend.emails.send({
        from: FROM,
        to: TO,
        replyTo: email,
        subject,
        text: emailText("New setup-scan lead", email, rows),
        html: emailHtml("New setup-scan lead", email, rows),
      });
      if (error) {
        console.error("Scan lead send failed:", error);
        return Response.json({ error: "Could not send right now." }, { status: 502 });
      }
      return Response.json({ ok: true });
    } catch (err) {
      console.error("Scan send failed:", err);
      return Response.json({ error: "Something went wrong." }, { status: 500 });
    }
  }

  const clean = cleanPayload(raw);
  if (!clean) {
    return Response.json({ error: "Please enter a valid work email." }, { status: 400 });
  }

  const now = new Date();

  try {
    if (clean.mode === "copy") {
      // The visitor asked for their own result. Short, honest, no lead data.
      const range = clean.result.wellPriced
        ? "Good news: on what you told us, you look well-priced."
        : `Estimated annual overpayment: ${usd(clean.result.low)} to ${usd(clean.result.high)}.`;
      const { error } = await resend.emails.send({
        from: FROM,
        to: [clean.email],
        subject: "Your Spine benefits audit result",
        text: `Your instant audit result\n\n${range}\n\nThis is a directional estimate (${CONFIDENCE_LABELS[clean.result.confidence]}), not a quote. One call and we'll tell you exactly whether you're overpaying, and by how much.\n\nBook it here: https://joinspine.ai/request-a-demo\n\nSpine is free for employers. Carriers pay us.\n`,
      });
      if (error) {
        console.error("Audit copy send failed:", error);
        return Response.json({ error: "Could not send right now." }, { status: 502 });
      }
      return Response.json({ ok: true });
    }

    const rows = leadRows(clean, now);
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: clean.email,
      subject: leadSubject(clean, now),
      text: emailText("New instant-audit lead", clean.email, rows),
      html: emailHtml("New instant-audit lead", clean.email, rows),
    });

    if (error) {
      console.error("Audit lead send failed:", error);
      return Response.json({ error: "Could not send right now." }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Audit send failed:", err);
    return Response.json({ error: "Something went wrong." }, { status: 500 });
  }
}
