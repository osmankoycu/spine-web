"use client";

import { useState } from "react";
import { Check, DeviceMobile } from "@phosphor-icons/react/dist/ssr";
import { BENEFITS_AGENTS } from "./benefitsAgents";
import { AgentRail } from "./AgentRail";
import { AgentPhone } from "./AgentPhone";

// "For employees" half of the Benefits pillar. Left: the pitch, a feature card,
// and the agent rail. Right: the Heal-app phone. Selecting an agent in the rail
// swaps the phone to that agent (state lives here so both stay in sync).

type Feature = { title: string; sub: string };

const FEATURES: Feature[] = [
  { title: "The Heal app", sub: "Benefits, all in one place" },
  { title: "24/7 concierge", sub: "Real help, any hour" },
  { title: "Care navigation & bill defense", sub: "We dispute wrong bills" },
];

export function EmployeeBenefits() {
  const [selected, setSelected] = useState(BENEFITS_AGENTS[0].id);
  const agent = BENEFITS_AGENTS.find((a) => a.id === selected) ?? BENEFITS_AGENTS[0];

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_384px] lg:items-stretch lg:gap-12">
      {/* Left column */}
      <div className="flex flex-col">
        <p className="inline-flex w-fit items-center self-start rounded-full bg-orange/10 px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.16em] text-orange">
          01 · Benefits
        </p>
        <h2 className="font-display mt-7 text-[32px] font-extrabold leading-[1.02] tracking-[-0.03em] text-[#15140f] sm:text-[40px] lg:text-[44px]">
          Care your
          <br />
          <span className="text-aqua-500">team will love.</span>
        </h2>
        <p className="mt-3.5 max-w-[460px] text-[16px] leading-[1.5] text-[#7c7c77]">
          Every employee gets a 24/7 concierge in one app — to find the right
          care, get answers fast, and dispute wrong bills.
        </p>

        {/* For employees */}
        <div className="mt-8 flex items-center gap-2">
          <DeviceMobile size={20} weight="duotone" className="text-aqua-500" />
          <span className="text-[15px] font-extrabold text-[#15140f]">For employees</span>
        </div>

        {/* Feature card */}
        <div className="mt-4 grid gap-y-5 rounded-[20px] border border-aqua-200 bg-aqua-100/25 px-6 py-5 sm:grid-cols-3 sm:gap-x-6">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex items-start gap-2.5">
              <Check size={15} weight="bold" className="mt-[3px] shrink-0 text-aqua-500" />
              <div>
                <div className="text-[14px] font-bold text-[#15140f]">{f.title}</div>
                <div className="mt-0.5 text-[12.5px] leading-snug text-[#8a897f]">{f.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Agent rail — pinned to the bottom so it lines up with the phone floor */}
        <div className="mt-auto pt-12">
          <AgentRail agents={BENEFITS_AGENTS} selected={selected} onSelect={setSelected} />
        </div>
      </div>

      {/* Phone — centred when stacked (< lg); the grid cell at lg. The bottom
          padding keeps its floor off the separator by ~the block's top gap, so
          the phone sits with matching breathing room top and bottom while the
          avatars still rest on the line. */}
      <div className="mx-auto w-full max-w-[384px] lg:h-full lg:pb-8">
        <AgentPhone agent={agent} />
      </div>
    </div>
  );
}
