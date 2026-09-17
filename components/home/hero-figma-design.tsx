"use client";

import Image from "next/image";

import { MobileHeroRotatingLine } from "@/components/home/mobile-hero-rotating-line";
import {
  MOBILE_HERO_HEADLINE_CLASS,
  MOBILE_HERO_SUBTEXT_CLASS,
} from "@/components/home/mobile-hero-typography";
import { HERO_SIMPLIFIED_GRADIENT } from "@/components/home/hero-audience-theme";
import { EmailBreachSearchForm } from "@/components/home/email-breach-search-form";
import { HeroTrustpilotProof } from "@/components/home/hero-trustpilot-proof";
import {
  MOBILE_HERO_BULLETS,
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
      id="search"
      className="w-full shrink-0 scroll-mt-28 overflow-x-hidden pb-8 pt-32 min-w-0 md:hidden"
      aria-label="Data breach search hero"
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
            <span className="sr-only">
              Leekify breach search — check whether your personal information was leaked
            </span>
          </h1>
        </div>

        <p
          className={`${MOBILE_HERO_SUBTEXT_CLASS} mt-6 max-w-[22rem] px-1 text-white/90 sm:max-w-[24rem]`}
        >
          {MOBILE_HERO_SUBTEXT}
        </p>

        <EmailBreachSearchForm appearance="onDark" className="mt-6 max-w-[22rem] sm:max-w-[24rem]" />

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
          />
        </div>
      </div>
    </section>
  );
}
