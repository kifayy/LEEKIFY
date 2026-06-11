import { BROWSE_PUBLIC_PATH } from "@/lib/browse-routes";

/** Canonical browse → school detail path for crawlable `<Link href>` navigation. */
export function getSchoolPageHref(slug: string, name?: string): string {
  let normalized = slug?.trim();
  if (!normalized && name) {
    normalized = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  }
  if (!normalized) return BROWSE_PUBLIC_PATH;
  return `/schools/${encodeURIComponent(normalized)}`;
}
