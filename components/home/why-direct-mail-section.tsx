"use client";

import Image from "next/image";

const SECTION_BG = "rgb(243, 250, 250)"; // #f3fafa from Figma
const HEADING_COLOR = "#181A1D";
const STAT_COLOR = "rgb(46, 47, 53)"; // 0.18, 0.184, 0.208
const BODY_COLOR = "rgb(88, 89, 93)"; // 0.345, 0.349, 0.365

const CHART_IMAGE =
  "https://storage.googleapis.com/images_592/home-number-chart-p-500.webp";
const CHART_ALT = "Response rate chart";
const CHART_CAPTION = "Your messages get read";

export function WhyDirectMailSection() {
  return (
    <section
      className="w-full min-w-0 overflow-x-hidden py-16 md:py-20"
      style={{ backgroundColor: SECTION_BG }}
    >
      <div className="container mx-auto max-w-[1024px] px-4 md:px-6 min-w-0">
        <h2
          className="mx-auto mb-14 max-w-[603px] text-center text-3xl font-bold leading-tight tracking-tight md:mb-16 md:text-4xl lg:text-[2.5rem]"
          style={{ color: HEADING_COLOR }}
        >
          Why use direct mail? It works like crazy.
        </h2>

        <div className="flex flex-col items-center gap-12 lg:flex-row lg:justify-between lg:gap-[2.5rem]">
          {/* 28X stat */}
          <div className="flex flex-col items-center text-center lg:w-[228px] lg:flex-shrink-0">
            <span
              className="text-5xl font-bold leading-none md:text-6xl"
              style={{ color: STAT_COLOR }}
            >
              28X
            </span>
            <p
              className="mt-4 max-w-[218px] text-sm leading-snug md:text-base"
              style={{ color: BODY_COLOR }}
            >
              Higher response rate than email & digital
            </p>
          </div>

          {/* Chart image + caption */}
          <div className="flex flex-col items-center lg:w-[228px] lg:flex-shrink-0">
            <div className="relative h-[180px] w-full max-w-[228px] overflow-hidden rounded-lg bg-white/80 md:h-[201px]">
              <Image
                src={CHART_IMAGE}
                alt={CHART_ALT}
                fill
                className="object-contain object-center"
                sizes="228px"
                unoptimized
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = "none";
                  const fallback = target.nextElementSibling;
                  if (fallback) (fallback as HTMLElement).style.display = "block";
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
              className="mt-2 text-center text-sm"
              style={{ color: BODY_COLOR }}
            >
              {CHART_CAPTION}
            </p>
          </div>

          {/* 17 Days stat */}
          <div className="flex flex-col items-center text-center lg:w-[228px] lg:flex-shrink-0">
            <span
              className="text-5xl font-bold leading-none md:text-6xl"
              style={{ color: STAT_COLOR }}
            >
              17 Days
            </span>
            <p
              className="mt-4 max-w-[218px] text-sm leading-snug md:text-base"
              style={{ color: BODY_COLOR }}
            >
              Lifespan of a postcard vs. seconds for email or SMS
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
