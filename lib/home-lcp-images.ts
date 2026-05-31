/** Next/Image quality when the optimizer runs (remote heroes). */
export const HOME_HERO_IMAGE_QUALITY = 90;

/**
 * Local hero WebPs in `/public/images` are pre-exported at high quality — serve as-is
 * (`unoptimized`) so Next does not re-encode them at default quality.
 */
export const HOME_HERO_USE_PREOPTIMIZED_ASSETS = true;

/** Mobile + desktop hero illustration (`public/assets/Grouasdasdp 10.png`). */
export const MOBILE_HERO_FIGMA_ART_URL = "/assets/Grouasdasdp%2010.png";

/** Intrinsic size of hero PNG — keep in sync if the asset is re-exported. */
export const MOBILE_HERO_FIGMA_ART_WIDTH = 2244;
export const MOBILE_HERO_FIGMA_ART_HEIGHT = 2224;

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
export const DESKTOP_HERO_ART_URL = MOBILE_HERO_FIGMA_ART_URL;

/** Intrinsic size of hero PNG — keep in sync if the file is re-exported. */
export const DESKTOP_HERO_ART_WIDTH = MOBILE_HERO_FIGMA_ART_WIDTH;
export const DESKTOP_HERO_ART_HEIGHT = MOBILE_HERO_FIGMA_ART_HEIGHT;

