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
    <div className="grid grid-cols-5 gap-2 sm:gap-3">
      {agents.map((agent) => {
        const active = agent.id === selected;
        return (
          <button
            key={agent.id}
            type="button"
            onClick={() => onSelect(agent.id)}
            aria-pressed={active}
            className="group flex cursor-pointer flex-col items-center focus:outline-none"
          >
            <span
              className={cn(
                "flex h-[44px] items-center justify-center whitespace-pre-line rounded-[12px] px-2.5 text-center text-[12.5px] font-bold leading-[1.15] transition-colors duration-200",
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
