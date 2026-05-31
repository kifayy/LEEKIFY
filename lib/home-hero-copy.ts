/** Shared home hero copy — mobile and desktop. */

export const HOME_HERO_HEADLINE = "Find Your";

export const HOME_HERO_BULLETS = [
  "Dream School",
  "Future Job",
  "Archetype",
  "Next Path",
] as const;

export const HOME_HERO_SUBTEXT =
  "The student archetype quiz, backed by data from 2,000+ campuses.";

export const HOME_HERO_CTA_LABEL = "Find My Matches";

/** Desktop hero subtitle (unchanged from original desktop layout). */
export const DESKTOP_HERO_SUBTITLE =
  "Use real student data to find the school and future that fits you best.";

/** @deprecated Use DESKTOP_HERO_SUBTITLE on desktop, HOME_HERO_SUBTEXT on mobile */
export const HOME_HERO_SUBTITLE = DESKTOP_HERO_SUBTITLE;

/** @deprecated Use HOME_HERO_* — kept for existing mobile imports */
export const MOBILE_HERO_HEADLINE = HOME_HERO_HEADLINE;
export const MOBILE_HERO_BULLETS = HOME_HERO_BULLETS;
export const MOBILE_HERO_SUBTEXT = HOME_HERO_SUBTEXT;
export const MOBILE_HERO_CTA_LABEL = HOME_HERO_CTA_LABEL;
