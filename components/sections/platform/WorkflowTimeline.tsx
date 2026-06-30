"use client";

import { useEffect, useRef } from "react";
import {
  ClipboardText,
  CurrencyCircleDollar,
  SignOut,
  UserPlus,
} from "@phosphor-icons/react/dist/ssr";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/cn";

type WorkflowStep = {
  icon: typeof UserPlus;
  actor: "You" | "Spine";
  title: string;
  sub?: string;
};

const workflow: WorkflowStep[] = [
  { icon: UserPlus, actor: "You", title: "Make the hire" },
  {
    icon: ClipboardText,
    actor: "Spine",
    title: "Onboards day one",
    sub: "I-9, E-Verify, enrollment",
  },
  {
    icon: CurrencyCircleDollar,
    actor: "Spine",
    title: "Runs payroll every cycle",
    sub: "Processing, tax filings, reconciliation",
  },
  {
    icon: SignOut,
    actor: "Spine",
    title: "Handles offboarding",
    sub: "Final pay, COBRA, records",
  },
];

// Draws the workflow timeline top-to-bottom when it scrolls into view: each step
// pops its icon, fades in its text, then the connector line grows down to the
// next step — telling the sequence.
export function WorkflowTimeline() {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const icons = gsap.utils.toArray<HTMLElement>("[data-tl-icon]", root);
    const texts = gsap.utils.toArray<HTMLElement>("[data-tl-text]", root);
    const lines = gsap.utils.toArray<HTMLElement>("[data-tl-line]", root);
    gsap.set(icons, { opacity: 0, scale: 0.5 });
    gsap.set(texts, { opacity: 0, y: 6 });
    gsap.set(lines, { scaleY: 0, transformOrigin: "50% 0%" });

    let played = false;
    const play = () => {
      if (played) return;
      played = true;
      const tl = gsap.timeline();
      icons.forEach((icon, i) => {
        tl.to(icon, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" });
        tl.to(texts[i], { opacity: 1, y: 0, duration: 0.28, ease: "power2.out" }, "-=0.12");
        if (lines[i]) {
          tl.to(lines[i], { scaleY: 1, duration: 0.3, ease: "power1.inOut" }, "-=0.04");
        }
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          play();
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: "-30% 0px -30% 0px" },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <ol ref={ref} className="mt-7">
      {workflow.map((step, i) => {
        const Glyph = step.icon;
        const isLast = i === workflow.length - 1;
        return (
          <li key={step.title} className={cn("flex items-start gap-4", i === 0 && "mt-auto")}>
            <div className="flex flex-none flex-col items-center self-stretch">
              <span
                data-tl-icon
                className="grid size-11 flex-none place-items-center rounded-[14px] bg-orange/[0.07]"
              >
                <Glyph size={22} weight="duotone" className="text-orange" />
              </span>
              {!isLast && <span data-tl-line className="w-0.5 min-h-[22px] flex-1 bg-[#ededea]" />}
            </div>
            <div data-tl-text className={cn(!isLast && "pb-[22px]")}>
              <div
                className={cn(
                  "text-[11px] font-bold uppercase tracking-[0.08em]",
                  step.actor === "You" ? "text-[#b0afa9]" : "text-orange",
                )}
              >
                {step.actor}
              </div>
              <div className="mt-0.5 text-[16px] font-extrabold tracking-[-0.01em] text-[#15140f]">
                {step.title}
              </div>
              {step.sub && <div className="mt-0.5 text-[13px] text-[#86857e]">{step.sub}</div>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
