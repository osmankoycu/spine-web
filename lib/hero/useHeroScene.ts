"use client";

import { useCallback, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/reducedMotion";
import { HeroRestController } from "./HeroRestController";

// Native-scroll hero (no pinning, no swipe paging). The INTRO tag pop-in plays
// on mount (TagField); when it finishes, HeroRestController.enter() opens the
// resting state — the headline / subtitle / CTA pop in beat-by-beat while the
// TagFlow physics part the tags around the growing text and keep reacting
// (live: mouse-repel, drift, word-rotation reflow). Everything below the hero is
// ordinary scroll.
//
// The full swipe-based paging system (INTRO → HERO_REST → STATS → BENEFITS →
// COMPLIANCE → PEOPLE_OPS, master timeline, SceneController/StatsController/
// BenefitsController) is preserved on the `archive/swipe-hero` branch (tag
// `archive/swipe-hero-v1`) in case it's needed again.
export function useHeroScene() {
  const stageRef = useRef<HTMLDivElement>(null);
  const heroRestRef = useRef<HeroRestController | null>(null);
  const introPendingRef = useRef(false);

  // Called by TagField when the INTRO pop-in finishes → opens HERO_REST.
  const completeIntro = useCallback(() => {
    if (heroRestRef.current) {
      heroRestRef.current.enter();
    } else {
      introPendingRef.current = true;
    }
  }, []);

  useGSAP(
    () => {
      const stage = stageRef.current;
      if (!stage) return;

      // Reduced motion: render the resting HERO_REST state statically (no flow).
      if (prefersReducedMotion()) {
        gsap.set(stage.querySelectorAll("[data-h-line],[data-subtitle],[data-cta]"), {
          opacity: 1,
          y: 0,
        });
        gsap.set(stage.querySelectorAll("[data-tag]"), { opacity: 0.5 });
        return;
      }

      const heroRest = new HeroRestController(stage, false);
      heroRestRef.current = heroRest;

      // If the pop-in finished before this effect ran, open now.
      if (introPendingRef.current) {
        heroRest.enter();
        introPendingRef.current = false;
      }

      return () => {
        heroRest.destroy();
        heroRestRef.current = null;
      };
    },
    { scope: stageRef },
  );

  return { stageRef, completeIntro };
}
