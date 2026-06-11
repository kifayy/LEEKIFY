"use client";

import { useEffect, useState } from "react";

import { resolvePopularBrowsePickerColleges } from "@/lib/browse-default-colleges";
import { BROWSE_COLLEGE_COLUMNS } from "@/lib/browse-college-select";
import { collegeUsesBrowseExcludedHeroImage } from "@/lib/school-hero-image-variant";
import { createClient } from "@/lib/supabase/client";
import { hasEnvVars, withTimeout } from "@/lib/utils";
import type { College } from "@/types/college";

const QUERY_TIMEOUT_MS = 8_000;

export function useBrowsePopularColleges(enabled: boolean) {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;
    setLoading(true);

    const run = async () => {
      try {
        if (!hasEnvVars) throw new Error("Supabase not configured");
        const supabase = createClient();
        const { data, error } = await withTimeout(
          supabase
            .from("colleges")
            .select(BROWSE_COLLEGE_COLUMNS)
            .eq("popular", true)
            .limit(120),
          QUERY_TIMEOUT_MS,
          "Popular colleges timed out",
        );
        if (cancelled) return;
        if (error) throw error;
        const list = ((data ?? []) as College[]).filter((c) => !collegeUsesBrowseExcludedHeroImage(c));
        const curated = resolvePopularBrowsePickerColleges(list);
        setColleges(curated);
      } catch {
        if (!cancelled) setColleges([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [enabled]);

  return { colleges, loading };
}
