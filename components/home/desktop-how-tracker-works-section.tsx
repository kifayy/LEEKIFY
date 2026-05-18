"use client";

import Image from "next/image";

import { DiscoveryCardLottie } from "@/components/home/discovery-card-lottie";
import {
  DESKTOP_SECTION_HEADING_CLASS,
  DESKTOP_SECTION_ITEM_TITLE_CLASS,
  DESKTOP_SECTION_SUBTEXT_CLASS,
  DesktopHeadingSwoosh,
} from "@/components/home/desktop-section-typography";
import { StudentArchetypeTestCta } from "@/components/home/student-archetype-test-cta";
import { DISCOVERY_CARDS } from "@/lib/discovery-cards-content";
import { DESKTOP_TRACKER_ARCHETYPE_IMAGE_URL } from "@/lib/home-feature-showcase-images";

const TRACKER_STEPS = DISCOVERY_CARDS.map((card) => ({
  title: card.shortTitle,
  description: card.shortDescription,
  lottieSrc: card.lottieSrc,
  accentColor: card.accentColor,
  surfaceGradient: card.surfaceGradient,
}));

function StepConnector({ index }: { index: number }) {
  if (index >= TRACKER_STEPS.length - 1) return null;
  const paths = [
    "M52 0 C72 8, 78 28, 58 44",
    "M52 0 C32 10, 28 30, 48 44",
  ];
  return (
    <svg
      className="pointer-events-none absolute left-[3.25rem] top-full z-0 h-11 w-24 -translate-y-1 text-sky-300/80"
      viewBox="0 0 96 48"
      fill="none"
      aria-hidden
    >
      <path
        d={paths[index]}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        markerEnd="url(#tracker-arrow)"
      />
      <defs>
        <marker
          id="tracker-arrow"
          markerWidth="6"
          markerHeight="6"
          refX="5"
          refY="3"
          orient="auto"
        >
          <path d="M0 0 L6 3 L0 6 Z" fill="currentColor" />
        </marker>
      </defs>
    </svg>
  );
}

function DecorativeMagnifier() {
  return (
    <div
      className="pointer-events-none absolute -left-4 bottom-8 z-0 hidden w-[7.5rem] opacity-90 xl:-left-10 xl:block xl:w-[9rem] 2xl:-left-16"
      aria-hidden
    >
      <svg viewBox="0 0 140 160" className="h-auto w-full drop-shadow-[0_8px_20px_rgba(15,23,42,0.08)]">
        <ellipse cx="70" cy="148" rx="36" ry="10" fill="rgba(148,163,184,0.2)" />
        <rect x="28" y="52" width="56" height="40" rx="6" fill="#F8FAFC" stroke="#E2E8F0" />
        <rect x="34" y="60" width="18" height="4" rx="2" fill="#4ADE80" />
        <rect x="34" y="68" width="28" height="4" rx="2" fill="#F472B6" />
        <rect x="34" y="76" width="22" height="4" rx="2" fill="#818CF8" />
        <circle cx="88" cy="44" r="22" fill="none" stroke="#4ADE80" strokeWidth="6" />
        <line x1="104" y1="60" x2="118" y2="74" stroke="#4ADE80" strokeWidth="6" strokeLinecap="round" />
        <path
          d="M24 118 C24 118 18 108 28 98 C38 88 52 92 58 102"
          fill="#FDBA74"
          stroke="#FB923C"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}

function DecorativeTarget() {
  return (
    <div
      className="pointer-events-none absolute -right-2 top-16 z-0 hidden w-[6.5rem] xl:block xl:w-[7.5rem] 2xl:-right-8"
      aria-hidden
    >
      <svg viewBox="0 0 120 120" className="h-auto w-full drop-shadow-[0_10px_24px_rgba(15,23,42,0.1)]">
        <circle cx="58" cy="58" r="44" fill="#38BDF8" />
        <circle cx="58" cy="58" r="32" fill="white" />
        <circle cx="58" cy="58" r="20" fill="#38BDF8" />
        <circle cx="58" cy="58" r="8" fill="white" />
        <path
          d="M58 58 L92 22 L98 28 L64 62 Z"
          fill="#F472B6"
          stroke="#EC4899"
          strokeWidth="1"
        />
        <path d="M92 22 L100 14 L108 22 L100 30 Z" fill="#F472B6" />
      </svg>
    </div>
  );
}

function ArchetypeVisual() {
  return (
    <div className="relative mx-auto flex w-full max-w-[min(100%,22rem)] items-center justify-center sm:max-w-[24rem] lg:mx-0 lg:ml-auto lg:max-w-[28rem] xl:max-w-[30rem]">
      <div className="relative z-10 w-full drop-shadow-[0_28px_60px_rgba(24,6,46,0.14)]">
        <Image
          src={DESKTOP_TRACKER_ARCHETYPE_IMAGE_URL}
          alt="PathPicker student archetype profile with personality traits and fit insights"
          width={640}
          height={800}
          className="h-auto w-full object-contain"
          unoptimized
        />
      </div>
    </div>
  );
}


export function DesktopHowTrackerWorksSection() {
  return (
    <section
      id="commit-with-zero-regrets"
      className="relative hidden w-full scroll-mt-28 overflow-hidden bg-[#F4F2FF] md:block"
      aria-labelledby="desktop-how-tracker-heading"
    >
      <DecorativeMagnifier />
      <DecorativeTarget />

      <div className="relative mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20 lg:grid lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-8 lg:py-24 xl:gap-20">
        <div className="lg:pr-4">
          <h2 id="desktop-how-tracker-heading" className={`max-w-lg ${DESKTOP_SECTION_HEADING_CLASS}`}>
            Your{" "}
            <span className="relative inline-block pb-1">
              Student Archetype
              <DesktopHeadingSwoosh />
            </span>
          </h2>
          <p className={`mt-5 max-w-lg ${DESKTOP_SECTION_SUBTEXT_CLASS}`}>
            For high school and college students, we map your student archetype to your future careers and
            schools in a world shaped by AI.
          </p>

          <ol className="relative mt-10 space-y-10 sm:mt-12">
            {TRACKER_STEPS.map(({ title, description, lottieSrc, accentColor, surfaceGradient }, index) => (
              <li key={title} className="relative flex gap-4 sm:gap-5">
                <StepConnector index={index} />
                <div
                  className="relative z-[1] h-[4.5rem] w-[4.5rem] shrink-0 sm:h-20 sm:w-20"
                  style={{ background: surfaceGradient }}
                >
                  <div
                    className="pointer-events-none absolute inset-0 z-0 translate-x-1.5 translate-y-1.5 rounded-2xl opacity-90"
                    style={{ backgroundColor: accentColor }}
                    aria-hidden
                  />
                  <div className="relative z-[1] h-full w-full overflow-hidden rounded-2xl bg-white shadow-[0_8px_20px_rgba(15,23,42,0.12)]">
                    <DiscoveryCardLottie src={lottieSrc} compact />
                  </div>
                </div>
                <div className="min-w-0 pt-0.5 sm:pt-1">
                  <h3 className={DESKTOP_SECTION_ITEM_TITLE_CLASS}>
                    {title}
                  </h3>
                  <p className="mt-1.5 font-[family-name:var(--font-poppins)] text-sm leading-relaxed text-neutral-500">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-14 lg:mt-0">
          <ArchetypeVisual />
        </div>
      </div>

      <StudentArchetypeTestCta desktopOnly wrapperClassName="mx-auto max-w-6xl px-4 pb-16 pt-2 md:px-6 md:pb-20 md:pt-4 lg:px-8 lg:pb-24" />
    </section>
  );
}
