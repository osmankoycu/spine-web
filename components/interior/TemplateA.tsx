// Template A · Platform / Feature — white split hero with a product-console
// mockup, a dark stat bar, 6 feature cards, a dark 3-step "how it works" box,
// then the tag-field CTA closer. Data-driven: renders any page in
// lib/interior/platform.ts.
import { ArrowsClockwise, Check } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";
import type { PlatformPage } from "@/lib/interior/types";
import { InteriorIcon } from "@/components/interior/icons";
import { PlatformCloser } from "@/components/interior/PlatformCloser";
import { Button, CheckRow, Eyebrow, TwoToneText } from "@/components/interior/parts";

const container = "mx-auto max-w-[1240px] px-6 md:px-10";

// Interface accent language, matching the homepage employer console (cobalt) and
// employee app (aqua). Only the product-UI depictions use these; brand orange
// stays on the hero H1, eyebrow, CTAs and stat figures.
const ACCENT = {
  employer: {
    tile: "bg-cobalt-100",
    icon: "text-cobalt-400",
    coin: "bg-cobalt-400",
    headPill: "bg-cobalt-400/10 text-cobalt-400",
    headDot: "bg-cobalt-400",
    runChip: "bg-cobalt-400/10 text-cobalt-400",
    runSub: "text-cobalt-500",
    // console "total" bar: light-blue tint (same as the console's header pill /
    // active chips), so it doesn't clash with the dark stat bar below the hero.
    bar: "bg-cobalt-400/10",
    barLabel: "text-cobalt-500",
    barFigure: "text-cobalt-400",
  },
  employee: {
    tile: "bg-aqua-100",
    icon: "text-aqua-500",
    coin: "bg-aqua-400",
    headPill: "bg-aqua-400/10 text-aqua-500",
    headDot: "bg-aqua-400",
    runChip: "bg-aqua-400/10 text-aqua-500",
    runSub: "text-aqua-600",
    bar: "bg-aqua-400/10",
    barLabel: "text-aqua-600",
    barFigure: "text-aqua-500",
  },
} as const;

export function TemplateA({ page }: { page: PlatformPage }) {
  const a = ACCENT[page.accent ?? "employer"];

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
                <span
                  className={cn(
                    "flex items-center gap-1.5 rounded-pill px-[11px] py-[5px] text-[11.5px] font-bold",
                    a.headPill,
                  )}
                >
                  <span className={cn("size-1.5 rounded-pill", a.headDot)} />
                  {page.mockup.status}
                </span>
              </div>
              <div className="px-5 pb-[18px] pt-1">
                {page.mockup.rows.map((r, i) => {
                  const ok = r.tone === "ok";
                  return (
                    <div
                      key={i}
                      className={cn(
                        "flex items-center gap-[13px] py-[13px]",
                        i < page.mockup.rows.length - 1 && "border-b border-hairline-2",
                      )}
                    >
                      <span
                        className={cn(
                          "grid size-[30px] flex-none place-items-center rounded-[9px]",
                          ok ? "bg-success-tint text-success" : a.runChip,
                        )}
                      >
                        {ok ? (
                          <Check size={14} weight="bold" />
                        ) : (
                          <ArrowsClockwise size={14} weight="bold" />
                        )}
                      </span>
                      <div className="flex-1">
                        <div className="text-[13.5px] font-semibold text-[#2e2d28]">
                          {r.title}
                        </div>
                        <div
                          className={cn("mt-0.5 text-[11.5px]", ok ? "text-subline" : a.runSub)}
                        >
                          {r.sub}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div
                  className={cn(
                    "mt-3 flex items-center justify-between rounded-[12px] px-4 py-[13px]",
                    a.bar,
                  )}
                >
                  <span className={cn("text-[13px] font-semibold", a.barLabel)}>
                    {page.mockup.total.label}
                  </span>
                  <span
                    className={cn("text-[22px] font-extrabold tracking-[-0.02em]", a.barFigure)}
                  >
                    {page.mockup.total.figure}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STAT BAR (dark, right below the hero — like Template B) ── */}
      <section className="mx-auto max-w-[1240px] px-6 py-10 md:px-10">
        <div className="grid grid-cols-2 overflow-hidden rounded-[24px] border border-white/10 bg-[#15140f] lg:grid-cols-4">
          {page.numbers.stats.map((s, i) => (
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

      {/* ── WHAT YOU GET ── */}
      <section className={`${container} py-16`}>
        <div className="text-center">
          <h2 className="text-[32px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[40px]">
            <TwoToneText parts={page.features.heading} mono />
          </h2>
          <p className="mx-auto mb-10 mt-3 max-w-[620px] text-[17px] leading-[1.55] text-body-2">
            {page.features.intro}
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {page.features.items.map((f) => (
            <div
              key={f.title}
              className="rounded-[20px] border border-hairline bg-white px-6 py-[26px]"
            >
              <span className={cn("mb-4 grid size-12 place-items-center rounded-[13px]", a.tile)}>
                <InteriorIcon name={f.icon} size={24} className={a.icon} />
              </span>
              <h3 className="mb-[7px] text-[18px] font-extrabold tracking-[-0.01em]">
                {f.title}
              </h3>
              <p className="text-[14.5px] leading-[1.5] text-body-2">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS (dark box) ── */}
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
                <span
                  className={cn(
                    "mb-[18px] grid size-[38px] place-items-center rounded-pill text-[16px] font-extrabold text-white",
                    a.coin,
                  )}
                >
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

      {/* ── CLOSER (CTA over the falling tags) ── */}
      <PlatformCloser cta={page.cta} />
    </main>
  );
}
