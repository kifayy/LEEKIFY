import type { CollegeDetail } from "@/types/college-detail";

/** Deterministic variant pick so thousands of school pages are not byte-identical. */
export function pickSeoVariant(seed: string, salt: string, variants: readonly string[]): string {
  if (variants.length === 0) return "";
  let h = 2166136261;
  const s = `${seed}:${salt}`;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return variants[Math.abs(h) % variants.length]!;
}

/** Short cost line for meta + FAQ; avoids inventing numbers not in the row. */
export function formatCostSnippetForSeo(college: CollegeDetail): string | null {
  const range = college.tuition_range?.trim();
  if (range) {
    const short = range.split(/\s*-\s*/)[0]?.trim() || range;
    return short.length > 48 ? `${short.slice(0, 45)}…` : short;
  }
  if (college.avg_price != null && !Number.isNaN(college.avg_price)) {
    return `about $${Math.round(college.avg_price).toLocaleString()} average price signal`;
  }
  return null;
}
