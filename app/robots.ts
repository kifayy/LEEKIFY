import type { MetadataRoute } from "next";
import { getPublicSiteUrlForSitemap } from "@/lib/metadata-base-url";

const legacyDisallow = [
  "/directory",
  "/school/",
  "/newsletter",
  "/blog",
  "/college-match",
  "/quiz/",
  "/colleges/",
  "/articles",
  "/faq",
  "/dashboard",
  "/404",
  "/browse",
  "/schools/",
  "/discover/",
  "/apply/",
  "/scholarships",
];

export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const baseUrl = await getPublicSiteUrlForSitemap();
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: legacyDisallow }],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
