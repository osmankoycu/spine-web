"use client";

import { useState } from "react";
import { Plus } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

// Accordion FAQ. The container matches the flat FAQ card on the PEO exit guide
// (divide-y hairline rows in a rounded white card); each row collapses via the
// CSS-grid 0fr→1fr technique, so the global reduced-motion kill-switch in
// globals.css flattens the animation with no extra code here. Single-open:
// opening a row closes the previous one. Answers are ReactNode so an item can
// embed a link (the YC row points at /yc).
export function Faq({ items }: { items: { q: string; a: React.ReactNode }[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="divide-y divide-hairline overflow-hidden rounded-[24px] border border-hairline bg-white">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full cursor-pointer items-center justify-between gap-4 px-7 py-6 text-left"
            >
              <span className="text-[16.5px] font-extrabold tracking-[-0.01em] text-ink">
                {f.q}
              </span>
              <Plus
                size={18}
                weight="bold"
                className={cn(
                  "shrink-0 text-orange transition-transform duration-200",
                  isOpen && "rotate-45",
                )}
              />
            </button>
            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-300",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-7 pb-6 text-[14.5px] leading-[1.55] text-body-2">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
