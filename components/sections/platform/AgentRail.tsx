"use client";

import { cn } from "@/lib/cn";
import type { BenefitsAgent } from "./benefitsAgents";

// The row of five agent avatars under the employee copy. Each avatar stands on
// the section's floor line inside an overflow mask; on hover (or when selected)
// it lifts a few px — the mask clips the head-space above and the lift leaves a
// sliver of section-white below, so the character reads as hopping off the
// floor. The label pill fills teal for the selected agent. Picking one drives
// the phone on the right (handled by the parent).

export function AgentRail({
  agents,
  selected,
  onSelect,
}: {
  agents: BenefitsAgent[];
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    // Five equal tracks at 375px give each agent ~59px, but the pills size to
    // their content — so "Check Coverage" and "FightBack" spilled out of their
    // tracks and printed over each other, and the 112px avatars shrank to
    // thumbnails. Below sm this becomes a snap-scrolling rail at a legible
    // width; from sm up it's the original 5-up grid.
    // min-w-0 + w-full are load-bearing: without them the 552px of scroll
    // content wins the parent's automatic minimum size and stretches the whole
    // section past the viewport instead of scrolling inside this box.
    <div className="flex w-full min-w-0 snap-x snap-mandatory gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-5 sm:gap-3 sm:overflow-visible">
      {agents.map((agent) => {
        const active = agent.id === selected;
        return (
          <button
            key={agent.id}
            type="button"
            onClick={() => onSelect(agent.id)}
            aria-pressed={active}
            className="group flex w-[104px] shrink-0 cursor-pointer snap-start flex-col items-center focus:outline-none sm:w-auto sm:shrink"
          >
            <span
              className={cn(
                "flex h-[44px] w-full items-center justify-center whitespace-pre-line rounded-[12px] px-2.5 text-center text-[12.5px] font-bold leading-[1.15] transition-colors duration-200",
                active
                  ? "bg-aqua-400 text-white"
                  : "bg-aqua-100/60 text-aqua-400 group-hover:bg-aqua-100",
              )}
            >
              {agent.bubble}
            </span>

            {/* Avatar mask — its bottom edge sits ON the separator line. The
                selected agent rests fully on the line (translate-y-0); the
                others sink a little below it (masked away) and rise up to meet
                the line on hover. */}
            <span className="relative mt-3 block h-[132px] w-full overflow-hidden">
              <img
                src={`/agents/${agent.id}.png`}
                alt={agent.name}
                style={agent.railBottom ? { bottom: agent.railBottom } : undefined}
                className={cn(
                  "absolute inset-x-0 bottom-0 mx-auto w-[112px] max-w-full transition-transform duration-300 ease-out will-change-transform",
                  active ? "translate-y-0" : "translate-y-1.5 group-hover:translate-y-0",
                )}
              />
            </span>
          </button>
        );
      })}
    </div>
  );
}
