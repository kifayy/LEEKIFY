import { Shield } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | PathPicker",
  description:
    "Our Privacy Policy outlines how we collect, use, and protect your personal information. Your privacy and security are our priorities.",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 md:py-16">
      <h1 className="text-2xl font-bold tracking-tight text-[#181A1D] md:text-4xl">
        Our Privacy Policy
      </h1>
      <p className="mt-4 text-base font-normal text-muted-foreground">
        Our Privacy Policy outlines how we collect, use, and protect your personal information. Your
        privacy and security are our priorities.
      </p>
      <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
        <Shield className="h-5 w-5 shrink-0" />
        <span>Last Updated on October 24, 2024</span>
      </div>

      <div className="mt-8 space-y-8 text-foreground">
        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">Information We Collect</h2>
          <p className="mt-3 text-muted-foreground">
            We may collect personal information you provide, including:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Name and email address</li>
            <li>
              Education related details such as interests, goals, intended major, or career
              preferences
            </li>
            <li>Personality and quiz responses used for matching</li>
            <li>Any other information you choose to share</li>
          </ul>
          <p className="mt-3 text-muted-foreground">
            We may also automatically collect limited usage data, including:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Device and browser information</li>
            <li>Pages viewed and features used</li>
            <li>General analytics and interaction data</li>
          </ul>
          <p className="mt-3 font-medium text-muted-foreground">
            PathPicker does not collect payment information.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">How We Use Your Information</h2>
          <p className="mt-3 text-muted-foreground">
            We may use the information we collect from you for various purposes, including:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>
              Match you with colleges, careers, or educational paths based on your personality and
              preferences
            </li>
            <li>Personalize your experience within PathPicker</li>
            <li>Communicate updates, alerts, or important information</li>
            <li>Improve our matching logic, features, and platform performance</li>
            <li>Maintain security and prevent misuse</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">Data Security &amp; SMS Communications</h2>
          <p className="mt-3 text-muted-foreground">
            We take data security seriously and employ industry-standard measures to protect your
            personal information from unauthorized access, disclosure, alteration, or destruction.
            However, no method of transmission over the internet or electronic storage is 100%
            secure, and we cannot guarantee absolute security.
          </p>
          <p className="mt-3 text-muted-foreground">
            If you provide your phone number and opt in, PathPicker may send you text messages
            related to:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Account updates and alerts</li>
            <li>College, career, or opportunity notifications</li>
            <li>Product updates or promotional messages</li>
          </ul>
          <p className="mt-3 text-muted-foreground">Message frequency varies.</p>
          <p className="mt-1 text-muted-foreground">Message and data rates may apply.</p>
          <p className="mt-3 text-muted-foreground">
            You can opt out at any time by replying STOP or contacting us at{" "}
            <a href="mailto:hi@awarded.app" className="text-[#956EFE] underline hover:no-underline">
              hi@awarded.app
            </a>
            .
          </p>
          <p className="mt-3 font-medium text-muted-foreground">
            Your consent to receive SMS messages is not a condition of using PathPicker.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">Third-Party Disclosure</h2>
          <p className="mt-3 text-muted-foreground">
            We may share limited information with trusted service providers who help operate
            PathPicker, such as:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Hosting and analytics providers</li>
            <li>Messaging and notification services</li>
          </ul>
          <p className="mt-3 text-muted-foreground">
            These providers are required to keep your information confidential.
          </p>
          <p className="mt-2 text-muted-foreground">
            We may disclose information if required by law.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">Cookies</h2>
          <p className="mt-3 text-muted-foreground">
            Our website may use cookies to enhance your browsing experience and collect information
            about how you interact with our site. You can adjust your browser settings to refuse
            cookies or alert you when cookies are being sent, but some features of the site may not
            function properly without cookies.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">Changes to this Privacy Policy</h2>
          <p className="mt-3 text-muted-foreground">
            We reserve the right to update or change this Privacy Policy at any time. Any changes
            will be posted on this page, and the effective date will be updated accordingly. We
            encourage you to review this Privacy Policy periodically for any updates.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">Contact Us</h2>
          <p className="mt-3 text-muted-foreground">
            If you have any questions or concerns about our Privacy Policy or the handling of your
            personal information, please contact us at{" "}
            <a href="mailto:hi@awarded.app" className="text-[#956EFE] underline hover:no-underline">
              hi@awarded.app
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
