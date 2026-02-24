/** Phone number for Scholarship Scanner SMS signup. */
export const SCHOLARSHIP_SCANNER_PHONE = "+18559224190";

/** Pre-filled message for SMS signup. Opens native SMS app on mobile. */
export const SCHOLARSHIP_SCANNER_SMS_BODY =
  "Yo Awarded! Can you scan tailored scholarships for me please?";

/** SMS URI: opens default SMS app with number and body pre-filled (e.g. on phone). */
export const SCHOLARSHIP_SCANNER_SMS_URL = `sms:${SCHOLARSHIP_SCANNER_PHONE}?body=${encodeURIComponent(SCHOLARSHIP_SCANNER_SMS_BODY)}`;
