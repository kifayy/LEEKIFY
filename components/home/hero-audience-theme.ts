import { HOME_HERO_UNIVERSITY_STUDENT_ENABLED } from "@/lib/home-hero-university-student-variant";

export const HERO_PURPLE = "#956DFE";
export const HERO_PURPLE_RGB = "149, 109, 254";

/** Primary filled CTA purple (sticky quiz bar, archetype buttons). */
export const PATHPICKER_BRAND_PURPLE = "#6836D5";
export const PATHPICKER_BRAND_PURPLE_RGB = "104, 54, 213";

/** Busuu-style simplified hero gradient */
export const HERO_SIMPLIFIED_GRADIENT_START = "#4E2FFF";
export const HERO_SIMPLIFIED_GRADIENT_END = "#5F1C99";
export const HERO_SIMPLIFIED_GRADIENT = `linear-gradient(180deg, ${HERO_SIMPLIFIED_GRADIENT_START} 0%, ${HERO_SIMPLIFIED_GRADIENT_END} 100%)`;
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
