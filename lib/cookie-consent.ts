export const COOKIE_CONSENT_KEY = "pathpicker-cookie-preferences";
export const COOKIE_CONSENT_UPDATED_EVENT = "pathpicker-cookie-consent-updated";
export const COOKIE_PREFERENCES_OPEN_EVENT = "pathpicker-cookie-preferences-open";

export type CookieConsentPreferences = {
  analytics: boolean;
  marketing: boolean;
  decidedAt: string;
};

function parsePreferences(raw: string | null): CookieConsentPreferences | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as CookieConsentPreferences;
    if (
      typeof parsed.analytics === "boolean" &&
      typeof parsed.marketing === "boolean" &&
      typeof parsed.decidedAt === "string"
    ) {
      return parsed;
    }
  } catch {
    /* ignore malformed storage */
  }
  return null;
}

export function getCookieConsent(): CookieConsentPreferences | null {
  if (typeof window === "undefined") return null;
  return parsePreferences(localStorage.getItem(COOKIE_CONSENT_KEY));
}

export function hasConsentDecision(): boolean {
  return getCookieConsent() !== null;
}

export function hasAnalyticsConsent(): boolean {
  return getCookieConsent()?.analytics === true;
}

export function hasMarketingConsent(): boolean {
  return getCookieConsent()?.marketing === true;
}

export function setCookieConsent(preferences: Omit<CookieConsentPreferences, "decidedAt">): void {
  if (typeof window === "undefined") return;
  const payload: CookieConsentPreferences = {
    ...preferences,
    decidedAt: new Date().toISOString(),
  };
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(payload));
  localStorage.removeItem("pathpicker-cookie-consent");
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_UPDATED_EVENT, { detail: payload }));
}

export function openCookiePreferences(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(COOKIE_PREFERENCES_OPEN_EVENT));
}
