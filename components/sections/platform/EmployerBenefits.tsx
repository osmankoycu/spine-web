import { Buildings, Check } from "@phosphor-icons/react/dist/ssr";
import { EmployerWindow } from "./EmployerWindow";

// "For employers" half of the Benefits pillar (below the separator). Mirrors the
// employee half: here the app window is on the LEFT and the copy on the RIGHT.
// Employer accent is cobalt (the product's company-facing colour).

type Point = { title: string; sub: string };

const COMPANY_POINTS: Point[] = [
  { title: "AI plan optimization", sub: "Benchmarked every renewal" },
  { title: "Every carrier, every renewal", sub: "We shop the full market" },
  { title: "Dedicated consultant", sub: "A named, in-house expert" },
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
    <div className="grid gap-10 lg:grid-cols-[1fr_384px] lg:items-stretch lg:gap-12">
      {/* Left: employer app window — the "Why this mix" scenario map */}
      <div className="mx-auto w-full lg:h-full">
        <EmployerWindow />
      </div>

      {/* Right: employer copy — mirrors the employee heading block (same title +
          subtitle, cobalt accent) so the two halves read as a matched pair. */}
      <div className="flex flex-col justify-center">
        <h2 className="font-display text-[32px] font-extrabold leading-[1.02] tracking-[-0.03em] text-[#15140f] sm:text-[40px] lg:text-[44px]">
          Better plans.
          <br />
          <span className="text-cobalt-400">Lower premiums.</span>
        </h2>
        <p className="mt-3.5 max-w-[460px] text-[16px] leading-[1.5] text-[#7c7c77]">
          AI continuously optimizes and right-sizes your plans, reducing
          healthcare costs by 15% on average.
        </p>

        <div className="mt-8 flex items-center gap-2">
          <Buildings size={20} weight="duotone" className="text-cobalt-400" />
          <span className="text-[15px] font-extrabold text-[#15140f]">For employers</span>
        </div>

        {/* Feature card */}
        <div className="mt-4 flex flex-col gap-4 rounded-[20px] border border-cobalt-200 bg-cobalt-100/25 px-6 py-5">
          {COMPANY_POINTS.map((p) => (
            <div key={p.title} className="flex items-start gap-2.5">
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
