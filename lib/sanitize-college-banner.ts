/** Banner URLs we never show (e.g. generic institutional marks). */
const BLOCKED_BANNER_SUBSTRINGS = [
  "attheu.utah.edu/wp-content/themes/umctheme3/img/uu-institutional.png",
  "upload.wikimedia.org/wikipedia/commons/thumb/7/70/Harvard_University_logo.svg",
];

export function sanitizeCollegeBanner(url: string | null | undefined): string | null {
  const t = url?.trim();
  if (!t || t === "null") return null;
  const lower = t.toLowerCase();
  if (BLOCKED_BANNER_SUBSTRINGS.some((s) => lower.includes(s.toLowerCase()))) return null;
  return t;
}
