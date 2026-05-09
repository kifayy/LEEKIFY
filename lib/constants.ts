/** Phone number for Scholarship Scanner SMS signup. */
export const SCHOLARSHIP_SCANNER_PHONE = "+18559224190";

/** Pre-filled message for SMS signup. Opens native SMS app on mobile. */
export const SCHOLARSHIP_SCANNER_SMS_BODY =
  "Yo Awarded! Can you scan tailored scholarships for me please?";

/** SMS URI: opens default SMS app with number and body pre-filled (e.g. on phone). */
export const SCHOLARSHIP_SCANNER_SMS_URL = `sms:${SCHOLARSHIP_SCANNER_PHONE}?body=${encodeURIComponent(SCHOLARSHIP_SCANNER_SMS_BODY)}`;

/** Pathpicker college match / archetype quiz (hosted on my.pathpicker.com). */
export const COLLEGE_MATCH_QUIZ_URL = "https://my.pathpicker.com/archetype";

/**
 * Beehiiv hosted signup (iframe/embed). Used as fallback when server-side
 * `BEEHIIV_API_KEY` + `BEEHIIV_PUBLICATION_ID` are not set — see `/api/newsletter/subscribe`.
 */
export const BEEHIIV_EMBED_SUBSCRIBE_URL =
  "https://subscribe-forms.beehiiv.com/22508440-48d4-4c89-845f-6e9406a7b6d2";
