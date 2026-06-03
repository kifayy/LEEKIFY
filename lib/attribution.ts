import { COLLEGE_MATCH_QUIZ_URL } from "@/lib/constants";

export const ATTRIBUTION_STORAGE_KEY = "pathpicker_attribution";

/** Query params captured on pathpicker.com and forwarded to my.pathpicker.com. */
export const ATTRIBUTION_PARAM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "ScCid",
  "sc_cid",
] as const;

export type AttributionParamKey = (typeof ATTRIBUTION_PARAM_KEYS)[number];
export type AttributionParams = Partial<Record<AttributionParamKey, string>>;

export const QUIZ_REF_PARAM = "ref";
export const QUIZ_REF_VALUE = "pathpicker_landing";

type SearchParamsLike = Pick<URLSearchParams, "get">;

export function parseAttributionFromSearchParams(
  searchParams: SearchParamsLike | string,
): AttributionParams {
  const params =
    typeof searchParams === "string"
      ? new URLSearchParams(searchParams.startsWith("?") ? searchParams.slice(1) : searchParams)
      : searchParams;

  const result: AttributionParams = {};
  for (const key of ATTRIBUTION_PARAM_KEYS) {
    const value = params.get(key);
    if (value) result[key] = value;
  }
  return result;
}

export function getStoredAttribution(): AttributionParams {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as AttributionParams;
  } catch {
    return {};
  }
}

/** First-touch: keep the earliest value for each param in the session. */
export function storeAttribution(incoming: AttributionParams): void {
  if (typeof window === "undefined" || Object.keys(incoming).length === 0) return;

  try {
    const existing = getStoredAttribution();
    const merged: AttributionParams = { ...existing };
    for (const [key, value] of Object.entries(incoming)) {
      const paramKey = key as AttributionParamKey;
      if (merged[paramKey] === undefined) merged[paramKey] = value;
    }
    sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(merged));
  } catch {
    // Ignore storage failures (private mode, quota, etc.).
  }
}

export function captureAttributionFromSearchParams(searchParams: SearchParamsLike): void {
  storeAttribution(parseAttributionFromSearchParams(searchParams));
}

export function buildQuizUrlWithAttribution(
  baseUrl: string,
  attribution: AttributionParams = {},
): string {
  const url = new URL(baseUrl);
  for (const [key, value] of Object.entries(attribution)) {
    if (value) url.searchParams.set(key, value);
  }
  url.searchParams.set(QUIZ_REF_PARAM, QUIZ_REF_VALUE);
  return url.toString();
}

export function buildCollegeMatchQuizUrl(
  attribution: AttributionParams = getStoredAttribution(),
): string {
  return buildQuizUrlWithAttribution(COLLEGE_MATCH_QUIZ_URL, attribution);
}

export function isCollegeMatchQuizUrl(href: string): boolean {
  return href === COLLEGE_MATCH_QUIZ_URL || href.startsWith(`${COLLEGE_MATCH_QUIZ_URL}?`);
}
