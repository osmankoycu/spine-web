"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/reducedMotion";
import { estimate, type AuditInput, type AuditResult } from "@/lib/audit/auditEngine";
import { RANGE_BY_CONFIDENCE, type Confidence } from "@/lib/audit/rates";
import { overpaymentBucket, track } from "@/lib/audit/track";
import { parsePremium } from "./CompanyBasics";
import type { AuditVariant } from "@/lib/audit/ycVariant";
import { SlackCta } from "@/components/funnel/SlackCta";
import { SlackPreview } from "@/components/funnel/SlackPreview";
import { ArchetypeCards } from "./ArchetypeCards";
import { SpendGauge } from "./SpendGauge";
import { IconCheckCircle, IconZap } from "./icons";

// The payoff. Count-up verdict, gauge, archetype directions, CTAs. When the
// visitor didn't give an invoice total, an inline field sits under the verdict
// and live-tightens the displayed range (±60% rough → ±30% reported) as they
// type — the range narrowing is the trust moment that nudges the data out.
// The "you look well-priced" state is a first-class verdict, not a fallback.

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");
const pctLabel = (c: Confidence) => `±${Math.round(RANGE_BY_CONFIDENCE[c] * 100)}%`;

const CONFIDENCE_CHIPS: Record<Confidence, { label: string; cls: string }> = {
  reported: { label: "Based on your invoice", cls: "bg-success-tint text-success" },
  estimated: { label: "Estimated from your census", cls: "bg-grey-pill text-ink-2" },
  rough: { label: "Rough estimate from your inputs", cls: "bg-grey-pill text-ink-2" },
};

