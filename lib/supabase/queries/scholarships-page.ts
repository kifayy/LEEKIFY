import { createClient } from "@/lib/supabase/server";

export type ScholarshipsPageArticle = {
  id: string;
  title: string;
  slug: string;
  meta_title: string | null;
  meta_description: string | null;
  content: string | null;
  published_at: string | null;
  og_image: string | null;
  canonical_url: string | null;
  auto_tag: string | null;
  created_at: string;
  updated_at: string;
};

export async function getArticleBySlug(slug: string): Promise<ScholarshipsPageArticle | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("scholarships_page")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error || !data) return null;
  return data as ScholarshipsPageArticle;
}

export async function getAllArticleSlugs(): Promise<{ slug: string }[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("scholarships_page")
    .select("slug")
    .not("published_at", "is", null)
    .order("published_at", { ascending: false });
  if (error) return [];
  return (data ?? []).map((r) => ({ slug: r.slug }));
}

export async function getAllPublishedArticles(): Promise<ScholarshipsPageArticle[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("scholarships_page")
    .select("*")
    .not("published_at", "is", null)
    .order("published_at", { ascending: false });
  if (error) return [];
  return (data ?? []) as ScholarshipsPageArticle[];
}
