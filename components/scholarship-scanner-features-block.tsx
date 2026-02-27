"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";

/**
 * Two-column block from Figma: left = dark bg + 3 feature cards, right = light gray (e.g. partner logos).
 * Rendered only on Scholarship Scanner page, below the "Our algorithm scans 1,000+" text.
 */
const FEATURES = [
  {
    emoji: "🎯",
    title: "Scholarship texts that match you",
    body: "Our algorithm scans thousands of scholarships and brands every week and check them against your profile so you only see easy scholarships you actually qualify for.",
    borderColor: "border-emerald-300",
  },
  {
    emoji: "🎓",
    title: "Works for high school and college",
    body: "Whether you are in high school or college, we match based on what you are interested in, and what your student status is.",
    borderColor: "border-pink-300",
  },
  {
    emoji: "✏️",
    title: "Edit profile anytime",
    body: "Wanna change what type of scholarships you get? Just simply respond with EDIT and you can change how our AI scans scholarships for you.",
    borderColor: "border-violet-300",
  },
];

export function ScholarshipScannerFeaturesBlock() {
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    fetch("/animations/9_16.json")
      .then((res) => res.json())
      .then(setAnimationData)
      .catch(() => {});
  }, []);

  return (
    <section
      className="w-full min-w-0 overflow-x-hidden bg-white py-12 md:py-16"
      aria-label="Features"
    >
      <div className="mx-auto flex max-w-[1440px] min-w-0 flex-col lg:flex-row">
        {/* Left: dark — 3 feature cards */}
        <div className="flex min-w-0 flex-1 flex-col gap-10 px-6 py-12 md:px-[101px] md:py-16 lg:max-w-[720px]">
          {FEATURES.map((feature, i) => (
            <div
              key={i}
              className={`flex flex-col gap-3 rounded-2xl border-2 bg-white p-6 ${feature.borderColor}`}
            >
              <h3 className="text-xl font-semibold leading-tight text-gray-900 md:text-2xl">
                <span className="mr-2 inline-block text-3xl md:text-4xl" aria-hidden>{feature.emoji}</span>
                {feature.title}
              </h3>
              <p className="max-w-[518px] text-base leading-relaxed text-gray-700 md:text-lg">
                {feature.body}
              </p>
            </div>
          ))}
          {/* Mobile-only: 9_16 Lottie below feature cards */}
          <div className="flex min-h-[200px] items-center justify-center overflow-hidden pb-10 touch-none lg:hidden">
            {animationData && (
              <Lottie
                animationData={animationData}
                loop
                className="h-full max-h-[157px] w-full max-w-full object-contain"
              />
            )}
          </div>
        </div>

        {/* Right: partner brands — Lottie animation (same as Scholarship Quiz card); hidden on mobile, visible on desktop */}
        <div
          className="hidden min-h-[320px] min-w-0 flex-1 items-center justify-center overflow-hidden bg-white lg:flex lg:min-h-[510px] lg:max-w-[720px]"
        >
          {animationData && (
            <Lottie
              animationData={animationData}
              loop
              className="h-full max-h-[157px] w-full max-w-full object-contain md:max-h-[256px] lg:max-h-[600px]"
            />
          )}
        </div>
      </div>
    </section>
  );
}
