import type { CollegeDetail } from "@/types/college-detail";
import { formatCostSnippetForSeo } from "@/lib/school-seo-copy";

/** Title tags: always surface PathPicker for queries like "pathpicker university of washington". */
export function buildSchoolPageTitle(college: CollegeDetail): string {
  const raw = college.meta_title?.trim();
  if (raw) {
    return /pathpicker/i.test(raw) ? raw : `${raw} | PathPicker`;
  }
  const name = college.name?.trim();
  if (!name) return "School | PathPicker";

  const rate = college.acceptance_rate;
  const hasRate = rate != null && !Number.isNaN(Number(rate));
  if (hasRate) {
    const r = Math.round(Number(rate));
    const rich = `${name}: ${r}% acceptance, admissions & costs | PathPicker`;
    if (rich.length <= 72) return rich;
  }

  const fallback = `${name}: acceptance rate, admissions chances, costs & fit | PathPicker`;
  if (fallback.length <= 72) return fallback;
  return `${name}: admissions, costs & fit | PathPicker`;
}

export function buildSchoolPageDescription(college: CollegeDetail): string {
  const meta = college.meta_description?.trim();
  if (meta) return meta;

  const name = college.name?.trim() || "This college";
  const bits: string[] = [];

  const rate = college.acceptance_rate;
  if (rate != null && !Number.isNaN(Number(rate))) {
    bits.push(`~${Math.round(Number(rate))}% acceptance`);
  }
  if (college.location?.trim()) bits.push(college.location.trim());
  const cost = formatCostSnippetForSeo(college);
  if (cost) bits.push(cost);

  const diff = (college.personality_line || college.highlights?.[0] || college.description || "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 72);

  let core: string;
  if (bits.length >= 2 || (bits.length === 1 && diff)) {
    core = `${name}: ${bits.slice(0, 3).join(" · ")}${diff ? `. ${diff}` : ""}. See odds, costs, and vibe on PathPicker.`;
  } else if (diff) {
    core = `${name} on PathPicker — ${diff}. Explore admission chances, costs, campus vibe, and fit.`;
  } else {
    core = `Explore ${name} on PathPicker: admission chances, costs, campus vibe, student fit, and similar schools.`;
  }

  return core.length > 160 ? `${core.slice(0, 157)}…` : core;
}

export function buildSchoolPageKeywords(college: CollegeDetail): string[] | undefined {
  if (college.keywords?.length) return college.keywords;
  const name = college.name?.trim();
  if (!name) return ["PathPicker", "college fit"];

  const parts = [
    name,
    `${name} acceptance rate`,
    `${name} admissions`,
    `chance of admission ${name}`,
    `odds of getting into ${name}`,
    `${name} tuition`,
    `${name} financial aid`,
    `${name} campus life`,
    college.location?.trim(),
    "PathPicker",
    "Pathpicker",
    "college fit",
  ].filter(Boolean) as string[];

  return [...new Set(parts)];
}
