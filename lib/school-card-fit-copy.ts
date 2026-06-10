/** Plain-language fit lines and stat bands for directory SchoolCard. */

import { VIBE_LABEL_BY_VALUE } from "@/lib/directory/vibe-options";

export function formatAcceptanceBand(rate?: number | null): string | null {
  if (rate == null || Number.isNaN(rate)) return null;
  const pct = rate <= 1 ? rate * 100 : rate;
  if (pct >= 50) return "More accessible admissions";
  if (pct >= 25) return "Moderately selective";
  if (pct >= 10) return "Selective";
  return "Highly selective";
}

export function formatCostBand(tuitionRange?: string | null): string | null {
  if (!tuitionRange?.trim()) return null;
  const t = tuitionRange.toLowerCase();
  if (t.includes("under") || t.includes("<")) return "Lower cost band";
  if (t.includes("mid") || t.includes("moderate")) return "Mid-range cost";
  if (t.includes("high") || t.includes("over") || t.includes(">")) return "Higher cost band";
  return tuitionRange.trim();
}

export function buildSchoolCardFitReason(input: {
  selectedVibes?: string[];
  vibeTags?: string[];
  location?: string;
  acceptanceRate?: number | null;
}): string | null {
  const tags = input.vibeTags ?? [];
  const selected = input.selectedVibes ?? [];
  const overlap = selected.filter((v) => tags.includes(v));
  if (overlap.length > 0) {
    const labels = overlap.slice(0, 2).map((v) => VIBE_LABEL_BY_VALUE[v] ?? v);
    return `Strong ${labels.join(" + ")} campus fit`;
  }
  if (tags.length > 0) {
    const label = VIBE_LABEL_BY_VALUE[tags[0]!] ?? tags[0];
    return `Known for ${label?.toLowerCase()} campus culture`;
  }
  const band = formatAcceptanceBand(input.acceptanceRate);
  if (band) return band;
  if (input.location) return `Located in ${input.location.split(",")[0]?.trim()}`;
  return null;
}

export function buildSchoolCardStatLine(input: {
  acceptanceRate?: number | null;
  tuitionRange?: string | null;
}): string | null {
  const parts: string[] = [];
  const acceptance = formatAcceptanceBand(input.acceptanceRate);
  const cost = formatCostBand(input.tuitionRange);
  if (acceptance) parts.push(acceptance);
  if (cost) parts.push(cost);
  return parts.length ? parts.join(" · ") : null;
}
