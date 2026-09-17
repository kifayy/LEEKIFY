import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { HomeRecentBreachesCarousel } from "@/components/home/home-recent-breaches-carousel";
import { HomeHowItWorksSection } from "@/components/home/home-how-it-works-section";
import { HomeHeroWithAudience } from "@/components/home/home-hero-with-audience";
import { HomePageFaqs } from "@/components/home/home-page-faqs";
import { getBaseUrlForMetadata } from "@/lib/metadata-base-url";
import { getPublishedBreaches } from "@/lib/supabase/queries/recent-breaches";

const HomeMatchBenefitsSection = dynamic(
  () =>
    import("@/components/home/home-bottom-stat-cards").then((m) => ({
      default: m.HomeMatchBenefitsSection,
    })),
  { ssr: true },
);
const HomePremiumCta = dynamic(
  () =>
    import("@/components/home/home-desktop-scholarship-inbox-cta").then((m) => ({
      default: m.HomeDesktopScholarshipInboxCta,
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
    authors: [{ name: "Leekify", url: baseUrl }],
    creator: "Leekify",
    publisher: "Leekify",
    category: "security",
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
      siteName: "Leekify",
      images: [
        {
          url: HOME_OG_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: "Leekify — see if your data was leaked",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: DEFAULT_SITE_TITLE,
      description: DEFAULT_SITE_DESCRIPTION,
      images: {
        url: HOME_OG_IMAGE_URL,
        alt: "Leekify — see if your data was leaked",
      },
    },
  };
}

export default async function Home() {
  const [baseUrl, breaches] = await Promise.all([
    getBaseUrlForMetadata(),
    getPublishedBreaches(),
  ]);
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
      <HomeRecentBreachesCarousel breaches={breaches} />
      <HomeHowItWorksSection />
      <span id="commit-with-zero-regrets" className="block scroll-mt-28 md:hidden" aria-hidden />
      <span id="deep-profile-rankings" className="block scroll-mt-28 md:hidden" aria-hidden />
      <HomeMatchBenefitsSection />
      <HomePageFaqs />
      <HomePremiumCta />
    </>
  );
}
