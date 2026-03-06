"use client";

import Image from "next/image";
import { Star } from "lucide-react";

const SECTION_BG_IMAGE =
  "https://storage.googleapis.com/images_592/sefction.png";
const SECTION_BG_IMAGE_MOBILE =
  "https://storage.googleapis.com/images_592/sectifffon.png";

type EnterScholarshipsSectionProps = {
  /** When true, content is centered on all breakpoints (e.g. for money-quiz page). */
  centered?: boolean;
};

export function EnterScholarshipsSection({ centered }: EnterScholarshipsSectionProps = {}) {
  return (
    <section
      className="relative w-full min-w-0 overflow-hidden"
      style={{ minHeight: 800 }}
      aria-label="Enter scholarships CTA"
    >
      {/* Background image — mobile only (sectifffon) */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat md:hidden"
        style={{ backgroundImage: `url(${SECTION_BG_IMAGE_MOBILE})` }}
      />
      {/* Background image — desktop (unchanged) */}
      <div
        className="absolute inset-0 z-0 hidden bg-cover bg-center bg-no-repeat md:block"
        style={{ backgroundImage: `url(${SECTION_BG_IMAGE})` }}
      />
      <div
        className={
          centered
            ? "container relative z-10 mx-auto flex min-h-[800px] max-w-[1400px] flex-col items-center justify-center px-4 py-16 text-center md:px-10 md:py-20 lg:py-24"
            : "container relative z-10 mx-auto flex min-h-[800px] max-w-[1400px] flex-col items-center px-4 py-16 text-center md:items-start md:px-10 md:py-20 md:text-left lg:flex-row lg:justify-between lg:gap-12 lg:py-24"
        }
      >
        {/* Left: copy + CTAs */}
        <div className="flex max-w-[760px] flex-1 flex-col items-center gap-5 pt-6 text-white md:items-start lg:pt-20">
          {/* Rating — mobile only, above title */}
          <div className="flex flex-col items-center gap-1.5 md:hidden" aria-hidden>
            <div className="flex items-center gap-1.5 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) =>
                i === 4 ? (
                  <span
                    key={i}
                    className="inline-block h-6 w-[1.125rem] overflow-hidden"
                    aria-hidden
                  >
                    <Star className="h-6 w-6 shrink-0 fill-current" />
                  </span>
                ) : (
                  <Star key={i} className="h-6 w-6 fill-current" />
                )
              )}
            </div>
            <span className="text-sm font-medium text-white">4.8/5 on iOS</span>
          </div>
          <h2 className="hidden text-3xl font-bold leading-tight tracking-tight text-white md:block md:text-left md:text-6xl lg:text-[4.375rem]">
            How Much Scholarship Cash?
          </h2>
          <p className="text-base font-medium text-white md:hidden">
            🤑How many scholarships do you qualify for?
            <br className="block" />
            <span className="mt-4 block">Take the scholarship quiz!</span>
          </p>
          <p className="hidden text-base font-medium text-white md:block md:text-left md:text-xl">
            Take the quiz and see how much your student profile<br />is leaving on the table
          </p>
          <div className={`flex flex-wrap items-center justify-center gap-6 md:gap-12 ${centered ? "" : "md:justify-start"}`}>
            <div className={`flex flex-col items-center gap-3 ${centered ? "" : "md:items-start"}`}>
              <a
                href="https://awarded.short.gy/9iTh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-16 min-w-[200px] items-center justify-center gap-2 rounded-[15px] border-2 border-[#181A1D] bg-white px-8 text-base font-medium text-[#181A1D] shadow-[3px_3px_0_0_#181A1D] transition hover:bg-gray-50"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/0/747.png"
                  alt=""
                  className="h-6 w-6 object-contain"
                  aria-hidden
                />
                Continue
              </a>
            </div>
            {/* Rating — desktop only (next to button) */}
            <div className={`hidden flex-col gap-1.5 md:flex ${centered ? "items-center" : ""}`}>
              <div className="flex items-center gap-1.5 text-amber-400" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) =>
                  i === 4 ? (
                    <span
                      key={i}
                      className="inline-block h-8 w-6 overflow-hidden"
                      aria-hidden
                    >
                      <Star className="h-8 w-8 shrink-0 fill-current" />
                    </span>
                  ) : (
                    <Star key={i} className="h-8 w-8 fill-current" />
                  )
                )}
              </div>
              <span className="text-base font-medium text-white">
                4.8/5 on iOS
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
