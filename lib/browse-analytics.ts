declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export type BrowseAnalyticsEvent =
  | { type: "discover_submit"; source: string; query?: string; vibes?: string[] }
  | { type: "browse_filter"; search?: string; vibes?: string[] }
  | { type: "school_card_click"; schoolSlug: string; context: string };

function sendGtag(event: BrowseAnalyticsEvent) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", event.type, {
    event_category: "browse",
    ...event,
  });
}

export function trackBrowseEvent(event: BrowseAnalyticsEvent) {
  sendGtag(event);
  void fetch("/api/browse/log", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
    keepalive: true,
  }).catch(() => {});
}
