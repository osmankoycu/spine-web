import { trustedLogos } from "./trustedLogos";

// Proof band right below the hero: a strong, inset BLACK card holding the four
// headline stats, then the "trusted by" logo row. Brand orange numbers on black
// for maximum punch. Content adapted from the reference (brand = Spine, our
// colours); logos are text wordmarks for now — swap in real marks later.

const STATS: { value: string; label: string }[] = [
  { value: "3-in-1", label: "Benefits, compliance, people ops — one team" },
  { value: "25%", label: "Average reduction in healthcare costs" },
  { value: "24/7", label: "Employee support — in-house team + AI" },
  { value: "$0", label: "Cost to your company. Free, always." },
];

// Optical size tuning — equal heights don't read as equal weight, so nudge a few
// per-logo (base row height × factor). fal's compact mark needs to be a touch
// larger; Firefly's wide wordmark a touch smaller.
const LOGO_H = 26;
const LOGO_SCALE: Record<string, number> = {
  fal: 1.18,
  Firefly: 0.88,
};

// Display order — fal sits in the middle of the row.
const LOGO_ORDER = ["HockeyStack", "Firefly", "fal", "Maven", "Merge", "Billups"];
const orderedLogos = [...trustedLogos].sort(
  (a, b) => LOGO_ORDER.indexOf(a.label) - LOGO_ORDER.indexOf(b.label),
);

export function StatsBand() {
  return (
    <section className="bg-bg px-4 py-20 sm:px-6 lg:px-8">
      {/* No padding on the card itself, so the dividers run edge-to-edge: the
          stats' vertical lines reach the card's top, and the horizontal line
          below them spans the full width — a fully divided grid. */}
      <div className="mx-auto max-w-[1480px] overflow-hidden rounded-[40px] bg-[#1c1d22]">
        {/* Stats — full-height vertical dividers (top of card → horizontal line) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:divide-x md:divide-white/10">
          {STATS.map((s) => (
            <div key={s.value} className="px-8 py-14 lg:px-12 lg:py-16">
              <div className="font-display text-[64px] font-extrabold leading-none tracking-[-0.03em] text-orange lg:text-[76px]">
                {s.value}
              </div>
              <p className="mt-5 max-w-[230px] text-[16px] leading-snug text-white/55">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Trusted by — full-width horizontal divider above */}
        <div className="border-t border-white/10 px-8 py-12 text-center lg:px-16">
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-white/40">
            Trusted by ambitious tech companies
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-14 gap-y-8 text-white/45">
            {orderedLogos.map((logo) => (
              <span
                key={logo.label}
                role="img"
                aria-label={logo.label}
                style={{ height: LOGO_H * (LOGO_SCALE[logo.label] ?? 1) }}
                className="block transition-colors hover:text-white/75 [&>svg]:h-full [&>svg]:w-auto"
                dangerouslySetInnerHTML={{ __html: logo.svg }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
