import {
  BatteryFull,
  Buildings,
  CellSignalFull,
  Check,
  DeviceMobile,
  FileText,
  PaperPlaneRight,
  Phone,
  WifiHigh,
} from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";

// Platform pillar "01 · Benefits" (design handoff — Pillar 1). Broker-of-record
// pitch on the left (audience cards + consultant chip + plan-type pill cloud),
// a concierge chat-app UI on the right. Returns ONE padded block only — the
// parent supplies the white card + full-bleed dividers. Neutral hex values come
// straight from the handoff; oranges use our brand tokens. NOT a client island.

const COMPANY_POINTS = [
  "AI plan optimization",
  "Every carrier, every renewal",
  "Dedicated consultant",
];

const EMPLOYEE_POINTS = [
  "The Spine app",
  "24/7 concierge",
  "Care navigation & bill defense",
];

const PLAN_TYPES = [
  "Fully insured",
  "Level-funded",
  "Self-funded",
  "ICHRA",
  "QSEHRA",
  "401(k)",
  "Dental & vision",
  "HSA / FSA",
];

function CheckRow({ label, accent }: { label: string; accent: string }) {
  return (
    <div className="flex items-center gap-[9px]">
      <Check size={13} weight="bold" className={cn("shrink-0", accent)} />
      <span className="text-[13.5px] text-[#56554f]">{label}</span>
    </div>
  );
}

// `accent` colour-codes the audience: Cobalt for the employer (company), Aqua
// for employees — the product's two-tone semantic palette.
function AudienceCard({
  icon: Icon,
  title,
  points,
  accent,
  tint,
}: {
  icon: typeof Buildings;
  title: string;
  points: string[];
  accent: string;
  tint: string;
}) {
  return (
    <div className={cn("rounded-[18px] border p-6", tint)}>
      <div className="mb-4 flex items-center gap-2.5">
        <Icon size={20} weight="duotone" className={accent} />
        <span className="text-[14.5px] font-extrabold text-[#15140f]">
          {title}
        </span>
      </div>
      <div className="flex flex-col gap-2.5">
        {points.map((p) => (
          <CheckRow key={p} label={p} accent={accent} />
        ))}
      </div>
    </div>
  );
}

function ReceivedBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[78%] self-start rounded-[18px_18px_18px_5px] border border-[#eaeaec] bg-white px-3.5 py-[11px]">
      <p className="text-[13.5px] leading-[1.4] text-[#2e2d28]">{children}</p>
    </div>
  );
}

function SentBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[80%] self-end rounded-[18px_18px_5px_18px] bg-aqua-100 px-3.5 py-[11px]">
      <p className="text-[13.5px] leading-[1.4] text-aqua-700">{children}</p>
    </div>
  );
}

