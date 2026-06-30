// "Free hero" (design handoff Block 1): a centered statement block introducing
// the free-for-employers model. Neutral hex values come from the handoff; the
// active word uses our brand orange token. Schibsted Grotesk via font-display.

export function FreeHero() {
  return (
    <section className="bg-bg px-4 py-11 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-[820px] text-center">
        <p className="mb-[22px] text-[12px] font-bold uppercase tracking-[0.16em] text-orange">
          Free for employers · Paired support
        </p>

        <h1 className="font-display text-[40px] font-extrabold leading-[1.01] tracking-[-0.035em] text-[#15140f] sm:text-[52px] lg:text-[64px]">
          Spine is{" "}
          <span
            className="text-orange"
            style={{ borderBottom: "3px dotted #f4a072", paddingBottom: "2px" }}
          >
            free
          </span>{" "}
          for your company. Always.
        </h1>

        <p className="mx-auto mt-6 max-w-[640px] text-[17px] font-normal leading-[1.5] text-[#7c7c77] lg:text-[19px]">
          No setup fees. No admin fees. No per-employee charges. We get paid by
          carriers, just like every broker.
        </p>
      </div>
    </section>
  );
}
