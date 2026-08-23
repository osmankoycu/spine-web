// Privacy-contract tests for the scan payload, same treatment as the audit's
// leadPayload tests: key whitelist, and no channel for free text — every
// value must be one of the question's own option labels.
import { test } from "node:test";
import assert from "node:assert/strict";
import { buildScanLeadPayload, sanitizeAnswers } from "./scanLead.ts";

const ANSWERS = {
  states: ["CA", "NY"],
  team: "Founders + W-2 employees",
  payroll: "Gusto",
  health: "Nothing yet",
  hire: "Already hiring",
  entity: "Delaware C-corp",
};

test("payload carries only whitelisted keys and option-label values", () => {
  const p = buildScanLeadPayload({ email: "founder@startup.com", ref: "yc", answers: ANSWERS });
  assert.deepEqual(
    Object.keys(p).sort(),
    ["answers", "email", "funnel", "mode", "ref"],
  );
  assert.equal(p.funnel, "scan");
  assert.equal(p.mode, "lead");
  assert.deepEqual(p.answers, ANSWERS);
});

test("free text and unknown values are dropped, not forwarded", () => {
  const dirty = sanitizeAnswers({
    states: ["CA", "Narnia", "<script>alert(1)</script>"],
    team: "Founders + W-2 employees",
    payroll: "My cousin does it",
    health: "Nothing yet",
    hire: "DROP TABLE leads",
    entity: "Delaware C-corp",
  });
  assert.deepEqual(dirty, {
    states: ["CA"],
    team: "Founders + W-2 employees",
    health: "Nothing yet",
    entity: "Delaware C-corp",
  });
});

test("no ref → no ref key; empty states dropped entirely", () => {
  const p = buildScanLeadPayload({
    email: "founder@startup.com",
    ref: null,
    answers: { states: ["Atlantis"], team: "Just founders" },
  });
  assert.ok(!("ref" in p));
  assert.deepEqual(p.answers, { team: "Just founders" });
});
