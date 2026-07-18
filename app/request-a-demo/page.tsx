import type { Metadata } from "next";
import { EstimateForm } from "@/components/cta/EstimateForm";
import { InteriorIcon } from "@/components/interior/icons";
import { CheckRow, Eyebrow } from "@/components/interior/parts";
import { cn } from "@/lib/cn";

// The site-wide "Request a demo" / footer "Free cost audit" destination — a real
// cost-audit landing with the savings-estimate form embedded (was a RouteStub).
export const metadata: Metadata = {
  title: "Free cost audit · Spine",
  description:
    "See how much you'd save. We pull your current plans, run them against our optimization engine, and send a personalized estimate of what Spine saves you on benefits, compliance, and payroll — in 48 hours. Free, no commitment.",
};

const STATS = [
  { figure: "25%", label: "Average healthcare cost reduction" },
  { figure: "48h", label: "Audit turnaround" },
  { figure: "$0", label: "Cost to your company" },
  { figure: "7–10d", label: "From signed BOR to live" },
];

const AUDIT = [
  {
    icon: "ChartLineUp",
    title: "Plan optimization",
    body: "Where your current plans are overpriced, and which carrier mix would cost less for the same coverage.",
  },
  {
    icon: "ShieldCheck",
    title: "Compliance gaps",
    body: "ACA, ERISA, COBRA, Form 5500 and multi-state exposure you may be carrying right now.",
  },
  {
    icon: "CurrencyCircleDollar",
    title: "PEO fees you'd drop",
    body: "The per-employee admin fees — roughly $150–200/mo each — you stop paying the day you leave a PEO.",
  },
  {
    icon: "Money",
    title: "Per-employee savings",
    body: "Around $4K saved per employee per year, modeled against your actual workforce.",
  },
];

const STEPS = [
  {
    title: "Send your details",
    body: "Work email and name — that's it. No long forms, no call required to get your number.",
  },
  {
    title: "We model your plans",
    body: "Our team and AI run your current setup against every major carrier and our optimization engine.",
  },
  {
    title: "See the savings in 48 hours",
    body: "A personalized estimate of what Spine saves you on benefits, compliance, and payroll.",
  },
];

const container = "mx-auto max-w-[1240px] px-6 md:px-10";

export default function RequestADemoPage() {
  return (
    <main className="bg-surface-page text-ink">
      {/* ── HERO (white) — value prop left, the estimate form right ── */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-[1480px] px-9 pb-16 pt-[140px] sm:px-[52px] lg:px-[60px]">
          <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div className="lg:pt-6">
              <Eyebrow>Free cost audit</Eyebrow>
              <h1 className="mb-5 mt-4 text-[44px] font-extrabold leading-[0.98] tracking-[-0.035em] sm:text-[52px] lg:text-[60px]">
                <span className="text-ink">See how much</span>
                <br />
                <span className="text-orange">you&apos;d save.</span>
              </h1>
              <p className="mb-[30px] max-w-[520px] text-[18px] leading-[1.55] text-body">
                Send us where you are today. We pull your current plans, run them
                against our optimization engine, and show you exactly what Spine
                saves you on benefits, compliance, and payroll — in 48 hours.
              </p>
              <CheckRow
                items={["Free for your company", "No commitment", "Estimate in 48 hours"]}
              />
            </div>

            <div id="estimate" className="scroll-mt-[140px]">
              <EstimateForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── STAT BAR (dark) ── */}
      <section className="mx-auto max-w-[1240px] px-6 py-10 md:px-10">
        <div className="grid grid-cols-2 overflow-hidden rounded-[24px] border border-white/10 bg-[#15140f] lg:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={cn(
                "px-7 py-8",
                i % 2 === 0 && "border-r border-white/10",
                "lg:border-r lg:last:border-r-0",
                i < 2 && "border-b border-white/10 lg:border-b-0",
              )}
            >
              <div className="whitespace-nowrap text-[30px] font-extrabold tracking-[-0.03em] text-white sm:text-[34px]">
                {s.figure}
              </div>
              <div className="mt-2 text-[13.5px] text-white/55">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHAT YOUR AUDIT SHOWS ── */}
      <section className={`${container} py-16`}>
        <div className="mx-auto max-w-[680px] text-center">
          <Eyebrow>What your audit shows</Eyebrow>
          <h2 className="mt-4 text-[32px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[40px]">
            Your numbers, on one page.
          </h2>
          <p className="mx-auto mt-3 max-w-[560px] text-[17px] leading-[1.55] text-body-2">
            No sales deck — a concrete, itemized look at what you&apos;re leaving on
            the table today.
          </p>
        </div>
        <div className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {AUDIT.map((a) => (
            <div key={a.title} className="rounded-[20px] border border-hairline bg-white px-6 py-[26px]">
              <span className="mb-4 grid size-12 place-items-center rounded-[13px] bg-orange-100">
                <InteriorIcon name={a.icon} size={24} className="text-orange-700" />
              </span>
              <h3 className="mb-[7px] text-[17px] font-extrabold tracking-[-0.01em]">{a.title}</h3>
              <p className="text-[14px] leading-[1.5] text-body-2">{a.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS (dark box) ── */}
      <section className={`${container} pb-16`}>
        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[#15140f] px-7 pb-9 pt-10 shadow-[0_40px_90px_-50px_rgba(0,0,0,0.5)] sm:px-10 lg:px-[60px] lg:pb-[52px] lg:pt-[56px]">
          <h2 className="mb-10 text-center text-[32px] font-extrabold leading-[1.05] tracking-[-0.03em] text-white sm:text-[40px]">
            From email to estimate in 48 hours.
          </h2>
          <div className="grid grid-cols-1 divide-y divide-white/10 lg:grid-cols-3 lg:divide-y-0">
            {STEPS.map((s, i) => (
              <div
                key={s.title}
                className="px-0 py-8 first:pt-0 last:pb-0 lg:px-9 lg:py-0 lg:first:pl-0 lg:last:pr-0 lg:[&:not(:last-child)]:border-r lg:[&:not(:last-child)]:border-white/10"
              >
                <span className="mb-[18px] grid size-[38px] place-items-center rounded-pill bg-orange text-[16px] font-extrabold text-white">
                  {i + 1}
                </span>
                <h3 className="mb-2 text-[19px] font-extrabold tracking-[-0.01em] text-white">
                  {s.title}
                </h3>
                <p className="text-[14.5px] leading-[1.5] text-white/55">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a
              href="#estimate"
              className="inline-flex cursor-pointer items-center gap-2 rounded-pill bg-orange px-7 py-3.5 text-[16px] font-semibold text-white transition-[background-color,scale] duration-200 hover:scale-[1.03] hover:bg-orange-600"
            >
              Get my estimate →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
