import Image from "next/image";
import { AdmissionChancePillsReel } from "@/components/home/admission-chance-pills-reel";
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
  /** When true, no white wash on the left so art can sit flush to the card edge (browse-fit phone mock). */
  omitLeftFade?: boolean;
}) {
  const isStrong = strength === "strong";
  return (
    <div className="pointer-events-none absolute inset-0 z-[2]" aria-hidden>
      {/* Bottom fade — strong = browse-fit: softer than before, still grounds the card. */}
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
      {/* Left edge */}
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
      {/* Right edge */}
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
    <div className="relative overflow-hidden rounded-[28px] border border-slate-200/70 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: LAVENDER_PANEL }}
      />
      {/* In-flow image so tall art isn’t clipped (absolute + short min-h hid the top). */}
      <div className="relative z-[1] w-full px-0 pb-0 pt-1 sm:pt-2">
        <Image
          src={HOME_FEATURE_BROWSE_FIT_IMAGE_URL}
          alt=""
          width={800}
          height={600}
          unoptimized
          priority
          fetchPriority="high"
          decoding="async"
          className="block h-auto w-full max-w-[min(100%,520px)] object-contain object-left sm:max-w-[560px] md:max-w-[600px] lg:max-w-[640px]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <FeatureImageWhiteVignette strength="strong" omitLeftFade />
    </div>
  );
}

function DeepProfileFeatureVisual() {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-slate-200/70 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: LAVENDER_PANEL }}
      />
      <div className="relative z-[1] flex min-h-[260px] w-full items-center justify-center px-4 py-6 sm:min-h-[280px] sm:px-6 sm:py-8 md:min-h-[300px]">
        <Image
          src={HOME_FEATURE_DEEP_PROFILE_IMAGE_URL}
          alt=""
          width={800}
          height={600}
          unoptimized
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="mx-auto h-auto w-full max-w-[480px] object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <FeatureImageWhiteVignette strength="normal" />
    </div>
  );
}

function AdmissionChancesVisual() {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-slate-200/70 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
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

export function HomeScholarshipFeatureShowcase() {
  return (
    <section
      id="scholarship-features"
      className="w-full scroll-mt-28 bg-white px-4 py-10 md:px-6 md:py-16"
      aria-label="Scholarship features"
    >
      <div className="container mx-auto max-w-6xl space-y-12 md:space-y-16">
        <div className="flex flex-col items-stretch gap-8 md:flex-row md:items-center md:gap-12 lg:gap-16">
          <div className="w-full min-w-0 md:w-1/2">
            <BrowseFitVisual />
          </div>
          <div className="w-full text-center md:w-1/2 md:text-left">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 md:text-[clamp(1.375rem,1.35vw+0.85rem,2rem)] md:leading-tight">
              Find your best fit universities
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#6B7280] md:mx-0 md:mt-4 md:text-[clamp(0.875rem,0.35vw+0.78rem,1.0625rem)] md:leading-relaxed">
              Never wonder where you&apos;ll fit in best. We compare you to 2,000+ universities to find the perfect ones.
            </p>
          </div>
        </div>

        <div
          id="deep-profile-rankings"
          className="flex flex-col items-stretch gap-8 scroll-mt-28 md:flex-row-reverse md:items-center md:gap-12 lg:gap-16"
        >
          <div className="w-full min-w-0 md:w-1/2">
            <DeepProfileFeatureVisual />
          </div>
          <div className="w-full text-center md:w-1/2 md:text-left">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 md:text-[clamp(1.375rem,1.35vw+0.85rem,2rem)] md:leading-tight">
              Your full college fit
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#6B7280] md:mx-0 md:mt-4 md:text-[clamp(0.875rem,0.35vw+0.78rem,1.0625rem)] md:leading-relaxed">
              See how your profile lines up with admission odds, happiness, and 106+ deep datapoints about your profile.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-stretch gap-8 md:flex-row md:items-center md:gap-12 lg:gap-16">
          <div className="w-full min-w-0 md:w-1/2">
            <AdmissionChancesVisual />
          </div>
          <div className="w-full text-center md:w-1/2 md:text-left">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 md:text-[clamp(1.375rem,1.35vw+0.85rem,2rem)] md:leading-tight">
              Deep stats you need to know
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#6B7280] md:mx-0 md:mt-4 md:text-[clamp(0.875rem,0.35vw+0.78rem,1.0625rem)] md:leading-relaxed">
              Never guess which schools you&apos;ll fit in best with. We do all the hard work for you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
