#!/usr/bin/env node
/**
 * HEAD-request all college hero URLs from Supabase; flag oversized files and missing Cache-Control.
 *
 * Usage: node scripts/audit-college-hero-images.mjs [--max-size-kb 300]
 * Env: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)
 */

import { createClient } from "@supabase/supabase-js";

const maxSizeKb = Number(process.argv.find((a) => a.startsWith("--max-size-kb="))?.split("=")[1] ?? 300);

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    console.error("Missing Supabase env vars.");
    process.exit(1);
  }

  const supabase = createClient(url, key);
  const urls = new Set();
  let from = 0;
  const page = 1000;

  for (;;) {
    const { data, error } = await supabase
      .from("colleges")
      .select("new_image_link, featured_image_url, banner")
      .range(from, from + page - 1);
    if (error) throw error;
    for (const row of data ?? []) {
      for (const field of [row.new_image_link, row.featured_image_url, row.banner]) {
        if (!field || typeof field !== "string") continue;
        const t = field.trim();
        if (t && t.toLowerCase() !== "null" && t.startsWith("http")) urls.add(t);
      }
    }
    if ((data?.length ?? 0) < page) break;
    from += page;
  }

  console.log(`Checking ${urls.size} unique image URLs (max ${maxSizeKb} KB)...\n`);

  let oversized = 0;
  let missingCache = 0;
  let failed = 0;

  for (const imageUrl of urls) {
    try {
      const res = await fetch(imageUrl, { method: "HEAD", redirect: "follow" });
      if (!res.ok) {
        console.log(`FAIL ${res.status}  ${imageUrl}`);
        failed++;
        continue;
      }
      const len = Number(res.headers.get("content-length") ?? 0);
      const cc = res.headers.get("cache-control") ?? "";
      const kb = len / 1024;
      if (kb > maxSizeKb) {
        console.log(`OVERSIZE ${kb.toFixed(0)} KB  ${imageUrl}`);
        oversized++;
      }
      if (!cc.includes("max-age") || Number.parseInt(cc.match(/max-age=(\d+)/)?.[1] ?? "0", 10) < 86400) {
        missingCache++;
      }
    } catch (e) {
      console.log(`ERROR ${imageUrl}  ${e instanceof Error ? e.message : e}`);
      failed++;
    }
  }

  console.log(`\nDone. Oversized: ${oversized}, weak/missing Cache-Control: ${missingCache}, failed: ${failed}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
