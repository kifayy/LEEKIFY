/**
 * Single source for `next.config` `images.remotePatterns` and runtime checks
 * (e.g. whether `next/image` can optimize a URL).
 * Keep protocol/pathname aligned when adding hosts.
 */
export const REMOTE_IMAGE_PATTERNS = [
  { protocol: "https" as const, hostname: "images.pexels.com", pathname: "/**" as const },
  { protocol: "https" as const, hostname: "images.unsplash.com", pathname: "/**" as const },
  { protocol: "https" as const, hostname: "upload.wikimedia.org", pathname: "/**" as const },
  { protocol: "https" as const, hostname: "storage.googleapis.com", pathname: "/**" as const },
  { protocol: "https" as const, hostname: "storage.cloud.google.com", pathname: "/**" as const },
  { protocol: "https" as const, hostname: "zensignglobal.com", pathname: "/**" as const },
  { protocol: "https" as const, hostname: "logo.clearbit.com", pathname: "/**" as const },
  { protocol: "https" as const, hostname: "cdn.prod.website-files.com", pathname: "/**" as const },
  { protocol: "https" as const, hostname: "framerusercontent.com", pathname: "/**" as const },
  { protocol: "https" as const, hostname: "databreach.com", pathname: "/**" as const },
] as const;

const APPROVED_HOSTS = new Set(
  REMOTE_IMAGE_PATTERNS.map((p) => p.hostname.toLowerCase()),
);

/** True when `src` is https and the host is allowed in Next image config. */
export function shouldUseNextImageOptimizer(src: string): boolean {
  try {
    const u = new URL(src);
    if (u.protocol !== "https:") return false;
    return APPROVED_HOSTS.has(u.hostname.toLowerCase());
  } catch {
    return false;
  }
}

const GCS_HOSTS = new Set(["storage.googleapis.com", "storage.cloud.google.com"]);

/** Serve from GCS CDN directly (skip `/_next/image`) — cheaper when objects are pre-sized. */
export function shouldServeImageDirectFromCdn(src: string): boolean {
  try {
    const u = new URL(src);
    if (u.protocol !== "https:") return false;
    return GCS_HOSTS.has(u.hostname.toLowerCase());
  } catch {
    return false;
  }
}
