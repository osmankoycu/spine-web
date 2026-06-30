"use client";

import { useEffect, useRef } from "react";
import {
  BookOpen,
  ChartLineUp,
  Confetti,
  CurrencyDollar,
  DoorOpen,
  UserPlus,
  UsersThree,
  type Icon,
} from "@phosphor-icons/react";
import { gsap } from "@/lib/gsap";

type Chip = { label: string; Icon: Icon };

const CHIPS: Chip[] = [
  { label: "Recruiting", Icon: UserPlus },
  { label: "Performance reviews", Icon: ChartLineUp },
  { label: "Onboarding", Icon: DoorOpen },
  { label: "Employee relations", Icon: UsersThree },
  { label: "Handbook & policies", Icon: BookOpen },
  { label: "Comp strategy", Icon: CurrencyDollar },
  { label: "Culture & offsites", Icon: Confetti },
];

// The "Areas they cover" chips pop in one-by-one (fast staggered spring scale)
// when the card scrolls into view.
export function ChipCloud() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const chips = gsap.utils.toArray<HTMLElement>("[data-chip]", root);
    gsap.set(chips, { scale: 0.6, opacity: 0, transformOrigin: "50% 50%" });

    let played = false;
    const play = () => {
      if (played) return;
      played = true;
      gsap.to(chips, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "back.out(1.8)",
        stagger: 0.05,
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
    <div ref={ref} className="mt-5 flex flex-wrap gap-2.5">
      {CHIPS.map(({ label, Icon }) => (
        <span
          key={label}
          data-chip
          className="inline-flex items-center gap-2 rounded-pill border border-[#e7e7e3] bg-white px-4 py-2.5 text-[14px] font-semibold text-[#46463f]"
        >
          <Icon size={17} weight="duotone" className="text-orange" />
          {label}
        </span>
      ))}
    </div>
  );
}
