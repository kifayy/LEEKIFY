import type { DiscoverPageCopy, IntentPageRow, ParsedDiscoverIntent } from "@/lib/discover/types";
import type { College } from "@/types/college";
import { createAdminClient, createClient } from "@/lib/supabase/server";

function rowToIntentPage(row: Record<string, unknown>): IntentPageRow {
  return {
    slug: String(row.slug),
    intent_type: row.intent_type as IntentPageRow["intent_type"],
    intent_json: row.intent_json as ParsedDiscoverIntent,
    title: row.title as string | null,
    h1: row.h1 as string | null,
    meta_description: row.meta_description as string | null,
    intro: row.intro as string | null,
    summary: row.summary as string | null,
    why_fit: row.why_fit as string | null,
    best_for: row.best_for as string | null,
    not_ideal_for: row.not_ideal_for as string | null,
    methodology: row.methodology as string | null,
    faq: (row.faq as IntentPageRow["faq"]) ?? [],
    highlighted_slugs: (row.highlighted_slugs as string[]) ?? [],
    index_state: row.index_state as IntentPageRow["index_state"],
    search_count: Number(row.search_count ?? 1),
    raw_query_samples: (row.raw_query_samples as string[]) ?? [],
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
  };
}

export async function getIntentPageBySlug(slug: string): Promise<IntentPageRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("intent_pages").select("*").eq("slug", slug).maybeSingle();
  if (error || !data) return null;
  return rowToIntentPage(data as Record<string, unknown>);
}

export async function getIndexedDiscoverSlugs(): Promise<string[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("intent_pages")
    .select("slug")
    .eq("index_state", "indexed")
    .order("updated_at", { ascending: false })
    .limit(5000);
  if (error || !data) return [];
  return data.map((r) => String(r.slug));
}

export async function upsertIntentPage(input: {
  intent: ParsedDiscoverIntent;
  copy: DiscoverPageCopy;
  colleges: College[];
  rawQuery?: string;
  index_state?: IntentPageRow["index_state"];
}): Promise<IntentPageRow | null> {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!key) {
    console.warn("SUPABASE_SERVICE_ROLE_KEY missing — intent page not persisted");
    return null;
  }

  const supabase = createAdminClient();
  const existing = await getIntentPageBySlug(input.intent.canonical_slug);
  const highlighted = input.colleges.slice(0, 5).map((c) => c.slug).filter(Boolean);
  const samples = existing?.raw_query_samples ?? [];
  const raw = input.rawQuery?.trim();
  const nextSamples = raw && !samples.includes(raw) ? [...samples, raw].slice(-20) : samples;

  const payload = {
    slug: input.intent.canonical_slug,
    intent_type: input.intent.intent_type,
    intent_json: input.intent,
    title: input.copy.title,
    h1: input.copy.h1,
    meta_description: input.copy.meta_description,
    intro: input.copy.intro,
    summary: input.copy.summary,
    why_fit: input.copy.why_fit,
    best_for: input.copy.best_for,
    not_ideal_for: input.copy.not_ideal_for,
    methodology: input.copy.methodology,
    faq: input.copy.faq,
    highlighted_slugs: highlighted,
    index_state: input.index_state ?? existing?.index_state ?? "draft",
    search_count: (existing?.search_count ?? 0) + 1,
    raw_query_samples: nextSamples,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase.from("intent_pages").upsert(payload, { onConflict: "slug" }).select().single();
  if (error || !data) {
    console.error("intent_pages upsert failed", error);
    return null;
  }
  return rowToIntentPage(data as Record<string, unknown>);
}

export async function updateIntentPageIndexState(
  slug: string,
  index_state: IntentPageRow["index_state"],
): Promise<void> {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!key) return;
  const supabase = createAdminClient();
  await supabase.from("intent_pages").update({ index_state, updated_at: new Date().toISOString() }).eq("slug", slug);
}
