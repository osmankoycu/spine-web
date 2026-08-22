// Census parser tests against the sample exports in /fixtures.
// The clock is pinned so DOB-derived ages stay deterministic.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { analyzeCensus, parseDob, parseTier } from "./censusParse.ts";

const NOW = new Date(2026, 7, 23); // Aug 23, 2026

const fixture = (name: string) =>
  readFileSync(join(process.cwd(), "fixtures", name), "utf8");

function parsed(name: string) {
  const outcome = analyzeCensus(fixture(name), NOW);
  assert.equal(outcome.status, "parsed", `${name} should parse`);
  if (outcome.status !== "parsed") throw new Error("unreachable");
  return outcome;
}

test("rippling export: detected, aggregated, tiers mapped", () => {
  const o = parsed("rippling.csv");
  assert.equal(o.format, "rippling");
  assert.equal(o.aggregates.employeeCount, 8);
  assert.equal(o.aggregates.avgAge, 36.8);
  assert.deepEqual(o.aggregates.ageBands.map((b) => b.count), [3, 3, 1, 0, 1]);
  assert.deepEqual(o.aggregates.states, { NY: 4, CA: 2, TX: 2 });
  assert.deepEqual(o.aggregates.tierCounts, {
    ee: 4,
    ee_spouse: 1,
    ee_child: 1,
    family: 2,
  });
  assert.equal(o.aggregates.skippedRows, 0);
});

test("gusto export: detected via its address-style headers", () => {
  const o = parsed("gusto.csv");
  assert.equal(o.format, "gusto");
  assert.equal(o.aggregates.employeeCount, 6);
  assert.equal(o.aggregates.avgAge, 35.7);
  assert.deepEqual(o.aggregates.states, { WA: 4, OR: 1, CA: 1 });
  assert.equal(o.aggregates.tierCounts, undefined);
});

test("deel export: detected, state/province aggregated", () => {
  const o = parsed("deel.csv");
  assert.equal(o.format, "deel");
  assert.equal(o.aggregates.employeeCount, 5);
  assert.deepEqual(o.aggregates.states, { FL: 3, GA: 1, TX: 1 });
});

test("generic export: age column used directly, state names normalized", () => {
  const o = parsed("generic.csv");
  assert.equal(o.format, "generic");
  assert.equal(o.aggregates.employeeCount, 5);
  assert.deepEqual(o.aggregates.states, { NY: 3, NJ: 1, CT: 1 });
  assert.deepEqual(o.aggregates.tierCounts, {
    ee: 2,
    ee_spouse: 1,
    ee_child: 1,
    family: 1,
  });
});

test("edge cases: quoted commas, 2-digit years, bad rows skipped", () => {
  const o = parsed("generic-edge.csv");
  assert.equal(o.format, "generic");
  assert.equal(o.aggregates.employeeCount, 4);
  assert.equal(o.aggregates.skippedRows, 2); // missing DOB + invalid date
  assert.deepEqual([...o.aggregates.ages].sort((a, b) => a - b), [24, 32, 32, 54]);
  // Unknown state (Narnia) drops from the map but the person still counts.
  assert.deepEqual(o.aggregates.states, { NY: 1, CA: 1, TX: 1 });
});

test("headers without any age/DOB column → needs-mapping", () => {
  const o = analyzeCensus("name,email\nPat,pat@example.com\n", NOW);
  assert.equal(o.status, "needs-mapping");
  if (o.status === "needs-mapping") {
    assert.deepEqual(o.headers, ["name", "email"]);
  }
});

test("empty input → error", () => {
  assert.deepEqual(analyzeCensus("  \n ", NOW), { status: "error", reason: "empty" });
});

test("parseDob: formats, pivot years, invalids", () => {
  assert.equal(parseDob("1994-03-08", NOW), 32);
  assert.equal(parseDob("3/8/94", NOW), 32); // 2094 pivots back to 1994
  assert.equal(parseDob("08/30/2001", NOW), 24); // birthday later this year
  assert.equal(parseDob("13/40/1990", NOW), null);
  assert.equal(parseDob("not a date", NOW), null);
});

test("parseTier: compound labels resolve to the widest coverage", () => {
  assert.equal(parseTier("Employee Only"), "ee");
  assert.equal(parseTier("EE + Spouse"), "ee_spouse");
  assert.equal(parseTier("Employee + Children"), "ee_child");
  assert.equal(parseTier("Employee + Family"), "family");
  assert.equal(parseTier("Domestic Partner"), "ee_spouse");
  assert.equal(parseTier("???"), null);
});
