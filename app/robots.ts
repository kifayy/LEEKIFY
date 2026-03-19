import type { MetadataRoute } from "next";
import { headers } from "next/headers";

function getBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
  );
}

// Legacy / dead paths. Main product URLs are allowed, including:
// /archetype-quiz, /college-match-quiz, /scholarship-scanner (Scholarship Scanner), /browse-schools (Browse Schools).
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
