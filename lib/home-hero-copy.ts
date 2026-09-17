/** Shared home hero copy — mobile and desktop. */

export const HOME_HERO_HEADLINE = "Was Your";

export const HOME_HERO_BULLETS = [
  "Email Leaked?",
  "Phone Exposed?",
  "Data at Risk?",
] as const;

export const HOME_HERO_SUBTEXT =
  "Search known data breaches to see where your personal information was leaked—and what to do about it.";

export const HOME_HERO_CTA_LABEL = "Check for Leaks";

/** Desktop hero subtitle (unchanged from original desktop layout). */
export const DESKTOP_HERO_SUBTITLE =
  "Data breach intelligence that shows where your information was leaked and helps you monitor it going forward.";

/** @deprecated Use DESKTOP_HERO_SUBTITLE on desktop, HOME_HERO_SUBTEXT on mobile */
export const HOME_HERO_SUBTITLE = DESKTOP_HERO_SUBTITLE;

/** @deprecated Use HOME_HERO_* — kept for existing mobile imports */
export const MOBILE_HERO_HEADLINE = HOME_HERO_HEADLINE;
export const MOBILE_HERO_BULLETS = HOME_HERO_BULLETS;
export const MOBILE_HERO_SUBTEXT = HOME_HERO_SUBTEXT;
export const MOBILE_HERO_CTA_LABEL = HOME_HERO_CTA_LABEL;
