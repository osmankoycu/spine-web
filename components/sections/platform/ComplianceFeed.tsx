"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowsClockwise, Check, Warning } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";

// The compliance console's live feed. When the console scrolls into view (and
// after it has revealed) the rows that end up "Done" start in a processing state
// (grey ↻ + "Filing…") and flip one-by-one to a green ✓ + "Done" — the side
// status word swaps with it. Active / queued rows stay put.
type Tone = "done" | "active" | "queued";
type Row = { title: string; sub: string; tone: Tone; status: string; pending?: string };

const FEED: Row[] = [
  { title: "ACA 1095-C forms filed", sub: "47 employees · IRS confirmed", tone: "done", status: "Done", pending: "Filing…" },
  { title: "TX SUI registration", sub: "New hire in Austin · auto-filed in 3 days", tone: "done", status: "Done", pending: "Filing…" },
  { title: "DOL notice · ERISA SPD update", sub: "Due 06/01 · AI drafting", tone: "active", status: "Active" },
  { title: "Form 5500 prep · plan year 2026", sub: "Auto-file scheduled 07/15", tone: "queued", status: "Queued" },
  { title: "COBRA election notice", sub: "2 separations · sent, 14 days remaining", tone: "done", status: "Done", pending: "Sending…" },
];

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

function FeedRow({ row, last, flipped }: { row: Row; last: boolean; flipped: boolean }) {
  const isDone = row.tone === "done";
  const showDone = !isDone || flipped; // active/queued render their static state

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

export function ComplianceFeed() {
  const ref = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState<boolean[]>(() => FEED.map(() => false));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFlipped(FEED.map(() => true));
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();
        const doneIdx = FEED.map((r, i) => (r.tone === "done" ? i : -1)).filter((i) => i >= 0);
        doneIdx.forEach((idx, k) => {
          timers.push(
            setTimeout(() => {
              setFlipped((prev) => {
                const next = [...prev];
                next[idx] = true;
                return next;
              });
            }, 700 + k * 450), // let the panel reveal first, then tick rows to Done
          );
        });
      },
      { threshold: 0, rootMargin: "-30% 0px -30% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="border-b border-[#ededea] bg-[#fcfcfb] px-[22px] py-[18px] md:border-b-0 md:border-r"
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#b0afa9]">
          Live feed
        </span>
        <span className="text-[11.5px] text-[#b0afa9]">This month</span>
      </div>
      {FEED.map((row, i) => (
        <FeedRow key={row.title} row={row} last={i === FEED.length - 1} flipped={flipped[i]} />
      ))}
    </div>
  );
}
