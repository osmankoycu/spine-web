"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "@phosphor-icons/react/dist/ssr";
import { BENEFITS_AGENTS } from "./benefitsAgents";
import { AgentRail } from "./AgentRail";
import { AgentPhone } from "./AgentPhone";

// "For employees" half of the Benefits pillar. Left: the pitch, a feature card,
// and the agent rail. Right: the Heal-app phone. Selecting an agent in the rail
// swaps the phone to that agent (state lives here so both stay in sync). Until
// the user picks one, the rail auto-advances through the agents every 5s.

type Feature = { title: string; sub: string };

const FEATURES: Feature[] = [
  {
    title: "The Heal app",
    sub: "Benefits, claims, ID cards, and coverage in one place.",
  },
  {
    title: "24/7 concierge",
    sub: "Get help anytime by chat or phone.",
  },
  {
    title: "Medical bill defense",
    sub: "Catch errors and negotiate medical bills.",
  },
];

const ROTATE_MS = 5000;

export function EmployeeBenefits() {
  const [selected, setSelected] = useState(BENEFITS_AGENTS[0].id);
  const [auto, setAuto] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const agent = BENEFITS_AGENTS.find((a) => a.id === selected) ?? BENEFITS_AGENTS[0];

  // A manual pick ends the auto-advance for good.
  const pick = (id: string) => {
    setAuto(false);
    setSelected(id);
  };

  // Cycle to the next agent every 5s while the rail is on screen — paused for
  // reduced-motion and once the user has taken over.
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
    // Stacked, the three blocks read copy → phone → agents, so the phone is on
    // screen before the rail and the rail lands on the card's bottom edge. At lg
    // the phone spans both rows on the left and the copy/rail stack on the
    // right, which is the original two-column layout.
    <div
      ref={rootRef}
      className="grid gap-10 sm:gap-15 lg:grid-cols-[384px_1fr] lg:grid-rows-[1fr_auto] lg:items-stretch lg:gap-x-18 lg:gap-y-0"
    >
      {/* Copy column */}
      {/* min-w-0: this is a grid item, so its automatic minimum size is its
          content — the agent rail's horizontal scroll strip would otherwise
          stretch this column to 552px and get clipped by the card's
          overflow-hidden instead of scrolling. */}
      <div className="order-1 flex min-w-0 flex-col lg:col-start-2 lg:row-start-1">
        <p className="inline-flex w-fit items-center self-start rounded-full bg-orange/10 px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.16em] text-orange">
          01 · Benefits <span className="ml-1 text-orange/50">/ Employees</span>
        </p>
        <h2 className="font-display mt-7 text-[32px] font-extrabold leading-[1.02] tracking-[-0.03em] text-[#15140f] sm:text-[40px] lg:text-[44px]">
          One place for every
          <br />
          <span className="text-aqua-500">healthcare question.</span>
        </h2>
        <p className="mt-3.5 max-w-[460px] text-[16px] leading-[1.5] text-[#7c7c77]">
          Every employee gets a 24/7 concierge to understand their benefits,
          find in-network providers, get answers fast, and negotiate medical
          bills.
        </p>

        {/* Feature card — outline only; three equal columns split by hairlines
            that sit exactly on the thirds (padding insets content, not the grid
            lines, so the dividers halve the gaps evenly). */}
        <div className="mt-9 grid gap-y-5 rounded-[20px] border border-[#e6e6e2] px-6 py-5 sm:grid-cols-3 sm:gap-y-0 sm:py-0 sm:divide-x sm:divide-[#e6e6e2]">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="flex items-start gap-2.5 sm:px-6 sm:py-5 sm:first:pl-0 sm:last:pr-0"
            >
              <Check size={15} weight="bold" className="mt-[3px] shrink-0 text-aqua-500" />
              <div>
                <div className="text-[14px] font-bold text-[#15140f]">{f.title}</div>
                <div className="mt-0.5 text-[12.5px] leading-snug text-[#8a897f]">{f.sub}</div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Phone — centred when stacked; LEFT cell at lg, spanning both rows. The
          bottom padding keeps its floor off the separator by ~the block's top
          gap, so the phone sits with matching breathing room top and bottom. */}
      <div className="order-2 mx-auto w-full max-w-[384px] lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:h-full lg:pb-8">
        <AgentPhone agent={agent} />
      </div>

      {/* Agent rail — last block stacked, so it lands flush on the card's bottom
          edge (the pillar sets no bottom padding); at lg it returns to the foot
          of the copy column, level with the phone's floor. The negative inline
          margins cancel the pillar's mobile side padding so the rail can scroll
          edge to edge instead of inside a 12px inset. */}
      <div className="order-3 -mx-3 min-w-0 px-3 sm:mx-0 sm:px-0 lg:col-start-2 lg:row-start-2 lg:mt-auto lg:pt-16">
        <AgentRail agents={BENEFITS_AGENTS} selected={selected} onSelect={pick} />
      </div>
    </div>
  );
}
