"use client";

import { cn } from "@/lib/utils";

type CumulativeGpaGaugeProps = {
  gpa: number | null;
  maxScale: 4 | 5;
  className?: string;
};

const SIZE = 200;
const STROKE = 14;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function CumulativeGpaGauge({ gpa, maxScale, className }: CumulativeGpaGaugeProps) {
  const displayValue = gpa == null ? "0.00" : gpa.toFixed(2);
  const progress = gpa == null ? 0 : Math.min(Math.max(gpa / maxScale, 0), 1);
  const dashOffset = CIRCUMFERENCE * (1 - progress);

  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-full bg-white shadow-[0_8px_32px_rgba(149,110,254,0.18)]",
        className,
      )}
      style={{ width: SIZE, height: SIZE }}
      aria-label={`Cumulative GPA ${displayValue} out of ${maxScale.toFixed(1)}`}
      role="img"
    >
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="-rotate-90"
        aria-hidden
      >
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="#E8E4F8"
          strokeWidth={STROKE}
        />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="#956EFE"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          className="transition-[stroke-dashoffset] duration-500 ease-out"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-4xl font-bold tabular-nums tracking-tight text-[#181A1D]">
          {displayValue}
        </span>
        <span className="mt-0.5 text-sm font-medium text-[#6B7280]">Cumulative GPA</span>
      </div>
    </div>
  );
}
