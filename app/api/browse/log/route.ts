import { NextResponse } from "next/server";

import { createAdminClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const type = typeof body.type === "string" ? body.type : "unknown";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!key) {
    return NextResponse.json({ ok: true, persisted: false });
  }

  try {
    const supabase = createAdminClient();
    await supabase.from("browse_search_events").insert({
      event_type: type,
      payload: body,
    });
    return NextResponse.json({ ok: true, persisted: true });
  } catch {
    return NextResponse.json({ ok: true, persisted: false });
  }
}
