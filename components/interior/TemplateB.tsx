// Template B · Who we serve / Audience — split hero (text left, topic image
// right) like Platform, then stat rail, before/after "shift", vertical timeline,
// asymmetric bento, and the merged tag-field closer. Section titles are single-
// colour (only the hero H1 is two-tone). Data-driven from lib/interior/audiences.ts.
import { cn } from "@/lib/cn";
import type { AudiencePage } from "@/lib/interior/types";
import { InteriorIcon } from "@/components/interior/icons";
import { HeroImage } from "@/components/interior/HeroImage";
import { AudienceCloser } from "@/components/interior/AudienceCloser";
import { Button, Eyebrow, TwoToneText } from "@/components/interior/parts";

export function TemplateB({ page }: { page: AudiencePage }) {
  return (
    <main className="bg-surface-page text-ink">
      {/* ── HERO (white, split — text left, image right, menu-wide) ── */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-[1480px] px-9 pb-16 pt-[140px] sm:px-[52px] lg:px-[60px]">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div>
              <Eyebrow>{page.pillLabel}</Eyebrow>
              <h1 className="mt-4 text-[44px] font-extrabold leading-[1.02] tracking-[-0.038em] sm:text-[52px] lg:text-[58px]">
                <TwoToneText parts={page.h1} />
              </h1>
              <p className="mb-8 mt-5 max-w-[520px] text-[18px] leading-[1.55] text-body">
                {page.lead}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button cta={page.primary} arrow />
                <Button cta={page.secondary} variant="secondary" />
              </div>
            </div>

            {/* topic image slot (user-supplied, square) — no stroke; white bg so
                the fade-in reads seamless (images are opaque on white). Capped +
                right-aligned so the hero height matches Templates A/C (the square
                image would otherwise fill the column and make the hero taller). */}
            <div className="relative aspect-square w-full overflow-hidden rounded-[24px] bg-white lg:ml-auto lg:mr-10 lg:max-w-[440px]">
              {page.heroImage ? (
                <HeroImage src={page.heroImage.src} alt={page.heroImage.alt} />
              ) : (
                <div className="grid size-full place-items-center">
                  <div className="flex flex-col items-center gap-2.5 text-muted">
                    <InteriorIcon name={page.pillIcon} size={40} className="opacity-40" />
                    <span className="text-[13px] font-medium">Image</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── STAT RAIL (dark bar — homepage StatsBand style) ── */}
      <section className="mx-auto max-w-[1240px] px-6 py-10 md:px-10">
        <div className="grid grid-cols-2 overflow-hidden rounded-[24px] border border-white/10 bg-[#15140f] lg:grid-cols-4">
          {page.statRail.map((s, i) => (
            <div
              key={s.label}
              className={cn(
                "px-7 py-8",
                i % 2 === 0 && "border-r border-white/10",
                "lg:border-r lg:last:border-r-0",
                i < 2 && "border-b border-white/10 lg:border-b-0",
              )}
            >
              <div className="whitespace-nowrap text-[30px] font-extrabold tracking-[-0.03em] text-white sm:text-[34px]">
                {s.figure}
              </div>
              <div className="mt-2 text-[13.5px] text-white/55">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BENTO (what you get) ── */}
      <section className="mx-auto max-w-[1240px] px-6 py-14 md:px-10">
        <h2 className="mb-9 text-[32px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[40px]">
          <TwoToneText parts={page.bento.heading} mono />
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:[grid-auto-rows:1fr]">
          {/* feature tile — employer-blue tint, spans full width (sm) / tall (lg) */}
          <div className="flex flex-col justify-between rounded-[22px] border border-cobalt-200 bg-cobalt-100 p-8 sm:col-span-2 lg:col-span-1 lg:row-span-2">
            <div>
              <span className="mb-[18px] grid size-12 place-items-center rounded-[13px] bg-white">
                <InteriorIcon name={page.bento.feature.icon} size={24} className="text-cobalt-400" />
              </span>
              <h3 className="mb-2.5 text-[24px] font-extrabold tracking-[-0.02em] text-ink">
                {page.bento.feature.title}
              </h3>
              <p className="text-[15px] leading-[1.55] text-body-2">{page.bento.feature.body}</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {page.bento.feature.chips.map((c) => (
                <span
                  key={c}
                  className="rounded-pill border border-cobalt-200 bg-white px-3 py-1.5 text-[12.5px] font-medium text-ink-2"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
          {/* small cards */}
          {page.bento.cards.map((c) => (
            <div key={c.title} className="rounded-[22px] border border-hairline bg-white p-[26px]">
              <span className="mb-4 grid size-11 place-items-center rounded-[12px] bg-cobalt-100">
                <InteriorIcon name={c.icon} size={22} className="text-cobalt-400" />
              </span>
              <h3 className="mb-[7px] text-[17px] font-extrabold tracking-[-0.01em]">{c.title}</h3>
              <p className="text-[14px] leading-[1.5] text-body-2">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TIMELINE (white box) ── */}
      <section className="mx-auto max-w-[1240px] px-6 pb-16 pt-2 md:px-10">
        <div className="rounded-[32px] border border-hairline bg-white px-8 py-12 shadow-[0_1px_0_rgba(0,0,0,0.02),0_40px_80px_-48px_rgba(20,20,18,0.2)] sm:px-10 lg:px-[60px] lg:py-14">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <h2 className="mb-4 text-[32px] font-extrabold leading-[1.03] tracking-[-0.03em] sm:text-[40px]">
                <TwoToneText parts={page.timeline.heading} mono />
              </h2>
              <p className="max-w-[340px] text-[16px] leading-[1.55] text-body-2">
                {page.timeline.intro}
              </p>
            </div>
            <div>
              {page.timeline.steps.map((s, i) => {
                const last = i === page.timeline.steps.length - 1;
                return (
                  <div key={s.title} className="flex gap-[18px]">
                    <div className="flex flex-none flex-col items-center">
                      <span
                        className={cn(
                          "grid size-[42px] place-items-center rounded-[12px]",
                          last ? "bg-cobalt-400" : "bg-cobalt-100",
                        )}
                      >
                        {last ? (
                          <InteriorIcon name="Check" size={20} weight="fill" className="text-white" />
                        ) : (
                          <InteriorIcon name={s.icon} size={21} className="text-cobalt-400" />
                        )}
                      </span>
                      {!last && <span className="w-0.5 flex-1 bg-[#dddcd8]" />}
                    </div>
                    <div className={cn(!last && "pb-6")}>
                      <div className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-muted">
                        {s.day}
                      </div>
                      <div className="mt-0.5 text-[17px] font-extrabold tracking-[-0.01em]">
                        {s.title}
                      </div>
                      <div className="mt-0.5 text-[14px] text-subline">{s.sub}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── CLOSER (merged tag-field: CTA over the falling tags) ── */}
      <AudienceCloser cta={page.cta} />
    </main>
  );
}
