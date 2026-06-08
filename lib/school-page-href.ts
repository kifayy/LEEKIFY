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
  if (!normalized) return "/browse-schools";
  return `/schools/${encodeURIComponent(normalized)}`;
}
