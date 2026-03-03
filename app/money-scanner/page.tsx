import { PhoneCtaSection } from "@/components/phone-cta";
import { ScholarshipScannerHowItWorks } from "@/components/scholarship-scanner-how-it-works";
import { ScholarshipScannerSeeInAction } from "@/components/scholarship-scanner-see-in-action";
import { ScholarshipScannerFaq } from "@/components/scholarship-scanner-faq";
import { ScholarshipScannerFinalCta } from "@/components/scholarship-scanner-final-cta";

export const metadata = {
  title: "Money Scanner | Pathpicker",
  description:
    "Sign up to get matched scholarships sent to your inbox. Our algorithm only texts you tailored matches 2x/week :)",
};

export default function MoneyScannerPage() {
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
