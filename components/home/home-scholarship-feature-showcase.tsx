import { Check } from "lucide-react";

import { AdmissionChancePillsReel } from "@/components/home/admission-chance-pills-reel";
import { CollegeMatchQuizCtaLink } from "@/components/home/college-match-quiz-cta-link";
import {
  HOME_FEATURE_BROWSE_FIT_IMAGE_URL,
  HOME_FEATURE_DEEP_PROFILE_IMAGE_URL,
} from "@/lib/home-feature-showcase-images";

/** Tint strongest at top, fades to white / transparent toward the bottom edge. */
const LAVENDER_PANEL =
  "linear-gradient(180deg, #F5F3FF 0%, rgba(245,243,255,0.55) 55%, rgba(255,255,255,0) 100%)";
const SKY_PANEL =
  "linear-gradient(180deg, #F0F9FF 0%, rgba(240,249,255,0.55) 55%, rgba(255,255,255,0) 100%)";

/** White vignette on top of the artwork so it softens into the card (bottom + sides). */
function FeatureImageWhiteVignette({
  strength,
  omitLeftFade,
}: {
  strength: "strong" | "normal";
  omitLeftFade?: boolean;
}) {
  const isStrong = strength === "strong";
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[2]"
      aria-hidden
    >
      <div
        className={
          isStrong
            ? "absolute inset-x-0 bottom-0 h-[64%] sm:h-[56%]"
            : "absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-white via-white/75 to-transparent sm:h-[40%]"
        }
        style={
          isStrong
            ? {
                background:
                  "linear-gradient(to top, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.72) 30%, rgba(255,255,255,0.38) 55%, rgba(255,255,255,0.12) 76%, transparent 100%)",
              }
            : undefined
        }
      />
      {!omitLeftFade && (
        <div
          className={
            isStrong
              ? "absolute inset-y-0 left-0 w-[min(46%,12rem)] sm:w-[min(40%,12.5rem)]"
              : "absolute inset-y-0 left-0 w-[min(28%,7rem)] bg-gradient-to-r from-white via-white/55 to-transparent sm:w-[min(24%,7.5rem)]"
          }
          style={
            isStrong
              ? {
                  background:
                    "linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0.9) 42%, rgba(255,255,255,0.35) 72%, transparent 100%)",
                }
              : undefined
          }
        />
      )}
      <div
        className={
          isStrong
            ? "absolute inset-y-0 right-0 w-[min(42%,11rem)] sm:w-[min(36%,10.5rem)]"
            : "absolute inset-y-0 right-0 w-[min(28%,7rem)] bg-gradient-to-l from-white via-white/55 to-transparent sm:w-[min(24%,7.5rem)]"
        }
        style={
          isStrong
            ? {
                background:
                  "linear-gradient(to left, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.58) 38%, rgba(255,255,255,0.24) 66%, transparent 100%)",
              }
            : undefined
        }
      />
    </div>
  );
}

function BrowseFitVisual() {
  return (
    <div className="relative w-full overflow-hidden rounded-none border-y border-slate-200/70 bg-white max-md:rounded-l-none max-md:border-l-0 max-md:border-x-0 max-md:shadow-none md:rounded-[28px] md:border md:shadow-[0_4px_24px_rgba(15,23,42,0.06)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: LAVENDER_PANEL }}
      />
      <div className="relative z-[1] w-full min-h-[200px] px-0 pb-0 pt-1 sm:min-h-[220px] sm:pt-2">
        <img
          src={HOME_FEATURE_BROWSE_FIT_IMAGE_URL}
          alt="PathPicker college match app showing personalized university fit scores and admission odds"
          width={800}
          height={600}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="block h-auto w-full max-w-[min(100%,300px)] object-contain object-left max-md:py-1 md:max-w-[min(100%,430px)]"
        />
      </div>
      <FeatureImageWhiteVignette strength="strong" omitLeftFade />
    </div>
  );
}

