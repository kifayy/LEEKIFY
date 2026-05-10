import Image from "next/image";
import { WeeklyMatchingBentoLottie } from "@/components/home/weekly-matching-bento-lottie";
import { AdmissionChancePillsReel } from "@/components/home/admission-chance-pills-reel";

const SCHOLARSHIPS_FASTER_IMAGE =
  "https://storage.googleapis.com/images_592/image-Photoroom%20(1).png";

/** Tint strongest at top, fades to white / transparent toward the bottom edge. */
const LAVENDER_PANEL =
  "linear-gradient(180deg, #F5F3FF 0%, rgba(245,243,255,0.55) 55%, rgba(255,255,255,0) 100%)";
const MINT_PANEL =
  "linear-gradient(180deg, #ECFDF5 0%, rgba(236,253,245,0.55) 55%, rgba(255,255,255,0) 100%)";
const SKY_PANEL =
  "linear-gradient(180deg, #F0F9FF 0%, rgba(240,249,255,0.55) 55%, rgba(255,255,255,0) 100%)";

function FasterScholarshipsVisual() {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-slate-200/70 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: LAVENDER_PANEL }}
      />
      <div className="relative z-[1] flex min-h-[260px] w-full items-center justify-center px-4 py-6 sm:min-h-[280px] sm:px-6 sm:py-8 md:min-h-[300px]">
        <Image
          src={SCHOLARSHIPS_FASTER_IMAGE}
          alt="Student with university logos"
          width={800}
          height={600}
          unoptimized
          className="mx-auto h-auto w-full max-w-[480px] object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
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

function WeeklyMatchingVisual() {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-slate-200/70 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: MINT_PANEL }}
      />
      <div className="relative z-[1] flex min-h-[260px] w-full flex-col items-center justify-center px-4 py-6 sm:min-h-[280px] sm:py-8 md:min-h-[300px]">
        <WeeklyMatchingBentoLottie />
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
            <WeeklyMatchingVisual />
          </div>
          <div className="w-full text-center md:w-1/2 md:text-left">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 md:text-[clamp(1.375rem,1.35vw+0.85rem,2rem)] md:leading-tight">
              Browse 2k+ Colleges
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#6B7280] md:mx-0 md:mt-4 md:text-[clamp(0.875rem,0.35vw+0.78rem,1.0625rem)] md:leading-relaxed">
              See how your deep student profile matches up with thousands of colleges, so you know which schools to add as
              priorities.
            </p>
          </div>
        </div>

        <div
          id="deep-profile-rankings"
          className="flex flex-col items-stretch gap-8 md:flex-row-reverse md:items-center md:gap-12 lg:gap-16 scroll-mt-28"
        >
          <div className="w-full min-w-0 md:w-1/2">
            <FasterScholarshipsVisual />
          </div>
          <div className="w-full text-center md:w-1/2 md:text-left">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 md:text-[clamp(1.375rem,1.35vw+0.85rem,2rem)] md:leading-tight">
              Deep Profile Rankings
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#6B7280] md:mx-0 md:mt-4 md:text-[clamp(0.875rem,0.35vw+0.78rem,1.0625rem)] md:leading-relaxed">
              See your happiness, major match, chances of falling in love, and 103+ other deep data points based on your
              profile.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-stretch gap-8 md:flex-row md:items-center md:gap-12 lg:gap-16">
          <div className="w-full min-w-0 md:w-1/2">
            <AdmissionChancesVisual />
          </div>
          <div className="w-full text-center md:w-1/2 md:text-left">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 md:text-[clamp(1.375rem,1.35vw+0.85rem,2rem)] md:leading-tight">
              Your best matches all in one place
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
