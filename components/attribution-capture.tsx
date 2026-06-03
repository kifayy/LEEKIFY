"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { captureAttributionFromSearchParams } from "@/lib/attribution";

/** Persists landing UTMs (e.g. Snapchat) for forwarding to my.pathpicker.com quiz links. */
export function AttributionCapture() {
  const searchParams = useSearchParams();

  useEffect(() => {
    captureAttributionFromSearchParams(searchParams);
  }, [searchParams]);

  return null;
}
