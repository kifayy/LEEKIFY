/** Descriptive `alt` text for home page images (SEO + accessibility; not visible copy). */

export const HOME_DESKTOP_HERO_ALT =
  "PathPicker hero illustration for students exploring college and career paths";

export const HOME_MOBILE_HERO_BACKDROP_ALT =
  "Decorative background for PathPicker student archetype and college match hero";

export const HOME_MOBILE_HERO_STUDENT_ALT =
  "Student using PathPicker to explore college match and archetype results";

export const HOME_DESKTOP_HERO_STUDENT_ALT =
  "PathPicker college match dashboard preview with student archetype insights";

export const HOME_HERO_MATCH_BADGE_ALT = "PathPicker college match percentage badge";

export const HOME_PARTNER_LOGO_ALT = "University partner logo";

export const HOME_TRUSTPILOT_ALT = "Trustpilot reviews for PathPicker";

export const HOME_STAR_RATING_ALT = "Star rating";

export const HOME_TESTIMONIAL_PHOTO_ALT = (studentName: string) =>
  `PathPicker student testimonial photo, ${studentName}`;

export const HOME_TESTIMONIAL_MATCH_BADGE_ALT = "Top college match badge";

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
