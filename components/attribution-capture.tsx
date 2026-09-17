"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { captureAttributionFromSearchParams } from "@/lib/attribution";

/** Persists landing UTMs (Facebook, Snapchat, etc.) for conversion tracking. */
export function AttributionCapture() {
  const searchParams = useSearchParams();

  useEffect(() => {
    captureAttributionFromSearchParams(searchParams);
  }, [searchParams]);

  return null;
}
