"use client";

import { useCallback, useState, type FormEvent } from "react";
import { CheckCircle } from "@phosphor-icons/react";
import { CalendlyEmbed } from "./CalendlyEmbed";

// On-page version of the booking flow (same three steps as the DemoModal,
// embedded directly in the /request-a-demo cost-audit page): the card takes the
// details, emails us the lead, then becomes the Calendly scheduler in place —
// same card, no page change — and finally the confirmation.

export function EstimateForm() {
  const [step, setStep] = useState<"form" | "booking" | "booked">("form");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onScheduled = useCallback(() => setStep("booked"), []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName, lastName, intent: "meeting" }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      // Only a 400 (bad details) is worth blocking on — see DemoModal.
      if (res.status === 400) {
        setError(data.error ?? "Please check your details and try again.");
        setSending(false);
        return;
      }
      if (!res.ok) console.error("Lead capture failed:", res.status, data.error);
      setStep("booking");
    } catch (err) {
      console.error("Lead capture failed:", err);
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
          bring your savings numbers to the call.
        </p>
      </div>
    );
  }

  // Same card, now the scheduler: tighter padding so the calendar gets the
  // width, and it stretches a little into the column gap on desktop.
  if (step === "booking") {
    return (
      <div className="rounded-[28px] border border-hairline bg-white p-3 shadow-[0_30px_80px_-40px_rgba(20,20,18,0.35)] sm:p-4 lg:-mx-6">
        <div className="px-2 pb-2 pt-2 text-center">
          <div className="text-[12px] font-extrabold uppercase tracking-[0.16em] text-orange-700">
            Free cost audit
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
      className="rounded-[28px] border border-hairline bg-white p-6 shadow-[0_30px_80px_-40px_rgba(20,20,18,0.35)] sm:p-8"
    >
      <div className="text-[12px] font-extrabold uppercase tracking-[0.16em] text-orange-700">
        Free cost audit
      </div>
      <h2 className="mt-2 text-[24px] font-extrabold tracking-[-0.02em] text-ink">
        Get your savings estimate
      </h2>
      <p className="mt-2 text-[14.5px] leading-[1.5] text-body-2">
        Tell us who you are and pick a 30-minute slot — free, no commitment.
      </p>

      {/* Every field carries a real label. They were placeholder-only, so the
          field's identity vanished the moment you typed and screen readers got
          nothing — worst on a phone, where the three inputs stack tightly and
          autofill is in play. */}
      <div className="mt-6 space-y-3">
        <label htmlFor="estimate-email" className="sr-only">
          Work email
        </label>
        <input
          id="estimate-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Work email"
          autoComplete="email"
          className={inputCls}
        />
        {/* Side by side, each name field had ~80px of typing room at 375px —
            "First name" alone measures 75px. Stack them below sm. */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="estimate-first" className="sr-only">
              First name
            </label>
            <input
              id="estimate-first"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              autoComplete="given-name"
              className={inputCls}
            />
          </div>
          <div>
            <label htmlFor="estimate-last" className="sr-only">
              Last name
            </label>
            <input
              id="estimate-last"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              autoComplete="family-name"
              className={inputCls}
            />
          </div>
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
        {sending ? "Opening the calendar…" : "Pick a time →"}
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
