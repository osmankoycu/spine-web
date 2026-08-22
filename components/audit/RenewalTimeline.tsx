"use client";

import { IconAlertTriangle, IconCalendar } from "./icons";

// Step 1's renewal countdown. Date math lives in lib/audit/renewal.ts (shared
// with the lead-email route). Client-only and rendered after a user
// interaction, so new Date() here can't cause a hydration mismatch.
import {
  daysToRenewal,
  decisionDeadline,
  nextRenewalDate,
  shortDate,
  QUOTE_DAYS,
} from "@/lib/audit/renewal";

const URGENT_DAYS = 45;

export function RenewalTimeline({ month, now }: { month: number; now: Date }) {
  const renewal = nextRenewalDate(month, now);
  const n = daysToRenewal(month, now);
  const deadline = decisionDeadline(month, now);
  const windowDays = n - QUOTE_DAYS;
  const urgent = n < URGENT_DAYS;
  const insideQuoteWindow = windowDays <= 0;

  // Marker positions along the track: today 0%, renewal 100%.
  const deadlinePct = Math.max(0, Math.min(100, (windowDays / n) * 100));

  return (
    <div
      className={`rounded-[16px] border p-5 ${
        urgent ? "border-orange-150 bg-orange-100" : "border-hairline bg-surface-inset"
      }`}
    >
      <div className="flex items-start gap-2.5">
        {urgent ? (
          <IconAlertTriangle size={18} className="mt-0.5 shrink-0 text-orange-ink" />
        ) : (
          <IconCalendar size={18} className="mt-0.5 shrink-0 text-ink-2" />
        )}
        <p className={`text-[14.5px] leading-snug ${urgent ? "text-orange-ink" : "text-ink-2"}`}>
          <span className="font-extrabold">Renewal in {n} days.</span>{" "}
          {insideQuoteWindow ? (
            <>
              Carriers need about {QUOTE_DAYS} days to quote and switch. You are
              inside that window. Move now.
            </>
          ) : (
            <>
              Carriers need about {QUOTE_DAYS} days to quote and switch. Your
              window: {windowDays} days.
            </>
          )}
        </p>
      </div>

      <div className="mt-5 px-1">
        <div className="relative h-2 rounded-pill bg-grey-pill">
          {/* actionable window */}
          <div
            className={`absolute left-0 top-0 h-2 rounded-l-pill ${
              urgent ? "bg-orange" : "bg-success"
            }`}
            style={{ width: `${deadlinePct}%` }}
          />
          {/* carrier processing time */}
          <div
            className="absolute top-0 h-2 rounded-r-pill bg-ink/20"
            style={{ left: `${deadlinePct}%`, width: `${100 - deadlinePct}%` }}
          />
          {[
            { pct: 0, key: "today" },
            { pct: deadlinePct, key: "deadline" },
            { pct: 100, key: "renewal" },
          ].map((m) => (
            <span
              key={m.key}
              className="absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-pill border-2 border-white bg-ink shadow-[0_1px_4px_rgba(20,20,18,0.3)]"
              style={{ left: `${m.pct}%` }}
            />
          ))}
        </div>
        <div className="relative mt-2.5 h-9 text-[12px] leading-tight">
          <span className="absolute left-0 text-muted">
            <span className="block font-bold text-ink-2">Today</span>
            {shortDate(now)}
          </span>
          {!insideQuoteWindow && deadlinePct > 12 && deadlinePct < 88 && (
            <span
              className="absolute -translate-x-1/2 text-center text-muted"
              style={{ left: `${deadlinePct}%` }}
            >
              <span className={`block font-bold ${urgent ? "text-orange-ink" : "text-ink-2"}`}>
                Decision deadline
              </span>
              {shortDate(deadline)}
            </span>
          )}
          <span className="absolute right-0 text-right text-muted">
            <span className="block font-bold text-ink-2">Renewal</span>
            {shortDate(renewal)}
          </span>
        </div>
      </div>
    </div>
  );
}
