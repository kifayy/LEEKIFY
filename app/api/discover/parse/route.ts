import { NextResponse } from "next/server";

import { parseIntentHeuristic } from "@/lib/discover/parse-heuristic";
import type { ParsedDiscoverIntent } from "@/lib/discover/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      query?: string;
      vibes?: string[];
      location?: string | null;
      source?: ParsedDiscoverIntent["source"];
      reference_schools?: ParsedDiscoverIntent["reference_schools"];
    };

    const intent = parseIntentHeuristic({
      query: body.query,
      vibes: body.vibes,
      location: body.location,
      source: body.source,
      reference_schools: body.reference_schools,
    });

    return NextResponse.json({ intent });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Parse failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
