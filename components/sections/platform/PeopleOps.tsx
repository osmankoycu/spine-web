import {
  ClipboardText,
  CurrencyCircleDollar,
  SignOut,
  UserPlus,
} from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";
import { stackLogos } from "@/lib/platformLogos";
import { Reveal } from "@/components/sections/Reveal";

// Platform pillar "03 · People Ops" (design handoff). ONE padded block only —
// the parent supplies the white card + dividers. Left: headline + a vertical
// workflow timeline pushed to the column bottom. Right: a payroll console.
// Neutral hex + success green (#2a8b3f) are exact handoff values; oranges use
// our brand token (text-orange / bg-orange), tint via bg-orange/[0.07].

type WorkflowStep = {
  icon: typeof UserPlus;
  actor: "You" | "Spine";
  title: string;
  sub?: string;
};

const workflow: WorkflowStep[] = [
  { icon: UserPlus, actor: "You", title: "Make the hire" },
  {
    icon: ClipboardText,
    actor: "Spine",
    title: "Onboards day one",
    sub: "I-9, E-Verify, enrollment",
  },
  {
    icon: CurrencyCircleDollar,
    actor: "Spine",
    title: "Runs payroll every cycle",
    sub: "Processing, tax filings, reconciliation",
  },
  {
    icon: SignOut,
    actor: "Spine",
    title: "Handles offboarding",
    sub: "Final pay, COBRA, records",
  },
];

type QueueRow = {
  glyph: string;
  tone: "green" | "orange";
  title: string;
  status: string;
};

const queue: QueueRow[] = [
  {
    glyph: "✓",
    tone: "green",
    title: "Onboarded Sarah K. · Eng, remote-TX",
    status: "Day 1 ready",
  },
  {
    glyph: "↻",
    tone: "orange",
    title: "3 PTO requests pending",
    status: "Reviewing",
  },
  {
    glyph: "✓",
    tone: "green",
    title: "Final paycheck issued · J. Chen",
    status: "Complete",
  },
  {
    glyph: "✓",
    tone: "green",
    title: "E-Verify cleared · 2 new hires",
    status: "Verified",
  },
  {
    glyph: "↻",
    tone: "orange",
    title: "Benefits enrollment · open window",
    status: "5 days left",
  },
];


