/** Shared breach types + logo helpers (safe for client components). */

/** Local hosted logos under /public/images/breaches */
export const LOCAL_BREACH_LOGOS: Record<string, string> = {
  "chess-com-2026": "/images/breaches/chess-com.png",
  "microsoft-2026": "/images/breaches/microsoft.png",
  "frontier-airlines-2026": "/images/breaches/frontier.png",
  "virta-health-2026": "/images/breaches/virta-health.png",
  "payup-2026": "/images/breaches/payup.png",
  "arizona-state-university-asu-2026": "/images/breaches/asu-white.png",
  "vimeo-2026": "/images/breaches/vimeo.png",
  "udemy-2026": "/images/breaches/udemy.png",
  "restaurant-depot-2026": "/images/breaches/restaurant-depot.png",
  "carhartt-2026": "/images/breaches/carhartt.png",
  "uber-freight-2026": "/images/breaches/uber-freight.png",
  "allstate-2026": "/images/breaches/allstate.png",
  "bonava-2026": "/images/breaches/bonava.png",
};

export function resolveBreachLogoUrl(slug: string, logoUrl: string | null) {
  return LOCAL_BREACH_LOGOS[slug] ?? (logoUrl?.startsWith("/") ? logoUrl : logoUrl) ?? null;
}

/** Tile colors matched to each logo’s real background / brand field. */
export const BREACH_LOGO_BG: Record<string, string> = {
  "chess-com-2026": "#000000",
  "microsoft-2026": "#FFFFFF",
  "frontier-airlines-2026": "#FFFFFF",
  "virta-health-2026": "#0057FF",
  "payup-2026": "#121212",
  "arizona-state-university-asu-2026": "#FFFFFF",
  "vimeo-2026": "#1AB7EA",
  "udemy-2026": "#A435F0",
  "restaurant-depot-2026": "#FFFFFF",
  "carhartt-2026": "#000000",
  "uber-freight-2026": "#000000",
  "allstate-2026": "#0033A0",
  "bonava-2026": "#FFFFFF",
};

export function resolveBreachLogoBg(slug: string, logoBg: string | null) {
  return BREACH_LOGO_BG[slug] ?? logoBg ?? "#111827";
}

export type RecentBreach = {
  id: string;
  slug: string;
  organization: string;
  logo_url: string | null;
  logo_bg: string;
  rows_label: string;
  rows_count: number | null;
  breach_date: string | null;
  added_at: string | null;
  summary: string | null;
  what_happened: string | null;
  data_exposed: string | null;
  eligibility: string | null;
  disclaimer: string | null;
  sort_order: number;
};
