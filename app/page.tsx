import type { Metadata } from "next";
import { AboutProfileSchoolsSection } from "@/components/home/about-profile-schools-section";
import { FeaturesSection } from "@/components/home/features-section";
import { HomeHeroWithAudience } from "@/components/home/home-hero-with-audience";
import {
  HomeCollegeMatchQuizCta,
  HomeMatchBenefitsSection,
} from "@/components/home/home-bottom-stat-cards";
import { HomePageFaqs } from "@/components/home/home-page-faqs";
import { HomeScholarshipFeatureShowcase } from "@/components/home/home-scholarship-feature-showcase";
import { StudentsLoveSection } from "@/components/home2/StudentsLoveSection";
import { getBaseUrlForMetadata } from "@/lib/metadata-base-url";
import { DEFAULT_SITE_DESCRIPTION, DEFAULT_SITE_TITLE } from "@/lib/site-metadata";
import {
  HOME_FEATURE_BROWSE_FIT_IMAGE_URL,
  HOME_FEATURE_DEEP_PROFILE_IMAGE_URL,
} from "@/lib/home-feature-showcase-images";

const HOME_PREVIEW_IMAGE_URL = "https://storage.googleapis.com/images_592/bsa.png";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = await getBaseUrlForMetadata();
  return {
    title: DEFAULT_SITE_TITLE,
    description: DEFAULT_SITE_DESCRIPTION,
    alternates: { canonical: baseUrl },
    openGraph: {
      title: DEFAULT_SITE_TITLE,
      description: DEFAULT_SITE_DESCRIPTION,
      url: baseUrl,
      siteName: "PathPicker",
      images: [{ url: HOME_PREVIEW_IMAGE_URL }],
    },
    twitter: {
      card: "summary_large_image",
      title: DEFAULT_SITE_TITLE,
      description: DEFAULT_SITE_DESCRIPTION,
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
        description: DEFAULT_SITE_DESCRIPTION,
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
      <link
        rel="preload"
        href="/images/group-100000s5829.webp"
        as="image"
        fetchPriority="high"
        media="(min-width: 768px)"
      />
      <link rel="preload" href={HOME_FEATURE_BROWSE_FIT_IMAGE_URL} as="image" />
      <link rel="preload" href={HOME_FEATURE_DEEP_PROFILE_IMAGE_URL} as="image" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <HomeHeroWithAudience />
      <AboutProfileSchoolsSection />
      <HomeScholarshipFeatureShowcase />
      <StudentsLoveSection />
      <FeaturesSection />
      <HomeMatchBenefitsSection />
      <HomePageFaqs />
      <HomeCollegeMatchQuizCta />
    </>
  );
}
