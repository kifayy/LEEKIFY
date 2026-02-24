"use client";

import Link from "next/link";
import { Star } from "lucide-react";

const HERO_BG_URL =
  "https://storage.googleapis.com/images_592/13.%20Online%20Forusm.png";

const REVIEW_PILL_BG = "transparent";

export function DesktopHeroBanner() {
  return (
    <section
      className="relative hidden w-full min-w-0 bg-contain bg-center bg-no-repeat md:block"
      aria-label="Hero"
      style={{
        backgroundImage: `url(${HERO_BG_URL})`,
        backgroundSize: "contain",
        minHeight: "min(95vw, 800px)",
      }}
    >
      <div className="container relative mx-auto flex max-w-[1400px] flex-col items-center px-4 py-12 md:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:py-16">
        {/* Left: title + subtitle + review pill + CTAs */}
        <div className="flex max-w-[1104px] flex-1 flex-col gap-6 text-center lg:max-w-[55%] lg:text-left">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-[#181A1D] md:text-[3.5rem] lg:text-[4rem]">
            Find your path.
            <br />
            Fund <span style={{ color: "#956EFE" }}>your future.</span>
          </h1>

          <p className="max-w-[554px] text-base leading-relaxed md:text-lg" style={{ color: "#949494" }}>
            Being a student is hard. That&apos;s why 40k+ students use PathPicker to make it easier.
          </p>

          {/* Review pill – 5 stars + "42.3k+ students matched" */}
          <div
            className="inline-flex flex-wrap items-center gap-3 rounded-lg px-4 py-3 sm:gap-4 sm:px-5"
            style={{ backgroundColor: REVIEW_PILL_BG }}
          >
            <div className="flex items-center gap-1.5 text-pathpicker-gold" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current sm:h-5 sm:w-5" />
              ))}
            </div>
            <span className="text-sm font-medium text-[#181A1D]">
              42.3k+ students matched
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 lg:justify-start">
            <Link
              href="http://my.pathpicker.com/archetype"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-16 min-w-[200px] items-center justify-center gap-2 rounded-[15px] border-2 border-[#181A1D] bg-[#956EFE] px-8 text-base font-medium text-white shadow-[3px_3px_0_0_#181A1D] transition hover:opacity-95"
            >
              <span>🎭</span>
              Archetype Quiz
            </Link>
            <Link
              href="/scholarships"
              className="inline-flex h-16 min-w-[200px] items-center justify-center gap-2 rounded-[15px] border-2 border-[#181A1D] bg-white px-8 text-base font-medium text-[#181A1D] shadow-[3px_3px_0_0_#181A1D] transition hover:bg-gray-50"
            >
              <span>💸</span>
              Get Scholarships
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
