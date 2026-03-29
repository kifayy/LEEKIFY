import { MetadataRoute } from "next";
import { getPublicSiteUrlForSitemap } from "@/lib/metadata-base-url";
import { getCategories } from "@/lib/supabase/queries/scholarship-categories";
import { getAllArticlePaths } from "@/lib/supabase/queries/scholarships-page";
import { getAllScholarships } from "@/lib/supabase/queries/scholarships";

/** Avoid static snapshot at build using VERCEL_URL (preview/prod *.vercel.app) inside pathpicker.com/sitemap.xml */
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = await getPublicSiteUrlForSitemap();

  const now = new Date();

  /** Home */
  const home: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
  ];

  /**
   * Main product pages (order reflects nav / SEO priority):
   * 1. Archetype Quiz → /archetype-quiz
   * 2. College Match Quiz → /college-match-quiz
   * 3. Scholarship Scanner → /scholarship-scanner
   * 4. Browse Schools → /browse-schools
   */
  const mainProductPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/archetype-quiz`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/college-match-quiz`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/scholarship-scanner`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/browse-schools`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
  ];

  const otherStatic: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/scholarships`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/partners`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const categories = await getCategories();
  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/scholarships/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const articlePaths = await getAllArticlePaths();
  const articlePages: MetadataRoute.Sitemap = articlePaths.map(({ category, slug }) => ({
    url: `${baseUrl}/scholarships/${category}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const scholarships = await getAllScholarships();
  const awardPages: MetadataRoute.Sitemap = scholarships.map((s) => ({
    url: `${baseUrl}/scholarships/award/${s.slug}`,
    lastModified: new Date(s.updated_at),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [
    ...home,
    ...mainProductPages,
    ...otherStatic,
    ...categoryPages,
    ...articlePages,
    ...awardPages,
  ];
}
