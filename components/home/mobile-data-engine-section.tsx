import { HomeOptimizedImage } from "@/components/home/home-optimized-image";
import { MobileDataEngineFeatureCards } from "@/components/home/mobile-data-engine-feature-cards";
import { MobileDataEngineMetrics } from "@/components/home/mobile-data-engine-metrics";
import {
  MOBILE_DATA_ENGINE_DASHBOARD_IMAGE_ALT,
  MOBILE_DATA_ENGINE_DASHBOARD_IMAGE_URL,
} from "@/lib/mobile-data-engine-content";

/** Mobile-only blocks below trust ratings — Claude-inspired layout. */
export function MobileDataEngineSection() {
  return (
    <div className="-mx-4 mt-12 overflow-x-hidden border-t border-[#EBEBEA] bg-[#FAFAF9] px-4 py-12 sm:mx-0 sm:rounded-none">
      <div className="mx-auto flex max-w-[26rem] flex-col gap-14">
        <MobileDataEngineFeatureCards />

        <div className="flex flex-col gap-8">
          <div className="relative mr-auto w-full max-w-[min(100%,22rem)] -translate-x-3">
            <HomeOptimizedImage
              src={MOBILE_DATA_ENGINE_DASHBOARD_IMAGE_URL}
              alt={MOBILE_DATA_ENGINE_DASHBOARD_IMAGE_ALT}
              width={1280}
              height={1109}
              className="h-auto w-full object-contain object-left"
              sizes="(max-width: 767px) min(100vw - 2rem, 352px)"
              loading="lazy"
            />
          </div>
          <MobileDataEngineMetrics />
        </div>
      </div>
    </div>
  );
}
