import type { MetadataRoute } from "next";
import { headers } from "next/headers";

function getBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
  );
}

// Legacy paths from an older Pathpicker product (college/school pages, directory, blog, etc.)
// that no longer exist. Disallow so crawlers stop requesting them and they drop from the index.
const legacyDisallow = [
  "/browse",
  "/directory",
  "/school/",
  "/newsletter",
  "/blog",
  "/college-match",
  "/college-match-quiz",
  "/quiz/",
  "/colleges/",
  "/articles",
  "/faq",
  "/dashboard",
  "/404",
];

export default async function robots(): Promise<MetadataRoute.Robots> {
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
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: legacyDisallow },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
