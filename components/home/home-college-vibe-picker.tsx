"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { useCollegeMatchQuizUrl } from "@/hooks/useCollegeMatchQuizUrl";
import {
  HOME_COLLEGE_VIBE_PICKS,
  HOME_COLLEGE_VIBE_PICKS_DESKTOP,
  HOME_COLLEGE_VIBE_SECTION_TITLE,
  type HomeCollegeVibePick,
} from "@/lib/home-college-vibe-picks";

function VibePickLink({ pick }: { pick: HomeCollegeVibePick }) {
  const collegeMatchQuizUrl = useCollegeMatchQuizUrl();

  return (
    <Link
      href={collegeMatchQuizUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={pick.label}
      className="flex w-full min-w-0 items-center gap-3.5 rounded-full bg-[#F3F3F5] py-3 pl-3 pr-5 transition hover:bg-[#EBEBEF] hover:shadow-[0_4px_16px_rgba(24,6,46,0.06)] active:scale-[0.99] sm:gap-4 sm:py-3.5 sm:pl-3.5 sm:pr-6"
    >
      <span className="relative h-11 w-11 shrink-0 sm:h-12 sm:w-12">
        <Image
          src={pick.imageSrc}
          alt=""
          width={48}
          height={48}
          aria-hidden
          className="h-full w-full object-contain object-center"
        />
      </span>
      <span className="min-w-0 font-[family-name:var(--font-poppins)] text-[1rem] font-semibold leading-tight text-[#18062E]">
        {pick.label}
      </span>
    </Link>
  );
}

export function HomeCollegeVibePicker() {
  return (
    <section
      aria-label="Campus vibe college match options"
      className="w-full bg-white px-4 pb-10 pt-8 md:px-6 md:pb-12 md:pt-10 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-[family-name:var(--font-poppins)] text-[1.375rem] font-bold leading-[1.2] tracking-[-0.03em] text-[#18062E] md:text-[1.75rem] lg:text-[2rem]">
          {HOME_COLLEGE_VIBE_SECTION_TITLE}
          <span className="sr-only"> schools matched to your student archetype on PathPicker</span>
        </h2>

        {/* Mobile: vertical scroll list (Busuu-style) */}
        <div className="relative mx-auto mt-6 max-w-md md:hidden">
          <ul
            className="marquee-fade-edges-y flex max-h-[min(19.5rem,52vh)] flex-col gap-3 overflow-y-auto overscroll-y-contain pr-1 [-ms-overflow-style:none] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#D1D1D6] [&::-webkit-scrollbar-track]:bg-transparent"
            role="list"
          >
            {HOME_COLLEGE_VIBE_PICKS.map((pick) => (
              <li key={pick.id} role="listitem" className="shrink-0">
                <VibePickLink pick={pick} />
              </li>
            ))}
          </ul>
          <div
            className="pointer-events-none absolute bottom-2 left-1/2 flex -translate-x-1/2 rounded-full bg-white/95 p-1 shadow-sm ring-1 ring-black/[0.06]"
            aria-hidden
          >
            <ChevronDown className="h-5 w-5 text-[#9CA3AF]" strokeWidth={2} />
          </div>
        </div>

        {/* Desktop: wrapped grid without Study Abroad */}
        <ul
          className="mx-auto mt-8 hidden w-full max-w-5xl grid-cols-[repeat(auto-fill,minmax(13.5rem,1fr))] gap-4 md:grid lg:max-w-[52rem] lg:gap-5"
          role="list"
        >
          {HOME_COLLEGE_VIBE_PICKS_DESKTOP.map((pick) => (
            <li key={pick.id} role="listitem" className="w-full">
              <VibePickLink pick={pick} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
