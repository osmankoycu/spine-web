import { cn } from "@/lib/cn";
import { trustedLogos } from "./trustedLogos";

// Proof band right below the hero: four headline stats + a trusted-by logo row,
// in a fully-divided inset card. Two looks via `variant`:
//   "dark"  — charcoal fill, light hairline dividers (default)
//   "light" — white fill, outer + inner hairline STROKES only
const STATS: { value: string; label: string }[] = [
  { value: "3-in-1", label: "Benefits, compliance, people ops — one team" },
  { value: "25%", label: "Average reduction in healthcare costs" },
  { value: "24/7", label: "Employee support — in-house team + AI" },
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
    <section className="bg-bg px-4 py-20 sm:px-6 lg:px-8">
      {/* No padding on the card itself, so the dividers run edge-to-edge: the
          stats' vertical lines reach the card's top, the horizontal line below
          spans the full width — a fully divided grid. */}
      <div
        className={cn(
          "mx-auto max-w-[1480px] overflow-hidden rounded-[40px]",
          light ? "bg-white ring-1 ring-black/10" : "bg-[#1c1d22]",
        )}
      >
        {/* Stats — full-height vertical dividers (top of card → horizontal line) */}
        <div
          className={cn(
            "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:divide-x",
            light ? "md:divide-black/10" : "md:divide-white/10",
          )}
        >
          {STATS.map((s) => (
            <div key={s.value} className="px-8 py-14 lg:px-12 lg:py-16">
              <div className="font-display text-[64px] font-extrabold leading-none tracking-[-0.03em] text-orange lg:text-[76px]">
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
              light ? "text-black/40" : "text-white/40",
            )}
          >
            Trusted by ambitious tech companies
          </p>
          <div
            className={cn(
              "mt-10 flex flex-wrap items-center justify-center gap-x-14 gap-y-8",
              light ? "text-black/35" : "text-white/45",
            )}
          >
            {orderedLogos.map((logo) => (
              <span
                key={logo.label}
                role="img"
                aria-label={logo.label}
                style={{ height: LOGO_H * (LOGO_SCALE[logo.label] ?? 1) }}
                className={cn(
                  "block transition-colors [&>svg]:h-full [&>svg]:w-auto",
                  light ? "hover:text-black/60" : "hover:text-white/75",
                )}
                dangerouslySetInnerHTML={{ __html: logo.svg }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
