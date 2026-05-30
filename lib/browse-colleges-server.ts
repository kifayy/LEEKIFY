import { cacheLife } from "next/cache";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { BROWSE_COLLEGE_COLUMNS, BROWSE_FETCH_LIMIT } from "@/lib/browse-college-select";
import { collegeUsesBrowseExcludedHeroImage } from "@/lib/school-hero-image-variant";
import type { College } from "@/types/college";

/** ISR window for browse college list (metadata only — not image bytes). */
export const BROWSE_COLLEGES_REVALIDATE_SECONDS = 3600;

/** Public read-only client — no cookies (safe inside `"use cache"`). */
function createBrowseSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;
  return createSupabaseClient(url, key);
}

export async function getBrowseCollegesInitial(): Promise<College[]> {
  "use cache";
  cacheLife("hours");

  const supabase = createBrowseSupabaseClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("colleges")
    .select(BROWSE_COLLEGE_COLUMNS)
    .limit(BROWSE_FETCH_LIMIT);

  if (error) {
    console.error("[getBrowseCollegesInitial]", error.message);
    return [];
  }

  return (data ?? []).filter((c) => !collegeUsesBrowseExcludedHeroImage(c)) as College[];
}
