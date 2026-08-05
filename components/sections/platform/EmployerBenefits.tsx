import { Check } from "@phosphor-icons/react/dist/ssr";
import { EmployerWindow } from "./EmployerWindow";

// "For employers" half of the Benefits pillar (below the separator). Mirrors the
// employee half: here the app window is on the LEFT and the copy on the RIGHT.
// Employer accent is cobalt (the product's company-facing colour).

type Point = { title: string; sub: string };

const COMPANY_POINTS: Point[] = [
  {
    title: "AI plan design",
    sub: "Benchmark your plans against the market and recommend the best carrier and plan mix every renewal.",
  },
  {
    title: "Every carrier, every renewal",
    sub: "Compare every major carrier and negotiate the best pricing every year.",
  },
  {
    title: "Dedicated consultant",
    sub: "A dedicated benefits consultant who knows your company and responds within hours.",
  },
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

export function EmployerBenefits() {
  return (
    <div className="grid gap-15 lg:grid-cols-[384px_1fr] lg:items-stretch lg:gap-18">
      {/* Employer app window — RIGHT cell on desktop (order-2). Stacked, it goes
          BELOW the copy (order-2 there too): the eyebrow and headline have to
          say what the mockup is before the mockup is worth looking at. */}
      <div className="order-2 mx-auto w-full lg:order-2 lg:h-full">
        <EmployerWindow />
      </div>

      {/* Employer copy — LEFT cell on desktop (order-1); mirrors the employee
          heading block (same eyebrow treatment + title + subtitle, cobalt
          accent) so the two halves read as a matched pair. */}
      <div className="order-1 flex flex-col items-center justify-center text-center lg:order-1 lg:items-start lg:text-left">
        <p className="inline-flex w-fit items-center rounded-full bg-orange/10 px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.16em] text-orange">
          01 · Benefits <span className="ml-1 text-orange/50">/ Employer</span>
        </p>
        <h2 className="font-display mt-7 text-[32px] font-extrabold leading-[1.02] tracking-[-0.03em] text-[#15140f] sm:text-[40px] lg:text-[44px]">
          Better plans.
          <br />
          <span className="text-cobalt-400">Lower premiums.</span>
        </h2>
        <p className="mt-3.5 max-w-[460px] text-[16px] leading-[1.5] text-[#7c7c77]">
          AI analyzes your workforce and continuously optimizes your benefits
          plans, reducing healthcare costs by 15% on average.
        </p>

        {/* Feature card — outline only; rows split by full-width hairlines that
            run edge to edge (matches the employee card treatment). */}
        <div className="mt-9 flex w-full flex-col divide-y divide-[#e6e6e2] rounded-[20px] border border-[#e6e6e2]">
          {COMPANY_POINTS.map((p) => (
            <div key={p.title} className="flex items-start gap-2.5 px-5 py-4 text-left sm:px-6">
              <Check size={15} weight="bold" className="mt-[3px] shrink-0 text-cobalt-400" />
              <div>
                <div className="text-[14px] font-bold text-[#15140f]">{p.title}</div>
                <div className="mt-0.5 text-[12.5px] leading-snug text-[#8a897f]">{p.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Plan-type pills */}
        <div className="mt-6 w-full">
          <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.1em] text-[#a9a9a3]">
            Every plan type
          </div>
          <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
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
    </div>
  );
}
