import { Fragment } from "react";
import {
  ArrowsClockwise,
  Check,
  Headset,
  ShieldCheck,
  SlidersHorizontal,
  Stack,
  X,
  type Icon,
} from "@phosphor-icons/react/dist/ssr";
import { SpineLogo } from "@/components/SpineLogo";
import { cn } from "@/lib/cn";

// "Why Spine" comparison MATRIX — DARK variant (handoff Block 3): rows =
// capability dimensions, columns = PEOs · Spine · Brokers, Spine highlighted.
// Desktop = the aligned 4-col matrix; mobile = stacked per-provider cards (Spine
// first). Neutral values from the handoff; orange uses our brand tokens.

type Row = { label: string; icon: Icon; peo: string; spine: string; broker: string };

const ROWS: Row[] = [
  {
    label: "Service model",
    icon: Headset,
    peo: "Generic HR support pool",
    spine: "Dedicated consultant + fractional HR network",
    broker: "Built for 200+, junior service below",
  },
  {
    label: "Plan design",
    icon: SlidersHorizontal,
    peo: "One-size-fits-all master plans",
    spine: "Rightsized to your workforce",
    broker: "Commission-driven incentives",
  },
  {
    label: "Compliance",
    icon: ShieldCheck,
    peo: "Co-employment lock-in",
    spine: "Handled, you keep your entity",
    broker: "Manual compliance reminders",
  },
  {
    label: "Tech stack",
    icon: Stack,
    peo: "Forced HRIS & payroll stack",
    spine: "Works with your existing HRIS & payroll",
    broker: "Phone tag, business hours",
  },
  {
    label: "Renewals",
    icon: ArrowsClockwise,
    peo: "Premiums spike at scale",
    spine: "Claims data: leverage every cycle",
    broker: "Annual renewal surprises",
  },
];

const RADIAL =
  "radial-gradient(130% 130% at 50% -10%, #232220 0%, #161513 60%, #100f0e 100%)";

export function WhySpine() {
  return (
    <section className="bg-bg px-4 py-11 sm:px-6 lg:px-8 lg:py-14">
      <div
        className="relative z-10 mx-auto max-w-[1200px] overflow-hidden rounded-[32px] px-6 py-10 shadow-[0_40px_90px_-50px_rgba(0,0,0,0.5)] sm:px-10 sm:py-12 lg:px-[56px] lg:pb-[56px] lg:pt-[64px]"
        style={{ background: RADIAL }}
      >
        {/* Header */}
        <div className="mb-10 grid gap-7 md:mb-11 md:grid-cols-[1.2fr_0.8fr] md:items-end md:gap-10">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-orange">
              Why Spine
            </p>
            <h2 className="font-display mt-4 text-[30px] font-extrabold leading-[1.07] tracking-[-0.03em] text-[#fbfbf9] sm:text-[36px] md:text-[40px]">
              The modern alternative to
              <br className="hidden md:inline" /> brokers and PEOs
            </h2>
          </div>
          <p className="text-[16px] leading-[1.55] text-[#9b9893] sm:text-[17px] md:self-end">
            Everything a PEO bundles and a broker sells, unbundled and rightsized to your company.
            Compared the way it actually matters, line by line.
          </p>
        </div>

        {/* Matrix — desktop */}
        <div className="hidden overflow-hidden rounded-[24px] border border-white/10 md:grid md:grid-cols-[0.8fr_1.2fr_1.35fr_1.2fr]">
          {/* Header row */}
          <div className="bg-white/[0.02] px-7 py-[22px]" />
          <ProviderHead name="PEOs" sub="Co-employment" />
          <div className="bg-gradient-to-b from-orange to-orange-600 px-[26px] py-[22px]">
            <SpineLogo fill="#ffffff" className="!h-[20px] w-auto" />
            <div className="mt-1.5 text-[12px] text-[#ffe3d2]">AI-native brokerage</div>
          </div>
          <ProviderHead name="Brokers" sub="Commission-based" />

          {/* Data rows */}
          {ROWS.map((row) => {
            const Ico = row.icon;
            return (
              <Fragment key={row.label}>
                <div className="flex items-center gap-[11px] border-t border-white/10 bg-white/[0.03] px-[22px] py-6">
                  <Ico size={20} weight="duotone" className="shrink-0 text-orange" />
                  <span className="text-[14px] font-bold text-[#d9d7d2]">{row.label}</span>
                </div>
                <NegCell text={row.peo} leftBorder />
                <PosCell text={row.spine} />
                <NegCell text={row.broker} />
              </Fragment>
            );
          })}
        </div>

        {/* Stacked per-provider cards — mobile (Spine first) */}
        <div className="space-y-4 md:hidden">
          <MobileCard kind="spine" />
          <MobileCard kind="peo" />
          <MobileCard kind="broker" />
        </div>
      </div>
    </section>
  );
}

