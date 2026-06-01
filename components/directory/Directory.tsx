"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/useDebounce";
import { useVibeFilteredColleges } from "@/hooks/useVibeFilteredColleges";
import { createClient } from "@/lib/supabase/client";
import type { College } from "@/types/college";
import { SchoolGrid } from "@/components/directory/SchoolGrid";
import { VibeMixer } from "@/components/directory/VibeMixer";
import { Lock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useCareerPersonalityStatus } from "@/hooks/useCareerPersonalityStatus";
import { collegeUsesBrowseExcludedHeroImage } from "@/lib/school-hero-image-variant";
import { orderCollegesForBrowse } from "@/lib/order-colleges-for-browse";
import { hasEnvVars, withTimeout } from "@/lib/utils";
import { BROWSE_COLLEGE_COLUMNS, BROWSE_FETCH_LIMIT } from "@/lib/browse-college-select";

const COLLEGES_PER_PAGE = 20;

const COLLEGES_QUERY_TIMEOUT_MS = 45_000;

export type DirectoryUrlSync =
  | { mode: "browse" }
  | { mode: "landing"; basePath: string }
  | { mode: "none" };

const vibeOptions = [
  { value: "nature-lover", label: "🌿 Nature", emoji: "🌿" },
  { value: "flirty", label: "💋 Flirty", emoji: "💋" },
  { value: "artsy-af", label: "🎨 Artsy", emoji: "🎨" },
  { value: "academic-weapon", label: "🏛️ Academic", emoji: "🏛️" },
  { value: "party-animal", label: "🎉 Social", emoji: "🎉" },
  { value: "tech-savvy", label: "💻 Tech", emoji: "💻" },
  { value: "sports-enthusiast", label: "🏈 Sports", emoji: "🏈" },
  { value: "entrepreneurial", label: "🚀 Business", emoji: "🚀" },
  { value: "creative-soul", label: "🎭 Creative", emoji: "🎭" },
  { value: "wellness-focused", label: "🧘 Wellness", emoji: "🧘" },
  { value: "diverse-community", label: "🌍 Diversity", emoji: "🌍" },
  { value: "foodie", label: "🍜 Foodie", emoji: "🍜" },
];

type DirectoryProps = {
  initialColleges?: College[];
  /** Pre-selected vibes (SEO landing pages); URL `vibes` overrides when present. */
  defaultVibes?: string[];
  urlSync?: DirectoryUrlSync;
};

export function Directory({
  initialColleges = [],
  defaultVibes,
  urlSync = { mode: "browse" },
}: DirectoryProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const { hasCompletedCareerQuiz } = useCareerPersonalityStatus();

  const initialSearchTerm = searchParams.get("search") || "";
  const vibesFromUrl = searchParams.get("vibes")?.split(",").filter(Boolean) || [];
  const initialVibes =
    vibesFromUrl.length > 0 ? vibesFromUrl : defaultVibes?.length ? [...defaultVibes] : [];

  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [colleges, setColleges] = useState<College[]>([]);
  const [selectedVibes, setSelectedVibes] = useState<string[]>(initialVibes);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMoreColleges, setHasMoreColleges] = useState(true);

  const vibeFilterResult = useVibeFilteredColleges(selectedVibes, debouncedSearchTerm);

  const selectedVibesKey = useMemo(() => [...selectedVibes].sort().join(","), [selectedVibes]);
  const filtersKeyRef = useRef("");
  const shuffleSeedRef = useRef(Math.random());
  const fetchGenerationRef = useRef(0);
  const initialCollegesRef = useRef(initialColleges);
  initialCollegesRef.current = initialColleges;

  const applyBrowseSlice = (list: College[], seed: number, pageForSlice: number) => {
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
          const safe = debouncedSearchTerm.trim().replace(/\\/g, "\\\\").replace(/%/g, "\\%");
          query = query.or(`name.ilike.%${safe}%,location.ilike.%${safe}%,description.ilike.%${safe}%`);
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
    if (urlSync.mode === "none") return;

    const basePath = urlSync.mode === "landing" ? urlSync.basePath : "/browse-schools";
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (selectedVibes.length > 0) params.set("vibes", selectedVibes.join(","));
    const nextQs = params.toString();
    const curSearch = searchParams.get("search") ?? "";
    const curVibes = (searchParams.get("vibes") ?? "").split(",").filter(Boolean).sort().join(",");
    const nextVibes = [...selectedVibes].sort().join(",");
    if (searchTerm !== curSearch || nextVibes !== curVibes) {
      router.replace(nextQs ? `${basePath}?${nextQs}` : basePath, { scroll: false });
    }
  }, [searchTerm, selectedVibes, router, searchParams, urlSync]);

  const isVibeDisabled = (vibe: { value: string; requiresQuiz?: boolean }) =>
    Boolean(vibe.requiresQuiz && (!user || !hasCompletedCareerQuiz));

  const toggleVibe = (value: string) => {
    setSelectedVibes((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : prev.length < 2 ? [...prev, value] : [prev[0]!, value],
    );
  };

  return (
    <div className="min-h-screen bg-white pt-0 flex flex-col" data-scroll-container>
      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-7xl my-0 pb-8 flex-1 w-full">
        <div className="lg:hidden">
          <div className="mb-4">
            <div className="max-w-3xl mx-auto">
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
                  className="w-full pl-12 pr-4 py-4 text-gray-700 placeholder-gray-400 bg-transparent rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-200 text-3xl font-light"
                />
              </div>
            </div>
          </div>

          <div className="mb-4 -mx-1 px-1">
            <div className="flex gap-4 overflow-x-auto pb-4 pt-1 scrollbar-hide justify-start snap-x snap-mandatory">
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
                  className={`shrink-0 snap-start flex items-center gap-2 whitespace-nowrap px-5 py-3.5 min-h-[44px] rounded-full font-medium transition-all duration-300 ${
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

          <div className="mb-6 sm:mb-8">
            <VibeMixer selectedVibes={selectedVibes} onVibeChange={setSelectedVibes} vibeOptions={vibeOptions} />
          </div>
        </div>

        <div className="hidden lg:flex lg:gap-8">
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

        <div className="lg:hidden">
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
    </div>
  );
}
