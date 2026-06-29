import { Hero } from "@/components/hero/Hero";

export default function Home() {
  return (
    <main>
      {/* Full-screen hero: INTRO tag pop-in + HERO_REST opening play on load.
          Scroll past it normally into the rest of the page. */}
      <Hero />

      {/* Rest-of-page — ordinary (Lenis-smoothed) scroll. Stub sections;
          real marketing content comes later. */}
      <section className="page-gutter py-32">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-grey-text">
          Below the hero
        </p>
        <h2 className="font-display mt-4 max-w-2xl text-balance text-4xl font-bold leading-tight text-ink">
          The rest of the homepage scrolls normally from here.
        </h2>
        <p className="mt-5 max-w-xl text-grey-text">
          The hero stays one full screen at the top; the standard marketing
          sections take over below it with native (Lenis-smoothed) scrolling.
          These blocks are placeholders for that content.
        </p>
      </section>

      <section className="page-gutter border-t border-black/5 py-32">
        <div className="grid gap-6 md:grid-cols-3">
          {["Benefits", "Compliance", "People ops"].map((t) => (
            <div
              key={t}
              className="rounded-3xl bg-white/60 p-8 shadow-[0_1px_0_rgba(0,0,0,0.04)] ring-1 ring-black/5"
            >
              <h3 className="font-display text-2xl font-bold text-ink">{t}</h3>
              <p className="mt-3 text-sm text-grey-text">Placeholder section.</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
