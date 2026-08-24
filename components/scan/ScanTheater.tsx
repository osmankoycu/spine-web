"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/reducedMotion";
import { SCAN_LINES } from "@/lib/scan/scanRules";

// The ~2s scan beat between the email gate and the report. Honest by design:
// the findings compute locally and instantly; this paces the reveal and
// narrates what the rules actually check.

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
      {/* Plain ring spinner: the beat is short and the status line carries the
          meaning, so the visual just needs to say "working". Frozen under the
          global reduced-motion rule, which is the right resting state. */}
      <span className="mx-auto mb-6 block size-9 animate-spin rounded-full border-[3px] border-grey-pill border-t-orange" />
      <p className="text-[19px] font-extrabold tracking-[-0.01em] text-ink">
        Building your spine
      </p>
      <p ref={lineRef} className="mt-1 text-[13.5px] text-muted">
        {SCAN_LINES[0]}...
      </p>
    </div>
  );
}
