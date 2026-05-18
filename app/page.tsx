import type { Metadata } from "next";
import { AboutProfileSchoolsSection } from "@/components/home/about-profile-schools-section";
import { HomeHeroWithAudience } from "@/components/home/home-hero-with-audience";
import {
  HomeCollegeMatchQuizCta,
  HomeMatchBenefitsSection,
} from "@/components/home/home-bottom-stat-cards";
import { HomePageFaqs } from "@/components/home/home-page-faqs";
import { HomeScholarshipFeatureShowcase } from "@/components/home/home-scholarship-feature-showcase";
import { StudentsLoveSection } from "@/components/home2/StudentsLoveSection";
import { getBaseUrlForMetadata } from "@/lib/metadata-base-url";
import {
  DESKTOP_HERO_ART_URL,
  MOBILE_FEATURE_LCP_URL,
  MOBILE_HERO_PORTRAIT_URL,
} from "@/lib/home-lcp-images";
import {
  buildHomePageJsonLdGraph,
  HOME_OG_IMAGE_URL,
  HOME_SEO_KEYWORDS,
} from "@/lib/home-seo";
import { DEFAULT_SITE_DESCRIPTION, DEFAULT_SITE_TITLE } from "@/lib/site-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = await getBaseUrlForMetadata();
  return {
    title: DEFAULT_SITE_TITLE,
    description: DEFAULT_SITE_DESCRIPTION,
    metadataBase: new URL(baseUrl),
    alternates: { canonical: baseUrl },
    keywords: [...HOME_SEO_KEYWORDS],
    authors: [{ name: "PathPicker", url: baseUrl }],
    creator: "PathPicker",
    publisher: "PathPicker",
    category: "education",
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: baseUrl,
      title: DEFAULT_SITE_TITLE,
      description: DEFAULT_SITE_DESCRIPTION,
      siteName: "PathPicker",
      images: [
        {
          url: HOME_OG_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: "PathPicker — college match quiz and student archetype platform",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: DEFAULT_SITE_TITLE,
      description: DEFAULT_SITE_DESCRIPTION,
      images: {
        url: HOME_OG_IMAGE_URL,
        alt: "PathPicker — college match quiz and student archetype platform",
      },
    },
  };
}

export default async function Home() {
  const baseUrl = await getBaseUrlForMetadata();
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@graph": buildHomePageJsonLdGraph({ baseUrl }),
  };

  return (
    <>
      <link
        rel="preload"
        href={DESKTOP_HERO_ART_URL}
        as="image"
        type="image/webp"
        fetchPriority="high"
        media="(min-width: 768px)"
      />
      <link
        rel="preload"
        href={MOBILE_HERO_PORTRAIT_URL}
        as="image"
        fetchPriority="high"
        media="(max-width: 767px)"
      />
      <link
        rel="preload"
        href={MOBILE_FEATURE_LCP_URL}
        as="image"
        fetchPriority="high"
        media="(max-width: 767px)"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <HomeHeroWithAudience />
      <span id="deep-profile-rankings" className="block scroll-mt-28 md:hidden" aria-hidden />
      <span id="commit-with-zero-regrets" className="block scroll-mt-28 md:hidden" aria-hidden />
      <AboutProfileSchoolsSection />
      <HomeScholarshipFeatureShowcase />
      <StudentsLoveSection />
      <HomeMatchBenefitsSection />
      <HomePageFaqs />
      <HomeCollegeMatchQuizCta />
    </>
  );
}
