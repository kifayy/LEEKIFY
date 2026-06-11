"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/useDebounce";
import { useVibeFilteredColleges } from "@/hooks/useVibeFilteredColleges";
import { createClient } from "@/lib/supabase/client";
import type { College } from "@/types/college";
import { BrowseMobileSearchCard } from "@/components/browse/browse-mobile-search-card";
import { SchoolGrid } from "@/components/directory/SchoolGrid";
import { VibeMixer } from "@/components/directory/VibeMixer";
import { Lock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useCareerPersonalityStatus } from "@/hooks/useCareerPersonalityStatus";
import { collegeUsesBrowseExcludedHeroImage } from "@/lib/school-hero-image-variant";
import {
  getInitialUnfilteredBrowseColleges,
  orderUnfilteredBrowseRest,
  resolveDefaultBrowseColleges,
} from "@/lib/browse-default-colleges";
import { orderCollegesForBrowse } from "@/lib/order-colleges-for-browse";
import { collegeSearchOrFilter } from "@/lib/postgrest-ilike";
import { VIBE_OPTIONS } from "@/lib/directory/vibe-options";
import { trackBrowseEvent } from "@/lib/browse-analytics";
import { hasEnvVars, withTimeout } from "@/lib/utils";
import { BROWSE_COLLEGE_COLUMNS, BROWSE_FETCH_LIMIT } from "@/lib/browse-college-select";
import { BROWSE_DEV_PATH, BROWSE_PUBLIC_PATH } from "@/lib/browse-routes";

const COLLEGES_PER_PAGE = 20;

const COLLEGES_QUERY_TIMEOUT_MS = 45_000;

export type DirectoryUrlSync =
  | { mode: "browse" }
  | { mode: "landing"; basePath: string }
  | { mode: "none" };

const vibeOptions = [...VIBE_OPTIONS];

type DirectoryProps = {
  initialColleges?: College[];
  /** Pre-selected vibes (SEO landing pages); URL `vibes` overrides when present. */
  defaultVibes?: string[];
  /** Pre-filled search (discover pages); URL `search` overrides when present. */
  defaultSearch?: string;
  urlSync?: DirectoryUrlSync;
  /** Hide vibe mixer UI (e.g. after vibe-mix hatch game on dev browse). */
  showVibeMixer?: boolean;
};

