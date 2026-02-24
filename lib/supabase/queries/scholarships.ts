import { createClient } from "@/lib/supabase/server";

export type Scholarship = {
  id: string;
  title: string;
  provider: string;
  amount: string | null;
  deadline: string | null;
  is_featured: boolean;
  external_link: string | null;
  slug: string;
  content: string | null;
  tags: string[] | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
  description_short: string | null;
  requirements_summary: string | null;
  highlight_1: string | null;
  highlight_2: string | null;
  highlight_3: string | null;
  highlight_4: string | null;
  highlight_5: string | null;
  is_sweepstake: boolean | null;
};

export async function getFeaturedScholarships(): Promise<Scholarship[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("scholarships")
    .select("*")
    .eq("is_featured", true)
    .order("deadline", { ascending: true, nullsFirst: false });
  if (error) return [];
  return (data ?? []) as Scholarship[];
}

export async function getScholarshipsForMonth(): Promise<Scholarship[]> {
  const supabase = await createClient();
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
  const { data, error } = await supabase
    .from("scholarships")
    .select("*")
    .eq("is_featured", true)
    .gte("deadline", start.toISOString())
    .lte("deadline", end.toISOString())
    .order("deadline", { ascending: true });
  if (error) return [];
  return (data ?? []) as Scholarship[];
}

export async function getAllScholarships(): Promise<Scholarship[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("scholarships")
    .select("*")
    .order("deadline", { ascending: true, nullsFirst: false });
  if (error) return [];
  return (data ?? []) as Scholarship[];
}

export async function getScholarshipBySlug(slug: string): Promise<Scholarship | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("scholarships")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error || !data) return null;
  return data as Scholarship;
}

/** Get scholarships by tag (for bulk article generation and filtering) */
export async function getScholarshipsByTag(tag: string): Promise<Scholarship[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("scholarships")
    .select("*")
    .contains("tags", [tag])
    .order("deadline", { ascending: true, nullsFirst: false });
  if (error) return [];
  return (data ?? []) as Scholarship[];
}

export type ScholarshipWithBlurb = {
  scholarship: Scholarship;
  ai_description: string | null;
};

/** Get sweepstake-only scholarships (for articles and related sections) */
export async function getSweepstakeScholarships(limit = 12): Promise<Scholarship[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("scholarships")
    .select("*")
    .eq("is_sweepstake", true)
    .order("deadline", { ascending: true, nullsFirst: false })
    .limit(limit);
  if (error) return [];
  return (data ?? []) as Scholarship[];
}

/** Get 4 random scholarships where is_sweepstake = true (for home page featured carousel) */
export async function getRandomSweepstakeScholarships(count = 4): Promise<Scholarship[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("scholarships")
    .select("*")
    .eq("is_sweepstake", true)
    .limit(50);
  if (error) return [];
  const list = (data ?? []) as Scholarship[];
  // Shuffle and take first `count`
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list.slice(0, count);
}

/** One scholarship per partner: Citizens Bank, Sofi, US Bank (for home featured carousel) */
export async function getFeaturedPartnersScholarships(): Promise<Scholarship[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("scholarships")
    .select("*")
    .order("deadline", { ascending: true, nullsFirst: false })
    .limit(200);
  if (error) return [];
  const list = (data ?? []) as Scholarship[];
  const result: Scholarship[] = [];
  const seen = new Set<string>();
  for (const s of list) {
    const p = (s.provider ?? "").toLowerCase();
    if (p.includes("citizens bank") && !seen.has("citizens")) {
      result.push(s);
      seen.add("citizens");
    } else if ((p.includes("sofi") || p.includes("so fi")) && !seen.has("sofi")) {
      result.push(s);
      seen.add("sofi");
    } else if ((p.includes("us bank") || p.includes("u.s. bank")) && !seen.has("usbank")) {
      result.push(s);
      seen.add("usbank");
    }
    if (result.length >= 3) break;
  }
  return result;
}

/** Get scholarships linked to an article via junction, ordered by display_order. Includes ai_description. ONLY returns is_sweepstake = true. Falls back to tag-filtered sweepstakes, then all sweepstakes. */
export async function getScholarshipsForArticle(
  articleId: string,
  autoTag: string | null
): Promise<ScholarshipWithBlurb[]> {
  const supabase = await createClient();
  const { data: junctionRows, error } = await supabase
    .from("scholarship_article_scholarships")
    .select("display_order, ai_description, scholarships(*)")
    .eq("article_id", articleId)
    .order("display_order", { ascending: true });
  if (!error) {
    const items = (junctionRows ?? [])
      .map((r) => {
        const row = r as unknown as { scholarships: (Scholarship & { is_sweepstake?: boolean }) | null; ai_description: string | null };
        const s = row.scholarships;
        if (!s || s.is_sweepstake !== true) return null;
        return {
          scholarship: s,
          ai_description: row.ai_description ?? null,
        };
      })
      .filter((x): x is ScholarshipWithBlurb => x != null);
    if (items.length > 0) return items;
  }
  if (autoTag) {
    const supabase2 = await createClient();
    const { data: byTag } = await supabase2
      .from("scholarships")
      .select("*")
      .eq("is_sweepstake", true)
      .contains("tags", [autoTag])
      .order("deadline", { ascending: true, nullsFirst: false });
    const sweepstakes = (byTag ?? []) as Scholarship[];
    if (sweepstakes.length > 0) return sweepstakes.map((s) => ({ scholarship: s, ai_description: null }));
  }
  const sweepstakes = await getSweepstakeScholarships(12);
  return sweepstakes.map((s) => ({ scholarship: s, ai_description: null }));
}
