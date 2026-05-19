import Image from "next/image";
import { DesktopAnalyticsBreakdownSection } from "@/components/home/desktop-analytics-breakdown-section";
import { DesktopExcellentFeaturesSection } from "@/components/home/desktop-excellent-features-section";
import { DesktopHowTrackerWorksSection } from "@/components/home/desktop-how-tracker-works-section";
import { DesktopHeroPathTypewriter } from "@/components/home/desktop-hero-path-typewriter";
import { StudentArchetypeTestCta } from "@/components/home/student-archetype-test-cta";
import { HOME_DESKTOP_HERO_ALT } from "@/lib/home-image-seo";

import {
  DESKTOP_HERO_ART_HEIGHT,
  DESKTOP_HERO_ART_URL,
  DESKTOP_HERO_ART_WIDTH,
  HOME_HERO_IMAGE_QUALITY,
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
          quality={HOME_HERO_IMAGE_QUALITY}
          priority
          fetchPriority="high"
          sizes="100vw"
          className="relative z-[1] block h-auto w-full min-w-full -translate-y-12 md:-translate-y-32 md:-mb-32 lg:-translate-y-44 lg:-mb-44"
        />

        <div className="pointer-events-none absolute inset-0 z-20 flex justify-center px-4 pt-10 md:px-6 md:pt-12 lg:pt-[min(17vh,9rem)] xl:pt-[min(20vh,10.5rem)] 2xl:pt-[min(22vh,11.5rem)]">
          <div className="pointer-events-auto flex w-full max-w-[min(100%,42rem)] flex-col items-center text-center md:max-w-[48rem] lg:max-w-[56.875rem]">
            <h1 className="max-w-[56.875rem] font-[family-name:var(--font-poppins)] text-[1.75rem] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#18062E] md:text-[2rem] lg:text-[clamp(2.125rem,3.6vw,4.5rem)] lg:leading-[1.02]">
              <span className="block">Stop guessing.</span>
              <span className="block">
                Find your <DesktopHeroPathTypewriter />
              </span>
            </h1>

            <p className="mt-3 max-w-[28rem] font-[family-name:var(--font-poppins)] text-sm font-normal leading-[1.45] tracking-[-0.01em] text-[#181A1D] md:mt-4 md:max-w-[32rem] md:text-[0.9375rem] lg:mt-5 lg:max-w-[37.1875rem] lg:text-[clamp(1rem,1.25vw,1.25rem)] lg:leading-[1.5]">
              Most students are preparing for a world that no longer exists. Find
              your best path by matching your profile to future schools and
              careers where you&apos;ll thrive.
            </p>

            <StudentArchetypeTestCta size="hero" />
          </div>
        </div>
      </div>

      <DesktopExcellentFeaturesSection />
      <DesktopAnalyticsBreakdownSection />
      <DesktopHowTrackerWorksSection />
    </section>
  );
}
