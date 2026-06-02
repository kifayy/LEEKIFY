import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { HomeCollegeVibePicker } from "@/components/home/home-college-vibe-picker";
import { HomeHowItWorksSection } from "@/components/home/home-how-it-works-section";
import { HomeHeroWithAudience } from "@/components/home/home-hero-with-audience";
import { HomeCollegeMatchQuizCta } from "@/components/home/home-bottom-stat-cards";
import { HomePageFaqs } from "@/components/home/home-page-faqs";
import { getBaseUrlForMetadata } from "@/lib/metadata-base-url";

const HomeMatchBenefitsSection = dynamic(
  () =>
    import("@/components/home/home-bottom-stat-cards").then((m) => ({
      default: m.HomeMatchBenefitsSection,
    })),
  { ssr: true },
);
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <div className="-mt-32 md:mt-0">
        <HomeHeroWithAudience />
      </div>
      <HomeCollegeVibePicker />
      <HomeHowItWorksSection />
      <span id="commit-with-zero-regrets" className="block scroll-mt-28 md:hidden" aria-hidden />
      <span id="deep-profile-rankings" className="block scroll-mt-28 md:hidden" aria-hidden />
      <HomeMatchBenefitsSection />
      <HomePageFaqs />
      <HomeCollegeMatchQuizCta />
    </>
  );
}
