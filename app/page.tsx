import { DesktopHeroBanner } from "@/components/home/desktop-hero-banner";
import { HeroFigmaDesign } from "@/components/home/hero-figma-design";
import { FeaturesSection } from "@/components/home/features-section";
import { HomeScholarshipFeatureShowcase } from "@/components/home/home-scholarship-feature-showcase";
import { StudentsLoveSection } from "@/components/home2/StudentsLoveSection";
import { getBaseUrlForMetadata } from "@/lib/metadata-base-url";
import { AboutProfileSchoolsSection } from "@/components/home/about-profile-schools-section";
import { HomeBottomStatCards } from "@/components/home/home-bottom-stat-cards";

const HOME_PREVIEW_IMAGE_URL = "https://storage.googleapis.com/images_592/bsa.png";

export async function generateMetadata() {
  const baseUrl = await getBaseUrlForMetadata();
  return {
    alternates: { canonical: baseUrl },
    openGraph: {
      images: [{ url: HOME_PREVIEW_IMAGE_URL }],
    },
    twitter: {
      images: [HOME_PREVIEW_IMAGE_URL],
    },
  };
}

export default async function Home() {
  const baseUrl = await getBaseUrlForMetadata();
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: "PathPicker",
    alternateName: ["Pathpicker"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <DesktopHeroBanner />
      <div className="md:hidden">
        <HeroFigmaDesign />
      </div>
      <AboutProfileSchoolsSection />
      <HomeScholarshipFeatureShowcase />
      <StudentsLoveSection />
      <FeaturesSection />
      <HomeBottomStatCards />
    </>
  );
}
