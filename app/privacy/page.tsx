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
        <span>Effective Date: June 7, 2026 · Last Updated: June 11, 2026</span>
      </div>

      <div className="mt-8 space-y-8 text-foreground">
        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">1. INTRODUCTION</h2>
          <p className="mt-3 text-muted-foreground">
            This Privacy Policy (&quot;Policy&quot;) governs how Paced Studios LLC (doing business as PathPicker and the Awarded App) (collectively, &quot;Company,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) collects, uses, maintains, and discloses information from users (&quot;User,&quot; &quot;you,&quot; or &quot;your&quot;) of the PathPicker website, the Awarded mobile application, and all associated digital properties and services (collectively, the &quot;Services&quot;).
          </p>
          <p className="mt-3 text-muted-foreground">
            By accessing or using the Services, you expressly consent to the data practices described in this Policy. If you do not agree with these practices, please do not use the Services.
          </p>
          <p className="mt-3 text-muted-foreground">
            We may update this Policy at any time. Material changes will be notified via email or prominent notice on the Services. Your continued use after changes constitutes acceptance.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">2. WHAT INFORMATION WE COLLECT</h2>
          <h3 className="mt-4 font-semibold text-[#181A1D]">2.1 Information You Provide</h3>
          <p className="mt-2 text-muted-foreground"><strong>Account &amp; Contact Information:</strong></p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Full name, email address, phone number</li>
            <li>Account username and password</li>
            <li>Profile picture (if provided)</li>
          </ul>
          <p className="mt-3 text-muted-foreground"><strong>Profile &amp; Demographic Data:</strong></p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Age and date of birth</li>
            <li>Academic standing and intended major</li>
            <li>Grade point average (GPA) range</li>
            <li>Career interests and goals</li>
            <li>First-generation or second-generation student status</li>
            <li>Location/state of residence</li>
          </ul>
          <p className="mt-3 text-muted-foreground"><strong>Financial Intent Data:</strong></p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Self-reported income bracket</li>
            <li>Student loan interest</li>
            <li>Credit card information for payment processing (see Section 2.4)</li>
            <li>Financial product interests</li>
            <li>Credit readiness indicators</li>
          </ul>
          <p className="mt-3 text-muted-foreground"><strong>Communication Preferences:</strong></p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Email opt-in/opt-out status</li>
            <li>SMS opt-in/opt-out status</li>
            <li>Marketing communication preferences</li>
          </ul>

          <h3 className="mt-4 font-semibold text-[#181A1D]">2.2 Information Automatically Collected</h3>
          <p className="mt-2 text-muted-foreground">When you use the Services, we automatically collect:</p>
          <p className="mt-3 text-muted-foreground"><strong>Device &amp; Network Data:</strong></p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Internet Protocol (IP) address</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Unique device identifier (UDID) or device ID</li>
            <li>Device model and manufacturer</li>
            <li>Mobile network information</li>
          </ul>
          <p className="mt-3 text-muted-foreground"><strong>Usage &amp; Behavioral Data:</strong></p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Pages visited and time spent</li>
            <li>Features used</li>
            <li>Clicks and interactions</li>
            <li>Referral source and exit pages</li>
            <li>Search queries</li>
            <li>Quiz/assessment responses and results</li>
          </ul>
          <p className="mt-3 text-muted-foreground"><strong>Location Data:</strong></p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>IP-based geographic location (city/state level)</li>
            <li>Device-based location (if permissions granted)</li>
          </ul>
          <p className="mt-3 text-muted-foreground"><strong>Cookies &amp; Tracking:</strong></p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Session IDs and authentication tokens</li>
            <li>Preferences and settings</li>
            <li>Affiliate tracking identifiers</li>
            <li>Third-party advertising cookies (see Section 5)</li>
          </ul>

          <h3 className="mt-4 font-semibold text-[#181A1D]">2.3 Information from Third Parties</h3>
          <p className="mt-2 text-muted-foreground">We may receive information from:</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Third-party authentication providers (Google, Apple Sign-In, etc.)</li>
            <li>Affiliate partners (when you engage with their offers)</li>
            <li>Data brokers or lead aggregators (for verification purposes)</li>
            <li>Your browser/device (referral data, crash reports, etc.)</li>
          </ul>

          <h3 className="mt-4 font-semibold text-[#181A1D]">2.4 Information We Do NOT Collect</h3>
          <p className="mt-2 text-muted-foreground">We do not collect or store:</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Full credit card numbers (processed by PCI-compliant payment providers)</li>
            <li>Bank account numbers or routing numbers</li>
            <li>Social Security Numbers</li>
            <li>Full credit reports or credit scores</li>
            <li>Biometric data (fingerprints, facial recognition, etc.)</li>
            <li>Health information</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">3. HOW WE USE YOUR INFORMATION</h2>
          <p className="mt-3 text-muted-foreground">We process your information for the following purposes:</p>

          <h3 className="mt-4 font-semibold text-[#181A1D]">3.1 Providing the Services</h3>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Operating the PathPicker matching engine</li>
            <li>Delivering personalized educational and financial matches</li>
            <li>Processing subscriptions and payments</li>
            <li>Maintaining and troubleshooting your account</li>
            <li>Responding to your inquiries and support requests</li>
          </ul>

          <h3 className="mt-4 font-semibold text-[#181A1D]">3.2 Proprietary Matching Algorithm</h3>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Assessing your profile against available offers</li>
            <li>Routing you to relevant third-party opportunities</li>
            <li>Optimizing match accuracy over time</li>
            <li>A/B testing algorithm improvements</li>
          </ul>

          <h3 className="mt-4 font-semibold text-[#181A1D]">3.3 Communications</h3>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Sending transactional emails (account confirmations, receipts, password resets)</li>
            <li>Sending newsletters and educational content</li>
            <li>Sending promotional offers and updates (if you opted in)</li>
            <li>Sending SMS messages (if you opted in)</li>
            <li>Customer support and account notifications</li>
          </ul>

          <h3 className="mt-4 font-semibold text-[#181A1D]">3.4 Analytics and Improvement</h3>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Analyzing platform usage trends</li>
            <li>Measuring feature effectiveness</li>
            <li>Identifying bugs and technical issues</li>
            <li>Improving user experience and interface design</li>
            <li>Conducting research and user surveys</li>
          </ul>

          <h3 className="mt-4 font-semibold text-[#181A1D]">3.5 Affiliate Referrals and Partner Engagement</h3>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Tracking which offers you view and click</li>
            <li>Attributing conversions to our affiliate partners</li>
            <li>Sharing your profile data with partners when you express interest</li>
            <li>Enabling partners to contact you per your consent</li>
          </ul>

          <h3 className="mt-4 font-semibold text-[#181A1D]">3.6 Compliance and Security</h3>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Detecting and preventing fraud</li>
            <li>Preventing unauthorized access</li>
            <li>Complying with legal obligations</li>
            <li>Enforcing our Terms of Service</li>
            <li>Investigating violations or security incidents</li>
          </ul>

          <h3 className="mt-4 font-semibold text-[#181A1D]">3.7 Marketing and Advertising</h3>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Creating audience segments for targeted ads</li>
            <li>Testing marketing campaigns</li>
            <li>Measuring ad performance and ROI</li>
            <li>Personalizing your experience</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">4. HOW WE SHARE YOUR INFORMATION</h2>
          <h3 className="mt-4 font-semibold text-[#181A1D]">4.1 We Do NOT Sell Personal Information</h3>
          <p className="mt-2 text-muted-foreground">
            We do not sell your personal information to data brokers or third parties for money. However, under California privacy law, some of our data sharing may constitute a &quot;sale&quot; or &quot;sharing&quot; for targeted advertising purposes (see Section 6).
          </p>

          <h3 className="mt-4 font-semibold text-[#181A1D]">4.2 Affiliate and Marketing Partners</h3>
          <p className="mt-2 text-muted-foreground"><strong>How it works:</strong></p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>When you view or click on a partner offer, we share your referral with that partner</li>
            <li>Partners receive UTM parameters, tracking IDs, and sometimes your profile data</li>
            <li>Partners may contact you if you explicitly opted in</li>
            <li>We may receive compensation (Cost Per Action, Cost Per Click, or revenue share) from these partners</li>
          </ul>
          <p className="mt-3 text-muted-foreground"><strong>Partners receive:</strong></p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Email address and name (if you click their offer)</li>
            <li>Profile data (academic major, grade level, location, financial interests)</li>
            <li>Quiz results and match compatibility scores</li>
            <li>Behavioral data (pages visited, time on site)</li>
          </ul>
          <p className="mt-3 text-muted-foreground"><strong>Your control:</strong></p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Do not click offers you&apos;re not interested in</li>
            <li>Opt-out of SMS to prevent partner contact</li>
            <li>Request deletion (see Section 6 for Your Rights)</li>
          </ul>

          <h3 className="mt-4 font-semibold text-[#181A1D]">4.3 Service Providers</h3>
          <p className="mt-2 text-muted-foreground">We share data with vendors who help us operate the Services:</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li><strong>Cloud Hosting:</strong> AWS, Google Cloud, or similar (for infrastructure)</li>
            <li><strong>Email/SMS Providers:</strong> SendGrid, Twilio, or similar (for communications)</li>
            <li><strong>Analytics:</strong> Google Analytics, Mixpanel, or similar (for usage tracking)</li>
            <li><strong>Payment Processing:</strong> Stripe, PayPal, or similar (for billing)</li>
            <li><strong>Customer Support:</strong> Zendesk, Intercom, or similar (for support tickets)</li>
            <li><strong>Security &amp; Fraud:</strong> Cloudflare, Max Mind, or similar (for protection)</li>
          </ul>
          <p className="mt-3 text-muted-foreground">These vendors are contractually bound to:</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Use data only for their contracted services</li>
            <li>Maintain security standards</li>
            <li>Not share with other customers</li>
            <li>Delete data upon request</li>
          </ul>

          <h3 className="mt-4 font-semibold text-[#181A1D]">4.4 Aggregated &amp; De-Identified Data</h3>
          <p className="mt-2 text-muted-foreground">We may share anonymized, aggregated data with:</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Prospective investors and partners</li>
            <li>Academic researchers</li>
            <li>Marketing and advertising platforms</li>
            <li>Industry analysts</li>
          </ul>
          <p className="mt-3 text-muted-foreground">
            This data does not identify you and cannot be used to re-identify you.
          </p>

          <h3 className="mt-4 font-semibold text-[#181A1D]">4.5 Legal Requirements &amp; Corporate Changes</h3>
          <p className="mt-2 text-muted-foreground">We may disclose information if required by:</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Court orders or subpoenas</li>
            <li>Law enforcement requests</li>
            <li>Legal obligations (tax, regulatory, etc.)</li>
            <li>Protecting our rights or user safety</li>
          </ul>
          <p className="mt-3 text-muted-foreground">
            <strong>Corporate Changes:</strong> If PathPicker is merged, acquired, or assets are sold, your data may be transferred as a business asset. We will notify you of any such change.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">5. TRACKING TECHNOLOGIES &amp; ADVERTISING</h2>
          <h3 className="mt-4 font-semibold text-[#181A1D]">5.1 Cookies &amp; Local Storage</h3>
          <p className="mt-2 text-muted-foreground">We use the following technologies:</p>
          <p className="mt-3 text-muted-foreground"><strong>Essential Cookies (Required):</strong></p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Session management (keeping you logged in)</li>
            <li>Security and fraud prevention</li>
            <li>Account preferences</li>
          </ul>
          <p className="mt-3 text-muted-foreground"><strong>Analytics Cookies (Optional):</strong></p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Tracking usage patterns</li>
            <li>Understanding user behavior</li>
            <li>Improving platform performance</li>
          </ul>
          <p className="mt-3 text-muted-foreground"><strong>Marketing Cookies (Optional):</strong></p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Affiliate conversion tracking</li>
            <li>Advertising partner tracking</li>
            <li>Cross-site behavior mapping</li>
          </ul>
          <p className="mt-3 text-muted-foreground">You can:</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>
              Manage cookie preferences using our cookie banner or &quot;Cookie Settings&quot; in the
              site footer
            </li>
            <li>
              Read our full{" "}
              <a href="/cookies" className="text-[#956EFE] underline hover:no-underline">
                Cookie Policy
              </a>{" "}
              for a list of tools, data collected, recipients, retention, and opt-out options
            </li>
            <li>Manage cookie preferences in your browser settings</li>
            <li>Disable cookies (though this may break some features)</li>
            <li>Use &quot;Do Not Track&quot; settings (we honor applicable opt-out signals where required by law)</li>
          </ul>
          <p className="mt-3 text-muted-foreground">
            <strong>California residents:</strong> Analytics and marketing cookies, pixels, and
            similar tracking technologies will not fire until you explicitly opt in via our cookie
            banner. Essential cookies remain active to provide the Services.
          </p>

          <h3 className="mt-4 font-semibold text-[#181A1D]">5.2 Third-Party Advertising Networks &amp; Pixels</h3>
          <p className="mt-2 text-muted-foreground">
            With your opt-in consent, we use third-party advertising pixels and cookies that may:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Track your browsing across websites</li>
            <li>Create audience profiles</li>
            <li>Deliver targeted ads based on your interests</li>
            <li>Measure ad conversions and campaign performance</li>
          </ul>
          <p className="mt-3 text-muted-foreground">Tools currently in use (after marketing opt-in):</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Meta (Facebook) Pixel</li>
            <li>Snapchat Pixel</li>
            <li>TikTok Pixel</li>
          </ul>
          <p className="mt-3 text-muted-foreground">We may also use or test:</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Google Ads</li>
            <li>LinkedIn Insight Tag</li>
            <li>Other display advertising networks</li>
          </ul>
          <p className="mt-3 text-muted-foreground">
            See our{" "}
            <a href="/cookies" className="text-[#956EFE] underline hover:no-underline">
              Cookie Policy
            </a>{" "}
            for details on data collected, recipients, and retention. These networks may collect data
            even when you&apos;re not on PathPicker. You can:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Opt out via the Digital Advertising Alliance</li>
            <li>Adjust privacy settings in Google, Facebook, and other accounts</li>
            <li>Use browser extensions like uBlock Origin or Privacy Badger</li>
          </ul>

          <h3 className="mt-4 font-semibold text-[#181A1D]">5.3 Analytics</h3>
          <p className="mt-2 text-muted-foreground">
            With your opt-in consent, we use Google Analytics and similar tools to track:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Pages visited and time spent</li>
            <li>Geographic location</li>
            <li>Device type and browser</li>
            <li>Traffic sources</li>
            <li>User flows and drop-off points</li>
          </ul>
          <p className="mt-3 text-muted-foreground">
            You can opt out of Google Analytics{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              className="text-[#956EFE] underline hover:no-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            .
          </p>

          <h3 className="mt-4 font-semibold text-[#181A1D]">5.4 Video Viewing &amp; VPPA</h3>
          <p className="mt-2 text-muted-foreground">
            Some pages embed third-party video players (for example, Vimeo) to showcase product
            demos. When you play an embedded video:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>The video provider may receive your IP address, device/browser data, and playback information</li>
            <li>PathPicker does not combine video viewing history with your name, email, or account ID for disclosure to third parties</li>
            <li>We do not sell or share personally identifiable video viewing records as defined under the Video Privacy Protection Act (VPPA)</li>
          </ul>
          <p className="mt-3 text-muted-foreground">
            For more information, review the video provider&apos;s privacy policy and our{" "}
            <a href="/cookies" className="text-[#956EFE] underline hover:no-underline">
              Cookie Policy
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">6. YOUR PRIVACY RIGHTS &amp; HOW TO EXERCISE THEM</h2>
          <p className="mt-3 text-muted-foreground">
            Depending on where you live, you may have rights regarding your personal data:
          </p>

          <h3 className="mt-4 font-semibold text-[#181A1D]">6.1 California Residents (CCPA/CPRA)</h3>
          <p className="mt-2 text-muted-foreground"><strong>Right to Know:</strong></p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Request what personal information we&apos;ve collected</li>
            <li>Learn how we use and share it</li>
          </ul>
          <p className="mt-3 text-muted-foreground"><strong>Right to Delete:</strong></p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Request deletion of your information</li>
            <li>Exceptions: if we need it for legal compliance or service delivery</li>
          </ul>
          <p className="mt-3 text-muted-foreground"><strong>Right to Opt-Out:</strong></p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Opt out of the &quot;sale&quot; or &quot;sharing&quot; of personal information for targeted advertising</li>
          </ul>
          <p className="mt-3 text-muted-foreground"><strong>Right to Correct:</strong></p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Request corrections to inaccurate data</li>
          </ul>
          <p className="mt-3 text-muted-foreground"><strong>Right to Limit:</strong></p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Limit use of sensitive personal information (financial data, etc.)</li>
          </ul>
          <p className="mt-3 text-muted-foreground"><strong>Non-Discrimination:</strong></p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>We will not discriminate against you for exercising these rights</li>
            <li>We will not deny services, charge higher prices, or reduce quality</li>
          </ul>
          <p className="mt-3 text-muted-foreground">
            <strong>Cookie &amp; Pixel Opt-In (California):</strong> For California residents,
            analytics and marketing cookies, pixels, and similar tracking technologies will not fire
            until you explicitly opt in via our cookie banner. You can change your preferences at any
            time using &quot;Cookie Settings&quot; in the site footer.
          </p>

          <h3 className="mt-4 font-semibold text-[#181A1D]">6.2 European Residents (GDPR &amp; UK DPA)</h3>
          <p className="mt-2 text-muted-foreground"><strong>Right to Access:</strong></p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Request a copy of your personal data</li>
          </ul>
          <p className="mt-3 text-muted-foreground"><strong>Right to Erasure (&quot;Right to be Forgotten&quot;):</strong></p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Request deletion of your data</li>
            <li>Exceptions: legal obligations, contract performance</li>
          </ul>
          <p className="mt-3 text-muted-foreground"><strong>Right to Rectification:</strong></p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Correct inaccurate or incomplete data</li>
          </ul>
          <p className="mt-3 text-muted-foreground"><strong>Right to Restrict Processing:</strong></p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Limit how we use your data while we verify accuracy</li>
          </ul>
          <p className="mt-3 text-muted-foreground"><strong>Right to Data Portability:</strong></p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Receive your data in a portable, machine-readable format</li>
            <li>Transfer it to another service provider</li>
          </ul>
          <p className="mt-3 text-muted-foreground"><strong>Right to Object:</strong></p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Object to marketing communications</li>
            <li>Object to profiling and automated decision-making</li>
          </ul>
          <p className="mt-3 text-muted-foreground"><strong>Right to Lodge a Complaint:</strong></p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Contact your local data protection authority (e.g., ICO in the UK, CNIL in France)</li>
          </ul>

          <h3 className="mt-4 font-semibold text-[#181A1D]">6.3 Colorado, Connecticut, Utah, Virginia (US State Privacy Laws)</h3>
          <p className="mt-2 text-muted-foreground">You may have similar rights to California residents. These laws typically include:</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Right to know what information we collect</li>
            <li>Right to delete information</li>
            <li>Right to opt out of targeted advertising</li>
            <li>Right to non-discrimination for exercising these rights</li>
          </ul>

          <h3 className="mt-4 font-semibold text-[#181A1D]">6.4 How to Exercise Your Rights</h3>
          <p className="mt-2 text-muted-foreground">To submit a privacy request:</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>
              Email:{" "}
              <a href="mailto:support@pathpicker.com" className="text-[#956EFE] underline hover:no-underline">
                support@pathpicker.com
              </a>
            </li>
            <li>Include: &quot;Privacy Request&quot; in the subject line</li>
            <li>Specify which right you&apos;re exercising</li>
            <li>Provide details about the information you&apos;re requesting</li>
          </ul>
          <p className="mt-3 text-muted-foreground"><strong>Include:</strong></p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Your full name</li>
            <li>Email address used with your account</li>
            <li>Description of your request</li>
            <li>Proof of residency (for CCPA/CPRA: copy of ID, utility bill, or residency attestation)</li>
          </ul>
          <p className="mt-3 text-muted-foreground"><strong>Response time:</strong></p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>We will respond within 45 days (California) or 30 days (GDPR)</li>
            <li>We may request additional information to verify your identity</li>
            <li>We will not charge a fee</li>
          </ul>
          <p className="mt-3 text-muted-foreground">
            <strong>California Opt-Out of Sale/Sharing:</strong> Click &quot;Do Not Sell or Share My Personal Information&quot; on our website, or email{" "}
            <a href="mailto:support@pathpicker.com" className="text-[#956EFE] underline hover:no-underline">
              support@pathpicker.com
            </a>{" "}
            with &quot;Opt-Out Request&quot; in the subject line.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">7. DATA RETENTION</h2>
          <h3 className="mt-4 font-semibold text-[#181A1D]">7.1 How Long We Keep Your Data</h3>
          <p className="mt-2 text-muted-foreground"><strong>Active Accounts:</strong></p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>We retain data while you maintain an active subscription</li>
            <li>Data includes profile information, usage history, and communication records</li>
          </ul>
          <p className="mt-3 text-muted-foreground"><strong>Deleted Accounts:</strong></p>
          <p className="mt-2 text-muted-foreground">Within 30 days of account deletion, we delete:</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Your personal information (name, email, profile data)</li>
            <li>Your usage history and analytics data</li>
            <li>Your communication records</li>
          </ul>
          <p className="mt-3 text-muted-foreground">We may retain anonymized/de-identified data for analytics</p>
          <p className="mt-3 text-muted-foreground"><strong>Payment Information:</strong></p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Credit card data is processed by third-party payment providers (Stripe, PayPal)</li>
            <li>We do not store full card numbers</li>
            <li>Payment records are retained for 7 years (legal/tax requirement)</li>
          </ul>
          <p className="mt-3 text-muted-foreground"><strong>Legal &amp; Compliance:</strong></p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>We may retain data longer if required by law</li>
            <li>Examples: tax records (7 years), fraud investigations, legal disputes</li>
          </ul>
          <p className="mt-3 text-muted-foreground"><strong>Cookies &amp; Tracking:</strong></p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Session cookies: deleted when you log out</li>
            <li>Persistent cookies: stored for up to 2 years (you can delete anytime)</li>
            <li>Analytics data: retained for 38 months by Google Analytics</li>
          </ul>

          <h3 className="mt-4 font-semibold text-[#181A1D]">7.2 Inactive Accounts</h3>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Accounts inactive for 365+ days may be deactivated</li>
            <li>We will attempt to notify you before deletion</li>
            <li>You can reactivate by logging in again (within 30 days)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">8. DATA SECURITY</h2>
          <h3 className="mt-4 font-semibold text-[#181A1D]">8.1 Our Security Measures</h3>
          <p className="mt-2 text-muted-foreground">We implement industry-standard safeguards:</p>
          <p className="mt-3 text-muted-foreground"><strong>Technical Safeguards:</strong></p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Encryption of data in transit (HTTPS/TLS)</li>
            <li>Encryption of sensitive data at rest</li>
            <li>Secure authentication (passwords, two-factor authentication)</li>
            <li>Regular security audits and penetration testing</li>
            <li>Web Application Firewall (WAF)</li>
            <li>DDoS protection</li>
          </ul>
          <p className="mt-3 text-muted-foreground"><strong>Administrative Safeguards:</strong></p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Access controls and role-based permissions</li>
            <li>Employee confidentiality agreements</li>
            <li>Background checks for staff</li>
            <li>Data breach response procedures</li>
          </ul>
          <p className="mt-3 text-muted-foreground"><strong>Physical Safeguards:</strong></p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Secure data centers with restricted access</li>
            <li>Video surveillance and monitoring</li>
          </ul>

          <h3 className="mt-4 font-semibold text-[#181A1D]">8.2 Your Responsibility</h3>
          <p className="mt-2 text-muted-foreground">
            While we take security seriously, no system is 100% secure. You are responsible for:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Keeping your password confidential</li>
            <li>Not sharing your login credentials</li>
            <li>Using strong, unique passwords</li>
            <li>Logging out on shared devices</li>
            <li>Notifying us of suspicious activity immediately</li>
          </ul>

          <h3 className="mt-4 font-semibold text-[#181A1D]">8.3 Data Breach Notification</h3>
          <p className="mt-2 text-muted-foreground">
            If we experience a security breach affecting your personal information, we will:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Notify you without unreasonable delay (typically within 30 days)</li>
            <li>Provide details of the breach and affected data</li>
            <li>Offer credit monitoring or identity theft protection if applicable</li>
            <li>Not blame you for the breach</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">9. INTERNATIONAL DATA TRANSFERS</h2>
          <h3 className="mt-4 font-semibold text-[#181A1D]">9.1 Cross-Border Data Flows</h3>
          <p className="mt-2 text-muted-foreground">If you are located outside the United States:</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Your data may be transferred to, processed, and stored in the United States</li>
            <li>US data protection laws may differ from your country&apos;s laws</li>
            <li>By using the Services, you consent to these transfers</li>
          </ul>

          <h3 className="mt-4 font-semibold text-[#181A1D]">9.2 GDPR Data Transfers</h3>
          <p className="mt-2 text-muted-foreground">For European residents, we transfer data based on:</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Standard Contractual Clauses (SCCs) or Binding Corporate Rules (BCRs)</li>
            <li>Adequacy decisions (where applicable)</li>
            <li>Your explicit consent</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">10. CHILDREN&apos;S PRIVACY (COPPA)</h2>
          <p className="mt-3 text-muted-foreground">
            <strong>Age Requirement:</strong> The Services are for users 18 years and older only.
          </p>
          <p className="mt-3 text-muted-foreground">
            <strong>COPPA Compliance:</strong> We do not knowingly collect personal information from children under 13. If we discover we&apos;ve collected data from a child under 13, we will:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Immediately delete the information</li>
            <li>Notify parents/guardians if required by law</li>
          </ul>
          <p className="mt-3 text-muted-foreground">
            If you are a parent concerned about your child&apos;s data, contact{" "}
            <a href="mailto:support@pathpicker.com" className="text-[#956EFE] underline hover:no-underline">
              support@pathpicker.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">11. THIRD-PARTY LINKS &amp; SERVICES</h2>
          <p className="mt-3 text-muted-foreground">
            The Services contain links to third-party websites, apps, and services that are not operated by PathPicker. We are not responsible for:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Their privacy practices or policies</li>
            <li>Their data collection or use</li>
            <li>Their content or services</li>
          </ul>
          <p className="mt-3 text-muted-foreground">
            <strong>We strongly recommend:</strong> Review their privacy policies before providing information.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">12. YOUR CHOICES &amp; CONTROLS</h2>
          <h3 className="mt-4 font-semibold text-[#181A1D]">12.1 Email &amp; SMS Communications</h3>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>
              <strong>Marketing emails:</strong> Opt out by clicking &quot;Unsubscribe&quot; in any email or contacting{" "}
              <a href="mailto:support@pathpicker.com" className="text-[#956EFE] underline hover:no-underline">
                support@pathpicker.com
              </a>
            </li>
            <li>
              <strong>SMS messages:</strong> Reply &quot;STOP&quot; to any text, or email{" "}
              <a href="mailto:support@pathpicker.com" className="text-[#956EFE] underline hover:no-underline">
                support@pathpicker.com
              </a>
            </li>
            <li>
              <strong>SMS consent records:</strong> When you opt in to SMS, we record the date, time,
              and method of your consent (for example, web form submission, checkbox, or text-to-join)
              and retain that record for at least 48 months for compliance purposes.
            </li>
            <li>
              <strong>Account emails:</strong> You cannot opt out of transactional emails (login alerts, receipts, etc.)
            </li>
          </ul>

          <h3 className="mt-4 font-semibold text-[#181A1D]">12.2 Personalization &amp; Advertising</h3>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li><strong>Cookie preferences:</strong> Use our cookie banner or &quot;Cookie Settings&quot; in the site footer</li>
            <li><strong>Disable personalized ads:</strong> Adjust privacy settings in Google, Meta, Snapchat, and your device</li>
            <li><strong>Block third-party cookies:</strong> Use browser settings or privacy extensions</li>
            <li><strong>California residents:</strong> Analytics and marketing cookies require explicit opt-in; you may also email an opt-out request (see Section 6.4)</li>
          </ul>

          <h3 className="mt-4 font-semibold text-[#181A1D]">12.3 Account Data</h3>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>
              <strong>Access your data:</strong> Email{" "}
              <a href="mailto:support@pathpicker.com" className="text-[#956EFE] underline hover:no-underline">
                support@pathpicker.com
              </a>{" "}
              with &quot;Data Access Request&quot;
            </li>
            <li><strong>Download your data:</strong> Available in your account settings</li>
            <li><strong>Delete your account:</strong> Use account settings or contact support</li>
            <li><strong>Correct errors:</strong> Update your profile or request corrections</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">13. CONTACT US</h2>
          <p className="mt-3 text-muted-foreground">
            For privacy questions, requests, or concerns:
          </p>
          <p className="mt-2 text-muted-foreground">
            Email:{" "}
            <a href="mailto:support@pathpicker.com" className="text-[#956EFE] underline hover:no-underline">
              support@pathpicker.com
            </a>
          </p>
          <p className="mt-3 text-muted-foreground">
            <strong>Response time:</strong> We&apos;ll respond within 5 business days
          </p>
          <p className="mt-3 text-muted-foreground">
            <strong>Data Protection Authority (EU/UK):</strong> If you believe we&apos;ve violated your privacy rights, you may lodge a complaint with your local data protection authority.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">14. POLICY UPDATES</h2>
          <p className="mt-3 text-muted-foreground">We may update this Privacy Policy to reflect:</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Changes in our practices</li>
            <li>New features or services</li>
            <li>Legal or regulatory changes</li>
            <li>User feedback</li>
          </ul>
          <p className="mt-3 text-muted-foreground">
            Material changes will be notified via email or prominent notice on the Services. Your continued use constitutes acceptance of updates.
          </p>
        </section>
      </div>
    </div>
  );
}
