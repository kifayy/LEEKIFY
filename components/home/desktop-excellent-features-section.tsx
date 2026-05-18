import { Bell, CalendarCheck, FileBarChart } from "lucide-react";

import { DecorativeRocketLottie } from "@/components/home/decorative-rocket-lottie";
import {
  DESKTOP_SECTION_HEADING_CLASS,
  DESKTOP_SECTION_SUBTEXT_CLASS,
  DesktopHeadingSwoosh,
} from "@/components/home/desktop-section-typography";
import { HERO_PURPLE } from "@/components/home/hero-audience-theme";
import { StudentArchetypeTestCta } from "@/components/home/student-archetype-test-cta";

const FEATURE_CARDS = [
  {
    title: "College & Career Match Quiz",
    description:
      "Take a short quiz to map your student archetype to schools and career paths that fit how you learn, live, and want to work in the AI-driven future.",
    bg: "#76D1D9",
    iconBg: "rgba(255,255,255,0.35)",
    Icon: CalendarCheck,
  },
  {
    title: "Smart School & Career Shortlist",
    description:
      "Get reach, target, and safety picks ranked by real fit, not just GPA and rankings alone. Includes career outlook and salary potential for each path.",
    bg: HERO_PURPLE,
    iconBg: "rgba(255,255,255,0.28)",
    Icon: Bell,
  },
  {
    title: "Deep Fit & Future Reports",
    description:
      "See admission odds, campus vibe, student happiness signals, and future career fit in one clear report, so you know where you'll thrive now and in 5 years.",
    bg: "#FF8C66",
    iconBg: "rgba(255,255,255,0.32)",
    Icon: FileBarChart,
  },
] as const;

function DecorativeStar() {
  return (
    <svg
      className="pointer-events-none absolute left-[4%] top-6 h-16 w-16 text-violet-300/50 md:left-[6%] md:top-8 md:h-20 md:w-20 lg:left-[8%]"
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden
    >
      <path
        d="M40 4L46 34H76L52 52L60 80L40 62L20 80L28 52L4 34H34L40 4Z"
        stroke="currentColor"
        strokeWidth="1.25"
      />
    </svg>
  );
}

export function DesktopExcellentFeaturesSection() {
  return (
    <section
      id="deep-profile-rankings"
      className="relative z-[2] hidden w-full scroll-mt-28 bg-white md:block"
      aria-labelledby="desktop-excellent-features-heading"
    >
      <DecorativeStar />

      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-4 md:px-6 md:pb-20 md:pt-8 lg:px-8 lg:pb-24">
        <div className="relative mx-auto max-w-3xl text-center pr-0 md:pr-16 lg:pr-20">
          <DecorativeRocketLottie />
          <h2
            id="desktop-excellent-features-heading"
            className={`relative ${DESKTOP_SECTION_HEADING_CLASS}`}
          >
            Pick The{" "}
            <span className="relative inline-block pb-1">
              Right Student Path
              <DesktopHeadingSwoosh />
            </span>
          </h2>
          <p className={`mx-auto mt-5 max-w-[34rem] ${DESKTOP_SECTION_SUBTEXT_CLASS}`}>
            Most students are preparing for a world that no longer exists. We help you pick the right path
            for a future run by AI.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3 md:gap-5 lg:mt-14 lg:gap-6">
          {FEATURE_CARDS.map(({ title, description, bg, iconBg, Icon }) => (
            <article
              key={title}
              className="flex min-h-[15.5rem] flex-col rounded-[1.75rem] p-6 shadow-[0_18px_40px_rgba(35,57,91,0.14)] transition-transform duration-200 hover:-translate-y-0.5 md:min-h-[16.5rem] md:p-7 lg:rounded-[2rem]"
              style={{ backgroundColor: bg }}
            >
              <div
                className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{ backgroundColor: iconBg }}
              >
                <Icon className="h-7 w-7 text-white" strokeWidth={2} aria-hidden />
              </div>
              <h3 className="font-[family-name:var(--font-poppins)] text-lg font-bold leading-snug text-white">
                {title}
              </h3>
              <p className="mt-3 font-[family-name:var(--font-poppins)] text-sm leading-relaxed text-white/90 md:text-[0.9375rem]">
                {description}
              </p>
            </article>
          ))}
        </div>

        <StudentArchetypeTestCta desktopOnly wrapperClassName="mt-12 lg:mt-14" />
      </div>
    </section>
  );
}
