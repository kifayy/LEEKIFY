import Image from "next/image";
import Link from "next/link";

import { DesktopHeroPathTypewriter } from "@/components/home/desktop-hero-path-typewriter";
import { HERO_PURPLE, HERO_PURPLE_RGB } from "@/components/home/hero-audience-theme";
import { COLLEGE_MATCH_QUIZ_URL } from "@/lib/constants";

const DESKTOP_HERO_IMAGE_URL = "/images/group-100000s5829.webp";

export function DesktopHeroBanner() {
  return (
    <section
      className="relative hidden w-[100vw] max-w-[100vw] shrink-0 [margin-inline:calc(50%-50vw)] md:block"
      aria-label="Hero"
    >
      <div className="relative w-full overflow-hidden bg-[#F4F2FF]">
        <Image
          src={DESKTOP_HERO_IMAGE_URL}
          alt=""
          width={1920}
          height={900}
          priority
          fetchPriority="high"
          sizes="100vw"
          className="relative z-[1] block h-auto w-full min-w-full -translate-y-12 md:-translate-y-32 md:-mb-32 lg:-translate-y-44 lg:-mb-44"
          aria-hidden
        />

        <div className="pointer-events-none absolute inset-0 z-20 flex justify-center px-4 pt-10 md:px-6 md:pt-12 lg:pt-[min(17vh,9rem)] xl:pt-[min(20vh,10.5rem)] 2xl:pt-[min(22vh,11.5rem)]">
          <div className="pointer-events-auto flex w-full max-w-[min(100%,42rem)] flex-col items-center text-center md:max-w-[48rem] lg:max-w-[56.875rem]">
            <h1 className="max-w-[56.875rem] font-[family-name:var(--font-poppins)] text-[1.75rem] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#18062E] md:text-[2rem] lg:text-[clamp(2.125rem,3.6vw,4.5rem)] lg:leading-[1.02]">
              <span className="block">Stop guessing.</span>
              <span className="block">
                Find your <DesktopHeroPathTypewriter />
              </span>
            </h1>

            <p className="mt-3 max-w-[28rem] font-[family-name:var(--font-poppins)] text-sm font-normal leading-[1.45] tracking-[-0.01em] text-[#40201E] md:mt-4 md:max-w-[32rem] md:text-[0.9375rem] lg:mt-5 lg:max-w-[37.1875rem] lg:text-[clamp(1rem,1.25vw,1.25rem)] lg:leading-[1.5]">
              Students are preparing for a world that no longer exists. We match
              your profile to schools and careers for the AI future.
            </p>

            <Link
              href={COLLEGE_MATCH_QUIZ_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex h-12 min-w-[13.5rem] items-center justify-center rounded-[2rem] px-7 font-[family-name:var(--font-poppins)] text-[0.9375rem] font-semibold text-white transition hover:opacity-95 md:mt-6 md:h-[3.25rem] md:min-w-[14.5rem] md:rounded-[2.25rem] md:px-8 lg:mt-10 lg:h-[4.75rem] lg:min-w-[15rem] lg:rounded-[2.5rem] lg:px-10 lg:text-lg"
              style={{
                backgroundColor: HERO_PURPLE,
                boxShadow: `0 8px 28px rgba(${HERO_PURPLE_RGB}, 0.35)`,
              }}
            >
              Student Archetype Test
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
