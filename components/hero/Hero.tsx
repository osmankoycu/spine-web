"use client";

import { useHeroScene } from "@/lib/hero/useSceneController";
import { TagField } from "./TagField";
import { HeadlineMorph } from "./HeadlineMorph";
import { STOPS } from "@/lib/hero/types";
import { cn } from "@/lib/cn";

export function Hero() {
  const { stageRef, phase, stopIndex, locked, completeIntro } = useHeroScene();

  return (
    <section aria-label="Spine hero" className="relative">
      {/* One pinned, full-viewport stage. Everything morphs IN PLACE here. */}
      <div
        ref={stageRef}
        className="relative h-screen w-full overflow-hidden bg-bg"
      >
        {/* Tag field — INTRO pop-in, then clears the center in HERO_REST and
            pops down in place on first scroll. */}
        <TagField onIntroComplete={completeIntro} className="absolute inset-0 z-10" />

        {/* Center content — headline (rotating word), subtitle, CTA. Persistent
            morph elements; popped in on HERO_REST entry. */}
        <HeadlineMorph />

        {/* Review HUD (not part of the final design). */}
        <div className="pointer-events-none absolute inset-x-0 bottom-10 z-30 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2.5">
            {STOPS.map((stop, i) => (
              <span
                key={stop}
                className={cn(
                  "h-2 rounded-pill transition-all duration-300",
                  i === stopIndex
                    ? "w-7 bg-orange"
                    : i < stopIndex
                      ? "w-2 bg-ink/40"
                      : "w-2 bg-ink/15",
                )}
              />
            ))}
          </div>
          <p className="text-xs text-grey-text">
            {phase === "INTRO" ? (
              <span className="text-ink/70">INTRO — tags popping in…</span>
            ) : locked ? (
              <span className="font-medium text-orange">● transition locked…</span>
            ) : (
              <>
                <span className="font-medium text-ink/80">{phase}</span> — scroll
                / swipe / ↓ to advance · one phase per input
              </>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
