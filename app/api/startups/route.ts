import { Resend } from "resend";

// Lead-capture endpoint for the /startups application form. Emails the
// application to the Spine inbox(es) via Resend — a structural clone of
// /api/estimate (same env vars, same inbox; the subject line disambiguates the
// source; if routing ever needs to diverge, add STARTUPS_TO with an ESTIMATE_TO
// fallback). No rate limiting, same accepted gap as /api/estimate; the honeypot
// below is the only spam gate.

const TO = (process.env.ESTIMATE_TO ?? "Tech@tryheal.ai,onur@tryheal.ai")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const FROM = process.env.ESTIMATE_FROM ?? "Spine <onboarding@resend.dev>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (v: unknown, max = 200) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";
const esc = (s: string) =>
  s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

const TEAM_SIZE_LABELS: Record<string, string> = {
  "1-4": "1 to 4",
  "5-10": "5 to 10",
  "11-25": "11 to 25",
  "26-plus": "26 or more",
};

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Email is not configured yet." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const data = (body ?? {}) as Record<string, unknown>;

  // Honeypot: the "website" field is invisible to humans. If it's filled,
  // report success without sending — no signal back to the bot.
  if (clean(data.website, 200)) {
    return Response.json({ ok: true });
  }

  const email = clean(data.email);
  const firstName = clean(data.firstName, 80);
  const lastName = clean(data.lastName, 80);
  const company = clean(data.company, 120);
  const teamSize = TEAM_SIZE_LABELS[clean(data.teamSize, 20)] ?? "(not provided)";
  const note = clean(data.note, 1000);
  const booking = clean(data.intent, 20) === "meeting";
  const intentLine = booking
    ? "Sent to the Calendly scheduler (30-min call)"
    : "Application only";

  if (!EMAIL_RE.test(email)) {
    return Response.json({ error: "Please enter a valid work email." }, { status: 400 });
  }

  const name = [firstName, lastName].filter(Boolean).join(" ") || "(not provided)";
  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `New startup program application: ${email}`,
      text: `New /startups application\n\nName: ${name}\nWork email: ${email}\nCompany: ${company || "(not provided)"}\nTeam size: ${teamSize}\nNote: ${note || "(none)"}\nNext step: ${intentLine}\n`,
      html: `<h2 style="font-family:sans-serif">New startup program application</h2>
<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
  <tr><td style="padding:4px 12px 4px 0;color:#777">Name</td><td>${esc(name)}</td></tr>
  <tr><td style="padding:4px 12px 4px 0;color:#777">Work email</td><td><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
  <tr><td style="padding:4px 12px 4px 0;color:#777">Company</td><td>${esc(company || "(not provided)")}</td></tr>
  <tr><td style="padding:4px 12px 4px 0;color:#777">Team size</td><td>${esc(teamSize)}</td></tr>
  <tr><td style="padding:4px 12px 4px 0;color:#777">Note</td><td>${esc(note || "(none)")}</td></tr>
  <tr><td style="padding:4px 12px 4px 0;color:#777">Next step</td><td>${esc(intentLine)}</td></tr>
</table>`,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ error: "Could not send right now." }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Startup application send failed:", err);
    return Response.json({ error: "Something went wrong." }, { status: 500 });
  }
}
