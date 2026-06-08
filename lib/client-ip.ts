import { createHash } from "crypto";

/** Best-effort client IP from reverse-proxy headers (Vercel, Cloudflare, etc.). */
export function getClientIpFromHeaders(headerStore: Headers): string {
  const forwarded = headerStore.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }

  return (
    headerStore.get("cf-connecting-ip")?.trim() ||
    headerStore.get("x-real-ip")?.trim() ||
    "unknown"
  );
}

/** One-way hash for storing IPs on submissions / rate limits without keeping raw IPs. */
export function hashClientIp(ip: string): string {
  const salt =
    process.env.RATE_LIMIT_IP_SALT?.trim() ||
    process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(0, 16) ||
    "pathpicker-rate-limit";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}
