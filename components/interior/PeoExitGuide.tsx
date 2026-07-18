import Link from "next/link";
import { ArrowRight, Check } from "@phosphor-icons/react/dist/ssr";
import { sanityFetch } from "@/lib/sanity/client";
import { POSTS_QUERY } from "@/lib/sanity/queries";
import type { PostCardData } from "@/lib/sanity/types";
import { PlatformCloser } from "@/components/interior/PlatformCloser";
import { InteriorIcon } from "@/components/interior/icons";
import { Button, CheckRow, Eyebrow } from "@/components/interior/parts";

// "/resources/peo-exit-guide" — a curated guide for teams leaving a PEO. Copy is
// drawn from the compare/TriNet page (the exit path, the trade-offs, the FAQ) and
// it surfaces the existing "Leaving your PEO" blog posts from Sanity. The lead
// capture routes to the same savings estimate (#demo) as "Get your PEO exit plan".

const SIGNALS = [
  "Your renewal climbs every year and no one shops it for you",
  "Per-employee PEO fees are quietly adding up as you hire",
  "You're raising, and co-employment complicates your cap table",
  "You're hiring across states and want to keep your own entity",
  "Your team can't get a straight answer on their benefits",
];

// The exit path — from the compare/TriNet "switch" section.
const STEPS = [
  {
    title: "Free exit audit",
    body: "We map your PEO plans, rates and renewal timing, then model what your own optimized plans would cost. You see the savings in 48 hours.",
  },
  {
    title: "Set up your group",
    body: "We stand up your own carrier plans on your EIN, sign the broker-of-record letter, and sequence the transition around your renewal so nobody loses coverage.",
  },
  {
    title: "Go live in 7–10 days",
    body: "Employees onboard in the Heal app, compliance and multi-state tax move onto autopilot, and payroll keeps running on your existing stack.",
  },
];

// The trade-offs you stop making — from the compare/TriNet "differences".
const CHANGES = [
  {
    icon: "Signature",
    title: "No co-employment",
    body: "Hire on your own EIN. Your cap table, equity plan and workers' comp stop routing through a PEO.",
  },
  {
    icon: "ChartLineUp",
    title: "Your own optimized plans",
    body: "Instead of a master pool, AI right-sizes plans to your workforce and shops every carrier — up to 25% off.",
  },
  {
    icon: "CurrencyCircleDollar",
    title: "No per-employee fees",
    body: "PEOs charge $150–200 per employee per month. Spine is free to your company — we earn carrier commission.",
  },
  {
    icon: "PlugsConnected",
    title: "Keep your stack",
    body: "No forced migration. Spine runs on top of the payroll and HRIS you already use.",
  },
  {
    icon: "Door",
    title: "Zero exit tax",
    body: "There's no PEO to exit next time. Your entity, plans, carriers and records are already in your name.",
  },
  {
    icon: "UserCircle",
    title: "A real, named expert",
    body: "A dedicated senior consultant — plus a 50+ vetted fractional-HR network — instead of a support pool.",
  },
];

// The FAQ — from the compare/TriNet "faq".
const FAQ = [
  {
    q: "Do my employees lose coverage when we leave the PEO?",
    a: "No. We time the move around your renewal and stand up your own plans before the PEO plans end, so coverage is continuous. Digital cards are live in the Heal app on day one.",
  },
  {
    q: "Is Spine a PEO too?",
    a: "No. Spine is an AI-native brokerage and service layer. There's no co-employment — your team stays on your EIN and your own group plans.",
  },
  {
    q: "How is it free if the PEO charges per employee?",
    a: "Spine is paid by carriers through standard broker commission. There are no setup fees, admin fees, or per-employee charges to your company.",
  },
  {
    q: "Do we have to change payroll?",
    a: "No. Spine runs on top of whatever you use — Gusto, Rippling, ADP, Justworks or Deel. Leaving the PEO doesn't mean a payroll migration.",
  },
];

const container = "mx-auto max-w-[1240px] px-6 md:px-10";
const sectionHeading =
  "text-[32px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[40px]";

async function peoPosts(): Promise<PostCardData[]> {
  try {
    const posts = await sanityFetch<PostCardData[]>(POSTS_QUERY, {}, ["post"]);
    return posts
      .filter((p) => {
        const cat = (p.category ?? "").toLowerCase();
        const slug = (p.slug ?? "").toLowerCase();
        return cat.includes("peo") || slug.includes("peo");
      })
      .slice(0, 4);
  } catch {
    return [];
  }
}

