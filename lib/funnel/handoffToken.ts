// Slack handoff token: carries a funnel summary through the Slack OAuth
// `state` param so the bot's first message can reference it ("I already
// pulled your top item: …"). The repo has no KV, so the token is stateless:
// base64url(JSON payload) + "." + base64url(HMAC-SHA256 signature), signed
// with the server-only SLACK_HANDOFF_SECRET. Server-side only (node:crypto);
// the browser never sees the secret, it just relays the opaque token.
// Contract for the bot side: docs/slack-handoff.md.
import { createHmac, timingSafeEqual } from "node:crypto";

export const HANDOFF_TTL_SECONDS = 60 * 60; // 1 hour

export type HandoffSummary =
  | {
      funnel: "scan";
      top: { id: string; title: string } | null; // first red finding, else first finding
      counts: { red: number; amber: number; green: number };
      teamSize?: string;
      states?: string[];
    }
  | {
      funnel: "audit";
      wellPriced: boolean;
      low: number; // annual overpayment range, USD
      high: number;
      confidence: string;
    };

export type HandoffPayload = {
  v: 1;
  exp: number; // unix seconds
  ref?: string; // "yc" etc.
  summary: HandoffSummary;
};

const b64url = (buf: Buffer) => buf.toString("base64url");

function hmac(data: string, secret: string): Buffer {
  return createHmac("sha256", secret).update(data).digest();
}

export function signHandoffToken(
  summary: HandoffSummary,
  opts: { secret: string; now: Date; ref?: string },
): string {
  const payload: HandoffPayload = {
    v: 1,
    exp: Math.floor(opts.now.getTime() / 1000) + HANDOFF_TTL_SECONDS,
    ...(opts.ref ? { ref: opts.ref } : {}),
    summary,
  };
  const body = b64url(Buffer.from(JSON.stringify(payload), "utf8"));
  return `${body}.${b64url(hmac(body, opts.secret))}`;
}

// Returns the payload when the signature matches and the token hasn't
// expired; null otherwise. Mirrors what the bot side must implement.
export function verifyHandoffToken(
  token: string,
  opts: { secret: string; now: Date },
): HandoffPayload | null {
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return null;
  const body = token.slice(0, dot);
  const sig = Buffer.from(token.slice(dot + 1), "base64url");
  const expected = hmac(body, opts.secret);
  if (sig.length !== expected.length || !timingSafeEqual(sig, expected)) return null;

  let payload: HandoffPayload;
  try {
    payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
  } catch {
    return null;
  }
  if (payload.v !== 1) return null;
  if (Math.floor(opts.now.getTime() / 1000) >= payload.exp) return null;
  return payload;
}
