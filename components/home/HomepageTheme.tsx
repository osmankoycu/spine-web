"use client";

import localFont from "next/font/local";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import styles from "./HomepageTheme.module.css";

const instrument = localFont({
  src: "../../public/fonts/instrument-sans/InstrumentSans-variable.ttf",
  variable: "--font-home",
  display: "swap",
  weight: "400 700",
  preload: false,
});

/** The visual trial includes homepage chrome, and never follows a link to another route. */
export function HomepageTheme({ children }: { children: ReactNode }) {
  const isHome = usePathname() === "/";
  return (
    <div className={isHome ? `${instrument.variable} ${styles.theme}` : undefined} data-homepage-theme={isHome || undefined}>
      {children}
    </div>
  );
}
