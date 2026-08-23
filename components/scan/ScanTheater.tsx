"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/reducedMotion";
import { SCAN_LINES } from "@/lib/scan/scanRules";

// The ~2s scan beat between the email gate and the report. Honest by design:
// the findings compute locally and instantly; this paces the reveal and
// narrates what the rules actually check. Bars pulse via CSS (frozen by the
// global reduced-motion rule); line rotation is a timer.

const BAR_WIDTHS = [76, 98, 120, 98, 76];

export function ScanTheater({ onDone }: { onDone: () => void }) {
  const lineRef = useRef<HTMLParagraphElement>(null);
  const doneRef = useRef(onDone);
  useEffect(() => {
    doneRef.current = onDone;
  });

  useEffect(() => {
    if (prefersReducedMotion()) {
      const t = window.setTimeout(() => doneRef.current(), 300);
      return () => window.clearTimeout(t);
    }
    let i = 0;
    const rotate = window.setInterval(() => {
      i += 1;
      if (lineRef.current && SCAN_LINES[i]) {
        lineRef.current.textContent = SCAN_LINES[i] + "...";
      }
      if (i >= SCAN_LINES.length - 1) window.clearInterval(rotate);
    }, 450);
    const finish = window.setTimeout(() => doneRef.current(), 2000);
    return () => {
      window.clearInterval(rotate);
      window.clearTimeout(finish);
    };
  }, []);

  return (
    <div className="py-10 text-center">
      <div className="mx-auto mb-7 flex w-fit flex-col items-center gap-1.5">
        {BAR_WIDTHS.map((w, i) => (
          <div
            key={i}
            className="h-2 animate-pulse rounded-pill bg-orange"
            style={{ width: `${w}px`, animationDelay: `${i * 120}ms` }}
          />
        ))}
      </div>
      <p className="text-[19px] font-extrabold tracking-[-0.01em] text-ink">
        Building your spine
      </p>
      <p ref={lineRef} className="mt-1 text-[13.5px] text-muted">
        {SCAN_LINES[0]}...
      </p>
    </div>
  );
}
