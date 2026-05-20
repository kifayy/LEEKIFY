import {
  HOME_FEATURE_BROWSE_FIT_IMAGE_URL,
} from "@/lib/home-feature-showcase-images";

/** Next/Image quality when the optimizer runs (remote heroes). */
export const HOME_HERO_IMAGE_QUALITY = 90;

/**
 * Local hero WebPs in `/public/images` are pre-exported at high quality — serve as-is
 * (`unoptimized`) so Next does not re-encode them at default quality.
 */
export const HOME_HERO_USE_PREOPTIMIZED_ASSETS = true;

/** Mobile hero composite — original GCS asset (no matte processing). */
export const MOBILE_HERO_FIGMA_ART_URL =
  "https://storage.googleapis.com/images_592/Group%20100000asdasd5831.png";

/** Intrinsic size of mobile hero PNG — keep in sync if the asset is re-exported. */
export const MOBILE_HERO_FIGMA_ART_WIDTH = 1268;
export const MOBILE_HERO_FIGMA_ART_HEIGHT = 1232;

/** @deprecated Legacy portrait overlay; mobile hero uses `MOBILE_HERO_FIGMA_ART_URL`. */
export const MOBILE_HERO_PORTRAIT_URL = "/images/hero-student.webp";

/** Intrinsic size of `hero-student.webp` — keep in sync if the file is re-exported. */
export const MOBILE_HERO_PORTRAIT_WIDTH = 1920;
export const MOBILE_HERO_PORTRAIT_HEIGHT = 2808;

/** Career/university mobile hero portrait (pre-exported WebP). */
export const MOBILE_HERO_CAREER_PORTRAIT_URL = "/images/hero-career.webp";

/** Intrinsic size of `hero-career.webp` — keep in sync if the file is re-exported. */
export const MOBILE_HERO_CAREER_PORTRAIT_WIDTH = 1641;
export const MOBILE_HERO_CAREER_PORTRAIT_HEIGHT = 2400;

/** Desktop hero art — primary LCP from `md` up. */
export const DESKTOP_HERO_ART_URL = "/images/desktop-hero.webp";

/** Intrinsic size of `desktop-hero.webp` — keep in sync if the file is re-exported. */
export const DESKTOP_HERO_ART_WIDTH = 3840;
export const DESKTOP_HERO_ART_HEIGHT = 2514;

/** First above-the-fold feature mock on mobile home (scholarship showcase row 1). */
export const MOBILE_FEATURE_LCP_URL = HOME_FEATURE_BROWSE_FIT_IMAGE_URL;
