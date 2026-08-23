// Rules-engine tests, including the two review personas. Rule copy is the
// mock spec ported verbatim — these tests pin triggers, ordering, dynamic
// text, and the honest minimum (a clean setup yields a real "in good shape"
// report, never manufactured alarm).
import { test } from "node:test";
import assert from "node:assert/strict";
import { runScan, severityCounts, type ScanAnswers } from "./scanRules.ts";

const ids = (a: ScanAnswers) => runScan(a).map((f) => f.id);

test("persona A: CA 3-founder, no payroll, individual plans, DE C-corp", () => {
  const findings = runScan({
    states: ["CA"],
    team: "Just founders",
    payroll: "Not yet",
    health: "Individual plans / ACA",
    hire: "In the next 90 days",
    entity: "Delaware C-corp",
  });
  assert.deepEqual(
    findings.map((f) => f.id),
    ["de-franchise-tax", "overpaying-coverage", "first-hire-turnkey", "baseline-paperwork"],
  );
  assert.deepEqual(severityCounts(findings), { red: 0, amber: 2, green: 2 });
  // No employees → none of the employer obligations fire, even in CA.
  assert.ok(!findings.some((f) => f.id === "ca-workers-comp"));
  // CA drives the savings-line state name.
  assert.match(findings[1].detail, /available in California/);
});

test("persona B: NY+TX 8-person with employees and contractors on Gusto", () => {
  const findings = runScan({
    states: ["NY", "TX"],
    team: "Employees + contractors",
    payroll: "Gusto",
    health: "Nothing yet",
    hire: "Already hiring",
    entity: "Delaware C-corp",
  });
  assert.deepEqual(
    findings.map((f) => f.id),
    [
      "de-franchise-tax",
      "payroll-tax-registration",
      "contractor-classification",
      "overpaying-coverage",
      "first-hire-turnkey",
      "baseline-paperwork",
    ],
  );
  assert.deepEqual(severityCounts(findings), { red: 1, amber: 3, green: 2 });
  const payrollTax = findings[1];
  assert.equal(payrollTax.title, "Payroll tax registration missing in multiple states");
  assert.match(payrollTax.detail, /more than one state, so this multiplies/);
  // On Gusto → the deposit-schedule red must NOT fire.
  assert.ok(!findings.some((f) => f.id === "deposit-schedule"));
  // Not in CA → savings line names the first state instead.
  assert.match(findings[3].detail, /available in NY/);
});

test("CA employer combo fires workers' comp (red) and CalSavers (amber)", () => {
  const found = ids({ states: ["CA"], team: "Founders + W-2 employees" });
  assert.ok(found.includes("ca-workers-comp"));
  assert.ok(found.includes("calsavers"));
});

test("deposit schedule fires only for employers without real payroll", () => {
  const base: ScanAnswers = { states: ["TX"], team: "Founders + W-2 employees" };
  assert.ok(ids({ ...base, payroll: "Not yet" }).includes("deposit-schedule"));
  assert.ok(ids({ ...base, payroll: "Manual / by hand" }).includes("deposit-schedule"));
  assert.ok(!ids({ ...base, payroll: "Rippling" }).includes("deposit-schedule"));
  // Contractors-only teams never hit it, payroll or not.
  assert.ok(
    !ids({ states: ["TX"], team: "Founders + contractors", payroll: "Not yet" }).includes(
      "deposit-schedule",
    ),
  );
});

test("single-state employer gets the singular payroll-tax title", () => {
  const findings = runScan({ states: ["WA"], team: "Founders + W-2 employees" });
  const payrollTax = findings.find((f) => f.id === "payroll-tax-registration");
  assert.ok(payrollTax);
  assert.equal(payrollTax.title, "Payroll tax registration missing");
  assert.ok(!/multiplies/.test(payrollTax.detail));
});

test('"Other / remote" does not count toward the multi-state variant', () => {
  const findings = runScan({
    states: ["NY", "Other / remote"],
    team: "Founders + W-2 employees",
  });
  const payrollTax = findings.find((f) => f.id === "payroll-tax-registration");
  assert.equal(payrollTax?.title, "Payroll tax registration missing");
});

test("every non-group health answer triggers the overpaying finding; group plan does not", () => {
  for (const health of ["Nothing yet", "Individual plans / ACA", "COBRA from last job", "A spouse's plan"]) {
    assert.ok(ids({ states: ["MA"], health }).includes("overpaying-coverage"), health);
  }
  assert.ok(!ids({ states: ["MA"], health: "Group plan already" }).includes("overpaying-coverage"));
});

test("honest minimum: a clean setup yields only the baseline green", () => {
  const findings = runScan({
    states: ["CO"],
    team: "Just founders",
    payroll: "Gusto",
    health: "Group plan already",
    hire: "Not soon",
    entity: "Incorporated elsewhere",
  });
  assert.deepEqual(findings.map((f) => f.id), ["baseline-paperwork"]);
  assert.deepEqual(severityCounts(findings), { red: 0, amber: 0, green: 1 });
});

test("entity answers are mutually exclusive rules", () => {
  assert.ok(ids({ entity: "Delaware C-corp" }).includes("de-franchise-tax"));
  assert.ok(ids({ entity: "Not incorporated yet" }).includes("no-entity"));
  const elsewhere = ids({ entity: "Incorporated elsewhere" });
  assert.ok(!elsewhere.includes("de-franchise-tax") && !elsewhere.includes("no-entity"));
});
