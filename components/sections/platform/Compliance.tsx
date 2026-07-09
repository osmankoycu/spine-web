"use client";

import { useEffect, useRef, useState } from "react";
import {
  Check,
  EnvelopeSimple,
  Heartbeat,
  MapTrifold,
  Pulse,
  UserPlus,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/sections/Reveal";
import { ComplianceFeed, type FeedRow } from "./ComplianceFeed";

// "02 · Compliance" pillar. A full-width product console (sidebar · live feed ·
// right rail) whose content is driven by the 3-point coverage selector below it.
// Pick a coverage item → its sidebar entry lights up and the feed + right rail
// swap to that category. Healthcare is selected by default.

type Category = {
  id: string;
  title: string;
  sub: string;
  nav: string; // which sidebar item lights up
  status: string; // top-right pill
  feed: FeedRow[];
  deadline: { label: string; when: string; progress: number };
  quarter: { big: string; bigLabel: string; small: string; smallLabel: string };
};

const CATEGORIES: Category[] = [
  {
    id: "healthcare",
    title: "Healthcare compliance, in full",
    sub: "ACA, ERISA, COBRA, Form 5500, plan docs",
    nav: "Healthcare",
    status: "All current",
    feed: [
      { title: "ACA 1095-C forms filed", sub: "47 employees · IRS confirmed", tone: "done", status: "Done", pending: "Filing…" },
      { title: "ERISA SPD updated · 2026 plan year", sub: "Distributed to employees", tone: "done", status: "Done", pending: "Updating…" },
      { title: "DOL notice · ERISA SPD update", sub: "Due 06/01 · AI drafting", tone: "active", status: "Active" },
      { title: "Form 5500 prep · plan year 2026", sub: "Auto-file scheduled 07/15", tone: "queued", status: "Queued" },
      { title: "COBRA election notice", sub: "2 separations · sent, 14 days remaining", tone: "done", status: "Done", pending: "Sending…" },
    ],
    deadline: { label: "ERISA SPD update", when: "June 1 · 4 days", progress: 70 },
    quarter: { big: "38", bigLabel: "filings completed", small: "0", smallLabel: "deadlines missed" },
  },
  {
    id: "multistate",
    title: "Multi-state tax & hiring",
    sub: "Registration & filings across all 50 states",
    nav: "Multi-state tax",
    status: "12 states active",
    feed: [
      { title: "TX SUI registration", sub: "New hire in Austin · auto-filed in 3 days", tone: "done", status: "Done", pending: "Filing…" },
      { title: "CA PIT withholding", sub: "Active for 14 employees", tone: "done", status: "Done", pending: "Setting up…" },
      { title: "MA PFML setup", sub: "In progress · ETA 5 business days", tone: "active", status: "Active" },
      { title: "New-hire reporting · NY", sub: "Auto-file within 20-day window", tone: "queued", status: "Queued" },
      { title: "Q1 SUI filings · all states", sub: "Submitted · no errors", tone: "done", status: "Done", pending: "Filing…" },
    ],
    deadline: { label: "MA PFML registration", when: "June 8 · 6 days", progress: 55 },
    quarter: { big: "24", bigLabel: "registrations filed", small: "0", smallLabel: "late penalties" },
  },
  {
    id: "notices",
    title: "Notice resolution",
    sub: "Every IRS, DOL & state letter, handled",
    nav: "Notices",
    status: "All resolved",
    feed: [
      { title: "IRS CP-180 · ACA reconciliation", sub: "Resolved · no balance due", tone: "done", status: "Done", pending: "Resolving…" },
      { title: "CA EDD SUI rate notice", sub: "Updated rate applied", tone: "done", status: "Done", pending: "Applying…" },
      { title: "DOL request · ERISA SPD review", sub: "AI drafted · expert reviewing", tone: "active", status: "Active" },
      { title: "NY DOL inquiry · PFML contributions", sub: "Response drafted · sending today", tone: "queued", status: "Queued" },
      { title: "MA DUA wage report request", sub: "Documents submitted", tone: "done", status: "Done", pending: "Submitting…" },
    ],
    deadline: { label: "DOL response · ERISA", when: "June 3 · 3 days", progress: 80 },
    quarter: { big: "16", bigLabel: "notices resolved", small: "0", smallLabel: "penalties paid" },
  },
];

// Selected-item shape: a rounded rectangle whose top edge rises to a rounded
// central peak (points up at the console). clip-path polygon can't round corners,
// so we build a path() with quadratic-rounded corners, measured in real pixels
// (responsive via a ResizeObserver) to avoid the distortion an SVG stretch causes.
function roundedPolyPath(points: [number, number][], radii: number[]) {
  const n = points.length;
  const len = (a: [number, number], b: [number, number]) => Math.hypot(a[0] - b[0], a[1] - b[1]) || 1;
  let d = "";
  for (let i = 0; i < n; i++) {
    const V = points[i];
    const A = points[(i - 1 + n) % n];
    const B = points[(i + 1) % n];
    const r = Math.min(radii[i], len(V, A) / 2, len(V, B) / 2);
    const la = len(V, A);
    const lb = len(V, B);
    const P1: [number, number] = [V[0] + ((A[0] - V[0]) / la) * r, V[1] + ((A[1] - V[1]) / la) * r];
    const P2: [number, number] = [V[0] + ((B[0] - V[0]) / lb) * r, V[1] + ((B[1] - V[1]) / lb) * r];
    d += `${i === 0 ? "M" : "L"} ${P1[0].toFixed(2)} ${P1[1].toFixed(2)} `;
    d += `Q ${V[0].toFixed(2)} ${V[1].toFixed(2)} ${P2[0].toFixed(2)} ${P2[1].toFixed(2)} `;
  }
  return `${d}Z`;
}

function peakClip(w: number, h: number) {
  const r = 14; // side / bottom corner radius
  const pr = 15; // peak tip radius (larger = softer tip)
  const p = 22; // peak height (top-corner line) — lower = less sharp
  const pts: [number, number][] = [
    [0, p], // top-left (slope ↔ left side)
    [w / 2, 0], // peak tip
    [w, p], // top-right
    [w, h], // bottom-right
    [0, h], // bottom-left
  ];
  return `path('${roundedPolyPath(pts, [r, pr, r, r, r])}')`;
}

const NAV: { label: string; icon: Icon; count: string }[] = [
  { label: "All activity", icon: Pulse, count: "5" },
  { label: "Healthcare", icon: Heartbeat, count: "2" },
  { label: "Multi-state tax", icon: MapTrifold, count: "1" },
  { label: "Hiring", icon: UserPlus, count: "1" },
  { label: "Notices", icon: EnvelopeSimple, count: "1" },
];

export function Compliance() {
  const [selected, setSelected] = useState(0);
  const cat = CATEGORIES[selected];

  // Auto-advance through the categories every 5s while the section is in view.
  // Any manual selection cancels it for good (setAuto(false)).
  // DISABLED for now — user selects manually. Flip the initial state to `true`
  // to re-enable auto-advance later (all the plumbing below stays in place).
  const [auto, setAuto] = useState(false);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver((e) => setInView(e[0]?.isIntersecting ?? false), {
      threshold: 0,
      rootMargin: "-20% 0px -20% 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto || !inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setSelected((s) => (s + 1) % CATEGORIES.length), 5000);
    return () => clearInterval(id);
  }, [auto, inView]);

  const pick = (i: number) => {
    setAuto(false);
    setSelected(i);
  };

  // Measure an item and build the peaked clip-path. All three items are the same
  // size (equal grid columns + matching padding), so one measurement drives the
  // shape for every item — the selected one (cobalt) and any hovered one (grey).
  const measureRef = useRef<HTMLButtonElement>(null);
  const [clip, setClip] = useState<string>();
  useEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    const update = () => setClip(peakClip(el.offsetWidth, el.offsetHeight));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="px-6 py-12 sm:px-10 sm:py-14 lg:px-12 lg:py-14">
      {/* Header */}
      <div className="mb-8">
        <span className="inline-flex items-center rounded-full bg-orange/10 px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.16em] text-orange">
          02 · Compliance
        </span>
        <h2 className="font-display mt-[22px] text-[34px] font-extrabold leading-[1.02] tracking-[-0.03em] text-[#15140f] sm:text-[40px] lg:text-[44px]">
          Every filing, every deadline. <span className="text-orange">Done.</span>
        </h2>
        <p className="mt-3 text-[16px] leading-[1.55] text-[#7c7c77]">
          AI monitors every jurisdiction, our in-house experts close every workflow end-to-end.
        </p>
      </div>

      {/* Console */}
      <Reveal>
        <div className="overflow-hidden rounded-[20px] border border-[#ececea] bg-white shadow-[0_30px_60px_-40px_rgba(20,20,18,0.28)]">
          {/* Top bar */}
          <div className="flex items-center gap-3.5 border-b border-[#ededea] px-5 py-[11px]">
            <div className="flex gap-[7px]">
              <span className="h-[11px] w-[11px] rounded-full bg-[#dcdbd6]" />
              <span className="h-[11px] w-[11px] rounded-full bg-[#dcdbd6]" />
              <span className="h-[11px] w-[11px] rounded-full bg-[#dcdbd6]" />
            </div>
            <span className="text-[11px] tracking-[0.06em] text-[#a9a9a3]">
              spine · HR dashboard
            </span>
            <div className="ml-auto flex items-center gap-2 rounded-full bg-[#eafaef] px-[11px] py-[5px] text-[11.5px] font-semibold text-[#2a8b3f]">
              <span className="h-[6px] w-[6px] rounded-full bg-[#2a8b3f]" />
              {cat.status}
            </div>
          </div>

          {/* Body grid */}
          <div className="grid lg:grid-cols-[200px_1fr_244px]">
            {/* Sidebar */}
            <div className="flex flex-col gap-3 border-b border-[#ededea] px-[14px] py-[18px] lg:gap-[3px] lg:border-b-0 lg:border-r">
              <div className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-[3px] lg:overflow-visible">
                {NAV.map(({ label, icon: Icon, count }) => {
                  const active = label === cat.nav;
                  return (
                    <div
                      key={label}
                      className={cn(
                        "flex shrink-0 items-center gap-[11px] rounded-[10px] px-3 py-[10px] transition-colors",
                        active && "bg-cobalt-400/[0.08]",
                      )}
                    >
                      <Icon
                        size={17}
                        weight={active ? "fill" : "regular"}
                        className={active ? "text-cobalt-400" : "text-[#b0afa9]"}
                      />
                      <span
                        className={cn(
                          "flex-1 whitespace-nowrap text-[13.5px]",
                          active ? "font-bold text-[#15140f]" : "text-[#6e6e68]",
                        )}
                      >
                        {label}
                      </span>
                      <span className={cn("text-[11px]", active ? "font-bold text-cobalt-400" : "text-[#b0afa9]")}>
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-[14px] hidden rounded-[12px] border border-[#ececea] bg-[#fafaf9] px-3 py-[14px] lg:block">
                <div className="mb-2 text-[10.5px] font-bold uppercase tracking-[0.06em] text-[#b0afa9]">
                  We monitor
                </div>
                <div className="text-[13px] font-bold text-[#15140f]">10,000+ jurisdictions</div>
                <div className="mt-[2px] text-[12px] text-[#86857e]">All 50 states · federal &amp; local</div>
              </div>
            </div>

            {/* Feed — the cell keeps a stable background/border; ComplianceFeed
                remounts per category (key) so the content fades in and the
                processing→Done animation replays on each pick. */}
            <div className="border-b border-[#ededea] bg-[#fcfcfb] lg:border-b-0 lg:border-r">
              <ComplianceFeed key={cat.id} feed={cat.feed} />
            </div>

            {/* Right rail — updates in place (progress bar transitions its width) */}
            <div className="flex flex-col gap-[14px] p-[18px]">
              <div className="rounded-[14px] border border-cobalt-200 bg-cobalt-400/[0.08] p-4">
                <div className="text-[11px] font-bold uppercase tracking-[0.06em] text-cobalt-400">
                  Next deadline
                </div>
                <div className="mt-[6px] text-[15px] font-bold text-[#15140f]">{cat.deadline.label}</div>
                <div className="mt-[2px] text-[12px] text-[#86857e]">{cat.deadline.when}</div>
                <div className="mt-3 h-[6px] overflow-hidden rounded-full bg-cobalt-100">
                  <div
                    className="h-full bg-cobalt-400 transition-[width] duration-500"
                    style={{ width: `${cat.deadline.progress}%` }}
                  />
                </div>
              </div>
              <div className="rounded-[14px] border border-[#ececea] bg-[#fafaf9] p-4">
                <div className="mb-[14px] text-[11px] font-bold uppercase tracking-[0.06em] text-[#b0afa9]">
                  This quarter
                </div>
                <div className="mb-3 flex items-baseline gap-2">
                  <span className="text-[26px] font-extrabold tracking-[-0.02em] text-[#15140f]">
                    {cat.quarter.big}
                  </span>
                  <span className="text-[12px] text-[#a9a9a3]">{cat.quarter.bigLabel}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[26px] font-extrabold tracking-[-0.02em] text-[#2a8b3f]">
                    {cat.quarter.small}
                  </span>
                  <span className="text-[12px] text-[#a9a9a3]">{cat.quarter.smallLabel}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Coverage selector — drives the console above */}
      <div className="mt-8 grid gap-2 sm:grid-cols-3">
        {CATEGORIES.map((c, i) => {
          const sel = i === selected;
          return (
            <button
              key={c.id}
              ref={i === 0 ? measureRef : undefined}
              type="button"
              onClick={() => pick(i)}
              aria-pressed={sel}
              className="group relative flex cursor-pointer items-start gap-3 px-4 pb-[18px] pt-[42px] text-left"
            >
              {/* peaked shape as a background layer (content on top, so it isn't
                  clipped — that was causing hover flicker). Selected fills it
                  cobalt; a hovered item fills it grey. */}
              <span
                aria-hidden
                // Always grey; we transition OPACITY (not colour) on a GPU layer
                // (translateZ(0)). Opacity on a composited layer is pure
                // compositing — no repaint/re-clip — so fast hover in/out that
                // interrupts the transition stays smooth (no flip).
                style={{ clipPath: clip, transform: "translateZ(0)" }}
                className={cn(
                  "pointer-events-none absolute inset-0 rounded-[14px] bg-[#f1f2f4] opacity-0 transition-opacity duration-200",
                  sel ? "opacity-100" : "group-hover:opacity-100",
                )}
              />
              <span
                className={cn(
                  "relative grid h-[26px] w-[26px] flex-none place-items-center rounded-full transition-colors",
                  sel ? "bg-cobalt-400" : "bg-cobalt-400/[0.08]",
                )}
              >
                <Check size={12} weight="bold" className={sel ? "text-white" : "text-cobalt-400"} />
              </span>
              <div className="relative">
                <div className="text-[15px] font-bold text-[#15140f]">{c.title}</div>
                <div className="mt-[3px] text-[13px] leading-[1.45] text-[#86857e]">{c.sub}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
