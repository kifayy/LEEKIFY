import { NewsletterWidget } from "@/components/newsletter-widget";
import { NewsletterFaqAccordion } from "@/components/newsletter-faq-accordion";
import { PhoneCtaSection } from "@/components/phone-cta";

export const metadata = {
  title: "Scholarship Scanner | Pathpicker",
  description:
    "Sign up to get matched scholarships sent to your inbox. Our algorithm scans 1,000+ scholarships and sends you two easy ones you qualify for.",
};

const NEWSLETTER_FAQ = [
  {
    question: "How does Scholarship Scanner work?",
    answer:
      "You sign up with your phone number. Our algorithm scans 1,000+ scholarships every week and matches you with two easy ones you qualify for. We text you only twice a week so you’re not spammed—just the best matches for you.",
  },
  {
    question: "Is it really free?",
    answer:
      "Yes. Scholarship Scanner is free. No app required and no sign-up fee. We send you personalized scholarship matches via text so you can apply without the hassle.",
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

export default function NewsletterPage() {
  return (
    <>
      <PhoneCtaSection hideFirstPhoneMockup showReviewsSidebar />
      <div className="container mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-20">
        <section className="mx-auto max-w-2xl" aria-labelledby="scholarship-scanner-heading">
          <h1 id="scholarship-scanner-heading" className="sr-only">
            Scholarship Scanner
          </h1>
          <NewsletterWidget />
        </section>

        {/* FAQ — accordion: first open, rest closed */}
        <NewsletterFaqAccordion items={NEWSLETTER_FAQ} />
      </div>
    </>
  );
}
