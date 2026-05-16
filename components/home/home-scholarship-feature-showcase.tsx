import Image from "next/image";
import { Check } from "lucide-react";

import { AdmissionChancePillsReel } from "@/components/home/admission-chance-pills-reel";
import { COLLEGE_MATCH_QUIZ_URL } from "@/lib/constants";
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
    <div className="pointer-events-none absolute inset-0 z-[2]" aria-hidden>
      <div
        className={
          isStrong
            ? "absolute inset-x-0 bottom-0 h-[56%] sm:h-[52%]"
            : "absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-white via-white/75 to-transparent sm:h-[40%]"
        }
        style={
          isStrong
            ? {
                background:
                  "linear-gradient(to top, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.55) 38%, rgba(255,255,255,0.18) 68%, transparent 100%)",
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
            ? "absolute inset-y-0 right-0 w-[min(34%,9.5rem)] sm:w-[min(30%,10rem)]"
            : "absolute inset-y-0 right-0 w-[min(28%,7rem)] bg-gradient-to-l from-white via-white/55 to-transparent sm:w-[min(24%,7.5rem)]"
        }
        style={
          isStrong
            ? {
                background:
                  "linear-gradient(to left, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.45) 45%, rgba(255,255,255,0.12) 75%, transparent 100%)",
              }
            : undefined
        }
      />
    </div>
  );
}

function BrowseFitVisual() {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-[0_4px_24px_rgba(15,23,42,0.06)] max-md:rounded-l-none md:rounded-[28px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: LAVENDER_PANEL }}
      />
      <div className="relative z-[1] w-full px-0 pb-0 pt-1 sm:pt-2">
        <Image
          src={HOME_FEATURE_BROWSE_FIT_IMAGE_URL}
          alt="PathPicker app preview matching you to universities"
          width={800}
          height={600}
          unoptimized
          priority
          fetchPriority="high"
          decoding="async"
          className="block h-auto w-full max-w-[min(100%,280px)] object-contain object-left md:max-w-[min(100%,430px)]"
          sizes="(max-width: 768px) 100vw, 45vw"
        />
      </div>
      <FeatureImageWhiteVignette strength="strong" omitLeftFade />
    </div>
  );
}

function DeepProfileFeatureVisual() {
  return (
    <div className="relative w-full max-w-full overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-[0_4px_24px_rgba(15,23,42,0.06)] md:rounded-[28px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: LAVENDER_PANEL }}
      />
      <div className="relative z-[1] flex min-h-[200px] w-full items-center justify-center px-4 py-6 sm:min-h-[220px] sm:px-6 sm:py-8 md:min-h-[240px]">
        <Image
          src={HOME_FEATURE_DEEP_PROFILE_IMAGE_URL}
          alt="Deep profile and fit scores in PathPicker"
          width={800}
          height={600}
          unoptimized
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="mx-auto h-auto w-full max-w-[min(100%,280px)] object-contain md:max-w-[min(100%,440px)] lg:max-w-[min(100%,480px)]"
          sizes="(max-width: 768px) 100vw, 45vw"
        />
      </div>
      <FeatureImageWhiteVignette strength="normal" />
    </div>
  );
}

function AdmissionChancesVisual() {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-[0_4px_24px_rgba(15,23,42,0.06)] md:rounded-[28px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: SKY_PANEL }}
      />
      <div className="relative z-[1] py-8 md:py-10">
        <AdmissionChancePillsReel />
      </div>
    </div>
  );
}

function FeatureKicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-[family-name:var(--font-poppins)] text-xs font-semibold uppercase tracking-[0.14em] text-[#7C3AED] sm:text-sm">
      {children}
    </p>
  );
}

function FeatureDisplayTitle({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2
      id={id}
      className="font-[family-name:var(--font-poppins)] mt-2 text-3xl font-bold tracking-[-0.03em] text-[#181A1D] sm:mt-3 sm:text-[clamp(1.75rem,3.2vw,2.65rem)] sm:leading-[1.08]"
    >
      {children}
    </h2>
  );
}

function FeatureBody({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 text-[15px] leading-relaxed text-slate-600 sm:text-[1.03rem] sm:leading-[1.62]">
      {children}
    </p>
  );
}

function FeatureDivider() {
  return <hr className="my-6 border-0 border-t border-slate-200" />;
}

function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-3 xl:grid xl:grid-cols-2 xl:gap-x-10 xl:gap-y-3 xl:space-y-0" role="list">
      {items.map((line) => (
        <li key={line} className="flex gap-3 text-[15px] leading-snug text-slate-700 sm:text-[1.02rem] sm:leading-snug">
          <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#956EFE]" strokeWidth={2.5} aria-hidden />
          <span>{line}</span>
        </li>
      ))}
    </ul>
  );
}

