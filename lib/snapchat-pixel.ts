/** Snapchat Pixel — pathpicker.com landing (quiz events live on my.pathpicker.com). */
export const SNAPCHAT_PIXEL_ID = "f3f75710-b8de-4609-9122-53af67c550e5";

declare global {
  interface Window {
    snaptr?: (...args: unknown[]) => void;
  }
}

/** Fires before navigation to my.pathpicker.com quiz (CUSTOM_EVENT_2 on landing only). */
export function trackLandingCtaToQuiz(): void {
  if (typeof window === "undefined") return;
  window.snaptr?.("track", "CUSTOM_EVENT_2", {
    description: "landing_cta_to_quiz",
  });
}
