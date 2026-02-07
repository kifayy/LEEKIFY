import { createClient } from "@/lib/supabase/server";

export type Scholarship = {
  id: string;
  title: string;
  provider: string;
  amount: string | null;
  deadline: string | null;
  is_featured: boolean;
  external_link: string | null;
  image_url: string | null;
  slug: string;
  content: string | null;
  tags: string[] | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
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

/** Get scholarships linked to an article via junction, ordered by display_order. Falls back to auto_tag if junction is empty. */
export async function getScholarshipsForArticle(
  articleId: string,
  autoTag: string | null
): Promise<Scholarship[]> {
  const supabase = await createClient();
  const { data: junctionRows, error } = await supabase
    .from("scholarship_article_scholarships")
    .select("display_order, scholarships(*)")
    .eq("article_id", articleId)
    .order("display_order", { ascending: true });
  if (error) {
    if (autoTag) return getScholarshipsByTag(autoTag);
    return [];
  }
  const scholarships = (junctionRows ?? [])
    .map((r) => (r as { scholarships: Scholarship | null }).scholarships)
    .filter((s): s is Scholarship => s != null);
  if (scholarships.length > 0) return scholarships;
  if (autoTag) return getScholarshipsByTag(autoTag);
  return [];
}