export function Directory({
  initialColleges = [],
  defaultVibes,
  defaultSearch,
  urlSync = { mode: "browse" },
  showVibeMixer = true,
}: DirectoryProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const { hasCompletedCareerQuiz } = useCareerPersonalityStatus();

  const initialSearchTerm = searchParams.get("search") || defaultSearch || "";
  const vibesFromUrl = searchParams.get("vibes")?.split(",").filter(Boolean) || [];
  const initialVibes =
    vibesFromUrl.length > 0 ? vibesFromUrl : defaultVibes?.length ? [...defaultVibes] : [];

  const seededBrowse =
    initialVibes.length === 0 && !initialSearchTerm.trim()
      ? getInitialUnfilteredBrowseColleges(initialColleges)
      : { colleges: [] as College[], hasMore: true };

  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [colleges, setColleges] = useState<College[]>(seededBrowse.colleges);
  const [selectedVibes, setSelectedVibes] = useState<string[]>(initialVibes);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMoreColleges, setHasMoreColleges] = useState(seededBrowse.hasMore);
  const [resultsRevealToken, setResultsRevealToken] = useState(0);

  const mobileResultsRef = useRef<HTMLDivElement>(null);
  const pendingResultsScrollRef = useRef(false);

  const vibeFilterResult = useVibeFilteredColleges(selectedVibes, debouncedSearchTerm);

  const scrollToMobileResults = useCallback(() => {
    const el = mobileResultsRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY + 12;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  const handleMobileSearchComplete = useCallback(() => {
    setResultsRevealToken((t) => t + 1);
    pendingResultsScrollRef.current = true;
  }, []);

  useEffect(() => {
    if (!pendingResultsScrollRef.current) return;

    const twoVibeMode = selectedVibes.length === 2;
    const resultsLoading = twoVibeMode ? vibeFilterResult.loading : loading;
    if (resultsLoading) return;

    pendingResultsScrollRef.current = false;
    const t = window.setTimeout(scrollToMobileResults, 120);
    return () => window.clearTimeout(t);
  }, [
    resultsRevealToken,
    loading,
    vibeFilterResult.loading,
    selectedVibes.length,
    scrollToMobileResults,
  ]);

  const selectedVibesKey = useMemo(() => [...selectedVibes].sort().join(","), [selectedVibes]);

  /** Last URL query we applied to state — avoids pushing stale vibes/search back after dev pills. */
  const appliedUrlKeyRef = useRef<string | null>(null);

  const filtersKeyRef = useRef("");
  const shuffleSeedRef = useRef(0);
  const fetchGenerationRef = useRef(0);
  const initialCollegesRef = useRef(initialColleges);
  initialCollegesRef.current = initialColleges;

  const applyBrowseSlice = (list: College[], seed: number, pageForSlice: number) => {
    const featured = resolveDefaultBrowseColleges(list);
    const rest = orderUnfilteredBrowseRest(list, seed);

    if (pageForSlice === 0) {
      setColleges(featured);
      setHasMoreColleges(rest.length > 0);
      return;
    }

    const restPage = pageForSlice - 1;
    const from = restPage * COLLEGES_PER_PAGE;
    const slice = rest.slice(from, from + COLLEGES_PER_PAGE);
    const more = from + COLLEGES_PER_PAGE < rest.length;
    setColleges((prev) => [...prev, ...slice]);
    setHasMoreColleges(more);
  };

  const canUseInitialColleges = (search: string, vibes: string[]) =>
    initialCollegesRef.current.length > 0 && !search.trim() && vibes.length === 0;

  useEffect(() => {
    const ac = new AbortController();
    const gen = ++fetchGenerationRef.current;
    const fk = `${debouncedSearchTerm}|${selectedVibesKey}`;
    const filtersChanged = filtersKeyRef.current !== fk;
    const pageForSlice = filtersChanged ? 0 : currentPage;

    if (filtersChanged) {
      filtersKeyRef.current = fk;
      shuffleSeedRef.current = Math.random();
      setCurrentPage(0);
      setHasMoreColleges(true);
    }

    const run = async () => {
      /* Two-vibe Explore list uses `useVibeFilteredColleges` in Directory — skip this fetch. */
      if (selectedVibes.length === 2) {
        if (!ac.signal.aborted && gen === fetchGenerationRef.current) {
          setColleges([]);
          setHasMoreColleges(false);
          setLoading(false);
          setError(null);
        }
        return;
      }

      if (canUseInitialColleges(debouncedSearchTerm, selectedVibes)) {
        if (!ac.signal.aborted && gen === fetchGenerationRef.current) {
          applyBrowseSlice(initialCollegesRef.current, shuffleSeedRef.current, pageForSlice);
          setLoading(false);
          setError(null);
        }
        return;
      }

      setLoading(true);
      setError(null);
      const seed = shuffleSeedRef.current;

      try {
        if (!hasEnvVars) throw new Error("Supabase URL or key missing");
        const supabase = createClient();

        let query = supabase.from("colleges").select(BROWSE_COLLEGE_COLUMNS, { count: "exact" }).limit(BROWSE_FETCH_LIMIT);

        if (debouncedSearchTerm.trim()) {
          query = query.or(collegeSearchOrFilter(debouncedSearchTerm));
        }

        const { data, error: qErr } = await withTimeout(
          query,
          COLLEGES_QUERY_TIMEOUT_MS,
          "Loading colleges timed out",
        );
        if (ac.signal.aborted || gen !== fetchGenerationRef.current) return;
        if (qErr) throw qErr;

        let list: College[] = [...(data || [])];
        list = list.filter((c) => !collegeUsesBrowseExcludedHeroImage(c));

        const allOrdered = orderCollegesForBrowse(list, seed);

        const from = pageForSlice * COLLEGES_PER_PAGE;
        const slice = allOrdered.slice(from, from + COLLEGES_PER_PAGE);
        const more = from + COLLEGES_PER_PAGE < allOrdered.length;

        if (pageForSlice === 0) {
          setColleges(slice);
        } else {
          setColleges((prev) => [...prev, ...slice]);
        }
        setHasMoreColleges(more);
      } catch (e) {
        if (ac.signal.aborted || gen !== fetchGenerationRef.current) return;
        const msg =
          e && typeof e === "object" && "message" in e && typeof (e as { message: unknown }).message === "string"
            ? (e as { message: string }).message
            : e instanceof Error
              ? e.message
              : String(e);
        console.error("Failed to load colleges:", msg);
        setError(
          e instanceof Error && e.message.includes("timed out")
            ? e.message
            : e instanceof Error && e.message.includes("missing")
              ? "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY to .env.local"
              : "Failed to load colleges. Please try again.",
        );
      } finally {
        if (!ac.signal.aborted && gen === fetchGenerationRef.current) setLoading(false);
      }
    };

    void run();
    return () => {
      ac.abort();
      setLoading(false);
    };
  }, [debouncedSearchTerm, selectedVibesKey, selectedVibes.length, currentPage]);

  useEffect(() => {
    const urlKey = searchParams.toString();
    const urlSearch = searchParams.get("search") ?? "";
    const urlVibes = searchParams.get("vibes")?.split(",").filter(Boolean) ?? [];
    const urlVibesKey = [...urlVibes].sort().join(",");

    if (appliedUrlKeyRef.current !== urlKey) {
      appliedUrlKeyRef.current = urlKey;
      setSearchTerm(urlSearch);
      setSelectedVibes(urlVibes);
      return;
    }

    if (urlSync.mode === "none") return;

    const stateVibesKey = [...selectedVibes].sort().join(",");
    if (searchTerm === urlSearch && stateVibesKey === urlVibesKey) return;

    const basePath =
      urlSync.mode === "landing"
        ? urlSync.basePath
        : typeof window !== "undefined" && window.location.pathname.startsWith(BROWSE_DEV_PATH)
          ? BROWSE_DEV_PATH
          : BROWSE_PUBLIC_PATH;
    const params = new URLSearchParams();
    if (typeof window !== "undefined" && window.location.pathname.startsWith(BROWSE_DEV_PATH)) {
      const entry = searchParams.get("entry");
      if (entry) params.set("entry", entry);
    }
    if (searchTerm.trim()) params.set("search", searchTerm.trim());
    if (selectedVibes.length > 0) params.set("vibes", selectedVibes.join(","));
    const nextQs = params.toString();
    appliedUrlKeyRef.current = nextQs;
    router.replace(nextQs ? `${basePath}?${nextQs}` : basePath, { scroll: false });
  }, [searchParams, searchTerm, selectedVibes, router, urlSync]);

  useEffect(() => {
    if (!debouncedSearchTerm.trim() && selectedVibes.length === 0) return;
    trackBrowseEvent({
      type: "browse_filter",
      search: debouncedSearchTerm.trim() || undefined,
      vibes: selectedVibes.length ? selectedVibes : undefined,
    });
  }, [debouncedSearchTerm, selectedVibesKey]);

  const isVibeDisabled = (vibe: { value: string; requiresQuiz?: boolean }) =>
    Boolean(vibe.requiresQuiz && (!user || !hasCompletedCareerQuiz));

  const toggleVibe = (value: string) => {
    setSelectedVibes((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : prev.length < 2 ? [...prev, value] : [prev[0]!, value],
    );
  };

  return (
    <div className="min-h-screen bg-white pt-0 flex flex-col" data-scroll-container>
      <div className="container mx-auto px-4 pb-8 pt-0 sm:py-12 max-w-7xl my-0 flex-1 w-full">
        <div className="lg:hidden -mx-4 mb-6">
          {showVibeMixer ? (
            <BrowseMobileSearchCard
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onVibesChange={setSelectedVibes}
              vibeOptions={vibeOptions}
              isVibeDisabled={isVibeDisabled}
              onSearchComplete={handleMobileSearchComplete}
            />
          ) : (
            <div className="px-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search schools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-2xl bg-transparent py-4 pl-12 pr-4 text-3xl font-light text-gray-700 placeholder-gray-400 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
            </div>
          )}
        </div>

        <div className="hidden lg:flex lg:gap-8">
          {showVibeMixer ? (
          <div className="w-80 flex-shrink-0">
            <div className="mb-8">
              <VibeMixer
                selectedVibes={selectedVibes}
                onVibeChange={setSelectedVibes}
                vibeOptions={vibeOptions}
                size="compact"
              />
            </div>
            <div className="mb-8">
              <div className="grid grid-cols-2 gap-2">
                {vibeOptions.map((vibe) => (
                  <Button
                    key={vibe.value}
                    variant="outline"
                    size="sm"
                    type="button"
                    onClick={() => {
                      if (isVibeDisabled(vibe)) return;
                      toggleVibe(vibe.value);
                    }}
                    disabled={isVibeDisabled(vibe)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl font-medium transition-all duration-300 ${
                      selectedVibes.includes(vibe.value)
                        ? "bg-[#A084FF] text-white border-[#A084FF] shadow-lg hover:bg-[#8B6CF7] hover:shadow-xl"
                        : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 shadow-sm hover:shadow-md"
                    } ${isVibeDisabled(vibe) ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    {isVibeDisabled(vibe) && <Lock className="w-3 h-3" />}
                    <span className={`text-sm font-medium ${selectedVibes.includes(vibe.value) ? "text-white" : ""}`}>
                      {vibe.label}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
          ) : null}

          <div className="flex-1">
            <div className="mb-8">
              <div className="max-w-2xl">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search schools..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-gray-700 placeholder-gray-400 bg-white rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-200 text-3xl font-light"
                  />
                </div>
              </div>
            </div>

            <SchoolGrid
              colleges={colleges}
              selectedVibes={selectedVibes}
              vibeFiltered={vibeFilterResult}
              loading={loading}
              error={error}
              hasMoreColleges={hasMoreColleges}
              onLoadMore={() => setCurrentPage((p) => p + 1)}
              onResetFilters={() => {
                setSearchTerm("");
                setSelectedVibes([]);
                setCurrentPage(0);
              }}
            />
          </div>
        </div>

        <div ref={mobileResultsRef} className="scroll-mt-4 lg:hidden">
          <SchoolGrid
            colleges={colleges}
            selectedVibes={selectedVibes}
            vibeFiltered={vibeFilterResult}
            loading={loading}
            error={error}
            hasMoreColleges={hasMoreColleges}
            revealToken={resultsRevealToken}
            onLoadMore={() => setCurrentPage((p) => p + 1)}
            onResetFilters={() => {
              setSearchTerm("");
              setSelectedVibes([]);
              setCurrentPage(0);
            }}
          />
        </div>
      </div>
    </div>
  );
}
