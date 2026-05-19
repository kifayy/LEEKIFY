import {
  HOME_FEATURE_BROWSE_FIT_IMAGE_URL,
} from "@/lib/home-feature-showcase-images";

/** Next/Image quality for above-the-fold hero art (default 75 is too soft on retina). */
export const HOME_HERO_IMAGE_QUALITY = 90;

/** Mobile hero portrait — primary LCP below `md` (2× export of design asset). */
export const MOBILE_HERO_PORTRAIT_URL = "/images/hero-student.webp";

/** Intrinsic size of `hero-student.webp` — keep in sync if the file is re-exported. */
export const MOBILE_HERO_PORTRAIT_WIDTH = 1280;
export const MOBILE_HERO_PORTRAIT_HEIGHT = 1872;

/** Desktop hero art — primary LCP from `md` up. */
export const DESKTOP_HERO_ART_URL = "/images/desktop-hero.webp";

/** Intrinsic size of `desktop-hero.webp` — keep in sync if the file is re-exported. */
export const DESKTOP_HERO_ART_WIDTH = 3840;
export const DESKTOP_HERO_ART_HEIGHT = 2514;

/** First above-the-fold feature mock on mobile home (scholarship showcase row 1). */
export const MOBILE_FEATURE_LCP_URL = HOME_FEATURE_BROWSE_FIT_IMAGE_URL;
