import { trustedLogos } from "./trustedLogos";

// Proof band (handoff Block 0): a white rounded card — four headline metrics,
// each topped by an orange accent bar and divided by hairline borders, over a
// full-width trusted-by logo row. Styling is from the handoff; the logos are OUR
// real extracted SVG marks (kept muted), not the handoff's text placeholders.
const STATS: { value: string; caption: string }[] = [
  { value: "3-in-1", caption: "Benefits, compliance, people ops, one team" },
  { value: "25%", caption: "Average reduction in healthcare costs" },
  { value: "24/7", caption: "Employee support, in-house team + AI" },
  { value: "$0", caption: "Cost to your company. Free, always." },
];

// Optical size tuning — equal heights don't read as equal weight; nudge a few.
const LOGO_H = 26;
const LOGO_SCALE: Record<string, number> = { fal: 1.18, Firefly: 0.88 };

// Display order — fal centred, Billups last.
const LOGO_ORDER = ["HockeyStack", "Firefly", "fal", "Maven", "Merge", "Billups"];
const orderedLogos = [...trustedLogos].sort(
  (a, b) => LOGO_ORDER.indexOf(a.label) - LOGO_ORDER.indexOf(b.label),
);

export function StatsBand() {
  return (
    <section className="bg-bg px-4 py-11 sm:px-6 lg:px-8 lg:py-14">
      <div className="relative z-10 mx-auto max-w-[1200px] overflow-hidden rounded-[32px] border border-[#ededea] bg-white px-7 pb-9 pt-10 shadow-[0_1px_0_rgba(0,0,0,0.02),0_40px_80px_-48px_rgba(20,20,18,0.2)] sm:px-10 sm:pb-11 sm:pt-12 lg:px-[60px] lg:pb-[52px] lg:pt-[56px]">
        {/* Stats */}
        <div className="grid grid-cols-1 divide-y divide-[#ededea] sm:grid-cols-2 md:grid-cols-4 md:divide-y-0">
          {STATS.map((s) => (
            <div
              key={s.value}
              className="px-0 py-8 first:pt-0 last:pb-0 sm:px-9 sm:py-0 md:first:pl-0 md:last:pr-0 md:[&:not(:last-child)]:border-r md:[&:not(:last-child)]:border-[#ededea]"
            >
              <div className="h-1 w-[30px] rounded-[2px] bg-orange" />
              <div className="mt-[22px] font-display text-[44px] font-extrabold leading-[0.95] tracking-[-0.04em] text-[#15140f] sm:text-[54px] lg:text-[64px]">
                {s.value}
              </div>
              <p className="mt-[18px] max-w-[200px] text-[15px] font-medium leading-[1.45] text-[#86857e]">
                {s.caption}
              </p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mb-10 mt-[52px] h-px bg-[#ededea]" />

        {/* Trusted by */}
        <p className="mb-8 text-center text-[12px] font-bold uppercase tracking-[0.18em] text-[#a9a9a3]">
          Trusted by ambitious tech companies
        </p>
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-7 text-[#c2c2bc]">
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
    </section>
  );
}
