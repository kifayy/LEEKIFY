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

const STAR_FULL = "/images/social-proof/star-full.svg";
const STAR_HALF = "/images/social-proof/star-half.svg";
const GOOGLE_LOGO = "/images/social-proof/google-colored.svg";
const APP_STORE_LOGO = "/images/social-proof/app-store-badge.svg";
const TRUSTPILOT_GRAPHIC = "/images/social-proof/trustpilot.png";

function RatingStars({
  scoreLabel,
}: {
  /** e.g. 4.7, renders full + half stars */
  scoreLabel: number;
}) {
  const full = Math.floor(scoreLabel);
  const remainder = scoreLabel - full;
  const showHalf = remainder >= 0.25 && remainder < 0.95;

  const cells: ("full" | "half")[] = [];
  for (let i = 0; i < 5; i++) {
    if (i < full) cells.push("full");
    else if (i === full && showHalf) cells.push("half");
  }

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-px">
        {cells.map((k, i) =>
          k === "full" ? (
            <Image key={`${k}-${i}`} src={STAR_FULL} alt="" width={23} height={23} />
          ) : (
            <Image key={`${k}-${i}`} src={STAR_HALF} alt="" width={23} height={23} />
          )
        )}
      </div>
      <span className="whitespace-nowrap text-sm font-semibold tabular-nums text-neutral-700">
        {scoreLabel.toFixed(1)} / 5
      </span>
    </div>
  );
}

function TrustpilotBlock({ priority }: { priority?: boolean }) {
  return (
    <div className="flex min-h-[130px] shrink-0 justify-center pt-6">
      <a
        href="https://www.trustpilot.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block shrink-0 transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00b67a]"
        aria-label="Trustpilot reviews (opens in new tab)"
      >
        <Image
          src={TRUSTPILOT_GRAPHIC}
          alt=""
          width={220}
          height={160}
          className="h-auto w-[min(100vw-2rem,200px)] max-w-[200px]"
          priority={priority}
        />
      </a>
    </div>
  );
}

function GoogleRatingsColumn() {
  return (
    <div className="flex min-h-[130px] flex-col items-center justify-center gap-2">
      <Image
        src={GOOGLE_LOGO}
        alt="Google"
        width={80}
        height={32}
        className="h-8 w-20 object-contain"
      />
      <RatingStars scoreLabel={4.7} />
    </div>
  );
}

function AppStoreRatingsColumn() {
  return (
    <div className="flex min-h-[130px] flex-col items-center justify-center gap-2">
      <Image
        src={APP_STORE_LOGO}
        alt="App Store"
        width={145}
        height={35}
        className="h-9 max-w-[145px] object-contain"
      />
      <RatingStars scoreLabel={4.6} />
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
          className="w-full [--ratings-carousel-gap:0.75rem] [--slide-w:calc((100%-var(--ratings-carousel-gap))/2)]"
        >
          <CarouselContent className="-ml-0 gap-[var(--ratings-carousel-gap)] px-3">
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
        <nav className="flex justify-center gap-1.5 pt-5" aria-label="Rating slides">
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
