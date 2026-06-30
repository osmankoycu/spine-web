import { Hero } from "@/components/hero/Hero";
import { StatsBand } from "@/components/sections/StatsBand";

export default function Home() {
  return (
    <main>
      {/* Full-screen hero: INTRO tag pop-in + HERO_REST opening play on load. */}
      <Hero />

      {/* Proof band — stats + trusted-by, directly below the hero. */}
      <StatsBand variant="light" />

      {/* Placeholder for the real marketing sections — kept tall so the scroll
          between the hero and the closing CTA + footer (global, in layout) has
          real travel. Replace with actual content later. */}
      <section className="flex min-h-[200vh] flex-col items-center justify-center gap-3 bg-bg">
        <span className="text-[13px] font-semibold uppercase tracking-[0.22em] text-grey-text">
          Content will go here
        </span>
        <span className="text-sm text-grey-text/70">
          Marketing sections: benefits, compliance, people ops, proof, pricing…
        </span>
      </section>
    </main>
  );
}
