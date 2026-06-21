import { hasMarketingConsent } from "@/lib/cookie-consent";
import { trackMetaLandingCtaToQuiz } from "@/lib/meta-pixel";
import { trackSnapchatLandingCtaToQuiz } from "@/lib/snapchat-pixel";
import { trackTikTokLandingCtaToQuiz } from "@/lib/tiktok-pixel";

/** Fires landing CTA events on Meta, Snapchat, and TikTok before navigating to my.pathpicker.com. */
export function trackLandingCtaToQuiz(): void {
  if (!hasMarketingConsent()) return;
  trackSnapchatLandingCtaToQuiz();
  trackMetaLandingCtaToQuiz();
  trackTikTokLandingCtaToQuiz();
}
