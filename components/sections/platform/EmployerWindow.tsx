import { Reveal } from "@/components/sections/Reveal";
import { EmployerScenario } from "./EmployerScenario";

// The employer-side app window (left of the "For employers" half). Same shell as
// the People Ops payroll console — rounded frame, top bar with traffic-light
// dots and a "spine · …" label. Inside: the "Why this mix" scenario, an
// interactive plan-recommendation map driven by two sliders.

export function EmployerWindow() {
  return (
    <Reveal className="lg:h-full">
      <div className="flex h-full min-h-[520px] flex-col overflow-hidden rounded-[20px] border border-[#d6d6d1] bg-[#fcfcfb] shadow-[0_24px_50px_-34px_rgba(20,20,18,0.25)]">
        {/* Top bar */}
        <div className="flex items-center gap-3.5 border-b border-[#d6d6d1] bg-white px-5 py-[15px]">
          <div className="flex gap-[7px]">
            <span className="size-[11px] rounded-full bg-[#dcdbd6]" />
            <span className="size-[11px] rounded-full bg-[#dcdbd6]" />
            <span className="size-[11px] rounded-full bg-[#dcdbd6]" />
          </div>
          <span className="text-[11px] tracking-[0.06em] text-[#a9a9a3]">
            spine · employer
          </span>
        </div>

        {/* Content — the interactive scenario map */}
        <div className="min-h-0 flex-1">
          <EmployerScenario />
        </div>
      </div>
    </Reveal>
  );
}
