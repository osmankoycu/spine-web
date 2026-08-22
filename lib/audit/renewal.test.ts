// Renewal-window math tests. Pinned clock; December's case crosses a DST
// boundary on purpose (the day count must not drift by the changed hour).
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  daysToRenewal,
  decisionDeadline,
  nextRenewalDate,
  shortDate,
} from "./renewal.ts";

const NOW = new Date(2026, 7, 23, 14, 30); // Aug 23, 2026, mid-afternoon

test("nextRenewalDate: future month this year, passed month next year", () => {
  assert.equal(nextRenewalDate(12, NOW).getFullYear(), 2026);
  assert.equal(nextRenewalDate(8, NOW).getFullYear(), 2027); // Aug 1 already passed
  assert.equal(nextRenewalDate(9, NOW).getMonth(), 8); // Sep this year
});

test("daysToRenewal counts calendar days, DST-safe", () => {
  assert.equal(daysToRenewal(9, NOW), 9); // Aug 23 → Sep 1
  assert.equal(daysToRenewal(12, NOW), 100); // Aug 23 → Dec 1, across fall DST
  assert.equal(daysToRenewal(8, NOW), 343); // Aug 23 2026 → Aug 1 2027
});

test("decisionDeadline is 30 calendar days before renewal", () => {
  assert.equal(shortDate(decisionDeadline(12, NOW)), "Nov 1");
  assert.equal(shortDate(decisionDeadline(9, NOW)), "Aug 2");
});
