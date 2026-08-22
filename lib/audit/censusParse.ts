// Client-side census parsing. The file NEVER leaves the browser: this module
// turns raw CSV text into anonymous aggregates (ages, age bands, states, tier
// counts) and everything downstream — UI, engine, lead submit — sees only
// those. Names or other PII columns are never read, held, or returned.
// Pure (the clock is a parameter) and unit-tested against /fixtures.
import Papa from "papaparse";
import {
  detectFormat,
  type DetectedMapping,
  type FieldKey,
  type HrisFormatId,
} from "./hrisFormats.ts";
import { toStateCode } from "./usStates.ts";
import type { Tier } from "./rates.ts";

export type CensusRow = Record<string, string>;

export type CensusAggregates = {
  employeeCount: number;
  ages: number[]; // per-employee, for the engine
  avgAge: number;
  ageBands: { label: string; count: number }[]; // histogram, fixed band order
  states: Record<string, number>; // 2-letter code → headcount
  tierCounts?: Partial<Record<Tier, number>>;
  skippedRows: number; // rows without a usable age/DOB
};

export type ParseOutcome =
  | {
      status: "parsed";
      format: HrisFormatId;
      mapping: DetectedMapping["mapping"];
      aggregates: CensusAggregates;
      // Kept in memory (browser only) so the manual mapper can re-derive with
      // corrected columns without re-reading the file.
      rows: CensusRow[];
      headers: string[];
    }
  | { status: "needs-mapping"; headers: string[]; rows: CensusRow[] }
  | { status: "error"; reason: "empty" | "unreadable" };

export const AGE_BAND_LABELS = ["18–29", "30s", "40s", "50s", "60+"] as const;

function bandIndex(age: number): number {
  if (age < 30) return 0;
  if (age < 40) return 1;
  if (age < 50) return 2;
  if (age < 60) return 3;
  return 4;
}

// Accepts ISO (1994-03-08), US (3/8/1994, 03-08-1994) and 2-digit-year US
// dates (3/8/94 — pivoted so the result lands in [now-100, now]).
export function parseDob(raw: string, now: Date): number | null {
  const v = raw.trim();
  if (!v) return null;

  let y = 0;
  let m = 0;
  let d = 0;
  const iso = v.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  const us = v.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})$/);
  if (iso) {
    y = +iso[1];
    m = +iso[2];
    d = +iso[3];
  } else if (us) {
    m = +us[1];
    d = +us[2];
    y = +us[3];
    if (us[3].length <= 2) {
      const century = Math.floor(now.getFullYear() / 100) * 100;
      y += century;
      if (y > now.getFullYear()) y -= 100;
    }
  } else {
    return null;
  }
  if (m < 1 || m > 12 || d < 1 || d > 31) return null;

  let age = now.getFullYear() - y;
  const birthdayPassed =
    now.getMonth() + 1 > m || (now.getMonth() + 1 === m && now.getDate() >= d);
  if (!birthdayPassed) age -= 1;
  return age;
}

// "Employee + Spouse", "EE+SP", "Family", "Employee Only" … → Tier. Family
// beats spouse beats child beats employee-only, so compound labels resolve to
// the widest coverage they mention.
export function parseTier(raw: string): Tier | null {
  const v = raw.trim().toLowerCase();
  if (!v) return null;
  if (/fam/.test(v)) return "family";
  if (/spouse|\bsp\b|\bes\b|partner/.test(v)) return "ee_spouse";
  if (/child|\bec\b|dependent/.test(v)) return "ee_child";
  if (/employee|\bee\b|single|only|self/.test(v)) return "ee";
  return null;
}

function isValidAge(age: number): boolean {
  return Number.isFinite(age) && age >= 14 && age <= 100;
}

export function deriveAggregates(
  rows: CensusRow[],
  mapping: Partial<Record<FieldKey, string>>,
  now: Date,
): CensusAggregates | null {
  const ages: number[] = [];
  const states: Record<string, number> = {};
  const tierCounts: Partial<Record<Tier, number>> = {};
  let skippedRows = 0;
  let tiersSeen = 0;

  for (const row of rows) {
    let age: number | null = null;
    if (mapping.age !== undefined) {
      const n = parseFloat((row[mapping.age] ?? "").trim());
      if (isValidAge(n)) age = Math.floor(n);
    }
    if (age === null && mapping.dob !== undefined) {
      const fromDob = parseDob(row[mapping.dob] ?? "", now);
      if (fromDob !== null && isValidAge(fromDob)) age = fromDob;
    }
    if (age === null) {
      skippedRows += 1;
      continue;
    }
    ages.push(age);

    if (mapping.state !== undefined) {
      const code = toStateCode(row[mapping.state] ?? "");
      if (code) states[code] = (states[code] ?? 0) + 1;
    }
    if (mapping.tier !== undefined) {
      const tier = parseTier(row[mapping.tier] ?? "");
      if (tier) {
        tierCounts[tier] = (tierCounts[tier] ?? 0) + 1;
        tiersSeen += 1;
      }
    }
  }

  if (ages.length === 0) return null;

  const bands = AGE_BAND_LABELS.map((label) => ({ label, count: 0 }));
  for (const a of ages) bands[bandIndex(a)].count += 1;

  return {
    employeeCount: ages.length,
    ages,
    avgAge: Math.round((ages.reduce((s, a) => s + a, 0) / ages.length) * 10) / 10,
    ageBands: bands,
    states,
    tierCounts: tiersSeen > 0 ? tierCounts : undefined,
    skippedRows,
  };
}

export function analyzeCensus(csvText: string, now: Date): ParseOutcome {
  if (!csvText.trim()) return { status: "error", reason: "empty" };

  const parsed = Papa.parse<CensusRow>(csvText, {
    header: true,
    skipEmptyLines: "greedy",
    transformHeader: (h) => h.trim(),
  });
  const headers = (parsed.meta.fields ?? []).filter(Boolean);
  const rows = parsed.data;
  if (headers.length === 0 || rows.length === 0) {
    return { status: "error", reason: "unreadable" };
  }

  const { format, mapping } = detectFormat(headers);
  if (mapping.age === undefined && mapping.dob === undefined) {
    return { status: "needs-mapping", headers, rows };
  }

  const aggregates = deriveAggregates(rows, mapping, now);
  // Columns detected but no row yielded a usable age — the mapping is likely
  // wrong (e.g. an "Age" column holding tenure). Hand it to the manual mapper.
  if (!aggregates) return { status: "needs-mapping", headers, rows };

  return { status: "parsed", format, mapping, aggregates, rows, headers };
}
