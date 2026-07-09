"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowsClockwise, Check, Warning } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";

// The compliance console's live feed. When it scrolls into view (or is remounted
// on a category switch), the rows that end up "Done" start in a processing state
// (grey ↻ + "Filing…") and flip one-by-one to a green ✓ + "Done". Active / queued
// rows stay put. The parent (Compliance) remounts this via `key` per category, so
// switching categories replays the animation with the new feed.
export type Tone = "done" | "active" | "queued";
export type FeedRow = {
  title: string;
  sub: string;
  tone: Tone;
  status: string;
  pending?: string;
};

const CHIP: Record<Tone | "pending", string> = {
  done: "bg-[#eafaef] text-[#2a8b3f]",
  active: "bg-cobalt-400/[0.08] text-cobalt-400",
  queued: "bg-[#f2f2ef] text-[#b0afa9]",
  pending: "bg-[#f2f2ef] text-[#b0afa9]",
};
const STATUS: Record<Tone | "pending", string> = {
  done: "text-[#2a8b3f]",
  active: "text-cobalt-400",
  queued: "text-[#a9a9a3]",
  pending: "text-[#a9a9a3]",
};

function Row({ row, last, flipped }: { row: FeedRow; last: boolean; flipped: boolean }) {
  const isDone = row.tone === "done";

  return (
    <div className={cn("flex items-center gap-[13px] py-[14px]", !last && "border-b border-[#ededea]")}>
      {/* status chip */}
      <span
        className={cn(
          "grid h-[30px] w-[30px] flex-none place-items-center rounded-[9px] transition-colors duration-500",
          isDone ? (flipped ? CHIP.done : CHIP.pending) : CHIP[row.tone],
        )}
      >
        {isDone ? (
          <>
            <ArrowsClockwise
              size={14}
              weight="bold"
              className={cn("[grid-area:1/1] transition-all duration-300", flipped ? "scale-50 opacity-0" : "opacity-100")}
            />
            <Check
              size={14}
              weight="bold"
              className={cn(
                "[grid-area:1/1] transition-all duration-[450ms] ease-[cubic-bezier(0.34,1.7,0.5,1)]",
                flipped ? "opacity-100" : "scale-50 opacity-0",
              )}
            />
          </>
        ) : row.tone === "active" ? (
          <Warning size={14} weight="bold" />
        ) : (
          <ArrowsClockwise size={14} weight="bold" />
        )}
      </span>

      <div className="flex-1">
        <div className="text-[13.5px] font-semibold text-[#2e2d28]">{row.title}</div>
        <div className={cn("mt-[2px] text-[11.5px]", row.tone === "active" ? "text-cobalt-400" : "text-[#a9a9a3]")}>
          {row.sub}
        </div>
      </div>

      {/* status word */}
      {isDone ? (
        <span className="grid flex-none justify-items-end text-[11px] font-semibold">
          <span className={cn("[grid-area:1/1] transition-opacity duration-300", STATUS.pending, flipped ? "opacity-0" : "opacity-100")}>
            {row.pending}
          </span>
          <span className={cn("[grid-area:1/1] transition-opacity duration-300", STATUS.done, flipped ? "opacity-100" : "opacity-0")}>
            {row.status}
          </span>
        </span>
      ) : (
        <span className={cn("flex-none text-[11px] font-semibold", STATUS[row.tone])}>{row.status}</span>
      )}
    </div>
  );
}

export function ComplianceFeed({ feed }: { feed: FeedRow[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState<boolean[]>(() => feed.map(() => false));

  // Animate the Done rows in whenever this mounts and is on screen. The parent
  // remounts it (key) on each category switch, so the processing→Done animation
  // replays every time the user picks a category.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFlipped(feed.map(() => true));
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();
        const doneIdx = feed.map((r, i) => (r.tone === "done" ? i : -1)).filter((i) => i >= 0);
        doneIdx.forEach((idx, k) => {
          timers.push(
            setTimeout(() => {
              setFlipped((prev) => {
                const next = [...prev];
                next[idx] = true;
                return next;
              });
            }, 600 + k * 450),
          );
        });
      },
      { threshold: 0, rootMargin: "-15% 0px -15% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={ref} className="h-full animate-[fadeIn_0.4s_ease-out] px-[22px] py-[18px]">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#b0afa9]">Live feed</span>
        <span className="text-[11.5px] text-[#b0afa9]">This month</span>
      </div>
      {/* Rows update IN PLACE (index keys → same DOM nodes reused). All three
          categories share the same tone pattern (done·done·active·queued·done),
          so a switch only swaps text — no remount, no flicker. */}
      {feed.map((row, i) => (
        <Row key={i} row={row} last={i === feed.length - 1} flipped={flipped[i] ?? false} />
      ))}
    </div>
  );
}
