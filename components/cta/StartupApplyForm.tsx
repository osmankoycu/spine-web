"use client";

import { useCallback, useState, type FormEvent } from "react";
import { CheckCircle } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";
import { TEAM_SIZE_BUCKETS, type TeamSizeId } from "@/lib/funnel/teamSize";
import { CalendlyEmbed } from "./CalendlyEmbed";

// Application card for /startups — the EstimateForm three-step flow (form →
// Calendly scheduler in the same card → confirmation) with the program's extra
// fields: company, team size (the shared funnel buckets), an optional note, and
// a honeypot. Submits to /api/startups.

export function StartupApplyForm() {
  const [step, setStep] = useState<"form" | "booking" | "booked">("form");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [teamSize, setTeamSize] = useState<TeamSizeId | null>(null);
  const [note, setNote] = useState("");
  const [website, setWebsite] = useState(""); // honeypot — humans never see it
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onScheduled = useCallback(() => setStep("booked"), []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/startups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          company,
          teamSize,
          note,
          website,
          intent: "meeting",
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      // Only a 400 (bad details) is worth blocking on — any other failure is
      // ours, not theirs; log it and hand them the calendar anyway.
      if (res.status === 400) {
        setError(data.error ?? "Please check your details and try again.");
        setSending(false);
        return;
      }
      if (!res.ok) console.error("Application capture failed:", res.status, data.error);
      setStep("booking");
    } catch (err) {
      console.error("Application capture failed:", err);
      setStep("booking");
    }
  };

  if (step === "booked") {
    return (
      <div className="flex flex-col items-center rounded-[28px] border border-hairline bg-white p-8 text-center shadow-[0_30px_80px_-40px_rgba(20,20,18,0.35)] sm:p-10">
        <CheckCircle size={56} weight="fill" className="text-orange" />
        <h2 className="font-display mt-5 text-[28px] font-extrabold tracking-[-0.02em] text-ink">
          You&apos;re booked
        </h2>
        <p className="mt-3 max-w-[400px] text-[16px] leading-relaxed text-grey-text">
          The calendar invite is on its way to {email || "your inbox"}. We&apos;ll
          bring your cost audit to the call.
        </p>
      </div>
    );
  }

  // Same card, now the scheduler: tighter padding so the calendar gets the
  // width (mirrors EstimateForm).
  if (step === "booking") {
    return (
      <div className="rounded-[28px] border border-hairline bg-white p-3 shadow-[0_30px_80px_-40px_rgba(20,20,18,0.35)] sm:p-4 lg:-mx-6">
        <div className="px-2 pb-2 pt-2 text-center">
          <div className="text-[12px] font-extrabold uppercase tracking-[0.16em] text-orange-700">
            Startup program
          </div>
          <h2 className="mt-1.5 text-[21px] font-extrabold tracking-[-0.02em] text-ink">
            Pick a time
          </h2>
          <p className="mt-1 text-[13.5px] leading-snug text-grey-text">
            30 minutes with a Spine specialist
          </p>
        </div>
        <CalendlyEmbed
          firstName={firstName}
          lastName={lastName}
          email={email}
          onScheduled={onScheduled}
          className="h-[560px] sm:h-[640px]"
        />
      </div>
    );
  }

  const inputCls =
    "w-full rounded-2xl border border-black/15 bg-white px-5 py-4 text-[16px] text-ink outline-none transition-colors placeholder:text-grey-text/70 focus:border-orange focus:ring-4 focus:ring-orange/15";

  return (
    <form
      onSubmit={onSubmit}
      className="relative rounded-[28px] border border-hairline bg-white p-6 shadow-[0_30px_80px_-40px_rgba(20,20,18,0.35)] sm:p-8"
    >
      <div className="text-[12px] font-extrabold uppercase tracking-[0.16em] text-orange-700">
        Startup program
      </div>
      <h2 className="mt-2 text-[24px] font-extrabold tracking-[-0.02em] text-ink">
        Apply in 2 minutes
      </h2>
      <p className="mt-2 text-[14.5px] leading-[1.5] text-body-2">
        Tell us about the team and pick a 30-minute slot. Free, no commitment.
      </p>

      {/* Every field carries a real label (sr-only where the placeholder does
          the visual work) — same rationale as EstimateForm. */}
      <div className="mt-6 space-y-3">
        <label htmlFor="startup-email" className="sr-only">
          Work email
        </label>
        <input
          id="startup-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Work email"
          autoComplete="email"
          className={inputCls}
        />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="startup-first" className="sr-only">
              First name
            </label>
            <input
              id="startup-first"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              autoComplete="given-name"
              className={inputCls}
            />
          </div>
          <div>
            <label htmlFor="startup-last" className="sr-only">
              Last name
            </label>
            <input
              id="startup-last"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              autoComplete="family-name"
              className={inputCls}
            />
          </div>
        </div>
        <label htmlFor="startup-company" className="sr-only">
          Company
        </label>
        <input
          id="startup-company"
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company"
          autoComplete="organization"
          className={inputCls}
        />

        {/* Team size — the shared funnel buckets, as a segmented radio group. */}
        <div role="radiogroup" aria-label="How big is the team?">
          <div className="mb-2 mt-4 text-[13px] font-bold text-ink">
            How big is the team?
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {TEAM_SIZE_BUCKETS.map((b) => (
              <button
                key={b.id}
                type="button"
                role="radio"
                aria-checked={teamSize === b.id}
                onClick={() => setTeamSize(b.id)}
                className={cn(
                  "cursor-pointer rounded-2xl border px-3 py-3 text-[14px] font-semibold transition-colors",
                  teamSize === b.id
                    ? "border-orange bg-orange/10 text-ink"
                    : "border-black/15 bg-white text-body-2 hover:border-muted",
                )}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        <label htmlFor="startup-note" className="sr-only">
          Anything we should know?
        </label>
        <textarea
          id="startup-note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Anything we should know? (optional)"
          rows={3}
          className={cn(inputCls, "resize-none")}
        />

        {/* Honeypot: visually hidden, skipped by keyboard, ignored by autofill.
            Bots that fill every field trip it; the API then reports success
            without sending anything. */}
        <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
          <label htmlFor="startup-website">Website</label>
          <input
            id="startup-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-4 text-center text-[13.5px] font-medium text-orange-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="mt-6 w-full cursor-pointer rounded-pill bg-black px-8 py-4 text-[16px] font-semibold text-white transition-colors hover:bg-black/85 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {sending ? "Opening the calendar…" : "Apply and pick a time →"}
      </button>

      <p className="mt-5 text-center text-[12.5px] leading-relaxed text-grey-text">
        By submitting, you agree that Spine may contact you about our products and
        services, per our{" "}
        <a href="/privacy" className="font-medium text-ink underline underline-offset-2">
          privacy policy
        </a>
        .
      </p>
    </form>
  );
}
