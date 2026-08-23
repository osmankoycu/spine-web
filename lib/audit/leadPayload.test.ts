// Pins the privacy contract: whatever the census parser holds (rows, names,
// addresses, emails), the built lead payload carries aggregates only — on the
// auto-detect path, the manual-mapper path, the skip path, and the tightener
// copy re-submit. If a future field leaks row data, these tests break.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { analyzeCensus, deriveAggregates } from "./censusParse.ts";
import { estimate } from "./auditEngine.ts";
import { buildAuditLeadPayload, type CensusState } from "./leadPayload.ts";

const NOW = new Date(2026, 7, 23);
const PREVIEW = { headcount: 25, state: "NY", avgAge: 27 };

const ALLOWED_KEYS = new Set([
  "funnel", "mode", "email", "ref", "headcount", "state", "states", "avgAge",
  "ageBands", "tierCounts", "carrier", "renewalMonth", "premiumMonthly",
  "censusSource", "result",
]);

// PII strings that appear in the fixtures. None may reach the wire. DOB
// needles keep their separators ("/1994", "1985-12-30") so they can't collide
// with legitimate dollar amounts in the JSON.
const FORBIDDEN = [
  "Lovelace", "Ada", "Turing", "Torvalds", "jane@example.com", "jane@corp.com",
  "Analytical Way", "Kernel St", "Sam Lead", "Miami", "/1994", "1985-12-30",
];

function assertAggregatesOnly(payload: object) {
  for (const key of Object.keys(payload)) {
    assert.ok(ALLOWED_KEYS.has(key), `unexpected payload key: ${key}`);
  }
  assert.ok(!("ages" in payload), "per-employee ages must not be in the payload");
  assert.ok(!("rows" in payload), "rows must not be in the payload");
  const wire = JSON.stringify(payload);
  for (const needle of FORBIDDEN) {
    assert.ok(!wire.includes(needle), `payload leaks row data: ${needle}`);
  }
}

function parsedCensus(name: string): CensusState {
  const outcome = analyzeCensus(
    readFileSync(join(process.cwd(), "fixtures", name), "utf8"),
    NOW,
  );
  assert.equal(outcome.status, "parsed");
  if (outcome.status !== "parsed") throw new Error("unreachable");
  return { kind: "parsed", aggregates: outcome.aggregates, format: outcome.format };
}

test("auto-detect path: payload is aggregates-only, census wins over sliders", () => {
  const census = parsedCensus("rippling.csv");
  const agg = census.kind === "parsed" ? census.aggregates : null!;
  const result = estimate({ headcount: 25, state: "NY", ages: agg.ages, carrier: "uhc" });
  const payload = buildAuditLeadPayload({
    mode: "lead",
    email: "founder@startup.com",
    ref: "yc",
    preview: PREVIEW,
    carrier: "uhc",
    renewalMonth: 12,
    premium: null,
    census,
    result,
  });
  assertAggregatesOnly(payload);
  assert.equal(payload.headcount, 8); // census count, not the slider's 25
  assert.equal(payload.state, "NY"); // dominant census state
  assert.equal(payload.censusSource, "rippling");
  assert.equal(payload.ref, "yc");
  assert.deepEqual(payload.states, { NY: 4, CA: 2, TX: 2 });
});

test("manual-mapper path: derived aggregates stay row-free", () => {
  const outcome = analyzeCensus(
    readFileSync(join(process.cwd(), "fixtures", "deel.csv"), "utf8"),
    NOW,
  );
  assert.equal(outcome.status, "parsed");
  if (outcome.status !== "parsed") throw new Error("unreachable");
  // Re-derive through the mapper entry point, as ColumnMapper does.
  const aggregates = deriveAggregates(
    outcome.rows,
    { age: "Date of birth", dob: "Date of birth", state: "State" },
    NOW,
  );
  assert.ok(aggregates);
  const census: CensusState = { kind: "parsed", aggregates, format: "generic" };
  const result = estimate({ headcount: 5, ages: aggregates.ages });
  const payload = buildAuditLeadPayload({
    mode: "lead",
    email: "founder@startup.com",
    ref: null,
    preview: PREVIEW,
    carrier: "",
    renewalMonth: 0,
    premium: null,
    census,
    result,
  });
  assertAggregatesOnly(payload);
  assert.equal(payload.censusSource, "generic");
  assert.equal(payload.ref, undefined);
  assert.equal(payload.carrier, undefined);
  assert.equal(payload.renewalMonth, undefined);
});

test("skip path: slider values, source marked skipped", () => {
  const result = estimate({ headcount: 25, state: "NY", avgAge: 27, carrier: "aetna" });
  const payload = buildAuditLeadPayload({
    mode: "lead",
    email: "founder@startup.com",
    ref: null,
    preview: PREVIEW,
    carrier: "aetna",
    renewalMonth: 10,
    premium: null,
    census: { kind: "skipped" },
    result,
  });
  assertAggregatesOnly(payload);
  assert.equal(payload.headcount, 25);
  assert.equal(payload.avgAge, 27);
  assert.equal(payload.censusSource, "skipped");
  assert.equal(payload.states, undefined);
});

test("tightener copy re-submit: premium present, still aggregates-only", () => {
  const census = parsedCensus("gusto.csv");
  const agg = census.kind === "parsed" ? census.aggregates : null!;
  const result = estimate({ headcount: 6, ages: agg.ages, currentMonthlyTotal: 7500 });
  const payload = buildAuditLeadPayload({
    mode: "copy",
    email: "founder@startup.com",
    ref: null,
    preview: PREVIEW,
    carrier: "cigna",
    renewalMonth: 0,
    premium: 7500,
    census,
    result,
  });
  assertAggregatesOnly(payload);
  assert.equal(payload.mode, "copy");
  assert.equal(payload.premiumMonthly, 7500);
  assert.equal(payload.result.confidence, "reported");
});
