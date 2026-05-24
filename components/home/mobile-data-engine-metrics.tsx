"use client";

import { DataEngineMetricsHeading } from "@/components/home/data-engine-section-headings";
import {
  MOBILE_DATA_ENGINE_METRICS,
  MOBILE_DATA_ENGINE_METRICS_SUBTITLE,
  type MobileDataEngineMetric,
} from "@/lib/mobile-data-engine-content";
import { useCountUp } from "@/components/home/use-count-up";
import { useInViewOnce } from "@/components/home/use-in-view-once";
import { cn } from "@/lib/utils";

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

type MobileDataEngineMetricsProps = {
  /** When false, only the stat grid is rendered (desktop column layout supplies its own header). */
  showHeader?: boolean;
  className?: string;
  gridClassName?: string;
};

export function MobileDataEngineMetrics({
  showHeader = true,
  className,
  gridClassName,
}: MobileDataEngineMetricsProps = {}) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();

  return (
    <div ref={ref} className={cn(showHeader && "pt-2 text-center", className)}>
      {showHeader ? (
        <>
          <DataEngineMetricsHeading />
          <p className="mx-auto mt-2.5 max-w-[21rem] font-[family-name:var(--font-inter)] text-[0.9375rem] font-normal leading-[1.55] text-[#6B6B6B]">
            {MOBILE_DATA_ENGINE_METRICS_SUBTITLE}
          </p>
        </>
      ) : null}

      <div
        className={
          gridClassName ??
          (showHeader ? "mt-9 grid grid-cols-2 gap-x-5 gap-y-9 text-left" : "grid grid-cols-2 gap-x-5 gap-y-9 text-left")
        }
      >
        {MOBILE_DATA_ENGINE_METRICS.map((metric) => (
          <MetricCell key={metric.label} metric={metric} animate={inView} />
        ))}
      </div>
    </div>
  );
}
