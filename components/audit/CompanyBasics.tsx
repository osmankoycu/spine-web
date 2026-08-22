"use client";

import { useState } from "react";
import type { CarrierId } from "@/lib/audit/rates";
import { RenewalTimeline } from "./RenewalTimeline";
import { IconArrowRight, IconChevronDown } from "./icons";

// Step 1: carrier, renewal month, and the optional invoice total. The invoice
// total is the single highest-value field (it flips the estimate from carrier
// medians to their real number), so it gets the "from your latest invoice"
// nudge instead of being buried.

export type BasicsValue = {
  carrier: CarrierId | "";
  renewalMonth: number; // 1–12, 0 = not set
  premiumRaw: string; // as typed; parsePremium() turns it into a number
};

export const CARRIER_OPTIONS: { id: CarrierId; label: string }[] = [
  { id: "uhc", label: "UnitedHealthcare" },
  { id: "aetna", label: "Aetna" },
  { id: "cigna", label: "Cigna" },
  { id: "bcbs", label: "Blue Cross Blue Shield" },
  { id: "kaiser", label: "Kaiser Permanente" },
  { id: "other", label: "Other or no coverage yet" },
];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// "$24,000", "24000.50", "24k" → dollars (or null). Forgiving on purpose:
// people paste straight from invoices.
export function parsePremium(raw: string): number | null {
  const cleaned = raw.trim().toLowerCase().replace(/[$,\s]/g, "");
  if (!cleaned) return null;
  const k = cleaned.endsWith("k");
  const n = parseFloat(k ? cleaned.slice(0, -1) : cleaned);
  if (!Number.isFinite(n) || n <= 0) return null;
  return k ? n * 1000 : n;
}

const inputCls =
  "w-full rounded-2xl border border-black/15 bg-white px-5 py-3.5 text-[16px] text-ink outline-none transition-colors placeholder:text-grey-text/70 focus:border-orange focus:ring-4 focus:ring-orange/15";
const labelCls = "mb-2 block text-[13px] font-extrabold uppercase tracking-[0.12em] text-ink-2";

export function CompanyBasics({
  value,
  onChange,
  onContinue,
}: {
  value: BasicsValue;
  onChange: (v: BasicsValue) => void;
  onContinue: () => void;
}) {
  // The clock enters at render (client-only section, mounted on interaction),
  // stable for the component's lifetime.
  const [now] = useState(() => new Date());

  return (
    <div className="rounded-[28px] border border-hairline bg-white p-6 shadow-[0_30px_80px_-40px_rgba(20,20,18,0.35)] sm:p-8 lg:p-10">
      <div className="text-[12px] font-extrabold uppercase tracking-[0.16em] text-orange-700">
        Step 1 · Company basics
      </div>
      <h2 className="mt-2 text-[24px] font-extrabold tracking-[-0.02em] text-ink sm:text-[28px]">
        Where are you today?
      </h2>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="audit-carrier" className={labelCls}>
            Current carrier
          </label>
          <div className="relative">
            <select
              id="audit-carrier"
              value={value.carrier}
              onChange={(e) => onChange({ ...value, carrier: e.target.value as BasicsValue["carrier"] })}
              className={`${inputCls} cursor-pointer appearance-none ${value.carrier === "" ? "text-grey-text/70" : ""}`}
            >
              <option value="" disabled>
                Pick your carrier
              </option>
              {CARRIER_OPTIONS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
            <IconChevronDown
              size={18}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-grey-text"
            />
          </div>
        </div>

        <div>
          <label htmlFor="audit-renewal" className={labelCls}>
            Renewal month
          </label>
          <div className="relative">
            <select
              id="audit-renewal"
              value={value.renewalMonth}
              onChange={(e) => onChange({ ...value, renewalMonth: +e.target.value })}
              className={`${inputCls} cursor-pointer appearance-none ${value.renewalMonth === 0 ? "text-grey-text/70" : ""}`}
            >
              <option value={0}>Not sure</option>
              {MONTHS.map((m, i) => (
                <option key={m} value={i + 1}>
                  {m}
                </option>
              ))}
            </select>
            <IconChevronDown
              size={18}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-grey-text"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="audit-premium" className={labelCls}>
            Current monthly premium total{" "}
            <span className="font-medium normal-case tracking-normal text-muted">
              (optional, from your latest invoice)
            </span>
          </label>
          <input
            id="audit-premium"
            type="text"
            inputMode="decimal"
            value={value.premiumRaw}
            onChange={(e) => onChange({ ...value, premiumRaw: e.target.value })}
            placeholder="$24,000"
            className={inputCls}
          />
          <p className="mt-2 text-[13px] leading-snug text-muted">
            With this one number your estimate gets much sharper. Skip it and we
            estimate from carrier medians instead.
          </p>
        </div>
      </div>

      {value.renewalMonth > 0 && (
        <div className="mt-6">
          <RenewalTimeline month={value.renewalMonth} now={now} />
        </div>
      )}

      <button
        type="button"
        disabled={value.carrier === ""}
        onClick={onContinue}
        className="mt-7 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-pill bg-black px-7 py-4 text-[16px] font-semibold text-white transition-colors hover:bg-black/85 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
      >
        Continue to census
        <IconArrowRight size={18} />
      </button>
    </div>
  );
}
