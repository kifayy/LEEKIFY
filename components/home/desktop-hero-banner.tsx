"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

const HERO_BG_URL =
  "https://storage.googleapis.com/images_592/05.%20Grocery%20Store.png";

const REVIEW_PILL_BG = "#ffffff";

export function DesktopHeroBanner() {
  return (
    <section
      className="relative hidden w-full min-w-0 bg-contain bg-center bg-no-repeat md:block"
      aria-label="Hero"
      style={{
        backgroundImage: `url(${HERO_BG_URL})`,
        backgroundSize: "90%",
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
              href="/scholarship-quiz"
              className="inline-flex h-16 min-w-[200px] items-center justify-center gap-2 rounded-[15px] border-2 border-[#181A1D] bg-white px-8 text-base font-medium text-[#181A1D] shadow-[3px_3px_0_0_#181A1D] transition hover:bg-gray-50"
            >
              <span>💸</span>
              Get Scholarships
            </Link>
          </div>
        </div>

        {/* Right: floating tags (hero background covers section) */}
        <div className="relative mt-8 h-[315px] w-full max-w-[450px] shrink-0 lg:mt-0 lg:h-[473px] lg:max-w-[563px] xl:h-[585px] xl:max-w-[731px]">
          <div className="animate-float absolute right-2 top-[18%] z-20 flex min-w-[100px] items-center gap-2 rounded-lg bg-white p-2.5 shadow-[0_9px_59px_rgba(174,165,114,0.08)] lg:right-4 lg:min-w-[120px]" style={{ animationDelay: "0s" }}>
            <div className="relative h-5 w-5 shrink-0 overflow-hidden rounded">
              <Image
                src="https://storage.googleapis.com/images_592/images.png"
                alt=""
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <p className="text-sm font-bold leading-tight" style={{ color: "#956EFE" }}>
              82% Ivy League Match
            </p>
          </div>

          <div className="animate-float absolute bottom-[32%] left-2 z-20 flex items-center gap-2 rounded-full bg-white px-4 py-2.5 shadow-[0_42px_26px_rgba(0,0,0,0.05)] lg:left-4" style={{ animationDelay: "0.5s" }}>
            <span className="text-xl">💰</span>
            <span className="text-sm font-normal text-[#3A3E46]">
              $32,144 Scholarships Matched
            </span>
          </div>

          <div className="animate-float absolute bottom-[22%] right-6 z-20 flex items-center gap-2 rounded-full bg-white px-4 py-2.5 shadow-[0_42px_26px_rgba(0,0,0,0.05)] lg:right-10" style={{ animationDelay: "1s" }}>
            <span className="text-xl">🎉</span>
            <span className="text-sm font-normal text-[#3A3E46]">
              Social Partier
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
