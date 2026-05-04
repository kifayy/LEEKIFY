"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HeroCollegeLogoReels } from "@/components/home/hero-college-logo-reels";
import { HeroStudentsMatchedWidget } from "@/components/home/hero-belong-cta";

const ROTATING_WORDS = ["Dream School", "Chances", "Future Path"];
const TYPE_DELAY_MS = 90;
const HOLD_DELAY_MS = 1800;
const DELETE_DELAY_MS = 55;

const HERO_IMAGE = "https://my.pathpicker.com/images/hero-student.png";
const HERO_IMAGE_DESKTOP = "https://storage.googleapis.com/images_592/bsa.png";

/** Same Framer wash as `DesktopHeroBanner` — mobile hero backdrop */
const MOBILE_HERO_BG_URL =
  "https://framerusercontent.com/images/ZWl7RlbHmOvw03wGj5AUDAKZB4.jpg";

export function HeroFigmaDesign() {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const word = ROTATING_WORDS[wordIndex];
  const displayedText = word.slice(0, charIndex);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (charIndex < word.length) {
            setCharIndex((c) => c + 1);
          } else {
            setIsDeleting(true);
          }
        } else {
          if (charIndex > 0) {
            setCharIndex((c) => c - 1);
          } else {
            setIsDeleting(false);
            setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
          }
        }
      },
      isDeleting ? DELETE_DELAY_MS : charIndex === word.length ? HOLD_DELAY_MS : TYPE_DELAY_MS
    );
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, word, wordIndex]);

  return (
    <section className="relative w-full shrink-0 overflow-x-hidden overflow-y-hidden bg-[#956EFE] pt-6 pb-0 md:bg-white md:py-8 md:pb-8 lg:py-10 lg:pb-10 min-w-0">
      {/* Mobile (< md): layered backdrop aligned with desktop hero */}
      <div className="pointer-events-none absolute inset-0 z-0 md:hidden" aria-hidden>
        <Image
          src={MOBILE_HERO_BG_URL}
          alt=""
          fill
          className="object-cover object-right-top opacity-[0.22]"
          sizes="100vw"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden md:hidden" aria-hidden>
        <div className="absolute -left-[18%] top-[8%] h-[min(280px,70vw)] w-[min(280px,70vw)] rounded-full bg-white/55 blur-[72px]" />
        <div className="absolute left-[35%] top-[45%] h-[min(200px,50vw)] w-[min(240px,55vw)] rounded-full bg-white/40 blur-[56px]" />
        <div className="absolute -right-[12%] bottom-[28%] h-[min(260px,62vw)] w-[min(260px,62vw)] rounded-full bg-white/38 blur-[64px]" />
        <div className="absolute right-[22%] top-[6%] h-[min(120px,32vw)] w-[min(160px,38vw)] rounded-full bg-white/45 blur-[40px]" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-[2] md:hidden"
        style={{
          background:
            "linear-gradient(180deg, #956EFE 0%, rgba(149, 110, 254, 0.45) 48%, #FFFFFF 100%)",
        }}
        aria-hidden
      />

      {/* Blurred blue glow — tablet/desktop only (mobile uses lavender wash above) */}
      <div
        className="pointer-events-none absolute left-1/2 top-8 z-[1] hidden h-[305px] w-[312px] -translate-x-1/2 rounded-full opacity-[0.18] blur-[197px] md:left-[45%] md:top-12 md:block md:translate-x-0"
        style={{ backgroundColor: "rgb(61, 159, 251)" }}
      />

      <div className="container relative z-[3] mx-auto max-w-6xl px-4 md:px-6 min-w-0">
        {/* Hero content – text + image, aligned with What's PathPicker section */}
        <div className="flex w-full justify-center overflow-visible">
          <div className="flex max-w-[1400px] origin-center flex-col items-center gap-8 lg:-translate-x-[60%] lg:scale-[1.3] lg:flex-row lg:items-center lg:gap-12">
            {/* Left: Copy – fixed width so typewriter doesn’t shift image */}
            <div className="flex w-[min(100%,320px)] flex-col items-center gap-4 text-center sm:w-[360px] sm:gap-5 lg:w-[400px] lg:min-w-[400px] lg:shrink-0 lg:items-start lg:text-left">
              <HeroStudentsMatchedWidget />
              <div className="flex w-full flex-col gap-2.5 md:gap-5">
              {/* Fixed height/width so title doesn’t bounce as typewriter runs */}
              <div className="min-h-[4.5rem] w-full sm:min-h-[5.25rem] md:min-h-[6rem] lg:min-h-[6.25rem]">
                <h1 className="w-full text-[2.5rem] font-bold leading-[1.2] tracking-tight text-white sm:text-[3rem] [text-shadow:0_2px_24px_rgba(76,29,149,0.42)] md:text-[3.5rem] md:text-[#181A1D] md:[text-shadow:none] lg:text-[3.75rem]">
                  <span className="block w-full text-center lg:text-left">Find your</span>
                  <span className="relative block w-full text-center lg:text-left" style={{ minHeight: "1.2em" }}>
                    <span className="invisible" aria-hidden>Dream School</span>
                    <span className="absolute left-1/2 top-0 -translate-x-1/2 whitespace-nowrap text-[#F5F3FF] md:text-[#956EFE] lg:left-0 lg:translate-x-0">
                      {displayedText}
                    </span>
                  </span>
                </h1>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-8 lg:justify-start">
                <Link
                  href="http://my.pathpicker.com/archetype"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-16 min-w-[200px] items-center justify-center gap-2 rounded-full border-2 border-[#181A1D] bg-white px-8 text-base font-medium text-[#181A1D] shadow-[3px_3px_0_0_#181A1D] transition hover:bg-gray-50"
                >
                  <span>🎯</span>
                  College Match Quiz
                </Link>
              </div>
              </div>
            </div>

            {/* Anchor for desktop overlays; inner mobile slab is true 100vw for logo reel + portrait */}
            <div className="relative mx-auto min-h-[400px] w-full max-w-[570px] overflow-x-clip overflow-y-visible sm:min-h-[450px] md:h-[500px] md:max-w-[660px] lg:h-[540px] lg:max-w-[690px]">
              <div className="relative isolate left-1/2 z-[2] h-[400px] w-screen max-w-[100vw] shrink-0 -translate-x-1/2 overflow-hidden rounded-2xl sm:h-[450px] md:hidden">
                <HeroCollegeLogoReels
                  idPrefix="mobile-hero"
                  className="rounded-none"
                  rowGapClassName="gap-2 py-3"
                  spacerClassName="inline-block w-8 shrink-0 sm:w-11"
                  tileClassName="relative block size-10 shrink-0 overflow-hidden rounded-xl shadow-[0_2px_12px_rgba(76,29,149,0.35)] ring-1 ring-white/20 sm:size-11"
                  trackPaddingClassName="px-0"
                  rowWrapperClassName="w-full overflow-hidden opacity-[0.58] saturate-[0.92] brightness-105"
                  imageSizes="(min-width:640px) 44px, 40px"
                />
                <div className="absolute inset-0 z-10 overflow-hidden rounded-2xl">
                  <Image
                    src={HERO_IMAGE}
                    alt="Traveler"
                    fill
                    priority
                    fetchPriority="high"
                    className="translate-y-3 object-cover object-[center_11%] sm:translate-y-4"
                    sizes="100vw"
                  />
                </div>
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] h-[36%] rounded-b-2xl bg-gradient-to-t from-white via-white/45 to-transparent"
                />
              </div>
            {/* Hero image - desktop (md and up) */}
            <div className="absolute inset-0 z-10 hidden overflow-hidden rounded-2xl md:block">
              <Image
                src={HERO_IMAGE_DESKTOP}
                alt="Traveler"
                fill
                priority
                fetchPriority="high"
                className="object-contain"
                style={{ objectPosition: "center 20%" }}
                sizes="(min-width: 1024px) 690px, (min-width: 768px) 660px, 630px"
                unoptimized
              />
            </div>

            {/* 82% Ivy League Match - over image, top-right (tablet/desktop only) */}
            <div className="animate-float absolute right-1 top-[18%] z-20 hidden min-w-[100px] rounded-lg bg-white p-2 shadow-[0_9px_59px_rgba(174,165,114,0.08)] md:flex md:min-w-[120px] md:right-2 md:p-2.5 lg:right-3" style={{ animationDelay: "0s" }}>
              <div className="flex items-center gap-2">
                <div className="relative h-5 w-5 shrink-0 overflow-hidden rounded">
                  <Image
                    src="https://storage.googleapis.com/images_592/images.png"
                    alt=""
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <p className="text-xs font-bold leading-tight md:text-sm" style={{ color: "#956EFE" }}>
                  82% Ivy League Match
                </p>
              </div>
            </div>

            {/* Social Partier - over image, bottom-right (tablet/desktop only) */}
            <div className="animate-float absolute bottom-[12%] right-1 z-20 hidden items-center gap-2 rounded-full bg-white px-3 py-2 shadow-[0_42px_26px_rgba(0,0,0,0.05)] md:flex md:right-3 md:px-4 md:py-2.5" style={{ animationDelay: "1s" }}>
              <span className="text-lg md:text-xl">🎉</span>
              <span className="text-xs font-normal text-[#3A3E46] md:text-sm">
                Social Partier
              </span>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Soft pink glow bottom-right – inside section bounds so no layout gap */}
      <div
        className="pointer-events-none absolute bottom-0 right-0 z-[1] hidden h-[260px] w-[400px] opacity-10 md:-right-20 md:block"
        style={{
          background:
            "radial-gradient(ellipse at center, rgb(250, 134, 183) 0%, transparent 70%)",
        }}
      />
    </section>
  );
}
