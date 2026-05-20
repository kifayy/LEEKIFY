import { AdmissionChancePillsReel } from "@/components/home/admission-chance-pills-reel";
import {
  MOBILE_DATA_ENGINE_FEATURES,
  MOBILE_DATA_ENGINE_FEATURES_SUBTITLE,
  MOBILE_DATA_ENGINE_FEATURES_TITLE,
} from "@/lib/mobile-data-engine-content";

export function MobileDataEngineFeatureCards() {
  return (
    <div className="relative z-10 flex flex-col gap-6">
      <div className="relative left-1/2 w-screen max-w-none -translate-x-1/2 pb-1">
        <AdmissionChancePillsReel />
      </div>

      <header className="text-center">
        <h2 className="font-[family-name:var(--font-inter)] text-[1.5rem] font-semibold leading-[1.2] tracking-[-0.03em] text-[#1A1A18]">
          {MOBILE_DATA_ENGINE_FEATURES_TITLE}
        </h2>
        <p className="mx-auto mt-2.5 max-w-[19rem] font-[family-name:var(--font-inter)] text-[0.9375rem] font-normal leading-[1.55] text-[#6B6B6B]">
          {MOBILE_DATA_ENGINE_FEATURES_SUBTITLE}
        </p>
      </header>

      <div className="flex flex-col gap-4">
        {MOBILE_DATA_ENGINE_FEATURES.map(({ title, description, icon: Icon, iconBg, iconColor }) => (
          <article
            key={title}
            className="flex flex-col items-center rounded-[1.5rem] border border-[#EBEBEA] bg-white px-6 py-8 text-center shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
          >
            <div
              className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{ backgroundColor: iconBg }}
            >
              <Icon
                className="h-[1.65rem] w-[1.65rem]"
                style={{ color: iconColor }}
                strokeWidth={1.65}
                aria-hidden
              />
            </div>
            <h3 className="font-[family-name:var(--font-inter)] text-[1.0625rem] font-semibold leading-snug tracking-[-0.02em] text-[#1A1A18]">
              {title}
            </h3>
            <p className="mt-3 max-w-[17.5rem] font-[family-name:var(--font-inter)] text-[0.875rem] font-normal leading-[1.65] text-[#6B6B6B]">
              {description}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
