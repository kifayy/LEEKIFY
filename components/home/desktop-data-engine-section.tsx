import { AdmissionChancePillsReel } from "@/components/home/admission-chance-pills-reel";
import { HomeOptimizedImage } from "@/components/home/home-optimized-image";
import { MobileDataEngineMetrics } from "@/components/home/mobile-data-engine-metrics";
import { PathQuizCtaButton } from "@/components/home/path-quiz-cta";
import {
  MOBILE_DATA_ENGINE_DASHBOARD_IMAGE_ALT,
  MOBILE_DATA_ENGINE_DASHBOARD_IMAGE_URL,
  MOBILE_DATA_ENGINE_FEATURES,
  MOBILE_DATA_ENGINE_FEATURES_SUBTITLE,
  MOBILE_DATA_ENGINE_FEATURES_TITLE,
  MOBILE_DATA_ENGINE_METRICS_SUBTITLE,
  MOBILE_DATA_ENGINE_METRICS_TITLE,
} from "@/lib/mobile-data-engine-content";

/** Desktop layout for the data-engine block — mobile uses `MobileDataEngineSection`. */
export function DesktopDataEngineSection() {
  return (
    <div className="overflow-hidden border-t border-[#EBEBEA] bg-white">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
        <AdmissionChancePillsReel />

        <header className="mx-auto mt-14 max-w-2xl text-center lg:mt-16">
          <h2 className="font-[family-name:var(--font-inter)] text-[clamp(1.75rem,2.5vw,2.5rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-[#1A1A18]">
            {MOBILE_DATA_ENGINE_FEATURES_TITLE}
          </h2>
          <p className="mx-auto mt-3 max-w-xl font-[family-name:var(--font-inter)] text-[1.0625rem] leading-[1.55] text-[#6B6B6B]">
            {MOBILE_DATA_ENGINE_FEATURES_SUBTITLE}
          </p>
        </header>

        <div className="mt-12 grid gap-6 md:grid-cols-3 lg:mt-14 lg:gap-8">
          {MOBILE_DATA_ENGINE_FEATURES.map(({ title, description, icon: Icon, iconBg, iconColor }) => (
            <article
              key={title}
              className="flex h-full flex-col rounded-[1.5rem] border border-[#EBEBEA] bg-white px-7 py-8 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
            >
              <div
                className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{ backgroundColor: iconBg }}
              >
                <Icon
                  className="h-[1.65rem] w-[1.65rem]"
                  style={{ color: iconColor }}
                  strokeWidth={1.65}
                  aria-hidden
                />
              </div>
              <h3 className="font-[family-name:var(--font-inter)] text-[1.125rem] font-semibold leading-snug tracking-[-0.02em] text-[#1A1A18]">
                {title}
              </h3>
              <p className="mt-3 font-[family-name:var(--font-inter)] text-[0.9375rem] leading-[1.65] text-[#6B6B6B]">
                {description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-16 grid items-center gap-12 lg:mt-20 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div className="relative mx-auto w-full max-w-[min(100%,32rem)] lg:mx-0 lg:max-w-none">
            <HomeOptimizedImage
              src={MOBILE_DATA_ENGINE_DASHBOARD_IMAGE_URL}
              alt={MOBILE_DATA_ENGINE_DASHBOARD_IMAGE_ALT}
              width={1280}
              height={1109}
              className="h-auto w-full object-contain"
              sizes="(min-width: 1024px) 480px, (min-width: 768px) 42vw, 90vw"
              loading="lazy"
            />
          </div>

          <div className="text-center lg:text-left">
            <h2 className="font-[family-name:var(--font-inter)] text-[clamp(1.5rem,2vw,2rem)] font-semibold leading-[1.2] tracking-[-0.03em] text-[#1A1A18]">
              {MOBILE_DATA_ENGINE_METRICS_TITLE}
            </h2>
            <p className="mx-auto mt-3 max-w-md font-[family-name:var(--font-inter)] text-[1rem] leading-[1.55] text-[#6B6B6B] lg:mx-0">
              {MOBILE_DATA_ENGINE_METRICS_SUBTITLE}
            </p>
            <MobileDataEngineMetrics
              showHeader={false}
              className="mt-8 lg:mt-10"
              gridClassName="grid grid-cols-2 gap-x-8 gap-y-10 text-left lg:gap-x-12 lg:gap-y-12"
            />
            <div className="mt-10 flex justify-center lg:mt-12 lg:justify-start">
              <PathQuizCtaButton variant="college" size="desktop" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
