import { FileText } from "lucide-react";

export const metadata = {
  title: "Terms of Service | PathPicker",
  description:
    "By accessing or using PathPicker, you agree to these Terms of Service. If you do not agree, do not use the app or website.",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 md:py-16">
      <h1 className="text-2xl font-bold tracking-tight text-[#181A1D] md:text-4xl">
        Our Terms of Service
      </h1>
      <p className="mt-4 text-base font-normal text-muted-foreground">
        By accessing or using PathPicker, you agree to these Terms of Service. If you do not agree,
        do not use the app or website.
      </p>
      <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
        <FileText className="h-5 w-5 shrink-0" />
        <span>Last Updated on October 24, 2024</span>
      </div>

      <div className="mt-8 space-y-8 text-foreground">
        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">Eligibility</h2>
          <p className="mt-3 text-muted-foreground">
            You must be at least 13 years old to use PathPicker.
          </p>
          <p className="mt-2 text-muted-foreground">
            If you are under 18, you confirm that you have permission from a parent or legal
            guardian.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">Accounts and Information</h2>
          <ul className="mt-3 list-inside list-disc space-y-1 text-muted-foreground">
            <li>You agree to provide accurate and up to date information.</li>
            <li>You are responsible for maintaining the confidentiality of your account.</li>
          </ul>
          <p className="mt-3 text-muted-foreground">
            PathPicker may suspend or terminate accounts that provide false information or violate
            these terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">How Recommendations Work</h2>
          <p className="mt-3 text-muted-foreground">
            PathPicker uses quiz responses and profile information to generate personalized
            recommendations.
          </p>
          <p className="mt-2 text-muted-foreground">
            These recommendations are informational only and should not be considered professional
            advice.
          </p>
          <p className="mt-2 text-muted-foreground">
            PathPicker does not verify third party requirements, deadlines, or eligibility criteria.
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
          <h2 className="text-lg font-bold text-[#181A1D]">Text &amp; SMS</h2>
          <p className="mt-3 text-muted-foreground">
            If you provide your phone number and opt in, you agree to receive text messages from
            PathPicker, which may include:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Account alerts and updates</li>
            <li>Personalized recommendations</li>
            <li>Deadline reminders</li>
            <li>Promotional or marketing messages</li>
          </ul>
          <p className="mt-3 text-muted-foreground">Message frequency varies.</p>
          <p className="mt-1 text-muted-foreground">Message and data rates may apply.</p>
          <p className="mt-3 text-muted-foreground">
            You may opt out at any time by replying STOP.
          </p>
          <p className="mt-2 text-muted-foreground">
            For help, reply HELP or contact{" "}
            <a href="mailto:hi@awarded.app" className="text-[#956EFE] underline hover:no-underline">
              hi@awarded.app
            </a>
            .
          </p>
          <p className="mt-3 font-medium text-muted-foreground">
            Consent to receive SMS messages is not required to use PathPicker.
          </p>
          <p className="mt-2 text-muted-foreground">
            PathPicker is not responsible for delayed or undelivered messages.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">Email and Push Notifications</h2>
          <p className="mt-3 text-muted-foreground">
            By typing in your email, you may receive emails or push notifications related to your
            account or recommendations.
          </p>
          <p className="mt-3 text-muted-foreground">
            You can manage notification preferences within the app or unsubscribe from non essential
            messages.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">Third Party Links and Services</h2>
          <p className="mt-3 text-muted-foreground">
            PathPicker may link to external websites or services.
          </p>
          <p className="mt-2 text-muted-foreground">
            PathPicker does not control these third party sites and is not responsible for their
            content, accuracy, or practices.
          </p>
          <p className="mt-3 font-medium text-muted-foreground">
            Your interactions with third parties are governed by their own terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">Contact Us</h2>
          <p className="mt-3 text-muted-foreground">
            If you have any questions or concerns about our Terms of Service or the handling of your
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
