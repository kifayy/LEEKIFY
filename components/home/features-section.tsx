"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

// Feature cards for "What's PathPicker?" section
const FEATURES = [
  {
    image: "https://storage.googleapis.com/images_592/woman_2154545.png",
    title: "Student Archetype",
    description:
      "Discover your type with our 16‑archetype system. See how you study and rank.",
  },
  {
    image: "https://storage.googleapis.com/images_592/flying-money_3141991%20(2).png",
    title: "Scholarship Matches",
    description:
      "Get scholarships that match your profile and goals. We pull from 1,000+ partners.",
  },
  {
    image: "https://storage.googleapis.com/images_592/money_2308887.png",
    title: "Student Deals",
    description:
      "Brands give away free stuff to students all the time. We find it for you.",
  },
];

// Tools cards inspired by external "Tools for every step of your journey" section
const TOOLS = [
  {
    href: "/colleges",
    title: "Discover Your Student Archetype",
    description:
      "Uncover your strengths, style, and where you stand among other students.",
    image:
      "https://www.bigfuture.collegeboard.org/sites/default/files/styles/fun_card_image_1x_/public/2023-12/Collge%20Fit3.jpg?itok=LYXs_END",
    accentColor: "#facc15", // yellow
  },
  {
    href: "/scholarships",
    title: "Your Smart College Matches",
    description:
      "Get matched with schools where you belong socially and academically.",
    image:
      "https://www.bigfuture.collegeboard.org/sites/default/files/styles/fun_card_image_1x_/public/2023-12/Scholarships4.jpg?itok=qQ53a9Fg",
    accentColor: "#fb923c", // orange
  },
  {
    href: "/virtual-college-tours",
    title: "Match With Real Scholarships",
    description:
      "Use our iOS app to find scholarships you actually qualify for.",
    image:
      "https://www.bigfuture.collegeboard.org/sites/default/files/styles/fun_card_image_1x_/public/2023-12/Virtual%20Tours4.jpg?itok=TVlhdGdS",
    accentColor: "#a855f7", // purple
  },
  {
    href: "/guidance/majors-degrees",
    title: "Where Should You Study Abroad?",
    description:
      "See what countries, cities, and programs you would thrive in studying abroad.",
    image:
      "https://www.bigfuture.collegeboard.org/sites/default/files/styles/fun_card_image_1x_/public/2023-12/Majors2.jpg?itok=KkWMyRgT",
    accentColor: "#22c55e", // green
  },
];

export function FeaturesSection() {
  const [mobileExpanded, setMobileExpanded] = useState(false);

  return (
    <section className="w-full min-w-0 overflow-x-hidden bg-white pt-4 pb-10 md:pt-8 md:pb-16">
      <div className="container mx-auto max-w-6xl px-4 md:px-6 min-w-0">
        {/* Mobile: "What's PathPicker?" tappable to expand when collapsed */}
        <div className="flex flex-col items-center gap-4 md:hidden">
          {!mobileExpanded && (
            <button
              type="button"
              onClick={() => setMobileExpanded(true)}
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#956EFE] bg-white px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-[#956EFE] transition-colors hover:bg-[#956EFE] hover:text-white"
            >
              What's PathPicker?
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
              What's PathPicker?
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
              40k+ students use PathPicker to find scholarships, brand giveaways,
              and exclusive deals only for students.
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

        {/* Tools section from external site, styled to match PathPicker */}
        <div className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-center text-xl font-bold leading-tight text-[#181A1D] md:text-3xl">
            Tools for{" "}
            <span className="relative inline-block">
              <span className="relative z-10">every</span>
              <span className="absolute inset-x-0 bottom-0 h-1 rounded-full bg-[#956EFE]/40" />
            </span>{" "}
            step of your journey.
          </h2>

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {TOOLS.map((tool) => (
              <div key={tool.title} className="relative">
                {/* Colored offset card behind */}
                <div
                  className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3 rounded-3xl"
                  style={{ backgroundColor: tool.accentColor }}
                  aria-hidden="true"
                />

                {/* Foreground white fun-card */}
                <Link
                  href={tool.href}
                  className="relative z-10 flex h-full flex-col justify-between rounded-3xl bg-white p-6 text-left shadow-[0_18px_40px_rgba(35,57,91,0.12)] transition-transform transition-shadow hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(35,57,91,0.18)]"
                >
                  <div className="flex flex-col gap-3">
                    <h3 className="text-base font-bold leading-tight text-[#181A1D] md:text-lg">
                      {tool.title}
                    </h3>
                    <p
                      className="text-sm font-normal leading-relaxed"
                      style={{ color: "rgba(25, 24, 37, 0.75)" }}
                    >
                      {tool.description}
                    </p>
                  </div>

                  {/* Media image */}
                  {tool.image && (
                    <div className="mt-4 overflow-hidden rounded-2xl">
                      <Image
                        src={tool.image}
                        alt=""
                        width={481}
                        height={270}
                        className="h-full w-full object-cover"
                        unoptimized
                      />
                    </div>
                  )}

                  <span className="mt-4 inline-flex items-center text-sm font-semibold text-[#181A1D]">
                    Explore
                    <span className="ml-1 text-lg leading-none">→</span>
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
