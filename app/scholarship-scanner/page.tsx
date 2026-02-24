import { NewsletterWidget } from "@/components/newsletter-widget";
import { NewsletterFaqAccordion } from "@/components/newsletter-faq-accordion";
import { PhoneCtaSection } from "@/components/phone-cta";
import { ScholarshipScannerFeaturesBlock } from "@/components/scholarship-scanner-features-block";

export const metadata = {
  title: "Scholarship Scanner | Pathpicker",
  description:
    "Sign up to get matched scholarships sent to your inbox. Our algorithm scans 1,000+ scholarships and sends you two easy ones you qualify for.",
};

const NEWSLETTER_FAQ = [
  {
    question: "How does Scholarship Scanner work?",
    answer:
      "You sign up with your phone number. Our algorithm scans 1,000+ scholarships every week and matches you with two easy ones you qualify for. We text you only twice a week so you're not spammed—just the best matches for you.",
  },
  {
    question: "How many texts will I get?",
    answer:
      "We text you only twice a week with your matched scholarships. No daily spam—just two focused messages with opportunities that fit your profile.",
  },
  {
    question: "Do I need to download an app?",
    answer:
      "No. Everything happens over text. You sign up, get your matches, and can apply from your phone without installing anything.",
  },
];

export default function ScholarshipScannerPage() {
  return (
    <>
      <PhoneCtaSection showReviewsSidebar />
      <ScholarshipScannerFeaturesBlock />
      <div className="container mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-20">
        <section className="mx-auto max-w-2xl text-center" aria-labelledby="scholarship-scanner-heading">
          <h1 id="scholarship-scanner-heading" className="sr-only">
            Scholarship Scanner
          </h1>
          <p className="mb-2 text-sm font-medium text-[#666666]">
            ⭐ 4.8 Stars | 100% Free
          </p>
          <h2 className="mb-3 text-2xl font-bold tracking-tight text-[#181A1D] md:text-3xl">
            📧 Want emails instead? Join the newsletter!
          </h2>
          <p className="mb-6 text-base leading-relaxed text-[#666666] md:text-lg">
            Over 20,000+ students are getting weekly scholarship matches to their email.
          </p>
          <div className="flex justify-center">
            <NewsletterWidget />
          </div>
        </section>

        {/* FAQ — accordion: first open, rest closed */}
        <NewsletterFaqAccordion items={NEWSLETTER_FAQ} />
      </div>
    </>
  );
}
