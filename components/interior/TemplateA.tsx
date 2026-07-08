// Template A · Platform / Feature — white split hero with a product-console
// mockup, 6 feature cards, 3-step band, then either a merged tag-field closer
// (stats + CTA over falling tags) or the standard stats + ink CTA band.
// Data-driven: renders any page in lib/interior/platform.ts.
import type { PlatformPage } from "@/lib/interior/types";
import { InteriorIcon } from "@/components/interior/icons";
import { PlatformCloser } from "@/components/interior/PlatformCloser";
import { Button, CheckRow, Eyebrow, TwoToneText } from "@/components/interior/parts";
import { hasOwnCloser } from "@/lib/interior/closers";

const container = "mx-auto max-w-[1240px] px-6 md:px-10";

export function TemplateA({ page }: { page: PlatformPage }) {
  // Pages that opt into the merged closer drop the standalone stats + CTA band
  // (and the global TagDrop is suppressed for them — see closers.ts).
  const merged = hasOwnCloser(`/platform/${page.slug}`);

  return (
    <main className="bg-surface-page text-ink">
      {/* ── HERO (white) ── */}
      {/* Hero spans the nav's width (max-w-1480) and its left inset matches the
          header logo (36 / 52 / 60px), so the hero content lines up under it. */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-[1480px] px-9 pb-16 pt-[140px] sm:px-[52px] lg:px-[60px]">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div>
              <Eyebrow>{page.eyebrow}</Eyebrow>
              <h1 className="mb-5 mt-4 text-[44px] font-extrabold leading-[0.98] tracking-[-0.035em] sm:text-[52px] lg:text-[60px]">
                <TwoToneText parts={page.h1} block />
              </h1>
              <p className="mb-[30px] max-w-[520px] text-[18px] leading-[1.55] text-body">
                {page.lead}
              </p>
              <div className="mb-[26px] flex flex-wrap gap-3">
                <Button cta={page.primary} arrow />
                <Button cta={page.secondary} variant="secondary" />
              </div>
              <CheckRow items={page.checks} />
            </div>

            {/* product console mockup */}
            <div className="overflow-hidden rounded-[24px] border border-hairline bg-white shadow-[0_40px_80px_-50px_rgba(20,20,18,0.35)]">
              <div className="flex items-center justify-between border-b border-hairline-2 px-5 py-4">
                <span className="text-[12px] font-bold uppercase tracking-[0.06em] text-muted">
                  {page.mockup.title}
                </span>
                <span className="flex items-center gap-1.5 rounded-pill bg-success-tint px-[11px] py-[5px] text-[11.5px] font-bold text-success">
                  <span className="size-1.5 rounded-pill bg-success" />
                  {page.mockup.status}
                </span>
              </div>
              <div className="flex flex-col gap-2.5 px-5 py-[18px]">
                {page.mockup.rows.map((r, i) => {
                  const ok = r.tone === "ok";
                  return (
                    <div
                      key={i}
                      className={`flex items-start gap-3 rounded-[14px] border px-[15px] py-[14px] ${
                        ok
                          ? "border-hairline bg-surface-inset"
                          : "border-orange-150 bg-orange-100"
                      }`}
                    >
                      <span
                        className={`grid size-[30px] flex-none place-items-center rounded-pill text-[14px] font-extrabold ${
                          ok ? "bg-success-tint text-success" : "bg-white text-orange"
                        }`}
                      >
                        {ok ? "✓" : "↻"}
                      </span>
                      <div>
                        <div className="text-[14px] font-bold text-ink">{r.title}</div>
                        <div
                          className={`mt-0.5 text-[12.5px] ${
                            ok ? "text-subline" : "text-orange-ink"
                          }`}
                        >
                          {r.sub}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="mt-1 flex items-center justify-between rounded-[14px] bg-ink px-4 py-[14px]">
                  <span className="text-[13px] font-semibold text-[#c9c8c2]">
                    {page.mockup.total.label}
                  </span>
                  <span className="text-[22px] font-extrabold tracking-[-0.02em] text-white">
                    {page.mockup.total.figure}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT YOU GET ── */}
      <section className={`${container} py-16`}>
        <div className={merged ? "text-center" : undefined}>
          <h2 className="text-[32px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[40px]">
            <TwoToneText parts={page.features.heading} mono />
          </h2>
          <p
            className={`mb-10 mt-3 text-[17px] leading-[1.55] text-body-2 ${
              merged ? "mx-auto max-w-[620px]" : "max-w-[680px]"
            }`}
          >
            {page.features.intro}
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {page.features.items.map((f) => (
            <div
              key={f.title}
              className="rounded-[20px] border border-hairline bg-white px-6 py-[26px]"
            >
              <span className="mb-4 grid size-12 place-items-center rounded-[13px] bg-orange-100">
                <InteriorIcon name={f.icon} size={24} className="text-orange" />
              </span>
              <h3 className="mb-[7px] text-[18px] font-extrabold tracking-[-0.01em]">
                {f.title}
              </h3>
              <p className="text-[14.5px] leading-[1.5] text-body-2">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      {merged ? (
        // Dark-box treatment (same structure as the homepage StatsBand): one
        // rounded-[32px] ink container, 3 step cells split by hairline dividers.
        // Tighter top padding: the box is a heavy visual mass, so a full py-16
        // above it (128px total with the cards' pb-16) reads as too much grey.
        <section className={`${container} pb-16 pt-6`}>
          <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[#15140f] px-7 pb-9 pt-10 shadow-[0_40px_90px_-50px_rgba(0,0,0,0.5)] sm:px-10 lg:px-[60px] lg:pb-[52px] lg:pt-[56px]">
            <h2 className="mb-10 text-center text-[32px] font-extrabold leading-[1.05] tracking-[-0.03em] text-white sm:text-[40px]">
              <TwoToneText parts={page.how.heading} light mono />
            </h2>
            <div className="grid grid-cols-1 divide-y divide-white/10 lg:grid-cols-3 lg:divide-y-0">
              {page.how.steps.map((s, i) => (
                <div
                  key={s.title}
                  className="px-0 py-8 first:pt-0 last:pb-0 lg:px-9 lg:py-0 lg:first:pl-0 lg:last:pr-0 lg:[&:not(:last-child)]:border-r lg:[&:not(:last-child)]:border-white/10"
                >
                  <span className="mb-[18px] grid size-[38px] place-items-center rounded-pill bg-orange text-[16px] font-extrabold text-white">
                    {i + 1}
                  </span>
                  <h3 className="mb-2 text-[19px] font-extrabold tracking-[-0.01em] text-white">
                    {s.title}
                  </h3>
                  <p className="text-[14.5px] leading-[1.5] text-white/55">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="border-y border-band-line bg-surface-band">
          <div className={`${container} py-16`}>
            <h2 className="mb-10 text-[32px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[40px]">
              <TwoToneText parts={page.how.heading} mono />
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {page.how.steps.map((s, i) => (
                <div
                  key={s.title}
                  className="rounded-[20px] border border-hairline bg-white px-[26px] py-7"
                >
                  <span className="mb-[18px] grid size-[38px] place-items-center rounded-pill bg-orange text-[16px] font-extrabold text-white">
                    {i + 1}
                  </span>
                  <h3 className="mb-2 text-[19px] font-extrabold tracking-[-0.01em]">
                    {s.title}
                  </h3>
                  <p className="text-[14.5px] leading-[1.5] text-body-2">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {merged ? (
        <PlatformCloser page={page} />
      ) : (
        <>
          {/* ── BY THE NUMBERS ── */}
          <section className={`${container} py-16`}>
            <h2 className="mb-10 text-[32px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[40px]">
              <TwoToneText parts={page.numbers.heading} mono />
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {page.numbers.stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-[18px] border border-hairline bg-white px-6 py-[26px]"
                >
                  <div className="text-[44px] font-extrabold tracking-[-0.03em] text-orange">
                    {s.figure}
                  </div>
                  <div className="mt-1.5 text-[14px] text-body-2">{s.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ── CTA BAND ── */}
          <section className="px-6 pb-20 md:px-10">
            <div className="mx-auto max-w-[1240px] rounded-[28px] bg-ink px-14 py-16 text-center">
              <h2 className="mb-3.5 text-[34px] font-extrabold leading-[1.05] tracking-[-0.03em] text-white sm:text-[44px]">
                <TwoToneText parts={page.cta.heading} light mono />
              </h2>
              <p className="mx-auto mb-[30px] max-w-[560px] text-[17px] leading-[1.55] text-on-ink">
                {page.cta.lead}
              </p>
              <Button cta={page.cta.button} size="lg" arrow />
            </div>
          </section>
        </>
      )}
    </main>
  );
}
