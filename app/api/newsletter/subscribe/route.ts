import { NextResponse } from "next/server";

const BEEHIIV_API = "https://api.beehiiv.com/v2";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const record = body as Record<string, unknown>;
  const email = typeof record.email === "string" ? record.email.trim() : "";
  const honeypot =
    typeof record.website === "string"
      ? record.website.trim()
      : typeof record.company === "string"
        ? record.company.trim()
        : "";

  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;

  if (!apiKey || !publicationId) {
    return NextResponse.json({ ok: true, via: "fallback" as const });
  }

  const res = await fetch(`${BEEHIIV_API}/publications/${publicationId}/subscriptions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      send_welcome_email: true,
      reactivate_existing: false,
      utm_source: "pathpicker_hero",
      utm_medium: "website",
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("[newsletter/subscribe] Beehiiv error", res.status, text);
    return NextResponse.json({ error: "Subscription failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, via: "beehiiv" as const });
}
