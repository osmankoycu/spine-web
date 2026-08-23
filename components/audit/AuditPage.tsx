"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getLenis } from "@/lib/lenis";
import { prefersReducedMotion } from "@/lib/reducedMotion";
import { headcountBucket, track } from "@/lib/audit/track";
import { variantFromRef } from "@/lib/audit/ycVariant";
import { estimate, type AuditInput, type AuditResult } from "@/lib/audit/auditEngine";
import type { CensusAggregates } from "@/lib/audit/censusParse";
import type { HrisFormatId } from "@/lib/audit/hrisFormats";
import {
  buildAuditLeadPayload,
  dominantState,
  type AuditLeadPayload,
  type CensusState,
} from "@/lib/audit/leadPayload";
import { Reveal } from "@/components/sections/Reveal";
import { BenchmarkPreview, type PreviewInputs } from "./BenchmarkPreview";
import { CompanyBasics, parsePremium, type BasicsValue } from "./CompanyBasics";
import { CensusUpload } from "./CensusUpload";
import { EmailGate } from "./EmailGate";
import { ResultsPanel } from "./ResultsPanel";

// Orchestrator for the audit flow: one continuous page, progressive
// disclosure. Steps append below as the visitor completes them (never
// regress), and the page auto-scrolls to each newly revealed step. Owns all
// shared state; the estimate input is assembled here from step 0's sliders,
// step 1's basics, and step 2's census aggregates. The lead POST sends
// aggregates only — rows never leave censusParse's caller.

type Stage = "preview" | "basics" | "census" | "results";
const STAGE_ORDER: Stage[] = ["preview", "basics", "census", "results"];
const reached = (stage: Stage, target: Stage) =>
  STAGE_ORDER.indexOf(stage) >= STAGE_ORDER.indexOf(target);

