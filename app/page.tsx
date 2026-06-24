import { Hero } from "@/components/hero/Hero";

export default function Home() {
  return (
    <main>
      {/* Pinned hero choreography (INTRO … PEOPLE_OPS), then unpins → RELEASE. */}
      <Hero />

      {/* Rest-of-page — normal scroll resumes after RELEASE. Stub sections
          to verify the unpin handoff; real marketing sections come later. */}
      <section className="page-gutter py-32">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-grey-text">
          After RELEASE
        </p>
        <h2 className="font-display mt-4 max-w-2xl text-balance text-4xl font-bold leading-tight text-ink">
          The rest of the homepage scrolls normally from here.
        </h2>
        <p className="mt-5 max-w-xl text-grey-text">
          Once the hero sequence finishes its final phase, the stage unpins and
          standard marketing sections take over with native (Lenis-smoothed)
          scrolling. These blocks are placeholders for that content.
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
