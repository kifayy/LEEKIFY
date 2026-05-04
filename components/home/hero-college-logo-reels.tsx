"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";

/** Same CDN set as desktop hero (storage.googleapis.com/images_592) */
export const HERO_COLLEGE_LOGOS = [
  "https://storage.googleapis.com/images_592/EieCC2-WAAExIcV.png",
  "https://storage.googleapis.com/images_592/4821_ucla_bruins-alternate-1996.png",
  "https://storage.googleapis.com/images_592/USC_Trojans.webp",
  "https://storage.googleapis.com/images_592/Harvard-Crest-Sticker-StickerMule-200045029.webp",
  "https://storage.googleapis.com/images_592/images%20(2).jfif",
  "https://storage.googleapis.com/images_592/EZz208WX0AAfEXm.png",
  "https://storage.googleapis.com/images_592/images%20(3).png",
  "https://storage.googleapis.com/images_592/SE_sdsulogo_screenshot.jpg",
  "https://storage.googleapis.com/images_592/University%2Bof%2BTexas%2BFeatured%2BImage.webp",
  "https://storage.googleapis.com/images_592/images%20(4).png",
  "https://storage.googleapis.com/images_592/getimage.jfif",
] as const;

/** Deterministic shuffle per row (seeded from `rowIndex`) — different order per strip, stable SSR/hydration. */
function shuffledLogosForRow(rowIndex: number): (typeof HERO_COLLEGE_LOGOS)[number][] {
  const a = [...HERO_COLLEGE_LOGOS];
  let state = ((rowIndex + 1) * 7919 + 124537) >>> 0;
  if (state === 0) state = 0x6eed3849;
  for (let i = a.length - 1; i > 0; i--) {
    state = (Math.imul(state, 1103515245) + 12345) >>> 0;
    const j = state % (i + 1);
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
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

const ROW_LOGO_ORDERS = HERO_LOGO_REEL_ROWS.map((_, rowIndex) => shuffledLogosForRow(rowIndex));

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
};

export function HeroCollegeLogoReels({
  idPrefix,
  className,
  rowGapClassName = "gap-3 py-5 md:gap-3.5",
  spacerClassName = "inline-block w-[3.75rem] shrink-0 md:w-[5.25rem] lg:w-28",
  tileClassName = "relative block size-11 shrink-0 overflow-hidden rounded-xl shadow-[0_2px_12px_rgba(76,29,149,0.35)] ring-1 ring-white/20",
  trackPaddingClassName = "px-6 lg:px-8",
  rowWrapperClassName = "marquee-fade-edges mx-auto w-full overflow-hidden opacity-[0.58] saturate-[0.92] brightness-105",
  imageSizes = "44px",
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
          <div key={`${idPrefix}-row-${rowIndex}`} className={rowWrapperClassName}>
            <div
              className={cn(
                "flex w-max shrink-0 items-center gap-0 motion-reduce:animate-none motion-reduce:opacity-70",
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
                  <span key={`${idPrefix}-${rowIndex}-logo-${i}`} className={tileClassName}>
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
