"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

const BANNER_BG = "rgb(228, 224, 248)"; // Figma 0.896, 0.878, 0.973
const HERO_IMAGE_URL =
  "https://storage.googleapis.com/images_592/bas.png";

const TYPEWRITER_WORDS = ["scholarships", "archetype", "path"];
const TYPEWRITER_COLOR = "#956EFE";

export function DesktopHeroBanner() {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentWord = TYPEWRITER_WORDS[wordIndex];

  useEffect(() => {
    if (!isDeleting && charIndex === currentWord.length) {
      const pause = setTimeout(() => setIsDeleting(true), 1800);
      return () => clearTimeout(pause);
    }
    const delay = isDeleting ? 60 : 120;
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentWord.length) setCharIndex((c) => c + 1);
      } else {
        if (charIndex > 0) {
          setCharIndex((c) => c - 1);
        } else {
          setIsDeleting(false);
          setWordIndex((w) => (w + 1) % TYPEWRITER_WORDS.length);
        }
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, wordIndex, currentWord.length]);

  const displayText = currentWord.slice(0, charIndex);

  return (
    <section
      className="hidden w-full min-w-0 md:block"
      style={{ backgroundColor: BANNER_BG }}
      aria-label="Hero"
    >
      <div className="container relative mx-auto flex max-w-[1400px] flex-col items-center px-4 py-12 md:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:py-16">
        {/* Left: copy + CTAs */}
        <div className="flex max-w-[1104px] flex-1 flex-col gap-6 text-center lg:max-w-[55%] lg:text-left">
          <div className="flex flex-col items-center gap-1 lg:items-start">
            <div className="flex items-center gap-1 text-pathpicker-gold" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-current" />
              ))}
            </div>
            <span className="text-sm font-medium text-[#181A1D]">
              40k+ Students Matched
            </span>
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-[#181A1D] md:text-5xl lg:text-[3.5rem]">
            Find your
            <br />
            <span
              className="inline-block min-w-[0.5em] border-r-2 border-[#956EFE] pr-0.5 align-baseline animate-pulse"
              style={{ color: TYPEWRITER_COLOR }}
              aria-live="polite"
            >
              {displayText}
            </span>
          </h1>

          <div className="flex flex-col gap-10">
            <p
              className="max-w-[554px] text-base leading-relaxed md:text-lg"
              style={{ color: "#58595D" }}
            >
              Students who use PathPicker save like crazy.
            </p>

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
                Scholarship Quiz
              </Link>
            </div>
          </div>
        </div>

        {/* Right: hero image (25% smaller than previous) + floating tags */}
        <div className="relative mt-8 h-[315px] w-full max-w-[450px] shrink-0 lg:mt-0 lg:h-[473px] lg:max-w-[563px] xl:h-[585px] xl:max-w-[731px]">
          <div className="absolute inset-0 overflow-hidden rounded-lg shadow-[0_4px_4px_-9px_rgba(0,0,0,0.09)]">
            <Image
              src={HERO_IMAGE_URL}
              alt=""
              fill
              className="object-contain"
              style={{ objectPosition: "center 20%" }}
              sizes="(min-width: 1280px) 731px, (min-width: 1024px) 563px, 450px"
              priority
              unoptimized
            />
          </div>

          {/* 82% Ivy League Match - over image, top-right */}
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

          {/* $32,144 Scholarships Matched - over image, bottom-left */}
          <div className="animate-float absolute bottom-[32%] left-2 z-20 flex items-center gap-2 rounded-full bg-white px-4 py-2.5 shadow-[0_42px_26px_rgba(0,0,0,0.05)] lg:left-4" style={{ animationDelay: "0.5s" }}>
            <span className="text-xl">💰</span>
            <span className="text-sm font-normal text-[#3A3E46]">
              $32,144 Scholarships Matched
            </span>
          </div>

          {/* Social Partier - over image, bottom-right (shifted up and left slightly) */}
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
