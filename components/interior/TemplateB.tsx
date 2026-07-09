// Template B · Who we serve / Audience — split hero (text left, topic image
// right) like Platform, then stat rail, before/after "shift", vertical timeline,
// asymmetric bento, and the merged tag-field closer. Section titles are single-
// colour (only the hero H1 is two-tone). Data-driven from lib/interior/audiences.ts.
import { cn } from "@/lib/cn";
import type { AudiencePage } from "@/lib/interior/types";
import { InteriorIcon } from "@/components/interior/icons";
import { HeroImage } from "@/components/interior/HeroImage";
import { AudienceCloser } from "@/components/interior/AudienceCloser";
import { Button, TwoToneText } from "@/components/interior/parts";

export function TemplateB({ page }: { page: AudiencePage }) {
  return (
    <main className="bg-surface-page text-ink">
      {/* ── HERO (white, split — text left, image right, menu-wide) ── */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-[1480px] px-9 pb-16 pt-[140px] sm:px-[52px] lg:px-[60px]">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div>
              <div className="mb-[22px] inline-flex items-center gap-2 rounded-pill border border-orange-150 bg-orange-100 px-[15px] py-[7px] text-[12px] font-extrabold uppercase tracking-[0.16em] text-orange-700">
                <InteriorIcon name={page.pillIcon} size={14} weight="fill" />
                {page.pillLabel}
              </div>
              <h1 className="text-[44px] font-extrabold leading-[0.98] tracking-[-0.038em] sm:text-[52px] lg:text-[60px]">
                <TwoToneText parts={page.h1} block />
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
                the fade-in reads seamless (images are opaque on white); inset a
                little from the right edge so it isn't flush to the container. */}
            <div className="relative aspect-square overflow-hidden rounded-[24px] bg-white lg:mr-10">
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

      {/* ── THE SHIFT (before / after) ── */}
      <section className="mx-auto max-w-[1240px] px-6 py-14 md:px-10">
        <h2 className="mx-auto mb-10 max-w-[680px] text-center text-[32px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[40px]">
          <TwoToneText parts={page.shift.heading} mono />
        </h2>
        <div className="grid gap-5 lg:grid-cols-2">
          {/* old way */}
          <div className="rounded-[22px] border border-hairline bg-white p-8">
            <div className="mb-5 text-[12px] font-extrabold uppercase tracking-[0.1em] text-muted">
              {page.shift.oldLabel}
            </div>
            <div className="flex flex-col gap-4">
              {page.shift.oldItems.map((it) => (
                <div key={it.title} className="flex items-start gap-3">
                  <span className="grid size-6 flex-none place-items-center rounded-pill bg-[#f2f0ec] text-[12px] font-extrabold text-muted">
                    ✕
                  </span>
                  <div>
                    <div className="text-[15px] font-bold text-[#3a3934]">{it.title}</div>
                    <div className="mt-0.5 text-[13.5px] text-[#8f8e87]">{it.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* with Spine — employer blue */}
          <div className="rounded-[22px] bg-cobalt-400 p-8">
            <div className="mb-5 text-[12px] font-extrabold uppercase tracking-[0.1em] text-white">
              {page.shift.newLabel}
            </div>
            <div className="flex flex-col gap-4">
              {page.shift.newItems.map((it) => (
                <div key={it.title} className="flex items-start gap-3">
                  <span className="grid size-6 flex-none place-items-center rounded-pill bg-white text-[12px] font-extrabold text-cobalt-400">
                    ✓
                  </span>
                  <div>
                    <div className="text-[15px] font-bold text-white">{it.title}</div>
                    <div className="mt-0.5 text-[13.5px] text-cobalt-100">{it.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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

      {/* ── CLOSER (merged tag-field: bento folded in above the CTA button) ── */}
      <AudienceCloser cta={page.cta} bento={page.bento} />
    </main>
  );
}
