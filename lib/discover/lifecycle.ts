import type { DiscoverIndexState, DiscoverPageCopy, IntentPageRow } from "@/lib/discover/types";
import type { College } from "@/types/college";
import { evaluateContentFloor } from "@/lib/discover/content-floor";
import { updateIntentPageIndexState } from "@/lib/discover/intent-pages-db";

/** Promote discover page through draft → eligible → indexed when content floor passes. */
export async function applyDiscoverLifecycle(
  page: IntentPageRow | null,
  copy: DiscoverPageCopy,
  colleges: College[],
): Promise<DiscoverIndexState> {
  const floor = evaluateContentFloor(page, copy, colleges);
  const current = page?.index_state ?? "draft";

  if (current === "suppressed" || current === "retired") return current;

  let next: DiscoverIndexState = current;

  if (floor.passes) {
    next = current === "draft" ? "eligible" : current;
    if (next === "eligible" || current === "eligible") {
      next = "indexed";
    }
  } else {
    next = "draft";
  }

  if (page?.slug && next !== current) {
    await updateIntentPageIndexState(page.slug, next);
  }

  return next;
}

export function shouldIndexDiscover(state: DiscoverIndexState): boolean {
  return state === "indexed";
}
