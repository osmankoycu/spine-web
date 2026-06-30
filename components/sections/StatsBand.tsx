import { cn } from "@/lib/cn";
import { trustedLogos } from "./trustedLogos";

// Proof band right below the hero: a rounded white BOX holding four headline
// stats (each topped by a short orange accent bar) + a trusted-by logo row spread
// across the full width. Separators are INSET (they don't touch the box edges).
// `variant`: light (white) or dark (charcoal).
const STATS: { value: string; label: string }[] = [
  { value: "3-in-1", label: "Benefits, compliance, people ops, one team" },
  { value: "25%", label: "Average reduction in healthcare costs" },
  { value: "24/7", label: "Employee support, in-house team + AI" },
  { value: "$0", label: "Cost to your company. Free, always." },
];

// Optical size tuning — equal heights don't read as equal weight; nudge a few.
const LOGO_H = 26;
const LOGO_SCALE: Record<string, number> = { fal: 1.18, Firefly: 0.88 };

// Display order — fal centred, Billups last.
const LOGO_ORDER = ["HockeyStack", "Firefly", "fal", "Maven", "Merge", "Billups"];
const orderedLogos = [...trustedLogos].sort(
  (a, b) => LOGO_ORDER.indexOf(a.label) - LOGO_ORDER.indexOf(b.label),
);

export function StatsBand({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const light = variant === "light";
  const divider = light ? "bg-grey-pill" : "bg-white/12";
  return (
    <section className="bg-bg px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      {/* Rounded box with inner padding — separators sit inset from its edges. */}
      <div
        className={cn(
          "mx-auto max-w-[1480px] rounded-[40px] px-6 py-10 sm:px-8 sm:py-12 lg:px-8 lg:py-14",
          light ? "bg-white ring-1 ring-grey-pill" : "bg-[#1c1d22]",
        )}
      >
        {/* Stats */}
        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-4",
            "divide-y md:divide-y-0",
            light ? "divide-grey-pill" : "divide-white/12",
          )}
        >
          {STATS.map((s, i) => (
            <div key={s.value} className="relative px-0 py-7 first:pt-0 last:pb-0 md:px-4 md:py-2 lg:px-6">
              {/* inset vertical divider between columns (md+) — not edge-to-edge */}
              {i > 0 ? (
                <span
                  aria-hidden
                  className={cn("pointer-events-none absolute inset-y-2 left-0 hidden w-px md:block", divider)}
                />
              ) : null}
              <div className="h-1 w-7 rounded-full bg-orange" />
              <div
                className={cn(
                  "mt-5 font-display text-[40px] font-extrabold leading-none tracking-[-0.03em] sm:text-[48px] lg:text-[56px]",
                  light ? "text-ink" : "text-white",
                )}
              >
                {s.value}
              </div>
              <p
                className={cn(
                  "mt-4 max-w-[220px] text-[15px] font-normal leading-snug",
                  light ? "text-grey-text" : "text-white/55",
                )}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Inset horizontal divider */}
        <div className={cn("mt-6 h-px md:mx-4 lg:mx-6", divider)} aria-hidden />

        {/* Trusted by */}
        <div className="pt-11 text-center md:px-4 lg:px-6">
          <p
            className={cn(
              "text-[12px] font-medium uppercase tracking-[0.22em]",
              light ? "text-grey-text" : "text-white/40",
            )}
          >
            Trusted by ambitious tech companies
          </p>
          <div
            className={cn(
              "mt-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-7",
              light ? "text-grey-word" : "text-white/45",
            )}
          >
            {orderedLogos.map((logo) => (
              <span
                key={logo.label}
                role="img"
                aria-label={logo.label}
                style={{ height: LOGO_H * (LOGO_SCALE[logo.label] ?? 1) }}
                className="block [&>svg]:h-full [&>svg]:w-auto"
                dangerouslySetInnerHTML={{ __html: logo.svg }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
