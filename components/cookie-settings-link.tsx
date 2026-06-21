"use client";

import type { CSSProperties } from "react";

import { openCookiePreferences } from "@/lib/cookie-consent";

type Props = {
  className?: string;
  style?: CSSProperties;
};

export function CookieSettingsLink({ className, style }: Props) {
  return (
    <button
      type="button"
      onClick={openCookiePreferences}
      className={className}
      style={style}
    >
      Cookie Settings
    </button>
  );
}
