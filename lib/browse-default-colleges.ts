import { orderCollegesForBrowse } from "@/lib/order-colleges-for-browse";
import type { College } from "@/types/college";

/** Shown on browse before any search or vibe filters. Order preserved. */
export const DEFAULT_BROWSE_FEATURED_COLLEGE_NAMES = [
  "Pepperdine",
  "Washington State",
  "University of Oregon",
  "San Jose State",
  "Belmont",
  "University of Utah",
] as const;

function normalizeCollegeName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function findFeaturedCollege(list: College[], featuredName: string): College | undefined {
  const target = normalizeCollegeName(featuredName);
  const exact = list.find((c) => normalizeCollegeName(c.name) === target);
  if (exact) return exact;

  return list.find((c) => {
    const normalized = normalizeCollegeName(c.name);
    return normalized.includes(target) || target.includes(normalized);
  });
}

export function resolveDefaultBrowseColleges(list: College[]): College[] {
  const used = new Set<string>();
  const result: College[] = [];

  for (const name of DEFAULT_BROWSE_FEATURED_COLLEGE_NAMES) {
    const college = findFeaturedCollege(
      list.filter((c) => !used.has(c.id)),
      name,
    );
    if (college) {
      result.push(college);
      used.add(college.id);
    }
  }

  return result;
}

/** Popular picker carousel — curated short names with location data from `popular = true`. */
export function resolvePopularBrowsePickerColleges(list: College[]): College[] {
  const eligible = list.filter((c) => c.popular && (c.location ?? "").trim().length > 0);
  return resolveDefaultBrowseColleges(eligible);
}

export function getInitialUnfilteredBrowseColleges(list: College[]): {
  colleges: College[];
  hasMore: boolean;
} {
  const featured = resolveDefaultBrowseColleges(list);
  const featuredIds = new Set(featured.map((c) => c.id));
  const hasMore = list.some((c) => !featuredIds.has(c.id));
  return { colleges: featured, hasMore };
}

export function orderUnfilteredBrowseRest(list: College[], seed: number): College[] {
  const featuredIds = new Set(resolveDefaultBrowseColleges(list).map((c) => c.id));
  return orderCollegesForBrowse(
    list.filter((c) => !featuredIds.has(c.id)),
    seed,
  );
}
