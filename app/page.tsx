import { Hero } from "@/components/hero/Hero";
import { StatsBand } from "@/components/sections/StatsBand";
import { WhySpine } from "@/components/sections/WhySpine";

export default function Home() {
  return (
    <main>
      {/* Full-screen hero: INTRO tag pop-in + HERO_REST opening play on load. */}
      <Hero />

      {/* Proof band — stats + trusted-by, directly below the hero. */}
      <StatsBand variant="light" />

      {/* Placeholder for the real marketing sections still to come — kept tall so
          the scroll has real travel. Replace with actual content later. */}
      <section className="flex min-h-[200vh] flex-col items-center justify-center gap-3 bg-bg">
        <span className="text-[13px] font-semibold uppercase tracking-[0.22em] text-grey-text">
          Content will go here
        </span>
        <span className="text-sm text-grey-text/70">
          Marketing sections: benefits, compliance, people ops, proof, pricing…
        </span>
      </section>

      {/* Why Spine — 3-way comparison, right above the closing CTA + footer
          (global, in layout). */}
      <WhySpine />
    </main>
  );
}
