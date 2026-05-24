import {
  DESKTOP_SECTION_HEADING_ACCENT_CLASS,
  DESKTOP_SECTION_HEADING_CLASS,
} from "@/components/home/desktop-section-typography";
import {
  MOBILE_DATA_ENGINE_FEATURES_TITLE_ACCENT,
  MOBILE_DATA_ENGINE_FEATURES_TITLE_PREFIX,
  MOBILE_DATA_ENGINE_METRICS_TITLE_ACCENT,
  MOBILE_DATA_ENGINE_METRICS_TITLE_PREFIX,
} from "@/lib/mobile-data-engine-content";

export function DataEngineFeaturesHeading() {
  return (
    <h2 className={DESKTOP_SECTION_HEADING_CLASS}>
      {MOBILE_DATA_ENGINE_FEATURES_TITLE_PREFIX}
      <span className={DESKTOP_SECTION_HEADING_ACCENT_CLASS}>
        {MOBILE_DATA_ENGINE_FEATURES_TITLE_ACCENT}
      </span>
    </h2>
  );
}

export function DataEngineMetricsHeading() {
  return (
    <h2 className={DESKTOP_SECTION_HEADING_CLASS}>
      {MOBILE_DATA_ENGINE_METRICS_TITLE_PREFIX}
      <span className={DESKTOP_SECTION_HEADING_ACCENT_CLASS}>
        {MOBILE_DATA_ENGINE_METRICS_TITLE_ACCENT}
      </span>
    </h2>
  );
}
