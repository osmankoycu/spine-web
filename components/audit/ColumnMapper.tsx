"use client";

import { useState } from "react";
import {
  deriveAggregates,
  type CensusAggregates,
  type CensusRow,
} from "@/lib/audit/censusParse";
import { IconChevronDown } from "./icons";

// Fallback when auto-detection can't find the columns: three dropdowns over
// the file's real headers. The age/DOB pick is tried as both (deriveAggregates
// parses a numeric age first and falls back to date parsing per row), so the
// visitor doesn't have to know which kind their column is.

const FIELDS = [
  { key: "ageOrDob", label: "Birth date or age", required: true },
  { key: "state", label: "State", required: false },
  { key: "tier", label: "Coverage tier", required: false },
] as const;

type Picks = Record<(typeof FIELDS)[number]["key"], string>;

export function ColumnMapper({
  headers,
  rows,
  onMapped,
}: {
  headers: string[];
  rows: CensusRow[];
  onMapped: (aggregates: CensusAggregates) => void;
}) {
  const [picks, setPicks] = useState<Picks>({ ageOrDob: "", state: "", tier: "" });
  const [error, setError] = useState<string | null>(null);

  const apply = () => {
    const aggregates = deriveAggregates(
      rows,
      {
        age: picks.ageOrDob || undefined,
        dob: picks.ageOrDob || undefined,
        state: picks.state || undefined,
        tier: picks.tier || undefined,
      },
      new Date(),
    );
    if (!aggregates) {
      setError(
        "That column didn't give us any ages. Try the column holding a birth date or an age.",
      );
      return;
    }
    onMapped(aggregates);
  };

  return (
    <div className="rounded-[16px] border border-hairline bg-surface-inset p-5 sm:p-6">
      <p className="text-[14.5px] font-semibold text-ink">
        We couldn&apos;t auto-detect this file. Point us at the right columns:
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {FIELDS.map((f) => (
          <div key={f.key}>
            <label
              htmlFor={`audit-map-${f.key}`}
              className="mb-1.5 block text-[12px] font-extrabold uppercase tracking-[0.12em] text-ink-2"
            >
              {f.label}
              {!f.required && (
                <span className="ml-1 font-medium normal-case tracking-normal text-muted">
                  (optional)
                </span>
              )}
            </label>
            <div className="relative">
              <select
                id={`audit-map-${f.key}`}
                value={picks[f.key]}
                onChange={(e) => {
                  setError(null);
                  setPicks({ ...picks, [f.key]: e.target.value });
                }}
                className="w-full cursor-pointer appearance-none rounded-xl border border-black/15 bg-white px-4 py-2.5 text-[14.5px] text-ink outline-none focus:border-orange focus:ring-4 focus:ring-orange/15"
              >
                <option value="">{f.required ? "Pick a column" : "None"}</option>
                {headers.map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
              <IconChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-grey-text"
              />
            </div>
          </div>
        ))}
      </div>
      {error && (
        <p role="alert" className="mt-3 text-[13.5px] font-medium text-orange-600">
          {error}
        </p>
      )}
      <button
        type="button"
        disabled={!picks.ageOrDob}
        onClick={apply}
        className="mt-5 cursor-pointer rounded-pill bg-black px-6 py-3 text-[14.5px] font-semibold text-white transition-colors hover:bg-black/85 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Use these columns
      </button>
    </div>
  );
}