function ProviderHead({ name, sub }: { name: string; sub: string }) {
  return (
    <div className="border-l border-white/10 bg-white/[0.02] px-6 py-[22px]">
      <div className="text-[16px] font-extrabold text-[#e9e8e4]">{name}</div>
      <div className="mt-0.5 text-[12px] text-[#7e7c77]">{sub}</div>
    </div>
  );
}

function NegCell({ text, leftBorder }: { text: string; leftBorder?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-start gap-2.5 border-t border-white/10 px-6 py-6",
        leftBorder && "border-l",
      )}
    >
      <span className="mt-px flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-white/[0.18] text-[#6f6d68]">
        <X size={10} weight="bold" />
      </span>
      <span className="text-[13.5px] leading-[1.4] text-[#8c8a85]">{text}</span>
    </div>
  );
}

function PosCell({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2.5 border-t border-white/10 bg-[rgba(247,101,27,0.1)] px-[26px] py-6">
      <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange text-white">
        <Check size={11} weight="bold" />
      </span>
      <span className="text-[13.5px] font-semibold leading-[1.4] text-[#ffcdb0]">{text}</span>
    </div>
  );
}

function MobileCard({ kind }: { kind: "spine" | "peo" | "broker" }) {
  const spine = kind === "spine";
  const head =
    kind === "peo"
      ? { name: "PEOs", sub: "Co-employment" }
      : kind === "broker"
        ? { name: "Brokers", sub: "Commission-based" }
        : { name: "spine.", sub: "AI-native brokerage" };
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[22px] border",
        spine ? "border-orange/40 bg-[rgba(247,101,27,0.08)]" : "border-white/10 bg-white/[0.03]",
      )}
    >
      <div
        className={cn(
          "px-6 py-5",
          spine ? "bg-gradient-to-b from-orange to-orange-600" : "border-b border-white/10",
        )}
      >
        {spine ? (
          <SpineLogo fill="#ffffff" className="!h-[22px] w-auto" />
        ) : (
          <div className="text-[17px] font-extrabold text-[#e9e8e4]">{head.name}</div>
        )}
        <div className={cn("mt-1 text-[12px]", spine ? "text-[#ffe3d2]" : "text-[#7e7c77]")}>
          {head.sub}
        </div>
      </div>
      <ul className="divide-y divide-white/10 px-5">
        {ROWS.map((row) => (
          <li key={row.label} className="flex items-start gap-3 py-4">
            <span
              className={cn(
                "mt-0.5 flex shrink-0 items-center justify-center rounded-full",
                spine
                  ? "h-5 w-5 bg-orange text-white"
                  : "h-[18px] w-[18px] border-[1.5px] border-white/[0.18] text-[#6f6d68]",
              )}
            >
              {spine ? <Check size={11} weight="bold" /> : <X size={10} weight="bold" />}
            </span>
            <div className="min-w-0">
              <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#7e7c77]">
                {row.label}
              </div>
              <div
                className={cn(
                  "mt-0.5 text-[14px] leading-snug",
                  spine ? "font-semibold text-[#ffcdb0]" : "text-[#8c8a85]",
                )}
              >
                {row[kind]}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
