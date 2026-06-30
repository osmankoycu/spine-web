"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

// Wraps a UI mockup so it rises slightly from below with a faint scale-up + fade
// when it scrolls into view (once). Children are server-rendered and passed
// through untouched. Reduced motion shows the final state immediately.
export function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.set(el, { opacity: 0, y: 22, scale: 0.97, transformOrigin: "50% 60%" });

    let played = false;
    const play = () => {
      if (played) return;
      played = true;
      gsap.to(el, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out" });
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          play();
          io.disconnect();
        }
      },
      // Fire once the element reaches the vertical centre of the viewport.
      { threshold: 0, rootMargin: "-30% 0px -30% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
