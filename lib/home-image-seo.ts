/** Descriptive `alt` text for home page images (SEO + accessibility; not visible copy). */

export const HOME_DESKTOP_HERO_ALT =
  "Leekify data breach search showing whether personal information was leaked";

export const HOME_MOBILE_HERO_BACKDROP_ALT =
  "Decorative background for Leekify breach search and monitoring hero";

export const HOME_MOBILE_HERO_STUDENT_ALT =
  "Person using Leekify to check if their email appeared in data breaches";

export const HOME_MOBILE_HERO_FIGMA_ALT = HOME_DESKTOP_HERO_ALT;

export const HOME_DESKTOP_HERO_STUDENT_ALT =
  "Leekify breach monitoring dashboard preview with exposure details";

export const HOME_HERO_MATCH_BADGE_ALT = "Leekify breach match indicator";

export const HOME_PARTNER_LOGO_ALT = "Partner logo";

export const HOME_TRUSTPILOT_ALT = "Trustpilot reviews for Leekify";

export const HOME_STAR_RATING_ALT = "Star rating";

export const HOME_TESTIMONIAL_PHOTO_ALT = (name: string) =>
  `Leekify user testimonial photo, ${name}`;

export const HOME_TESTIMONIAL_MATCH_BADGE_ALT = "Verified breach check badge";

export function collegeLogoAlt(src: string): string {
  return COLLEGE_LOGO_ALT_BY_SRC[src] ?? HOME_PARTNER_LOGO_ALT;
}

const COLLEGE_LOGO_ALT_BY_SRC: Record<string, string> = {
  "https://storage.googleapis.com/images_592/EieCC2-WAAExIcV.png": "University of Florida logo",
  "https://storage.googleapis.com/images_592/4821_ucla_bruins-alternate-1996.png": "UCLA Bruins logo",
  "https://storage.googleapis.com/images_592/USC_Trojans.webp": "USC Trojans logo",
  "https://storage.googleapis.com/images_592/Harvard-Crest-Sticker-StickerMule-200045029.webp":
    "Harvard University crest",
  "https://storage.googleapis.com/images_592/EZz208WX0AAfEXm.png": "UC Berkeley logo",
  "https://storage.googleapis.com/images_592/SE_sdsulogo_screenshot.jpg": "San Diego State University logo",
  "https://storage.googleapis.com/images_592/University%2Bof%2BTexas%2BFeatured%2BImage.webp":
    "University of Texas logo",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Tulane_University_Logo.svg/250px-Tulane_University_Logo.svg.png":
    "Tulane University logo",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Michigan_Wolverines_logo.svg/250px-Michigan_Wolverines_logo.svg.png":
    "University of Michigan logo",
};