function PrimaryCta({ children }: { children: React.ReactNode }) {
  return (
    <a
      href={COLLEGE_MATCH_QUIZ_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-[#956EFE] px-6 py-3.5 text-center text-[0.9375rem] font-semibold text-white shadow-[0_4px_14px_rgba(149,110,254,0.35)] transition hover:bg-[#8658f5] hover:shadow-[0_6px_18px_rgba(149,110,254,0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 sm:w-auto"
    >
      {children}
    </a>
  );
}

const BROWSE_FIT_BULLETS = [
  "Side-by-side matches across 2,000+ real campuses.",
  "Rankings that blend personality, goals, and academics.",
  "Refresh your matches anytime your major, budget, or vibe changes.",
] as const;

const DEEP_PROFILE_BULLETS = [
  "Admission odds and happiness-style signals in one view.",
  "100+ datapoints tailored to your profile.",
  "Tradeoffs surfaced early (pace, pressure, social energy) before deposits.",
] as const;

const DEEP_STATS_BULLETS = [
  "Scenario lines for belonging, burnout, and momentum.",
  'Thousands of directional stats that make \u201cvibe checks\u201d concrete.',
  "Plain-language copy parents and counselors can quickly understand.",
] as const;

export function HomeScholarshipFeatureShowcase() {
  return (
    <section
      id="scholarship-features"
      className="w-full overflow-x-hidden scroll-mt-28 bg-white"
      aria-label="College match features"
    >
      <div className="mx-auto w-full max-w-[min(100%,1420px)] px-5 sm:px-8 lg:px-12 xl:px-14 2xl:px-16">
        {/* Row 1: image left */}
        <div className="grid grid-cols-1 items-center gap-8 border-b border-slate-100 py-10 md:grid-cols-12 md:items-stretch md:gap-12 md:py-14 lg:gap-14 xl:gap-16">
          <div className="-ml-5 w-[calc(100%+1.25rem)] sm:-ml-8 sm:w-[calc(100%+2rem)] md:col-span-6 md:ml-0 md:w-auto">
            <BrowseFitVisual />
          </div>
          <article
            className="md:col-span-6"
            aria-labelledby="feature-best-fit-heading"
          >
            <FeatureKicker>2,000+ universities</FeatureKicker>
            <FeatureDisplayTitle id="feature-best-fit-heading">
              Find where you actually fit
            </FeatureDisplayTitle>
            <FeatureBody>
              We compare your profile to 2,000+ real universities and show you the colleges where you&apos;re
              most likely to thrive, not just the ones that look good on a ranking list.
            </FeatureBody>
            <FeatureDivider />
            <CheckList items={BROWSE_FIT_BULLETS} />
            <PrimaryCta>College Match Quiz</PrimaryCta>
          </article>
        </div>

        {/* Row 2: image right */}
        <div
          id="deep-profile-rankings"
          className="scroll-mt-28 grid grid-cols-1 items-center gap-8 border-b border-slate-100 py-10 md:grid-cols-12 md:items-stretch md:gap-12 md:py-14 lg:gap-14 xl:gap-16"
        >
          <article
            className="md:order-1 md:col-span-6"
            aria-labelledby="feature-deep-fit-heading"
          >
            <FeatureKicker>Profile + outcomes</FeatureKicker>
            <FeatureDisplayTitle id="feature-deep-fit-heading">
              Your full college fit, not just odds
            </FeatureDisplayTitle>
            <FeatureBody>
              See how your profile lines up with admission chances, happiness, and 100+ deeper signals. We show how
              students like you actually fare, so you can catch mismatches early.
            </FeatureBody>
            <FeatureDivider />
            <CheckList items={DEEP_PROFILE_BULLETS} />
            <PrimaryCta>College Match Quiz</PrimaryCta>
          </article>
          <div className="w-full md:order-2 md:col-span-6">
            <DeepProfileFeatureVisual />
          </div>
        </div>

        {/* Row 3: image left */}
        <div className="grid grid-cols-1 items-center gap-8 py-10 md:grid-cols-12 md:items-stretch md:gap-12 md:py-14 lg:gap-14 xl:gap-16">
          <div className="md:col-span-6">
            <AdmissionChancesVisual />
          </div>
          <article className="md:col-span-6" aria-labelledby="feature-deep-stats-heading">
            <FeatureKicker>Signals you can feel</FeatureKicker>
            <FeatureDisplayTitle id="feature-deep-stats-heading">
              Make &ldquo;vibes&rdquo; measurable
            </FeatureDisplayTitle>
            <FeatureBody>
              Feelings like loneliness, burnout, or finally fitting in are predictable. We turn them into stats you
              can scan while exploring schools.
            </FeatureBody>
            <FeatureDivider />
            <CheckList items={DEEP_STATS_BULLETS} />
            <PrimaryCta>College Match Quiz</PrimaryCta>
          </article>
        </div>
      </div>
    </section>
  );
}
