import { createClient } from "@/lib/supabase/server";
import { parseCollegeDetailRow } from "@/lib/college-detail-parse";
import type { CollegeDetail } from "@/types/college-detail";

export type FetchCollegeResult =
  | { ok: true; college: CollegeDetail; canonicalPath: string }
  | { ok: false; notFound: true };

/**
 * Match dashboard behavior: by slug, then ilike name from hyphenated slug.
 * Caller should redirect if URL slug !== college.slug.
 */
export async function fetchCollegeBySlugParam(slugParam: string): Promise<FetchCollegeResult> {
  const decoded = decodeURIComponent(slugParam).trim();
  if (!decoded) return { ok: false, notFound: true };

  const supabase = await createClient();

  const { data: bySlug, error: slugErr } = await supabase.from("colleges").select("*").eq("slug", decoded).maybeSingle();
  let row = bySlug;

  if (slugErr) return { ok: false, notFound: true };

  if (!row) {
    const searchName = decoded.replace(/-/g, " ").trim();
    const { data: fb } = await supabase
      .from("colleges")
      .select("*")
      .ilike("name", `%${searchName}%`)
      .limit(1)
      .maybeSingle();
    row = fb;
  }

  if (!row) return { ok: false, notFound: true };

  const college = parseCollegeDetailRow(row as Record<string, unknown>);
  const canonicalSlug = college.slug?.trim() || decoded;
  const canonicalPath = `/schools/${encodeURIComponent(canonicalSlug)}`;

  return { ok: true, college, canonicalPath };
}
