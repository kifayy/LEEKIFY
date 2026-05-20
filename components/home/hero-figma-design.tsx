"use client";

import Link from "next/link";

import { HomeOptimizedImage } from "@/components/home/home-optimized-image";
import { MobileHeroRotatingLine } from "@/components/home/mobile-hero-rotating-line";
import {
  MOBILE_HERO_HEADLINE_CLASS,
  MOBILE_HERO_SUBTEXT_CLASS,
} from "@/components/home/mobile-hero-typography";
import { HERO_PURPLE, HERO_PURPLE_RGB } from "@/components/home/hero-audience-theme";
import { COLLEGE_MATCH_QUIZ_URL } from "@/lib/constants";
import {
  MOBILE_HERO_BULLETS,
  MOBILE_HERO_CTA_LABEL,
  MOBILE_HERO_HEADLINE,
  MOBILE_HERO_SUBTEXT,
} from "@/lib/home-hero-copy";
import { HOME_MOBILE_HERO_FIGMA_ALT } from "@/lib/home-image-seo";
import { MOBILE_HERO_FIGMA_ART_URL } from "@/lib/home-lcp-images";

/**
 * Mobile-only hero (`md:hidden` in `home-hero-with-audience.tsx`).
 */
export function HeroFigmaDesign() {
  return (
    <section
      className="w-full shrink-0 overflow-x-hidden bg-white pb-8 pt-7 min-w-0"
      aria-label="College matching hero"
    >
      <div className="mx-auto flex w-full max-w-[420px] flex-col items-center px-4 text-center">
        <div className="flex w-full flex-col items-center">
          <h1 className={MOBILE_HERO_HEADLINE_CLASS}>{MOBILE_HERO_HEADLINE}</h1>
          <MobileHeroRotatingLine lines={MOBILE_HERO_BULLETS} className="mt-0.5" />
        </div>

        <p className={`${MOBILE_HERO_SUBTEXT_CLASS} mt-5 max-w-[21rem] px-1`}>
          {MOBILE_HERO_SUBTEXT}
        </p>

        <Link
          href={COLLEGE_MATCH_QUIZ_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex h-[3.25rem] w-full max-w-[18rem] items-center justify-center rounded-full px-8 font-[family-name:var(--font-inter)] text-[1.0625rem] font-semibold text-white transition hover:opacity-95 active:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#943DC8]"
          style={{
            backgroundColor: HERO_PURPLE,
            boxShadow: `0 4px 20px rgba(${HERO_PURPLE_RGB}, 0.28)`,
          }}
        >
          {MOBILE_HERO_CTA_LABEL}
        </Link>

        <div className="relative mt-8 aspect-square w-full max-w-[min(100vw-2rem,360px)]">
          <HomeOptimizedImage
            src={MOBILE_HERO_FIGMA_ART_URL}
            alt={HOME_MOBILE_HERO_FIGMA_ALT}
            fill
            priority
            fetchPriority="high"
            className="object-contain object-center"
            sizes="(max-width: 767px) min(100vw - 2rem, 360px)"
          />
        </div>
      </div>
    </section>
  );
}
