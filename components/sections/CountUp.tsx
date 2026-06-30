"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

// Counts 0 → `to` quickly when it scrolls to the viewport centre. SSR renders the
// final value; reduced motion keeps it.
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 0.8,
  className,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.textContent = `${prefix}0${suffix}`;
    let played = false;
    const play = () => {
      if (played) return;
      played = true;
      const obj = { v: 0 };
      gsap.to(obj, {
        v: to,
        duration,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = `${prefix}${Math.round(obj.v)}${suffix}`;
        },
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
    io.observe(el);
    return () => io.disconnect();
  }, [to, prefix, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {to}
      {suffix}
    </span>
  );
}
