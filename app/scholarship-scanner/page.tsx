import { PhoneCtaSection } from "@/components/phone-cta";
import { ScholarshipScannerFeaturesBlock } from "@/components/scholarship-scanner-features-block";
import { NewsletterCTA } from "@/components/newsletter-cta";

export const metadata = {
  title: "Scholarship Scanner | Pathpicker",
  description:
    "Sign up to get matched scholarships sent to your inbox. Our algorithm scans 1,000+ scholarships and sends you two easy ones you qualify for.",
};

export default function ScholarshipScannerPage() {
  return (
    <>
      <PhoneCtaSection showReviewsSidebar />
      <ScholarshipScannerFeaturesBlock />
      <NewsletterCTA variant="want-scholarships" />
    </>
  );
}
