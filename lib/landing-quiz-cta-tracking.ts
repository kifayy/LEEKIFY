import { trackMetaLandingCtaToQuiz } from "@/lib/meta-pixel";
import { trackSnapchatLandingCtaToQuiz } from "@/lib/snapchat-pixel";

/** Fires landing CTA events on Meta + Snapchat before navigating to my.pathpicker.com. */
export function trackLandingCtaToQuiz(): void {
  trackSnapchatLandingCtaToQuiz();
  trackMetaLandingCtaToQuiz();
}
