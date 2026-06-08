import { createAdminClient } from "@/lib/supabase/server";

export type RateLimitResult = {
  allowed: boolean;
  retryAfterSec?: number;
};

function windowStartIso(windowMs: number): string {
  const startMs = Math.floor(Date.now() / windowMs) * windowMs;
  return new Date(startMs).toISOString();
}

/**
 * Server-only rate limit backed by Supabase (service role).
 * Requires migration 20260608100000_security_rate_limits_and_submissions.sql.
 */
export async function checkRateLimit(
  bucketKey: string,
  limit: number,
  windowMs: number,
): Promise<RateLimitResult> {
  if (limit <= 0) return { allowed: true };

  try {
    const supabase = createAdminClient();
    const windowStart = windowStartIso(windowMs);
    const { data, error } = await supabase.rpc("increment_rate_limit", {
      p_bucket_key: bucketKey,
      p_window_start: windowStart,
      p_limit: limit,
    });

    if (error) {
      console.error("[rate-limit]", bucketKey, error.message);
      return { allowed: true };
    }

    if (data === true) return { allowed: true };

    const windowEndMs = new Date(windowStart).getTime() + windowMs;
    const retryAfterSec = Math.max(1, Math.ceil((windowEndMs - Date.now()) / 1000));
    return { allowed: false, retryAfterSec };
  } catch (err) {
    console.error("[rate-limit]", bucketKey, err);
    return { allowed: true };
  }
}

export function rateLimitResponse(retryAfterSec: number): Response {
  return new Response(JSON.stringify({ error: "Too many requests. Please try again later." }), {
    status: 429,
    headers: {
      "Content-Type": "application/json",
      "Retry-After": String(retryAfterSec),
    },
  });
}
