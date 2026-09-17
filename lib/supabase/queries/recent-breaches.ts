import { createClient } from "@/lib/supabase/server";

export type RecentBreach = {
  id: string;
  slug: string;
  organization: string;
  logo_url: string | null;
  logo_bg: string;
  rows_label: string;
  rows_count: number | null;
  breach_date: string | null;
  added_at: string | null;
  summary: string | null;
  what_happened: string | null;
  data_exposed: string | null;
  eligibility: string | null;
  disclaimer: string | null;
  sort_order: number;
};

const CAROUSEL_COLUMNS =
  "id, slug, organization, logo_url, logo_bg, rows_label, rows_count, breach_date, sort_order" as const;

const DETAIL_COLUMNS =
  "id, slug, organization, logo_url, logo_bg, rows_label, rows_count, breach_date, added_at, summary, what_happened, data_exposed, eligibility, disclaimer, sort_order" as const;

export async function getPublishedBreaches(): Promise<RecentBreach[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("recent_breaches")
    .select(CAROUSEL_COLUMNS)
    .eq("is_published", true)
    .order("sort_order", { ascending: true })
    .order("breach_date", { ascending: false });

  if (error) {
    console.error("getPublishedBreaches", error.message);
    return [];
  }
  return (data ?? []) as RecentBreach[];
}

export async function getBreachBySlug(slug: string): Promise<RecentBreach | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("recent_breaches")
    .select(DETAIL_COLUMNS)
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (error) {
    console.error("getBreachBySlug", error.message);
    return null;
  }
  return (data as RecentBreach | null) ?? null;
}

export async function getPublishedBreachSlugs(): Promise<string[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("recent_breaches")
    .select("slug")
    .eq("is_published", true);

  if (error) {
    console.error("getPublishedBreachSlugs", error.message);
    return [];
  }
  return (data ?? []).map((row) => row.slug as string);
}
