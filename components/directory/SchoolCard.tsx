"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LoginToSaveSchoolDialog } from "@/components/schools/login-to-save-dialog";
import { MapPin, Heart, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useSchoolMatchScore } from "@/hooks/useSchoolMatchScore";
import { MatchBreakdownModal } from "./MatchBreakdownModal";
import { sanitizeCollegeBanner } from "@/lib/sanitize-college-banner";
import { schoolHeroImageStyle } from "@/lib/school-hero-image-variant";
import { shouldUseNextImageOptimizer, shouldServeImageDirectFromCdn } from "@/lib/remote-image-patterns";
import {
  buildSchoolCardFitReason,
  buildSchoolCardStatLine,
} from "@/lib/school-card-fit-copy";
import { getSchoolPageHref } from "@/lib/school-page-href";
import { trackBrowseEvent } from "@/lib/browse-analytics";

/** `sizes` for directory grid: 1 / 2 / 3 columns (~full-bleed card image). */
const SCHOOL_CARD_HERO_SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

interface SchoolCardProps {
  school: {
    id: string;
    name: string;
    location: string;
    campus_vibe?: string;
    vibe_tags?: string[];
    school_emoji?: string;
    logo_url?: string;
    banner?: string;
    new_image_link?: string;
    /** Campus hero fallback when new_image_link empty */
    featured_image_url?: string;
    /** Alternative campus/school image (e.g. for carousels) */
    image_url?: string;
    student_body_size?: number;
    acceptance_rate?: number;
    tuition_range?: string;
    description?: string;
    slug: string;
    personality_line?: string;
    emoji_desc?: string;
  };
  showMatchScore?: boolean;
  matchScore?: number;
  savedSchools?: Set<string>;
  onSaveSchool?: (schoolId: string, e: React.MouseEvent) => void;
  vibeEmojis?: Record<string, string>;
  mode?: "directory" | "results" | "featured";
  hideExploreButton?: boolean;
  hideEmojiTags?: boolean;
  hideHeartButton?: boolean;
  imageHeight?: string;
  compactPadding?: boolean;
  buttonText?: string;
  buttonPosition?: "overlay" | "bottom";
  hideImageOverlay?: boolean;
  /** First grid cells: eager + high fetch priority so hero photos resolve faster. */
  imageLoadPriority?: boolean;
  /** Active browse vibes — used for plain-language match reasons. */
  selectedVibes?: string[];
}

