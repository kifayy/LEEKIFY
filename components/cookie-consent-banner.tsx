"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const CONSENT_KEY = "pathpicker-cookie-consent";

export function CookieConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const accepted = localStorage.getItem(CONSENT_KEY);
    if (!accepted) setShow(true);
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie notice"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-black/10 bg-white px-3 py-2.5 shadow-[0_-2px_12px_rgba(0,0,0,0.06)]"
    >
      <div className="container mx-auto flex max-w-4xl flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <p className="text-xs text-foreground">
          We use cookies to improve the site and understand how students use our
          quizzes. By continuing, you agree to our use of cookies.{" "}
          <Link
            href="/privacy"
            className="font-medium text-[#956EFE] underline hover:no-underline"
          >
            Privacy Policy
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={accept}
          className="shrink-0 rounded-full bg-[#956EFE] px-4 py-1.5 text-xs font-medium text-white shadow-[0_1px_4px_rgba(149,110,254,0.2)] transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-[#956EFE] focus:ring-offset-2"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
