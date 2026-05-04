"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";

import { HeroStudentDiagonalReel } from "@/components/home/hero-student-diagonal-reel";

const HERO_BG_URL =
  "https://framerusercontent.com/images/ZWl7RlbHmOvw03wGj5AUDAKZB4.jpg";

/** Same asset as mobile `HeroFigmaDesign` hero image */
const HERO_STUDENT_URL = "https://my.pathpicker.com/images/hero-student.png";

const ROTATING_WORDS = ["Scholarship", "Money", "School", "Path"];
const TYPE_MS = 80;
const PAUSE_MS = 2000;
const BACKSPACE_MS = 50;

/** Body copy: readable where the hero fades to white */
const deckClass =
  "max-w-[32rem] text-[0.9375rem] font-normal leading-[1.5] tracking-[-0.01em] text-slate-700 md:text-[1rem] md:leading-[1.52]";

export function DesktopHeroBanner() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = ROTATING_WORDS[wordIndex];

    if (!isDeleting) {
      if (displayText.length < word.length) {
        const t = setTimeout(
          () => setDisplayText(word.slice(0, displayText.length + 1)),
          TYPE_MS
        );
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setIsDeleting(true), PAUSE_MS);
      return () => clearTimeout(t);
    }

    if (displayText.length > 0) {
      const t = setTimeout(
        () => setDisplayText(displayText.slice(0, -1)),
        BACKSPACE_MS
      );
      return () => clearTimeout(t);
    }
    setIsDeleting(false);
    setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
    return undefined;
  }, [wordIndex, displayText, isDeleting]);

  return (
    <div className="hidden w-full md:block md:px-5 md:pb-4 md:pt-6 lg:px-8 lg:pt-8">
      <section
        className="relative flex w-full min-w-0 min-h-[min(95vw,800px)] flex-col overflow-hidden rounded-3xl border border-[#956EFE]/15 bg-white shadow-[0_1px_3px_rgba(149,110,254,0.08)]"
        aria-label="Hero"
      >
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <Image
            src={HERO_BG_URL}
            alt=""
            fill
            className="object-cover object-right-top opacity-[0.22]"
            sizes="(min-width: 768px) 100vw, 0px"
          />
        </div>
        {/* Soft white blobs — texture on lavender (above photo texture, below gradient) */}
        <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden>
          <div className="absolute -left-[12%] top-[12%] h-[min(420px,52vw)] w-[min(420px,52vw)] rounded-full bg-white/55 blur-[88px]" />
          <div className="absolute left-[38%] top-[48%] h-[min(300px,36vw)] w-[min(360px,42vw)] rounded-full bg-white/40 blur-[72px]" />
          <div className="absolute -right-[8%] bottom-[22%] h-[min(380px,45vw)] w-[min(380px,45vw)] rounded-full bg-white/38 blur-[80px]" />
          <div className="absolute right-[24%] top-[8%] h-[min(160px,22vw)] w-[min(200px,26vw)] rounded-full bg-white/45 blur-[48px]" />
        </div>
        <div
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            background:
              "linear-gradient(180deg, #956EFE 0%, rgba(149, 110, 254, 0.45) 48%, #FFFFFF 100%)",
          }}
          aria-hidden
        />
        <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-[1240px] flex-1 flex-col items-center px-4 py-7 md:px-5 lg:grid lg:min-h-[min(95vw,800px)] lg:grid-cols-[minmax(0,1fr)_minmax(280px,min(436px,40vw))] lg:items-stretch lg:gap-x-5 lg:px-6 lg:pb-0 lg:pt-7 xl:max-w-[1280px] xl:gap-x-6">
          {/* Left: Framer-style text stack */}
          <div className="flex w-full max-w-[36rem] flex-1 flex-col gap-[1.125rem] text-center lg:flex-none lg:w-auto lg:max-w-[min(36rem,100%)] lg:self-center lg:min-w-0 lg:text-left">
            <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
              <div className="inline-flex flex-wrap items-center gap-2 rounded-lg py-0.5">
                <div className="flex items-center gap-1 text-pathpicker-gold" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-[0.9375rem] w-[0.9375rem] shrink-0 fill-current md:h-4 md:w-4" />
                  ))}
                </div>
                <span className="text-[0.8125rem] font-medium tracking-[-0.02em] text-white/90 md:text-[0.875rem] [text-shadow:0_1px_2px_rgba(67,56,202,0.35)]">
                  42.3k+ students matched
                </span>
              </div>
            </div>

            <h1
              className="font-[family-name:var(--font-poppins)] text-[clamp(2.625rem,2.95vw+2rem,4.375rem)] font-extrabold leading-[0.96] tracking-[-0.045em] text-white [text-shadow:0_2px_28px_rgba(76,29,149,0.5),0_1px_2px_rgba(55,48,163,0.35)]"
            >
              <span className="block md:whitespace-nowrap">Find your future</span>
              <span className="-mt-[0.04em] block whitespace-nowrap text-[#F5F3FF]">
                {displayText}.
                <span className="animate-pulse font-light text-[#F5F3FF]" aria-hidden>
                  {" "}
                  |
                </span>
              </span>
            </h1>

            <div className={`mx-auto flex w-full flex-col gap-2 lg:mx-0 ${deckClass}`}>
              <p className="m-0">Your student life personalized in one place.</p>
              <p className="m-0">
                We simplify what you need to make the most of your student years.
              </p>
            </div>

            <div className="flex justify-center lg:justify-start">
              <Link
                href="http://my.pathpicker.com/archetype"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[3.625rem] min-w-[11.5rem] items-center justify-center gap-2 rounded-[14px] border-2 border-[#181A1D] bg-[#956EFE] px-7 text-[0.9375rem] font-semibold text-white shadow-[3px_3px_0_0_#181A1D] transition hover:opacity-95"
              >
                <span>🎭</span>
                Archetype Quiz
              </Link>
            </div>
          </div>

          {/* Right: student photo */}
          <div className="relative isolate mt-5 h-[min(52vw,400px)] w-full max-w-[420px] shrink-0 overflow-hidden rounded-2xl md:h-[min(48vw,440px)] md:max-w-[480px] lg:col-start-2 lg:row-start-1 lg:mt-0 lg:h-full lg:min-h-0 lg:w-full lg:max-w-none lg:self-stretch lg:overflow-hidden lg:rounded-none lg:rounded-t-2xl">
            <HeroStudentDiagonalReel />
            <div className="absolute inset-0 z-[10]">
              <Image
                src={HERO_STUDENT_URL}
                alt="Traveler"
                fill
                priority
                fetchPriority="high"
                className="object-cover object-[center_20%] lg:scale-100 lg:object-[38%_24%]"
                sizes="(min-width: 1024px) 460px, (min-width: 768px) 420px, 100vw"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
