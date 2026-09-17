import { Cookie } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Cookie Policy | Leekify",
  description:
    "How Leekify uses cookies, pixels, and similar technologies — what we collect, who receives it, and how to opt out.",
};

export default function CookiesPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 md:py-16">
      <h1 className="text-2xl font-bold tracking-tight text-[#181A1D] md:text-4xl">Cookie Policy</h1>
      <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
        <Cookie className="h-5 w-5 shrink-0" />
        <span>Effective Date: June 11, 2026 · Last Updated: June 11, 2026</span>
      </div>

      <div className="mt-8 space-y-8 text-foreground">
        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">1. Overview</h2>
          <p className="mt-3 text-muted-foreground">
            This Cookie Policy explains how Paced Studios LLC (doing business as Leekify)
            (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) uses cookies, pixels,
            local storage, and similar technologies on leekify.com and related sites
            (collectively, the &quot;Services&quot;).
          </p>
          <p className="mt-3 text-muted-foreground">
            For broader privacy practices, see our{" "}
            <Link href="/privacy" className="text-[#956EFE] underline hover:no-underline">
              Privacy Policy
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">2. Cookie Categories</h2>
          <h3 className="mt-4 font-semibold text-[#181A1D]">2.1 Essential Cookies (Always Active)</h3>
          <p className="mt-2 text-muted-foreground">
            Required to operate the Services. These cannot be disabled through our cookie banner
            without breaking core functionality.
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Session and authentication tokens</li>
            <li>Security and fraud-prevention signals</li>
            <li>Cookie consent preferences (stored locally)</li>
            <li>Attribution parameters needed for core product flows</li>
          </ul>

          <h3 className="mt-4 font-semibold text-[#181A1D]">2.2 Analytics Cookies (Opt-In)</h3>
          <p className="mt-2 text-muted-foreground">
            Help us understand how students use quizzes, browse tools, and landing pages. These
            cookies are disabled until you explicitly opt in.
          </p>

          <h3 className="mt-4 font-semibold text-[#181A1D]">2.3 Marketing Cookies &amp; Pixels (Opt-In)</h3>
          <p className="mt-2 text-muted-foreground">
            Used for advertising measurement, conversion tracking, audience building, and
            retargeting. These technologies are disabled until you explicitly opt in.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">3. Tools We Use</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left">
                  <th className="py-2 pr-4 font-semibold text-[#181A1D]">Tool</th>
                  <th className="py-2 pr-4 font-semibold text-[#181A1D]">Category</th>
                  <th className="py-2 pr-4 font-semibold text-[#181A1D]">Data Collected</th>
                  <th className="py-2 pr-4 font-semibold text-[#181A1D]">Recipient</th>
                  <th className="py-2 font-semibold text-[#181A1D]">Retention</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-gray-100 align-top">
                  <td className="py-3 pr-4">Google Analytics</td>
                  <td className="py-3 pr-4">Analytics</td>
                  <td className="py-3 pr-4">
                    Pages visited, session duration, device/browser, approximate location, traffic
                    source, events (e.g., quiz clicks, browse filters)
                  </td>
                  <td className="py-3 pr-4">Google LLC</td>
                  <td className="py-3">Up to 14 months (configurable); Google may retain longer per its policies</td>
                </tr>
                <tr className="border-b border-gray-100 align-top">
                  <td className="py-3 pr-4">Meta (Facebook) Pixel</td>
                  <td className="py-3 pr-4">Marketing</td>
                  <td className="py-3 pr-4">
                    Page views, button clicks, device/browser data, IP address, ad interaction signals
                  </td>
                  <td className="py-3 pr-4">Meta Platforms, Inc.</td>
                  <td className="py-3">Per Meta&apos;s advertising data retention policies (typically up to ~90 days for event data; longer for aggregated ad metrics)</td>
                </tr>
                <tr className="border-b border-gray-100 align-top">
                  <td className="py-3 pr-4">Snapchat Pixel</td>
                  <td className="py-3 pr-4">Marketing</td>
                  <td className="py-3 pr-4">
                    Page views, conversion events, device/browser data, IP address
                  </td>
                  <td className="py-3 pr-4">Snap Inc.</td>
                  <td className="py-3">Per Snap&apos;s ad platform retention policies</td>
                </tr>
                <tr className="border-b border-gray-100 align-top">
                  <td className="py-3 pr-4">TikTok Pixel</td>
                  <td className="py-3 pr-4">Marketing</td>
                  <td className="py-3 pr-4">
                    Page views, button clicks, device/browser data, IP address, ad interaction signals
                  </td>
                  <td className="py-3 pr-4">TikTok Inc.</td>
                  <td className="py-3">Per TikTok&apos;s advertising data retention policies</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-muted-foreground">
            We may add or change tools over time. Material changes will be reflected in this policy
            and, where required, in our cookie banner.
          </p>
          <p className="mt-3 text-muted-foreground">
            Our Privacy Policy also references additional networks we may use in the future (e.g.,
            Google Ads, LinkedIn Insight Tag). Those tools will only fire after explicit opt-in if
            and when implemented.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">4. How to Opt Out or Manage Cookies</h2>
          <ul className="mt-3 list-inside list-disc space-y-2 text-muted-foreground">
            <li>
              Use our cookie banner or click &quot;Cookie Settings&quot; in the site footer to
              change analytics and marketing preferences at any time.
            </li>
            <li>
              Reject non-essential cookies to allow only essential cookies.
            </li>
            <li>
              Google Analytics opt-out browser add-on:{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                className="text-[#956EFE] underline hover:no-underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://tools.google.com/dlpage/gaoptout
              </a>
            </li>
            <li>
              Digital Advertising Alliance (US):{" "}
              <a
                href="https://optout.aboutads.info/"
                className="text-[#956EFE] underline hover:no-underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://optout.aboutads.info/
              </a>
            </li>
            <li>Adjust ad preferences in your Google, Meta, and Snapchat account settings.</li>
            <li>Block or delete cookies through your browser settings.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">5. California Residents</h2>
          <p className="mt-3 text-muted-foreground">
            For California residents, analytics and marketing cookies, pixels, and similar tracking
            technologies will <strong>not</strong> fire until you explicitly opt in through our
            cookie banner. Essential cookies remain active to provide the Services.
          </p>
          <p className="mt-3 text-muted-foreground">
            You may also submit a &quot;Do Not Sell or Share My Personal Information&quot; request
            by emailing{" "}
            <a href="mailto:support@Leekify.com" className="text-[#956EFE] underline hover:no-underline">
              support@Leekify.com
            </a>{" "}
            with &quot;Opt-Out Request&quot; in the subject line.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">6. Contact</h2>
          <p className="mt-3 text-muted-foreground">
            Questions about this Cookie Policy:{" "}
            <a href="mailto:support@Leekify.com" className="text-[#956EFE] underline hover:no-underline">
              support@Leekify.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
