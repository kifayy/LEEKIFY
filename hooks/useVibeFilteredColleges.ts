"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import type { College } from "@/types/college";
import { exploreCollegeMatchesVibe } from "@/lib/explore-vibe-match";
import { orderCollegesForBrowse } from "@/lib/order-colleges-for-browse";
import { collegeUsesBrowseExcludedHeroImage } from "@/lib/school-hero-image-variant";

const BROWSE_FETCH_LIMIT = 5000;

/**
 * When exactly two browse vibes are selected, loads a search-filtered college pool and
 * keeps rows with `school_emoji` + `personality_line` that match **either** vibe (OR),
 * using tags, personality/description text, and a party-school name hint list — same idea as
 * the dashboard Explore hook on the sister app.
 */
export function useVibeFilteredColleges(selectedVibes: string[], debouncedSearch: string): {
  colleges: College[];
  loading: boolean;
  error: string | null;
} {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const shuffleSeedRef = useRef(Math.random());

  const v0 = selectedVibes[0];
  const v1 = selectedVibes[1];

  useEffect(() => {
    if (selectedVibes.length !== 2 || !v0 || !v1) {
      setColleges([]);
      setLoading(false);
      setError(null);
      return;
    }

    const ac = new AbortController();

    const run = async () => {
      setLoading(true);
      setError(null);
      shuffleSeedRef.current = Math.random();

      try {
        const supabase = createClient();
        let query = supabase.from("colleges").select("*").limit(BROWSE_FETCH_LIMIT);

        if (debouncedSearch.trim()) {
          const safe = debouncedSearch.trim().replace(/\\/g, "\\\\").replace(/%/g, "\\%");
          query = query.or(`name.ilike.%${safe}%,location.ilike.%${safe}%,description.ilike.%${safe}%`);
        }

        const { data, error: qErr } = await query;
        if (ac.signal.aborted) return;
        if (qErr) throw qErr;

        const raw = (data || []) as College[];
        const withRich = raw.filter((c) => {
          const emoji = String(c.school_emoji ?? "").trim();
          const pl = String(c.personality_line ?? "").trim();
          return emoji.length > 0 && pl.length > 0;
        });

        const filtered = withRich.filter(
          (c) =>
            (exploreCollegeMatchesVibe(c, v0) || exploreCollegeMatchesVibe(c, v1)) &&
            !collegeUsesBrowseExcludedHeroImage(c),
        );

        const ordered = orderCollegesForBrowse(filtered, shuffleSeedRef.current);
        if (ac.signal.aborted) return;
        setColleges(ordered);
      } catch (e) {
        if (ac.signal.aborted) return;
        console.error(e);
        setError("Failed to load colleges. Please try again.");
        setColleges([]);
      } finally {
        if (!ac.signal.aborted) setLoading(false);
      }
    };

    void run();
    return () => ac.abort();
  }, [debouncedSearch, selectedVibes.length, v0, v1]);

  return { colleges, loading, error };
}
