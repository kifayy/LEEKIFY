"use client";

import { useState, useEffect, useCallback } from "react";
import { SchoolCard } from "./SchoolCard";
import { NoSchoolsFound } from "./NoSchoolsFound";
import { useSchoolMatchScore } from "@/hooks/useSchoolMatchScore";
import { useSavedColleges } from "@/hooks/useSavedColleges";
import { VIBE_EMOJIS } from "./constants";
import type { College } from "@/types/college";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface CollegeWithMatch extends College {
  matchScore?: number;
}

/** Result of `useVibeFilteredColleges` from Directory (single source; avoids duplicate fetches for mobile + desktop grids). */
export type VibeFilteredBundle = {
  colleges: College[];
  loading: boolean;
  error: string | null;
};

interface SchoolGridProps {
  colleges: College[];
  selectedVibes: string[];
  vibeFiltered: VibeFilteredBundle;
  loading?: boolean;
  error?: string | null;
  hasMoreColleges?: boolean;
  onLoadMore?: () => void;
  onResetFilters?: () => void;
}

function CollegeWithMatchScore({
  college,
  onMatchCalculated,
}: {
  college: College;
  onMatchCalculated: (collegeId: string, matchScore: number) => void;
}) {
  const { matchScore, isLoading } = useSchoolMatchScore(college.id, college.vibe_tags || []);
  const [lastReportedScore, setLastReportedScore] = useState<number | null>(null);

  useEffect(() => {
    if (!isLoading && matchScore > 0 && matchScore !== lastReportedScore) {
      onMatchCalculated(college.id, matchScore);
      setLastReportedScore(matchScore);
    }
  }, [matchScore, isLoading, college.id, lastReportedScore, onMatchCalculated]);

  return null;
}

