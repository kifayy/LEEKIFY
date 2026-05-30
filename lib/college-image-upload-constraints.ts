/**
 * Constraints for college hero uploads (my.pathpicker.com dashboard).
 * Import this module in the upload pipeline to reject oversized originals before GCS write.
 */

/** Max width/height in pixels after resize. */
export const COLLEGE_HERO_MAX_DIMENSION_PX = 1200;

/** Target file size after compression (soft warn above max). */
export const COLLEGE_HERO_TARGET_SIZE_KB = 150;

/** Hard reject above this size (KB). */
export const COLLEGE_HERO_MAX_SIZE_KB = 512;

/** JPEG/WebP quality for lossy encode (0–100). */
export const COLLEGE_HERO_ENCODE_QUALITY = 80;

export type CollegeHeroValidationResult =
  | { ok: true }
  | { ok: false; reason: string };

/** Validate byte size before upload (call after client-side resize when possible). */
export function validateCollegeHeroFileSize(bytes: number): CollegeHeroValidationResult {
  const kb = bytes / 1024;
  if (kb > COLLEGE_HERO_MAX_SIZE_KB) {
    return {
      ok: false,
      reason: `Image is ${Math.round(kb)} KB; max is ${COLLEGE_HERO_MAX_SIZE_KB} KB. Resize to ${COLLEGE_HERO_MAX_DIMENSION_PX}px wide and quality ~${COLLEGE_HERO_ENCODE_QUALITY}.`,
    };
  }
  return { ok: true };
}

/**
 * Example sharp pipeline for my.pathpicker.com (Node):
 *
 * ```ts
 * import sharp from "sharp";
 * import { COLLEGE_HERO_MAX_DIMENSION_PX, COLLEGE_HERO_ENCODE_QUALITY, validateCollegeHeroFileSize } from "./college-image-upload-constraints";
 *
 * export async function prepareCollegeHero(buffer: Buffer): Promise<Buffer> {
 *   const out = await sharp(buffer)
 *     .rotate()
 *     .resize({ width: COLLEGE_HERO_MAX_DIMENSION_PX, height: COLLEGE_HERO_MAX_DIMENSION_PX, fit: "inside", withoutEnlargement: true })
 *     .webp({ quality: COLLEGE_HERO_ENCODE_QUALITY })
 *     .toBuffer();
 *   const check = validateCollegeHeroFileSize(out.length);
 *   if (!check.ok) throw new Error(check.reason);
 *   return out;
 * }
 * ```
 */
