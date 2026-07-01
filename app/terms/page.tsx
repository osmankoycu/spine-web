import type { Metadata } from "next";
import { LegalPage, Section, P, UL, LI } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Use — Spine",
  description: "The terms that govern your use of Spine.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" updated="Last updated: July 1, 2026">
      <Section title="1. Introduction">
        <P>
          Welcome to Spine! These Terms of Use govern your use of the Spine application (the App)
          and services (the Services). By accessing or using the App, you agree to be bound by these
          Terms. Please read them carefully.
        </P>
      </Section>

      <Section title="2. Eligibility">
        <P>
          You must be at least 18 years old or have the consent of a legal guardian to use the App.
          By using Spine, you confirm that you meet this requirement.
        </P>
      </Section>

      <Section title="3. Services Provided">
        <P>
          Spine offers AI-native health guidance and care navigation services, helping users
          understand health conditions and navigate care options. The App does not provide medical
          advice or diagnosis, and the information provided is for informational purposes only.
        </P>
      </Section>

      <Section title="4. User Responsibilities">
        <P>
          You are responsible for maintaining the confidentiality of your account and ensuring that
          all information you provide to Spine is accurate and up-to-date. You agree not to use the
          App for any unlawful or unauthorized purposes.
        </P>
      </Section>

      <Section title="5. Medical Disclaimer">
        <P>
          Spine does not provide medical advice, diagnosis, or treatment. Any health-related
          information provided by the App is intended to support, not replace, the relationship
          between a user and their healthcare provider.
        </P>
      </Section>

      <Section title="6. Intellectual Property">
        <P>
          All content, features, and functionality on the App, including text, graphics, logos, and
          software, are owned by Spine and are protected by copyright and other intellectual
          property laws.
        </P>
      </Section>

      <Section title="7. Prohibited Activities">
        <P>You agree not to:</P>
        <UL>
          <LI>Use the App for unlawful purposes.</LI>
          <LI>Engage in any activity that disrupts or interferes with the operation of the App.</LI>
          <LI>Attempt to gain unauthorized access to any systems or networks connected to Spine.</LI>
        </UL>
      </Section>

      <Section title="8. Limitation of Liability">
        <P>
          Spine is not responsible for any damages or losses resulting from your use of the App or
          reliance on the information provided. Use of the App is at your own risk.
        </P>
      </Section>

      <Section title="9. Changes to Terms">
        <P>
          Spine reserves the right to modify these Terms of Use at any time. Changes will be
          effective immediately upon posting, and your continued use of the App signifies acceptance
          of the updated Terms.
        </P>
      </Section>

      <Section title="10. Termination">
        <P>
          Spine may terminate or suspend your access to the App at any time, without notice, for
          conduct that violates these Terms or is otherwise harmful to Spine or other users.
        </P>
      </Section>

      <Section title="11. Contact Us">
        <P>
          If you have any questions or concerns about these Terms of Use, please contact us at{" "}
          <a
            href="mailto:hello@joinspine.ai"
            className="font-medium text-ink underline underline-offset-2 hover:text-orange"
          >
            hello@joinspine.ai
          </a>
          .
        </P>
      </Section>
    </LegalPage>
  );
}
