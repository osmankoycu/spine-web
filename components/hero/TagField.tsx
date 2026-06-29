"use client";

import { cn } from "@/lib/cn";

// One unified tag field (Section 6): a single grid of flex rows that fills the
// hero. Every cell is a pill on the SAME row flow, so labels and filler align and
// never overlap. The rows array is built by <Hero> (which owns the fit scale):
// the central cells carry the curated text labels, every other cell is empty
// "filler" texture of random width. All pills are [data-tag] → one TagFlow field.
export type Cell =
  | { filler: true; w: number }
  | { filler: false; label: string; important: boolean };

export function TagField({
  rows,
  pillH,
  className,
}: {
  rows: Cell[][];
  pillH: number;
  className?: string;
}) {
  return (
    <div aria-hidden className={cn("flex flex-col items-center gap-y-[18px]", className)}>
      {rows.map((row, r) => (
        <div key={r} className="flex shrink-0 items-center justify-center gap-x-[22px]">
          {row.map((cell, c) =>
            cell.filler ? (
              <span
                key={c}
                data-tag
                data-filler
                style={{ width: cell.w, height: pillH }}
                className="box-border shrink-0 rounded-pill bg-grey-pill will-change-transform select-none"
              />
            ) : (
              <span
                key={c}
                data-tag
                data-important={cell.important || undefined}
                className={cn(
                  // Figma: every pill shares the same #e1e5ea bg; only the TEXT
                  // colour distinguishes them — important = black, normal = ghost.
                  "relative box-border flex shrink-0 items-center justify-center whitespace-nowrap rounded-pill bg-grey-pill px-[30px] py-[21px] text-[24px] font-medium leading-[39.42px] tracking-[-0.27px] will-change-transform select-none",
                  cell.important ? "text-black" : "text-bg",
                )}
              >
                {cell.label}
              </span>
            ),
          )}
        </div>
      ))}
    </div>
  );
}
