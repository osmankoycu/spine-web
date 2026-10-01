import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Hero } from "@/components/hero/Hero";
import { SpineLogo } from "@/components/SpineLogo";
import { EmployerWindow } from "@/components/sections/platform/EmployerWindow";
import { EmployeeBenefits } from "@/components/sections/platform/EmployeeBenefits";
import { Compliance } from "@/components/sections/platform/Compliance";
import { SlackWindow } from "@/components/sections/platform/SlackWindow";
import { CarrierRow } from "@/components/sections/platform/CarrierRow";
import { trustedLogos } from "@/components/sections/trustedLogos";
import { stackLogos } from "@/lib/platformLogos";
import styles from "./HomePage.module.css";

const employerFeatures = [
  ["AI plan design", "Plans benchmarked against the market and built around your workforce."],
  ["Every carrier, every renewal", "The right carrier and plan mix, at the best available pricing."],
  ["A dedicated consultant", "Someone who knows your company and responds within hours."],
];
const workflow = [
  ["You make the hire.", "We take it from there."],
  ["Ready on day one.", "I-9, E-Verify, and benefits enrollment."],
  ["Payroll, every cycle.", "Processing, tax filings, and reconciliation."],
  ["A smooth offboarding.", "Final pay, COBRA, and employee records."],
];
const hrAreas = ["Recruiting", "Performance management", "Employee relations", "Compensation", "Policies & handbooks", "Culture & offsites", "Leadership coaching"];
const comparisons = [
  { label: "Service model", peo: "Generic HR support pool", broker: "Built for 200+, junior service below", spine: "Dedicated consultant + fractional HR network" },
  { label: "Plan design", peo: "One-size-fits-all master plans", broker: "Commission-driven incentives", spine: "Rightsized to your workforce" },
  { label: "Compliance", peo: "Co-employment lock-in", broker: "Manual compliance reminders", spine: "Handled, you keep your entity" },
  { label: "Tech stack", peo: "Forced HRIS & payroll stack", broker: "Phone tag, business hours", spine: "Works with your existing HRIS & payroll" },
  { label: "Renewals", peo: "Premiums spike at scale", broker: "Annual renewal surprises", spine: "Claims data: leverage every cycle" },
];

function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link className={styles.textLink} href={href}>{children}<ArrowRight size={19} aria-hidden /></Link>;
}

