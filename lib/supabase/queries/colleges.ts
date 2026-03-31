import { createClient } from "@/lib/supabase/server";

const PAGE = 1000;

/**
 * All colleges with a non-empty slug for sitemap.xml (paginated — PostgREST row caps).
 */
export async function getAllCollegeSlugsForSitemap(): Promise<string[]> {
  const supabase = await createClient();
  const slugs: string[] = [];
  let from = 0;
  for (;;) {
    const { data, error } = await supabase
      .from("colleges")
      .select("slug")
      .not("slug", "is", null)
      .neq("slug", "")
      .order("slug", { ascending: true })
      .range(from, from + PAGE - 1);

    if (error) return slugs;

    const rows = (data ?? []) as { slug: string }[];
    for (const r of rows) {
      if (r.slug?.trim()) slugs.push(r.slug.trim());
    }
    if (rows.length < PAGE) break;
    from += PAGE;
  }
  return slugs;
}
