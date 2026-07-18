import { ArrowRight, Info } from "@phosphor-icons/react/dist/ssr";
import { PlatformCloser } from "@/components/interior/PlatformCloser";
import { InteriorIcon } from "@/components/interior/icons";
import { Button, CheckRow, Eyebrow } from "@/components/interior/parts";
import { cn } from "@/lib/cn";

// "/resources/benefits-benchmarks" — a data/report page. Per the content
// decision, the figures are Spine's OWN modeled numbers (the illustrative
// savings table shared across the partner pages, ~25% avg reduction), framed
// honestly as Spine estimates — NOT a third-party survey dataset.

// Mirrors lib/interior/partners.ts `savingsTable` (kept honest with its caption).
const TABLE = {
  columns: ["Team size", "Annual spend", "Typical saving", "PEO fees removed"],
  rows: [
    { size: "20 employees", spend: "$260K", saving: "$65K/yr", peo: "$28K/yr" },
    { size: "60 employees", spend: "$780K", saving: "$195K/yr", peo: "$86K/yr" },
    { size: "150 employees", spend: "$1.95M", saving: "$487K/yr", peo: "$215K/yr" },
    { size: "300 employees", spend: "$3.9M", saving: "$975K/yr", peo: "$430K/yr", highlight: true },
  ],
  caption:
    "Illustrative figures based on ~25% average reduction. Actual savings depend on your current plans and geography.",
};

const METRICS = [
  { figure: "25%", label: "Average reduction in healthcare costs" },
  { figure: "$4K", label: "Saved per employee, per year" },
  { figure: "4–6%", label: "Renewal reduction on the ask" },
  { figure: "8–12%", label: "Cut from pharmacy spend" },
  { figure: "70%+", label: "Reduction in HR benefits tickets" },
  { figure: "$150–200", label: "Per-employee/mo PEO fees removed" },
];

const STAGES = [
  {
    icon: "RocketLaunch",
    stage: "Early / startup",
    body: "Right-sized plans from your first hire, benchmarked against your peer cohort.",
    stat: "~15%",
    statLabel: "day-one plan right-sizing",
  },
  {
    icon: "TrendUp",
    stage: "Mid-market · 30–200",
    body: "Off the PEO and onto your own optimized plans, with claims-data leverage each renewal.",
    stat: "25%",
    statLabel: "average cost reduction",
  },
  {
    icon: "Buildings",
    stage: "Enterprise · 200+",
    body: "Multi-state, multi-entity programs with renewals negotiated on your own data.",
    stat: "4–6%",
    statLabel: "renewal reduction on the ask",
  },
];

const container = "mx-auto max-w-[1240px] px-6 md:px-10";
const sectionHeading =
  "text-[32px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[40px]";

