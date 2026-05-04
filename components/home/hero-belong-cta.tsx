"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { BRAND_MEDIA } from "@/components/landing/constants";

const ARCHETYPE_QUIZ_URL = "http://my.pathpicker.com/archetype";

/** Same facepile CDN as testimonials / StudentsFinding badge (first four in hero strip). */
const STUDENT_AVATARS = BRAND_MEDIA.testimonialAvatars.slice(0, 4).map((src) => ({
  src,
  alt: "",
}));

/** Avatars + 5★ + “42.3k+ students matched” — single row (faces before stars), compact. */
export function HeroStudentsMatchedWidget({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-nowrap items-center justify-center gap-2 pt-1 md:gap-2.5 lg:justify-start",
        className
      )}
    >
      <div className="flex shrink-0 justify-center -space-x-1.5 rtl:space-x-reverse lg:justify-start">
        {STUDENT_AVATARS.map(({ src, alt }, i) => (
          <div
            key={src}
            className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full ring-1 ring-white shadow-[0_1px_5px_rgba(76,29,149,0.18)] md:h-9 md:w-9"
            style={{ zIndex: STUDENT_AVATARS.length - i }}
          >
            <Image src={src} alt={alt} fill className="object-cover" sizes="36px" />
          </div>
        ))}
      </div>
      <div className="flex min-w-0 shrink items-center gap-1.5 whitespace-nowrap md:gap-2">
        <div
          className="flex shrink-0 items-center gap-px text-[#EDC531] drop-shadow-[0_0_5px_rgba(237,197,49,0.55)]"
          aria-hidden
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="h-2.5 w-2.5 shrink-0 fill-current md:h-3 md:w-3"
            />
          ))}
        </div>
        <span className="font-[family-name:var(--font-poppins)] text-[0.625rem] font-medium leading-tight tracking-[-0.02em] text-violet-950/85 md:text-[0.6875rem] md:text-violet-950/90">
          42.3k+ students matched
        </span>
      </div>
    </div>
  );
}

export function HeroBelongCta() {
  return (
    <div className="mx-auto flex w-full max-w-[38rem] flex-col gap-5 lg:mx-0 lg:max-w-none lg:gap-8">
      <div className="flex justify-center lg:justify-start">
        <div className="flex w-full max-w-[min(100%,420px)] min-h-[52px] items-center gap-2 rounded-full border border-[#956EFE]/25 bg-white p-1.5 pl-4 shadow-[0_2px_12px_rgba(149,110,254,0.12)] md:min-h-[54px] md:gap-3 md:pl-5 lg:max-w-[440px]">
          <span className="min-w-0 flex-1 truncate py-2 text-left font-[family-name:var(--font-poppins)] text-[0.9375rem] font-medium tracking-[-0.02em] text-slate-500 md:text-base md:text-slate-600">
            See Where You Belong
          </span>
          <Link
            href={ARCHETYPE_QUIZ_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-[#181A1D] bg-white px-4 py-2 text-[0.8125rem] font-semibold text-[#181A1D] shadow-[2px_2px_0_0_#181A1D] transition hover:bg-gray-50 md:px-5 md:py-2.5 md:text-[0.9375rem]"
          >
            <span aria-hidden>🎭</span>
            Archetype Quiz
          </Link>
        </div>
      </div>

      <HeroStudentsMatchedWidget />
    </div>
  );
}
