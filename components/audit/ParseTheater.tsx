"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/reducedMotion";
import type { CensusAggregates } from "@/lib/audit/censusParse";
import { TileMap } from "./TileMap";

// The parse "wow moment". Parsing is instant; this paces the reveal to ~2.5s
// on purpose: headcount ticks up, the age histogram draws bar by bar, the map
// lights up state by state. Aggregates only — no names, no rows, no PII ever
// hits the screen. Reduced motion: everything appears at once.

export function ParseTheater({
  aggregates,
  onDone,
}: {
  aggregates: CensusAggregates;
  onDone: () => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const doneRef = useRef(onDone);
  useEffect(() => {
    doneRef.current = onDone;
  });

  const maxBand = Math.max(1, ...aggregates.ageBands.map((b) => b.count));
  // Biggest teams first: the sales read is "where are most of these people".
  const stateCounts = Object.entries(aggregates.states).sort((a, b) => b[1] - a[1]);

  useEffect(() => {
    const root = rootRef.current;
    const countEl = countRef.current;
    if (!root || !countEl) return;

    if (prefersReducedMotion()) {
      countEl.textContent = String(aggregates.employeeCount);
      const t = window.setTimeout(() => doneRef.current(), 400);
      return () => window.clearTimeout(t);
    }

    const bars = root.querySelectorAll("[data-audit-bar]");
    const tiles = root.querySelectorAll('[data-audit-tile="active"]');
    const summary = root.querySelectorAll("[data-audit-summary]");

    const proxy = { n: 0 };
    const tl = gsap.timeline({
      onComplete: () => doneRef.current(),
      defaults: { ease: "power2.out" },
    });
    tl.to(proxy, {
      n: aggregates.employeeCount,
      duration: 1.0,
      snap: { n: 1 },
      onUpdate: () => {
        countEl.textContent = String(proxy.n);
      },
    });
    tl.from(
      bars,
      { scaleY: 0, transformOrigin: "50% 100%", duration: 0.45, stagger: 0.14 },
      0.5,
    );
    if (tiles.length > 0) {
      tl.from(
        tiles,
        { scale: 0, opacity: 0, duration: 0.3, ease: "back.out(2)", stagger: 0.06 },
        0.9,
      );
    }
    tl.from(summary, { opacity: 0, y: 10, duration: 0.4 }, "-=0.1");
    tl.to({}, { duration: 0.35 }); // beat before the flow advances

    return () => {
      tl.kill();
      // A killed from() leaves its targets sitting at the start values, so the
      // dev double-mount would read 0 as the destination and pin the bars and
      // the lit-up states invisible. Clear ONLY what the timeline animated:
      // "all" would also wipe the inline styles React owns here, which are the
      // bars' heights and the tiles' grid placement.
      gsap.set([...bars, ...tiles, ...summary], {
        clearProps: "opacity,transform,transformOrigin",
      });
    };
    // Aggregates are set once per parse; the theater plays once per mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={rootRef} className="grid gap-8 sm:grid-cols-[1fr_auto] sm:gap-12">
      <div>
        <div className="flex items-baseline gap-2.5">
          <span
            ref={countRef}
            className="text-[44px] font-extrabold leading-none tracking-[-0.03em] text-ink"
          >
            0
          </span>
          <span className="text-[15px] font-medium text-body-2">employees found</span>
        </div>

        {/* Age distribution. Bars sit on a common baseline and the count and
            band label live in their own fixed rows underneath, so the figures
            line up instead of stepping with each bar's height. */}
        <div className="mt-7">
          <div className="text-[11.5px] font-extrabold uppercase tracking-[0.12em] text-muted">
            Age distribution
          </div>
          <div className="mt-4 grid grid-cols-5 gap-2 sm:gap-3">
            {aggregates.ageBands.map((b) => (
              <div key={b.label} className="flex flex-col items-center">
                <div className="flex h-[110px] w-full items-end">
                  <div
                    data-audit-bar
                    className="w-full rounded-t-[8px] bg-gradient-to-t from-orange-600 to-orange"
                    style={{ height: `${Math.max(4, (b.count / maxBand) * 110)}px` }}
                  />
                </div>
                <span className="mt-2.5 text-[16px] font-extrabold leading-none text-ink">
                  {b.count}
                </span>
                <span className="mt-1 text-[11.5px] text-muted">{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        <p data-audit-summary className="mt-6 text-[13.5px] leading-snug text-body-2">
          Average age {aggregates.avgAge}.{" "}
          {aggregates.skippedRows > 0 && (
            <span className="text-muted">
              {aggregates.skippedRows} {aggregates.skippedRows === 1 ? "row" : "rows"} skipped
              (no usable birth date).{" "}
            </span>
          )}
          <span className="font-semibold text-ink-2">Aggregates only. Names are never read.</span>
        </p>
      </div>

      <div className="w-full sm:w-[360px]">
        <div className="text-[11.5px] font-extrabold uppercase tracking-[0.12em] text-muted">
          Where they work
        </div>
        <div className="mt-4">
          <TileMap active={aggregates.states} />
        </div>
        {stateCounts.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5 text-[12.5px]">
            {stateCounts.map(([code, n]) => (
              <span key={code} className="text-ink-2">
                <span className="font-extrabold">{code}</span>
                <span className="text-muted"> ×{n}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