export function AuditPage() {
  const searchParams = useSearchParams();
  const variant = variantFromRef(searchParams.get("ref"));

  const [stage, setStage] = useState<Stage>("preview");
  const [preview, setPreview] = useState<PreviewInputs>({
    headcount: 25,
    state: "",
    avgAge: 40,
  });
  const [basics, setBasics] = useState<BasicsValue>({
    carrier: "",
    renewalMonth: 0,
    premiumRaw: "",
  });
  const [census, setCensus] = useState<CensusState>({ kind: "none" });
  const [gateEmail, setGateEmail] = useState<string | null>(null);

  const withRef = (props: Record<string, string | number | boolean> = {}) =>
    variant ? { ...props, ref: variant.ref } : props;

  const viewedRef = useRef(false);
  useEffect(() => {
    if (viewedRef.current) return;
    viewedRef.current = true;
    track("audit_view", withRef());
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fire once per page view
  }, []);

  const scrollToAnchor = (anchor: string) => {
    const el = document.getElementById(anchor);
    if (!el) return;
    const lenis = getLenis();
    // Standalone shell has no fixed header; the small offset is just breathing
    // room above the card.
    if (lenis) lenis.scrollTo(el, { offset: -24 });
    else el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };

  // A newly revealed step mounts on the stage change; the effect below runs
  // after that DOM update, so the anchor exists by the time we scroll to it.
  // Re-triggering an already-reached stage scrolls straight away instead.
  const pendingScrollRef = useRef<string | null>(null);
  useEffect(() => {
    const anchor = pendingScrollRef.current;
    if (!anchor) return;
    pendingScrollRef.current = null;
    scrollToAnchor(anchor);
  }, [stage]);

  const advance = (next: Stage, anchor: string) => {
    if (reached(stage, next)) {
      scrollToAnchor(anchor);
      return;
    }
    pendingScrollRef.current = anchor;
    setStage(next);
  };

  // ── Estimate assembly ──
  const aggregates = census.kind === "parsed" ? census.aggregates : null;
  const baseInput: AuditInput = useMemo(
    () => ({
      headcount: aggregates?.employeeCount ?? preview.headcount,
      state:
        (aggregates ? dominantState(aggregates.states) : undefined) ??
        (preview.state || undefined),
      ages: aggregates?.ages,
      avgAge: aggregates ? undefined : preview.avgAge,
      carrier: basics.carrier || undefined,
      tierCounts: aggregates?.tierCounts,
    }),
    [aggregates, preview, basics.carrier],
  );
  const initialPremium = useMemo(() => parsePremium(basics.premiumRaw), [basics.premiumRaw]);

  // ── Lead posting ──
  const buildPayload = (
    mode: "lead" | "copy",
    email: string,
    result: AuditResult,
    premium: number | null,
  ): AuditLeadPayload =>
    buildAuditLeadPayload({
      mode,
      email,
      ref: variant?.ref ?? null,
      preview,
      carrier: basics.carrier,
      renewalMonth: basics.renewalMonth,
      premium,
      census,
      result,
    });

  const post = async (payload: AuditLeadPayload) => {
    const res = await fetch("/api/audit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res;
  };

  // Gate policy mirrors the demo form: only a 400 (bad email) blocks the
  // reveal; a server hiccup is logged and the visitor still gets their number.
  const onGateSubmit = async (email: string): Promise<{ ok: boolean; error?: string }> => {
    const result = estimate({
      ...baseInput,
      currentMonthlyTotal: initialPremium ?? undefined,
    });
    try {
      const res = await post(buildPayload("lead", email, result, initialPremium));
      if (res.status === 400) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        return { ok: false, error: data.error };
      }
      if (!res.ok) {
        console.error("Audit lead capture failed:", res.status);
        track("audit_lead_send_failed", withRef({ reason: `http_${res.status}` }));
      }
    } catch (err) {
      console.error("Audit lead capture failed:", err);
      track("audit_lead_send_failed", withRef({ reason: "network" }));
    }
    track("audit_email_submitted", withRef());
    setGateEmail(email);
    return { ok: true };
  };

  // The copy goes to the visitor, so here a failure is worth surfacing.
  const onEmailCopy = async (result: AuditResult, premium: number | null) => {
    if (!gateEmail) return false;
    try {
      const res = await post(buildPayload("copy", gateEmail, result, premium));
      return res.ok;
    } catch (err) {
      console.error("Audit result copy failed:", err);
      return false;
    }
  };

  const onCensusParsed = (parsed: CensusAggregates, format: HrisFormatId) => {
    setCensus({ kind: "parsed", aggregates: parsed, format });
    track(
      "audit_census_uploaded",
      withRef({
        source_format: format,
        employee_bucket: headcountBucket(parsed.employeeCount),
      }),
    );
    advance("results", "audit-step-3");
  };

  const onCensusSkip = () => {
    setCensus({ kind: "skipped" });
    track("audit_census_skipped", withRef());
    advance("results", "audit-step-3");
  };

  const onBasicsContinue = () => {
    track(
      "audit_basics_completed",
      withRef({
        carrier: basics.carrier,
        has_premium: initialPremium !== null,
        has_renewal_month: basics.renewalMonth > 0,
      }),
    );
    advance("census", "audit-step-2");
  };

  return (
    <main className="bg-surface-page text-ink">
      <BenchmarkPreview
        value={preview}
        onChange={setPreview}
        onCta={() => advance("basics", "audit-step-1")}
        variant={variant}
      />

      <div className="mx-auto max-w-[1080px] space-y-10 px-6 pb-24 md:px-10">
        {reached(stage, "basics") && (
          <section id="audit-step-1" className="scroll-mt-6">
            <Reveal>
              <CompanyBasics
                value={basics}
                onChange={setBasics}
                onContinue={onBasicsContinue}
              />
            </Reveal>
          </section>
        )}

        {reached(stage, "census") && (
          <section id="audit-step-2" className="scroll-mt-6">
            <Reveal>
              <CensusUpload onParsed={onCensusParsed} onSkip={onCensusSkip} />
            </Reveal>
          </section>
        )}

        {reached(stage, "results") && (
          <section id="audit-step-3" className="scroll-mt-6">
            {gateEmail === null ? (
              <Reveal>
                <EmailGate onSubmit={onGateSubmit} />
              </Reveal>
            ) : (
              <ResultsPanel
                baseInput={baseInput}
                initialPremium={initialPremium}
                variant={variant}
                onEmailCopy={onEmailCopy}
                onBookCta={() => track("audit_call_cta_clicked", withRef())}
              />
            )}
          </section>
        )}
      </div>
    </main>
  );
}
