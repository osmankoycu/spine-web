// Template C · Partners — economics-forward: white split hero with a referral-
// economics card, numbered "why" rows, a 3-step ledger, a savings-by-size table,
// an ink partner-community band, then the merged tag-field closer. Accent = Spine
// orange (the money/partnership story). House style: white menu-wide hero, no
// breadcrumb, single-colour section titles. Data-driven from lib/interior/partners.ts.
import { TrendDown } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";
import type { PartnerPage } from "@/lib/interior/types";
import { PartnerCloser } from "@/components/interior/PartnerCloser";
import { Button, CheckRow, Eyebrow, TwoToneText } from "@/components/interior/parts";

const container = "mx-auto max-w-[1240px] px-6 md:px-10";

export function TemplateC({ page }: { page: PartnerPage }) {
  return (
    <main className="bg-surface-page text-ink">
      {/* ── HERO (white, split — text left, referral-economics card right) ── */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-[1480px] px-9 pb-16 pt-[140px] sm:px-[52px] lg:px-[60px]">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div>
              <Eyebrow>{page.eyebrow}</Eyebrow>
              <h1 className="mb-5 mt-4 text-[40px] font-extrabold leading-[1.02] tracking-[-0.035em] sm:text-[50px] lg:text-[56px]">
                <TwoToneText parts={page.h1} />
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

            {/* referral-economics card */}
            <div className="overflow-hidden rounded-[24px] border border-hairline bg-white shadow-[0_40px_80px_-50px_rgba(20,20,18,0.35)]">
              <div className="border-b border-hairline-2 px-6 py-[22px]">
                <div className="text-[12px] font-bold uppercase tracking-[0.06em] text-muted">
                  {page.economics.caption}
                </div>
                <div className="mt-1 text-[13.5px] text-subline">{page.economics.sub}</div>
              </div>
              <div className="flex flex-col gap-3.5 px-6 py-[22px]">
                {page.economics.lines.map((l) => (
                  <div
                    key={l.label}
                    className={cn(
                      "flex items-center justify-between",
                      l.border && "border-b border-hairline-2 pb-3.5",
                    )}
                  >
                    <span className="text-[14px] text-ink-2">{l.label}</span>
                    <span
                      className={cn(
                        "text-[16px] font-bold",
                        l.success ? "text-success" : "text-ink",
                      )}
                    >
                      {l.value}
                    </span>
                  </div>
                ))}
                {/* highlight row */}
                <div className="flex items-center justify-between rounded-[14px] border border-orange-150 bg-orange-100 px-[18px] py-4">
                  <div>
                    <div className="text-[12px] font-bold uppercase tracking-[0.04em] text-orange-700">
                      {page.economics.highlight.label}
                    </div>
                    <div className="mt-0.5 text-[32px] font-extrabold tracking-[-0.03em] text-ink">
                      {page.economics.highlight.figure}
                    </div>
                  </div>
                  <TrendDown size={34} weight="duotone" className="text-orange" />
                </div>
                {/* earn row */}
                <div className="flex items-center justify-between gap-4 rounded-[14px] bg-ink px-[18px] py-4">
                  <div>
                    <div className="text-[12px] font-bold uppercase tracking-[0.04em] text-orange">
                      {page.economics.earn.label}
                    </div>
                    <div className="mt-0.5 text-[22px] font-extrabold tracking-[-0.02em] text-white">
                      {page.economics.earn.value}
                    </div>
                  </div>
                  <span className="max-w-[130px] text-right text-[12px] text-on-ink">
                    {page.economics.earn.note}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY PARTNERS REFER (numbered rows) ── */}
      <section className={`${container} py-16`}>
        <h2 className="mb-9 max-w-[620px] text-[32px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[40px]">
          <TwoToneText parts={page.why.heading} mono />
        </h2>
        <div className="flex flex-col gap-2">
          {page.why.rows.map((r) => (
            <div
              key={r.n}
              className="grid grid-cols-[52px_1fr] items-center gap-4 rounded-[18px] border border-hairline bg-white px-7 py-6 sm:grid-cols-[64px_1fr] sm:gap-5"
            >
              <span className="text-[28px] font-extrabold tracking-[-0.02em] text-orange sm:text-[30px]">
                {r.n}
              </span>
              <div className="grid items-center gap-1 lg:grid-cols-[280px_1fr] lg:gap-6">
                <h3 className="text-[19px] font-extrabold tracking-[-0.01em]">{r.title}</h3>
                <p className="text-[15px] leading-[1.5] text-body-2">{r.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SAVINGS-BY-SIZE TABLE ── */}
      <section className={`${container} pb-16`}>
        <h2 className="mb-8 text-[32px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[40px]">
          <TwoToneText parts={page.table.heading} mono />
        </h2>
        <div className="overflow-hidden rounded-[22px] border border-hairline bg-white">
          <div className="grid grid-cols-4 border-b border-hairline-2 bg-surface-inset px-7 py-4">
            {page.table.columns.map((c, i) => (
              <span
                key={c}
                className={cn(
                  "text-[11.5px] font-extrabold uppercase tracking-[0.08em] text-muted",
                  i === 3 && "text-right",
                )}
              >
                {c}
              </span>
            ))}
          </div>
          {page.table.rows.map((r, i) => (
            <div
              key={r.size}
              className={cn(
                "grid grid-cols-4 items-center px-7 py-[18px]",
                i < page.table.rows.length - 1 && "border-b border-hairline-2",
                r.highlight && "bg-[#fff8f4]",
              )}
            >
              <span className="text-[15px] font-semibold text-ink">{r.size}</span>
              <span className="text-[15px] text-ink-2">{r.spend}</span>
              <span className="text-[15px] font-bold text-success">{r.saving}</span>
              <span className="text-right text-[15px] text-ink-2">{r.peo}</span>
            </div>
          ))}
        </div>
        <p className="mt-3.5 text-[12.5px] text-muted">{page.table.caption}</p>
      </section>

      {/* ── HOW IT WORKS (3-step ledger, dark box) ── */}
      <section className={`${container} pb-16`}>
        <h2 className="mb-9 text-[32px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[40px]">
          <TwoToneText parts={page.ledger.heading} mono />
        </h2>
        <div className="grid overflow-hidden rounded-[22px] border border-white/10 bg-[#15140f] shadow-[0_40px_90px_-50px_rgba(0,0,0,0.5)] lg:grid-cols-3">
          {page.ledger.steps.map((s, i) => (
            <div
              key={s.title}
              className={cn(
                "px-8 py-8",
                i < page.ledger.steps.length - 1 &&
                  "border-b border-white/10 lg:border-b-0 lg:border-r",
              )}
            >
              <span className="mb-4 grid size-9 place-items-center rounded-pill bg-orange text-[15px] font-extrabold text-white">
                {i + 1}
              </span>
              <h3 className="mb-2 text-[18px] font-extrabold tracking-[-0.01em] text-white">
                {s.title}
              </h3>
              <p className="text-[14.5px] leading-[1.5] text-on-ink">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CLOSER (merged tag-field) ── */}
      <PartnerCloser cta={page.cta} />
    </main>
  );
}
