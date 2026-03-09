import { headers } from "next/headers";

function getBaseUrlFromEnv(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
  );
}

/**
 * Base URL for canonicals and metadata. Uses request host when available
 * (so pathpicker.com/sitemap.xml serves pathpicker.com URLs), else env.
 */
export async function getBaseUrlForMetadata(): Promise<string> {
  try {
    const headersList = await headers();
    const host = headersList.get("host") || headersList.get("x-forwarded-host");
    const proto = headersList.get("x-forwarded-proto");
    if (host) {
      return `${proto === "https" ? "https" : "http"}://${host}`;
    }
  } catch {
    // keep fallback
  }
  return getBaseUrlFromEnv();
}