export function HomePage() {
  return (
    <main className={styles.home}>
      <Hero />
      <section className={styles.proof} aria-label="Trusted by ambitious tech companies">
        <div className={styles.container}>
          <p className={styles.proofLabel}>In good company.</p>
          <div className={styles.logos}>
            {trustedLogos.map((logo) => <span key={logo.label} role="img" aria-label={logo.label} dangerouslySetInnerHTML={{ __html: logo.svg }} />)}
          </div>
          <div className={styles.proofFacts}>
            <p><strong>3-in-1</strong><span>Benefits, compliance, and people ops.</span></p>
            <p><strong>24/7</strong><span>Support for your people.</span></p>
            <p><strong>$0</strong><span>Service fees. Always.</span></p>
          </div>
        </div>
      </section>

      <section className={`${styles.container} ${styles.employer}`} aria-labelledby="home-benefits-title">
        <div className={styles.employerCopy}>
          <p className={styles.label}>Benefits for your business</p>
          <h2 id="home-benefits-title" className={styles.title}>Better plans.<br />Lower premiums.</h2>
          <p className={styles.lead}>AI analyzes your workforce and continuously optimizes your benefits plans, reducing healthcare costs by 15% on average.</p>
          <dl className={styles.featureList}>{employerFeatures.map(([title, text]) => <div key={title}><dt>{title}</dt><dd>{text}</dd></div>)}</dl>
          <TextLink href="/platform/plan-optimization">Explore plan optimization</TextLink>
        </div>
        <div className={styles.planPresentation}>
          <div className={styles.productCaption}><span>Built around your team</span><span>Plan optimizer</span></div>
          <EmployerWindow />
          <p className={styles.demoCaption}>Explore the mix. Adjust headcount and contribution.</p>
        </div>
        <div className={styles.carriers}><CarrierRow /></div>
      </section>

      <section className={styles.employeeBand} aria-label="Benefits for employees"><div className={styles.container}><EmployeeBenefits refined /></div></section>
      <section className={styles.complianceBand} aria-label="Compliance"><div className={styles.container}><Compliance refined /></div></section>

      <section className={`${styles.container} ${styles.people}`} aria-labelledby="home-people-title">
        <div className={styles.sectionHead}>
          <div><p className={styles.label}>People ops, handled</p><h2 id="home-people-title" className={styles.title}>You hire.<br />We run the rest.</h2></div>
          <div><p className={styles.lead}>Payroll, onboarding, records, and offboarding — in your Slack, on top of the stack you already use.</p><TextLink href="/platform/onboarding">See how we take it from here</TextLink></div>
        </div>
        <div className={styles.peopleGrid}>
          <div className={styles.slackPresentation}><SlackWindow /></div>
          <ol className={styles.workflow}>{workflow.map(([title, text], i) => <li key={title}><span className={styles.stepNumber}>0{i + 1}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol>
        </div>
        <div className={styles.stack}><span>Right at home in your stack.</span>{stackLogos.map((logo) => <span key={logo.label} role="img" aria-label={logo.label} style={{ width: 24 * logo.ar }} dangerouslySetInnerHTML={{ __html: logo.svg }} />)}</div>
      </section>

      <section className={styles.priceBand} aria-labelledby="home-price-title">
        <div className={`${styles.container} ${styles.priceGrid}`}>
          <div className={styles.priceNumber}><span>$0</span><p>Cost to your company.</p></div>
          <div className={styles.priceCopy}><h2 id="home-price-title" className={styles.title}>Free for your company.<br />Always.</h2><p className={styles.lead}>We get paid by carriers, just like every broker.<br />You get the whole team.</p><p className={styles.priceTerms}>No setup fees. No admin fees.<br />No per-employee charges.</p></div>
        </div>
      </section>

      <section className={`${styles.container} ${styles.community}`} aria-labelledby="home-hr-title">
        <div><p className={styles.label}>The people behind your people</p><h2 id="home-hr-title" className={styles.title}>Need more<br />HR support?</h2><p className={styles.lead}>We&apos;ll connect you with the right fractional HR leader, based on your company&apos;s needs.</p><TextLink href="/partners/fractional-hr">Meet the HR community</TextLink></div>
        <div className={styles.expertise}><div className={styles.expertiseIntro}><strong>50+</strong><span>fractional HR leaders.<br />Matched to what you need.</span></div><ul>{hrAreas.map((area) => <li key={area}>{area}</li>)}</ul><p>Hourly or ongoing engagements.</p></div>
      </section>

      <section className={styles.comparisonBand} aria-labelledby="home-compare-title">
        <div className={styles.container}>
          <div className={styles.sectionHead}><h2 id="home-compare-title" className={styles.title}>A different way<br />to take care of business.</h2><p className={styles.lead}>Everything a PEO bundles and a broker sells, unbundled and rightsized to your company.</p></div>
          <table className={styles.comparison}>
            <caption className="sr-only">How Spine compares with PEOs and traditional brokers</caption>
            <thead><tr><th scope="col"><span className="sr-only">Feature</span></th><th scope="col">PEOs<span>Co-employment</span></th><th scope="col">Brokers<span>Commission-based</span></th><th scope="col"><SpineLogo className={styles.comparisonLogo} /><span>AI-native brokerage</span></th></tr></thead>
            <tbody>{comparisons.map((row) => <tr key={row.label}><th scope="row">{row.label}</th><td>{row.peo}</td><td>{row.broker}</td><td>{row.spine}</td></tr>)}</tbody>
          </table>
          <div className={styles.mobileComparison}>{comparisons.map((row) => <div key={row.label}><h3>{row.label}</h3><dl><div><dt>PEOs</dt><dd>{row.peo}</dd></div><div><dt>Brokers</dt><dd>{row.broker}</dd></div><div><dt>Spine</dt><dd>{row.spine}</dd></div></dl></div>)}</div>
        </div>
      </section>
    </main>
  );
}
