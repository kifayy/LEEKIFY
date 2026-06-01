import { headers } from "next/headers";

function getBaseUrlFromEnv(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
  );
}

/** Sync site URL for page bodies that also call `"use cache"` data loaders (no request headers). */
export function getSiteUrlForCachedPages(): string {
  return (getCanonicalSiteUrlFromEnv() ?? getBaseUrlFromEnv()).replace(/\/$/, "");
}

/** Trailing slash stripped. Use for sitemap/robots so static builds never emit *.vercel.app when prod is custom domain. */
export function getCanonicalSiteUrlFromEnv(): string | null {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return null;
  return raw.replace(/\/$/, "");
}

/**
 * URLs in sitemap.xml and robots.txt must match the host that serves those files
 * (e.g. pathpicker.com). Prefer NEXT_PUBLIC_SITE_URL at build time; else request Host; else VERCEL_URL.
 */
export async function getPublicSiteUrlForSitemap(): Promise<string> {
  const canon = getCanonicalSiteUrlFromEnv();
  if (canon) return canon;

  try {
    const headersList = await headers();
    const host = headersList.get("host") || headersList.get("x-forwarded-host");
    const proto = headersList.get("x-forwarded-proto");
    if (host) {
      return `${proto === "https" ? "https" : "http"}://${host}`;
    }
  } catch {
    // static generation / no request
  }

  return process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";
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
