import type { Metadata } from "next";

/** noindex, follow for faceted browse/landing query states. */
export function metadataForFilterParams(base: Metadata, hasFilterParams: boolean): Metadata {
  if (!hasFilterParams) return base;
  return {
    ...base,
    robots: { index: false, follow: true },
  };
}

export function hasBrowseFilterParams(searchParams: { search?: string; vibes?: string }): boolean {
  return Boolean(searchParams.search?.trim() || searchParams.vibes?.trim());
}
