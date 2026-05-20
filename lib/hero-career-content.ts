import { MOBILE_HERO_CAREER_PORTRAIT_URL } from "@/lib/home-lcp-images";

/** Hero portrait for university / career audience (local pre-exported WebP). */
export const CAREER_HERO_PORTRAIT_URL = MOBILE_HERO_CAREER_PORTRAIT_URL;

export type HeroCareerStatTone = "neutral" | "negative" | "positive" | "caution";

export type HeroCareerStatLine = {
  /** Short number or headline: e.g. "$106k", "84%" */
  value: string;
  /** Short label (≤3 words): e.g. "Future Salary" */
  label: string;
  /** Drives accent + type color: e.g. AI risk → red. */
  tone?: HeroCareerStatTone;
  /** Optional career icon (replaces mini chart in stat chips). */
  iconSrc?: string;
  /** Label under icon, e.g. "Doctor". */
  careerName?: string;
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

/** Desktop path widget — stats with career icons instead of charts. */
export const PATH_WIDGET_CAREER_STATS: readonly HeroCareerStatLine[] = [
  {
    value: "84%",
    label: "chance of replacement by AI",
    tone: "negative",
    iconSrc: "/images/path-widget-careers/engineer.png",
    careerName: "Engineer",
  },
  {
    value: "$280k",
    label: "median salary in your field",
    tone: "positive",
    iconSrc: "/images/path-widget-careers/doctor.png",
    careerName: "Doctor",
  },
  {
    value: "68%",
    label: "want higher pay in their next role",
    iconSrc: "/images/path-widget-careers/lawyer.png",
    careerName: "Lawyer",
  },
  {
    value: "4×",
    label: "growth in AI-adjacent roles",
    tone: "positive",
    iconSrc: "/images/path-widget-careers/engineer.png",
    careerName: "Engineer",
  },
  {
    value: "3 yrs",
    label: "until your skills need a refresh",
    tone: "caution",
    iconSrc: "/images/path-widget-careers/teacher.png",
    careerName: "Teacher",
  },
  {
    value: "+38%",
    label: "more remote roles year over year",
    tone: "positive",
    iconSrc: "/images/path-widget-careers/therapist.png",
    careerName: "Therapist",
  },
  {
    value: "55%",
    label: "exploring a different field",
    iconSrc: "/images/path-widget-careers/therapist.png",
    careerName: "Therapist",
  },
  {
    value: "11 wks",
    label: "average job search length",
    tone: "caution",
    iconSrc: "/images/path-widget-careers/lawyer.png",
    careerName: "Lawyer",
  },
] as const;
