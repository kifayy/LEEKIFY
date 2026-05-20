"use client";

import * as React from "react";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { HOME_STAR_RATING_ALT, HOME_TRUSTPILOT_ALT } from "@/lib/home-image-seo";

const STAR_FULL = "/images/social-proof/star-full.svg";
const STAR_HALF = "/images/social-proof/star-half.svg";
const GOOGLE_LOGO = "/images/social-proof/google-colored.svg";
const APP_STORE_LOGO = "/images/social-proof/app-store-badge.svg";
const TRUSTPILOT_GRAPHIC = "/images/social-proof/trustpilot.png";

function RatingStars({
  scoreLabel,
  compact = false,
}: {
  /** e.g. 4.7, renders full + half stars */
  scoreLabel: number;
  compact?: boolean;
}) {
  const full = Math.floor(scoreLabel);
  const remainder = scoreLabel - full;
  const showHalf = remainder >= 0.25 && remainder < 0.95;

  const cells: ("full" | "half")[] = [];
  for (let i = 0; i < 5; i++) {
    if (i < full) cells.push("full");
    else if (i === full && showHalf) cells.push("half");
  }

  const starClass = compact
    ? "h-[15px] w-[15px] sm:h-[18px] sm:w-[18px]"
    : "h-[18px] w-[18px] sm:h-[23px] sm:w-[23px]";
  const scoreClass = compact
    ? "text-[0.6875rem] sm:text-xs"
    : "text-xs sm:text-sm";

  return (
    <div className={cn("flex items-center", compact ? "gap-0.5 sm:gap-1" : "gap-1 sm:gap-1.5")}>
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
          "whitespace-nowrap font-semibold tabular-nums text-neutral-700",
          scoreClass,
        )}
      >
        {scoreLabel.toFixed(1)} / 5
      </span>
    </div>
  );
}

function TrustpilotBlock({ priority }: { priority?: boolean }) {
  return (
    <div className="flex min-h-[96px] shrink-0 justify-center pt-3 sm:min-h-[130px] sm:pt-6">
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
          width={220}
          height={160}
          className="h-auto w-[min(100vw-2rem,148px)] max-w-[148px] sm:w-[min(100vw-2rem,200px)] sm:max-w-[200px]"
          priority={priority}
        />
      </a>
    </div>
  );
}

function GoogleRatingsColumn() {
  return (
    <div className="flex min-h-[96px] flex-col items-center justify-center gap-1.5 sm:min-h-[130px] sm:gap-2">
      <Image
        src={GOOGLE_LOGO}
        alt="Google"
        width={80}
        height={32}
        className="h-6 w-16 object-contain sm:h-8 sm:w-20"
      />
      <RatingStars scoreLabel={4.7} />
    </div>
  );
}

function AppStoreRatingsColumn() {
  return (
    <div className="flex min-h-[88px] flex-col items-center justify-center gap-2.5 px-1 sm:min-h-[118px] sm:gap-2 sm:px-0">
      <Image
        src={APP_STORE_LOGO}
        alt="App Store"
        width={145}
        height={35}
        className="h-6 w-auto max-w-[96px] object-contain sm:h-7 sm:max-w-[118px]"
      />
      <RatingStars scoreLabel={4.6} compact />
    </div>
  );
}

/**
 * Self-hosted badges under `/public/images/social-proof/`.
 * Mobile: horizontal carousel with two cards visible at a time.
 */
export function SocialRatingsBar() {
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi>();
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    if (!carouselApi) return;
    const onSelect = () => setActive(carouselApi.selectedScrollSnap());
    onSelect();
    carouselApi.on("select", onSelect);
    carouselApi.on("reInit", onSelect);
    return () => {
      carouselApi.off("select", onSelect);
      carouselApi.off("reInit", onSelect);
    };
  }, [carouselApi]);

  return (
    <>
      {/* Mobile carousel */}
      <div className="w-full sm:hidden">
        <Carousel
          aria-label="Store and review ratings"
          opts={{ loop: false, align: "start", duration: 20 }}
          setApi={setCarouselApi}
          className="w-full [--ratings-carousel-gap:1.125rem] [--slide-w:calc((100%-var(--ratings-carousel-gap))/2)]"
        >
          <CarouselContent className="-ml-0 gap-[var(--ratings-carousel-gap)] px-4">
            <CarouselItem className="flex min-w-0 flex-[0_0_var(--slide-w)] flex-col items-center justify-center pl-0">
              <TrustpilotBlock priority />
            </CarouselItem>
            <CarouselItem className="flex min-w-0 flex-[0_0_var(--slide-w)] flex-col items-center justify-center pl-0">
              <GoogleRatingsColumn />
            </CarouselItem>
            <CarouselItem className="flex min-w-0 flex-[0_0_var(--slide-w)] flex-col items-center justify-center pl-0">
              <AppStoreRatingsColumn />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
        <nav className="flex justify-center gap-1.5 pt-4" aria-label="Rating slides">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              type="button"
              aria-label={
                i === 0 ? "Trustpilot rating" : i === 1 ? "Google rating" : "App Store rating"
              }
              aria-current={active === i ? "true" : undefined}
              className={cn(
                "h-1.5 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300",
                active === i
                  ? "w-6 bg-violet-400"
                  : "w-1.5 bg-neutral-200 hover:bg-neutral-300",
              )}
              onClick={() => carouselApi?.scrollTo(i)}
            />
          ))}
        </nav>
      </div>

      {/* Tablet and up */}
      <div className="hidden flex-row flex-wrap items-center justify-center gap-10 sm:flex lg:gap-14">
        <TrustpilotBlock />
        <GoogleRatingsColumn />
        <AppStoreRatingsColumn />
      </div>
    </>
  );
}
