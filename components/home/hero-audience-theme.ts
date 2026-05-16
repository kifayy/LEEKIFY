import { HOME_HERO_UNIVERSITY_STUDENT_ENABLED } from "@/lib/home-hero-university-student-variant";

/** Career / college-student hero theme (distinct from HS lavender). */
export const CAREER_GRADIENT =
  "linear-gradient(180deg, #0f766e 0%, rgba(13, 148, 136, 0.42) 48%, #FFFFFF 100%)";

export const HS_GRADIENT =
  "linear-gradient(180deg, #956EFE 0%, rgba(149, 110, 254, 0.45) 48%, #FFFFFF 100%)";

export function isCareerAudience(audience: "highSchool" | "college"): boolean {
  if (!HOME_HERO_UNIVERSITY_STUDENT_ENABLED) return false;
  return audience === "college";
}
