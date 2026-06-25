"use client";

import { useCallback, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import { prefersReducedMotion } from "@/lib/reducedMotion";
import { SceneController, type SceneRefs } from "./SceneController";
import { HeroRestController } from "./HeroRestController";
import { StatsController } from "./StatsController";
import { BenefitsController } from "./BenefitsController";
import { SEGMENTS } from "./phases";
import type { PhaseId } from "./types";

// Real, in-place master timeline (no carousel). Slaved to scroll progress;
// total duration = SEGMENTS so each segment occupies one progress quarter.
// Segment 0 (HERO_REST → STATS): a subset of pills MORPH into the stat/decor
// circles (StatsController), the rest pop down, the subtitle fades, and the
// rotating headline cross-resolves into the 4-line block. Scrubbed → reverses
// for free on scroll-back.
function buildHeroMaster(
  master: gsap.core.Timeline,
  refs: SceneRefs,
  stats: StatsController,
  benefits: BenefitsController,
): void {
  const { stage } = refs;
  const pills = gsap.utils.toArray<HTMLElement>("[data-tag]", stage);
  const subtitle = stage.querySelector<HTMLElement>("[data-subtitle]");
  const headline = stage.querySelector<HTMLElement>("[data-headline]");
  const hStats = stage.querySelector<HTMLElement>("[data-h-stats]");
  const cta = stage.querySelector<HTMLElement>("[data-cta]");

  // Carriers travel + grow into circles; everyone else pops down.
  stats.measureTargets();
  const carriers = new Set(stats.carrierEls());
  const poppers = pills.filter((p) => !carriers.has(p));

  // SEQUENCED so the morphing circles never overlap the vanishing pills:
  // FIRST the field clears FAST (poppers + subtitle + old headline, 0→0.28),
  // THEN the carriers morph into circles in the cleared space (from 0.28). On
  // scroll-back the timeline reverses → the circles un-morph first and the pills
  // reappear last, so there's no overlap either direction.
  master.to(
    poppers,
    {
      scale: 0,
      opacity: 0,
      ease: "power2.in",
      duration: 0.28,
      immediateRender: false,
      stagger: { each: 0.004, from: "random" },
    },
    0,
  );
  if (subtitle) {
    master.to(
      subtitle,
      { opacity: 0, y: -10, duration: 0.3, ease: "power2.in", immediateRender: false },
      0,
    );
  }
  if (headline) {
    master.to(
      headline,
      { opacity: 0, y: -12, duration: 0.3, ease: "power2.in", immediateRender: false },
      0,
    );
  }

  const MORPH_AT = 0.28; // morph starts only once the field has cleared
  stats.buildSegment(master, MORPH_AT);
  // The persistent 4-line STATS headline rises in as the morph runs.
  if (hStats) {
    master.fromTo(
      hStats,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", immediateRender: false },
      MORPH_AT + 0.05,
    );
  }
  // CTA stays, but drops clear of the taller 4-line headline (Figma slot).
  if (cta) {
    master.to(
      cta,
      { y: 92, duration: 0.5, ease: "power2.inOut", immediateRender: false },
      MORPH_AT,
    );
  }

  // Segment 1 (STATS → BENEFITS): the 3 words travel up + shrink into the top
  // line (2 recolour grey), circles pop down, "one team" + CTA leave.
  benefits.measureTargets();
  benefits.buildSegment(master, 1);

  // Segments 2 + 3 (BENEFITS → COMPLIANCE → PEOPLE_OPS): the docked line holds;
  // only the ACTIVE (orange) word shifts along it.
  benefits.setActiveWord(master, 2, 0, 1); // Benefits → Compliance active
  benefits.fadeOutContent(master, 2); // BENEFITS page content leaves with it
  benefits.setActiveWord(master, 3, 1, 2); // Compliance → People ops active

  // Pin the master to its full SEGMENTS duration (the colour swaps finish early).
  master.to({ _: 0 }, { _: 1, duration: SEGMENTS - 2 }, 2);
}

export function useHeroScene() {
  const stageRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<SceneController | null>(null);
  const heroRestRef = useRef<HeroRestController | null>(null);
  const statsRef = useRef<StatsController | null>(null);
  const benefitsRef = useRef<BenefitsController | null>(null);
  const introPendingRef = useRef(false);

  const [phase, setPhase] = useState<PhaseId>("INTRO");
  const [stopIndex, setStopIndex] = useState(0);
  const [locked, setLocked] = useState(false);

  // Called by TagField when the INTRO pop-in finishes.
  const completeIntro = useCallback(() => {
    if (sceneRef.current) {
      sceneRef.current.completeIntro();
      heroRestRef.current?.enter();
    } else {
      introPendingRef.current = true;
    }
  }, []);

  useGSAP(
    () => {
      const stage = stageRef.current;
      if (!stage) return;

      // Reduced motion: render the resting HERO_REST state statically (no pin).
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
      const stats = new StatsController(stage);
      statsRef.current = stats;
      const benefits = new BenefitsController(stage, stats);
      benefitsRef.current = benefits;

      const scene = new SceneController({
        refs: { stage },
        lenis: getLenis(),
        buildMaster: (m, r) => buildHeroMaster(m, r, stats, benefits),
        onPhaseChange: (p, i) => {
          setPhase(p);
          setStopIndex(i);
          heroRest.onPhase(p);
          stats.onPhase(p);
        },
        onTransitionStart: () => {
          // Hand the field to the master BEFORE it scrubs: stop the physics so it
          // stops fighting the morph's writes (and so the morph's function-from
          // captures the pills' true resting offset → no snap-to-home jump). Also
          // halt the STATS circle drift here so the reverse morph glides straight
          // home instead of chasing the drift offset and snapping at the end.
          heroRest.freezeField();
          stats.stopDrift();
        },
        onLockChange: setLocked,
      });
      sceneRef.current = scene;
      scene.init();

      if (introPendingRef.current) {
        scene.completeIntro();
        heroRest.enter();
        introPendingRef.current = false;
      }

      return () => {
        scene.destroy();
        heroRest.destroy();
        stats.destroy();
        benefits.destroy();
        sceneRef.current = null;
        heroRestRef.current = null;
        statsRef.current = null;
        benefitsRef.current = null;
      };
    },
    { scope: stageRef },
  );

  return { stageRef, phase, stopIndex, locked, completeIntro };
}
