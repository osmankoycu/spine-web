import { Check } from "@phosphor-icons/react/dist/ssr";
import { EmployerWindow } from "./EmployerWindow";

// "For employers" half of the Benefits pillar (below the separator). Mirrors the
// employee half: here the app window is on the LEFT and the copy on the RIGHT.
// Employer accent is cobalt (the product's company-facing colour).

type Point = { title: string; sub: string };

const COMPANY_POINTS: Point[] = [
  {
    title: "AI plan optimization",
    sub: "Our models benchmark your plans against the market and right-size them at every renewal.",
  },
  {
    title: "Every carrier, every renewal",
    sub: "We shop the full market each year and negotiate so you never overpay for coverage.",
  },
  {
    title: "Dedicated consultant",
    sub: "A named, in-house benefits expert who knows your company and replies within hours.",
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
      {/* Employer app window — the "Why this mix" scenario map; RIGHT cell on
          desktop (order-2), copy on the left */}
      <div className="mx-auto w-full lg:order-2 lg:h-full">
        <EmployerWindow />
      </div>

      {/* Employer copy — LEFT cell on desktop (order-1); mirrors the employee
          heading block (same eyebrow treatment + title + subtitle, cobalt
          accent) so the two halves read as a matched pair. */}
      <div className="flex flex-col justify-center lg:order-1">
        <p className="inline-flex w-fit items-center self-start rounded-full bg-orange/10 px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.16em] text-orange">
          01 · Benefits <span className="ml-1 text-orange/50">/ Employer</span>
        </p>
        <h2 className="font-display mt-7 text-[32px] font-extrabold leading-[1.02] tracking-[-0.03em] text-[#15140f] sm:text-[40px] lg:text-[44px]">
          Better plans.
          <br />
          <span className="text-cobalt-400">Lower premiums.</span>
        </h2>
        <p className="mt-3.5 max-w-[460px] text-[16px] leading-[1.5] text-[#7c7c77]">
          AI continuously optimizes and right-sizes your plans, reducing
          healthcare costs by 15% on average.
        </p>

        {/* Feature card — outline only; rows split by full-width hairlines that
            run edge to edge (matches the employee card treatment). */}
        <div className="mt-9 flex flex-col divide-y divide-[#e6e6e2] rounded-[20px] border border-[#e6e6e2]">
          {COMPANY_POINTS.map((p) => (
            <div key={p.title} className="flex items-start gap-2.5 px-6 py-4">
              <Check size={15} weight="bold" className="mt-[3px] shrink-0 text-cobalt-400" />
              <div>
                <div className="text-[14px] font-bold text-[#15140f]">{p.title}</div>
                <div className="mt-0.5 text-[12.5px] leading-snug text-[#8a897f]">{p.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Plan-type pills */}
        <div className="mt-6">
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
    </div>
  );
}
