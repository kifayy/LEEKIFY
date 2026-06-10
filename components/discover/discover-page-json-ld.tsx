import type { DiscoverPageCopy } from "@/lib/discover/types";
import type { College } from "@/types/college";
import { getSchoolPageHref } from "@/lib/school-page-href";

type Props = {
  copy: DiscoverPageCopy;
  canonicalUrl: string;
  baseUrl: string;
  colleges: College[];
};

export function DiscoverPageJsonLd({ copy, canonicalUrl, baseUrl, colleges }: Props) {
  const itemList = colleges.slice(0, 10).map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    url: `${baseUrl}${getSchoolPageHref(c.slug ?? "", c.name)}`,
  }));

  const payload: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: copy.h1,
      description: copy.meta_description,
      url: canonicalUrl,
      isPartOf: { "@type": "WebSite", name: "PathPicker", url: baseUrl },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "PathPicker", item: baseUrl },
        { "@type": "ListItem", position: 2, name: "Browse schools", item: `${baseUrl}/browse-schools` },
        { "@type": "ListItem", position: 3, name: copy.h1, item: canonicalUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: copy.h1,
      itemListElement: itemList,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: copy.faq.map((item) => ({
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