export async function PeoExitGuide() {
  const posts = await peoPosts();

  return (
    <main className="bg-surface-page text-ink">
      {/* ── HERO (white) ── */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-[1480px] px-9 pb-16 pt-[140px] sm:px-[52px] lg:px-[60px]">
          <div className="max-w-[760px]">
            <Eyebrow>Resources · PEO exit guide</Eyebrow>
            <h1 className="mb-5 mt-4 text-[44px] font-extrabold leading-[0.99] tracking-[-0.035em] sm:text-[52px] lg:text-[60px]">
              <span className="text-ink">Leaving your PEO?</span>
              <br />
              <span className="text-orange">We&apos;ll get you out clean.</span>
            </h1>
            <p className="mb-[30px] max-w-[620px] text-[18px] leading-[1.55] text-body">
              A PEO exit usually means re-securing benefits, re-rating, and
              re-implementing. It doesn&apos;t have to. Spine stands up your own
              plans on your own entity and sequences the switch around your
              renewal — so nobody loses coverage.
            </p>
            <div className="mb-[26px] flex flex-wrap gap-3">
              <Button cta={{ label: "Get your PEO exit plan", href: "#demo" }} arrow />
              <Button cta={{ label: "Compare vs TriNet", href: "/compare/trinet" }} variant="secondary" />
            </div>
            <CheckRow items={["48-hour exit audit", "Live in 7–10 days", "Zero exit tax"]} />
          </div>
        </div>
      </section>

      {/* ── SIGNALS ── */}
      <section className={`${container} py-16`}>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
          <div>
            <Eyebrow>Is it time?</Eyebrow>
            <h2 className={`mt-4 ${sectionHeading}`}>Five signs you&apos;ve outgrown your PEO.</h2>
            <p className="mt-3 max-w-[440px] text-[17px] leading-[1.55] text-body-2">
              PEOs are a good on-ramp. But as you scale, the pooled plans and
              per-head fees start working against you.
            </p>
          </div>
          <div className="rounded-[24px] border border-hairline bg-white p-7 sm:p-8">
            <ul className="space-y-4">
              {SIGNALS.map((s) => (
                <li key={s} className="flex items-start gap-3">
                  <span className="mt-px flex size-[20px] shrink-0 items-center justify-center rounded-full bg-orange/10 text-orange">
                    <Check size={12} weight="bold" />
                  </span>
                  <span className="text-[15px] leading-[1.5] text-[#2e2d28]">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── THE EXIT PATH (dark box) ── */}
      <section className={`${container} pb-16`}>
        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[#15140f] px-7 pb-9 pt-10 shadow-[0_40px_90px_-50px_rgba(0,0,0,0.5)] sm:px-10 lg:px-[60px] lg:pb-[52px] lg:pt-[56px]">
          <div className="mb-10 text-center">
            <p className="text-[12px] font-extrabold uppercase tracking-[0.16em] text-orange">
              The exit path
            </p>
            <h2 className="mt-4 text-[32px] font-extrabold leading-[1.05] tracking-[-0.03em] text-white sm:text-[40px]">
              Off the PEO, onto your own entity.
            </h2>
          </div>
          <div className="grid grid-cols-1 divide-y divide-white/10 lg:grid-cols-3 lg:divide-y-0">
            {STEPS.map((s, i) => (
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

      {/* ── WHAT CHANGES ── */}
      <section className={`${container} pb-4`}>
        <div className="mx-auto max-w-[680px] text-center">
          <Eyebrow>What actually changes</Eyebrow>
          <h2 className={`mt-4 ${sectionHeading}`}>The PEO trade-offs you stop making.</h2>
          <p className="mx-auto mt-3 max-w-[560px] text-[17px] leading-[1.55] text-body-2">
            You keep the enterprise benefits and compliance. You drop the
            co-employment, the fees, and the lock-in.
          </p>
        </div>
        <div className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CHANGES.map((c) => (
            <div key={c.title} className="rounded-[20px] border border-hairline bg-white px-6 py-[26px]">
              <span className="mb-4 grid size-12 place-items-center rounded-[13px] bg-orange-100">
                <InteriorIcon name={c.icon} size={24} className="text-orange-700" />
              </span>
              <h3 className="mb-[7px] text-[17px] font-extrabold tracking-[-0.01em]">{c.title}</h3>
              <p className="text-[14px] leading-[1.5] text-body-2">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className={`${container} py-16`}>
        <div className="mx-auto max-w-[720px]">
          <div className="text-center">
            <Eyebrow>Common questions</Eyebrow>
            <h2 className={`mt-4 ${sectionHeading}`}>Switching from a PEO, answered.</h2>
          </div>
          <div className="mt-10 divide-y divide-hairline overflow-hidden rounded-[24px] border border-hairline bg-white">
            {FAQ.map((f) => (
              <div key={f.q} className="px-7 py-6">
                <h3 className="text-[16.5px] font-extrabold tracking-[-0.01em] text-ink">{f.q}</h3>
                <p className="mt-2 text-[14.5px] leading-[1.55] text-body-2">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── READ THE PLAYBOOK (blog posts) ── */}
      {posts.length > 0 && (
        <section className={`${container} pb-16`}>
          <div className="mx-auto max-w-[680px] text-center">
            <Eyebrow>Read the playbook</Eyebrow>
            <h2 className={`mt-4 ${sectionHeading}`}>Go deeper on the PEO exit.</h2>
            <p className="mx-auto mt-3 max-w-[560px] text-[17px] leading-[1.55] text-body-2">
              The cost math, the 90-day timeline, and the signals — written out in
              full on the Spine blog.
            </p>
          </div>
          <div className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <Link
                key={p._id}
                href={`/blog/${p.slug}`}
                className="group flex flex-col rounded-[20px] border border-hairline bg-white px-6 py-[26px] transition-shadow duration-200 hover:shadow-[0_24px_50px_-40px_rgba(20,20,18,0.4)]"
              >
                {p.category && (
                  <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-orange-700">
                    {p.category}
                  </span>
                )}
                <h3 className="mt-2 text-[17px] font-extrabold leading-snug tracking-[-0.01em] text-ink">
                  {p.title}
                </h3>
                {p.excerpt && (
                  <p className="mt-2 line-clamp-3 text-[14px] leading-[1.5] text-body-2">
                    {p.excerpt}
                  </p>
                )}
                <span className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-bold text-orange-700">
                  Read
                  <ArrowRight
                    size={14}
                    weight="bold"
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── CLOSER ── */}
      <PlatformCloser
        cta={{
          heading: { pre: "See what your PEO is", accent: "really costing you." },
          lead: "Free exit audit. We pull your current PEO plans and fees, model your own optimized plans, and show you exactly what you'd save — in 48 hours.",
          button: { label: "Run my free PEO exit audit", href: "#demo" },
        }}
      />
    </main>
  );
}
