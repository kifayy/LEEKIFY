import { MetadataRoute } from "next";
import { getPublicSiteUrlForSitemap } from "@/lib/metadata-base-url";
import { getAllCollegeSlugsForSitemap } from "@/lib/supabase/queries/colleges";

/** Avoid static snapshot at build using VERCEL_URL (preview/prod *.vercel.app) inside pathpicker.com/sitemap.xml */
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = await getPublicSiteUrlForSitemap();

  const now = new Date();

  const home: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
  ];

  const mainProductPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/archetype-quiz`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/college-match-quiz`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/browse-schools`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
  ];

  const otherStatic: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/partners`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const collegeSlugs = await getAllCollegeSlugsForSitemap();
  const schoolPages: MetadataRoute.Sitemap = collegeSlugs.map((slug) => ({
    url: `${baseUrl}/schools/${encodeURIComponent(slug)}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [...home, ...mainProductPages, ...otherStatic, ...schoolPages];
}
