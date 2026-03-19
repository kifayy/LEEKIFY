import { PhoneCtaSection } from "@/components/phone-cta";
import { ScholarshipScannerHowItWorks } from "@/components/scholarship-scanner-how-it-works";
import { ScholarshipScannerSeeInAction } from "@/components/scholarship-scanner-see-in-action";
import { ScholarshipScannerFaq } from "@/components/scholarship-scanner-faq";
import { ScholarshipScannerFinalCta } from "@/components/scholarship-scanner-final-cta";

export const metadata = {
  title: "Scholarship Scanner | Pathpicker",
  description:
    "Sign up to get matched scholarships sent to your inbox.",
};

export default function ScholarshipScannerPage() {
  // Serverless route entry: render the signup flow components.
  // (No-op redirect is NOT used here; this page is the canonical URL.)
  return (
    <>
      <PhoneCtaSection showReviewsSidebar />
      <ScholarshipScannerHowItWorks />
      <ScholarshipScannerSeeInAction />
      <ScholarshipScannerFaq />
      <ScholarshipScannerFinalCta />
    </>
  );
}

