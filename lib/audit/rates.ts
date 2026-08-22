// Rate tables for the instant benefits audit. Data only — the math lives in
// auditEngine.ts. Every table here is a directional v1 approximation so the
// tool can ship ahead of real rate data.
// TODO: replace with filed small-group rates (CMS PUF / state filings) — swap
// values here, engine logic stays untouched.

// KFF benchmark: average single-coverage group premium, $/employee/month.
// TODO: replace with filed small-group rates
export const BASELINE_PEPM = 1000;

// Age rate curve as control points, piecewise-linearly interpolated by the
// engine. Shape follows the ACA standard age curve (3:1 corridor, 21→1.00,
// 64→3.00) normalized so a 40-year-old = 1.0 — the baseline PEPM above already
// describes an average-aged workforce. Interpolation (vs. hard bands) keeps the
// benchmark band moving smoothly under the age slider.
// TODO: replace with filed small-group rates
export const AGE_CURVE: { age: number; factor: number }[] = [
  { age: 18, factor: 0.78 },
  { age: 25, factor: 0.8 },
  { age: 30, factor: 0.89 },
  { age: 35, factor: 0.95 },
  { age: 40, factor: 1.0 },
  { age: 45, factor: 1.1 },
  { age: 50, factor: 1.4 },
  { age: 55, factor: 1.73 },
  { age: 60, factor: 2.12 },
  { age: 64, factor: 2.35 },
];

// State premium index vs. the national average (1.0). Approximated from KFF
// average single-premium variation by state.
// TODO: replace with filed small-group rates
export const STATE_FACTORS: Record<string, number> = {
  AK: 1.18, AL: 0.92, AR: 0.88, AZ: 0.97, CA: 1.02, CO: 0.99, CT: 1.08,
  DC: 1.09, DE: 1.05, FL: 1.01, GA: 0.98, HI: 0.82, IA: 0.95, ID: 0.9,
  IL: 1.02, IN: 0.99, KS: 0.96, KY: 0.95, LA: 0.99, MA: 1.1, MD: 1.0,
  ME: 1.06, MI: 0.96, MN: 0.99, MO: 0.96, MS: 0.9, MT: 0.97, NC: 0.97,
  ND: 0.94, NE: 0.98, NH: 1.08, NJ: 1.12, NM: 0.93, NV: 0.95, NY: 1.15,
  OH: 0.98, OK: 0.94, OR: 1.0, PA: 1.02, RI: 1.04, SC: 0.97, SD: 0.98,
  TN: 0.93, TX: 1.0, UT: 0.92, VA: 0.99, VT: 1.12, WA: 1.01, WI: 1.03,
  WV: 1.11, WY: 1.05,
};
export const DEFAULT_STATE_FACTOR = 1.0;

export type CarrierId = "uhc" | "aetna" | "cigna" | "bcbs" | "kaiser" | "other";

// Median spend vs. the market-expected rate, per carrier. Used only when the
// visitor doesn't provide an invoice total: their current spend is estimated as
// expected × factor. Directional — reflects that legacy-broker placements at
// national carriers typically price above a shopped market rate.
// TODO: replace with filed small-group rates
export const CARRIER_SPEND_FACTORS: Record<CarrierId, number> = {
  uhc: 1.12,
  aetna: 1.08,
  cigna: 1.1,
  bcbs: 1.09,
  kaiser: 0.97,
  other: 1.1,
};

export type Tier = "ee" | "ee_spouse" | "ee_child" | "family";

// Premium multiplier per enrollment tier vs. employee-only. Family ≈ 2.85×
// single tracks the KFF family-to-single premium ratio.
// TODO: replace with filed small-group rates
export const TIER_FACTORS: Record<Tier, number> = {
  ee: 1.0,
  ee_spouse: 2.0,
  ee_child: 1.75,
  family: 2.85,
};

export type Confidence = "reported" | "estimated" | "rough";

// Half-width of the overpayment range by confidence. "reported" (they typed an
// invoice total) uses the ±30% convention from the Spine employer dashboard;
// the estimated tiers widen because current spend itself is inferred.
export const RANGE_BY_CONFIDENCE: Record<Confidence, number> = {
  reported: 0.3,
  estimated: 0.45,
  rough: 0.6,
};

// Half-width of the step-0 "companies like yours typically pay" band.
export const BENCHMARK_BAND = 0.12;

export type ArchetypeId = "cost" | "balanced" | "protection" | "family";

// Plan-mix directions shown in the results panel. Framing shared with the
// employer dashboard scenario (EmployerScenario.tsx). pepmLow/High are
// indicative multipliers on the expected market PEPM — directional, not quotes.
export const ARCHETYPES: Record<
  ArchetypeId,
  { label: string; blurb: string; multLow: number; multHigh: number }
> = {
  cost: {
    label: "Cost-optimized",
    blurb: "Lean, HSA-first plans that keep premiums as low as possible.",
    multLow: 0.86,
    multHigh: 0.96,
  },
  balanced: {
    label: "Balanced",
    blurb: "A full spread, one plan for every kind of employee, value to premium.",
    multLow: 0.94,
    multHigh: 1.04,
  },
  protection: {
    label: "Protection-focused",
    blurb: "Richer coverage and low out-of-pocket caps for a higher-need team.",
    multLow: 1.04,
    multHigh: 1.16,
  },
  family: {
    label: "Family-friendly",
    blurb: "Broad networks and dependent-friendly cost sharing for families.",
    multLow: 0.96,
    multHigh: 1.08,
  },
};
