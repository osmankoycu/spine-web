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

  useEffect(() => {
    const root = rootRef.current;
    const countEl = countRef.current;
    if (!root || !countEl) return;

    if (prefersReducedMotion()) {
      countEl.textContent = String(aggregates.employeeCount);
      const t = window.setTimeout(() => doneRef.current(), 400);
      return () => window.clearTimeout(t);
    }

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
      root.querySelectorAll("[data-audit-bar]"),
      { scaleY: 0, transformOrigin: "50% 100%", duration: 0.45, stagger: 0.14 },
      0.5,
    );
    const tiles = root.querySelectorAll('[data-audit-tile="active"]');
    if (tiles.length > 0) {
      tl.from(
        tiles,
        { scale: 0, opacity: 0, duration: 0.3, ease: "back.out(2)", stagger: 0.06 },
        0.9,
      );
    }
    tl.from(
      root.querySelectorAll("[data-audit-summary]"),
      { opacity: 0, y: 10, duration: 0.4 },
      "-=0.1",
    );
    tl.to({}, { duration: 0.35 }); // beat before the flow advances

    return () => {
      tl.kill();
    };
    // Aggregates are set once per parse; the theater plays once per mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={rootRef} className="grid gap-6 sm:grid-cols-[1fr_auto] sm:gap-10">
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

        <div className="mt-6 flex h-[76px] items-end gap-2">
          {aggregates.ageBands.map((b) => (
            <div key={b.label} className="flex w-full max-w-[64px] flex-col items-center gap-1.5">
              <span className="text-[11px] font-bold text-ink-2 tabular-nums">{b.count}</span>
              <div
                data-audit-bar
                className="w-full rounded-t-[6px] bg-gradient-to-t from-orange-600 to-orange"
                style={{ height: `${Math.max(6, (b.count / maxBand) * 52)}px` }}
              />
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          {aggregates.ageBands.map((b) => (
            <span key={b.label} className="w-full max-w-[64px] text-center text-[10.5px] text-muted">
              {b.label}
            </span>
          ))}
        </div>

        <p data-audit-summary className="mt-5 text-[13.5px] leading-snug text-body-2">
          Average age {aggregates.avgAge}.{" "}
          {Object.keys(aggregates.states).length > 0 && (
            <>
              Team across {Object.keys(aggregates.states).length}{" "}
              {Object.keys(aggregates.states).length === 1 ? "state" : "states"}.{" "}
            </>
          )}
          {aggregates.skippedRows > 0 && (
            <span className="text-muted">
              {aggregates.skippedRows} {aggregates.skippedRows === 1 ? "row" : "rows"} skipped
              (no usable birth date).{" "}
            </span>
          )}
          <span className="font-semibold text-ink-2">Aggregates only. Names are never read.</span>
        </p>
      </div>

      <div className="w-full max-w-[300px] sm:w-[260px]">
        <TileMap active={aggregates.states} />
      </div>
    </div>
  );
}
