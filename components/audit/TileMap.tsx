"use client";

import { US_STATES } from "@/lib/audit/usStates";

// Tile-grid US map (the classic 11×8 square layout, data-driven from
// usStates.ts). Reads more tool-like than a geographic SVG and costs ~1KB.
// Active tiles carry data-audit-tile="active" so ParseTheater can stagger them
// in with GSAP.

export function TileMap({ active }: { active: Record<string, number> }) {
  return (
    <div
      className="grid gap-[3px]"
      style={{ gridTemplateColumns: "repeat(11, minmax(0, 1fr))" }}
      role="img"
      aria-label={`Employees in ${Object.keys(active).length} states`}
    >
      {US_STATES.map((s) => {
        const isActive = (active[s.code] ?? 0) > 0;
        return (
          <span
            key={s.code}
            data-audit-tile={isActive ? "active" : undefined}
            title={isActive ? `${s.name}: ${active[s.code]}` : s.name}
            className={`grid aspect-square place-items-center rounded-[4px] text-[8px] font-bold leading-none ${
              isActive ? "bg-orange text-white" : "bg-grey-pill/55 text-muted"
            }`}
            style={{ gridColumnStart: s.gridCol, gridRowStart: s.gridRow }}
          >
            {s.code}
          </span>
        );
      })}
    </div>
  );
}
