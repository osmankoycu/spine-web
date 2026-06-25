import { benefitsPage, type BenefitFeature } from "@/lib/hero/heroConfig";

// Display the illustrations at 1× their Figma node size; the PNGs are exported at
// 3× so they stay retina-crisp even at the hero's max canvas up-scale.
const ICON = 1.0;

function Feature({ f }: { f: BenefitFeature }) {
  // Icons TOP-align (the row is items-start) — the taller middle illustration
  // therefore reaches further down and pushes its own caption lower than the
  // shorter side ones, exactly like the Figma.
  return (
    <div className="flex w-[160px] flex-col items-center text-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={f.img}
        alt=""
        width={Math.round(f.w * ICON)}
        height={Math.round(f.h * ICON)}
        className="object-contain"
      />
      <h4 className="mt-5 font-display text-[16px] font-bold leading-[1.12] tracking-[-0.01em] text-[#0e1419]">
        {f.title}
      </h4>
      <p className="mt-1.5 text-[13.5px] leading-[1.35] text-[#3b424b]">{f.desc}</p>
    </div>
  );
}

function Column({ data }: { data: typeof benefitsPage.company }) {
  return (
    <div className="flex flex-1 flex-col items-center px-7 pt-9">
      <h3
        className="font-display text-[24px] font-bold tracking-[-0.2px]"
        style={{ color: data.color }}
      >
        {data.title}
      </h3>
      <div className="mt-7 flex w-full items-start justify-between">
        {data.features.map((f) => (
          <Feature key={f.title} f={f} />
        ))}
      </div>
    </div>
  );
}

/** BENEFITS-stop page content. Lives in the scaled hero canvas (inset-0, like
 *  HeadlineMorph) so it scales with everything else; hidden until the BENEFITS
 *  phase fades [data-benefits-content] in. The docked title, CTA and paging are
 *  rendered elsewhere and persist. */
export function BenefitsContent() {
  const { headline, subtitle, consultant, company, employees } = benefitsPage;
  return (
    <div
      data-benefits-content
      aria-hidden
      className="pointer-events-none absolute inset-0 z-20 opacity-0"
    >
      {/* Left — heading + subtitle. RIGHT-aligned, anchored just left of the
          consultant (Figma: items-end / text-right, 38px heading). */}
      <div className="absolute right-[820px] top-[150px] flex flex-col items-end text-right">
        <h2 className="font-display text-[38px] font-bold leading-[40px] tracking-[-0.18px] text-ink">
          {headline.map((line) => (
            <span key={line} className="block whitespace-nowrap">
              {line}
            </span>
          ))}
        </h2>
        <p className="mt-3 w-[375px] text-[15px] leading-[20px] tracking-[0.5px] text-grey-text">
          {subtitle}
        </p>
      </div>

      {/* Center — consultant illustration. z-10 lifts her ABOVE the card below so
          her hands overlap and appear to rest ON its top edge (she sits a touch
          lower so the wrists cross onto the card). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={consultant.img}
        alt=""
        width={317}
        height={286}
        className="absolute left-1/2 top-[90px] z-10 -translate-x-1/2"
      />

      {/* Right — consultant card */}
      <div className="absolute left-[804px] top-[166px] w-[290px]">
        <p className="text-[11px] font-semibold uppercase leading-none tracking-[1.1px] text-[#6c7682]">
          {consultant.eyebrow}
        </p>
        <p className="mt-3 font-display text-[18px] font-bold tracking-[-0.16px] text-[#0e1419]">
          {consultant.name}
        </p>
        <p className="mt-1 text-[13px] text-[#3b424b]">{consultant.role}</p>
        <span className="mt-3.5 inline-flex rounded-pill bg-black px-[9px] py-[4px] text-[11px] font-bold uppercase tracking-[0.66px] text-white">
          {consultant.badge}
        </span>
      </div>

      {/* Bottom — two-column feature card */}
      <div className="absolute inset-x-[16px] bottom-[6px] top-[360px] flex rounded-[28px] bg-white ring-1 ring-black/[0.06]">
        <Column data={company} />
        <div className="w-px self-stretch bg-black/[0.07]" />
        <Column data={employees} />
      </div>
    </div>
  );
}
