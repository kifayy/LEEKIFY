/** Banner URLs we never show (institutional logos, Wikimedia marks, etc.). */
const BLOCKED_BANNER_SUBSTRINGS = [
  "attheu.utah.edu/wp-content/themes/umctheme3/img/uu-institutional.png",
  "upload.wikimedia.org",
  "wikipedia.org/wiki/",
  "_logo.",
  "_logo/",
  "athletics_logo",
  "university_logo",
  "college_logo",
  "/logo.svg",
  "/logo.png",
];

function looksLikeInstitutionalLogo(url: string): boolean {
  const lower = url.toLowerCase();
  if (BLOCKED_BANNER_SUBSTRINGS.some((s) => lower.includes(s.toLowerCase()))) return true;
  if (/\/logo[^/]*\.(svg|png|jpg|jpeg|webp)(\?|$)/i.test(url)) return true;
  return false;
}

export function sanitizeCollegeBanner(url: string | null | undefined): string | null {
  const t = url?.trim();
  if (!t || t === "null") return null;
  if (looksLikeInstitutionalLogo(t)) return null;
  return t;
}