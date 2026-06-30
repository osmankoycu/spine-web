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

// "Why Spine" comparison MATRIX (design handoff 1C): rows = capability
// dimensions, columns = PEOs · Spine · Brokers. Spine's column is highlighted as
// the winner. Desktop = the aligned 4-col matrix; mobile = stacked per-provider
// cards (Spine first). Neutral hex values are from the handoff; oranges use our
// brand tokens; Schibsted Grotesk is the active family.

type Row = {
  label: string;
  icon: Icon;
  peo: string;
  spine: string;
  broker: string;
};

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

export function WhySpine() {
  return (
    <section className="bg-bg px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      {/* No outer card — the header + matrix sit straight on the page at the
          ~1200px content width. */}
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <div className="mb-10 grid gap-7 md:mb-11 md:grid-cols-[1.25fr_1fr] md:items-end md:gap-12">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-orange">
              Why Spine
            </p>
            <h2 className="font-display mt-4 text-[34px] font-extrabold leading-[1.02] tracking-[-0.03em] text-[#161614] sm:text-[42px] md:text-[48px]">
              The modern alternative
              <br className="hidden md:inline" /> to brokers and PEOs
            </h2>
          </div>
          <p className="text-[16px] leading-[1.55] text-[#7c7c77] sm:text-[17px] md:self-end">
            Everything a PEO bundles and a broker sells, unbundled and rightsized to your company.
            Compared the way it actually matters, line by line.
          </p>
        </div>

        {/* Matrix — desktop */}
        <div className="hidden overflow-hidden rounded-[24px] border border-[#dedcd6] bg-white md:grid md:grid-cols-[0.7fr_1.15fr_1.5fr_1.15fr]">
          {/* Header row */}
          <div className="px-7 py-[22px]" />
          <ProviderHead name="PEOs" sub="Co-employment" leftBorder />
          <div className="border-x border-[#dedcd6] bg-gradient-to-b from-orange to-orange-600 px-[26px] py-[22px]">
            <SpineLogo fill="#ffffff" className="!h-[20px] w-auto" />
            <div className="mt-1.5 text-[12px] text-white/85">AI-native brokerage</div>
          </div>
          <ProviderHead name="Brokers" sub="Commission-based" />

          {/* Data rows */}
          {ROWS.map((row) => {
            const Ico = row.icon;
            return (
              <Fragment key={row.label}>
                <div className="flex items-center gap-[11px] border-t border-[#dedcd6] px-[22px] py-6">
                  <Ico size={20} weight="duotone" className="shrink-0 text-orange" />
                  <span className="text-[14px] font-bold text-[#46463f]">{row.label}</span>
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

function ProviderHead({
  name,
  sub,
  leftBorder,
}: {
  name: string;
  sub: string;
  leftBorder?: boolean;
}) {
  return (
    <div className={cn("px-6 py-[22px]", leftBorder && "border-l border-[#dedcd6]")}>
      <div className="text-[16px] font-extrabold text-[#3a3a37]">{name}</div>
      <div className="mt-0.5 text-[12px] text-[#9a9a95]">{sub}</div>
    </div>
  );
}

function NegCell({ text, leftBorder }: { text: string; leftBorder?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-start gap-2.5 border-t border-[#dedcd6] px-6 py-6",
        leftBorder && "border-l",
      )}
    >
      <span className="mt-px flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#d6d6d2] text-[#b6b6b1]">
        <X size={10} weight="bold" />
      </span>
      <span className="text-[13.5px] leading-[1.4] text-[#76766f]">{text}</span>
    </div>
  );
}

function PosCell({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2.5 border-x border-t border-[#dedcd6] bg-orange/[0.06] px-[26px] py-6">
      <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange text-white">
        <Check size={11} weight="bold" />
      </span>
      <span className="text-[13.5px] font-semibold leading-[1.4] text-[#7a3414]">{text}</span>
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
        "overflow-hidden rounded-[22px]",
        spine ? "ring-1 ring-orange/30" : "border border-[#dedcd6] bg-white",
      )}
    >
      <div
        className={cn(
          "px-6 py-5",
          spine ? "bg-gradient-to-b from-orange to-orange-600" : "border-b border-[#dedcd6]",
        )}
      >
        {spine ? (
          <SpineLogo fill="#ffffff" className="!h-[22px] w-auto" />
        ) : (
          <div className="text-[17px] font-extrabold text-[#3a3a37]">{head.name}</div>
        )}
        <div className={cn("mt-1 text-[12px]", spine ? "text-white/85" : "text-[#9a9a95]")}>
          {head.sub}
        </div>
      </div>
      <ul className={cn("divide-y px-5", spine ? "divide-orange/15 bg-orange/[0.05]" : "divide-[#f0f0ee]")}>
        {ROWS.map((row) => (
          <li key={row.label} className="flex items-start gap-3 py-4">
            <span
              className={cn(
                "mt-0.5 flex shrink-0 items-center justify-center rounded-full",
                spine
                  ? "h-5 w-5 bg-orange text-white"
                  : "h-[18px] w-[18px] border-[1.5px] border-[#d6d6d2] text-[#b6b6b1]",
              )}
            >
              {spine ? <Check size={11} weight="bold" /> : <X size={10} weight="bold" />}
            </span>
            <div className="min-w-0">
              <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#9a9a95]">
                {row.label}
              </div>
              <div
                className={cn(
                  "mt-0.5 text-[14px] leading-snug",
                  spine ? "font-semibold text-[#7a3414]" : "text-[#76766f]",
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
