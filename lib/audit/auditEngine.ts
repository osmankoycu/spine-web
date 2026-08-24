// Pure estimation engine for the instant benefits audit. No UI imports, no
// side effects, no network — everything runs client-side and is unit-testable
// (auditEngine.test.ts). Data lives in rates.ts; this file is only the math.
import {
  AGE_CURVE,
  ARCHETYPES,
  BASELINE_PEPM,
  BENCHMARK_BAND,
  CARRIER_SPEND_FACTORS,
  DEFAULT_STATE_FACTOR,
  RANGE_BY_CONFIDENCE,
  STATE_FACTORS,
  TIER_FACTORS,
  type ArchetypeId,
  type CarrierId,
  type Confidence,
  type Tier,
} from "./rates.ts";

export type AuditInput = {
  headcount: number;
  states?: string[]; // 2-letter codes; empty or absent = national average
  // Employees per state, when a census gives us the real split. Without it
  // the states above are weighted evenly.
  stateWeights?: Record<string, number>;
  ages?: number[]; // per-employee, from a parsed census (wins over avgAge)
  avgAge?: number; // slider proxy when there's no census
  carrier?: CarrierId;
  currentMonthlyTotal?: number; // whole-company $/mo, from their invoice
  tierCounts?: Partial<Record<Tier, number>>;
};

export type ArchetypeFit = {
  id: ArchetypeId;
  label: string;
  blurb: string;
  pepmLow: number;
  pepmHigh: number;
};

export type AuditResult = {
  expectedPEPM: number;
  currentPEPM: number;
  expectedMonthlyTotal: number;
  currentMonthlyTotal: number;
  annualOverpaymentLow: number; // ≥ 0, rounded down to $100
  annualOverpaymentHigh: number; // ≥ 0, rounded up to $100
  wellPriced: boolean;
  confidence: Confidence;
  archetypes: ArchetypeFit[]; // 2–3, primary direction first
};

// Overpayment below max($1,000/yr, 2% of current spend) reads as noise, not a
// finding — collapse it to the honest "you look well-priced" state instead of
// flashing a tiny number.
const NEGLIGIBLE_FLOOR_ANNUAL = 1000;
const NEGLIGIBLE_SHARE = 0.02;

// Piecewise-linear interpolation over the age curve, clamped at both ends.
// Smooth by design: the step-0 band animates under an age slider and must not
// jump at band edges.
export function ageFactor(age: number): number {
  const pts = AGE_CURVE;
  if (age <= pts[0].age) return pts[0].factor;
  const last = pts[pts.length - 1];
  if (age >= last.age) return last.factor;
  for (let i = 1; i < pts.length; i++) {
    if (age <= pts[i].age) {
      const a = pts[i - 1];
      const b = pts[i];
      const t = (age - a.age) / (b.age - a.age);
      return a.factor + t * (b.factor - a.factor);
    }
  }
  return last.factor;
}

export function stateFactor(state?: string): number {
  if (!state) return DEFAULT_STATE_FACTOR;
  return STATE_FACTORS[state.toUpperCase()] ?? DEFAULT_STATE_FACTOR;
}

// Premiums are rated per work location, so a team split across states pays a
// blend. With a census we know the real headcount per state and weight by it;
// with hand-picked states we can only assume an even split, which is why the
// band around the result stays wide.
export function blendedStateFactor(
  states?: string[],
  weights?: Record<string, number>,
): number {
  if (!states || states.length === 0) return DEFAULT_STATE_FACTOR;
  let totalWeight = 0;
  let weightedSum = 0;
  for (const s of states) {
    const w = weights?.[s.toUpperCase()] ?? 1;
    if (w <= 0) continue;
    totalWeight += w;
    weightedSum += w * stateFactor(s);
  }
  return totalWeight > 0 ? weightedSum / totalWeight : DEFAULT_STATE_FACTOR;
}

// Enrollment-mix multiplier: weighted average tier factor. Without tier data we
// assume employee-only across the board. TODO: when an invoice total includes
// dependents but the census has no tier column, this understates expected spend
// and overstates overpayment — filed-rate v2 should surface the assumption.
function tierMultiplier(tierCounts?: Partial<Record<Tier, number>>): number {
  if (!tierCounts) return 1;
  let n = 0;
  let sum = 0;
  for (const [tier, count] of Object.entries(tierCounts) as [Tier, number][]) {
    if (!count || count <= 0) continue;
    n += count;
    sum += count * TIER_FACTORS[tier];
  }
  return n > 0 ? sum / n : 1;
}

