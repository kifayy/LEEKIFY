/** Busuu-style “how it works” feature rows on the homepage. */

export type HomeHowItWorksFeature = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
};

export const HOME_HOW_IT_WORKS_FEATURES: HomeHowItWorksFeature[] = [
  {
    id: "search",
    eyebrow: "STEP ONE",
    title: "Search Your Email for Known Leaks",
    description:
      "Enter your email to scan breach databases instantly. See whether your address appeared in public leaks and get clear next steps—not a vague warning.",
    imageSrc: "/images/screen2.webp",
    imageAlt: "Leekify breach search showing where an email appeared in data leaks",
    imageWidth: 540,
    imageHeight: 1080,
  },
  {
    id: "ledger",
    eyebrow: "FULL VISIBILITY",
    title: "See Every Exposure in Your Ledger",
    description:
      "Premium unlocks an unblurred exposure ledger—breach names, exposed data types, and dates—so you know exactly what was compromised.",
    imageSrc: "/images/screen1.webp",
    imageAlt: "Leekify exposure ledger listing unblurred breach details",
    imageWidth: 540,
    imageHeight: 1080,
  },
  {
    id: "monitor",
    eyebrow: "STAY AHEAD",
    title: "Monitor IDs and Get Real-Time Alerts",
    description:
      "Watch up to three identifiers, receive text and email breach alerts, settlement notifications for leaked brands, and export a PDF digital risk report anytime.",
    imageSrc: "/images/screen3.png",
    imageAlt: "Leekify monitoring dashboard with breach alerts and settlement notifications",
    imageWidth: 2160,
    imageHeight: 1500,
  },
];
