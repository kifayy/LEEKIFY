import { Shield } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Pathpicker",
  description:
    "Our Privacy Policy outlines how we collect, use, and protect your personal information. Your privacy and security are our priorities.",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 md:py-16">
      <h1 className="text-2xl font-bold tracking-tight text-[#181A1D] md:text-4xl">
        Privacy Policy
      </h1>
      <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
        <Shield className="h-5 w-5 shrink-0" />
        <span>Effective Date: February 3, 2026 · Last Updated: February 3, 2026</span>
      </div>

      <div className="mt-8 space-y-8 text-foreground">
        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">1. INTRODUCTION AND SCOPE</h2>
          <p className="mt-3 text-muted-foreground">
            This Privacy Policy (&quot;Policy&quot;) governs the manner in which Paced Studios LLC (doing business as PathPicker, the Awarded App, and its parent entities, affiliates, and subsidiaries) (collectively, &quot;Company,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) collect, use, maintain, and disclose information collected from users (each, a &quot;User,&quot; &quot;you,&quot; or &quot;your&quot;) of the PathPicker website, the Awarded mobile application, and all associated digital properties, communications, and services (collectively, the &quot;Services&quot;). By accessing or utilizing the Services, you expressly consent to the data practices described in this Policy. If you do not agree with the terms herein, you must immediately cease use of the Services.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">2. CATEGORIES OF INFORMATION WE COLLECT</h2>
          <p className="mt-3 text-muted-foreground">
            We collect varying types of data depending on your interaction with our Services. This includes Personally Identifiable Information (&quot;PII&quot;) and non-personally identifiable information (&quot;Non-PII&quot;).
          </p>
          <p className="mt-3 text-muted-foreground">
            <strong>Identifiers and Contact Information:</strong> We may collect your full name, email address, telephone number, and account credentials when you register, subscribe to our newsletters, or opt-in to SMS communications.
          </p>
          <p className="mt-3 text-muted-foreground">
            <strong>Demographic and Educational Profile Data:</strong> To facilitate our proprietary matching algorithms, we may collect self-reported data including, but not limited to, age, academic standing, intended or current academic major, grade point average (GPA) range, career interests, and first-generation or second-generation student status.
          </p>
          <p className="mt-3 text-muted-foreground">
            <strong>Financial Intent and Readiness Data:</strong> We may collect self-reported indicators of financial status and intent, such as current student income brackets, credit card authorization status, and intentions regarding the acquisition of student loans or other financial products. Company does not collect, process, or store highly sensitive financial instruments such as bank account routing numbers, full credit reports, or Social Security Numbers.
          </p>
          <p className="mt-3 text-muted-foreground">
            <strong>Automated Technical and Usage Data:</strong> When you access the Services, we automatically collect data regarding your device and network. This includes your Internet Protocol (IP) address, browser type, operating system, unique device identifiers (UDID), referring/exit pages, date/time stamps, and clickstream data. We utilize IP addresses specifically to perform geographic routing, ensuring Users are presented with jurisdictionally appropriate offers.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">3. PURPOSES OF DATA PROCESSING AND USE</h2>
          <p className="mt-3 text-muted-foreground">
            Subject to applicable local, state, and federal laws, we reserve the right to process your Personal Information for the following business and commercial purposes:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li><strong>Service Delivery:</strong> To operate the PathPicker quiz engine, deliver personalized scholarship and financial recommendations, and maintain your account.</li>
            <li><strong>Proprietary Matching and Routing:</strong> To leverage algorithms that assess your demographic and financial intent data to dynamically route you to relevant third-party offers, affiliate links, or educational opportunities.</li>
            <li><strong>Marketing and Communications:</strong> To transmit transactional notifications, periodic newsletters, promotional materials, and targeted SMS campaigns (subject to your explicit consent).</li>
            <li><strong>Analytics and Ecosystem Optimization:</strong> To analyze aggregated User behavior, perform A/B testing, and optimize the efficacy of our matching algorithms and platform architecture.</li>
            <li><strong>Compliance and Security:</strong> To detect, prevent, and mitigate fraudulent activity, unauthorized access, and other technical or security liabilities.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">4. DISCLOSURE AND SHARING OF INFORMATION</h2>
          <p className="mt-3 text-muted-foreground">
            We do not sell your PII to indiscriminate data brokers. However, to operate our business model and provide the Services free of charge, we may disclose your data under the following circumstances:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li><strong>Affiliate and Strategic Partners:</strong> When you engage with a recommended offer, we may utilize UTM parameters and tracking technologies to refer your traffic to third-party financial institutions, educational aggregators, or brands. While we do not blindly transfer your PII without consent, the partner will register your referral from our ecosystem.</li>
            <li><strong>Consent-Based Lead Transfers:</strong> If you affirmatively opt-in to be contacted by specific third parties (e.g., international university recruiters), we will transmit your contact and profile data to said parties to fulfill your request.</li>
            <li><strong>Service Providers:</strong> We engage trusted third-party vendors (e.g., cloud hosting, email/SMS gateways, analytics providers) to facilitate our operations. These entities are bound by strict confidentiality obligations and are prohibited from utilizing your data for independent purposes.</li>
            <li><strong>Aggregated/De-Identified Data:</strong> We reserve the right to share anonymized, aggregated demographic and behavioral data with prospective advertisers, partners, and investors for marketing and analytical purposes.</li>
            <li><strong>Legal and Corporate Reorganization:</strong> We may disclose information if required by a subpoena, court order, or legal mandate. Furthermore, in the event of a merger, acquisition, corporate restructuring, or sale of assets, User data will likely be transferred as a core business asset of Paced Studios LLC.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">5. TRACKING TECHNOLOGIES AND PROGRAMMATIC ADVERTISING</h2>
          <p className="mt-3 text-muted-foreground">
            Our Services utilize cookies, web beacons, pixels, and localized storage to authenticate Users, track affiliate conversions, and map ecosystem engagement. Furthermore, we may participate in programmatic advertising networks particularly for international traffic. These third-party networks may utilize their own tracking technologies to deliver cross-context behavioral advertising based on your digital footprint. You may manage your cookie preferences through your browser settings, though doing so may degrade platform functionality.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">6. JURISDICTION-SPECIFIC PRIVACY RIGHTS (CCPA/CPRA &amp; GDPR)</h2>
          <p className="mt-3 text-muted-foreground">
            Depending on your state or country of residence, including residents of California, you may possess specific rights regarding your personal data:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li><strong>Right to Access and Portability:</strong> You may request disclosure of the specific pieces of PII we have collected about you.</li>
            <li><strong>Right to Deletion:</strong> You may request the deletion of your PII, subject to certain legal and operational exceptions.</li>
            <li><strong>Right to Opt-Out:</strong> You may opt-out of the &quot;sale&quot; or &quot;sharing&quot; of your PII for targeted advertising purposes.</li>
          </ul>
          <p className="mt-3 text-muted-foreground">
            To exercise these rights, submit a verifiable consumer request to{" "}
            <a href="mailto:hi@awarded.app" className="text-[#956EFE] underline hover:no-underline">
              hi@awarded.app
            </a>
            . We will not discriminate against any User for exercising their statutory privacy rights.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">7. DATA RETENTION AND SECURITY</h2>
          <p className="mt-3 text-muted-foreground">
            We implement commercially reasonable, industry-standard administrative, technical, and physical safeguards designed to protect your data from unauthorized access or disclosure. However, no digital transmission is entirely secure; therefore, we cannot warrant absolute security. We retain your information only for as long as necessary to fulfill the purposes outlined in this Policy or to comply with legal obligations.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">8. CHILDREN&apos;S PRIVACY (COPPA COMPLIANCE)</h2>
          <p className="mt-3 text-muted-foreground">
            The Services are strictly not directed toward individuals under the age of 13. We do not knowingly collect PII from children under 13. If we become aware that we have inadvertently collected such data, we will take immediate steps to expunge it from our servers.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">9. CONTACT INFORMATION</h2>
          <p className="mt-3 text-muted-foreground">
            For any questions, concerns, or data requests regarding this Privacy Policy, please contact us at:
          </p>
          <p className="mt-2 text-muted-foreground">
            Email:{" "}
            <a href="mailto:hi@awarded.app" className="text-[#956EFE] underline hover:no-underline">
              hi@awarded.app
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