export function ResultsPanel({
  baseInput,
  initialPremium,
  variant,
  onEmailCopy,
  onBookCta,
  onSlackCta,
}: {
  baseInput: AuditInput; // without currentMonthlyTotal
  initialPremium: number | null;
  variant: AuditVariant | null;
  onEmailCopy: (result: AuditResult, premium: number | null) => Promise<boolean>;
  onBookCta: () => void;
  onSlackCta: () => void;
}) {
  const [premium, setPremium] = useState<number | null>(initialPremium);
  const [premiumRaw, setPremiumRaw] = useState("");
  const [copyState, setCopyState] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const debounceRef = useRef<number | null>(null);

  const result = useMemo(
    () => estimate({ ...baseInput, currentMonthlyTotal: premium ?? undefined }),
    [baseInput, premium],
  );

  // One result-viewed event per confidence level reached (mount + tighten).
  const seenConfidence = useRef<Set<Confidence>>(new Set());
  useEffect(() => {
    if (seenConfidence.current.has(result.confidence)) return;
    seenConfidence.current.add(result.confidence);
    track("audit_result_viewed", {
      funnel: "audit",
      overpayment_bucket: overpaymentBucket(
        result.annualOverpaymentLow,
        result.annualOverpaymentHigh,
        result.wellPriced,
      ),
      confidence: result.confidence,
      ...(variant ? { ref: variant.ref } : {}),
    });
  }, [result, variant]);

  // Reveal rise on mount.
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = rootRef.current;
    if (!el || prefersReducedMotion()) return;
    const tween = gsap.from(el, { opacity: 0, y: 18, duration: 0.6, ease: "power3.out" });
    // Kill + clear on cleanup so StrictMode's dev double-mount can't pin the
    // panel at a mid-tween opacity (see ScanReport for the visible case).
    return () => {
      tween.kill();
      gsap.set(el, { clearProps: "opacity,transform" });
    };
  }, []);

  // Count-up: 0 → range on mount, current → new range when it tightens.
  const lowRef = useRef<HTMLSpanElement>(null);
  const highRef = useRef<HTMLSpanElement>(null);
  const proxyRef = useRef<{ low: number; high: number }>({ low: 0, high: 0 });
  const low = result.annualOverpaymentLow;
  const high = result.annualOverpaymentHigh;
  useEffect(() => {
    const proxy = proxyRef.current;
    const write = () => {
      if (lowRef.current) lowRef.current.textContent = usd(proxy.low);
      if (highRef.current) highRef.current.textContent = usd(proxy.high);
    };
    if (prefersReducedMotion()) {
      proxy.low = low;
      proxy.high = high;
      write();
      return;
    }
    gsap.to(proxy, {
      low,
      high,
      duration: 1.1,
      ease: "expo.out",
      snap: { low: 100, high: 100 },
      overwrite: "auto",
      onUpdate: write,
    });
  }, [low, high]);

  const onPremiumInput = (raw: string) => {
    setPremiumRaw(raw);
    if (debounceRef.current !== null) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      setPremium(parsePremium(raw));
    }, 450);
  };

  const emailCopy = async () => {
    if (copyState === "sending" || copyState === "sent") return;
    setCopyState("sending");
    const ok = await onEmailCopy(result, premium);
    setCopyState(ok ? "sent" : "failed");
  };

  const showTightener = initialPremium === null;
  const untightened = premium === null;

  return (
    <div
      ref={rootRef}
      className="rounded-[24px] border border-hairline bg-white p-6 shadow-[0_30px_80px_-40px_rgba(20,20,18,0.35)] sm:p-8"
    >
      <div className="flex flex-wrap items-center gap-3">
        <div className="text-[11.5px] font-extrabold uppercase tracking-[0.16em] text-orange-700">
          Your result
        </div>
        <span
          className={`rounded-pill px-3 py-1 text-[11.5px] font-bold ${CONFIDENCE_CHIPS[result.confidence].cls}`}
        >
          {CONFIDENCE_CHIPS[result.confidence].label}
        </span>
      </div>

      {/* ── Verdict ── */}
      {result.wellPriced ? (
        <div className="mt-6 rounded-[20px] border border-success/25 bg-success-tint p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <IconCheckCircle size={40} className="mt-0.5 shrink-0 text-success" />
            <div>
              <h2 className="text-[26px] font-extrabold leading-tight tracking-[-0.02em] text-ink sm:text-[32px]">
                Good news: you look well-priced.
              </h2>
              <p className="mt-2 max-w-[560px] text-[15px] leading-[1.55] text-ink-2">
                On what you told us, your spend sits inside the market band for a
                team like yours. That&apos;s rare, and worth knowing for certain.
                One free call confirms it.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <div className="text-[15px] font-medium text-body-2">
            Estimated annual overpayment
          </div>
          <div className="mt-1 text-[34px] font-extrabold leading-[1.05] tracking-[-0.03em] text-orange-700 sm:text-[46px] lg:text-[56px]">
            {/* Proportional figures on purpose — tabular commas gap out
                ("$1 , 120") in this face. See BenchmarkPreview. */}
            {low > 0 ? (
              <>
                <span ref={lowRef}>{usd(0)}</span>
                <span className="px-1.5 text-grey-word">–</span>
                <span ref={highRef}>{usd(0)}</span>
              </>
            ) : (
              <>
                <span className="text-[0.6em] font-bold text-ink">up to </span>
                <span ref={highRef}>{usd(0)}</span>
              </>
            )}
          </div>
          <p className="mt-2 text-[13.5px] text-muted">
            A range, on purpose. The exact number takes one call.
          </p>
        </div>
      )}

      {/* ── Invoice tightener: reserved space whenever step 1 had no total ── */}
      {showTightener && (
        <div
          className={`mt-6 rounded-[16px] border p-5 transition-colors ${
            untightened ? "border-orange-150 bg-orange-100" : "border-success/25 bg-success-tint"
          }`}
        >
          <div className="flex items-start gap-3">
            <IconZap
              size={18}
              className={`mt-0.5 shrink-0 ${untightened ? "text-orange-ink" : "text-success"}`}
            />
            <div className="w-full">
              <p className={`text-[14px] font-bold ${untightened ? "text-orange-ink" : "text-success"}`}>
                {untightened
                  ? `Have your invoice handy? This range is ${pctLabel(result.confidence)} without it.`
                  : "Range tightened to ±30% with your invoice."}
              </p>
              <div className="mt-3 flex max-w-[420px] items-center gap-3">
                <label htmlFor="audit-tighten" className="sr-only">
                  Monthly premium total from your invoice
                </label>
                <input
                  id="audit-tighten"
                  type="text"
                  inputMode="decimal"
                  value={premiumRaw}
                  onChange={(e) => onPremiumInput(e.target.value)}
                  placeholder="Monthly total, e.g. $24,000"
                  className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-grey-text/70 focus:border-orange focus:ring-4 focus:ring-orange/15"
                />
              </div>
              {untightened && (
                <p className="mt-2 text-[12.5px] text-orange-ink/80">
                  Type it and watch the range tighten to ±30%. Live, nothing sent.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Gauge ── */}
      <div className="mt-8">
        <SpendGauge
          expectedPEPM={result.expectedPEPM}
          currentPEPM={result.currentPEPM}
          wellPriced={result.wellPriced}
        />
      </div>

      {/* ── Plan-mix directions ── */}
      <div className="mt-9">
        <ArchetypeCards archetypes={result.archetypes} wellPriced={result.wellPriced} />
      </div>

      {/* ── CTA: Slack primary on every verdict state ── */}
      <div className="mt-9">
        <SlackCta
          headline={
            result.wellPriced
              ? "Confirm it in your Slack."
              : "Your exact number lands in your Slack."
          }
          body="Add Spine and a licensed specialist picks this up today. One conversation, the exact answer to whether you're overpaying, and by how much. Free, no sales loop. Carriers pay us."
          note={variant?.perk}
          handoffBody={{
            funnel: "audit",
            result: {
              wellPriced: result.wellPriced,
              annualOverpaymentLow: result.annualOverpaymentLow,
              annualOverpaymentHigh: result.annualOverpaymentHigh,
              confidence: result.confidence,
            },
            ...(variant ? { ref: variant.ref } : {}),
          }}
          onSlackCta={onSlackCta}
          onCallCta={onBookCta}
          preview={
            <SlackPreview
              channel="spine"
              message={
                result.wellPriced ? (
                  <>
                    Hey, I have your audit. You look{" "}
                    <b className="font-extrabold">well-priced</b> against the market
                    band for a team your size. I&apos;m verifying it against live
                    carrier rates and I&apos;ll tell you either way.
                  </>
                ) : (
                  <>
                    Hey, I have your audit. You&apos;re running{" "}
                    <b className="font-extrabold">
                      {usd(result.annualOverpaymentLow)} to{" "}
                      {usd(result.annualOverpaymentHigh)} a year
                    </b>{" "}
                    above the market band. I&apos;m pulling real quotes to pin the
                    exact number.
                  </>
                )
              }
              itemsTitle="What I'm starting on"
              items={[
                {
                  label: `Verify your ${usd(result.currentPEPM)} per employee against filed rates`,
                  tag: CONFIDENCE_CHIPS[result.confidence].label,
                },
                {
                  label: `Quote the ${result.archetypes[0]?.label ?? "best-fit"} mix with three carriers`,
                  tag: "This week",
                },
                { label: "Your census, parsed and ready", tag: "Done", done: true },
              ]}
            />
          }
          extra={
            <button
              type="button"
              onClick={emailCopy}
              disabled={copyState === "sending" || copyState === "sent"}
              className="cursor-pointer text-[13px] font-semibold text-white/55 underline underline-offset-2 transition-colors hover:text-white disabled:cursor-default disabled:no-underline"
            >
              {copyState === "sent"
                ? "Sent. Check your inbox."
                : copyState === "sending"
                  ? "Sending…"
                  : copyState === "failed"
                    ? "Could not send. Try again"
                    : "Email me this result"}
            </button>
          }
        />
      </div>
    </div>
  );
}
