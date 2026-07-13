import { Resend } from "resend";

// Lead-capture endpoint for the "See how much you'd save" modal. Emails the lead
// to the Spine inbox(es) via Resend. Runs server-side only, so the API key never
// reaches the client. Configure with env vars (see .env.example):
//   RESEND_API_KEY  — required, from resend.com
//   ESTIMATE_FROM   — verified sender, e.g. "Spine <noreply@tryheal.ai>"
//   ESTIMATE_TO     — comma-separated recipients (defaults to the two below)

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
  const email = clean(data.email);
  const firstName = clean(data.firstName, 80);
  const lastName = clean(data.lastName, 80);

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
      subject: `New savings estimate request: ${email}`,
      text: `New "See how much you'd save" submission\n\nName: ${name}\nWork email: ${email}\n`,
      html: `<h2 style="font-family:sans-serif">New savings estimate request</h2>
<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
  <tr><td style="padding:4px 12px 4px 0;color:#777">Name</td><td>${esc(name)}</td></tr>
  <tr><td style="padding:4px 12px 4px 0;color:#777">Work email</td><td><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
</table>`,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ error: "Could not send right now." }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Estimate send failed:", err);
    return Response.json({ error: "Something went wrong." }, { status: 500 });
  }
}
