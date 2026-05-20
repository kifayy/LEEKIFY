"use client";

import { Check } from "lucide-react";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { HeroCollegeLogoReels } from "@/components/home/hero-college-logo-reels";
import { PathQuizCtaButton } from "@/components/home/path-quiz-cta";

const PATH_COLLEGE_MATCH_LOTTIE = "/animations/job-hunting-college.lottie";

const PATH_VISUAL_WRAPPER_CLASS =
  "relative mx-auto w-full max-w-[42rem] overflow-hidden";
const PATH_LOTTIE_CLASS =
  "block w-full max-w-[40rem] [&_canvas]:mx-auto [&_canvas]:block [&_canvas]:!h-auto [&_canvas]:!w-full [&_canvas]:max-h-[36rem] sm:[&_canvas]:max-h-[38rem] lg:[&_canvas]:max-h-[42rem]";

const PATH_COLLEGE_ACCENT = "#5ED4C4";

const PATH_COLLEGE_OPTION = {
  titleAccent: "Find",
  titleRest: " My Path",
  titleAccentColor: PATH_COLLEGE_ACCENT,
  description:
    "Figure out which schools actually fit you, not just where your GPA can get you in.",
  bullets: [
    "2k+ schools matched based on your personality",
    "Admission odds for your profile",
    "Paths tied to each school",
    "AI-era outlook for every path",
  ],
  accentColor: PATH_COLLEGE_ACCENT,
} as const;

function PathCollegeLogoVisual() {
  return (
    <div className={PATH_VISUAL_WRAPPER_CLASS} aria-hidden>
      <DotLottieReact
        src={PATH_COLLEGE_MATCH_LOTTIE}
        loop
        autoplay
        className={PATH_LOTTIE_CLASS}
      />
      <div className="pointer-events-none absolute left-1/2 top-[36%] z-10 w-full max-w-[20rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden px-1">
        <HeroCollegeLogoReels
          idPrefix="path-column-hs"
          maxRows={2}
          maxLogosPerRow={5}
          className="relative flex w-full flex-col justify-center"
          rowGapClassName="gap-2.5 py-0"
          spacerClassName="inline-block w-4 shrink-0 sm:w-5"
          tileClassName="relative block size-10 shrink-0 overflow-hidden rounded-lg shadow-[0_2px_10px_rgba(61,184,168,0.35)] ring-1 ring-white/25 sm:size-11"
          trackPaddingClassName="px-0"
          rowWrapperClassName="marquee-fade-edges-compact mx-auto w-full overflow-hidden"
          imageSizes="44px"
        />
      </div>
    </div>
  );
}

export function DesktopExcellentFeaturesSection() {
  const { titleAccent, titleRest, titleAccentColor, description, bullets, accentColor } =
    PATH_COLLEGE_OPTION;

  return (
    <section
      id="deep-profile-rankings"
      className="relative z-[2] hidden w-full scroll-mt-28 bg-white md:block"
      aria-label="College match quiz"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20 lg:px-10 lg:py-28">
        <article className="mx-auto flex max-w-xl flex-col items-center text-center">
          <div className="w-full">
            <PathCollegeLogoVisual />
          </div>

          <div className="relative z-20 mt-6 flex w-full flex-col items-center md:mt-8">
            <h3 className="font-[family-name:var(--font-poppins)] text-2xl font-bold leading-snug text-[#18062E] md:text-[1.5rem] lg:text-[1.75rem]">
              <span style={{ color: titleAccentColor }}>{titleAccent}</span>
              {titleRest}
            </h3>

            <p className="mx-auto mt-4 max-w-md font-[family-name:var(--font-poppins)] text-sm leading-relaxed text-neutral-600 md:text-base">
              {description}
            </p>

            <ul className="mt-7 w-full max-w-sm space-y-3 text-left sm:max-w-md">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2.5">
                  <Check
                    className="mt-0.5 h-5 w-5 shrink-0"
                    style={{ color: accentColor }}
                    strokeWidth={2.5}
                    aria-hidden
                  />
                  <span className="font-[family-name:var(--font-poppins)] text-sm leading-relaxed text-neutral-600">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <PathQuizCtaButton variant="college" size="column" />
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
