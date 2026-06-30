import {
  ArrowsClockwise,
  Check,
  EnvelopeSimple,
  Heartbeat,
  MagnifyingGlass,
  MapTrifold,
  Pulse,
  UserPlus,
  Warning,
} from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";

// "02 · Compliance" pillar (design handoff: platform sections). Returns ONE padded
// block only — the parent supplies the white card + full-bleed dividers. A
// full-width product console (sidebar · live feed · right rail) over a 3-point
// coverage strip. Neutral hex + success green are from the handoff; oranges use
// our brand token (text-orange / bg-orange), tint = bg-orange/[0.07].

type Tone = "done" | "active" | "queued";

const navItems = [
  { label: "Healthcare", icon: Heartbeat, count: 2 },
  { label: "Multi-state tax", icon: MapTrifold, count: 1 },
  { label: "Hiring", icon: UserPlus, count: 1 },
  { label: "Notices", icon: EnvelopeSimple, count: 1 },
];

const feed: { title: string; sub: string; status: string; tone: Tone }[] = [
  {
    title: "ACA 1095-C forms filed",
    sub: "47 employees · IRS confirmed",
    status: "Done",
    tone: "done",
  },
  {
    title: "TX SUI registration",
    sub: "New hire in Austin · auto-filed in 3 days",
    status: "Done",
    tone: "done",
  },
  {
    title: "DOL notice · ERISA SPD update",
    sub: "Due 06/01 · AI drafting",
    status: "Active",
    tone: "active",
  },
  {
    title: "Form 5500 prep · plan year 2026",
    sub: "Auto-file scheduled 07/15",
    status: "Queued",
    tone: "queued",
  },
  {
    title: "COBRA election notice",
    sub: "2 separations · sent, 14 days remaining",
    status: "Done",
    tone: "done",
  },
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

const toneChip: Record<Tone, string> = {
  done: "bg-[#eafaef] text-[#2a8b3f]",
  active: "bg-cobalt-400/[0.08] text-cobalt-400",
  queued: "bg-[#f2f2ef] text-[#b0afa9]",
};

const toneStatus: Record<Tone, string> = {
  done: "text-[#2a8b3f]",
  active: "text-cobalt-400",
  queued: "text-[#a9a9a3]",
};

const toneIcon: Record<Tone, typeof Check> = {
  done: Check,
  active: Warning,
  queued: ArrowsClockwise,
};

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
        <div className="grid md:grid-cols-[200px_1fr_244px]">
          {/* Sidebar */}
          <div className="flex flex-col gap-3 border-b border-[#ededea] px-[14px] py-[18px] md:gap-[3px] md:border-b-0 md:border-r">
            <div className="flex gap-2 overflow-x-auto md:flex-col md:gap-[3px] md:overflow-visible">
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
            <div className="mt-[14px] hidden rounded-[12px] border border-[#ececea] bg-[#fafaf9] px-3 py-[14px] md:block">
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

          {/* Feed */}
          <div className="border-b border-[#ededea] bg-[#fcfcfb] px-[22px] py-[18px] md:border-b-0 md:border-r">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#b0afa9]">
                Live feed
              </span>
              <span className="text-[11.5px] text-[#b0afa9]">This month</span>
            </div>
            {feed.map((row, i) => {
              const ChipIcon = toneIcon[row.tone];
              return (
                <div
                  key={row.title}
                  className={cn(
                    "flex items-center gap-[13px] py-[14px]",
                    i < feed.length - 1 && "border-b border-[#ededea]",
                  )}
                >
                  <span
                    className={cn(
                      "grid h-[30px] w-[30px] flex-none place-items-center rounded-[9px]",
                      toneChip[row.tone],
                    )}
                  >
                    <ChipIcon size={14} weight="bold" />
                  </span>
                  <div className="flex-1">
                    <div className="text-[13.5px] font-semibold text-[#2e2d28]">
                      {row.title}
                    </div>
                    <div
                      className={cn(
                        "mt-[2px] text-[11.5px]",
                        row.tone === "active" ? "text-cobalt-400" : "text-[#a9a9a3]",
                      )}
                    >
                      {row.sub}
                    </div>
                  </div>
                  <span
                    className={cn(
                      "flex-none text-[11px] font-semibold",
                      toneStatus[row.tone],
                    )}
                  >
                    {row.status}
                  </span>
                </div>
              );
            })}
          </div>

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
