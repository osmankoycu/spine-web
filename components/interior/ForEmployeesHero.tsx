"use client";

import { useEffect, useRef, useState } from "react";
import { BENEFITS_AGENTS } from "@/components/sections/platform/benefitsAgents";
import { AgentRail } from "@/components/sections/platform/AgentRail";
import { AgentPhone } from "@/components/sections/platform/AgentPhone";
import { Button, CheckRow, Eyebrow } from "@/components/interior/parts";

// The /platform/for-employees HERO — the interactive concierge showcase from the
// homepage, placed above the fold (the first thing the visitor sees). Left: the
// page copy + the agent rail; right: the phone that follows the picked agent.
// Shared selection state + 5s auto-advance until the visitor takes over. The rail
// sinks to the hero's bottom edge so the avatars stand on the floor line.

const ROTATE_MS = 5000;

export function ForEmployeesHero() {
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
  // and once the visitor has taken over).
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
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      stop();
    };
  }, [auto]);

  return (
    <section className="bg-white">
      <div
        ref={rootRef}
        className="mx-auto w-full max-w-[1480px] px-9 pt-[140px] sm:px-[52px] lg:px-[60px]"
      >
        <div className="grid gap-12 lg:grid-cols-[1fr_400px] lg:items-stretch lg:gap-16">
          {/* Copy + agent rail (rail sinks to the hero's bottom edge). */}
          <div className="flex flex-col pb-12 lg:pb-0">
            <Eyebrow>For employees</Eyebrow>
            <h1 className="mb-5 mt-4 text-[40px] font-extrabold leading-[1.0] tracking-[-0.035em] sm:text-[48px] lg:text-[56px]">
              <span className="text-ink">One place for every</span>
              <br />
              <span className="text-orange">healthcare question.</span>
            </h1>
            <p className="mb-7 max-w-[500px] text-[17px] leading-[1.5] text-body">
              Every employee on a Spine plan gets a 24/7 concierge — AI plus a real
              in-house team — to find care, cut prescription costs, and fight wrong
              medical bills.
            </p>
            <div className="mb-6 flex flex-wrap gap-3">
              <Button cta={{ label: "Request a demo", href: "#demo" }} arrow />
              <Button cta={{ label: "See the platform", href: "/" }} variant="secondary" />
            </div>
            <CheckRow items={["Live for all employees", "iOS + Android", "24/7 team + AI"]} />

            <div className="mt-auto pt-12">
              <p className="mb-4 text-[13px] font-semibold text-subline">
                Meet the concierge — tap an agent:
              </p>
              <AgentRail agents={BENEFITS_AGENTS} selected={selected} onSelect={pick} />
            </div>
          </div>

          {/* The Spine app phone — follows the selected agent. */}
          <div className="mx-auto w-full max-w-[400px] lg:pb-12">
            <AgentPhone agent={agent} />
          </div>
        </div>
      </div>
    </section>
  );
}
