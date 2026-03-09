import { MetadataRoute } from "next";
import { headers } from "next/headers";
import { getCategories } from "@/lib/supabase/queries/scholarship-categories";
import { getAllArticlePaths } from "@/lib/supabase/queries/scholarships-page";
import { getAllScholarships } from "@/lib/supabase/queries/scholarships";

function getBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Use the request host so the sitemap always lists URLs for the domain serving it.
  // Fixes Search Console "URL not allowed" when NEXT_PUBLIC_SITE_URL was unset and Vercel URL was used.
  let baseUrl = getBaseUrl();
  try {
    const headersList = await headers();
    const host = headersList.get("host") || headersList.get("x-forwarded-host");
    const proto = headersList.get("x-forwarded-proto");
    if (host) {
      baseUrl = `${proto === "https" ? "https" : "http"}://${host}`;
    }
  } catch {
    // keep baseUrl from env
  }

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/scholarships`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/money-scanner`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/archetype-quiz`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
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

  return [...staticPages, ...categoryPages, ...articlePages, ...awardPages];
}
