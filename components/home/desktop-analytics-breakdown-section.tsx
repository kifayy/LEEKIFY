import Image from "next/image";
import { CalendarCheck, LayoutDashboard, Timer } from "lucide-react";

import {
  DESKTOP_SECTION_HEADING_CLASS,
  DESKTOP_SECTION_ITEM_TITLE_CLASS,
  DESKTOP_SECTION_SUBTEXT_CLASS,
  DesktopHeadingSwoosh,
} from "@/components/home/desktop-section-typography";
import { StudentArchetypeTestCta } from "@/components/home/student-archetype-test-cta";
import { DESKTOP_ANALYTICS_PHONE_IMAGE_URL } from "@/lib/home-feature-showcase-images";

const BREAKDOWN_ITEMS = [
  {
    title: "Automatic fit tracking",
    description:
      "Your quiz answers map to fit scores automatically, with no spreadsheets or guesswork required.",
    iconBg: "#FF8C66",
    Icon: Timer,
  },
  {
    title: "Customizable dashboard",
    description:
      "Filter by vibe, admission odds, and campus size so your short list reflects what matters to you.",
    iconBg: "#76D1D9",
    Icon: LayoutDashboard,
  },
  {
    title: "Compare schools retroactively",
    description:
      "Revisit saved matches anytime and see how your profile stacks up as your goals change.",
    iconBg: "#F5C542",
    Icon: CalendarCheck,
  },
] as const;

function SquiggleDecor() {
  return (
    <svg
      className="pointer-events-none absolute left-[8%] top-[18%] z-0 h-[70%] w-[45%] text-[#FF8C66]/25"
      viewBox="0 0 200 280"
      fill="none"
      aria-hidden
    >
      <path
        d="M20 40C60 20 100 60 80 100C60 140 30 160 50 200C70 240 120 250 160 220"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M140 30C170 50 180 90 150 120C120 150 100 190 130 230"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

function PhoneMockupVisual() {
  return (
    <div className="relative mx-auto flex w-full max-w-[min(100%,28rem)] items-center justify-center lg:max-w-none lg:justify-end lg:pr-2 xl:pr-6">
      <SquiggleDecor />

      <div className="relative z-10 w-full drop-shadow-[0_28px_60px_rgba(24,6,46,0.12)]">
        <Image
          src={DESKTOP_ANALYTICS_PHONE_IMAGE_URL}
          alt="PathPicker mobile app showing college discover list and fit analytics"
          width={720}
          height={820}
          className="h-auto w-full max-w-[min(100%,22rem)] object-contain sm:max-w-[24rem] lg:max-w-[26rem] xl:max-w-[28rem]"
          unoptimized
          priority
        />
      </div>
    </div>
  );
}

export function DesktopAnalyticsBreakdownSection() {
  return (
    <section
      className="relative hidden w-full bg-white md:block"
      aria-labelledby="desktop-analytics-breakdown-heading"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:px-6 md:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
        <PhoneMockupVisual />

        <div className="flex flex-col justify-center lg:pl-4">
          <h2 id="desktop-analytics-breakdown-heading" className={DESKTOP_SECTION_HEADING_CLASS}>
            Never Regret Picking The{" "}
            <span className="relative inline-block">
              Wrong School
              <DesktopHeadingSwoosh className="min-w-[8.5rem]" />
            </span>
          </h2>
          <p className={`mt-5 max-w-lg ${DESKTOP_SECTION_SUBTEXT_CLASS}`}>
            See how your personality profile and archetype translate to that average student body
            population across 2,000+ schools.
          </p>

          <ul className="mt-10 space-y-8">
            {BREAKDOWN_ITEMS.map(({ title, description, iconBg, Icon }) => (
              <li key={title} className="flex gap-4">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-sm"
                  style={{ backgroundColor: iconBg }}
                >
                  <Icon className="h-6 w-6 text-white" strokeWidth={2} aria-hidden />
                </div>
                <div>
                  <h3 className={DESKTOP_SECTION_ITEM_TITLE_CLASS}>
                    {title}
                  </h3>
                  <p className="mt-1.5 font-[family-name:var(--font-poppins)] text-sm leading-relaxed text-neutral-500">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <StudentArchetypeTestCta desktopOnly align="left" wrapperClassName="mt-10 lg:mt-12" />
        </div>
      </div>
    </section>
  );
}

