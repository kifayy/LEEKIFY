import { headers } from "next/headers";

/**
 * ISO 3166-1 alpha-2 country code (e.g. "US", "GB") or null if unknown.
 * On Vercel, x-vercel-ip-country is set automatically from the request IP.
 * Locally (and in some runtimes) the header is missing, so we return null.
 */
export async function getRequestCountry(): Promise<string | null> {
  try {
    const headersList = await headers();
    const country = headersList.get("x-vercel-ip-country");
    return country ? country.toUpperCase() : null;
  } catch {
    return null;
  }
}
