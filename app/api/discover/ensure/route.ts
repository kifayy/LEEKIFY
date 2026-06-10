import { NextResponse } from "next/server";

import { generateDiscoverCopy } from "@/lib/discover/generate-copy";
import { applyDiscoverLifecycle } from "@/lib/discover/lifecycle";
import { getIntentPageBySlug, upsertIntentPage } from "@/lib/discover/intent-pages-db";
import { matchCollegesForIntent } from "@/lib/discover/match-colleges-server";
import { parseIntentHeuristic } from "@/lib/discover/parse-heuristic";
import type { ParsedDiscoverIntent } from "@/lib/discover/types";

type EnsureBody = {
  query?: string;
  vibes?: string[];
  location?: string | null;
  source?: ParsedDiscoverIntent["source"];
  reference_schools?: ParsedDiscoverIntent["reference_schools"];
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as EnsureBody;
    const intent = parseIntentHeuristic({
      query: body.query,
      vibes: body.vibes,
      location: body.location,
      source: body.source,
      reference_schools: body.reference_schools,
    });

    const existing = await getIntentPageBySlug(intent.canonical_slug);
    if (existing?.title && existing.intro && existing.h1) {
      if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
        await upsertIntentPage({
          intent: existing.intent_json,
          copy: {
            title: existing.title,
            h1: existing.h1,
            meta_description: existing.meta_description ?? "",
            intro: existing.intro,
            summary: existing.summary ?? "",
            why_fit: existing.why_fit ?? "",
            best_for: existing.best_for ?? "",
            not_ideal_for: existing.not_ideal_for ?? "",
            methodology: existing.methodology ?? "",
            faq: existing.faq,
          },
          colleges: [],
          rawQuery: body.query,
        });
      }
      return NextResponse.json({
        slug: intent.canonical_slug,
        intent: existing.intent_json,
        index_state: existing.index_state,
        cached: true,
      });
    }

    const colleges = await matchCollegesForIntent(intent);
    const copy = await generateDiscoverCopy(intent, colleges);
    const page = await upsertIntentPage({
      intent,
      copy,
      colleges,
      rawQuery: body.query,
    });

    const index_state = await applyDiscoverLifecycle(page, copy, colleges);

    return NextResponse.json({
      slug: intent.canonical_slug,
      intent,
      index_state,
      match_count: colleges.length,
      cached: false,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Ensure failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