function DeepProfileFeatureVisual() {
  return (
    <div className="relative w-full max-w-full overflow-hidden rounded-none border-y border-slate-200/70 bg-white max-md:border-x-0 max-md:shadow-none md:rounded-[28px] md:border md:shadow-[0_4px_24px_rgba(15,23,42,0.06)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: LAVENDER_PANEL }}
      />
      <div className="relative z-[1] flex min-h-[150px] w-full items-center justify-center px-0 py-3 max-md:min-h-[140px] md:min-h-[240px] md:px-6 md:py-8">
        <img
          src={HOME_FEATURE_DEEP_PROFILE_IMAGE_URL}
          alt="PathPicker college fit report with admission chances and student happiness indicators"
          width={800}
          height={600}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="mx-auto h-auto w-full max-w-[min(100%,260px)] object-contain md:max-w-[min(100%,440px)] lg:max-w-[min(100%,480px)]"
        />
      </div>
      <FeatureImageWhiteVignette strength="normal" />
    </div>
  );
}

function AdmissionChancesVisual() {
  return (
    <div className="relative w-full overflow-hidden rounded-none border-y border-slate-200/70 bg-white max-md:border-x-0 max-md:shadow-none md:rounded-[28px] md:border md:shadow-[0_4px_24px_rgba(15,23,42,0.06)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: SKY_PANEL }}
      />
      <div className="relative z-[1] max-md:mx-auto max-md:max-w-[min(100%,300px)] py-5 md:max-w-none md:py-10">
        <AdmissionChancePillsReel />
      </div>
    </div>
  );
}

function FeatureKicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-center font-[family-name:var(--font-poppins)] text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7C3AED] sm:text-xs md:text-left">
      {children}
    </p>
  );
}

function FeatureDisplayTitle({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2
      id={id}
      className="mt-2 text-center font-[family-name:var(--font-poppins)] text-[1.65rem] font-bold leading-[1.12] tracking-[-0.03em] text-[#181A1D] sm:mt-3 sm:text-3xl md:text-left md:text-[clamp(1.75rem,3.2vw,2.65rem)] md:leading-[1.08]"
    >
      {children}
    </h2>
  );
}

function FeatureBody({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 text-center text-[14px] leading-relaxed text-slate-600 max-md:px-0 sm:mt-4 sm:text-[15px] md:text-left md:text-[1.03rem] md:leading-[1.62]">
      {children}
    </p>
  );
}

function FeatureDivider() {
  return (
    <hr className="my-5 w-full border-0 border-t border-slate-200 md:my-6" />
  );
}

function CompactCheckList({ lines }: { lines: readonly string[] }) {
  return (
    <ul
      className="flex flex-wrap justify-center gap-x-3 gap-y-2 md:justify-start md:gap-x-4 md:gap-y-2.5"
      role="list"
    >
      {lines.map((line) => (
        <li key={line} className="inline-flex items-center gap-1 md:gap-1.5">
          <Check
            className="h-3.5 w-3.5 shrink-0 text-[#956EFE] md:h-4 md:w-4"
            strokeWidth={2.5}
            aria-hidden
          />
          <span className="text-[12px] font-medium leading-tight text-slate-600 md:text-[13px]">
            {line}
          </span>
        </li>
      ))}
    </ul>
  );
}

function CheckList({
  items,
  compactItems,
}: {
  items?: readonly string[];
  compactItems?: readonly string[];
}) {
  if (compactItems != null && compactItems.length > 0) {
    return <CompactCheckList lines={compactItems} />;
  }

  if (items == null || items.length === 0) return null;

  return (
    <ul
      className="hidden space-y-3 md:block xl:grid xl:grid-cols-2 xl:gap-x-10 xl:gap-y-3 xl:space-y-0"
      role="list"
    >
      {items.map((line) => (
        <li
          key={line}
          className="flex items-start gap-3 text-left text-[15px] leading-snug text-slate-700 sm:text-[1.02rem] sm:leading-snug"
        >
          <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#956EFE]" strokeWidth={2.5} aria-hidden />
          <span>{line}</span>
        </li>
      ))}
    </ul>
  );
}

function PrimaryCta({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 w-full md:mt-8">
      <CollegeMatchQuizCtaLink className="w-full max-md:max-w-none sm:w-auto md:max-w-none">
        {children}
      </CollegeMatchQuizCtaLink>
    </div>
  );
}

const BROWSE_FIT_BULLETS_COMPACT = [
  "2,000+ universities",
  "Deep personality fits",
  "Top rankings",
] as const;

const DEEP_PROFILE_BULLETS_COMPACT = [
  "106+ datapoints",
  "Your acceptance odds",
  "Full student dashboard",
] as const;

