import type { LucideIcon } from "lucide-react";
import { BarChart3, Orbit, WandSparkles } from "lucide-react";

export const MOBILE_DATA_ENGINE_FEATURES_TITLE_PREFIX = "One University, ";
export const MOBILE_DATA_ENGINE_FEATURES_TITLE_ACCENT = "One Choice";

/** @deprecated Use prefix + accent for styled heading */
export const MOBILE_DATA_ENGINE_FEATURES_TITLE = `${MOBILE_DATA_ENGINE_FEATURES_TITLE_PREFIX}${MOBILE_DATA_ENGINE_FEATURES_TITLE_ACCENT}`;

export const MOBILE_DATA_ENGINE_FEATURES_SUBTITLE =
  "We make sure you pick the school that actually matches you.";

export type MobileDataEngineFeature = {
  title: string;
  description: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
};

export const MOBILE_DATA_ENGINE_FEATURES: MobileDataEngineFeature[] = [
  {
    title: "Student Intelligence Mapping",
    description:
      "Go way beyond your GPA & acceptance odds. Filter 2,000+ universities through 400+ intelligence signals tailored to your specific cognitive and social style.",
    icon: WandSparkles,
    iconBg: "#FFF1F1",
    iconColor: "#C96A6A",
  },
  {
    title: "Peer Fit Intelligence",
    description:
      "Every campus has students who love it — and students who don't. Compare your archetype to real campus culture and know where you'll belong before you apply.",
    icon: Orbit,
    iconBg: "#EDF7F4",
    iconColor: "#3A8F7E",
  },
  {
    title: "Predictive Admissions & ROI",
    description:
      "Unlock your personalized dashboard featuring live admission odds, campus happiness scores, and future-proof career outlooks.",
    icon: BarChart3,
    iconBg: "#FFF8E8",
    iconColor: "#B8860B",
  },
];

export const MOBILE_DATA_ENGINE_DASHBOARD_IMAGE_URL =
  "https://storage.googleapis.com/images_592/Group%20asdasd7ss96.png";

export const MOBILE_DATA_ENGINE_DASHBOARD_IMAGE_ALT =
  "PathPicker college match results showing top university matches and admission odds";

export type MobileDataEngineMetric = {
  value: number;
  suffix: string;
  label: string;
};

export const MOBILE_DATA_ENGINE_METRICS_TITLE_PREFIX = "The Student ";
export const MOBILE_DATA_ENGINE_METRICS_TITLE_ACCENT = "Intelligence";

/** @deprecated Use prefix + accent for styled heading */
export const MOBILE_DATA_ENGINE_METRICS_TITLE = `${MOBILE_DATA_ENGINE_METRICS_TITLE_PREFIX}${MOBILE_DATA_ENGINE_METRICS_TITLE_ACCENT}`;

export const MOBILE_DATA_ENGINE_METRICS_SUBTITLE =
  "The smartest college matching tool on the market, powered entirely by verified student intelligence.";

export const MOBILE_DATA_ENGINE_METRICS: MobileDataEngineMetric[] = [
  { value: 2000, suffix: "+", label: "Universities Analyzed" },
  { value: 50000, suffix: "+", label: "Student Outcomes Tracked" },
  { value: 100, suffix: "k+", label: "Students Matched" },
  { value: 400, suffix: "+", label: "Intelligence Signals" },
];
