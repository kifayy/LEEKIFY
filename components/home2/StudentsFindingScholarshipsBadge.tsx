import Image from "next/image";

import { HOME2_PURPLE } from "./constants";
import {
  testimonialAvatarObjectClass,
  testimonialAvatarUrl,
  type TestimonialAvatarIndex,
} from "./testimonials";

const TESTIMONIAL_STACK_MAX = 9;

/** Overlapping headshots (`BRAND_MEDIA.testimonialAvatars` — awarded-stie facepile). */
export function TestimonialAvatarStack({
  className,
  count,
  compact,
  loadEager = false,
}: {
  className?: string;
  count?: number;
  compact?: boolean;
  loadEager?: boolean;
}) {
  const n = Math.min(TESTIMONIAL_STACK_MAX, Math.max(1, Math.floor(count ?? TESTIMONIAL_STACK_MAX)));

  const size = compact ? 24 : 32;
  const stackGap = compact ? "-space-x-1.5" : "-space-x-2";
  const ring = compact ? "ring-1" : "ring-2";
  const sizes = compact ? "24px" : "(min-width: 768px) 36px, 32px";
  const imgClass = compact
    ? `inline-block h-6 w-6 rounded-full ${ring} ring-white object-cover`
    : `inline-block h-8 w-8 rounded-full ${ring} ring-white object-cover md:h-9 md:w-9`;

  return (
    <div
      className={`flex max-w-full shrink-0 justify-center overflow-hidden p-1 ${className ?? ""}`.trim()}
    >
      <div className={`flex ${stackGap}`}>
        {Array.from({ length: n }, (_, i) => {
          const isFirst = i === 0;
          const testimonialIdx = i as TestimonialAvatarIndex;
          return (
            <Image
              key={i}
              src={testimonialAvatarUrl(testimonialIdx)}
              alt=""
              width={size}
              height={size}
              sizes={sizes}
              quality={70}
              priority={Boolean(loadEager && isFirst)}
              loading={loadEager ? "eager" : "lazy"}
              fetchPriority={loadEager ? (isFirst ? "high" : "auto") : "low"}
              className={`${imgClass} ${testimonialAvatarObjectClass(testimonialIdx)}`}
            />
          );
        })}
      </div>
    </div>
  );
}

export function StudentsLoveHeroPillBody({
  heartClassName = "text-red-500",
  textClassName,
}: {
  heartClassName?: string;
  textClassName?: string;
}) {
  return (
    <div className="flex min-w-0 max-w-full flex-wrap items-center justify-center gap-1.5 sm:gap-2 md:justify-start">
      <TestimonialAvatarStack count={4} compact className="shrink-0 p-0" />
      <span className={`min-w-0 text-left leading-snug ${textClassName ?? ""}`.trim()}>
        20k+ Students<span className={heartClassName}>❤️</span>
      </span>
    </div>
  );
}

export function StudentsFindingScholarshipsBadge({
  className = "mb-8",
}: {
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center ${className}`.trim()}>
      <div className="-mb-2 flex flex-col items-center">
        <p className="mb-2 text-center text-xs font-bold text-neutral-800 md:text-sm">
          <span style={{ color: HOME2_PURPLE }}>20k+ students</span> beating the
          scholarship competition
        </p>
        <TestimonialAvatarStack count={9} loadEager />
      </div>
    </div>
  );
}
