"use client";

import { Check } from "lucide-react";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { HeroCollegeLogoReels } from "@/components/home/hero-college-logo-reels";
import { PathQuizCtaButton } from "@/components/home/path-quiz-cta";

const PATH_COLLEGE_MATCH_LOTTIE = "/animations/job-hunting-college.lottie";
const PATH_CAREER_MATCH_LOTTIE = "/animations/job-hunting.lottie";

const PATH_VISUAL_WRAPPER_CLASS =
  "relative mx-auto w-full max-w-[42rem] overflow-hidden";
const PATH_LOTTIE_CLASS =
  "block w-full max-w-[40rem] [&_canvas]:mx-auto [&_canvas]:block [&_canvas]:!h-auto [&_canvas]:!w-full [&_canvas]:max-h-[36rem] sm:[&_canvas]:max-h-[38rem] lg:[&_canvas]:max-h-[42rem]";

/** College column — mint/teal from job-hunting-college blob. */
const PATH_COLLEGE_ACCENT = "#5ED4C4";
/** Career column — rose pink (readable on white + white label on CTA). */
const PATH_CAREER_TITLE_ACCENT = "#D93D8F";
const PATH_CAREER_BULLET_ACCENT = "#D93D8F";

const PATH_OPTIONS = [
  {
    id: "highSchool" as const,
    titleAccent: "College",
    titleRest: " Match Quiz",
    titleAccentColor: PATH_COLLEGE_ACCENT,
    description:
      "Figure out which schools actually fit you, not just where your GPA can get you in.",
    bullets: [
      "2k+ schools matched based on your personality",
      "Admission odds for your profile",
      "Career paths tied to each school",
      "AI-era outlook for every path",
    ],
    ctaVariant: "college" as const,
    accentColor: PATH_COLLEGE_ACCENT,
    lottieSrc: PATH_COLLEGE_MATCH_LOTTIE,
  },
  {
    id: "college" as const,
    titleAccent: "Career",
    titleRest: " Match Quiz",
    titleAccentColor: PATH_CAREER_TITLE_ACCENT,
    description:
      "Find the career paths that align with who you are, before you graduate into the wrong one.",
    bullets: [
      "Career matches ranked by fit",
      "Salary potential and growth outlook",
      "AI resilience score for each path",
      "Major alignment check",
    ],
    ctaVariant: "career" as const,
    accentColor: PATH_CAREER_BULLET_ACCENT,
    lottieSrc: PATH_CAREER_MATCH_LOTTIE,
  },
] as const;

function PathLottieVisual({ src }: { src: string }) {
  return (
    <div className={PATH_VISUAL_WRAPPER_CLASS} aria-hidden>
      <DotLottieReact src={src} loop autoplay className={PATH_LOTTIE_CLASS} />
    </div>
  );
}

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

function PathOptionColumn({
  option,
}: {
  option: (typeof PATH_OPTIONS)[number];
}) {
  const title = (
    <>
      <span style={{ color: option.titleAccentColor }}>{option.titleAccent}</span>
      {option.titleRest}
    </>
  );

  return (
    <article className="flex flex-col items-center text-center">
      <div className="w-full">
        {option.id === "highSchool" ? (
          <PathCollegeLogoVisual />
        ) : (
          <PathLottieVisual src={option.lottieSrc} />
        )}
      </div>

      <div className="relative z-20 mt-6 flex w-full flex-col items-center md:mt-8">
        <h3 className="font-[family-name:var(--font-poppins)] text-2xl font-bold leading-snug text-[#18062E] md:text-[1.5rem] lg:text-[1.75rem]">
          {title}
        </h3>

        <p className="mt-4 max-w-md mx-auto font-[family-name:var(--font-poppins)] text-sm leading-relaxed text-neutral-600 md:text-base">
          {option.description}
        </p>

        <ul className="mt-7 w-full max-w-sm space-y-3 text-left sm:max-w-md">
          {option.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2.5">
            <Check
              className="mt-0.5 h-5 w-5 shrink-0"
              style={{ color: option.accentColor }}
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
          <PathQuizCtaButton variant={option.ctaVariant} size="column" />
        </div>
      </div>
    </article>
  );
}

export function DesktopExcellentFeaturesSection() {
  return (
    <section
      id="deep-profile-rankings"
      className="relative z-[2] hidden w-full scroll-mt-28 bg-white md:block"
      aria-label="College and career match quizzes"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2 lg:gap-12 xl:gap-20">
          {PATH_OPTIONS.map((option) => (
            <PathOptionColumn key={option.id} option={option} />
          ))}
        </div>
      </div>
    </section>
  );
}
