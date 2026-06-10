import { getBrowseCollegesInitial } from "@/lib/browse-colleges-server";
import { exploreCollegeMatchesVibe } from "@/lib/explore-vibe-match";
import { orderCollegesForBrowse } from "@/lib/order-colleges-for-browse";
import { collegeSearchOrFilter } from "@/lib/postgrest-ilike";
import { collegeUsesBrowseExcludedHeroImage } from "@/lib/school-hero-image-variant";
import type { ParsedDiscoverIntent } from "@/lib/discover/types";
import type { College } from "@/types/college";
import { createClient } from "@/lib/supabase/server";
import { BROWSE_COLLEGE_COLUMNS, BROWSE_FETCH_LIMIT } from "@/lib/browse-college-select";

function richEnough(c: College): boolean {
  const emoji = String(c.school_emoji ?? "").trim();
  const pl = String(c.personality_line ?? "").trim();
  return emoji.length > 0 && pl.length > 0;
}

/** Server-side college matching for discover pages (same rules as client browse). */
export async function matchCollegesForIntent(intent: ParsedDiscoverIntent): Promise<College[]> {
  let list: College[];

  if (intent.vibes.length === 0 && !intent.location) {
    list = await getBrowseCollegesInitial();
  } else {
    const supabase = await createClient();
    let query = supabase.from("colleges").select(BROWSE_COLLEGE_COLUMNS).limit(BROWSE_FETCH_LIMIT);

    if (intent.location?.trim()) {
      query = query.or(collegeSearchOrFilter(intent.location));
    }

    const { data, error } = await query;
    if (error) throw error;
    list = (data ?? []) as College[];
  }

  list = list.filter((c) => !collegeUsesBrowseExcludedHeroImage(c));

  if (intent.vibes.length === 2) {
    const [v0, v1] = intent.vibes;
    list = list.filter(
      (c) => richEnough(c) && (exploreCollegeMatchesVibe(c, v0!) || exploreCollegeMatchesVibe(c, v1!)),
    );
  } else if (intent.vibes.length === 1) {
    const v = intent.vibes[0]!;
    list = list.filter((c) => exploreCollegeMatchesVibe(c, v));
  }

  return orderCollegesForBrowse(list, intent.canonical_slug.length);
}
