import { sanitizeCollegeBanner } from "@/lib/sanitize-college-banner";
import type { College } from "@/types/college";

type CollegeHeroFields = Pick<College, "new_image_link" | "featured_image_url" | "image_url" | "banner">;

/** First usable hero/banner URL for browse cards and pickers. */
export function getCollegeHeroUrl(college: CollegeHeroFields): string | null {
  for (const u of [
    college.new_image_link,
    college.featured_image_url,
    college.image_url,
    sanitizeCollegeBanner(college.banner) ?? undefined,
  ]) {
    const t = u?.trim();
    if (t && t !== "null" && !t.toLowerCase().startsWith("null")) return t;
  }
  return null;
}
