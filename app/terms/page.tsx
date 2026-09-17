import { FileText } from "lucide-react";
import Link from "next/link";
import { TermsHashScroll } from "./terms-hash-scroll";
import { MANAGE_BILLING_URL } from "@/lib/constants";

export const metadata = {
  title: "Terms of Service | Leekify",
  description:
    "By accessing or using Leekify, you agree to these Terms of Service. If you do not agree, do not use the app or website.",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 md:py-16">
      <TermsHashScroll />
      <h1 className="text-2xl font-bold tracking-tight text-[#181A1D] md:text-4xl">
        Terms of Service
      </h1>
      <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
        <FileText className="h-5 w-5 shrink-0" />
        <span>Effective Date: June 7, 2026 · Last Updated: June 7, 2026</span>
      </div>

      <div className="mt-8 space-y-8 text-foreground">
        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">1. ACCEPTANCE AND MODIFICATION OF TERMS</h2>
          <p className="mt-3 text-muted-foreground">
            By accessing the Leekify website, application, or related digital services (the &quot;Services&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;) and our Privacy Policy provided by Paced Studios LLC. If you do not agree, you are expressly prohibited from utilizing the Services.
          </p>
          <p className="mt-3 text-muted-foreground">
            Paced Studios LLC reserves the right, at its sole discretion, to modify, amend, or replace these Terms at any time. We will notify you of material changes via email at least 15 days in advance. Continued use of the Services following the posting of modifications constitutes your binding acceptance of the updated Terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">2. USER ELIGIBILITY AND ACCOUNT OBLIGATIONS</h2>
          <p className="mt-3 text-muted-foreground">
            You must be at least eighteen (18) years of age to use the Services. By accessing the Services, you warrant that you meet this age requirement and have the legal capacity to enter into these Terms.
          </p>
          <p className="mt-3 text-muted-foreground">
            You agree to provide true, accurate, current, and complete information during your use of the Services. You are solely responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. We reserve the right to suspend or terminate accounts that provide fraudulent information or violate these Terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">3. NATURE OF SERVICES AND DISCLAIMER OF ADVICE</h2>
          <p className="mt-3 text-muted-foreground">
            The Services provide data breach search, exposure reporting, and identity monitoring based on publicly known leak sources and information you choose to submit.
          </p>
          <p className="mt-3 text-muted-foreground">
            PACED STUDIOS LLC IS NOT A LAW FIRM, CREDIT BUREAU, INSURER, OR GOVERNMENT AGENCY. All breach results, alerts, and reports are provided for informational purposes only and do not constitute professional legal, financial, or security advice.
          </p>
          <p className="mt-3 text-muted-foreground">You acknowledge and agree that:</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Leekify does not guarantee that every breach involving your data will be detected or that future leaks will be prevented</li>
            <li>Breach results depend on available public sources and the identifiers you submit, which may be incomplete or outdated</li>
            <li>You are solely responsible for evaluating the merits, risks, and next steps associated with any exposure or third-party settlement</li>
            <li>Actual outcomes depend on factors beyond our control, including third-party breach reporting and legal processes</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">4. THIRD-PARTY LINKS AND AFFILIATE DISCLOSURE</h2>
          <p className="mt-3 text-muted-foreground">
            The Services contain outbound links to third-party websites, applications, and services. Paced Studios LLC frequently utilizes affiliate tracking links and may receive financial compensation (e.g., Cost Per Action or Cost Per Click) when you interact with or apply for products through these third-party partners.
          </p>
          <p className="mt-3 text-muted-foreground">
            Paced Studios LLC exercises no control over, and assumes no responsibility for, the content, privacy policies, terms, or operational practices of any third-party entities. Your engagement with any third party is strictly at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">5. SUBSCRIPTION SERVICES</h2>
          <h3 className="mt-4 font-semibold text-[#181A1D]">5.1 Trial Period</h3>
          <p className="mt-2 text-muted-foreground">
            You are eligible for a 30-day introductory trial period at the promotional rate displayed at signup. The trial provides full access to all features available during your trial period.
          </p>
          <p className="mt-3 text-muted-foreground">
            After the trial period ends, your account will automatically convert to a paid subscription at the plan you selected during signup, unless you cancel beforehand.
          </p>
          <p className="mt-3 text-muted-foreground">
            You must cancel before your trial period ends to avoid being charged for the first subscription period.
          </p>
          <p className="mt-3 text-muted-foreground">
            We will send you an email reminder before your trial converts to a paid subscription,
            including the conversion date and the plan price that will apply unless you cancel.
          </p>

          <h3 className="mt-4 font-semibold text-[#181A1D]">5.2 Subscription Plans and Pricing</h3>
          <p className="mt-2 text-muted-foreground">
            Following your trial period, you will be charged for a monthly or annual subscription plan, as selected during signup. Pricing will be displayed to you before you are charged.
          </p>
          <p className="mt-3 text-muted-foreground">Subscription options:</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Monthly Plan: [pricing displayed at signup]</li>
            <li>Annual Plan: [pricing displayed at signup]</li>
          </ul>
          <p className="mt-3 text-muted-foreground">
            We may update pricing for new subscriptions at any time, but will not increase your current subscription rate without 30 days&apos; notice via email.
          </p>

          <h3 className="mt-4 font-semibold text-[#181A1D]">5.3 Billing and Payment</h3>
          <p className="mt-2 text-muted-foreground">
            Your subscription will automatically renew at the end of each billing cycle unless you cancel. We will charge your payment method on file on the renewal date.
          </p>
          <p className="mt-3 text-muted-foreground">
            All subscriptions auto-renew until canceled. Cancel anytime through your account settings or by contacting{" "}
            <a href="mailto:support@Leekify.com" className="text-[#956EFE] underline hover:no-underline">
              support@Leekify.com
            </a>
            .
          </p>
        </section>

        <section id="refund-policy" className="scroll-mt-36 md:scroll-mt-44 lg:scroll-mt-8">
          <h2 className="text-lg font-bold text-[#181A1D]">6. REFUND POLICY</h2>
          <h3 className="mt-4 font-semibold text-[#181A1D]">6.1 Trial Period ($2.99 or current promotional rate)</h3>
          <p className="mt-2 text-muted-foreground">
            The trial period is non-refundable. You are not obligated to continue to a paid subscription after your trial ends.
          </p>
          <p className="mt-3 text-muted-foreground">
            To avoid being charged, you must cancel before your trial period expires.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-[#E8E8EC] bg-[#FAFAFC] px-4 py-3">
            <p className="text-sm text-muted-foreground">
              Need to cancel or update your plan?
            </p>
            <Link
              href={MANAGE_BILLING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-9 items-center rounded-lg bg-[#6836D5] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#5a2ebf]"
            >
              Manage Subscription
            </Link>
          </div>

          <h3 className="mt-4 font-semibold text-[#181A1D]">6.2 First Subscription Purchase — 30-Day Money-Back Guarantee</h3>
          <p className="mt-2 text-muted-foreground">
            If you are dissatisfied with your first paid subscription, you are eligible for a full refund within 30 days of your first subscription charge, provided that:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>This is your first paid subscription to Leekify</li>
            <li>You have not received a prior refund</li>
            <li>You request the refund within 30 days of the charge date</li>
            <li>You have not engaged in fraudulent activity or violated these Terms</li>
          </ul>

          <h3 className="mt-4 font-semibold text-[#181A1D]">6.3 Subsequent Subscription Periods — Limited Refunds</h3>
          <p className="mt-2 text-muted-foreground">
            After your first subscription period, refunds are not eligible except in these specific cases:
          </p>
          <p className="mt-3 text-muted-foreground"><strong>Service Unavailability:</strong></p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Documented downtime exceeding 24 consecutive hours, not caused by scheduled maintenance or force majeure events</li>
            <li>Must be reported within 30 days of the charge</li>
            <li>Must be verified by our technical team</li>
          </ul>
          <p className="mt-3 text-muted-foreground"><strong>Technical Issues:</strong></p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Platform bugs preventing core feature access</li>
            <li>Must be reported within 30 days of the charge</li>
            <li>Must be verified by our technical team</li>
          </ul>
          <p className="mt-3 text-muted-foreground"><strong>Billing Errors:</strong></p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Duplicate charges</li>
            <li>Incorrect amount charged</li>
            <li>Unauthorized transactions</li>
          </ul>
          <p className="mt-3 text-muted-foreground"><strong>Legal Requirements:</strong></p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>As required by applicable laws in your jurisdiction</li>
          </ul>

          <h3 className="mt-4 font-semibold text-[#181A1D]">6.4 Non-Refundable Cases</h3>
          <p className="mt-2 text-muted-foreground">The following are explicitly not eligible for refunds:</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Partial or unused subscription time after cancellation</li>
            <li>Plan downgrades or changes</li>
            <li>Feature unavailability during scheduled maintenance</li>
            <li>Change of mind or no longer needing the service</li>
            <li>Failure to cancel before renewal (automatic charges)</li>
            <li>Performance or outcomes resulting from use of the matching algorithm</li>
          </ul>

          <h3 className="mt-4 font-semibold text-[#181A1D]">6.5 Refund Request Process</h3>
          <p className="mt-2 text-muted-foreground">To request a refund:</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>
              Submit a request to:{" "}
              <a href="mailto:support@Leekify.com" className="text-[#956EFE] underline hover:no-underline">
                support@Leekify.com
              </a>
            </li>
            <li>Include your account email</li>
            <li>Include the transaction date and amount</li>
            <li>Provide the reason for your refund request</li>
            <li>Include any supporting documentation (screenshots, error messages, etc.)</li>
          </ul>
          <p className="mt-3 text-muted-foreground">
            <strong>Processing time:</strong> We will review your request within 5 business days and respond via email
          </p>
          <p className="mt-3 text-muted-foreground">
            <strong>Approval and processing:</strong> If approved, refunds will be issued to your original payment method within 3-5 business days
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">7. ACCOUNT TERMINATION AND CANCELLATION</h2>
          <h3 className="mt-4 font-semibold text-[#181A1D]">7.1 Cancellation by You</h3>
          <p className="mt-2 text-muted-foreground">You may cancel your subscription at any time through:</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Your account settings (self-service)</li>
            <li>
              Email:{" "}
              <a href="mailto:support@Leekify.com" className="text-[#956EFE] underline hover:no-underline">
                support@Leekify.com
              </a>
            </li>
          </ul>
          <p className="mt-3 text-muted-foreground"><strong>Effect of cancellation:</strong></p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Your subscription will end at the end of your current billing cycle</li>
            <li>No additional charges will occur after cancellation</li>
            <li>No refunds for unused time in the current billing period</li>
            <li>You may reactivate your account at current pricing at any time</li>
          </ul>

          <h3 className="mt-4 font-semibold text-[#181A1D]">7.2 Termination by Leekify</h3>
          <p className="mt-2 text-muted-foreground">We reserve the right to terminate or suspend your account for:</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Violation of these Terms</li>
            <li>Fraudulent or abusive behavior</li>
            <li>Non-payment or failed payment after 30 days</li>
            <li>Security violations or unauthorized access</li>
            <li>Violation of applicable laws or regulations</li>
          </ul>
          <p className="mt-3 text-muted-foreground"><strong>Effect of termination by us:</strong></p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>You will receive written notice when applicable</li>
            <li>Your access to the Services will be immediately terminated</li>
            <li>No refund will be issued for the current billing period</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">8. COMMUNICATIONS AND TCPA COMPLIANCE</h2>
          <p className="mt-3 text-muted-foreground">
            By providing your email address and/or telephone number, you expressly consent to receive electronic communications from Paced Studios LLC, including transactional alerts, matching notifications, and promotional marketing messages.
          </p>
          <p className="mt-3 text-muted-foreground">
            <strong>SMS/Text Messaging:</strong> If you opt-in to SMS services, you agree to receive automated promotional and informational text messages. Consent is not a condition of purchase or use of the Services. Message frequency varies. Standard message and data rates may apply. You may revoke your consent at any time by replying &quot;STOP&quot; to any mobile message. For assistance, reply &quot;HELP&quot; or contact{" "}
            <a href="mailto:support@Leekify.com" className="text-[#956EFE] underline hover:no-underline">
              support@Leekify.com
            </a>
            .
          </p>
          <p className="mt-3 text-muted-foreground">
            We record the date, time, and method of your SMS consent (for example, web form
            submission, checkbox, or text-to-join) and retain that record for at least 48 months
            for compliance and dispute-resolution purposes.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">9. USER CONTENT AND DATA RIGHTS</h2>
          <p className="mt-3 text-muted-foreground">
            By submitting information to Leekify, you grant us a worldwide, non-exclusive, royalty-free license to use, store, analyze, and improve our Services and algorithms.
          </p>
          <p className="mt-3 text-muted-foreground">We may use your anonymized data and matching results to:</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Improve our matching algorithm</li>
            <li>Generate statistics and research insights</li>
            <li>Optimize the Services</li>
          </ul>
          <p className="mt-3 text-muted-foreground">
            You retain all rights to your personal information and may request deletion in accordance with our Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">10. INTELLECTUAL PROPERTY RIGHTS</h2>
          <p className="mt-3 text-muted-foreground">
            All content, algorithms, databases, visual interfaces, graphics, design, compilation, computer code, and underlying architecture associated with the Services are the exclusive property of Paced Studios LLC and are protected by applicable copyright, trademark, and intellectual property laws.
          </p>
          <p className="mt-3 text-muted-foreground">
            You are granted a limited, non-exclusive, non-transferable license to access and use the Services for personal, non-commercial purposes only.
          </p>
          <p className="mt-3 text-muted-foreground">You may not:</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Reproduce, modify, or distribute the Services</li>
            <li>Reverse engineer or attempt to extract source code</li>
            <li>Remove copyright or proprietary notices</li>
            <li>Use the Services to build competing products</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">11. DISCLAIMER OF WARRANTIES</h2>
          <p className="mt-3 text-muted-foreground">
            THE SERVICES ARE PROVIDED ON AN &quot;AS-IS&quot; AND &quot;AS-AVAILABLE&quot; BASIS. TO THE MAXIMUM EXTENT PERMITTED BY LAW, PACED STUDIOS LLC EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
          </p>
          <p className="mt-3 text-muted-foreground">PACED STUDIOS LLC DOES NOT WARRANT THAT:</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>The Services will be uninterrupted, secure, error-free, or free of viruses</li>
            <li>Matching results will be accurate or complete</li>
            <li>Third-party offers will be approved or available to you</li>
            <li>Any specific outcomes will result from using the Services</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">12. LIMITATION OF LIABILITY</h2>
          <p className="mt-3 text-muted-foreground">
            IN NO EVENT SHALL PACED STUDIOS LLC, ITS DIRECTORS, EMPLOYEES, PARTNERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Your access to or use of (or inability to access or use) the Services</li>
            <li>Any conduct or content of any third party</li>
            <li>Any outcomes resulting from your application to third-party financial or educational offers</li>
            <li>Reliance on matching results or recommendations</li>
          </ul>
          <p className="mt-3 text-muted-foreground">
            IN NO EVENT SHALL THE TOTAL AGGREGATE LIABILITY OF PACED STUDIOS LLC EXCEED THE AMOUNT PAID BY YOU TO US IN THE PAST SIX (6) MONTHS, OR ONE HUNDRED U.S. DOLLARS ($100), WHICHEVER IS GREATER.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">13. INDEMNIFICATION</h2>
          <p className="mt-3 text-muted-foreground">
            You agree to defend, indemnify, and hold harmless Paced Studios LLC, its officers, directors, employees, and agents, from and against any and all claims, damages, obligations, losses, liabilities, costs, or debt, and expenses (including but not limited to attorney&apos;s fees) arising from:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Your use of and access to the Services</li>
            <li>Your violation of any term of these Terms</li>
            <li>Your violation of any third-party right, including copyright, property, or privacy rights</li>
            <li>Your misuse of matching data or third-party offers</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">14. DISPUTE RESOLUTION AND BINDING ARBITRATION</h2>
          <p className="mt-3 font-medium text-muted-foreground">
            PLEASE READ THIS SECTION CAREFULLY AS IT AFFECTS YOUR LEGAL RIGHTS.
          </p>
          <p className="mt-3 text-muted-foreground">
            Any dispute, claim, or controversy arising out of or relating to these Terms or the breach, termination, enforcement, interpretation, or validity thereof, including the determination of the scope or applicability of this agreement to arbitrate, shall be determined by binding, individual arbitration rather than in court.
          </p>
          <p className="mt-3 text-muted-foreground">
            <strong>Class Action Waiver:</strong> You and Paced Studios LLC agree that any dispute resolution proceedings will be conducted only on an individual basis and not in a class, consolidated, or representative action. If for any reason a claim proceeds in court rather than in arbitration, we each waive any right to a jury trial.
          </p>
          <p className="mt-3 text-muted-foreground">
            <strong>Informal Resolution:</strong> Before initiating arbitration, we encourage you to contact us at{" "}
            <a href="mailto:support@Leekify.com" className="text-[#956EFE] underline hover:no-underline">
              support@Leekify.com
            </a>{" "}
            to resolve disputes informally within 30 days.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">15. GENERAL PROVISIONS</h2>
          <h3 className="mt-4 font-semibold text-[#181A1D]">15.1 Governing Law</h3>
          <p className="mt-2 text-muted-foreground">
            These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.
          </p>

          <h3 className="mt-4 font-semibold text-[#181A1D]">15.2 Severability</h3>
          <p className="mt-2 text-muted-foreground">
            If any provision of these Terms is held to be invalid or unenforceable, such provision shall be struck and the remaining provisions shall be enforced.
          </p>

          <h3 className="mt-4 font-semibold text-[#181A1D]">15.3 Entire Agreement</h3>
          <p className="mt-2 text-muted-foreground">
            These Terms, along with our Privacy Policy, constitute the entire agreement between you and Paced Studios LLC regarding the Services and supersede all prior agreements and understandings.
          </p>

          <h3 className="mt-4 font-semibold text-[#181A1D]">15.4 Contact Information</h3>
          <p className="mt-2 text-muted-foreground">
            For legal inquiries, support requests, or to exercise your rights under these Terms, contact:
          </p>
          <p className="mt-2 text-muted-foreground">
            Email:{" "}
            <a href="mailto:support@Leekify.com" className="text-[#956EFE] underline hover:no-underline">
              support@Leekify.com
            </a>
          </p>
          <p className="mt-2 text-muted-foreground">Company: Paced Studios LLC</p>
        </section>
      </div>
    </div>
  );
}
