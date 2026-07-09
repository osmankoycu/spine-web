// Template B · Who we serve / Audience — split hero (text left, topic image
// right) like Platform, then stat rail, before/after "shift", vertical timeline,
// asymmetric bento, and the merged tag-field closer. Section titles are single-
// colour (only the hero H1 is two-tone). Data-driven from lib/interior/audiences.ts.
import { cn } from "@/lib/cn";
import type { AudiencePage } from "@/lib/interior/types";
import { InteriorIcon } from "@/components/interior/icons";
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

            {/* topic image slot (user-supplied, square) — no stroke; inset a
                little from the right edge so it isn't flush to the container. */}
            <div className="relative aspect-square overflow-hidden rounded-[24px] bg-surface-band lg:mr-10">
              {page.heroImage ? (
                <img
                  src={page.heroImage.src}
                  alt={page.heroImage.alt}
                  className="absolute inset-0 size-full object-cover"
                />
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

      {/* ── STAT RAIL ── */}
      <section className="mx-auto max-w-[1100px] px-6 py-10 md:px-10">
        <div className="grid grid-cols-2 overflow-hidden rounded-[22px] border border-hairline bg-white lg:grid-cols-4">
          {page.statRail.map((s, i) => (
            <div
              key={s.label}
              className={cn(
                "px-7 py-7",
                i % 2 === 0 && "border-r border-hairline-2",
                "lg:border-r lg:last:border-r-0",
                i < 2 && "border-b border-hairline-2 lg:border-b-0",
              )}
            >
              <div className="text-[32px] font-extrabold tracking-[-0.03em] sm:text-[38px]">
                {s.figure}
              </div>
              <div className="mt-1 text-[13.5px] text-subline">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── THE SHIFT (before / after) ── */}
      <section className="mx-auto max-w-[1160px] px-6 py-14 md:px-10">
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
          {/* with Spine */}
          <div className="rounded-[22px] bg-ink p-8">
            <div className="mb-5 text-[12px] font-extrabold uppercase tracking-[0.1em] text-orange">
              {page.shift.newLabel}
            </div>
            <div className="flex flex-col gap-4">
              {page.shift.newItems.map((it) => (
                <div key={it.title} className="flex items-start gap-3">
                  <span className="grid size-6 flex-none place-items-center rounded-pill bg-orange text-[12px] font-extrabold text-white">
                    ✓
                  </span>
                  <div>
                    <div className="text-[15px] font-bold text-white">{it.title}</div>
                    <div className="mt-0.5 text-[13.5px] text-on-ink">{it.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE (band) ── */}
      <section className="border-y border-band-line bg-surface-band">
        <div className="mx-auto grid max-w-[1160px] gap-12 px-6 py-16 md:px-10 lg:grid-cols-[0.85fr_1.15fr]">
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
                        last ? "bg-orange" : "bg-orange-100",
                      )}
                    >
                      {last ? (
                        <InteriorIcon name="Check" size={20} weight="fill" className="text-white" />
                      ) : (
                        <InteriorIcon name={s.icon} size={21} className="text-orange" />
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
      </section>

      {/* ── BENTO ── */}
      <section className="mx-auto max-w-[1160px] px-6 py-16 md:px-10">
        <h2 className="mb-9 text-[32px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[40px]">
          <TwoToneText parts={page.bento.heading} mono />
        </h2>
        <div className="grid gap-4 lg:grid-cols-3 lg:[grid-auto-rows:1fr]">
          {/* tall feature tile */}
          <div className="flex flex-col justify-between rounded-[22px] bg-ink p-8 lg:row-span-2">
            <div>
              <span className="mb-[18px] grid size-12 place-items-center rounded-[13px] bg-orange/[0.18]">
                <InteriorIcon name={page.bento.feature.icon} size={24} className="text-orange" />
              </span>
              <h3 className="mb-2.5 text-[24px] font-extrabold tracking-[-0.02em] text-white">
                {page.bento.feature.title}
              </h3>
              <p className="text-[15px] leading-[1.55] text-on-ink">{page.bento.feature.body}</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {page.bento.feature.chips.map((c) => (
                <span
                  key={c}
                  className="rounded-pill bg-white/[0.08] px-3 py-1.5 text-[12.5px] font-medium text-[#d9d8d2]"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
          {/* small cards */}
          {page.bento.cards.map((c) => (
            <div key={c.title} className="rounded-[22px] border border-hairline bg-white p-[26px]">
              <span className="mb-4 grid size-11 place-items-center rounded-[12px] bg-orange-100">
                <InteriorIcon name={c.icon} size={22} className="text-orange" />
              </span>
              <h3 className="mb-[7px] text-[17px] font-extrabold tracking-[-0.01em]">{c.title}</h3>
              <p className="text-[14px] leading-[1.5] text-body-2">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CLOSER (merged tag-field) ── */}
      <AudienceCloser cta={page.cta} />
    </main>
  );
}
