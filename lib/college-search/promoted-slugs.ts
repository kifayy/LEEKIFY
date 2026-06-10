/** Demand-validated slugs promoted to indexable /college-search/{slug} pages (Phase 2). */

export const PROMOTED_COLLEGE_SEARCH_SLUGS = [
  "nature-tech-colleges",
  "colleges-in-california",
  "affordable-party-schools",
  "small-liberal-arts-stem",
  "beach-colleges",
] as const;

export type PromotedCollegeSearchSlug = (typeof PROMOTED_COLLEGE_SEARCH_SLUGS)[number];

export function isPromotedCollegeSearchSlug(slug: string): slug is PromotedCollegeSearchSlug {
  return (PROMOTED_COLLEGE_SEARCH_SLUGS as readonly string[]).includes(slug);
}
