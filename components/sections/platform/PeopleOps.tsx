import { stackLogos } from "@/lib/platformLogos";
import { Reveal } from "@/components/sections/Reveal";
import { WorkflowTimeline } from "./WorkflowTimeline";
import { SlackWindow } from "./SlackWindow";

// Platform pillar "03 · People Ops" (design handoff). ONE padded block only —
// the parent supplies the white card + dividers. Left: headline + a vertical
// workflow timeline pushed to the column bottom. Right: the same workflow as it
// actually happens for the customer — a Slack thread where Spine onboards the
// hire, runs payroll, and pulls in a human specialist.

export function PeopleOps() {
  return (
    <div className="px-3 py-7 sm:px-10 sm:py-14 lg:px-12 lg:py-14">
      <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-stretch lg:gap-8">
        {/* Left column: eyebrow + headline + workflow timeline. The eyebrow sits
            INSIDE this column (as in the Benefits pillar) so the window in the
            right column starts at the same top line. */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <p className="mb-7 inline-flex w-fit items-center rounded-full bg-orange/10 px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.16em] text-orange">
            03 · People Ops
          </p>
          <h2 className="font-display text-[34px] font-extrabold leading-[1.0] tracking-[-0.03em] text-[#15140f] sm:text-[40px] lg:text-[44px]">
            You hire.
            <br />
            <span className="text-orange">We run the rest.</span>
          </h2>
          <p className="mt-3.5 max-w-[420px] text-[16px] leading-[1.5] text-[#7c7c77]">
            Payroll, onboarding, records, and offboarding — in your Slack, on top
            of the stack you already use.
          </p>

          {/* Vertical workflow timeline (client island: draws top-to-bottom) */}
          <WorkflowTimeline />
        </div>

        {/* Right column: the same workflow, live in Slack */}
        <Reveal className="lg:h-full">
          <SlackWindow />
        </Reveal>
      </div>

      {/* Works on top of */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 lg:justify-between gap-y-6 border-t border-[#ededea] pt-7 text-[#c2c2bc]">
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
