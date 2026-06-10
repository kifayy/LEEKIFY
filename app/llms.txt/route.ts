import { getPublicSiteUrlForSitemap } from "@/lib/metadata-base-url";
import { getAllSeoBrowseLandingSlugs } from "@/lib/seo-browse-landings";
import { PROMOTED_COLLEGE_SEARCH_SLUGS } from "@/lib/college-search/promoted-slugs";

export async function GET() {
  const baseUrl = await getPublicSiteUrlForSitemap();
  const landings = getAllSeoBrowseLandingSlugs();

  const lines = [
    "# PathPicker",
    "> PathPicker helps students discover colleges by campus vibe, location, cost, and admission fit.",
    "",
    "## Primary discovery",
    `- Browse hub: ${baseUrl}/browse-schools`,
    `- College match quiz: ${baseUrl}/college-match-quiz`,
    "",
    "## Category anchors",
    ...landings.map((slug) => `- ${baseUrl}/${slug}`),
    "",
    "## Promoted college search pages",
    ...PROMOTED_COLLEGE_SEARCH_SLUGS.map((slug) => `- ${baseUrl}/college-search/${slug}`),
    "",
    "## Methodology",
    `- School profiles include acceptance rates, tuition bands, and campus vibe tags sourced from PathPicker research and public college data.`,
    `- Discover pages at ${baseUrl}/discover/{slug} are generated from user intent and promoted to search when they meet editorial quality thresholds.`,
    "",
    "## Contact",
    `- ${baseUrl}/contact`,
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
