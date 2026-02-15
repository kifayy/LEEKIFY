import { createClient } from "@/lib/supabase/server";

export type FAQItem = { question: string; answer: string };

export type ScholarshipsPageArticle = {
  id: string;
  title: string;
  slug: string;
  meta_title: string | null;
  meta_description: string | null;
  summary: string | null;
  content: string | null;
  published_at: string | null;
  og_image: string | null;
  canonical_url: string | null;
  auto_tag: string | null;
  category_id: string | null;
  category_slug: string | null;
  filter_field: string | null;
  filter_type: string | null;
  faq: FAQItem[] | null;
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

export async function getArticlesByCategory(categorySlug: string): Promise<ScholarshipsPageArticle[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("scholarships_page")
    .select("*")
    .eq("category_slug", categorySlug)
    .not("published_at", "is", null)
    .order("published_at", { ascending: false });
  if (error) return [];
  return (data ?? []) as ScholarshipsPageArticle[];
}

/** Get similar articles in same category, excluding current article */
export async function getSimilarArticles(
  categorySlug: string,
  excludeArticleId: string,
  limit = 3
): Promise<ScholarshipsPageArticle[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("scholarships_page")
    .select("*")
    .eq("category_slug", categorySlug)
    .neq("id", excludeArticleId)
    .not("published_at", "is", null)
    .order("published_at", { ascending: false })
    .limit(limit);
  if (error) return [];
  return (data ?? []) as ScholarshipsPageArticle[];
}

export async function getArticleByCategoryAndSlug(
  categorySlug: string,
  articleSlug: string
): Promise<ScholarshipsPageArticle | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("scholarships_page")
    .select("*")
    .eq("category_slug", categorySlug)
    .eq("slug", articleSlug)
    .single();
  if (error || !data) return null;
  return data as ScholarshipsPageArticle;
}

/** Get published articles in random order (for scholarships hub) */
export async function getRandomPublishedArticles(limit = 9): Promise<ScholarshipsPageArticle[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("scholarships_page")
    .select("*")
    .not("published_at", "is", null)
    .not("category_slug", "is", null);
  if (error) return [];
  const arr = (data ?? []) as ScholarshipsPageArticle[];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, limit);
}

export async function getAllArticlePaths(): Promise<{ category: string; slug: string }[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("scholarships_page")
    .select("category_slug, slug")
    .not("published_at", "is", null)
    .not("category_slug", "is", null);
  if (error) return [];
  return (data ?? [])
    .filter((r) => r.category_slug && r.slug)
    .map((r) => ({ category: r.category_slug!, slug: r.slug! }));
}
