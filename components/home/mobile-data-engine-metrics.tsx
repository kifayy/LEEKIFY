"use client";

import {
  MOBILE_DATA_ENGINE_METRICS,
  MOBILE_DATA_ENGINE_METRICS_SUBTITLE,
  MOBILE_DATA_ENGINE_METRICS_TITLE,
  type MobileDataEngineMetric,
} from "@/lib/mobile-data-engine-content";
import { useCountUp } from "@/components/home/use-count-up";
import { useInViewOnce } from "@/components/home/use-in-view-once";

const METRIC_ACCENT = "#956DFE";

function formatMetricValue(n: number) {
  return n.toLocaleString("en-US");
}

function MetricCell({ metric, animate }: { metric: MobileDataEngineMetric; animate: boolean }) {
  const count = useCountUp(metric.value, { enabled: animate, duration: 1800 });

  return (
    <div className="flex gap-3">
      <span
        className="w-[3px] shrink-0 self-stretch rounded-full"
        style={{ backgroundColor: METRIC_ACCENT, minHeight: "3.25rem" }}
        aria-hidden
      />
      <div className="min-w-0 pb-1">
        <p className="font-[family-name:var(--font-inter)] text-[1.875rem] font-bold leading-[1.05] tracking-[-0.03em] text-[#3D3D3A] tabular-nums">
          {formatMetricValue(count)}
          {metric.suffix}
        </p>
        <p className="mt-2 font-[family-name:var(--font-inter)] text-[0.8125rem] font-normal leading-[1.45] text-[#6B6B6B]">
          {metric.label}
        </p>
      </div>
    </div>
  );
}

export function MobileDataEngineMetrics() {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();

  return (
    <div ref={ref} className="pt-2 text-center">
      <h2 className="font-[family-name:var(--font-inter)] text-[1.5rem] font-semibold leading-[1.2] tracking-[-0.03em] text-[#1A1A18]">
        {MOBILE_DATA_ENGINE_METRICS_TITLE}
      </h2>
      <p className="mx-auto mt-2.5 max-w-[21rem] font-[family-name:var(--font-inter)] text-[0.9375rem] font-normal leading-[1.55] text-[#6B6B6B]">
        {MOBILE_DATA_ENGINE_METRICS_SUBTITLE}
      </p>

      <div className="mt-9 grid grid-cols-2 gap-x-5 gap-y-9 text-left">
        {MOBILE_DATA_ENGINE_METRICS.map((metric) => (
          <MetricCell key={metric.label} metric={metric} animate={inView} />
        ))}
      </div>
    </div>
  );
}
