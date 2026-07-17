"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle } from "@phosphor-icons/react";

// On-page version of the savings-estimate capture (the same lead form as the
// DemoModal, embedded directly in the /request-a-demo cost-audit page). Posts
// work email + name to /api/estimate, then shows the success state in place.

export function EstimateForm() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName, lastName }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setSending(false);
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Network error. Please try again.");
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center rounded-[28px] border border-hairline bg-white p-8 text-center shadow-[0_30px_80px_-40px_rgba(20,20,18,0.35)] sm:p-10">
        <CheckCircle size={56} weight="fill" className="text-orange" />
        <h2 className="font-display mt-5 text-[28px] font-extrabold tracking-[-0.02em] text-ink">
          You&apos;re all set
        </h2>
        <p className="mt-3 max-w-[400px] text-[16px] leading-relaxed text-grey-text">
          Check your inbox. Your personalized Spine savings estimate is on its way.
        </p>
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
        Tell us where to send it. Estimate in 48 hours — free, no commitment.
      </p>

      <div className="mt-6 space-y-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Work email"
          autoComplete="email"
          className={inputCls}
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name"
            autoComplete="given-name"
            className={inputCls}
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last name"
            autoComplete="family-name"
            className={inputCls}
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
        {sending ? "Sending…" : "Get my estimate →"}
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
