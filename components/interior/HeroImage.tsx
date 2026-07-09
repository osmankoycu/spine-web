"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

// Hero image that fades in the moment it finishes loading (instead of popping in
// abruptly). Handles cached images too — if the <img> is already complete before
// React attaches, we flip to loaded on mount. Under reduced motion the global
// CSS rule collapses the transition to ~0, so it just appears.
export function HeroImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (ref.current?.complete) setLoaded(true);
  }, []);

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      onLoad={() => setLoaded(true)}
      className={cn(
        "absolute inset-0 size-full object-cover transition-opacity delay-300 duration-[900ms] ease-out",
        loaded ? "opacity-100" : "opacity-0",
      )}
    />
  );
}
