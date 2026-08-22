"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/reducedMotion";
import { BENCHMARK_BAND } from "@/lib/audit/rates";

// Results gauge: your spend vs. the market band, $/employee/mo. The market
// band sits on a fixed track; the needle lands where the current spend falls —
// inside the band when well-priced, out in the tinted overpaying zone when
// not. The needle tweens on every input change (the invoice tightener moves
// it live).

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

export function SpendGauge({
  expectedPEPM,
  currentPEPM,
  wellPriced,
}: {
  expectedPEPM: number;
  currentPEPM: number;
  wellPriced: boolean;
}) {
  const needleRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const proxyRef = useRef<{ pepm: number } | null>(null);

  const bandLow = expectedPEPM * (1 - BENCHMARK_BAND);
  const bandHigh = expectedPEPM * (1 + BENCHMARK_BAND);
  // Domain wide enough that band and needle always fit with margin.
  const domainLow = Math.min(bandLow, currentPEPM) * 0.82;
  const domainHigh = Math.max(bandHigh, currentPEPM) * 1.12;
  const pct = (v: number) =>
    Math.min(99, Math.max(1, ((v - domainLow) / (domainHigh - domainLow)) * 100));

  const bandLeft = pct(bandLow);
  const bandWidth = pct(bandHigh) - bandLeft;
  // Needle clamped a little tighter than the track so its label can't spill
  // past the card edge on a 375px viewport. Directional, not a scale reading.
  const needlePct = Math.min(90, Math.max(10, pct(currentPEPM)));

  useEffect(() => {
    const needle = needleRef.current;
    const label = labelRef.current;
    if (!needle || !label) return;
    if (proxyRef.current === null) proxyRef.current = { pepm: currentPEPM };
    const proxy = proxyRef.current;
    const write = () => {
      label.textContent = usd(proxy.pepm);
    };
    if (prefersReducedMotion()) {
      proxy.pepm = currentPEPM;
      write();
      gsap.set(needle, { left: `${needlePct}%` });
      return;
    }
    gsap.to(needle, {
      left: `${needlePct}%`,
      duration: 0.8,
      ease: "back.out(1.1)",
      overwrite: "auto",
    });
    gsap.to(proxy, {
      pepm: currentPEPM,
      duration: 0.8,
      ease: "expo.out",
      overwrite: "auto",
      onUpdate: write,
    });
  }, [currentPEPM, needlePct]);

  return (
    <div>
      <div className="relative pt-9">
        {/* needle + its label ride together */}
        <div
          ref={needleRef}
          className="absolute top-0 z-10 -translate-x-1/2"
          style={{ left: `${needlePct}%` }}
        >
          <div className="flex flex-col items-center">
            <span
              className={`whitespace-nowrap rounded-pill px-2 py-0.5 text-[11px] font-extrabold text-white sm:px-2.5 sm:py-1 sm:text-[12px] ${
                wellPriced ? "bg-success" : "bg-ink"
              }`}
            >
              You: <span ref={labelRef}>{usd(currentPEPM)}</span>
            </span>
            <span
              className={`h-4 w-0.5 ${wellPriced ? "bg-success" : "bg-ink"}`}
            />
          </div>
        </div>

        <div className="relative h-4 overflow-hidden rounded-pill bg-grey-pill">
          {/* overpaying zone: everything beyond the market band */}
          <div
            className="absolute top-0 h-4 bg-orange-100"
            style={{ left: `${bandLeft + bandWidth}%`, right: 0 }}
          />
          {/* the market band */}
          <div
            className="absolute top-0 h-4 rounded-pill border border-success/40 bg-success-tint"
            style={{ left: `${bandLeft}%`, width: `${bandWidth}%` }}
          />
        </div>
      </div>
      <div className="mt-2 flex items-baseline justify-between gap-3 text-[12px]">
        <span className="font-semibold text-success">
          market range {usd(bandLow)}–{usd(bandHigh)}
        </span>
        <span className="text-muted">overpaying zone →</span>
      </div>
      <p className="mt-1 text-[12px] text-muted">Per employee, per month.</p>
    </div>
  );
}
