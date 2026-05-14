import { DesktopHeroBanner } from "@/components/home/desktop-hero-banner";
import { HeroFigmaDesign } from "@/components/home/hero-figma-design";
import { FeaturesSection } from "@/components/home/features-section";
import { HomeScholarshipFeatureShowcase } from "@/components/home/home-scholarship-feature-showcase";
import { HomePageFaqs } from "@/components/home/home-page-faqs";
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
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "PathPicker",
        alternateName: ["Pathpicker"],
      },
      {
        "@type": "ItemList",
        "@id": `${baseUrl}/#primary-navigation`,
        name: "Primary navigation",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@type": "WebPage",
              name: "College Match Quiz",
              url: `${baseUrl}/archetype-quiz`,
            },
          },
          {
            "@type": "ListItem",
            position: 2,
            item: {
              "@type": "WebPage",
              name: "Browse Schools",
              url: `${baseUrl}/browse-schools`,
            },
          },
          {
            "@type": "ListItem",
            position: 3,
            item: {
              "@type": "WebPage",
              name: "Features",
              url: `${baseUrl}/#deep-profile-rankings`,
            },
          },
          {
            "@type": "ListItem",
            position: 4,
            item: {
              "@type": "WebPage",
              name: "How it Works",
              url: `${baseUrl}/#commit-with-zero-regrets`,
            },
          },
          {
            "@type": "ListItem",
            position: 5,
            item: {
              "@type": "WebPage",
              name: "Support",
              url: `${baseUrl}/contact`,
            },
          },
        ],
      },
    ],
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
      <HomePageFaqs />
      <FeaturesSection />
      <HomeBottomStatCards />
    </>
  );
}
