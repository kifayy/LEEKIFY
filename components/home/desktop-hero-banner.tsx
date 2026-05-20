import Image from "next/image";

import { DesktopExcellentFeaturesSection } from "@/components/home/desktop-excellent-features-section";
import { DesktopHeroPathTypewriter } from "@/components/home/desktop-hero-path-typewriter";
import { PathQuizCtaButton } from "@/components/home/path-quiz-cta";
import { HOME_DESKTOP_HERO_ALT } from "@/lib/home-image-seo";
import { DESKTOP_HERO_SUBTITLE } from "@/lib/home-hero-copy";
import {
  DESKTOP_HERO_ART_HEIGHT,
  DESKTOP_HERO_ART_URL,
  DESKTOP_HERO_ART_WIDTH,
  HOME_HERO_USE_PREOPTIMIZED_ASSETS,
} from "@/lib/home-lcp-images";

export function DesktopHeroBanner() {
  return (
    <section
      className="relative hidden w-[100vw] max-w-[100vw] shrink-0 [margin-inline:calc(50%-50vw)] md:block"
      aria-label="Hero"
    >
      <div className="relative w-full overflow-hidden bg-[#F4F2FF]">
        <Image
          src={DESKTOP_HERO_ART_URL}
          alt={HOME_DESKTOP_HERO_ALT}
          width={DESKTOP_HERO_ART_WIDTH}
          height={DESKTOP_HERO_ART_HEIGHT}
          unoptimized={HOME_HERO_USE_PREOPTIMIZED_ASSETS}
          priority
          fetchPriority="high"
          sizes="100vw"
          className="relative z-[1] block h-auto w-full min-w-full -translate-y-12 md:-translate-y-48 md:-mb-48 lg:-translate-y-64 lg:-mb-64 xl:-translate-y-72 xl:-mb-72"
        />

        <div className="pointer-events-none absolute inset-0 z-20 flex justify-center px-4 pt-10 md:px-6 md:pt-10 lg:pt-[min(15vh,8rem)] xl:pt-[min(18vh,9.5rem)] 2xl:pt-[min(20vh,10.5rem)]">
          <div className="pointer-events-auto flex w-full max-w-[min(100%,42rem)] flex-col items-center text-center md:max-w-[48rem] lg:max-w-[56.875rem]">
            <h1 className="max-w-[56.875rem] font-[family-name:var(--font-poppins)] text-[1.75rem] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#18062E] md:text-[2rem] lg:text-[clamp(2.125rem,3.6vw,4.5rem)] lg:leading-[1.02]">
              <span className="block">Stop guessing.</span>
              <span className="mt-0.5 flex flex-wrap items-baseline justify-center">
                Find your&nbsp;
                <DesktopHeroPathTypewriter />
              </span>
            </h1>

            <p className="mt-3 max-w-[28rem] font-[family-name:var(--font-poppins)] text-sm font-normal leading-[1.45] tracking-[-0.01em] text-[#181A1D] md:mt-4 md:max-w-[32rem] md:text-[0.9375rem] lg:mt-5 lg:max-w-[37.1875rem] lg:text-[clamp(1rem,1.25vw,1.25rem)] lg:leading-[1.5]">
              {DESKTOP_HERO_SUBTITLE}
            </p>

            <PathQuizCtaButton variant="college" size="hero" />
          </div>
        </div>
      </div>

      <DesktopExcellentFeaturesSection />
    </section>
  );
}
