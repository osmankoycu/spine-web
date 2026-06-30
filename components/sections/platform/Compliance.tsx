import {
  Check,
  EnvelopeSimple,
  Heartbeat,
  MagnifyingGlass,
  MapTrifold,
  Pulse,
  UserPlus,
} from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/sections/Reveal";
import { ComplianceFeed } from "./ComplianceFeed";

// "02 · Compliance" pillar (design handoff: platform sections). Returns ONE padded
// block only — the parent supplies the white card + full-bleed dividers. A
// full-width product console (sidebar · live feed · right rail) over a 3-point
// coverage strip. The live feed is a client island (ComplianceFeed) that animates
// the Done rows in. Neutral hex + success green from the handoff; oranges/cobalt
// use our brand tokens.

const navItems = [
  { label: "Healthcare", icon: Heartbeat, count: 2 },
  { label: "Multi-state tax", icon: MapTrifold, count: 1 },
  { label: "Hiring", icon: UserPlus, count: 1 },
  { label: "Notices", icon: EnvelopeSimple, count: 1 },
];

const coverage = [
  {
    title: "Healthcare compliance, in full",
    sub: "ACA, ERISA, COBRA, Form 5500, plan docs",
  },
  {
    title: "Multi-state tax & hiring",
    sub: "Registration & filings across all 50 states",
  },
  {
    title: "Notice resolution",
    sub: "Every IRS, DOL & state letter, handled",
  },
];

export function Compliance() {
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
          AI monitors every jurisdiction, our in-house experts close every
          workflow end-to-end.
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
            <span className="text-[12px] text-[#b0afa9]">
              Search filings, notices, states…
            </span>
          </div>
          <div className="ml-auto flex items-center gap-2 rounded-full bg-[#eafaef] px-[11px] py-[5px] text-[11.5px] font-semibold text-[#2a8b3f]">
            <span className="h-[6px] w-[6px] rounded-full bg-[#2a8b3f]" />
            All current
          </div>
        </div>

        {/* Body grid */}
        <div className="grid lg:grid-cols-[200px_1fr_244px]">
          {/* Sidebar */}
          <div className="flex flex-col gap-3 border-b border-[#ededea] px-[14px] py-[18px] lg:gap-[3px] lg:border-b-0 lg:border-r">
            <div className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-[3px] lg:overflow-visible">
              <div className="flex shrink-0 items-center gap-[11px] rounded-[10px] bg-cobalt-400/[0.08] px-3 py-[10px]">
                <Pulse size={17} weight="fill" className="text-cobalt-400" />
                <span className="flex-1 whitespace-nowrap text-[13.5px] font-bold text-[#15140f]">
                  All activity
                </span>
                <span className="text-[11px] font-bold text-cobalt-400">5</span>
              </div>
              {navItems.map(({ label, icon: Icon, count }) => (
                <div
                  key={label}
                  className="flex shrink-0 items-center gap-[11px] rounded-[10px] px-3 py-[10px]"
                >
                  <Icon size={17} className="text-[#b0afa9]" />
                  <span className="flex-1 whitespace-nowrap text-[13.5px] text-[#6e6e68]">
                    {label}
                  </span>
                  <span className="text-[11px] text-[#b0afa9]">{count}</span>
                </div>
              ))}
            </div>
            <div className="mt-[14px] hidden rounded-[12px] border border-[#ececea] bg-[#fafaf9] px-3 py-[14px] lg:block">
              <div className="mb-2 text-[10.5px] font-bold uppercase tracking-[0.06em] text-[#b0afa9]">
                We monitor
              </div>
              <div className="text-[13px] font-bold text-[#15140f]">
                10,000+ jurisdictions
              </div>
              <div className="mt-[2px] text-[12px] text-[#86857e]">
                All 50 states · federal &amp; local
              </div>
            </div>
          </div>

          {/* Feed — client island, animates the Done rows in */}
          <ComplianceFeed />

          {/* Right rail */}
          <div className="flex flex-col gap-[14px] p-[18px]">
            <div className="rounded-[14px] border border-cobalt-200 bg-cobalt-400/[0.08] p-4">
              <div className="text-[11px] font-bold uppercase tracking-[0.06em] text-cobalt-400">
                Next deadline
              </div>
              <div className="mt-[6px] text-[15px] font-bold text-[#15140f]">
                ERISA SPD update
              </div>
              <div className="mt-[2px] text-[12px] text-[#86857e]">
                June 1 · 4 days
              </div>
              <div className="mt-3 h-[6px] overflow-hidden rounded-full bg-cobalt-100">
                <div className="h-full w-[70%] bg-cobalt-400" />
              </div>
            </div>
            <div className="rounded-[14px] border border-[#ececea] bg-[#fafaf9] p-4">
              <div className="mb-[14px] text-[11px] font-bold uppercase tracking-[0.06em] text-[#b0afa9]">
                This quarter
              </div>
              <div className="mb-3 flex items-baseline gap-2">
                <span className="text-[26px] font-extrabold tracking-[-0.02em] text-[#15140f]">
                  38
                </span>
                <span className="text-[12px] text-[#a9a9a3]">
                  filings completed
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-[26px] font-extrabold tracking-[-0.02em] text-[#2a8b3f]">
                  0
                </span>
                <span className="text-[12px] text-[#a9a9a3]">
                  deadlines missed
                </span>
              </div>
            </div>
          </div>
          </div>
        </div>
      </Reveal>

      {/* Coverage strip */}
      <div className="mt-7 grid gap-7 border-t border-[#ededea] pt-7 sm:grid-cols-3">
        {coverage.map((cell) => (
          <div key={cell.title} className="flex items-start gap-3">
            <span className="grid h-[26px] w-[26px] flex-none place-items-center rounded-full bg-cobalt-400/[0.08]">
              <Check size={12} weight="bold" className="text-cobalt-400" />
            </span>
            <div>
              <div className="text-[15px] font-bold text-[#15140f]">
                {cell.title}
              </div>
              <div className="mt-[3px] text-[13px] leading-[1.45] text-[#86857e]">
                {cell.sub}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
