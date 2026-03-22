import type { CSSProperties } from "react";
import { sanitizeCollegeBanner } from "@/lib/sanitize-college-banner";

/** Stock hero used widely in data; hidden on browse so results feel more distinct. */
export const BROWSE_EXCLUDED_HERO_IMAGE_URL =
  "https://storage.googleapis.com/images_592/pexels-armin-rimoldi-5553059.jpg";

export function isBrowseExcludedHeroImage(url: string | null | undefined): boolean {
  return String(url ?? "").trim() === BROWSE_EXCLUDED_HERO_IMAGE_URL;
}

/** True if any hero-sized image field for this row is the excluded stock URL (browse cards try fallbacks in order). */
export function collegeUsesBrowseExcludedHeroImage(c: {
  new_image_link?: string | null;
  featured_image_url?: string | null;
  image_url?: string | null;
  banner?: string | null;
}): boolean {
  if (isBrowseExcludedHeroImage(c.new_image_link)) return true;
  if (isBrowseExcludedHeroImage(c.featured_image_url)) return true;
  if (isBrowseExcludedHeroImage(c.image_url)) return true;
  if (isBrowseExcludedHeroImage(c.banner)) return true;
  return isBrowseExcludedHeroImage(sanitizeCollegeBanner(c.banner));
}

/** FNV-1a 32-bit — stable, fast deterministic hash for UI seeds */
function fnv1a32(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export type SchoolHeroImageVariant = {
  /** Horizontal mirror */
  flip: boolean;
  /** Uniform zoom >1 crops edges (looks like a tighter frame) */
  zoom: number;
  translateXPct: number;
  translateYPct: number;
};

/**
 * Deterministic zoom/pan per school; all heroes are mirrored horizontally.
 * CSS-only — no re-encoding; not a legal substitute for licensing.
 */
export function getSchoolHeroImageVariant(seed: string): SchoolHeroImageVariant {
  const h = fnv1a32(seed);
  const flip = true;
  const zoom = 1.08 + ((h >>> 16) % 60) / 500;
  const translateXPct = (((h >>> 4) % 11) - 5) * 0.9;
  const translateYPct = (((h >>> 12) % 11) - 5) * 0.9;
  return { flip, zoom, translateXPct, translateYPct };
}

export function schoolHeroImageStyle(seed: string): CSSProperties {
  const { flip, zoom, translateXPct, translateYPct } = getSchoolHeroImageVariant(seed);
  const sx = flip ? -zoom : zoom;
  return {
    transform: `translate(${translateXPct}%, ${translateYPct}%) scale(${sx}, ${zoom})`,
    transformOrigin: "center center",
  };
}
