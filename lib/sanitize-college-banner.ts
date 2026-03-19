/** Banner URLs we never show (e.g. generic institutional marks). */
const BLOCKED_BANNER_SUBSTRINGS = [
  "attheu.utah.edu/wp-content/themes/umctheme3/img/uu-institutional.png",
];

export function sanitizeCollegeBanner(url: string | null | undefined): string | null {
  const t = url?.trim();
  if (!t || t === "null") return null;
  const lower = t.toLowerCase();
  if (BLOCKED_BANNER_SUBSTRINGS.some((s) => lower.includes(s.toLowerCase()))) return null;
  return t;
}
