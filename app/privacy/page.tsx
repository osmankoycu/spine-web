import type { Metadata } from "next";
import { LegalPage, Section, P, Lead, UL, LI } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — Spine",
  description: "How Spine collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="Last updated: July 1, 2026">
      <Section title="1. Introduction">
        <P>
          Spine is committed to protecting your privacy. This Privacy Policy explains how we
          collect, use, and share personal information when you use our App and Services. By using
          Spine, you agree to the collection and use of your information as described in this policy.
        </P>
      </Section>

      <Section title="2. Information We Collect">
        <P>
          <Lead>Personal Information:</Lead> This includes your name, email address, and other
          contact details that you provide when creating an account or using the App.
        </P>
        <P>
          <Lead>Health Information:</Lead> With your consent, we may collect certain health-related
          data to personalize your experience.
        </P>
        <P>
          <Lead>Usage Data:</Lead> We collect information about how you use the App, such as
          interactions with features, log data, and device information.
        </P>
      </Section>

      <Section title="3. How We Use Your Information">
        <P>
          <Lead>To Provide Services:</Lead> We use your information to personalize your experience,
          provide health guidance, and navigate care options.
        </P>
        <P>
          <Lead>To Improve the App:</Lead> We analyze usage data to improve the functionality and
          performance of the App.
        </P>
        <P>
          <Lead>Communication:</Lead> We may use your email or contact details to send you updates,
          newsletters, or respond to inquiries.
        </P>
      </Section>

      <Section title="4. Sharing of Information">
        <P>
          We do not sell your personal information to third parties. We may share your data with:
        </P>
        <UL>
          <LI>
            <Lead>Service Providers:</Lead> Third-party service providers who assist us in
            delivering our services.
          </LI>
          <LI>
            <Lead>Legal Requirements:</Lead> When required by law, such as in response to a court
            order or government request.
          </LI>
        </UL>
      </Section>

      <Section title="5. Security of Information">
        <P>
          We implement industry-standard security measures to protect your personal data from
          unauthorized access, alteration, disclosure, or destruction. However, no method of
          transmission over the internet is 100% secure, and we cannot guarantee absolute security.
        </P>
      </Section>

      <Section title="6. Your Rights">
        <P>You have the right to:</P>
        <UL>
          <LI>Access the personal information we hold about you.</LI>
          <LI>Request the correction or deletion of your data.</LI>
          <LI>Withdraw your consent to the collection and use of your data at any time.</LI>
        </UL>
      </Section>

      <Section title="7. Retention of Data">
        <P>
          We will retain your personal information for as long as necessary to provide our services
          or as required by law.
        </P>
      </Section>

      <Section title="8. Third-Party Links">
        <P>
          The App may contain links to third-party websites or services. We are not responsible for
          the privacy practices of these third parties, and we encourage you to review their
          policies.
        </P>
      </Section>

      <Section title="9. Children's Privacy">
        <P>Spine is not intended for use by children under the age of 18.</P>
      </Section>
    </LegalPage>
  );
}
