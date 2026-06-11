"use client";

import { useEffect, useMemo, useState } from "react";

import { useDebounce } from "@/hooks/useDebounce";
import { BROWSE_COLLEGE_COLUMNS } from "@/lib/browse-college-select";
import { getCollegeHeroUrl } from "@/lib/college-hero-url";
import { VIBE_OPTIONS } from "@/lib/directory/vibe-options";
import { escapePostgrestIlike } from "@/lib/postgrest-ilike";
import { US_STATE_ABBR_TO_NAME } from "@/lib/us-states";
import { createClient } from "@/lib/supabase/client";
import { hasEnvVars, withTimeout } from "@/lib/utils";
import type { College } from "@/types/college";

export type BrowseSuggestion =
  | { kind: "vibe"; label: string; value: string; emoji: string }
  | { kind: "college"; label: string; slug: string; location?: string | null; heroUrl?: string | null }
  | { kind: "state"; label: string; abbr: string };

const QUERY_TIMEOUT_MS = 8_000;

function matchVibes(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return VIBE_OPTIONS.filter(
    (v) => v.label.toLowerCase().includes(q) || v.value.replace(/-/g, " ").includes(q),
  ).map((v) => ({ kind: "vibe" as const, label: v.label, value: v.value, emoji: v.emoji }));
}

function matchStates(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return Object.entries(US_STATE_ABBR_TO_NAME)
    .filter(([abbr, name]) => name.toLowerCase().includes(q) || abbr.toLowerCase().includes(q))
    .slice(0, 8)
    .map(([abbr, name]) => ({ kind: "state" as const, label: name, abbr }));
}

export function useBrowseSearchSuggestions(query: string, mode: "all" | "states" | "schools" = "all") {
  const debounced = useDebounce(query, 250);
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode === "states") {
      setColleges([]);
      setLoading(false);
      return;
    }

    const trimmed = debounced.trim();
    if (trimmed.length < 2) {
      setColleges([]);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    const run = async () => {
      try {
        if (!hasEnvVars) throw new Error("Supabase not configured");
        const supabase = createClient();
        const safe = escapePostgrestIlike(trimmed);
        const { data, error } = await withTimeout(
          supabase
            .from("colleges")
            .select(BROWSE_COLLEGE_COLUMNS)
            .eq("popular", true)
            .ilike("name", `%${safe}%`)
            .limit(16),
          QUERY_TIMEOUT_MS,
          "College search timed out",
        );
        if (cancelled) return;
        if (error) throw error;
        const ranked = ((data ?? []) as College[])
          .filter((c) => (c.location ?? "").trim().length > 0)
          .sort((a, b) => a.name.length - b.name.length)
          .slice(0, 8);
        setColleges(ranked);
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
  }, [debounced, mode]);

  const trimmed = query.trim();

  const suggestions = useMemo((): BrowseSuggestion[] => {
    if (mode === "states") {
      return matchStates(query);
    }

    const collegeSuggestions: BrowseSuggestion[] = colleges.map((college) => ({
      kind: "college",
      label: college.name,
      slug: college.slug ?? college.id,
      location: college.location,
      heroUrl: getCollegeHeroUrl(college),
    }));

    if (mode === "schools") {
      return [...collegeSuggestions, ...matchStates(query)];
    }

    const vibes = matchVibes(query);
    return [...vibes, ...collegeSuggestions, ...matchStates(query)];
  }, [colleges, mode, query]);

  const vibes = suggestions.filter((s): s is Extract<BrowseSuggestion, { kind: "vibe" }> => s.kind === "vibe");
  const universitySuggestions = suggestions.filter(
    (s): s is Extract<BrowseSuggestion, { kind: "college" }> => s.kind === "college",
  );
  const locationSuggestions = suggestions.filter(
    (s): s is Extract<BrowseSuggestion, { kind: "state" }> => s.kind === "state",
  );

  const customQuery = trimmed.length > 0 ? trimmed : null;
  const hasMatches = suggestions.length > 0;

  return { vibes, universitySuggestions, locationSuggestions, customQuery, hasMatches, loading };
}
