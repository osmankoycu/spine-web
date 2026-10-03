"use client";

import { useCallback, useRef, useState, type FormEvent, type InputHTMLAttributes } from "react";
import Link from "next/link";
import { CompanyDetailsFields } from "@/components/cta/CompanyDetailsFields";
import { ReferralSourceField } from "@/components/cta/ReferralSourceField";
import { CalendlyEmbed } from "@/components/cta/CalendlyEmbed";
import { DEMO_INTERESTS } from "@/lib/demoInterests";
import { isPersonalEmail, WORK_EMAIL_MESSAGE } from "@/lib/workEmail";
import styles from "./demo-request.module.css";

function Field({ label, optional, error, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string; optional?: boolean; error?: string }) {
  const id = `preview-${props.name}`;
  return (
    <div className={styles.field}>
      <label htmlFor={id}>{label}{optional && <span> (optional)</span>}</label>
      <input {...props} id={id} className={styles.input} aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-error` : undefined} />
      {error && <p id={`${id}-error`} role="alert" className={styles.fieldError}>{error}</p>}
    </div>
  );
}

type BookingDetails = { firstName: string; lastName: string; email: string };

export function DemoRequestForm() {
  const [hqState, setHqState] = useState("");
  const [numberOfEmployees, setNumberOfEmployees] = useState("");
  const [referralSource, setReferralSource] = useState("");
  const [referralDetails, setReferralDetails] = useState("");
  const [otherSelected, setOtherSelected] = useState(false);
  const [interestDetails, setInterestDetails] = useState("");
  const [details, setDetails] = useState<BookingDetails | null>(null);
  const [step, setStep] = useState<"form" | "booking" | "booked">("form");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState("");
  const submitting = useRef(false);
  const confirmation = useRef<HTMLHeadingElement>(null);
  const firstField = useRef<HTMLFormElement>(null);

  const onScheduled = useCallback(() => {
    setStep("booked");
    requestAnimationFrame(() => confirmation.current?.focus());
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    setSending(true);
    setError(null);
    const form = new FormData(event.currentTarget);
    const bookingDetails = {
      firstName: String(form.get("firstName") ?? "").trim(),
      lastName: String(form.get("lastName") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
    };
    const payload = {
      ...bookingDetails,
      phone: String(form.get("phone") ?? "").trim(),
      company: String(form.get("company") ?? "").trim(),
      companyWebsite: String(form.get("companyWebsite") ?? "").trim(),
      hqState,
      numberOfEmployees,
      referralSource,
      referralSourceDetails: referralDetails,
      interests: form.getAll("interests").map(String),
      interestDetails: otherSelected ? interestDetails : "",
      source: "demo-page",
      intent: "meeting",
    };
    try {
      const response = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({})) as { error?: string };
      if (response.status === 400) {
        setError(result.error ?? "Please check your details and try again.");
        return;
      }
      // Match the existing demo forms: mail outages must not block scheduling.
      if (!response.ok) console.error("Lead capture failed:", response.status, result.error);
    } catch (err) {
      console.error("Lead capture failed:", err);
    } finally {
      submitting.current = false;
      setSending(false);
    }
    setDetails(bookingDetails);
    setStep("booking");
    requestAnimationFrame(() => confirmation.current?.focus());
  }

  function editDetails() {
    setStep("form");
    requestAnimationFrame(() => firstField.current?.querySelector("input")?.focus());
  }

  return (
    <>
      <form ref={firstField} onSubmit={handleSubmit} hidden={step !== "form"} aria-busy={sending} className={styles.form}>
        <div className={styles.fields}>
          <Field name="firstName" label="First name" placeholder="Alex" autoComplete="given-name" maxLength={80} required />
          <Field name="lastName" label="Last name" placeholder="Morgan" autoComplete="family-name" maxLength={80} required />
          <Field
            name="email"
            label="Work email"
            placeholder="alex@company.com"
            type="email"
            autoComplete="email"
            maxLength={200}
            required
            error={emailError}
            onChange={(event) => {
              const message = isPersonalEmail(event.target.value) ? WORK_EMAIL_MESSAGE : "";
              event.target.setCustomValidity(message);
              setEmailError(message);
            }}
          />
          <Field name="phone" label="Phone number" placeholder="(555) 000-0000" type="tel" autoComplete="tel" maxLength={50} optional />
          <Field name="company" label="Company name" placeholder="Your company" autoComplete="organization" maxLength={120} required />
          <Field name="companyWebsite" label="Company website" placeholder="company.com" inputMode="url" autoComplete="url" maxLength={200} optional />
        </div>

        <CompanyDetailsFields
          idPrefix="preview"
          hqState={hqState}
          numberOfEmployees={numberOfEmployees}
          onHqStateChange={setHqState}
          onNumberOfEmployeesChange={setNumberOfEmployees}
          inputClassName={styles.input}
        />

        <fieldset className={styles.interests}>
          <legend>What can we help with? <span>(optional)</span></legend>
          <div className={styles.choices}>
            {DEMO_INTERESTS.map((interest) => (
              <label key={interest} className={styles.choice}>
                <input
                  type="checkbox"
                  name="interests"
                  value={interest}
                  onChange={interest === "Other" ? (event) => setOtherSelected(event.target.checked) : undefined}
                />
                <span>{interest}</span>
              </label>
            ))}
          </div>
          {otherSelected && (
            <div className={`${styles.field} ${styles.otherDetails}`}>
              <label htmlFor="preview-interest-details">How can we help? <span>(optional)</span></label>
              <textarea
                id="preview-interest-details"
                name="interestDetails"
                value={interestDetails}
                onChange={(event) => setInterestDetails(event.target.value)}
                placeholder="Tell us what you need help with"
                maxLength={300}
                rows={3}
                className={`${styles.input} ${styles.textarea}`}
              />
            </div>
          )}
        </fieldset>

        <ReferralSourceField
          id="preview-referral"
          value={referralSource}
          details={referralDetails}
          onChange={setReferralSource}
          onDetailsChange={setReferralDetails}
          inputClassName={styles.input}
        />

        {error && <p role="alert" className={styles.error}>{error}</p>}
        <button type="submit" disabled={sending} className={styles.submit}>{sending ? "Opening the calendar…" : "Request a demo"} <span aria-hidden="true">↗</span></button>
        <p className={styles.legal}>By submitting, you agree that Spine may contact you about our services. See our <Link href="/privacy">privacy policy</Link>.</p>
      </form>

      {step === "booking" && details && (
        <div className={styles.booking}>
          <button type="button" onClick={editDetails} className={styles.back}>← Edit your details</button>
          <h2 ref={confirmation} tabIndex={-1}>Pick a time.</h2>
          <p>30 minutes with a Spine specialist.</p>
          <CalendlyEmbed
            firstName={details.firstName}
            lastName={details.lastName}
            email={details.email}
            onScheduled={onScheduled}
            className={styles.calendar}
          />
        </div>
      )}
      {step === "booked" && details && (
        <div className={styles.confirmation}>
          <span className={styles.confirmationIcon} aria-hidden="true">✓</span>
          <h2 ref={confirmation} tabIndex={-1}>You’re booked.</h2>
          <p>The calendar invite is on its way to <strong>{details.email}</strong>. We look forward to meeting your team.</p>
          <Link href="/" className={styles.submit}>Back to Spine →</Link>
        </div>
      )}
    </>
  );
}
