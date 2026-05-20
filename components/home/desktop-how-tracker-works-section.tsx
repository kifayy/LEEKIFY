"use client";

import { DiscoveryCardLottie } from "@/components/home/discovery-card-lottie";
import { HomeOptimizedImage } from "@/components/home/home-optimized-image";
import {
  DESKTOP_SECTION_HEADING_ACCENT_CLASS,
  DESKTOP_SECTION_HEADING_CLASS,
  DESKTOP_SECTION_ITEM_TITLE_CLASS,
  DESKTOP_SECTION_SUBTEXT_CLASS,
  DesktopHeadingSwoosh,
} from "@/components/home/desktop-section-typography";
import { PathQuizCtaButton } from "@/components/home/path-quiz-cta";
import { DISCOVERY_CARDS } from "@/lib/discovery-cards-content";
import { DESKTOP_TRACKER_ARCHETYPE_IMAGE_URL } from "@/lib/home-feature-showcase-images";
import { cn } from "@/lib/utils";

const TRACKER_STEPS = DISCOVERY_CARDS.map((card) => ({
  step: card.step,
  title: card.shortTitle,
  description: card.shortDescription,
  stats: card.stats,
  lottieSrc: card.lottieSrc,
  accentColor: card.accentColor,
  surfaceGradient: card.surfaceGradient,
}));

function TimelineRail({ stepCount }: { stepCount: number }) {
  if (stepCount < 2) return null;
  return (
    <div
      className="pointer-events-none absolute left-[1.375rem] top-8 bottom-8 z-0 w-0.5 sm:left-[1.5rem]"
      aria-hidden
    >
      <div className="h-full w-full rounded-full bg-gradient-to-b from-amber-300 via-pink-300 to-emerald-300" />
    </div>
  );
}

function StepNumberBadge({ step, accentColor }: { step: number; accentColor: string }) {
  return (
    <div
      className="absolute left-0 top-0 z-20 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white font-[family-name:var(--font-poppins)] text-sm font-extrabold text-white shadow-[0_4px_14px_rgba(15,23,42,0.18)] sm:h-9 sm:w-9"
      style={{ backgroundColor: accentColor }}
      aria-hidden
    >
      {step}
    </div>
  );
}

function StepStats({ stats, accentColor }: { stats: readonly string[]; accentColor: string }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-2" aria-label="Highlights">
      {stats.map((stat) => (
        <li key={stat}>
          <span
            className="inline-flex rounded-full border border-white/80 bg-white/90 px-2.5 py-1 font-[family-name:var(--font-poppins)] text-xs font-medium text-[#18062E] shadow-[0_2px_8px_rgba(15,23,42,0.06)]"
            style={{ boxShadow: `0 2px 10px ${accentColor}22` }}
          >
            {stat}
          </span>
        </li>
      ))}
    </ul>
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
        <HomeOptimizedImage
          src={DESKTOP_TRACKER_ARCHETYPE_IMAGE_URL}
          alt="PathPicker student archetype profile with personality traits and fit insights"
          width={640}
          height={800}
          loading="lazy"
          sizes="(min-width: 1024px) 30rem, (min-width: 768px) 24rem, 22rem"
          className="h-auto w-full object-contain"
        />
      </div>
    </div>
  );
}

export function DesktopHowTrackerWorksSection() {
  return (
    <section
      id="commit-with-zero-regrets"
      className="relative hidden w-full scroll-mt-28 overflow-hidden bg-white md:block"
      aria-labelledby="desktop-how-tracker-heading"
    >
      <DecorativeMagnifier />
      <DecorativeTarget />

      <div className="relative mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20 lg:grid lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-8 lg:py-24 xl:gap-20">
        <div className="lg:pr-4">
          <h2 id="desktop-how-tracker-heading" className={`max-w-lg ${DESKTOP_SECTION_HEADING_CLASS}`}>
            Your path, built on{" "}
            <span
              className={`relative inline-block pb-1 ${DESKTOP_SECTION_HEADING_ACCENT_CLASS}`}
            >
              student data.
              <DesktopHeadingSwoosh />
            </span>
          </h2>
          <p className={`mt-5 max-w-lg ${DESKTOP_SECTION_SUBTEXT_CLASS}`}>
            PathPicker is powered by what 50,000+ students wish they&apos;d known earlier.
          </p>

          <ol className="relative mt-10 sm:mt-12">
            <TimelineRail stepCount={TRACKER_STEPS.length} />
            {TRACKER_STEPS.map(
              ({ step, title, description, stats, lottieSrc, accentColor, surfaceGradient }, index) => {
                const isLast = index === TRACKER_STEPS.length - 1;
                return (
                  <li
                    key={title}
                    className={cn(
                      "relative flex gap-4 sm:gap-5",
                      !isLast && "pb-10 sm:pb-12",
                    )}
                  >
                    <div className="relative shrink-0 overflow-visible pt-1 pl-1">
                      <div
                        className="relative z-[1] h-[4.5rem] w-[4.5rem] overflow-visible sm:h-20 sm:w-20"
                        style={{ background: surfaceGradient }}
                      >
                        <StepNumberBadge step={step} accentColor={accentColor} />
                        <div
                          className="pointer-events-none absolute inset-0 z-0 translate-x-1.5 translate-y-1.5 rounded-2xl opacity-90"
                          style={{ backgroundColor: accentColor }}
                          aria-hidden
                        />
                        <div className="relative z-[1] h-full w-full overflow-hidden rounded-2xl bg-white shadow-[0_8px_20px_rgba(15,23,42,0.12)]">
                          <DiscoveryCardLottie src={lottieSrc} compact />
                        </div>
                      </div>
                    </div>
                    <div className="min-w-0 pt-0.5 sm:pt-1">
                      <h3 className={DESKTOP_SECTION_ITEM_TITLE_CLASS}>{title}</h3>
                      <p className="mt-1.5 font-[family-name:var(--font-poppins)] text-sm leading-relaxed text-neutral-500">
                        {description}
                      </p>
                      <StepStats stats={stats} accentColor={accentColor} />
                    </div>
                  </li>
                );
              },
            )}
          </ol>
        </div>

        <div className="mt-14 lg:mt-0">
          <ArchetypeVisual />
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl justify-center px-4 pb-16 pt-2 md:px-6 md:pb-20 md:pt-4 lg:px-8 lg:pb-24">
        <PathQuizCtaButton variant="college" size="section" className="min-w-[12.5rem]" />
      </div>
    </section>
  );
}