// Expected market total, $/mo, for the whole company at single-coverage rates
// times the enrollment-mix multiplier.
function expectedTotal(input: AuditInput): { total: number; headcount: number } {
  const sf = blendedStateFactor(input.states, input.stateWeights);
  const tm = tierMultiplier(input.tierCounts);
  if (input.ages && input.ages.length > 0) {
    const sum = input.ages.reduce((acc, a) => acc + ageFactor(a), 0);
    return { total: sum * BASELINE_PEPM * sf * tm, headcount: input.ages.length };
  }
  const n = Math.max(1, Math.round(input.headcount));
  const af = ageFactor(input.avgAge ?? 40);
  return { total: n * af * BASELINE_PEPM * sf * tm, headcount: n };
}

const roundDown100 = (v: number) => Math.max(0, Math.floor(v / 100) * 100);
const roundUp100 = (v: number) => Math.max(0, Math.ceil(v / 100) * 100);

// Step-0 preview: the "companies like yours typically pay" band, $/employee/mo.
export function benchmarkBand(input: {
  headcount: number;
  states?: string[];
  avgAge?: number;
}): { pepm: number; pepmLow: number; pepmHigh: number } {
  const pepm = BASELINE_PEPM * blendedStateFactor(input.states) * ageFactor(input.avgAge ?? 40);
  return {
    pepm: Math.round(pepm),
    pepmLow: Math.round(pepm * (1 - BENCHMARK_BAND)),
    pepmHigh: Math.round(pepm * (1 + BENCHMARK_BAND)),
  };
}

function recommendArchetypes(input: AuditInput, wellPriced: boolean): ArchetypeId[] {
  if (wellPriced) return ["protection", "balanced"];
  const ids: ArchetypeId[] = ["cost", "balanced"];
  const tc = input.tierCounts;
  const n = tc
    ? Object.values(tc).reduce((a, b) => a + (b ?? 0), 0)
    : 0;
  const withDeps = tc
    ? (tc.ee_spouse ?? 0) + (tc.ee_child ?? 0) + (tc.family ?? 0)
    : 0;
  const familyShare = n > 0 ? withDeps / n : 0;
  const effAge =
    input.ages && input.ages.length > 0
      ? input.ages.reduce((a, b) => a + b, 0) / input.ages.length
      : input.avgAge ?? 40;
  if (familyShare >= 0.35) ids.push("family");
  else if (effAge >= 47) ids.push("protection");
  return ids;
}

export function estimate(input: AuditInput): AuditResult {
  const { total: expected, headcount } = expectedTotal(input);

  let current: number;
  let confidence: Confidence;
  if (input.currentMonthlyTotal && input.currentMonthlyTotal > 0) {
    current = input.currentMonthlyTotal;
    confidence = "reported";
  } else {
    current = expected * CARRIER_SPEND_FACTORS[input.carrier ?? "other"];
    confidence = input.ages && input.ages.length > 0 ? "estimated" : "rough";
  }

  const annualOver = (current - expected) * 12;
  const half = RANGE_BY_CONFIDENCE[confidence];
  let low = roundDown100(annualOver * (1 - half));
  let high = roundUp100(annualOver * (1 + half));

  const negligible = Math.max(NEGLIGIBLE_FLOOR_ANNUAL, current * 12 * NEGLIGIBLE_SHARE);
  const wellPriced = annualOver <= 0 || high < negligible;
  if (wellPriced) {
    low = 0;
    high = 0;
  }

  const expectedPEPM = expected / headcount;
  const archetypes = recommendArchetypes(input, wellPriced).map((id) => ({
    id,
    label: ARCHETYPES[id].label,
    blurb: ARCHETYPES[id].blurb,
    pepmLow: Math.round(expectedPEPM * ARCHETYPES[id].multLow),
    pepmHigh: Math.round(expectedPEPM * ARCHETYPES[id].multHigh),
  }));

  return {
    expectedPEPM: Math.round(expectedPEPM),
    currentPEPM: Math.round(current / headcount),
    expectedMonthlyTotal: Math.round(expected),
    currentMonthlyTotal: Math.round(current),
    annualOverpaymentLow: low,
    annualOverpaymentHigh: high,
    wellPriced,
    confidence,
    archetypes,
  };
}
