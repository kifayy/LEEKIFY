/** Local static assets (formerly GCS pathpicker/generated_images). Served from Vercel — zero GCS egress. */
export const SCHOOL_DETAIL_IMAGES = {
  fridayHeader: "/images/school-detail/friday-header.png",
  vibeHeader: "/images/school-detail/vibe-header.png",
  highlightsHeader: "/images/school-detail/highlights-header.png",
  studySpotsHeader: "/images/school-detail/study-spots-header.png",
  /** Primary filename; StudentFoodSection falls back without `d` if 404 */
  foodHeader: "/images/school-detail/food-header.png",
  statTuition: "/images/school-detail/tuition.png",
  statAcceptance: "/images/school-detail/acceptance.png",
  statStudents: "/images/school-detail/students.png",
} as const;

export const SECTION_CARD =
  "rounded-3xl border-2 border-[#A084FF]/20 bg-white shadow-xl transition-transform duration-200 hover:scale-[1.01] overflow-hidden";
