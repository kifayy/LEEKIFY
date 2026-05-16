/** Hero portrait for university / career audience (transparent PNG). */
export const CAREER_HERO_PORTRAIT_URL =
  "https://storage.googleapis.com/images_592/Gemini_Generated_Image_qt27fcqt27fcqt27-Photoroom.png";

export type HeroCareerStatTone = "neutral" | "negative" | "positive" | "caution";

export type HeroCareerStatLine = {
  /** Short number or headline: e.g. "$106k", "84%" */
  value: string;
  /** Short label (≤3 words): e.g. "Future Salary" */
  label: string;
  /** Drives accent + type color: e.g. AI risk → red. */
  tone?: HeroCareerStatTone;
};

/**
 * Marquee stats behind career hero portrait.
 * Shuffled per reel row for variety (same mechanics as logo carousel).
 */
export const HERO_CAREER_STATS: readonly HeroCareerStatLine[] = [
  { value: "$106k", label: "Future Salary", tone: "positive" },
  { value: "84%", label: "AI Risk Rate", tone: "negative" },
  { value: "68%", label: "Want Higher Pay" },
  { value: "4×", label: "AI Roles Rising", tone: "positive" },
  { value: "3 yrs", label: "Skills Refresh", tone: "caution" },
  { value: "+38%", label: "Remote Growth", tone: "positive" },
  { value: "55%", label: "Explore Fields" },
  { value: "11 wks", label: "Avg Job Hunt", tone: "caution" },
] as const;
