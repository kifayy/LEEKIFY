import Image from "next/image";

import { DesktopHeroPathTypewriter } from "@/components/home/desktop-hero-path-typewriter";
import { HeroTrustpilotProof } from "@/components/home/hero-trustpilot-proof";
import { PathQuizCtaButton } from "@/components/home/path-quiz-cta";
import { HERO_SIMPLIFIED_GRADIENT } from "@/components/home/hero-audience-theme";
import { HOME_DESKTOP_HERO_ALT } from "@/lib/home-image-seo";
import { DESKTOP_HERO_SUBTITLE } from "@/lib/home-hero-copy";
import {
  DESKTOP_HERO_ART_HEIGHT,
  DESKTOP_HERO_ART_URL,
  DESKTOP_HERO_ART_WIDTH,
  HOME_HERO_IMAGE_QUALITY,
  HOME_HERO_USE_PREOPTIMIZED_ASSETS,
} from "@/lib/home-lcp-images";

export function DesktopHeroBanner() {
  return (
    <section
      className="relative hidden w-full shrink-0 md:block"
      aria-label="Hero"
      style={{ background: HERO_SIMPLIFIED_GRADIENT }}
    >
      <div className="container mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <div className="grid items-center gap-8 py-10 lg:grid-cols-2 lg:gap-12 lg:py-14 xl:py-16">
          <div className="flex flex-col text-left">
            <h1 className="max-w-xl font-[family-name:var(--font-poppins)] text-[2rem] font-extrabold leading-[1.08] tracking-[-0.04em] text-white lg:text-[clamp(2.25rem,3.2vw,3.5rem)] lg:leading-[1.05]">
              <span className="block">Stop guessing.</span>
              <span className="mt-1 flex flex-wrap items-baseline">
                Find your&nbsp;
                <DesktopHeroPathTypewriter className="!bg-white/15 !text-white !shadow-[0_2px_12px_rgba(0,0,0,0.18)]" />
              </span>
            </h1>

            <p className="mt-4 max-w-md font-[family-name:var(--font-poppins)] text-[0.9375rem] font-normal leading-[1.5] tracking-[-0.01em] text-white/90 lg:mt-5 lg:max-w-lg lg:text-lg">
              {DESKTOP_HERO_SUBTITLE}
            </p>

            <PathQuizCtaButton
              variant="college"
              size="desktop"
              appearance="onDark"
              className="mt-6 lg:mt-8"
            />

            <HeroTrustpilotProof align="left" className="mt-5 lg:mt-6" />
          </div>

          <div className="flex items-center justify-center lg:justify-end">
            <Image
              src={DESKTOP_HERO_ART_URL}
              alt={HOME_DESKTOP_HERO_ALT}
              width={DESKTOP_HERO_ART_WIDTH}
              height={DESKTOP_HERO_ART_HEIGHT}
              unoptimized={HOME_HERO_USE_PREOPTIMIZED_ASSETS}
              quality={HOME_HERO_IMAGE_QUALITY}
              priority
              fetchPriority="high"
              sizes="(min-width: 768px) 50vw, 100vw"
              className="h-auto w-full max-w-[min(100%,28rem)] object-contain lg:max-w-[32rem] xl:max-w-[36rem]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
