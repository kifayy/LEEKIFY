"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { HERO_COLLEGE_LOGO_URLS, heroCollegeLogoTileBgClass } from "@/lib/hero-college-logos";

/** Same CDN set as desktop hero (storage.googleapis.com/images_592) */
export const HERO_COLLEGE_LOGOS = HERO_COLLEGE_LOGO_URLS;

/** Base seed; each row mixes in its index so SSR/hydration match and every row gets its own shuffle. */
const LOGO_BASE_SEED = 0x24f2d7cb >>> 0;
const ROW_SEED_MIX = 0x9e3779b9 >>> 0;

function seededOrderFromLogos(seed: number): (typeof HERO_COLLEGE_LOGOS)[number][] {
  const a = [...HERO_COLLEGE_LOGOS];
  let state = seed >>> 0;
  if (state === 0) state = 0x6eed3849;
  for (let i = a.length - 1; i > 0; i--) {
    state = (Math.imul(state, 1103515245) + 12345) >>> 0;
    const j = state % (i + 1);
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

function logoOrderForRow(rowIndex: number): (typeof HERO_COLLEGE_LOGOS)[number][] {
  return seededOrderFromLogos((LOGO_BASE_SEED + Math.imul(rowIndex, ROW_SEED_MIX)) >>> 0);
}

const HERO_LOGO_REEL_ROWS = [
  {
    animationClass: "motion-safe:animate-[marquee-x_40s_linear_infinite]",
    delaySec: 0,
  },
  {
    animationClass: "motion-safe:animate-[home2-marquee-back_46s_linear_infinite]",
    delaySec: -7.25,
  },
  {
    animationClass: "motion-safe:animate-[marquee-x_34s_linear_infinite]",
    delaySec: -14.5,
  },
  {
    animationClass: "motion-safe:animate-[home2-marquee-back_52s_linear_infinite]",
    delaySec: -21.125,
  },
  {
    animationClass: "motion-safe:animate-[marquee-x_38s_linear_infinite]",
    delaySec: -31.75,
  },
] as const;

const ROW_LOGO_ORDERS = HERO_LOGO_REEL_ROWS.map((_, rowIndex) => logoOrderForRow(rowIndex));

type HeroLogoTrackCell =
  | { kind: "logo"; src: (typeof HERO_COLLEGE_LOGOS)[number] }
  | { kind: "gap" };

function buildHeroLogoTrack(order: readonly (typeof HERO_COLLEGE_LOGOS)[number][]): HeroLogoTrackCell[] {
  const cycle = order.flatMap((src): HeroLogoTrackCell[] => [
    { kind: "logo", src },
    { kind: "gap" },
  ]);
  return [...cycle, ...cycle];
}

export type HeroCollegeLogoReelsProps = {
  /** Prefix for React keys (e.g. `desktop-hero` vs `mobile-hero`) */
  idPrefix: string;
  className?: string;
  rowGapClassName?: string;
  spacerClassName?: string;
  tileClassName?: string;
  trackPaddingClassName?: string;
  rowWrapperClassName?: string;
  imageSizes?: string;
  /** Hide the first N rows when viewport is below `md` (e.g. 2 for a denser mobile hero). */
  hiddenFirstRowsBelowMd?: number;
};

export function HeroCollegeLogoReels({
  idPrefix,
  className,
  rowGapClassName = "gap-3 py-5 md:gap-3.5",
  spacerClassName = "inline-block w-[3.75rem] shrink-0 md:w-[5.25rem] lg:w-28",
  tileClassName = "relative block size-11 shrink-0 overflow-hidden rounded-xl shadow-[0_2px_12px_rgba(76,29,149,0.35)] ring-1 ring-white/25",
  trackPaddingClassName = "px-6 lg:px-8",
  rowWrapperClassName = "marquee-fade-edges mx-auto w-full overflow-hidden",
  imageSizes = "44px",
  hiddenFirstRowsBelowMd,
}: HeroCollegeLogoReelsProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-[5] flex flex-col justify-center",
        rowGapClassName,
        className
      )}
      aria-hidden
    >
      {HERO_LOGO_REEL_ROWS.map(({ animationClass, delaySec }, rowIndex) => {
        const track = buildHeroLogoTrack(ROW_LOGO_ORDERS[rowIndex]!);
        return (
          <div
            key={`${idPrefix}-row-${rowIndex}`}
            className={cn(
              rowWrapperClassName,
              hiddenFirstRowsBelowMd !== undefined &&
                rowIndex < hiddenFirstRowsBelowMd &&
                "max-md:hidden"
            )}
          >
            <div
              className={cn(
                "flex w-max shrink-0 items-center gap-0 motion-reduce:animate-none",
                trackPaddingClassName,
                animationClass
              )}
              style={{ animationDelay: `${delaySec}s` }}
            >
              {track.map((cell, i) =>
                cell.kind === "gap" ? (
                  <span
                    key={`${idPrefix}-${rowIndex}-gap-${i}`}
                    className={spacerClassName}
                    aria-hidden
                  />
                ) : (
                  <span
                    key={`${idPrefix}-${rowIndex}-logo-${i}`}
                    className={cn(tileClassName, heroCollegeLogoTileBgClass(cell.src))}
                  >
                    <Image
                      src={cell.src}
                      alt=""
                      fill
                      className="object-cover"
                      sizes={imageSizes}
                      unoptimized
                    />
                  </span>
                )
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
