import { NextResponse } from "next/server";

import { normalizeEmail, searchEmailBreaches } from "@/lib/breach/client";
import type { BreachSearchResponse } from "@/lib/breach/types";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const emailRaw =
    typeof body === "object" && body !== null && "email" in body
      ? String((body as { email: unknown }).email ?? "")
      : "";

  const email = normalizeEmail(emailRaw);
  if (!email) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  try {
    const breaches = await searchEmailBreaches(email);
    const payload: BreachSearchResponse = {
      email,
      count: breaches.length,
      breaches,
    };
    return NextResponse.json(payload);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Lookup failed";
    if (message.includes("RAPIDAPI_KEY")) {
      return NextResponse.json({ error: "Breach search is not configured." }, { status: 503 });
    }
    return NextResponse.json({ error: "Could not complete breach lookup. Try again." }, { status: 502 });
  }
}
