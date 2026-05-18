import { HOME_HERO_UNIVERSITY_STUDENT_ENABLED } from "@/lib/home-hero-university-student-variant";

export const HERO_PURPLE = "#956DFE";
export const HERO_PURPLE_RGB = "149, 109, 254";
/** Slightly darker — toggle active state on desktop */
export const HERO_PURPLE_DARK = "#8568ED";

/** Career / college-student hero theme (distinct from HS lavender). */
export const CAREER_GRADIENT =
  "linear-gradient(180deg, #0f766e 0%, rgba(13, 148, 136, 0.42) 48%, #FFFFFF 100%)";

export const HS_GRADIENT = `linear-gradient(180deg, ${HERO_PURPLE} 0%, rgba(${HERO_PURPLE_RGB}, 0.45) 48%, #FFFFFF 100%)`;

export function isCareerAudience(audience: "highSchool" | "college"): boolean {
  if (!HOME_HERO_UNIVERSITY_STUDENT_ENABLED) return false;
  return audience === "college";
}
