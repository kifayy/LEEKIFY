import type { DiscoverPageCopy, IntentPageRow } from "@/lib/discover/types";
import type { College } from "@/types/college";

export type ContentFloorResult = {
  passes: boolean;
  missing: string[];
};

export function evaluateContentFloor(
  page: IntentPageRow | null,
  copy: DiscoverPageCopy,
  colleges: College[],
): ContentFloorResult {
  const missing: string[] = [];

  if (!copy.h1?.trim()) missing.push("h1");
  if (!copy.title?.trim()) missing.push("title");
  if (!copy.intro || copy.intro.trim().length < 120) missing.push("intro");
  if (!copy.summary?.trim()) missing.push("summary");
  if (!copy.why_fit?.trim()) missing.push("why_fit");
  if (!copy.best_for?.trim()) missing.push("best_for");
  if (!copy.not_ideal_for?.trim()) missing.push("not_ideal_for");
  if (!copy.methodology?.trim()) missing.push("methodology");
  if (!copy.faq || copy.faq.length < 3) missing.push("faq");
  if (colleges.length < 5) missing.push("school_matches");

  const highlighted = page?.highlighted_slugs?.length ?? 0;
  if (highlighted < 3 && colleges.length >= 3) missing.push("highlighted_schools");

  return { passes: missing.length === 0, missing };
}
