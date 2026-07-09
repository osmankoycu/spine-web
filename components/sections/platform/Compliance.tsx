"use client";

import { useState } from "react";
import {
  Check,
  EnvelopeSimple,
  Heartbeat,
  MagnifyingGlass,
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

  return (
    <div className="px-6 py-12 sm:px-10 sm:py-14 lg:px-12 lg:py-14">
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
          <div className="flex flex-wrap items-center gap-x-[14px] gap-y-3 border-b border-[#ededea] px-5 py-[15px]">
            <div className="flex gap-[7px]">
              <span className="h-[11px] w-[11px] rounded-full bg-[#dcdbd6]" />
              <span className="h-[11px] w-[11px] rounded-full bg-[#dcdbd6]" />
              <span className="h-[11px] w-[11px] rounded-full bg-[#dcdbd6]" />
            </div>
            <div className="flex min-w-[220px] flex-1 items-center gap-2 rounded-lg border border-[#ececea] bg-[#fafaf9] px-3 py-[6px] sm:flex-none">
              <MagnifyingGlass size={13} className="text-[#b0afa9]" />
              <span className="text-[12px] text-[#b0afa9]">Search filings, notices, states…</span>
            </div>
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

            {/* Feed — remounts per category to replay the animation */}
            <ComplianceFeed key={cat.id} feed={cat.feed} />

            {/* Right rail */}
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
      <div className="mt-7 grid gap-2 border-t border-[#ededea] pt-7 sm:grid-cols-3">
        {CATEGORIES.map((c, i) => {
          const sel = i === selected;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelected(i)}
              aria-pressed={sel}
              className={cn(
                "flex cursor-pointer items-start gap-3 rounded-[14px] border px-4 py-3.5 text-left transition-colors",
                sel ? "border-cobalt-200 bg-cobalt-400/[0.06]" : "border-transparent hover:bg-[#f6f6f4]",
              )}
            >
              <span
                className={cn(
                  "grid h-[26px] w-[26px] flex-none place-items-center rounded-full transition-colors",
                  sel ? "bg-cobalt-400" : "bg-cobalt-400/[0.08]",
                )}
              >
                <Check size={12} weight="bold" className={sel ? "text-white" : "text-cobalt-400"} />
              </span>
              <div>
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
