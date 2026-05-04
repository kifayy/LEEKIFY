"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

// "What's PathPicker?" widget (kept for later re-use on the homepage)
const FEATURES = [
  {
    image: "https://storage.googleapis.com/images_592/woman_2154545.png",
    title: "Student Archetype",
    description:
      "Discover your type with our 16‑archetype system. See how you study and rank.",
  },
  {
    image: "https://storage.googleapis.com/images_592/flying-money_3141991%20(2).png",
    title: "School matches",
    description:
      "See colleges that fit your profile and goals—we rank options so you can compare faster.",
  },
  {
    image: "https://storage.googleapis.com/images_592/money_2308887.png",
    title: "Student Deals",
    description:
      "Brands give away free stuff to students all the time. We find it for you.",
  },
];

export function WhatsPathPickerWidget() {
  const [mobileExpanded, setMobileExpanded] = useState(false);

  return (
    <>
      {/* Mobile: "What's PathPicker?" tappable to expand when collapsed */}
      <div className="flex flex-col items-center gap-4 md:hidden">
        {!mobileExpanded && (
          <button
            type="button"
            onClick={() => setMobileExpanded(true)}
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#956EFE] bg-white px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-[#956EFE] transition-colors hover:bg-[#956EFE] hover:text-white"
          >
            What&apos;s PathPicker?
            <ChevronDown className="h-4 w-4" strokeWidth={2} />
          </button>
        )}
      </div>

      <div
        className={`mt-6 md:mt-10 grid min-w-0 grid-cols-1 gap-8 md:gap-10 lg:grid-cols-[244px_1fr_1fr_1fr] lg:gap-16 ${
          !mobileExpanded ? "hidden md:grid" : ""
        }`}
      >
        {/* Left: Header - Frame 48095467 */}
        <div className="flex flex-col items-center gap-4 text-center md:items-start md:gap-6 md:text-left lg:col-span-1">
          <p
            className="hidden text-sm font-bold uppercase tracking-wider md:block"
            style={{ color: "#956EFE" }}
          >
            What&apos;s PathPicker?
          </p>
          <h2 className="hidden text-xl font-bold leading-tight text-[#181A1D] md:block md:text-3xl">
            It&apos;s{" "}
            <span className="relative inline-block">
              <span className="relative z-10">simple</span>
              <span className="absolute inset-x-0 bottom-0 h-1 rounded-full bg-[#956EFE]/40" />
            </span>
          </h2>
          <p
            className="max-w-full text-sm font-normal leading-relaxed md:max-w-[244px]"
            style={{ color: "rgba(25, 24, 37, 0.75)" }}
          >
            40k+ students use PathPicker to explore schools, compare fit, and spot opportunities
            built for students like them.
          </p>
        </div>

        {/* Right: Feature cards - vertical stack on mobile/sm; on lg all three in one row */}
        <div className="grid min-w-0 grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 lg:col-span-3 lg:grid-cols-3 lg:gap-8">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-center gap-3 text-center"
            >
              <div className="flex min-h-[86px] min-w-0 items-center justify-center">
                <div className="relative flex h-[86px] w-[112px] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white">
                  <Image
                    src={feature.image}
                    alt=""
                    width={112}
                    height={86}
                    className="h-full w-full object-contain"
                    unoptimized
                  />
                </div>
              </div>
              <h3 className="min-w-0 break-words text-lg font-bold leading-tight text-[#181A1D] lg:text-xl">
                {feature.title}
              </h3>
              <p
                className="min-w-0 text-sm font-normal leading-relaxed"
                style={{ color: "rgba(25, 24, 37, 0.75)" }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

