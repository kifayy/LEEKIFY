import { createClient } from "@/lib/supabase/server";

export type ScholarshipCategory = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  display_order: number | null;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string | null;
};

export async function getCategories(): Promise<ScholarshipCategory[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("scholarship_categories")
    .select("*")
    .order("display_order", { ascending: true });
  if (error) return [];
  return (data ?? []) as ScholarshipCategory[];
}

export async function getCategoryBySlug(slug: string): Promise<ScholarshipCategory | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("scholarship_categories")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error || !data) return null;
  return data as ScholarshipCategory;
}
