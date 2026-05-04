import type { CollegeDetail } from "@/types/college-detail";

/** Title tags: always surface PathPicker for queries like "pathpicker university of washington". */
export function buildSchoolPageTitle(college: CollegeDetail): string {
  const raw = college.meta_title?.trim();
  if (raw) {
    return /pathpicker/i.test(raw) ? raw : `${raw} | PathPicker`;
  }
  if (college.name?.trim()) return `${college.name.trim()} | PathPicker`;
  return "School | PathPicker";
}

export function buildSchoolPageDescription(college: CollegeDetail): string {
  const meta = college.meta_description?.trim();
  if (meta) return meta;

  const name = college.name?.trim() || "This college";
  const snippet = (college.personality_line || college.description || "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 110);

  if (snippet) {
    const core = `${name} on PathPicker — ${snippet}`;
    return core.length > 160 ? `${core.slice(0, 157)}…` : core;
  }

  return `Explore ${name} on PathPicker: campus vibe, student fit, and similar schools.`;
}

export function buildSchoolPageKeywords(college: CollegeDetail): string[] | undefined {
  if (college.keywords?.length) return college.keywords;
  const parts = [
    college.name?.trim(),
    college.location?.trim(),
    "PathPicker",
    "Pathpicker",
    "college",
    "college fit",
  ].filter(Boolean) as string[];
  return [...new Set(parts)];
}
