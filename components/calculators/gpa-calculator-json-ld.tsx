import {
  GPA_CALCULATOR_FAQ,
  GPA_CALCULATOR_H1,
  GPA_CALCULATOR_META_DESCRIPTION,
} from "@/lib/gpa-calculator-seo";

type Props = {
  canonicalUrl: string;
  baseUrl: string;
};

export function GpaCalculatorJsonLd({ canonicalUrl, baseUrl }: Props) {
  const payload: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: GPA_CALCULATOR_H1,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description: GPA_CALCULATOR_META_DESCRIPTION,
      url: canonicalUrl,
      browserRequirements: "Requires JavaScript",
      featureList: [
        "Weighted GPA calculator",
        "Cumulative GPA calculator",
        "Semester GPA tracking",
        "4.0 grade scale",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: GPA_CALCULATOR_H1,
      description: GPA_CALCULATOR_META_DESCRIPTION,
      url: canonicalUrl,
      isPartOf: { "@type": "WebSite", name: "PathPicker", url: baseUrl },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "PathPicker", item: baseUrl },
        { "@type": "ListItem", position: 2, name: GPA_CALCULATOR_H1, item: canonicalUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: GPA_CALCULATOR_FAQ.map((item) => ({
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
