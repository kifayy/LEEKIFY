import { PROMOTED_COLLEGE_SEARCH_SLUGS } from "@/lib/college-search/promoted-slugs";
import { COLLEGE_MATCH_QUIZ_URL } from "@/lib/constants";
import { DEFAULT_SITE_DESCRIPTION } from "@/lib/site-metadata";
import { getAllSeoBrowseLandingSlugs } from "@/lib/seo-browse-landings";

export type LlmsSiteLink = {
  label: string;
  href: string;
  note?: string;
};

export type LlmsSiteSection = {
  title: string;
  links: LlmsSiteLink[];
};

/** Machine-readable site index for LLM crawlers (`/llms.txt` and `/llms`). */
export function buildLlmsSiteSections(baseUrl: string): LlmsSiteSection[] {
  const landings = getAllSeoBrowseLandingSlugs();

  return [
    {
      title: "About PathPicker",
      links: [
        {
          label: "Home",
          href: baseUrl,
          note: DEFAULT_SITE_DESCRIPTION,
        },
        {
          label: "College match quiz",
          href: `${baseUrl}/college-match-quiz`,
          note: "Student archetype quiz comparing 2,000+ schools on fit, admission odds, and happiness signals.",
        },
        {
          label: "Browse schools",
          href: `${baseUrl}/browse-schools`,
          note: "Filter and compare colleges by vibe, location, cost, and admission fit.",
        },
        {
          label: "Pricing",
          href: `${baseUrl}/pricing`,
        },
        {
          label: "Contact",
          href: `${baseUrl}/contact`,
        },
      ],
    },
    {
      title: "Category browse pages",
      links: landings.map((slug) => ({
        label: slug,
        href: `${baseUrl}/${slug}`,
      })),
    },
    {
      title: "Promoted college search pages",
      links: PROMOTED_COLLEGE_SEARCH_SLUGS.map((slug) => ({
        label: slug,
        href: `${baseUrl}/college-search/${slug}`,
      })),
    },
    {
      title: "Policies",
      links: [
        { label: "Privacy Policy", href: `${baseUrl}/privacy` },
        { label: "Terms of Service", href: `${baseUrl}/terms` },
        { label: "Refund Policy", href: `${baseUrl}/terms#refund-policy` },
      ],
    },
    {
      title: "Product entry points",
      links: [
        {
          label: "Student archetype quiz (app)",
          href: COLLEGE_MATCH_QUIZ_URL,
          note: "Primary quiz flow on my.pathpicker.com.",
        },
        {
          label: "Student login",
          href: "https://my.pathpicker.com/login",
        },
      ],
    },
  ];
}

export function buildLlmsTxtContent(baseUrl: string): string {
  const sections = buildLlmsSiteSections(baseUrl);

  const lines = [
    "# PathPicker",
    "> Student intelligence platform for college matching and school discovery.",
    "> Helps high school students, transfer students, and families compare 2,000+ schools on personality fit, student archetype, admission odds, and campus happiness.",
    "",
    "## Primary discovery",
    `- Home: ${baseUrl}`,
    `- College match quiz: ${baseUrl}/college-match-quiz`,
    `- Browse schools: ${baseUrl}/browse-schools`,
    `- LLM-readable index (HTML): ${baseUrl}/llms`,
    "",
  ];

  for (const section of sections.slice(1)) {
    lines.push(`## ${section.title}`);
    for (const link of section.links) {
      const note = link.note ? ` — ${link.note}` : "";
      lines.push(`- ${link.label}: ${link.href}${note}`);
    }
    lines.push("");
  }

  lines.push("## Methodology");
  lines.push(
    "- School profiles include acceptance rates, tuition bands, and campus vibe tags from PathPicker research and public college data.",
  );
  lines.push(
    `- Discover pages at ${baseUrl}/discover/{slug} are generated from user intent and indexed when they meet editorial quality thresholds.`,
  );
  lines.push(
    "- Student archetype and fit scores combine quiz responses with campus-level intelligence signals across 100+ factors per school.",
  );
  lines.push("");
  lines.push("## Contact");
  lines.push(`- ${baseUrl}/contact`);

  return lines.join("\n");
}