export function PeopleOps() {
  return (
    <div className="px-6 py-12 sm:px-10 sm:py-14 lg:px-12 lg:py-14">
      <div className="mb-7">
        <span className="inline-flex items-center rounded-full bg-orange/10 px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.16em] text-orange">
          03 · People Ops
        </span>
      </div>

      <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-stretch">
        {/* Left column: headline + workflow timeline */}
        <div className="flex flex-col">
          <h2 className="font-display text-[34px] font-extrabold leading-[1.0] tracking-[-0.03em] text-[#15140f] sm:text-[40px] lg:text-[44px]">
            You hire.
            <br />
            <span className="text-orange">We run the rest.</span>
          </h2>
          <p className="mt-3.5 max-w-[420px] text-[16px] leading-[1.5] text-[#7c7c77]">
            Payroll, onboarding, records, and offboarding, on top of the stack
            you already use.
          </p>

          {/* Vertical workflow timeline; first step pushed to bottom */}
          <ol className="mt-7">
            {workflow.map((step, i) => {
              const Glyph = step.icon;
              const isLast = i === workflow.length - 1;
              return (
                <li
                  key={step.title}
                  className={cn(
                    "flex items-start gap-4",
                    i === 0 && "mt-auto",
                  )}
                >
                  <div className="flex flex-none flex-col items-center self-stretch">
                    <span className="grid size-11 flex-none place-items-center rounded-[14px] bg-orange/[0.07]">
                      <Glyph size={22} weight="duotone" className="text-orange" />
                    </span>
                    {!isLast && (
                      <span className="w-0.5 min-h-[22px] flex-1 bg-[#ededea]" />
                    )}
                  </div>
                  <div className={cn(!isLast && "pb-[22px]")}>
                    <div
                      className={cn(
                        "text-[11px] font-bold uppercase tracking-[0.08em]",
                        step.actor === "You" ? "text-[#b0afa9]" : "text-orange",
                      )}
                    >
                      {step.actor}
                    </div>
                    <div className="mt-0.5 text-[16px] font-extrabold tracking-[-0.01em] text-[#15140f]">
                      {step.title}
                    </div>
                    {step.sub && (
                      <div className="mt-0.5 text-[13px] text-[#86857e]">
                        {step.sub}
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Right column: payroll console */}
        <Reveal className="md:h-full">
          <div className="h-full overflow-hidden rounded-[20px] border border-[#ececea] bg-[#fcfcfb] shadow-[0_24px_50px_-34px_rgba(20,20,18,0.25)]">
          {/* Top bar */}
          <div className="flex items-center gap-3.5 border-b border-[#ededea] bg-white px-5 py-[15px]">
            <div className="flex gap-[7px]">
              <span className="size-[11px] rounded-full bg-[#dcdbd6]" />
              <span className="size-[11px] rounded-full bg-[#dcdbd6]" />
              <span className="size-[11px] rounded-full bg-[#dcdbd6]" />
            </div>
            <span className="ml-auto text-[11px] tracking-[0.06em] text-[#a9a9a3]">
              spine · people ops
            </span>
          </div>

          <div className="p-[22px]">
            {/* Stat cards */}
            <div className="mb-[18px] grid grid-cols-[1.4fr_1fr] gap-3">
              <div className="rounded-[14px] border border-[#ececea] bg-white px-[18px] py-4">
                <div className="text-[11px] font-semibold tracking-[0.04em] text-[#a9a9a3]">
                  Payroll · this week
                </div>
                <div className="mt-1 text-[32px] font-extrabold tracking-[-0.03em] text-[#15140f]">
                  $293K
                </div>
                <div className="mt-1 text-[12px] font-semibold text-[#2a8b3f]">
                  ✓ Processed Friday
                </div>
              </div>
              <div className="rounded-[14px] border border-[#ececea] bg-white px-[18px] py-4">
                <div className="text-[11px] font-semibold tracking-[0.04em] text-[#a9a9a3]">
                  Active
                </div>
                <div className="mt-1 text-[32px] font-extrabold tracking-[-0.03em] text-[#15140f]">
                  47
                </div>
                <div className="mt-1 text-[12px] font-semibold text-[#86857e]">
                  +3 onboarding
                </div>
              </div>
            </div>

            {/* Queue */}
            <div className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#b0afa9]">
              This week&apos;s queue
            </div>
            {queue.map((row, i) => (
              <div
                key={row.title}
                className={cn(
                  "flex items-center gap-[13px] py-[13px]",
                  i !== queue.length - 1 && "border-b border-[#ededea]",
                )}
              >
                <span
                  className={cn(
                    "grid size-7 flex-none place-items-center rounded-lg text-[13px] font-extrabold",
                    row.tone === "green"
                      ? "bg-[#eafaef] text-[#2a8b3f]"
                      : "bg-orange/[0.07] text-orange",
                  )}
                >
                  {row.glyph}
                </span>
                <div className="flex-1 text-[13.5px] font-semibold text-[#2e2d28]">
                  {row.title}
                </div>
                <span className="flex-none text-[11px] text-[#a9a9a3]">
                  {row.status}
                </span>
              </div>
            ))}
          </div>
          </div>
        </Reveal>
      </div>

      {/* Works on top of */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-x-10 gap-y-6 border-t border-[#ededea] pt-7 text-[#c2c2bc]">
        <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-[#a9a9a3]">
          Works on top of
        </span>
        {stackLogos.map((logo) => (
          <span
            key={logo.label}
            role="img"
            aria-label={logo.label}
            style={{ width: 24 * logo.ar, height: 24 }}
            className="block [&>svg]:h-full [&>svg]:w-full"
            dangerouslySetInnerHTML={{ __html: logo.svg }}
          />
        ))}
      </div>
    </div>
  );
}
