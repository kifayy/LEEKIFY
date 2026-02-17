"use client";

import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";

const SECTION_BG_IMAGE =
  "https://storage.googleapis.com/images_592/sefction.png";
const SECTION_BG_IMAGE_MOBILE =
  "https://storage.googleapis.com/images_592/sectifffon.png";

export function EnterScholarshipsSection() {
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
      <div className="container relative z-10 mx-auto flex min-h-[800px] max-w-[1400px] flex-col items-center px-4 py-16 text-center md:items-start md:px-10 md:py-20 md:text-left lg:flex-row lg:justify-between lg:gap-12 lg:py-24">
        {/* Left: copy + CTAs */}
        <div className="flex max-w-[760px] flex-1 flex-col gap-5 pt-6 text-white lg:pt-20">
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
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-[4.375rem]">
            Enter Scholarships in Seconds
          </h2>
          <p className="text-base font-medium text-white md:text-xl">
            Over 1k+ brands. Made for students.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:justify-start md:gap-12">
            <div className="flex flex-col items-center gap-3 md:items-start">
              <Link
                href="/scholarship-quiz"
                className="inline-flex h-16 min-w-[200px] items-center justify-center gap-2 rounded-[15px] border-2 border-[#181A1D] bg-white px-8 text-base font-medium text-[#181A1D] shadow-[3px_3px_0_0_#181A1D] transition hover:bg-gray-50"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/0/747.png"
                  alt=""
                  className="h-6 w-6 object-contain"
                  aria-hidden
                />
                Download on iOS
              </Link>
<p className="hidden self-center text-base font-medium text-white md:block">or…</p>
            <a
              href="sms:+18559224190?body=yoo%21%20send%20me%20scholarships"
              className="relative hidden h-16 w-full max-w-[280px] overflow-hidden rounded-[15px] transition-opacity hover:opacity-95 active:opacity-90 md:block md:h-20 md:max-w-[320px]"
                aria-label="Get started — text to get matched scholarships"
              >
                <Image
                  src="https://storage.googleapis.com/images_592/Groussp%206.png"
                  alt="Get started"
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 768px) 280px, 320px"
                  unoptimized
                />
              </a>
            </div>
            {/* Rating — desktop only (next to button) */}
            <div className="hidden flex-col gap-1.5 md:flex">
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
