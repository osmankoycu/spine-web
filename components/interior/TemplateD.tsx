// Template D · Compare — a head-to-head page for Spine vs one competitor. White
// split hero with an at-a-glance verdict card, the signature dark comparison
// matrix (CompareMatrix), concrete difference cards, an honest "where each wins"
// split, a dark stat bar, a "how to switch" box, an FAQ, and the tag-field
// closer. Data-driven: renders any page in lib/interior/compare.ts.
import { Check, Minus, Plus, X } from "@phosphor-icons/react/dist/ssr";
import type { ComparePage } from "@/lib/interior/types";
import { InteriorIcon } from "@/components/interior/icons";
import { CompareMatrix } from "@/components/interior/CompareMatrix";
import { PlatformCloser } from "@/components/interior/PlatformCloser";
import {
  Breadcrumbs,
  Button,
  CheckRow,
  Eyebrow,
  TwoToneText,
} from "@/components/interior/parts";

const container = "mx-auto max-w-[1240px] px-6 md:px-10";

export function TemplateD({ page }: { page: ComparePage }) {
  return (
    <main className="bg-surface-page text-ink">
      {/* ── HERO (white) ── */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-[1480px] px-9 pb-16 pt-[132px] sm:px-[52px] lg:px-[60px]">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div>
              <Breadcrumbs items={page.breadcrumb} />
              <Eyebrow>{page.eyebrow}</Eyebrow>
              <h1 className="mb-5 mt-4 text-[42px] font-extrabold leading-[0.99] tracking-[-0.035em] sm:text-[50px] lg:text-[58px]">
                <TwoToneText parts={page.h1} block />
              </h1>
              <p className="mb-[30px] max-w-[540px] text-[18px] leading-[1.55] text-body">
                {page.lead}
              </p>
              <div className="mb-[26px] flex flex-wrap gap-3">
                <Button cta={page.primary} arrow />
                <Button cta={page.secondary} variant="secondary" />
              </div>
              <CheckRow items={page.checks} />
            </div>

            {/* verdict card */}
            <SnapshotCard snapshot={page.snapshot} competitor={page.competitor} />
          </div>
        </div>
      </section>

      {/* ── COMPARISON MATRIX (dark, signature) ── */}
      <section className={`${container} py-12`}>
        <div className="mx-auto mb-9 max-w-[720px] text-center">
          <p className="text-[12px] font-extrabold uppercase tracking-[0.16em] text-orange-700">
            {page.matrix.eyebrow}
          </p>
          <h2 className="mt-3 text-[32px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[40px]">
            <TwoToneText parts={page.matrix.heading} mono />
          </h2>
          <p className="mx-auto mt-3 max-w-[600px] text-[17px] leading-[1.55] text-body-2">
            {page.matrix.intro}
          </p>
        </div>
        <CompareMatrix
          competitor={page.competitor}
          competitorSub={page.competitorSub}
          rows={page.matrix.rows}
        />
      </section>

      {/* ── WHAT CHANGES (difference cards) ── */}
      <section className={`${container} py-12`}>
        <div className="text-center">
          <Eyebrow>{page.differences.eyebrow}</Eyebrow>
          <h2 className="mt-4 text-[32px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[40px]">
            <TwoToneText parts={page.differences.heading} mono />
          </h2>
          <p className="mx-auto mb-10 mt-3 max-w-[620px] text-[17px] leading-[1.55] text-body-2">
            {page.differences.intro}
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {page.differences.items.map((f) => (
            <div
              key={f.title}
              className="rounded-[20px] border border-hairline bg-white px-6 py-[26px]"
            >
              <span className="mb-4 grid size-12 place-items-center rounded-[13px] bg-orange/10">
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

      {/* ── HONEST "WHERE EACH WINS" ── */}
      <section className={`${container} py-12`}>
        <div className="text-center">
          <Eyebrow>{page.fair.eyebrow}</Eyebrow>
          <h2 className="mt-4 text-[32px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[40px]">
            <TwoToneText parts={page.fair.heading} mono />
          </h2>
          <p className="mx-auto mb-10 mt-3 max-w-[620px] text-[17px] leading-[1.55] text-body-2">
            {page.fair.intro}
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {/* Them */}
          <div className="rounded-[24px] border border-hairline bg-white px-7 py-8">
            <h3 className="mb-6 flex items-center gap-2.5 text-[16px] font-extrabold tracking-[-0.01em]">
              <span className="grid size-7 place-items-center rounded-pill bg-ink/[0.06] text-muted">
                <Minus size={15} weight="bold" />
              </span>
              {page.fair.themLabel}
            </h3>
            <ul className="space-y-5">
              {page.fair.themPoints.map((p) => (
                <li key={p.title}>
                  <div className="text-[15px] font-bold text-ink-2">{p.title}</div>
                  <p className="mt-1 text-[14px] leading-[1.5] text-body-2">{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
          {/* Spine */}
          <div className="rounded-[24px] border border-orange/25 bg-[rgba(247,101,27,0.05)] px-7 py-8">
            <h3 className="mb-6 flex items-center gap-2.5 text-[16px] font-extrabold tracking-[-0.01em]">
              <span className="grid size-7 place-items-center rounded-pill bg-orange text-white">
                <Plus size={15} weight="bold" />
              </span>
              {page.fair.spineLabel}
            </h3>
            <ul className="space-y-5">
              {page.fair.spinePoints.map((p) => (
                <li key={p.title} className="flex gap-3">
                  <Check size={18} weight="bold" className="mt-0.5 shrink-0 text-orange" />
                  <div>
                    <div className="text-[15px] font-bold text-ink">{p.title}</div>
                    <p className="mt-1 text-[14px] leading-[1.5] text-body-2">{p.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── STAT BAR (dark) ── */}
      <section className="mx-auto max-w-[1240px] px-6 py-6 md:px-10">
        <div className="grid grid-cols-2 overflow-hidden rounded-[24px] border border-white/10 bg-[#15140f] lg:grid-cols-4">
          {page.numbers.stats.map((s, i) => (
            <div
              key={s.label}
              className={[
                "px-7 py-8",
                i % 2 === 0 ? "border-r border-white/10" : "",
                "lg:border-r lg:last:border-r-0",
                i < 2 ? "border-b border-white/10 lg:border-b-0" : "",
              ].join(" ")}
            >
              <div className="whitespace-nowrap text-[30px] font-extrabold tracking-[-0.03em] text-white sm:text-[34px]">
                {s.figure}
              </div>
              <div className="mt-2 text-[13.5px] text-white/55">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW TO SWITCH (dark box) ── */}
      <section className={`${container} py-12`}>
        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[#15140f] px-7 pb-9 pt-10 shadow-[0_40px_90px_-50px_rgba(0,0,0,0.5)] sm:px-10 lg:px-[60px] lg:pb-[52px] lg:pt-[56px]">
          <div className="mb-10 text-center">
            <p className="text-[12px] font-extrabold uppercase tracking-[0.16em] text-orange">
              {page.switch.eyebrow}
            </p>
            <h2 className="mt-3 text-[32px] font-extrabold leading-[1.05] tracking-[-0.03em] text-white sm:text-[40px]">
              <TwoToneText parts={page.switch.heading} light mono />
            </h2>
          </div>
          <div className="grid grid-cols-1 divide-y divide-white/10 lg:grid-cols-3 lg:divide-y-0">
            {page.switch.steps.map((s, i) => (
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

      {/* ── FAQ ── */}
      <section className={`${container} pb-14 pt-2`}>
        <div className="mx-auto max-w-[760px]">
          <div className="mb-8 text-center">
            <Eyebrow>{page.faq.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-[30px] font-extrabold leading-[1.06] tracking-[-0.03em] sm:text-[36px]">
              <TwoToneText parts={page.faq.heading} mono />
            </h2>
          </div>
          <div className="space-y-3">
            {page.faq.items.map((f) => (
              <details
                key={f.q}
                className="group rounded-[16px] border border-hairline bg-white px-6 py-1 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 py-5 text-[16px] font-bold tracking-[-0.01em] text-ink">
                  {f.q}
                  <Plus
                    size={18}
                    weight="bold"
                    className="shrink-0 text-muted transition-transform duration-200 group-open:rotate-45"
                  />
                </summary>
                <p className="pb-5 text-[15px] leading-[1.6] text-body-2">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSER (CTA over the falling tags) ── */}
      <PlatformCloser cta={page.cta} />
    </main>
  );
}

// ── Hero verdict card ────────────────────────────────────────────────
function SnapshotCard({
  snapshot,
  competitor,
}: {
  snapshot: ComparePage["snapshot"];
  competitor: string;
}) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-hairline bg-white shadow-[0_40px_80px_-50px_rgba(20,20,18,0.35)]">
      {/* header */}
      <div className="flex items-center justify-between border-b border-hairline-2 px-5 py-4">
        <span className="text-[12px] font-bold uppercase tracking-[0.06em] text-muted">
          {snapshot.title}
        </span>
        <span className="flex items-center gap-1.5 rounded-pill bg-orange/10 px-[11px] py-[5px] text-[11.5px] font-bold text-orange-700">
          Spine vs {competitor}
        </span>
      </div>

      {/* column labels */}
      <div className="grid grid-cols-[1fr_1fr] gap-3 px-5 pt-4">
        <span className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-orange-700">
          Spine
        </span>
        <span className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-muted">
          {competitor}
        </span>
      </div>

      {/* rows */}
      <div className="px-5 pb-[18px] pt-1">
        {snapshot.points.map((p, i) => (
          <div
            key={p.label}
            className={[
              "py-[13px]",
              i < snapshot.points.length - 1 ? "border-b border-hairline-2" : "",
            ].join(" ")}
          >
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-subline">
              {p.label}
            </div>
            <div className="grid grid-cols-[1fr_1fr] gap-3">
              <div className="flex items-start gap-1.5">
                <Check size={14} weight="bold" className="mt-0.5 shrink-0 text-orange" />
                <span className="text-[13px] font-semibold leading-[1.35] text-[#2e2d28]">
                  {p.spine}
                </span>
              </div>
              <div className="flex items-start gap-1.5">
                <X size={13} weight="bold" className="mt-0.5 shrink-0 text-muted/70" />
                <span className="text-[13px] leading-[1.35] text-body-2">{p.them}</span>
              </div>
            </div>
          </div>
        ))}

        {/* bottom savings bar */}
        <div className="mt-3 flex items-center justify-between rounded-[12px] bg-orange/10 px-4 py-[13px]">
          <span className="text-[13px] font-semibold text-orange-700">
            {snapshot.bottom.label}
          </span>
          <span className="text-[22px] font-extrabold tracking-[-0.02em] text-orange">
            {snapshot.bottom.figure}
          </span>
        </div>
      </div>
    </div>
  );
}
