"use client";

import Image from "next/image";

const SECTION_BG = "rgb(243, 250, 250)"; // #f3fafa from Figma
const HEADING_COLOR = "#181A1D";
const STAT_COLOR = "rgb(46, 47, 53)"; // 0.18, 0.184, 0.208
const BODY_COLOR = "rgb(88, 89, 93)"; // 0.345, 0.349, 0.365

const CHART_IMAGE =
  "https://storage.googleapis.com/images_592/Group%20338.png";
const CHART_ALT = "Response rate chart";
const CHART_CAPTION = "We always find easy scholarships for you...";

export function WhyDirectMailSection() {
  return (
    <section
      className="w-full min-w-0 overflow-x-hidden py-10 md:py-20"
      style={{ backgroundColor: SECTION_BG }}
    >
      <div className="container mx-auto max-w-[1024px] px-4 md:px-6 min-w-0">
        <h2
          className="mx-auto mb-8 max-w-[603px] text-center text-3xl font-bold leading-tight tracking-tight md:mb-16 md:text-4xl lg:text-[2.5rem]"
          style={{ color: HEADING_COLOR }}
        >
          Students who use PathPicker start on the right path
        </h2>

        <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between lg:gap-[2.5rem]">
          {/* 92% stat */}
          <div className="flex flex-col items-center text-center lg:w-[228px] lg:flex-shrink-0">
            <span
              className="text-5xl font-bold leading-none md:text-6xl"
              style={{ color: STAT_COLOR }}
            >
              92%
            </span>
            <p
              className="mt-4 max-w-[218px] text-sm leading-snug md:text-base"
              style={{ color: BODY_COLOR }}
            >
              Of students said PathPicker&apos;s results matched them to opportunities their school never told them about.
            </p>
          </div>

          {/* Chart image + caption — 30% larger (342→445, 360→468, 302→393) */}
          <div className="flex flex-col items-center w-full max-w-[445px] lg:w-[445px] lg:max-w-none lg:flex-shrink-0">
            <div className="relative h-[468px] w-full max-w-full -translate-x-[-4%] overflow-hidden rounded-lg md:translate-x-0 md:h-[393px] md:max-w-[445px]">
              <Image
                src={CHART_IMAGE}
                alt={CHART_ALT}
                fill
                className="object-contain object-center"
                sizes="(max-width: 768px) 100vw, 445px"
                unoptimized
                onError={(e) => {
                  const wrapper = e.currentTarget.parentElement;
                  const fallback = wrapper?.nextElementSibling;
                  if (wrapper) wrapper.style.display = "none";
                  if (fallback) (fallback as HTMLElement).style.display = "flex";
                }}
              />
              <div
                className="absolute inset-0 hidden items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-500"
                style={{ display: "none" }}
                aria-hidden
              >
                Chart
              </div>
            </div>
            <p
              className="hidden -mt-0.5 text-center text-sm italic md:block md:mt-2 md:not-italic"
              style={{ color: BODY_COLOR }}
            >
              {CHART_CAPTION}
            </p>
          </div>

          {/* 47s stat */}
          <div className="flex flex-col items-center text-center lg:w-[228px] lg:flex-shrink-0">
            <span
              className="text-5xl font-bold leading-none md:text-6xl"
              style={{ color: STAT_COLOR }}
            >
              47s
            </span>
            <p
              className="mt-4 max-w-[218px] text-sm leading-snug md:text-base"
              style={{ color: BODY_COLOR }}
            >
              Average time it takes PathPicker users to enter their first scholarship.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
