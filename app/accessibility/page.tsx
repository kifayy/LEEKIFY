import { Accessibility } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Accessibility Statement | Pathpicker",
  description:
    "PathPicker's commitment to digital accessibility, WCAG alignment, and support for assistive technologies.",
};

export default function AccessibilityPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 md:py-16">
      <h1 className="text-2xl font-bold tracking-tight text-[#181A1D] md:text-4xl">
        Accessibility Statement
      </h1>
      <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
        <Accessibility className="h-5 w-5 shrink-0" />
        <span>Effective Date: June 11, 2026 · Last Updated: June 11, 2026</span>
      </div>

      <div className="mt-8 space-y-8 text-foreground">
        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">1. Our Commitment</h2>
          <p className="mt-3 text-muted-foreground">
            Paced Studios LLC (PathPicker) is committed to making our website and digital products
            accessible to students with disabilities. We aim to conform with the Web Content
            Accessibility Guidelines (WCAG) 2.1 Level AA and applicable accessibility laws, including
            the Americans with Disabilities Act (ADA) and the California Unruh Civil Rights Act.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">2. Measures We Take</h2>
          <ul className="mt-3 list-inside list-disc space-y-2 text-muted-foreground">
            <li>Semantic HTML and descriptive labels for interactive controls</li>
            <li>Keyboard navigability for core flows (navigation, forms, dialogs, and cookie preferences)</li>
            <li>Visible focus states on buttons and links</li>
            <li>Alternative text for meaningful images where applicable</li>
            <li>Color contrast targets aligned with WCAG AA for primary text and controls</li>
            <li>Responsive layouts that support zoom and mobile screen readers</li>
            <li>ARIA attributes on dialogs, toggles, and other dynamic UI components</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">3. Assistive Technology Support</h2>
          <p className="mt-3 text-muted-foreground">
            We design and test PathPicker with common assistive technologies in mind, including
            screen readers (e.g., VoiceOver, NVDA, JAWS), keyboard-only navigation, and browser
            zoom up to 200%. Third-party embeds (such as newsletter forms or video players) may
            follow their own accessibility standards.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">4. Known Limitations</h2>
          <p className="mt-3 text-muted-foreground">
            Some third-party content (embedded videos, advertising pixels, or partner widgets) may
            not fully meet our accessibility targets. We work to provide accessible alternatives or
            disclosures where possible and review these integrations regularly.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">5. Feedback &amp; Assistance</h2>
          <p className="mt-3 text-muted-foreground">
            If you encounter an accessibility barrier on PathPicker, or need content in an alternative
            format, please contact us:
          </p>
          <p className="mt-3 text-muted-foreground">
            Email:{" "}
            <a href="mailto:support@pathpicker.com" className="text-[#956EFE] underline hover:no-underline">
              support@pathpicker.com
            </a>
          </p>
          <p className="mt-3 text-muted-foreground">
            Include the page URL, a description of the issue, and your preferred contact method. We
            aim to respond within 5 business days.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">6. Related Policies</h2>
          <ul className="mt-3 list-inside list-disc space-y-2 text-muted-foreground">
            <li>
              <Link href="/privacy" className="text-[#956EFE] underline hover:no-underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="text-[#956EFE] underline hover:no-underline">
                Cookie Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-[#956EFE] underline hover:no-underline">
                Terms of Service
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
