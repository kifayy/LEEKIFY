"use client";

import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { HOME_STAR_RATING_ALT, HOME_TRUSTPILOT_ALT } from "@/lib/home-image-seo";

const STAR_FULL = "/images/social-proof/star-full.svg";
const STAR_HALF = "/images/social-proof/star-half.svg";
const GOOGLE_LOGO = "/images/social-proof/google-colored.svg";
const TRUSTPILOT_GRAPHIC = "/assets/Framess%2063.png";

function RatingStars({
  scoreLabel,
  onDark = false,
}: {
  /** e.g. 4.7, renders full + half stars */
  scoreLabel: number;
  onDark?: boolean;
}) {
  const full = Math.floor(scoreLabel);
  const remainder = scoreLabel - full;
  const showHalf = remainder >= 0.25 && remainder < 0.95;

  const cells: ("full" | "half")[] = [];
  for (let i = 0; i < 5; i++) {
    if (i < full) cells.push("full");
    else if (i === full && showHalf) cells.push("half");
  }

  const starClass = "h-[18px] w-[18px] sm:h-[23px] sm:w-[23px]";
  const scoreClass = "text-xs sm:text-sm";

  return (
    <div className="flex items-center gap-1 sm:gap-1.5">
      <div className="flex items-center gap-px">
        {cells.map((k, i) =>
          k === "full" ? (
            <Image
              key={`${k}-${i}`}
              src={STAR_FULL}
              alt={HOME_STAR_RATING_ALT}
              width={23}
              height={23}
              className={starClass}
              aria-hidden
            />
          ) : (
            <Image
              key={`${k}-${i}`}
              src={STAR_HALF}
              alt={HOME_STAR_RATING_ALT}
              width={23}
              height={23}
              className={starClass}
              aria-hidden
            />
          )
        )}
      </div>
      <span
        className={cn(
          "whitespace-nowrap font-semibold tabular-nums",
          onDark ? "text-white/90" : "text-neutral-700",
          scoreClass,
        )}
      >
        {scoreLabel.toFixed(1)} / 5
      </span>
    </div>
  );
}

function TrustpilotBlock({
  priority,
  wrapperClassName,
}: {
  priority?: boolean;
  wrapperClassName?: string;
}) {
  return (
    <div className={cn("flex shrink-0 justify-center", wrapperClassName)}>
      <a
        href="https://www.trustpilot.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block shrink-0 transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00b67a]"
        aria-label="Trustpilot reviews (opens in new tab)"
      >
        <Image
          src={TRUSTPILOT_GRAPHIC}
          alt={HOME_TRUSTPILOT_ALT}
          width={280}
          height={120}
          unoptimized
          className="h-auto w-[min(100vw-2rem,168px)] max-w-[168px] sm:w-[200px] sm:max-w-[200px]"
          priority={priority}
        />
      </a>
    </div>
  );
}

function GoogleRatingsColumn({
  onDark = false,
  wrapperClassName,
}: {
  onDark?: boolean;
  wrapperClassName?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-1.5",
        wrapperClassName,
      )}
    >
      <Image
        src={GOOGLE_LOGO}
        alt="Google"
        width={80}
        height={32}
        className="h-6 w-16 object-contain sm:h-8 sm:w-20"
      />
      <RatingStars scoreLabel={4.7} onDark={onDark} />
    </div>
  );
}

/**
 * Self-hosted badges under `/public/images/social-proof/`.
 * Mobile: horizontal carousel with two cards visible at a time.
 */
type SocialRatingsBarProps = {
  /** Light score text for purple/dark backgrounds */
  variant?: "default" | "onDark";
};

export function SocialRatingsBar({ variant = "default" }: SocialRatingsBarProps) {
  const onDark = variant === "onDark";

  return (
    <>
      {/* Mobile carousel */}
      <div className="w-full sm:hidden">
        <Carousel
          aria-label="Store and review ratings"
          opts={{ loop: false, align: "start", duration: 20 }}
          className="w-full [--ratings-carousel-gap:1.125rem] [--slide-w:calc((100%-var(--ratings-carousel-gap))/2)]"
        >
          <CarouselContent className="-ml-0 gap-[var(--ratings-carousel-gap)] px-4">
            <CarouselItem className="flex min-w-0 flex-[0_0_var(--slide-w)] flex-col items-center justify-center pl-0">
              <TrustpilotBlock priority wrapperClassName="min-h-[96px] pt-5" />
            </CarouselItem>
            <CarouselItem className="flex min-w-0 flex-[0_0_var(--slide-w)] flex-col items-center justify-center pl-0">
              <GoogleRatingsColumn onDark={onDark} wrapperClassName="min-h-[96px]" />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>

      {/* Tablet and up */}
      <div className="hidden sm:flex sm:items-center sm:justify-center sm:gap-12 md:gap-16 lg:gap-20">
        <TrustpilotBlock wrapperClassName="items-center" />
        <GoogleRatingsColumn onDark={onDark} wrapperClassName="gap-2" />
      </div>
    </>
  );
}
