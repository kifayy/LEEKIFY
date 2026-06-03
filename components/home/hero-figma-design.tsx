"use client";

import Image from "next/image";
import Link from "next/link";

import { MobileHeroRotatingLine } from "@/components/home/mobile-hero-rotating-line";
import {
  MOBILE_HERO_HEADLINE_CLASS,
  MOBILE_HERO_SUBTEXT_CLASS,
} from "@/components/home/mobile-hero-typography";
import { HERO_SIMPLIFIED_GRADIENT } from "@/components/home/hero-audience-theme";
import { HeroTrustpilotProof } from "@/components/home/hero-trustpilot-proof";
import { COLLEGE_MATCH_QUIZ_URL } from "@/lib/constants";
import { trackLandingCtaToQuiz } from "@/lib/snapchat-pixel";
import {
  MOBILE_HERO_BULLETS,
  MOBILE_HERO_CTA_LABEL,
  MOBILE_HERO_HEADLINE,
  MOBILE_HERO_SUBTEXT,
} from "@/lib/home-hero-copy";
import { HOME_MOBILE_HERO_FIGMA_ALT } from "@/lib/home-image-seo";
import {
  HOME_HERO_IMAGE_QUALITY,
  HOME_HERO_USE_PREOPTIMIZED_ASSETS,
  MOBILE_HERO_FIGMA_ART_HEIGHT,
  MOBILE_HERO_FIGMA_ART_URL,
  MOBILE_HERO_FIGMA_ART_WIDTH,
} from "@/lib/home-lcp-images";

/**
 * Mobile-only hero (`md:hidden` in `home-hero-with-audience.tsx`).
 */
export function HeroFigmaDesign() {
  return (
    <section
      className="w-full shrink-0 overflow-x-hidden pb-8 pt-32 min-w-0 md:hidden"
      aria-label="College matching hero"
      style={{ background: HERO_SIMPLIFIED_GRADIENT }}
    >
      <div className="mx-auto flex w-full max-w-[420px] flex-col items-center px-4 text-center">
        <div className="flex w-full flex-col items-center">
          <h1 className="flex w-full flex-col items-center text-balance text-white">
            <span className={`${MOBILE_HERO_HEADLINE_CLASS} !text-white`}>
              {MOBILE_HERO_HEADLINE}
            </span>
            <MobileHeroRotatingLine
              lines={MOBILE_HERO_BULLETS}
              className="-mt-0.5 [&_span]:!text-white"
            />
          </h1>
        </div>

        <p
          className={`${MOBILE_HERO_SUBTEXT_CLASS} mt-6 max-w-[22rem] px-1 text-white/90 sm:max-w-[24rem]`}
        >
          {MOBILE_HERO_SUBTEXT}
        </p>

        <Link
          href={COLLEGE_MATCH_QUIZ_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackLandingCtaToQuiz()}
          className="mt-6 inline-flex h-[3.25rem] w-full max-w-[18rem] items-center justify-center rounded-full bg-white px-8 font-[family-name:var(--font-inter)] text-[1.0625rem] font-semibold text-[#4E2FFF] shadow-[0_8px_24px_rgba(0,0,0,0.22)] transition hover:opacity-95 active:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {MOBILE_HERO_CTA_LABEL}
        </Link>

        <HeroTrustpilotProof className="mt-5" />

        <div className="relative mt-8 aspect-square w-full max-w-[min(100vw-2rem,360px)]">
          <Image
            src={MOBILE_HERO_FIGMA_ART_URL}
            alt={HOME_MOBILE_HERO_FIGMA_ALT}
            width={MOBILE_HERO_FIGMA_ART_WIDTH}
            height={MOBILE_HERO_FIGMA_ART_HEIGHT}
            unoptimized={HOME_HERO_USE_PREOPTIMIZED_ASSETS}
            quality={HOME_HERO_IMAGE_QUALITY}
            priority
            fetchPriority="high"
            className="h-auto w-full object-contain object-center"
            sizes="(max-width: 767px) min(100vw - 2rem, 360px)"
          />
        </div>
      </div>
    </section>
  );
}
