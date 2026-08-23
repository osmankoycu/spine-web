// Sign/verify roundtrip for the Slack handoff token — the same checks the
// bot side must implement (signature, expiry, tamper rejection).
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  signHandoffToken,
  verifyHandoffToken,
  HANDOFF_TTL_SECONDS,
  type HandoffSummary,
} from "./handoffToken.ts";

const NOW = new Date(2026, 7, 23, 12, 0, 0);
const SECRET = "test-secret";

const SCAN_SUMMARY: HandoffSummary = {
  funnel: "scan",
  top: { id: "ca-workers-comp", title: "No workers' comp in California" },
  counts: { red: 1, amber: 2, green: 2 },
  teamSize: "5-10",
  states: ["CA"],
};

test("roundtrip: sign then verify returns the payload", () => {
  const token = signHandoffToken(SCAN_SUMMARY, { secret: SECRET, now: NOW, ref: "yc" });
  const payload = verifyHandoffToken(token, { secret: SECRET, now: NOW });
  assert.ok(payload);
  assert.equal(payload.v, 1);
  assert.equal(payload.ref, "yc");
  assert.equal(payload.exp, Math.floor(NOW.getTime() / 1000) + HANDOFF_TTL_SECONDS);
  assert.deepEqual(payload.summary, SCAN_SUMMARY);
});

test("audit summary roundtrips too", () => {
  const summary: HandoffSummary = {
    funnel: "audit",
    wellPriced: false,
    low: 33_300,
    high: 61_900,
    confidence: "reported",
  };
  const token = signHandoffToken(summary, { secret: SECRET, now: NOW });
  const payload = verifyHandoffToken(token, { secret: SECRET, now: NOW });
  assert.deepEqual(payload?.summary, summary);
  assert.ok(!("ref" in (payload ?? {})));
});

test("expired tokens are rejected", () => {
  const token = signHandoffToken(SCAN_SUMMARY, { secret: SECRET, now: NOW });
  const later = new Date(NOW.getTime() + (HANDOFF_TTL_SECONDS + 1) * 1000);
  assert.equal(verifyHandoffToken(token, { secret: SECRET, now: later }), null);
});

test("wrong secret and tampered payloads are rejected", () => {
  const token = signHandoffToken(SCAN_SUMMARY, { secret: SECRET, now: NOW });
  assert.equal(verifyHandoffToken(token, { secret: "other", now: NOW }), null);

  const [body, sig] = token.split(".");
  const tampered = Buffer.from(
    JSON.stringify({
      ...JSON.parse(Buffer.from(body, "base64url").toString("utf8")),
      ref: "spoofed",
    }),
  ).toString("base64url");
  assert.equal(verifyHandoffToken(`${tampered}.${sig}`, { secret: SECRET, now: NOW }), null);
});

test("garbage input never throws", () => {
  for (const junk of ["", ".", "abc", "a.b", "!!!.???"]) {
    assert.equal(verifyHandoffToken(junk, { secret: SECRET, now: NOW }), null);
  }
});
