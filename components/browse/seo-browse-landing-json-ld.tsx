import type { SeoBrowseLandingConfig } from "@/lib/seo-browse-landings";

type Props = {
  config: SeoBrowseLandingConfig;
  canonicalUrl: string;
  baseUrl: string;
};

export function SeoBrowseLandingJsonLd({ config, canonicalUrl, baseUrl }: Props) {
  const payload: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: config.h1,
      description: config.metaDescription,
      url: canonicalUrl,
      isPartOf: { "@type": "WebSite", name: "PathPicker", url: baseUrl },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "PathPicker", item: baseUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "Browse schools",
          item: `${baseUrl}/browse`,
        },
        { "@type": "ListItem", position: 3, name: config.h1, item: canonicalUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: config.h1,
      description: config.metaDescription,
      url: canonicalUrl,
      itemListOrder: "https://schema.org/ItemListUnordered",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: config.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
