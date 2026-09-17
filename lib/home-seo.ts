import { PATHPICKER_LOGO_URL } from "@/lib/brand-logos";
import { HOME_FAQ_ITEMS } from "@/lib/home-faq-content";
import { DEFAULT_SITE_DESCRIPTION, DEFAULT_SITE_TITLE } from "@/lib/site-metadata";

export const HOME_OG_IMAGE_URL = "https://storage.googleapis.com/images_592/bsa.png";

export const HOME_SEO_KEYWORDS = [
  "Leekify",
  "data breach check",
  "was my email leaked",
  "data leak search",
  "identity monitoring",
  "breach alerts",
  "exposure ledger",
  "class action settlement",
  "digital risk report",
  "have i been pwned alternative",
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
      name: "Leekify",
      alternateName: ["leekify.com"],
      description: DEFAULT_SITE_DESCRIPTION,
      publisher: { "@id": organizationId },
      inLanguage: "en-US",
    },
    {
      "@type": "Organization",
      "@id": organizationId,
      name: "Leekify",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: PATHPICKER_LOGO_URL,
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
        name: "Personal data breach discovery and identity monitoring",
      },
      primaryImageOfPage: { "@id": primaryImageId },
      inLanguage: "en-US",
    },
    {
      "@type": "ImageObject",
      "@id": primaryImageId,
      url: HOME_OG_IMAGE_URL,
      contentUrl: HOME_OG_IMAGE_URL,
      caption: "Leekify — see if your data was leaked",
    },
    {
      "@type": "SoftwareApplication",
      name: "Leekify",
      applicationCategory: "SecurityApplication",
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
            name: "Breaches",
            url: `${baseUrl}/#breaches`,
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "WebPage",
            name: "How it Works",
            url: `${baseUrl}/#how-it-works`,
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@type": "WebPage",
            name: "Pricing",
            url: `${baseUrl}/pricing`,
          },
        },
        {
          "@type": "ListItem",
          position: 4,
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
