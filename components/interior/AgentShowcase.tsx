"use client";

import { useEffect, useRef, useState } from "react";
import { BENEFITS_AGENTS } from "@/components/sections/platform/benefitsAgents";
import { AgentRail } from "@/components/sections/platform/AgentRail";
import { AgentPhone } from "@/components/sections/platform/AgentPhone";
import { Eyebrow } from "@/components/interior/parts";

// Interactive concierge showcase — the same structure as the homepage employee
// Benefits half: pick an agent in the rail and the phone on the right swaps to
// that agent's thread (auto-advancing every 5s until the visitor takes over).
// Reuses AgentRail + AgentPhone + BENEFITS_AGENTS, wrapped in a white card for
// the /platform/for-employees page (the rail rests on the card's bottom edge).

const ROTATE_MS = 5000;

export function AgentShowcase() {
  const [selected, setSelected] = useState(BENEFITS_AGENTS[0].id);
  const [auto, setAuto] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const agent = BENEFITS_AGENTS.find((a) => a.id === selected) ?? BENEFITS_AGENTS[0];

  // A manual pick ends the auto-advance for good.
  const pick = (id: string) => {
    setAuto(false);
    setSelected(id);
  };

  // Cycle to the next agent every 5s while on screen (paused for reduced-motion
  // and once the user has taken over).
  useEffect(() => {
    if (!auto) return;
    const el = rootRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer: ReturnType<typeof setInterval> | null = null;
    const stop = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !timer) {
          timer = setInterval(() => {
            setSelected((cur) => {
              const i = BENEFITS_AGENTS.findIndex((a) => a.id === cur);
              return BENEFITS_AGENTS[(i + 1) % BENEFITS_AGENTS.length].id;
            });
          }, ROTATE_MS);
        } else if (!entries[0]?.isIntersecting) {
          stop();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      stop();
    };
  }, [auto]);

  return (
    <div
      ref={rootRef}
      className="overflow-hidden rounded-[28px] border border-hairline bg-white px-6 pt-10 sm:px-10 sm:pt-12 lg:px-12"
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_384px] lg:items-stretch lg:gap-16">
        {/* Copy + agent rail — the rail sinks to the card's bottom edge so the
            avatars stand on the floor line. */}
        <div className="flex flex-col">
          <Eyebrow>24/7 concierge</Eyebrow>
          <h2 className="mt-4 text-[32px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[40px]">
            Ask Spine anything.
          </h2>
          <p className="mt-3 max-w-[440px] text-[17px] leading-[1.55] text-body-2">
            AI answers in seconds; a real in-house team steps in when it matters.
            Pick an agent to see a real conversation.
          </p>
          <div className="mt-auto pt-14">
            <AgentRail agents={BENEFITS_AGENTS} selected={selected} onSelect={pick} />
          </div>
        </div>

        {/* The Spine app phone — follows the selected agent. */}
        <div className="mx-auto w-full max-w-[384px] lg:pb-12">
          <AgentPhone agent={agent} />
        </div>
      </div>
    </div>
  );
}
