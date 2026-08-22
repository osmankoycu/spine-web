// Engine unit tests — run with `npm test` (node:test, TS type-stripping).
import { test } from "node:test";
import assert from "node:assert/strict";
import { ageFactor, benchmarkBand, estimate } from "./auditEngine.ts";

test("ageFactor hits control points and interpolates between them", () => {
  assert.equal(ageFactor(40), 1.0);
  assert.equal(ageFactor(25), 0.8);
  // midpoint of the 40→45 segment (1.0 → 1.1)
  assert.ok(Math.abs(ageFactor(42.5) - 1.05) < 1e-9);
});

test("ageFactor clamps outside the curve", () => {
  assert.equal(ageFactor(16), 0.78);
  assert.equal(ageFactor(70), 2.35);
});

test("benchmarkBand applies state and age factors around the baseline", () => {
  const b = benchmarkBand({ headcount: 20, state: "NY", avgAge: 40 });
  assert.equal(b.pepm, 1150); // 1000 × 1.15 × 1.0
  assert.equal(b.pepmLow, 1012);
  assert.equal(b.pepmHigh, 1288);
});

test("reported premium: ±30% range in $100 steps", () => {
  // TX factor 1.0, age 40 factor 1.0 → expected $10,000/mo for 10 people.
  const r = estimate({
    headcount: 10,
    state: "TX",
    avgAge: 40,
    currentMonthlyTotal: 13_000,
  });
  assert.equal(r.confidence, "reported");
  assert.equal(r.expectedMonthlyTotal, 10_000);
  assert.equal(r.currentPEPM, 1300);
  // (13000 − 10000) × 12 = 36,000/yr → ±30%
  assert.equal(r.annualOverpaymentLow, 25_200);
  assert.equal(r.annualOverpaymentHigh, 46_800);
  assert.equal(r.wellPriced, false);
});

test("paying under market → honest well-priced state, no negative range", () => {
  const r = estimate({
    headcount: 10,
    state: "TX",
    avgAge: 40,
    currentMonthlyTotal: 9_000,
  });
  assert.equal(r.wellPriced, true);
  assert.equal(r.annualOverpaymentLow, 0);
  assert.equal(r.annualOverpaymentHigh, 0);
  assert.deepEqual(r.archetypes.map((a) => a.id), ["protection", "balanced"]);
});

test("negligible overpayment collapses to well-priced", () => {
  // $50/mo over on a $10k/mo bill → $780/yr at the high end, under the floor.
  const r = estimate({
    headcount: 10,
    state: "TX",
    avgAge: 40,
    currentMonthlyTotal: 10_050,
  });
  assert.equal(r.wellPriced, true);
});

test("no premium, no census → rough confidence from carrier medians", () => {
  const r = estimate({ headcount: 10, state: "TX", avgAge: 40, carrier: "uhc" });
  assert.equal(r.confidence, "rough");
  assert.equal(r.currentMonthlyTotal, 11_200); // expected × 1.12
  // over = $1,200/mo → $14,400/yr, ±60%
  assert.equal(r.annualOverpaymentLow, 5_700); // 5760 floored to $100
  assert.equal(r.annualOverpaymentHigh, 23_100); // 23040 ceiled to $100
});

test("census ages without premium → estimated confidence, per-person curve", () => {
  const r = estimate({ headcount: 99, ages: [25, 55], carrier: "aetna" });
  assert.equal(r.confidence, "estimated");
  // headcount comes from the census, not the slider
  assert.equal(r.expectedMonthlyTotal, 2530); // (0.8 + 1.73) × 1000
  assert.equal(r.expectedPEPM, 1265);
});

test("tier mix scales expected spend", () => {
  const flat = estimate({ headcount: 2, avgAge: 40, currentMonthlyTotal: 5000 });
  const mixed = estimate({
    headcount: 2,
    avgAge: 40,
    currentMonthlyTotal: 5000,
    tierCounts: { ee: 1, family: 1 },
  });
  assert.equal(flat.expectedMonthlyTotal, 2000);
  assert.equal(mixed.expectedMonthlyTotal, 3850); // ×(1 + 2.85)/2
});

test("archetype picks: family-heavy census adds Family-friendly", () => {
  const r = estimate({
    headcount: 10,
    avgAge: 35,
    currentMonthlyTotal: 20_000,
    tierCounts: { ee: 5, family: 5 },
  });
  assert.deepEqual(r.archetypes.map((a) => a.id), ["cost", "balanced", "family"]);
});

test("archetype picks: older team adds Protection-focused", () => {
  const r = estimate({ headcount: 10, avgAge: 50, currentMonthlyTotal: 25_000 });
  assert.deepEqual(r.archetypes.map((a) => a.id), ["cost", "balanced", "protection"]);
});

test("archetype price bands are derived from expected PEPM", () => {
  const r = estimate({ headcount: 10, state: "TX", avgAge: 40, currentMonthlyTotal: 13_000 });
  const cost = r.archetypes.find((a) => a.id === "cost")!;
  assert.equal(cost.pepmLow, 860); // 1000 × 0.86
  assert.equal(cost.pepmHigh, 960);
});
