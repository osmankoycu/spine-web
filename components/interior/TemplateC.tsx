// Template C · Partners — economics-forward: white split hero with a referral-
// economics card, numbered "why" rows, a 3-step ledger, a savings-by-size table,
// an ink partner-community band, then the merged tag-field closer. Accent = Spine
// orange (the money/partnership story). House style: white menu-wide hero, no
// breadcrumb, single-colour section titles. Data-driven from lib/interior/partners.ts.
import { TrendDown } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";
import type { PartnerPage } from "@/lib/interior/types";
import { InteriorIcon } from "@/components/interior/icons";
import { PartnerCloser } from "@/components/interior/PartnerCloser";
import { Button, CheckRow, Eyebrow, TwoToneText } from "@/components/interior/parts";

const container = "mx-auto max-w-[1240px] px-6 md:px-10";

export function TemplateC({ page }: { page: PartnerPage }) {
  return (
    <main className="bg-surface-page text-ink">
      {/* ── HERO (white, split — text left, referral-economics card right) ── */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-[1480px] px-6 pb-16 pt-[140px] sm:px-[52px] lg:px-[60px]">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div>
              <Eyebrow>{page.eyebrow}</Eyebrow>
              <h1 className="mb-5 mt-4 text-[33px] font-extrabold leading-[1.02] tracking-[-0.035em] sm:text-[40px] md:text-[50px] lg:text-[56px]">
                <TwoToneText parts={page.h1} />
              </h1>
              <p className="mb-[30px] max-w-[520px] text-[16px] leading-[1.55] text-body sm:text-[18px]">
                {page.lead}
              </p>
              <div className="mb-[26px] flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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
                    <span className="min-w-0 pr-3 text-[14px] text-ink-2">{l.label}</span>
                    {/* nowrap: U+2212 and "$" are both break class PR, so
                        "−$96,000/yr" was breaking after the minus and leaving a
                        stray dash alone on the first line. */}
                    <span
                      className={cn(
                        "shrink-0 whitespace-nowrap text-[16px] font-bold",
                        l.success ? "text-success" : "text-ink",
                      )}
                    >
                      {l.value}
                    </span>
                  </div>
                ))}
                {/* highlight + earn joined into one piece: shared outer rounding,
                    flat where they meet, a 1px cobalt line between them */}
                <div className="overflow-hidden rounded-[14px] border border-cobalt-200">
                  {/* aggregate savings — white top */}
                  <div className="flex items-center justify-between border-b border-cobalt-200 bg-white px-[18px] py-4">
                    <div>
                      <div className="text-[12px] font-bold uppercase tracking-[0.04em] text-cobalt-600">
                        {page.economics.highlight.label}
                      </div>
                      <div className="mt-0.5 text-[32px] font-extrabold tracking-[-0.03em] text-ink">
                        {page.economics.highlight.figure}
                      </div>
                    </div>
                    <TrendDown size={34} weight="duotone" className="text-cobalt-400" />
                  </div>
                  {/* your win — blue bottom */}
                  {/* The 130px hard-capped note left ~121px for a 22px headline,
                      so the value and the note each rag over three lines with
                      two competing edges. Stack them below sm. */}
                  <div className="flex flex-col items-start gap-1 bg-cobalt-100 px-[18px] py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <div>
                      <div className="text-[12px] font-bold uppercase tracking-[0.04em] text-cobalt-600">
                        {page.economics.earn.label}
                      </div>
                      <div className="mt-0.5 text-[22px] font-extrabold tracking-[-0.02em] text-ink">
                        {page.economics.earn.value}
                      </div>
                    </div>
                    <span className="text-[12px] text-cobalt-500 sm:max-w-[130px] sm:text-right">
                      {page.economics.earn.note}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STAT BAR (dark, right below the hero — like Templates A/B) ── */}
      <section className="mx-auto max-w-[1240px] px-6 py-10 md:px-10">
        <div className="grid grid-cols-2 overflow-hidden rounded-[24px] border border-white/10 bg-[#15140f] lg:grid-cols-4">
          {page.stats.map((s, i) => (
            <div
              key={s.label}
              className={cn(
                "px-5 py-6 sm:px-7 sm:py-8",
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

      {/* ── WHY PARTNERS REFER (numbered rows) ── */}
      <section className={`${container} pb-16 pt-6`}>
        <p className="text-[12px] font-extrabold uppercase tracking-[0.16em] text-orange-700">
          {page.why.eyebrow}
        </p>
        <h2 className="mb-9 mt-3 text-[32px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[40px]">
          <TwoToneText parts={page.why.heading} mono />
        </h2>
        <div className="flex flex-col gap-2">
          {page.why.rows.map((r) => (
            <div
              key={r.n}
              // Icon-beside-text left the copy a 203px column at 375px, and
              // items-center floated the icon level with the middle of the body
              // rather than the title it belongs to. Stack below sm, matching
              // Template A's feature cards and B's bento cards.
              className="grid grid-cols-1 gap-3 rounded-[18px] border border-hairline bg-white px-5 py-5 sm:grid-cols-[60px_1fr] sm:items-center sm:gap-5 sm:px-7 sm:py-6"
            >
              <span className="grid size-11 place-items-center rounded-[13px] bg-cobalt-100 sm:size-12">
                <InteriorIcon name={r.icon} size={24} className="text-cobalt-400" />
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
        <p className="text-[12px] font-extrabold uppercase tracking-[0.16em] text-orange-700">
          {page.table.eyebrow}
        </p>
        <h2 className="mb-8 mt-3 text-[32px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[40px]">
          <TwoToneText parts={page.table.heading} mono />
        </h2>
        {/* Four columns in a 327px card gave ~68px each, so adjacent figures
            touched outright ("$975K/yr $430K/yr") and no header lined up with
            its column. One card per client size below md, matching the
            benchmarks table treatment. */}
        <ul className="space-y-3 md:hidden">
          {page.table.rows.map((r) => (
            <li
              key={r.size}
              className={cn(
                "rounded-[18px] border border-hairline bg-white px-5 py-4",
                r.highlight && "border-cobalt-200 bg-cobalt-400/[0.06]",
              )}
            >
              <p className="text-[11.5px] font-extrabold uppercase tracking-[0.08em] text-muted">
                {r.size}
              </p>
              <dl className="mt-3 space-y-2">
                {[
                  [page.table.columns[1], r.spend, "text-ink"],
                  [page.table.columns[2], r.saving, "text-success"],
                  [page.table.columns[3], r.peo, "text-ink"],
                ].map(([label, value, tone]) => (
                  <div key={label} className="flex items-baseline justify-between gap-3">
                    <dt className="text-[14px] text-body-2">{label}</dt>
                    <dd className={cn("whitespace-nowrap text-[16px] font-bold", tone)}>
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>

        <div className="hidden overflow-hidden rounded-[22px] border border-hairline bg-white md:block">
          <div className="grid grid-cols-4 gap-x-3 border-b border-hairline-2 bg-surface-inset px-7 py-4">
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
                "grid grid-cols-4 items-center gap-x-3 px-7 py-[18px]",
                i < page.table.rows.length - 1 && "border-b border-hairline-2",
                r.highlight && "bg-cobalt-400/[0.06]",
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
        <p className="text-[12px] font-extrabold uppercase tracking-[0.16em] text-orange-700">
          {page.ledger.eyebrow}
        </p>
        <h2 className="mb-9 mt-3 text-[32px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[40px]">
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
              <span className="mb-4 grid size-9 place-items-center rounded-pill bg-cobalt-400 text-[15px] font-extrabold text-white">
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