export function BenefitsBenchmarks() {
  return (
    <main className="bg-surface-page text-ink">
      {/* ── HERO (white) ── */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-[1480px] px-9 pb-16 pt-[140px] sm:px-[52px] lg:px-[60px]">
          <div className="max-w-[760px]">
            <Eyebrow>Resources · Benefits benchmarks</Eyebrow>
            <h1 className="mb-5 mt-4 text-[44px] font-extrabold leading-[0.99] tracking-[-0.035em] sm:text-[52px] lg:text-[60px]">
              <span className="text-ink">Benefits benchmarks.</span>
              <br />
              <span className="text-orange">See where you stand.</span>
            </h1>
            <p className="mb-[30px] max-w-[620px] text-[18px] leading-[1.55] text-body">
              What Spine sees across the companies we run benefits for — typical
              spend, savings, and PEO fees by team size. Use it to sanity-check
              your own numbers, then get a custom estimate for your workforce.
            </p>
            <div className="mb-[26px] flex flex-wrap gap-3">
              <Button cta={{ label: "Get your custom benchmark", href: "#demo" }} arrow />
              <Button cta={{ label: "See the platform", href: "/" }} variant="secondary" />
            </div>
            <CheckRow items={["From Spine's own book", "By team size & stage", "Free custom estimate"]} />
          </div>
        </div>
      </section>

      {/* ── STAT BAR (dark) — headline benchmark metrics ── */}
      <section className="mx-auto max-w-[1240px] px-6 py-10 md:px-10">
        <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#15140f]">
          {/* gap-px over a white/10 backdrop draws clean hairlines between cells,
              across both the 2-col (mobile) and 3-col (desktop) wraps. */}
          <div className="grid grid-cols-2 gap-px bg-white/10 lg:grid-cols-3">
            {METRICS.map((m) => (
              <div key={m.label} className="bg-[#15140f] px-7 py-8">
                <div className="whitespace-nowrap text-[28px] font-extrabold tracking-[-0.03em] text-white sm:text-[32px]">
                  {m.figure}
                </div>
                <div className="mt-2 text-[13.5px] text-white/55">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SAVINGS BY TEAM SIZE (the table) ── */}
      <section className={`${container} py-16`}>
        <div className="mx-auto max-w-[680px] text-center">
          <Eyebrow>Savings by team size</Eyebrow>
          <h2 className={`mt-4 ${sectionHeading}`}>The bigger the team, the bigger the win.</h2>
          <p className="mx-auto mt-3 max-w-[560px] text-[17px] leading-[1.55] text-body-2">
            Typical annual benefits spend, what Spine saves, and the PEO admin
            fees that disappear — modeled at ~25% average reduction.
          </p>
        </div>

        <div className="mt-11 overflow-hidden rounded-[24px] border border-hairline bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="border-b border-hairline bg-[#faf9f7]">
                  {TABLE.columns.map((c) => (
                    <th
                      key={c}
                      className="px-6 py-4 text-[12px] font-bold uppercase tracking-[0.08em] text-muted"
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TABLE.rows.map((r) => (
                  <tr
                    key={r.size}
                    className={cn(
                      "border-b border-hairline last:border-b-0",
                      r.highlight && "bg-cobalt-400/[0.05]",
                    )}
                  >
                    <td className="px-6 py-[18px] text-[15px] font-bold text-ink">{r.size}</td>
                    <td className="px-6 py-[18px] text-[15px] text-body">{r.spend}</td>
                    <td
                      className={cn(
                        "px-6 py-[18px] text-[15px] font-extrabold",
                        r.highlight ? "text-cobalt-400" : "text-cobalt-500",
                      )}
                    >
                      {r.saving}
                    </td>
                    <td className="px-6 py-[18px] text-[15px] text-body">{r.peo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Honest framing — these are Spine's own modeled figures, not a survey. */}
        <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-hairline bg-white px-5 py-4">
          <Info size={18} weight="bold" className="mt-px shrink-0 text-muted" />
          <p className="text-[13px] leading-[1.5] text-body-2">
            {TABLE.caption} These are Spine&apos;s own figures from the companies we
            run benefits for — not a third-party survey.
          </p>
        </div>
      </section>

      {/* ── BY STAGE ── */}
      <section className={`${container} pb-4`}>
        <div className="mx-auto max-w-[680px] text-center">
          <Eyebrow>By stage</Eyebrow>
          <h2 className={`mt-4 ${sectionHeading}`}>What good looks like, wherever you are.</h2>
        </div>
        <div className="mt-11 grid gap-4 md:grid-cols-3">
          {STAGES.map((s) => (
            <div key={s.stage} className="rounded-[20px] border border-hairline bg-white px-6 py-[26px]">
              <span className="mb-4 grid size-12 place-items-center rounded-[13px] bg-cobalt-100">
                <InteriorIcon name={s.icon} size={24} className="text-cobalt-400" />
              </span>
              <div className="text-[12px] font-bold uppercase tracking-[0.08em] text-cobalt-600">
                {s.stage}
              </div>
              <p className="mt-2 text-[14px] leading-[1.5] text-body-2">{s.body}</p>
              <div className="mt-5 border-t border-hairline pt-4">
                <div className="text-[26px] font-extrabold tracking-[-0.02em] text-cobalt-400">
                  {s.stat}
                </div>
                <div className="mt-0.5 text-[12.5px] text-subline">{s.statLabel}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── LINK OUT ── */}
      <section className={`${container} pb-16 pt-10`}>
        <a
          href="/resources/peo-exit-guide"
          className="group flex flex-wrap items-center justify-between gap-4 rounded-[24px] border border-hairline bg-white px-7 py-6"
        >
          <div>
            <div className="text-[17px] font-extrabold tracking-[-0.01em] text-ink">
              Most of these savings start with a PEO exit.
            </div>
            <div className="mt-1 text-[14px] text-body-2">
              See the signals, the switch path, and the FAQ in the PEO exit guide.
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 text-[14px] font-bold text-orange-700">
            PEO exit guide
            <ArrowRight
              size={15}
              weight="bold"
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </span>
        </a>
      </section>

      {/* ── CLOSER ── */}
      <PlatformCloser
        cta={{
          heading: { pre: "See your own", accent: "numbers." },
          lead: "Free cost audit. We model your current plans against our optimization engine and show you a personalized benchmark for your workforce — in 48 hours.",
          button: { label: "Run free cost analysis", href: "#demo" },
        }}
      />
    </main>
  );
}
