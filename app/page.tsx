import { Hero } from "@/components/hero/Hero";
import { StatsBand } from "@/components/sections/StatsBand";
import { PlatformSections } from "@/components/sections/PlatformSections";
import { FreeHero } from "@/components/sections/FreeHero";
import { HrCommunity } from "@/components/sections/HrCommunity";
import { WhySpine } from "@/components/sections/WhySpine";

export default function Home() {
  return (
    <main>
      {/* Full-screen hero: INTRO tag pop-in + HERO_REST opening play on load. */}
      <Hero />

      {/* Proof band → platform pillars (Benefits/Compliance/People Ops) → free →
          HR community → dark matrix, then the closing CTA + footer (in layout). */}
      <StatsBand variant="dark" />
      <PlatformSections />
      <FreeHero />
      <HrCommunity />
      <WhySpine />
    </main>
  );
}