export function SchoolGrid({
  colleges: initialColleges,
  selectedVibes,
  vibeFiltered,
  loading = false,
  error = null,
  hasMoreColleges = false,
  onLoadMore,
  onResetFilters,
}: SchoolGridProps) {
  const { user } = useAuth();
  const isSignedIn = !!user;
  const { savedColleges, toggleSavedCollege } = useSavedColleges();
  const [collegesWithMatches, setCollegesWithMatches] = useState<CollegeWithMatch[]>([]);
  const [matchScores, setMatchScores] = useState<Map<string, number>>(new Map());

  const twoVibeMode = selectedVibes.length === 2;
  const collegesData = twoVibeMode ? vibeFiltered.colleges : initialColleges;
  const isLoading = twoVibeMode ? vibeFiltered.loading : loading;
  const currentError = twoVibeMode ? vibeFiltered.error : error;
  /** Sister Explore behavior: infinite scroll only with no vibe chips (0 vibes). */
  const showLoadMore = !twoVibeMode && selectedVibes.length === 0 && hasMoreColleges;

  const handleMatchCalculated = useCallback((collegeId: string, matchScore: number) => {
    setMatchScores((prev) => {
      const next = new Map(prev);
      next.set(collegeId, matchScore);
      return next;
    });
  }, []);

  useEffect(() => {
    let updated = collegesData.map((c) => ({
      ...c,
      matchScore: matchScores.get(c.id) || 0,
    }));
    if (isSignedIn && matchScores.size > 0 && selectedVibes.length === 0) {
      updated = [...updated].sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
    }
    setCollegesWithMatches(updated);
  }, [collegesData, matchScores, isSignedIn, selectedVibes.length]);

  const handleSaveSchool = async (schoolId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const college = collegesWithMatches.find((c) => c.id === schoolId);
    if (college) await toggleSavedCollege(schoolId, college.name);
  };

  const handleResetFilters = () => onResetFilters?.();

  if (isLoading && collegesWithMatches.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">🔍</div>
        <p className="text-gray-600">Finding colleges that match your vibes...</p>
      </div>
    );
  }

  if (currentError) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">⚠️</div>
        <p className="text-gray-600 mb-4">Unable to load colleges at the moment</p>
        <p className="text-sm text-gray-500 mb-4">Please try again or browse all schools</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-[#A084FF] text-white rounded-lg hover:bg-[#A084FF]/90 mr-2"
        >
          Try Again
        </button>
        <button
          type="button"
          onClick={handleResetFilters}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          Show All Schools
        </button>
      </div>
    );
  }

  const vibeEmoji = (v: string) => VIBE_EMOJIS[v] || "✨";

  return (
    <div className="space-y-6">
      {selectedVibes.length > 0 && (
        <div className="text-center py-6 bg-white rounded-3xl border border-gray-100 shadow-lg mb-8">
          <p className="text-gray-700 text-base sm:text-lg px-6 font-light">
            {selectedVibes.length === 2 ? (
              <>
                Showing <span className="font-semibold text-gray-900 text-xl">{collegesWithMatches.length}</span>{" "}
                colleges that match: {selectedVibes.map((v) => vibeEmoji(v)).join(" ")}
              </>
            ) : (
              <>
                Add a second vibe to filter — showing{" "}
                <span className="font-semibold text-gray-900 text-xl">{collegesWithMatches.length}</span> colleges
                matching search (vibe: {selectedVibes.map((v) => vibeEmoji(v)).join(" ")})
              </>
            )}
          </p>
        </div>
      )}

      {isSignedIn &&
        collegesData.slice(0, 20).map((college) => (
          <CollegeWithMatchScore key={`match-${college.id}`} college={college} onMatchCalculated={handleMatchCalculated} />
        ))}

      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-2 sm:px-0">
        {collegesWithMatches.map((school, index) => (
          <SchoolCard
            key={school.id}
            imageLoadPriority={index < 9}
            school={{
              id: school.id,
              name: school.name,
              location: school.location || `${school.name} Campus`,
              campus_vibe: school.campus_vibe ?? undefined,
              vibe_tags: school.vibe_tags || [],
              school_emoji: school.school_emoji ?? undefined,
              banner: school.banner ?? undefined,
              new_image_link: school.new_image_link ?? undefined,
              featured_image_url: school.featured_image_url ?? undefined,
              image_url: school.image_url ?? undefined,
              student_body_size: school.student_body_size ?? undefined,
              acceptance_rate: school.acceptance_rate ?? undefined,
              tuition_range: school.tuition_range ?? undefined,
              description: school.description ?? undefined,
              slug: school.slug || school.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
              personality_line: school.personality_line ?? undefined,
              emoji_desc: school.emoji_desc ?? undefined,
            }}
            savedSchools={savedColleges}
            onSaveSchool={handleSaveSchool}
            vibeEmojis={VIBE_EMOJIS}
            mode="directory"
            hideFitCopy
            showMatchScore={isSignedIn && matchScores.has(school.id)}
            matchScore={matchScores.get(school.id)}
            selectedVibes={selectedVibes}
          />
        ))}
      </div>

      {showLoadMore && onLoadMore && collegesWithMatches.length > 0 && (
        <div className="text-center py-8">
          <Button
            onClick={onLoadMore}
            disabled={isLoading}
            className="bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 px-8 py-3 text-lg rounded-full font-medium transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 mx-auto"
          >
            <div className="flex items-center gap-2">
              {isLoading ? (
                "Loading..."
              ) : (
                <>
                  Load More Colleges
                  <ChevronDown className="w-5 h-5" />
                </>
              )}
            </div>
          </Button>
        </div>
      )}

      {loading && collegesWithMatches.length > 0 && (
        <div className="text-center py-4">
          <div className="text-2xl mb-2">⏳</div>
          <p className="text-gray-600 text-sm">Loading more colleges...</p>
        </div>
      )}

      {collegesWithMatches.length === 0 && !isLoading && <NoSchoolsFound onResetFilters={handleResetFilters} />}
    </div>
  );
}
