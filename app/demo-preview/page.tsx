import type { Metadata } from "next";
import Link from "next/link";
import { SpineLogo } from "@/components/SpineLogo";
import { DemoRequestForm } from "./DemoRequestForm";
import styles from "./demo-preview.module.css";

export const metadata: Metadata = {
  title: "Request a demo | Spine",
  robots: { index: false, follow: false },
};

const services = [
  ["Benefits that fit your team.", "Plans, renewals, and everyday employee support."],
  ["People ops, off your plate.", "Payroll, onboarding, and the work in between."],
  ["Compliance, kept on track.", "Requirements, filings, and notices, handled."],
];

export default function DemoPage() {
  return (
    <main className={styles.page}>
      <aside className={styles.story} aria-label="Why Spine">
        <Link href="/" aria-label="Spine home" className={styles.logo}>
          <SpineLogo fill="#ff6c16" className="!h-[39px]" />
        </Link>

        <div className={styles.storyBody}>
          <h2>Your people.<br /><span>Taken care of.</span></h2>
          <p className={styles.intro}>
            You build the company. We handle the benefits, payroll, and compliance work
            across the systems you already use.
          </p>
          <ul className={styles.services}>
            {services.map(([title, description]) => (
              <li key={title}>
                <span className={styles.check} aria-hidden="true">✓</span>
                <div><strong>{title}</strong><p>{description}</p></div>
              </li>
            ))}
          </ul>
          <div className={styles.fee}>
            <div><span className={styles.feeAmount}>$0</span><span>service fee.<br />A whole team behind you.</span></div>
            <p>Free for your company because we’re paid as your benefits broker.</p>
          </div>
        </div>

        <p className={styles.storyFoot}>Real people. Backed by AI. On your side.</p>
      </aside>

      <section className={styles.formSide} aria-labelledby="demo-heading">
        <div className={styles.utility}>
          <Link href="/">← Back to Spine</Link>
        </div>
        <div className={styles.formContent}>
          <header className={styles.formHeader}>
            <h1 id="demo-heading">Let’s take work<br /> off your plate.</h1>
            <p>Tell us a little about your team. We’ll show you what Spine can take care of.</p>
            <div className={styles.meetingNote}><span>30-minute conversation</span><span>No commitment</span></div>
          </header>
          <DemoRequestForm />
        </div>
        <footer className={styles.footer}><span>© {new Date().getFullYear()} Spine</span><Link href="/privacy">Privacy policy</Link></footer>
      </section>
    </main>
  );
}
