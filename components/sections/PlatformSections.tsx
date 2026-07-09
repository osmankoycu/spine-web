import { Benefits } from "./platform/Benefits";
import { Compliance } from "./platform/Compliance";
import { PeopleOps } from "./platform/PeopleOps";

// Platform sections: the three product pillars — Benefits · Compliance · People
// Ops — as THREE separate rounded white cards with a gap between them (previously
// one contiguous card split by hairline dividers). Each pillar renders just its
// padded block; the card wrapper lives here.
const CARD =
  "overflow-hidden rounded-[32px] border border-[#ededea] bg-white shadow-[0_1px_0_rgba(0,0,0,0.02),0_40px_80px_-52px_rgba(20,20,18,0.2)]";

export function PlatformSections() {
  return (
    <section className="bg-bg px-4 py-11 sm:px-6 lg:px-8 lg:py-14">
      <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col gap-22 lg:gap-28">
        <div className={CARD}>
          <Benefits />
        </div>
        <div className={CARD}>
          <Compliance />
        </div>
        <div className={CARD}>
          <PeopleOps />
        </div>
      </div>
    </section>
  );
}