export function SchoolCard({
  school,
  showMatchScore = false,
  matchScore: propMatchScore,
  savedSchools,
  onSaveSchool,
  mode = "directory",
  hideExploreButton = false,
  hideEmojiTags = false,
  hideHeartButton = false,
  imageHeight = "h-48 sm:h-56",
  compactPadding = false,
  buttonText = "Explore",
  buttonPosition = "overlay",
  imageLoadPriority = false,
  selectedVibes = [],
}: SchoolCardProps) {
  const { user } = useAuth();
  const isSignedIn = !!user;
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showMatchBreakdown, setShowMatchBreakdown] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);

  const isSaved = isSignedIn && (savedSchools?.has(school.id) ?? false);

  const { matchScore: calculatedScore, isLoading, breakdown } = useSchoolMatchScore(
    mode === "directory" ? "" : school.id,
    school.vibe_tags || [],
  );

  const finalMatchScore = mode === "results" ? propMatchScore : calculatedScore;
  const shouldShowDynamicMatchScore = mode !== "directory" && isSignedIn && calculatedScore > 0 && !isLoading;

  useEffect(() => {
    if (shouldShowDynamicMatchScore && calculatedScore) {
      const duration = 1000;
      const steps = 20;
      const increment = calculatedScore / steps;
      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        setAnimatedScore(Math.min(Math.round(increment * currentStep), calculatedScore));
        if (currentStep >= steps) clearInterval(timer);
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [shouldShowDynamicMatchScore, calculatedScore]);

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isSignedIn) {
      setShowAuthDialog(true);
      return;
    }
    if (onSaveSchool) void onSaveSchool(school.id, e);
  };

  const schoolHref = getSchoolPageHref(school.slug, school.name);
  const statLine = buildSchoolCardStatLine({
    acceptanceRate: school.acceptance_rate,
    tuitionRange: school.tuition_range,
  });
  const fitReason =
    buildSchoolCardFitReason({
      selectedVibes,
      vibeTags: school.vibe_tags,
      location: school.location,
      acceptanceRate: school.acceptance_rate,
    }) ?? statLine;

  const trackClick = () => {
    trackBrowseEvent({
      type: "school_card_click",
      schoolSlug: school.slug,
      context: mode,
    });
  };

  const parseEmojiDesc = (emojiDesc?: string) => {
    if (!emojiDesc) return [];
    try {
      const parsed = JSON.parse(emojiDesc);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      if (emojiDesc.startsWith("[") && emojiDesc.endsWith("]")) {
        return emojiDesc
          .slice(1, -1)
          .split(",")
          .map((item) => item.trim());
      }
      return [emojiDesc];
    }
    return [];
  };

  const emojiDescElements = parseEmojiDesc(school.emoji_desc);
  const displayEmoji = school.logo_url || school.school_emoji || "🎓";

  const heroUrls = (() => {
    const out: string[] = [];
    for (const u of [school.new_image_link, school.featured_image_url, school.image_url, sanitizeCollegeBanner(school.banner) ?? undefined]) {
      const t = u?.trim();
      if (t && t !== "null" && !t.toLowerCase().startsWith("null")) out.push(t);
    }
    return [...new Set(out)];
  })();

  const [heroIndex, setHeroIndex] = useState(0);
  useEffect(() => {
    setHeroIndex(0);
  }, [school.id, school.new_image_link, school.featured_image_url, school.image_url, school.banner]);

  const showHero = heroIndex < heroUrls.length;
  const heroSrc = showHero ? heroUrls[heroIndex] : "";
  const useNextImage = Boolean(heroSrc && shouldUseNextImageOptimizer(heroSrc));
  /** Pre-sized college heroes: serve from GCS CDN directly (no `/_next/image` fan-out). */
  const serveHeroFromCdn = Boolean(heroSrc && shouldServeImageDirectFromCdn(heroSrc));

  return (
    <>
      <div className="group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white rounded-2xl overflow-hidden relative h-full border border-gray-100 shadow-sm">
        <div className={`relative ${imageHeight} overflow-hidden`}>
          <Link href={schoolHref} className="block h-full w-full" aria-label={`View ${school.name}`} onClick={trackClick}>
            {showHero ? (
              useNextImage ? (
                <Image
                  key={heroSrc}
                  src={heroSrc}
                  alt={`${school.name} campus`}
                  fill
                  className="object-cover"
                  style={schoolHeroImageStyle(school.id)}
                  sizes={SCHOOL_CARD_HERO_SIZES}
                  quality={serveHeroFromCdn ? undefined : 72}
                  unoptimized={serveHeroFromCdn}
                  priority={imageLoadPriority}
                  loading={imageLoadPriority ? "eager" : "lazy"}
                  fetchPriority={imageLoadPriority ? "high" : "auto"}
                  onError={() => setHeroIndex((i) => i + 1)}
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={heroSrc}
                  src={heroSrc}
                  alt={`${school.name} campus`}
                  className="w-full h-full object-cover"
                  style={schoolHeroImageStyle(school.id)}
                  loading={imageLoadPriority ? "eager" : "lazy"}
                  fetchPriority={imageLoadPriority ? "high" : "auto"}
                  decoding="async"
                  onError={() => setHeroIndex((i) => i + 1)}
                />
              )
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
                <div className="text-6xl sm:text-7xl opacity-30">{displayEmoji}</div>
              </div>
            )}
          </Link>

          {!hideHeartButton && (
            <button
              type="button"
              onClick={handleSaveClick}
              className={`absolute top-3 right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-sm transition-all duration-300 ${
                isSaved
                  ? "bg-red-500 text-white hover:bg-red-600 shadow-lg"
                  : "bg-white/90 text-gray-400 hover:bg-white hover:text-red-500 shadow-md"
              }`}
              title={isSaved ? "Remove from saved" : "Save school"}
            >
              <Heart className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`} />
            </button>
          )}

          {!hideExploreButton && buttonPosition === "overlay" && (
            <Button
              asChild
              className="absolute bottom-3 right-3 z-20 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#A084FF] to-[#6C5DD3] px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:from-[#9575ff] hover:to-[#5d4ec7] hover:shadow-xl"
            >
              <Link href={schoolHref} onClick={trackClick}>
                {buttonText}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>

        <div className={`${compactPadding ? "p-1.5 sm:p-3" : "p-4 sm:p-6"} overflow-hidden`}>
          <div className={compactPadding ? "mb-1 sm:mb-2" : "mb-4"}>
            <h3 className="font-bold text-gray-900 text-left text-base sm:text-lg lg:text-xl mb-0.5 sm:mb-1 break-words leading-tight">
              <Link href={schoolHref} className="hover:text-[#6C5DD3] transition-colors" onClick={trackClick}>
                {school.name}
              </Link>
            </h3>
            <div className="flex items-center gap-1 text-gray-500 text-left text-xs sm:text-sm">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="break-words">{school.location}</span>
            </div>
          </div>

          {fitReason ? (
            <p className="text-gray-700 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2 font-medium break-words leading-relaxed">
              {fitReason}
            </p>
          ) : null}

          {school.personality_line && !fitReason ? (
            <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-4 line-clamp-2 sm:line-clamp-4 italic break-words overflow-wrap-anywhere leading-relaxed">
              {school.personality_line}
            </p>
          ) : null}

          {statLine && fitReason !== statLine ? (
            <p className="text-gray-500 text-xs mb-2 sm:mb-3">{statLine}</p>
          ) : null}

          {!hideEmojiTags && emojiDescElements.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {emojiDescElements.slice(0, 3).map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs font-medium shadow-none px-3 py-1.5 border border-gray-200 bg-white text-gray-800"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {!hideExploreButton && buttonPosition === "bottom" && (
            <Button
              asChild
              className="w-full mt-4 px-4 py-2 flex items-center justify-center gap-2 text-sm font-semibold rounded-xl bg-gradient-to-r from-[#A084FF] to-[#6C5DD3] hover:from-[#9575ff] hover:to-[#5d4ec7] text-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <Link href={schoolHref} onClick={trackClick}>
                {buttonText}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>

      {breakdown && mode === "directory" && (
        <MatchBreakdownModal
          isOpen={showMatchBreakdown}
          onClose={() => setShowMatchBreakdown(false)}
          schoolName={school.name}
          overallScore={calculatedScore}
          breakdown={breakdown}
        />
      )}

      <LoginToSaveSchoolDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} />
    </>
  );
}
