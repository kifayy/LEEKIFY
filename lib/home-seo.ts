import { COLLEGE_MATCH_QUIZ_URL } from "@/lib/constants";
import { HOME_FAQ_ITEMS } from "@/lib/home-faq-content";
import { DEFAULT_SITE_DESCRIPTION, DEFAULT_SITE_TITLE } from "@/lib/site-metadata";

export const HOME_OG_IMAGE_URL = "https://storage.googleapis.com/images_592/bsa.png";

export const HOME_SEO_KEYWORDS = [
  "PathPicker",
  "college match quiz",
  "student archetype",
  "college finder",
  "personality college fit",
  "admission odds",
  "high school career planning",
  "AI career resilience",
  "browse colleges",
  "college happiness fit",
] as const;

type HomeJsonLdParams = {
  baseUrl: string;
};

/** Structured data for the home page (`@graph` merged in `app/page.tsx`). */
export function buildHomePageJsonLdGraph({ baseUrl }: HomeJsonLdParams) {
  const websiteId = `${baseUrl}/#website`;
  const organizationId = `${baseUrl}/#organization`;
  const webPageId = `${baseUrl}/#webpage`;
  const primaryImageId = `${baseUrl}/#primaryimage`;

  return [
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: baseUrl,
      name: "PathPicker",
      alternateName: ["Pathpicker"],
      description: DEFAULT_SITE_DESCRIPTION,
      publisher: { "@id": organizationId },
      inLanguage: "en-US",
    },
    {
      "@type": "Organization",
      "@id": organizationId,
      name: "PathPicker",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: "https://storage.googleapis.com/images_592/s2as.png",
      },
    },
    {
      "@type": "WebPage",
      "@id": webPageId,
      url: baseUrl,
      name: DEFAULT_SITE_TITLE,
      description: DEFAULT_SITE_DESCRIPTION,
      isPartOf: { "@id": websiteId },
      about: {
        "@type": "Thing",
        name: "College and career planning for students",
      },
      primaryImageOfPage: { "@id": primaryImageId },
      inLanguage: "en-US",
    },
    {
      "@type": "ImageObject",
      "@id": primaryImageId,
      url: HOME_OG_IMAGE_URL,
      contentUrl: HOME_OG_IMAGE_URL,
      caption: "PathPicker student archetype and college match platform",
    },
    {
      "@type": "SoftwareApplication",
      name: "PathPicker",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description: DEFAULT_SITE_DESCRIPTION,
      url: baseUrl,
    },
    {
      "@type": "FAQPage",
      "@id": `${baseUrl}/#faq`,
      mainEntity: HOME_FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
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
            url: COLLEGE_MATCH_QUIZ_URL,
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
    {
      "@type": "BreadcrumbList",
      "@id": `${baseUrl}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: baseUrl,
        },
      ],
    },
  ];
}