export function HomeScholarshipFeatureShowcase() {
  return (
    <section
      id="scholarship-features"
      className="w-full overflow-x-hidden scroll-mt-28 bg-white"
      aria-label="College match, admission odds, and fit features"
    >
      <div className="mx-auto w-full max-w-[min(100%,1420px)] px-5 sm:px-8 lg:px-12 xl:px-14 2xl:px-16">
        {/* Row 1: image left */}
        <div className="grid grid-cols-1 items-center gap-8 border-b border-slate-100 py-10 max-md:gap-8 max-md:px-0 md:grid-cols-12 md:items-stretch md:gap-12 md:px-0 md:pb-14 md:pt-0 lg:gap-14 xl:gap-16">
          <div className="w-full max-md:-ml-5 max-md:w-[calc(100%+1.25rem)] max-md:max-w-none md:col-span-6 md:ml-0 md:w-auto">
            <BrowseFitVisual />
          </div>
          <article
            className="w-full max-md:px-5 max-md:text-center md:col-span-6 md:px-0 md:text-left"
            aria-labelledby="feature-best-fit-heading"
          >
            <FeatureKicker>College match · 2,000+ schools</FeatureKicker>
            <FeatureDisplayTitle id="feature-best-fit-heading">
              Find colleges that fit you, not just your GPA
            </FeatureDisplayTitle>
            <FeatureBody>
              PathPicker compares your personality, goals, and academics to 2,000+ universities so you can see
              where you&apos;re likely to thrive, not only where you have a shot on paper or a high ranking.
            </FeatureBody>
            <FeatureDivider />
            <CheckList compactItems={BROWSE_FIT_BULLETS_COMPACT} />
            <PrimaryCta>College Match Quiz</PrimaryCta>
          </article>
        </div>

        {/* Row 2: image right */}
        <div
          id="deep-profile-rankings"
          className="scroll-mt-28 grid grid-cols-1 items-center gap-8 border-b border-slate-100 py-10 max-md:gap-8 max-md:px-0 md:grid-cols-12 md:items-stretch md:gap-12 md:py-14 md:px-0 lg:gap-14 xl:gap-16"
        >
          <article
            className="w-full max-md:order-2 max-md:px-5 max-md:text-center md:order-1 md:col-span-6 md:px-0 md:text-left"
            aria-labelledby="feature-deep-fit-heading"
          >
            <FeatureKicker>Personality-led college fit</FeatureKicker>
            <FeatureDisplayTitle id="feature-deep-fit-heading">
              Admission odds and happiness, together
            </FeatureDisplayTitle>
            <FeatureBody>
              See how your profile lines up with admission chances, student satisfaction, campus culture, and 100+
              deeper fit signals. We show how students like you actually fare so you can weigh odds of getting in
              against whether you&apos;ll be happy there.
            </FeatureBody>
            <FeatureDivider />
            <CheckList compactItems={DEEP_PROFILE_BULLETS_COMPACT} />
            <PrimaryCta>College Match Quiz</PrimaryCta>
          </article>
          <div className="w-full max-md:mx-auto max-md:order-1 max-md:max-w-[min(100%,300px)] md:order-2 md:col-span-6 md:mx-0 md:w-full">
            <DeepProfileFeatureVisual />
          </div>
        </div>

        {/* Row 3: image left */}
        <div className="grid grid-cols-1 items-center gap-8 py-10 max-md:gap-8 max-md:px-0 md:grid-cols-12 md:items-stretch md:gap-12 md:py-14 md:px-0 lg:gap-14 xl:gap-16">
          <div className="w-full max-md:mx-auto max-md:max-w-[min(100%,300px)] md:col-span-6 md:mx-0 md:w-full">
            <AdmissionChancesVisual />
          </div>
          <article
            className="w-full max-md:px-5 max-md:text-center md:col-span-6 md:px-0 md:text-left"
            aria-labelledby="feature-deep-stats-heading"
          >
            <FeatureKicker>Will you be happy there?</FeatureKicker>
            <FeatureDisplayTitle id="feature-deep-stats-heading">
              Deep student signals beyond rankings
            </FeatureDisplayTitle>
            <FeatureBody>
              Loneliness, burnout, belonging, and momentum are hard to guess from a brochure. PathPicker turns those
              feelings into readable stats so you can compare schools on day-to-day life, not prestige alone.
            </FeatureBody>
            <PrimaryCta>College Match Quiz</PrimaryCta>
          </article>
        </div>
      </div>
    </section>
  );
}
