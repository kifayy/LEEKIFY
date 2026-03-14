"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

const ROTATING_WORDS = ["Scholarship", "Abroad", "School", "Path"];
const TYPE_DELAY_MS = 90;
const HOLD_DELAY_MS = 1800;
const DELETE_DELAY_MS = 55;

const HERO_IMAGE = "https://my.pathpicker.com/images/hero-student.png";
const HERO_IMAGE_DESKTOP = "https://storage.googleapis.com/images_592/bsa.png";

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
    <section className="relative w-full shrink-0 overflow-x-hidden overflow-y-hidden bg-[#F3F0FF] pt-6 pb-0 md:bg-white md:py-8 md:pb-8 lg:py-10 lg:pb-10 min-w-0">
      {/* Blurred blue glow */}
      <div
        className="absolute left-1/2 top-8 -translate-x-1/2 h-[305px] w-[312px] rounded-full opacity-[0.18] blur-[197px] md:left-[45%] md:top-12"
        style={{ backgroundColor: "rgb(61, 159, 251)" }}
      />

      <div className="container relative mx-auto max-w-6xl px-4 md:px-6 min-w-0">
        {/* Hero content – text + image, aligned with What's PathPicker section */}
        <div className="flex w-full justify-center overflow-visible">
          <div className="flex max-w-[1400px] origin-center flex-col items-center gap-8 lg:-translate-x-[60%] lg:scale-[1.3] lg:flex-row lg:items-center lg:gap-12">
            {/* Left: Copy – fixed width so typewriter doesn’t shift image */}
            <div className="flex w-[min(100%,320px)] flex-col items-center gap-5 text-center sm:w-[360px] lg:w-[400px] lg:min-w-[400px] lg:shrink-0 lg:items-start lg:text-left">
              <div className="inline-flex items-center gap-1.5">
                <div className="flex gap-0.5 text-pathpicker-gold" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-[11px] w-[11px] fill-current" />
                  ))}
                </div>
                <span className="text-[0.7rem] font-medium text-[#181A1D]">
                  40k+ Students Matched
                </span>
              </div>
              {/* Fixed height/width so title doesn’t bounce as typewriter runs */}
              <div className="min-h-[4.5rem] w-full sm:min-h-[5.25rem] md:min-h-[6rem] lg:min-h-[6.25rem]">
                <h1 className="w-full text-[2.5rem] font-bold leading-[1.2] tracking-tight text-[#181A1D] sm:text-[3rem] md:text-[3.5rem] lg:text-[3.75rem]">
                  <span className="block w-full text-center lg:text-left">Find your future</span>
                  <span className="relative block w-full text-center lg:text-left" style={{ minHeight: "1.2em" }}>
                    <span className="invisible" aria-hidden>Scholarship</span>
                    <span className="absolute left-1/2 top-0 -translate-x-1/2 whitespace-nowrap text-[#956EFE] lg:left-0 lg:translate-x-0">
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
                  className="inline-flex h-16 min-w-[200px] items-center justify-center gap-2 rounded-[15px] border-2 border-[#181A1D] bg-[#956EFE] px-8 text-base font-medium text-white shadow-[3px_3px_0_0_#181A1D] transition hover:opacity-95"
                >
                  <span>🎭</span>
                  Archetype Quiz
                </Link>
                <Link
                  href="https://awarded.short.gy/9iTh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-16 min-w-[200px] items-center justify-center gap-2 rounded-[15px] border-2 border-[#181A1D] bg-white px-8 text-base font-medium text-[#181A1D] shadow-[3px_3px_0_0_#181A1D] transition hover:bg-gray-50"
                >
                  <span>💸</span>
                  Scholarship Quiz
                </Link>
              </div>
            </div>

            {/* Right: BSA image + badges – 1.5x size */}
            <div className="relative h-[400px] w-full max-w-[570px] shrink-0 sm:h-[460px] sm:max-w-[630px] md:h-[500px] md:max-w-[660px] lg:h-[540px] lg:max-w-[690px]">
            {/* Hero image - mobile only (below md) */}
            <div className="relative z-10 h-full w-full overflow-hidden rounded-2xl md:hidden">
              <Image
                src={HERO_IMAGE}
                alt="Traveler"
                fill
                priority
                fetchPriority="high"
                className="object-cover"
                style={{ objectPosition: "center 20%" }}
                sizes="(max-width: 768px) 100vw, 420px"
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

            {/* 82% Ivy League Match - over image, top-right */}
            <div className="animate-float absolute right-1 top-[18%] z-20 flex min-w-[100px] rounded-lg bg-white p-2 shadow-[0_9px_59px_rgba(174,165,114,0.08)] md:min-w-[120px] md:right-2 md:p-2.5 lg:right-3" style={{ animationDelay: "0s" }}>
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

            {/* $32,144 Scholarships Matched - over image, bottom-left */}
            <div className="animate-float absolute bottom-[32%] left-1 z-20 flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-[0_42px_26px_rgba(0,0,0,0.05)] md:left-3 md:px-4 md:py-2.5" style={{ animationDelay: "0.5s" }}>
              <span className="text-lg md:text-xl">💰</span>
              <span className="text-xs font-normal text-[#3A3E46] md:text-sm">
                $32,144 Scholarships Matched
              </span>
            </div>

            {/* Social Partier - over image, bottom-right */}
            <div className="animate-float absolute bottom-[12%] right-1 z-20 flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-[0_42px_26px_rgba(0,0,0,0.05)] md:right-3 md:px-4 md:py-2.5" style={{ animationDelay: "1s" }}>
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
        className="pointer-events-none absolute bottom-0 right-0 h-[260px] w-[400px] opacity-10 md:-right-20"
        style={{
          background:
            "radial-gradient(ellipse at center, rgb(250, 134, 183) 0%, transparent 70%)",
        }}
      />
    </section>
  );
}