export function Benefits() {
  return (
    <div className="px-6 py-12 sm:px-10 sm:py-14 lg:px-12 lg:py-14">
      <div className="grid gap-10 md:grid-cols-[1fr_380px] md:gap-11 md:items-stretch">
        {/* Left column */}
        <div className="flex flex-col">
          <p className="inline-flex w-fit items-center self-start rounded-full bg-orange/10 px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.16em] text-orange">
            01 · Benefits
          </p>
          <h2 className="font-display mt-7 text-[32px] font-extrabold leading-[1.02] tracking-[-0.03em] text-[#15140f] sm:text-[40px] lg:text-[44px]">
            Better plans.
            <br />
            <span className="text-orange">Lower premiums.</span>
          </h2>
          <p className="mt-3.5 max-w-[460px] text-[16px] leading-[1.5] text-[#7c7c77]">
            We become your broker of record, shopping every carrier and
            renegotiating every renewal, so costs go down.
          </p>

          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <AudienceCard
              icon={Buildings}
              title="For your company"
              points={COMPANY_POINTS}
              accent="text-cobalt-400"
              tint="border-cobalt-200 bg-cobalt-100/40"
            />
            <AudienceCard
              icon={DeviceMobile}
              title="For employees"
              points={EMPLOYEE_POINTS}
              accent="text-aqua-500"
              tint="border-aqua-200 bg-aqua-100/40"
            />
          </div>

          {/* Consultant chip */}
          <div className="mt-4 flex items-center gap-3.5 rounded-[18px] border border-[#ececea] bg-[#fcfcfb] px-4 py-3.5">
            <div className="grid size-12 shrink-0 place-items-center rounded-full bg-[#ececea] text-[15px] font-bold text-[#7c7c77]">
              NB
            </div>
            <div className="flex-1">
              <div className="text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#b0afa9]">
                Dedicated consultant
              </div>
              <div className="text-[15px] font-bold text-[#15140f]">
                Nashina Bush
              </div>
            </div>
            <span className="shrink-0 rounded-full bg-cobalt-400/[0.08] px-2.5 py-1.5 text-[10.5px] font-bold text-cobalt-400">
              In-house
            </span>
          </div>

          {/* Plan-type pill cloud */}
          <div className="mt-auto pt-4">
            <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.1em] text-[#a9a9a3]">
              Every plan type
            </div>
            <div className="flex flex-wrap gap-2">
              {PLAN_TYPES.map((plan) => (
                <span
                  key={plan}
                  className="rounded-full border border-[#ececea] bg-white px-3 py-1.5 text-[13px] text-[#56554f]"
                >
                  {plan}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right column — concierge chat-app UI */}
        <div className="flex min-h-[520px] flex-col overflow-hidden rounded-[30px] border border-[#e6e6e8] bg-[#f2f2f3] shadow-[0_30px_60px_-36px_rgba(20,20,18,0.3)]">
          {/* iOS status bar */}
          <div className="flex items-center justify-between bg-white px-[22px] pb-1.5 pt-3.5">
            <span className="text-[13px] font-bold text-[#15140f]">9:41</span>
            <div className="flex items-center gap-1.5 text-[#15140f]">
              <CellSignalFull size={13} weight="fill" />
              <WifiHigh size={13} weight="fill" />
              <BatteryFull size={15} weight="fill" />
            </div>
          </div>

          {/* App header */}
          <div className="flex items-center gap-3 border-b border-[#eaeaec] bg-white px-[18px] pb-3.5 pt-1.5">
            <span className="relative grid size-[42px] shrink-0 place-items-center rounded-full bg-gradient-to-br from-aqua-400 to-aqua-500">
              <span className="text-[18px] font-extrabold text-white">S</span>
              <span className="absolute -bottom-px -right-px size-3 rounded-full border-2 border-white bg-[#2ec46b]" />
            </span>
            <div className="flex-1">
              <div className="text-[15px] font-extrabold tracking-[-0.01em] text-[#15140f]">
                Spine Care
              </div>
              <div className="text-[12px] font-semibold text-[#2a8b3f]">
                Online · replies in ~1 min
              </div>
            </div>
            <Phone size={20} className="text-[#b0afa9]" />
          </div>

          {/* Messages */}
          <div className="flex flex-1 flex-col gap-3 overflow-hidden px-[18px] py-5">
            <div className="self-center rounded-full bg-[#e9e9eb] px-3 py-1 text-[11px] font-semibold text-[#909096]">
              Today
            </div>
            <ReceivedBubble>I got a $1,200 ER bill, is this right?</ReceivedBubble>
            <SentBubble>Looking into it now, hang tight.</SentBubble>
            <SentBubble>
              Found it, you were billed out-of-network by mistake. We&apos;re
              disputing it for you.
            </SentBubble>
            <div className="flex items-center gap-2 self-start rounded-[14px] border border-[#eaeaec] bg-white px-3.5 py-2.5">
              <FileText size={18} weight="duotone" className="text-aqua-500" />
              <div>
                <div className="text-[12.5px] font-bold text-[#15140f]">
                  Claim #4821
                </div>
                <div className="text-[11px] text-[#a9a9a3]">
                  In review · we&apos;ll update you
                </div>
              </div>
            </div>
            <SentBubble>No action needed on your end.</SentBubble>
          </div>

          {/* Input bar */}
          <div className="flex items-center gap-2.5 border-t border-[#eaeaec] bg-white px-4 pb-[18px] pt-3">
            <div className="flex-1 rounded-full border border-[#e6e6e8] bg-[#f2f2f3] px-4 py-[11px] text-[13.5px] text-[#a9a9a3]">
              Message Spine Care…
            </div>
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-aqua-400">
              <PaperPlaneRight size={18} weight="fill" className="text-white" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
