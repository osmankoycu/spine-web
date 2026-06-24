"use client";

import { useEffect } from "react";
import { getLenis } from "@/lib/lenis";

// Ensures the global Lenis instance exists for the app lifetime. The hero owns
// scroll while pinned (stop/start/scrollTo); the rest of the page rides Lenis's
// smoothing. Components access the instance directly via getLenis().
export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    getLenis(); // create + wire on mount (no-op under reduced motion)
  }, []);

  return <>{children}</>;
}
