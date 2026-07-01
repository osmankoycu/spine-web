import { Buildings, Check, DeviceMobile } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";
import { ChatApp } from "./ChatApp";

// Platform pillar "01 · Benefits" (design handoff — Pillar 1). Broker-of-record
// pitch on the left (audience cards + consultant chip + plan-type pill cloud),
// and the concierge chat-app island (ChatApp) on the right. Returns ONE padded
// block only — the parent supplies the white card + full-bleed dividers. Neutral
// hex values come from the handoff; oranges/cobalt/aqua use our brand tokens.

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

export function Benefits() {
  return (
    <div className="px-6 py-12 sm:px-10 sm:py-14 lg:px-12 lg:py-14">
      <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-11 lg:items-stretch">
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
            AI continuously optimizes and right-sizes your plans, reducing
            healthcare costs by 15% on average.
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

        {/* Chat: phone-sized + centred when stacked (< lg); becomes the grid cell
            at lg via display:contents. */}
        <div className="mx-auto w-full max-w-[400px] lg:contents">
          <ChatApp />
        </div>
      </div>
    </div>
  );
}
