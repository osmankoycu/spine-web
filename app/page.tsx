import { Hero } from "@/components/hero/Hero";
import { StatsBand } from "@/components/sections/StatsBand";
import { FreeHero } from "@/components/sections/FreeHero";
import { HrCommunity } from "@/components/sections/HrCommunity";
import { WhySpine } from "@/components/sections/WhySpine";

export default function Home() {
  return (
    <main>
      {/* Full-screen hero: INTRO tag pop-in + HERO_REST opening play on load. */}
      <Hero />

      {/* Proof band, then a placeholder for the main marketing sections still to
          come, then the handoff composition (free → HR community → dark matrix)
          and the closing CTA + footer (global, in layout). */}
      <StatsBand />

      <section className="flex min-h-[200vh] flex-col items-center justify-center gap-3 bg-bg">
        <span className="text-[13px] font-semibold uppercase tracking-[0.22em] text-grey-text">
          Content will go here
        </span>
        <span className="text-sm text-grey-text/70">
          Marketing sections: benefits, compliance, people ops, proof, pricing…
        </span>
      </section>

      <FreeHero />
      <HrCommunity />
      <WhySpine />
    </main>
  );
}
