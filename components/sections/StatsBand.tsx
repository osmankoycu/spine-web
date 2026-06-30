import { cn } from "@/lib/cn";
import { trustedLogos } from "./trustedLogos";

// Proof band right below the hero: four headline stats + a trusted-by logo row,
// in a fully-divided inset card. Two looks via `variant`:
//   "dark"  — charcoal fill, light hairline dividers (default)
//   "light" — white fill, outer + inner hairline STROKES only
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
  return (
    <section className="bg-bg px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      {/* No padding on the card itself, so the dividers run edge-to-edge: the
          stats' vertical lines reach the card's top, the horizontal line below
          spans the full width — a fully divided grid. */}
      <div
        className={cn(
          "mx-auto max-w-[1480px] overflow-hidden rounded-[40px]",
          light ? "bg-transparent ring-1 ring-grey-pill" : "bg-[#1c1d22]",
        )}
      >
        {/* Stats — full-height vertical dividers (top of card → horizontal line) */}
        <div
          className={cn(
            "grid grid-cols-1 divide-y sm:grid-cols-2 md:grid-cols-4 md:divide-x md:divide-y-0",
            light ? "divide-grey-pill md:divide-grey-pill" : "divide-white/10 md:divide-white/10",
          )}
        >
          {STATS.map((s) => (
            <div key={s.value} className="px-7 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-16">
              <div className="font-display text-[40px] font-extrabold leading-none tracking-[-0.03em] text-ink sm:text-[50px] lg:text-[60px]">
                {s.value}
              </div>
              <p
                className={cn(
                  "mt-5 max-w-[230px] text-[16px] leading-snug",
                  light ? "text-grey-text" : "text-white/55",
                )}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Trusted by — full-width horizontal divider above */}
        <div
          className={cn(
            "border-t px-8 py-12 text-center lg:px-16",
            light ? "border-black/10" : "border-white/10",
          )}
        >
          <p
            className={cn(
              "text-[12px] font-semibold uppercase tracking-[0.22em]",
              light ? "text-grey-text" : "text-white/40",
            )}
          >
            Trusted by ambitious tech companies
          </p>
          <div
            className={cn(
              "mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-7 sm:gap-x-12 lg:gap-x-14",
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
