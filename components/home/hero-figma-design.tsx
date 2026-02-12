"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const ROTATING_WORDS = ["archetype", "scholarships", "path"];
const TYPE_DELAY_MS = 90;
const HOLD_DELAY_MS = 1800;
const DELETE_DELAY_MS = 55;

const HERO_IMAGE = "https://my.pathpicker.com/images/hero-student.png";

const GREEKER_URL = "https://storage.googleapis.com/images_592/Greeker%20(3).png";

const PLACEHOLDER_LOGOS = [
  "https://storage.googleapis.com/images_592/P1laceholder%20Logo%404x.png",
  "https://storage.googleapis.com/images_592/Placeholder%20Log7o%404x.png",
  "https://storage.googleapis.com/images_592/Placeholder%20Logo%404x.png",
  GREEKER_URL,
];

function LogoSlot({ src }: { src: string }) {
  const isGreeker = src === GREEKER_URL;
  return (
    <div
      className={`flex shrink-0 items-center justify-center px-4 md:px-6 ${isGreeker ? "pt-[0.6rem]" : ""}`}
    >
      <Image
        src={src}
        alt=""
        width={isGreeker ? 230 : 200}
        height={isGreeker ? 138 : 120}
        className={
          isGreeker
            ? "h-[5.75rem] w-auto object-contain md:h-[6.9rem]"
            : "h-20 w-auto object-contain md:h-24"
        }
        unoptimized
      />
    </div>
  );
}

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
    <section className="relative w-full overflow-x-hidden overflow-y-visible bg-white pt-4 md:pt-12">
      {/* Blurred blue glow */}
      <div
        className="absolute left-1/2 top-8 -translate-x-1/2 h-[305px] w-[312px] rounded-full opacity-[0.18] blur-[197px] md:left-[45%] md:top-12"
        style={{ backgroundColor: "rgb(61, 159, 251)" }}
      />

      <div className="container relative mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:gap-12">
          {/* Left: Content */}
          <div className="flex w-full max-w-[421px] flex-1 flex-col items-center gap-6 md:items-start md:gap-8 lg:pt-6">
            {/* Character logos marquee */}
            <div className="marquee-fade-edges -mx-2 max-w-md overflow-hidden px-2 py-3 md:max-w-lg">
              <div className="flex w-max animate-marquee-x">
                {[...PLACEHOLDER_LOGOS, ...PLACEHOLDER_LOGOS].map((src, i) => (
                  <LogoSlot key={i} src={src} />
                ))}
              </div>
            </div>

            {/* 5-star 40k+ Students Matched - above headline */}
            <div className="inline-flex w-fit items-center gap-2">
              <div className="flex gap-0.5 text-pathpicker-gold" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <span className="text-sm font-medium text-[#181A1D]">
                40k+ Students Matched
              </span>
            </div>

            {/* Headline with typewriter rotating word (no cursor) */}
            <h1 className="text-center text-[1.75rem] font-bold leading-[1.2] tracking-tight text-[#181A1D] sm:text-3xl md:text-left md:text-4xl lg:text-5xl">
              Find your{" "}
              <br className="hidden md:block" />
              <span className="md:whitespace-nowrap">
                student{" "}
                <span className="inline-block min-w-[10ch] text-[#956EFE] sm:min-w-[12ch]">
                  {displayedText}
                </span>
              </span>
            </h1>

            {/* Buttons */}
            <div className="flex flex-row flex-nowrap gap-3 sm:gap-4">
              <Button
                asChild
                className="shrink-0 min-h-[52px] rounded-full bg-[#956EFE] px-6 py-4 text-base text-[#EEE] shadow-[0_2px_5px_rgba(149,110,254,0.2)] hover:opacity-95 sm:min-h-[60px] sm:px-10 sm:py-5 sm:text-lg"
              >
                <Link href="/student-archetype-quiz" className="flex items-center gap-2">
                  <span>🎭</span>
                  Archetype Quiz
                </Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="shrink-0 min-h-[52px] rounded-full border-[#EEE] bg-white px-6 py-4 text-base text-[#22231B] hover:bg-gray-50 sm:min-h-[60px] sm:px-10 sm:py-5 sm:text-lg"
              >
                <Link href="/scholarship-quiz" className="flex items-center gap-2">
                  <span>💸</span>
                  Scholarship Quiz
                </Link>
              </Button>
            </div>
          </div>

          {/* Right: Image + decorative elements */}
          <div className="relative w-full max-w-[580px] lg:min-h-[520px]">
            {/* Blue circle */}
            <div
              className="absolute right-0 top-0 hidden h-[320px] w-[320px] rounded-full opacity-100 md:block lg:right-8 lg:h-[400px] lg:w-[400px] xl:h-[528px] xl:w-[528px]"
              style={{ backgroundColor: "rgb(200, 185, 255)" }}
            />

            {/* Hero image */}
            <div className="relative z-10 mx-auto mt-4 aspect-[3/4] max-h-[480px] w-full max-w-[400px] overflow-hidden rounded-2xl md:absolute md:right-0 md:top-8 md:mt-0 md:max-h-[520px] md:max-w-[420px] lg:max-h-[560px] lg:max-w-[460px]">
              <Image
                src={HERO_IMAGE}
                alt="Traveler"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 420px"
                priority
              />
            </div>

            {/* 82% Ivy League Match overlay */}
            <div className="animate-float absolute right-2 top-[45%] z-20 flex min-w-[120px] rounded-lg bg-white p-2 shadow-[0_9px_59px_rgba(174,165,114,0.08)] md:min-w-[130px] md:p-2.5 lg:right-4" style={{ animationDelay: "0s" }}>
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
                <p className="text-sm font-bold leading-tight" style={{ color: "#956EFE" }}>
                  82% Ivy League Match
                </p>
              </div>
            </div>

            {/* $32,144 Scholarships Matched pill */}
            <div className="animate-float absolute bottom-[28%] left-2 z-20 flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-[0_42px_26px_rgba(0,0,0,0.05)] md:left-12 md:px-5 md:py-2.5 lg:left-24" style={{ animationDelay: "0.5s" }}>
              <span className="text-xl">💰</span>
              <span className="text-sm font-normal text-[#3A3E46]">
                $32,144 Scholarships Matched
              </span>
            </div>

            {/* Social Partier pill */}
            <div className="animate-float absolute bottom-[12%] right-2 z-20 flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-[0_42px_26px_rgba(0,0,0,0.05)] md:right-8 md:px-5 md:py-2.5" style={{ animationDelay: "1s" }}>
              <span className="text-xl">🎉</span>
              <span className="text-sm font-normal text-[#3A3E46]">
                Social Partier
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Soft pink glow bottom-right */}
      <div
        className="pointer-events-none absolute -bottom-20 right-0 h-[260px] w-[400px] opacity-10 md:-right-20"
        style={{
          background:
            "radial-gradient(ellipse at center, rgb(250, 134, 183) 0%, transparent 70%)",
        }}
      />
    </section>
  );
}
