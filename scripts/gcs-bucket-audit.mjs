#!/usr/bin/env node
/**
 * Audit GCS bucket objects vs Supabase college image URLs.
 *
 * Usage:
 *   node scripts/gcs-bucket-audit.mjs [--bucket pathpicker|images_592] [--max-size-kb 300]
 *
 * Env: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)
 *
 * Outputs:
 *   - Object count and total size per bucket prefix
 *   - Objects > max-size-kb
 *   - GCS objects not referenced in colleges.new_image_link / featured_image_url / banner
 */

import { createClient } from "@supabase/supabase-js";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const bucketArg = process.argv.find((a) => a.startsWith("--bucket="))?.split("=")[1] ?? "pathpicker";
const maxSizeKb = Number(process.argv.find((a) => a.startsWith("--max-size-kb="))?.split("=")[1] ?? 300);
const bucket = bucketArg === "images_592" ? "images_592" : "pathpicker";
const gsPrefix = `gs://${bucket}/`;

function gsutilLsRecursive(prefix) {
  const out = execSync(`gsutil ls -l -r ${prefix}`, { encoding: "utf8", maxBuffer: 50 * 1024 * 1024 });
  const objects = [];
  for (const line of out.split("\n")) {
    const m = line.match(/^(\s*\d+)\s+(\S+)\s+gs:\/\/.+/);
    if (!m) continue;
    const size = Number(m[1].trim());
    const updated = m[2];
    const pathMatch = line.match(/(gs:\/\/\S+)/);
    if (!pathMatch) continue;
    objects.push({ path: pathMatch[1], size, updated });
  }
  return objects;
}

function toPublicUrl(gsPath) {
  const withoutScheme = gsPath.replace(/^gs:\/\//, "");
  const slash = withoutScheme.indexOf("/");
  const objectPath = withoutScheme.slice(slash + 1);
  return `https://storage.googleapis.com/${withoutScheme.split("/")[0]}/${objectPath}`;
}

async function fetchCollegeImageUrls() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL or Supabase key in env.");
    process.exit(1);
  }
  const supabase = createClient(url, key);
  const referenced = new Set();
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
        if (!t || t.toLowerCase() === "null") continue;
        referenced.add(t);
        if (t.includes("storage.googleapis.com/")) {
          try {
            referenced.add(new URL(t.startsWith("http") ? t : `https://${t}`).href);
          } catch {
            /* ignore malformed */
          }
        }
      }
    }
    if ((data?.length ?? 0) < page) break;
    from += page;
  }
  return referenced;
}

async function main() {
  console.log(`Auditing ${gsPrefix} (flag oversized > ${maxSizeKb} KB)...\n`);
  const objects = gsutilLsRecursive(gsPrefix);
  const totalBytes = objects.reduce((s, o) => s + o.size, 0);
  console.log(`Objects: ${objects.length}, total: ${(totalBytes / 1024 / 1024).toFixed(2)} MB`);

  const oversized = objects.filter((o) => o.size > maxSizeKb * 1024).sort((a, b) => b.size - a.size);
  console.log(`Oversized (>${maxSizeKb} KB): ${oversized.length}`);
  for (const o of oversized.slice(0, 20)) {
    console.log(`  ${(o.size / 1024).toFixed(1)} KB  ${o.path}`);
  }

  const referenced = await fetchCollegeImageUrls();
  const referencedGsPaths = new Set();
  for (const url of referenced) {
    if (url.includes(`storage.googleapis.com/${bucket}/`)) {
      const path = url.split(`storage.googleapis.com/${bucket}/`)[1]?.split("?")[0];
      if (path) referencedGsPaths.add(decodeURIComponent(path));
    }
  }

  const orphans = objects.filter((o) => {
    const rel = o.path.replace(gsPrefix, "");
    return !referencedGsPaths.has(rel) && !referencedGsPaths.has(decodeURIComponent(rel));
  });
  const orphanBytes = orphans.reduce((s, o) => s + o.size, 0);
  console.log(`\nOrphans (not in Supabase image fields): ${orphans.length} (${(orphanBytes / 1024 / 1024).toFixed(2)} MB)`);

  const report = {
    bucket,
    auditedAt: new Date().toISOString(),
    objectCount: objects.length,
    totalMb: totalBytes / 1024 / 1024,
    oversizedCount: oversized.length,
    orphanCount: orphans.length,
    orphanMb: orphanBytes / 1024 / 1024,
    topOversized: oversized.slice(0, 50).map((o) => ({ path: o.path, kb: o.size / 1024 })),
    sampleOrphans: orphans.slice(0, 50).map((o) => ({ path: o.path, kb: o.size / 1024 })),
  };
  const outPath = `scripts/gcs-audit-${bucket}-${Date.now()}.json`;
  writeFileSync(outPath, JSON.stringify(report, null, 2));
  console.log(`\nReport written to ${outPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
