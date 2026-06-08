import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/** Cookieless publishable client for public reads in cached/metadata contexts. */
export function createPublicSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;
  return createSupabaseClient(url, key);
}
