/**
 * Hero / admission-pill logos with a tile background that matches each mark’s
 * primary brand color (so transparent assets read clearly — not white).
 */
export const HERO_COLLEGE_LOGO_ENTRIES = [
  {
    src: "https://storage.googleapis.com/images_592/EieCC2-WAAExIcV.png",
    tileBgClass: "bg-[#0021A5]",
  },
  {
    src: "https://storage.googleapis.com/images_592/4821_ucla_bruins-alternate-1996.png",
    tileBgClass: "bg-[#2774AE]",
  },
  {
    src: "https://storage.googleapis.com/images_592/USC_Trojans.webp",
    tileBgClass: "bg-[#990000]",
  },
  {
    src: "https://storage.googleapis.com/images_592/Harvard-Crest-Sticker-StickerMule-200045029.webp",
    tileBgClass: "bg-[#A41034]",
  },
  {
    src: "https://storage.googleapis.com/images_592/images%20(2).jfif",
    tileBgClass: "bg-[#1e293b]",
  },
  {
    src: "https://storage.googleapis.com/images_592/EZz208WX0AAfEXm.png",
    tileBgClass: "bg-[#003262]",
  },
  {
    src: "https://storage.googleapis.com/images_592/images%20(3).png",
    tileBgClass: "bg-[#1e3a5f]",
  },
  {
    src: "https://storage.googleapis.com/images_592/SE_sdsulogo_screenshot.jpg",
    tileBgClass: "bg-[#A6192E]",
  },
  {
    src: "https://storage.googleapis.com/images_592/University%2Bof%2BTexas%2BFeatured%2BImage.webp",
    tileBgClass: "bg-[#BF5700]",
  },
  {
    src: "https://storage.googleapis.com/images_592/images%20(4).png",
    tileBgClass: "bg-[#0f172a]",
  },
  {
    src: "https://storage.googleapis.com/images_592/getimage.jfif",
    tileBgClass: "bg-[#292524]",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Tulane_University_Logo.svg/250px-Tulane_University_Logo.svg.png",
    tileBgClass: "bg-[#006747]",
  },
] as const;

export type HeroCollegeLogoEntry = (typeof HERO_COLLEGE_LOGO_ENTRIES)[number];
export type HeroCollegeLogoSrc = HeroCollegeLogoEntry["src"];

export const HERO_COLLEGE_LOGO_URLS = HERO_COLLEGE_LOGO_ENTRIES.map(
  (e) => e.src
) as unknown as readonly HeroCollegeLogoSrc[];

const TILE_BG_BY_SRC: Record<HeroCollegeLogoSrc, string> = Object.fromEntries(
  HERO_COLLEGE_LOGO_ENTRIES.map((e) => [e.src, e.tileBgClass])
) as Record<HeroCollegeLogoSrc, string>;

/** Tailwind background class for the logo tile (brand color). */
export function heroCollegeLogoTileBgClass(src: string): string {
  return TILE_BG_BY_SRC[src as HeroCollegeLogoSrc] ?? "bg-slate-800";
}
