import type { CollegeDetail } from "@/types/college-detail";

type FaqItem = { question: string; answer: string };

type Props = {
  college: CollegeDetail;
  canonicalUrl: string;
  baseUrl: string;
  /** Must match visible FAQ copy on the page (same strings as `buildSchoolSeoHubFaq`). */
  faqItems?: FaqItem[] | null;
};

/** Server-rendered JSON-LD (CollegeOrUniversity + BreadcrumbList) for crawlers without relying on client JS. */
export function SchoolPageJsonLd({ college, canonicalUrl, baseUrl, faqItems }: Props) {
  const description =
    college.meta_description?.trim() ||
    college.description?.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim().slice(0, 500) ||
    college.personality_line?.replace(/\s+/g, " ").trim().slice(0, 500) ||
    undefined;

  const image = college.new_image_link || college.featured_image_url;

  const payload: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "CollegeOrUniversity",
      name: college.name,
      url: canonicalUrl,
      ...(description ? { description } : {}),
      ...(college.location
        ? { address: { "@type": "PostalAddress", addressLocality: college.location } }
        : {}),
      ...(image ? { image } : {}),
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
        { "@type": "ListItem", position: 3, name: college.name, item: canonicalUrl },
      ],
    },
  ];

  if (faqItems?.length) {
    payload.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
  }

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
