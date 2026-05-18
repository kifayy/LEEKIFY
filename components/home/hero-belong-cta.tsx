"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { BRAND_MEDIA } from "@/components/landing/constants";
import { CAREER_MATCH_QUIZ_URL, COLLEGE_MATCH_QUIZ_URL } from "@/lib/constants";
import { useHeroAudience } from "@/components/home/hero-audience-context";
import { HERO_PURPLE, HERO_PURPLE_RGB, isCareerAudience } from "@/components/home/hero-audience-theme";

/** Same facepile CDN as testimonials / StudentsFinding badge (first four in hero strip). */
const STUDENT_AVATARS = BRAND_MEDIA.testimonialAvatars.slice(0, 4).map((src) => ({
  src,
  alt: "",
}));

/** Avatars + 5★ + “50k+ matched” — single row (faces before stars), compact. */
export function HeroStudentsMatchedWidget({ className }: { className?: string }) {
  const { audience } = useHeroAudience();
  const career = isCareerAudience(audience);

  return (
    <div
      className={cn(
        "flex min-w-0 flex-nowrap items-center justify-center gap-1.5 pt-0.5 md:gap-2 lg:justify-start",
        className
      )}
    >
      <div className="flex shrink-0 justify-center -space-x-1 rtl:space-x-reverse lg:justify-start">
        {STUDENT_AVATARS.map(({ src, alt }, i) => (
          <div
            key={src}
            className={cn(
              "relative h-6 w-6 shrink-0 overflow-hidden rounded-full ring-1 md:h-7 md:w-7",
              career
                ? "ring-teal-100/90 shadow-[0_1px_3px_rgba(13,148,136,0.22)]"
                : "ring-white shadow-[0_1px_3px_rgba(149,109,254,0.14)]"
            )}
            style={{ zIndex: STUDENT_AVATARS.length - i }}
          >
            <Image src={src} alt={alt} fill className="object-cover" sizes="28px" />
          </div>
        ))}
      </div>
      <div className="flex min-w-0 shrink items-center gap-1 whitespace-nowrap md:gap-1.5">
        <div
          className="flex shrink-0 items-center gap-px text-[#EDC531] drop-shadow-[0_0_4px_rgba(237,197,49,0.45)]"
          aria-hidden
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="h-2 w-2 shrink-0 fill-current md:h-2.5 md:w-2.5"
            />
          ))}
        </div>
        <span
          className={cn(
            "font-[family-name:var(--font-poppins)] text-[0.5625rem] font-medium leading-tight tracking-[-0.02em] text-white/80 md:text-[0.625rem]",
            career ? "md:text-teal-950/90" : "md:text-violet-950/90"
          )}
        >
          50k+ matched
        </span>
      </div>
    </div>
  );
}

export function HeroBelongCta() {
  const { audience } = useHeroAudience();
  const career = isCareerAudience(audience);

  const pillLine = career ? "See Where You'll Thrive" : "See Where You Belong";
  const quizLabel = career ? "Career Match Quiz" : "College Match Quiz";
  const quizHref = career ? CAREER_MATCH_QUIZ_URL : COLLEGE_MATCH_QUIZ_URL;

  return (
    <div className="mx-auto flex w-full max-w-[38rem] flex-col gap-5 lg:mx-0 lg:max-w-none lg:gap-8">
      <div className="flex justify-center lg:justify-start">
        <div
          className={cn(
            "flex w-full max-w-[min(100%,420px)] min-h-[52px] items-center gap-2 rounded-full border bg-white p-1.5 pl-4 md:min-h-[54px] md:gap-3 md:pl-5 lg:max-w-[440px]",
            career
              ? "border-teal-600/25 shadow-[0_2px_12px_rgba(13,148,136,0.14)]"
              : "border-[#956DFE]/25 shadow-[0_2px_12px_rgba(149,109,254,0.12)]"
          )}
        >
          <span className="min-w-0 flex-1 truncate py-2 text-left font-[family-name:var(--font-poppins)] text-[0.9375rem] font-medium tracking-[-0.02em] text-slate-500 md:text-base md:text-slate-600">
            {pillLine}
          </span>
          <Link
            href={quizHref}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex shrink-0 items-center gap-2 rounded-full border-2 px-4 py-2 text-[0.8125rem] font-semibold text-white transition hover:opacity-95 md:px-5 md:py-2.5 md:text-[0.9375rem]",
              career && "border-teal-800 bg-teal-600 hover:opacity-[0.96]",
              !career && "border-[#8568ED]"
            )}
            style={
              career
                ? { boxShadow: "0 4px 16px rgba(13, 148, 136, 0.35)" }
                : { backgroundColor: HERO_PURPLE, boxShadow: `0 4px 16px rgba(${HERO_PURPLE_RGB}, 0.35)` }
            }
          >
            <span aria-hidden>🎯</span>
            {quizLabel}
          </Link>
        </div>
      </div>

      <HeroStudentsMatchedWidget />
    </div>
  );
}
