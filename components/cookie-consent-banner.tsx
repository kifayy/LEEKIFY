"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

import {
  COOKIE_PREFERENCES_OPEN_EVENT,
  getCookieConsent,
  hasConsentDecision,
  setCookieConsent,
} from "@/lib/cookie-consent";
import { cn } from "@/lib/utils";

type PreferenceState = {
  analytics: boolean;
  marketing: boolean;
};

function Toggle({
  checked,
  onChange,
  label,
  description,
  disabled = false,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
  description: string;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-gray-100 bg-gray-50/80 px-3 py-3">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-[#181A1D]">{label}</p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          "relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition",
          disabled ? "cursor-not-allowed bg-gray-200" : checked ? "bg-[#956EFE]" : "bg-gray-300",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition",
            checked ? "left-[1.375rem]" : "left-0.5",
          )}
        />
      </button>
    </div>
  );
}

const btnSecondary =
  "rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-[#181A1D] transition hover:bg-gray-50 sm:text-sm";
const btnPrimary =
  "rounded-full bg-[#956EFE] px-4 py-2 text-xs font-semibold text-white transition hover:opacity-95 sm:text-sm";

export function CookieConsentBanner() {
  const [show, setShow] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [preferences, setPreferences] = useState<PreferenceState>({
    analytics: false,
    marketing: false,
  });

  const openBanner = useCallback((expand = false) => {
    const existing = getCookieConsent();
    setPreferences({
      analytics: existing?.analytics ?? false,
      marketing: existing?.marketing ?? false,
    });
    setExpanded(expand);
    setShow(true);
  }, []);

  useEffect(() => {
    if (!hasConsentDecision()) {
      openBanner(false);
    }

    const onOpen = () => openBanner(true);
    window.addEventListener(COOKIE_PREFERENCES_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(COOKIE_PREFERENCES_OPEN_EVENT, onOpen);
  }, [openBanner]);

  const save = (next: PreferenceState) => {
    setCookieConsent(next);
    setShow(false);
  };

  const acceptAll = () => save({ analytics: true, marketing: true });
  const rejectAll = () => save({ analytics: false, marketing: false });
  const savePreferences = () => save(preferences);

  const handleManage = () => {
    if (expanded) {
      savePreferences();
      return;
    }
    setExpanded(true);
  };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      aria-modal="true"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-white shadow-[0_-4px_24px_rgba(0,0,0,0.08)]"
    >
      <div className="container mx-auto max-w-3xl px-4 py-4 sm:py-5">
        <p className="text-xs leading-relaxed text-foreground sm:text-sm">
          We use cookies and similar technologies to keep Leekify running, and understand and
          improve how students use our site. You can choose whether to allow analytics and marketing
          cookies.
        </p>

        <p className="mt-2 text-xs sm:text-sm">
          <Link href="/cookies" className="font-medium text-[#956EFE] underline hover:no-underline">
            Cookie Policy
          </Link>
          <span className="text-muted-foreground"> · </span>
          <Link href="/privacy" className="font-medium text-[#956EFE] underline hover:no-underline">
            Privacy Policy
          </Link>
        </p>

        {expanded ? (
          <div className="mt-4 space-y-3">
            <Toggle
              checked
              disabled
              onChange={() => {}}
              label="Essential cookies"
              description="Required for security, session management, and core site features. Always active."
            />
            <Toggle
              checked={preferences.analytics}
              onChange={(analytics) => setPreferences((prev) => ({ ...prev, analytics }))}
              label="Analytics cookies"
              description="Google Analytics helps us understand pages visited, device type, traffic sources, and quiz usage."
            />
            <Toggle
              checked={preferences.marketing}
              onChange={(marketing) => setPreferences((prev) => ({ ...prev, marketing }))}
              label="Marketing cookies & pixels"
              description="Meta Pixel, Snapchat Pixel, TikTok Pixel, and similar tools for ad measurement, conversion tracking, and retargeting."
            />
          </div>
        ) : null}

        <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:flex-wrap sm:items-center">
          <button type="button" onClick={handleManage} className={btnSecondary}>
            Manage preferences
          </button>
          <button type="button" onClick={rejectAll} className={btnSecondary}>
            Reject non-essential
          </button>
          <button type="button" onClick={acceptAll} className={btnPrimary}>
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
