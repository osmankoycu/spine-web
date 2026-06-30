import { Benefits } from "./platform/Benefits";
import { Compliance } from "./platform/Compliance";
import { PeopleOps } from "./platform/PeopleOps";

// Platform sections (design handoff): the three product pillars — Benefits ·
// Compliance · People Ops — stacked inside ONE white card, contiguous and
// separated by full-bleed hairline dividers (NOT three separate boxes). Light
// theme, equal weight. Each pillar component renders just its padded block; the
// card + dividers live here.
export function PlatformSections() {
  return (
    <section className="bg-bg px-4 py-11 sm:px-6 lg:px-8 lg:py-14">
      <div className="relative z-10 mx-auto max-w-[1480px] overflow-hidden rounded-[32px] border border-[#ededea] bg-white shadow-[0_1px_0_rgba(0,0,0,0.02),0_40px_80px_-52px_rgba(20,20,18,0.2)]">
        <Benefits />
        <div className="h-px bg-[#ededea]" aria-hidden />
        <Compliance />
        <div className="h-px bg-[#ededea]" aria-hidden />
        <PeopleOps />
      </div>
    </section>
  );
}
