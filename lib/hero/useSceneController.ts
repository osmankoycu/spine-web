"use client";

import { useCallback, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import { prefersReducedMotion } from "@/lib/reducedMotion";
import { SceneController, type SceneRefs } from "./SceneController";
import { HeroRestController } from "./HeroRestController";
import { SEGMENTS } from "./phases";
import type { PhaseId } from "./types";

// Real, in-place master timeline (no carousel). Slaved to scroll progress;
// total duration = SEGMENTS so each segment occupies one progress quarter.
// Segment 0 (HERO_REST → STATS): tags pop down in place + subtitle fades out.
// The headline three-word morph + stat circles land in step 6 (the pad below).
function buildHeroMaster(master: gsap.core.Timeline, refs: SceneRefs): void {
  const { stage } = refs;
  const pills = gsap.utils.toArray<HTMLElement>("[data-tag]", stage);
  const subtitle = stage.querySelector<HTMLElement>("[data-subtitle]");

  // Duration + stagger must finish within the segment (master time 0→1) so the
  // tags are fully gone at the STATS snap point (last pill: 0.25 + 0.55 < 1).
  master.to(
    pills,
    {
      scale: 0,
      opacity: 0,
      ease: "power2.in",
      duration: 0.55,
      immediateRender: false,
      stagger: { each: 0.006, from: "random" },
    },
    0,
  );
  if (subtitle) {
    master.to(
      subtitle,
      { opacity: 0, y: -10, duration: 0.6, ease: "power2.in", immediateRender: false },
      0,
    );
  }

  // Segments 1..3 — placeholder hold (real BENEFITS/COMPLIANCE/PEOPLE_OPS land later).
  master.to({ _: 0 }, { _: 1, duration: SEGMENTS - 1 }, 1);
}

export function useHeroScene() {
  const stageRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<SceneController | null>(null);
  const heroRestRef = useRef<HeroRestController | null>(null);
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

      const scene = new SceneController({
        refs: { stage },
        lenis: getLenis(),
        buildMaster: buildHeroMaster,
        onPhaseChange: (p, i) => {
          setPhase(p);
          setStopIndex(i);
          heroRest.onPhase(p);
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
        sceneRef.current = null;
        heroRestRef.current = null;
      };
    },
    { scope: stageRef },
  );

  return { stageRef, phase, stopIndex, locked, completeIntro };
}
