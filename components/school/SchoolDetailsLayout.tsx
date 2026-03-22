"use client";

import { useMemo, useState } from "react";
import { SchoolHeader } from "./SchoolHeader";
import { SchoolVibeSection } from "./SchoolVibeSection";
import { SchoolHighlightsSection } from "./SchoolHighlightsSection";
import { FridayTimelineSection } from "./FridayTimelineSection";
import { StudySpotsSection } from "./StudySpotsSection";
import { StudentFoodSection } from "./StudentFoodSection";
import { SimilarSchoolsSection } from "./SimilarSchoolsSection";
import { SchoolStickyHeader } from "./SchoolStickyHeader";
import { FloatingBackButton } from "./FloatingBackButton";
import { SchoolFavoriteToastButton } from "./SchoolFavoriteToastButton";
import { SchoolSEO } from "./SchoolSEO";
import type { CollegeDetail } from "@/types/college-detail";
import { sanitizeCollegeBanner } from "@/lib/sanitize-college-banner";
import { schoolHeroImageStyle } from "@/lib/school-hero-image-variant";

type SectionChip = { id: string; label: string; emoji: string };

export function SchoolDetailsLayout({
  collegeData,
  showSidebarNav = true,
  canonicalUrl,
}: {
  collegeData: CollegeDetail;
  showSidebarNav?: boolean;
  canonicalUrl: string;
}) {
  const [highlightsOpen, setHighlightsOpen] = useState(true);
  const [studentFoodOpen, setStudentFoodOpen] = useState(true);

  const friday = collegeData.friday_timeline?.length ? collegeData.friday_timeline : null;
  const bannerLogo = sanitizeCollegeBanner(collegeData.banner);

  const sectionChips = useMemo((): SectionChip[] => {
    const chips: SectionChip[] = [{ id: "match", label: "Student Experience", emoji: "😊" }];
    if (friday) chips.push({ id: "friday", label: "Typical Friday", emoji: "📅" });
    if (collegeData.highlights?.length) chips.push({ id: "why-perfect", label: "Why It's Perfect", emoji: "🎓" });
    if (collegeData.campus_vibe) chips.push({ id: "vibe", label: "School Stats", emoji: "📊" });
    if (collegeData.study_spots?.length) chips.push({ id: "study-spots", label: "Study Spots", emoji: "📚" });
    if (collegeData.student_food?.length) chips.push({ id: "food", label: "Food & Dining", emoji: "🍕" });
    chips.push({ id: "similar", label: "Similar Schools", emoji: "🎯" });
    return chips;
  }, [friday, collegeData]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /** Sticky header intentionally never shown (matches dashboard). */
  const showStickyHeader = false;

  return (
    <>
      <SchoolSEO college={collegeData} canonicalUrl={canonicalUrl} />
      <div className="min-h-screen bg-white flex-1">
        <SchoolStickyHeader showStickyHeader={showStickyHeader} collegeName={collegeData.name} />
        <SchoolFavoriteToastButton collegeId={collegeData.id} collegeName={collegeData.name} />

        <div className="px-4 sm:px-6 xl:px-10 py-6 xl:py-10">
          <div className="max-w-6xl mx-auto space-y-8 pb-20">
            <div className="flex flex-wrap items-center gap-3">
              <FloatingBackButton />
            </div>

            <nav className="flex flex-wrap items-center gap-2 text-sm text-gray-500" aria-label="Breadcrumb">
              <span>PathPicker</span>
              <span aria-hidden>›</span>
              <span>Colleges</span>
              <span aria-hidden>›</span>
              <span className="text-gray-900 font-semibold">{collegeData.name}</span>
            </nav>

            {!showSidebarNav && (
              <div className="flex flex-wrap gap-2 text-xs">
                {sectionChips.map((section) => (
                  <button
                    key={section.id}
                    type="button"
                    className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-gray-700 shadow-sm hover:border-violet-300 hover:text-violet-800 transition-colors"
                    onClick={() => scrollTo(section.id)}
                  >
                    <span>{section.emoji}</span>
                    <span>{section.label}</span>
                  </button>
                ))}
              </div>
            )}

            <div>
              {collegeData.new_image_link || collegeData.featured_image_url ? (
                <div className="relative w-full rounded-3xl overflow-hidden bg-gray-100 border border-gray-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={collegeData.new_image_link || collegeData.featured_image_url || ""}
                    alt={`${collegeData.name} campus banner`}
                    className="w-full h-52 sm:h-64 md:h-72 lg:h-80 object-cover"
                    style={schoolHeroImageStyle(collegeData.id)}
                    loading="eager"
                  />
                  {bannerLogo && (
                    <div className="absolute bottom-8 left-3 z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden bg-white/90 backdrop-blur-sm shadow-md border border-white/80 flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={bannerLogo} alt="" className="w-full h-full object-contain" loading="lazy" />
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full rounded-3xl border border-dashed border-gray-300 bg-gray-50 text-xs text-gray-500 flex items-center justify-center h-52 sm:h-64 md:h-72 lg:h-80 text-center px-4">
                  PLACE CAMPUS BANNER IMAGE HERE
                </div>
              )}
            </div>

            <SchoolHeader collegeData={collegeData} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                {friday && (
                  <div id="friday" className="scroll-mt-24">
                    <FridayTimelineSection
                      fridayTimeline={friday}
                      universityName={collegeData.name}
                      humanStats={collegeData.human_stats}
                    />
                  </div>
                )}
              </div>
              <div className="space-y-5">
                {collegeData.campus_vibe && (
                  <div id="vibe" className="scroll-mt-24">
                    <SchoolVibeSection campusVibe={collegeData.campus_vibe} universityName={collegeData.name} />
                  </div>
                )}
                {collegeData.highlights && collegeData.highlights.length > 0 && (
                  <div id="why-perfect" className="scroll-mt-24">
                    <SchoolHighlightsSection
                      highlights={collegeData.highlights}
                      isOpen={highlightsOpen}
                      onOpenChange={setHighlightsOpen}
                      universityName={collegeData.name}
                    />
                  </div>
                )}
                {collegeData.study_spots && collegeData.study_spots.length > 0 && (
                  <div id="study-spots" className="scroll-mt-24">
                    <StudySpotsSection studySpots={collegeData.study_spots} universityName={collegeData.name} />
                  </div>
                )}
                {collegeData.student_food && collegeData.student_food.length > 0 && (
                  <div id="food" className="scroll-mt-24">
                    <StudentFoodSection
                      studentFood={collegeData.student_food}
                      isOpen={studentFoodOpen}
                      onOpenChange={setStudentFoodOpen}
                      universityName={collegeData.name}
                    />
                  </div>
                )}
              </div>
            </div>

            <SimilarSchoolsSection currentCollege={collegeData} />

            <div className="sr-only">
              <h2>About {collegeData.name}</h2>
              <p>
                {collegeData.name} is{" "}
                {collegeData.location ? `located in ${collegeData.location}` : "a distinguished institution"}
                {collegeData.student_body_size
                  ? ` with approximately ${collegeData.student_body_size.toLocaleString()} students`
                  : ""}
                .
                {collegeData.acceptance_rate != null ? ` The acceptance rate is ${collegeData.acceptance_rate}%.` : ""}
              </p>
              {collegeData.campus_vibe && (
                <>
                  <h3>Campus Culture and Vibe</h3>
                  <p>{collegeData.campus_vibe}</p>
                </>
              )}
              {collegeData.highlights && collegeData.highlights.length > 0 && (
                <>
                  <h3>Key Highlights</h3>
                  <ul>
                    {collegeData.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </>
              )}
              <h3>Why Choose {collegeData.name}?</h3>
              <p>
                {collegeData.why_perfect_match ||
                  `${collegeData.name} offers a unique combination of academic excellence, vibrant campus life, and opportunities for personal growth.`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
