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
