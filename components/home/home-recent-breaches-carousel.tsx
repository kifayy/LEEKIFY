"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { shouldUseNextImageOptimizer } from "@/lib/remote-image-patterns";
import type { RecentBreach } from "@/lib/supabase/queries/recent-breaches";
import { cn } from "@/lib/utils";

type HomeRecentBreachesCarouselProps = {
  breaches: RecentBreach[];
};

function BreachLogo({ breach }: { breach: RecentBreach }) {
  const src = breach.logo_url;
  const optimize = src ? shouldUseNextImageOptimizer(src) : false;

  return (
    <span
      className="relative mx-auto flex h-[4.75rem] w-[4.75rem] items-center justify-center overflow-hidden rounded-[1.15rem] shadow-[0_6px_18px_rgba(24,6,46,0.12)] sm:h-[5.25rem] sm:w-[5.25rem]"
      style={{ backgroundColor: breach.logo_bg || "#111827" }}
    >
      {src ? (
        <Image
          src={src}
          alt=""
          width={84}
          height={84}
          className="h-full w-full object-contain p-2.5"
          unoptimized={!optimize}
          aria-hidden
        />
      ) : (
        <span className="font-[family-name:var(--font-poppins)] text-lg font-bold text-white">
          {breach.organization.slice(0, 1)}
        </span>
      )}
    </span>
  );
}

function BreachCard({ breach }: { breach: RecentBreach }) {
  return (
    <Link
      href={`/breach/${breach.slug}`}
      aria-label={`${breach.organization} breach — ${breach.rows_label}`}
      className="group flex w-[6.75rem] flex-col items-center text-center transition active:scale-[0.98] sm:w-[7.5rem]"
    >
      <BreachLogo breach={breach} />
      <p className="mt-2.5 font-[family-name:var(--font-poppins)] text-[0.6875rem] leading-tight text-[#6B7280] sm:text-xs">
        {breach.rows_label}
      </p>
      <p className="mt-1 font-[family-name:var(--font-poppins)] text-[0.8125rem] font-bold leading-tight text-[#18062E] group-hover:text-[#4E2FFF] sm:text-sm">
        {breach.organization}
      </p>
    </Link>
  );
}

export function HomeRecentBreachesCarousel({ breaches }: HomeRecentBreachesCarouselProps) {
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

  if (breaches.length === 0) return null;

  const snapCount = Math.max(1, Math.ceil(breaches.length / 2));

  return (
    <section
      id="breaches"
      aria-label="Recent data breaches"
      className="w-full scroll-mt-28 bg-white px-4 pb-10 pt-8 md:px-6 md:pb-12 md:pt-10 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-[family-name:var(--font-poppins)] text-[1.375rem] font-bold leading-[1.2] tracking-[-0.03em] text-[#18062E] md:text-[1.75rem] lg:text-[2rem]">
          Recent breaches in our database
          <span className="sr-only"> — check if your email was exposed on Leekify</span>
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-sm text-[#6B7280] md:text-[0.9375rem]">
          Tap a company to learn what happened, then search your email.
        </p>

        {/* Mobile / tablet: swipeable */}
        <div className="relative mt-7 md:hidden">
          <Carousel
            opts={{ align: "start", dragFree: true, containScroll: "trimSnaps" }}
            setApi={setCarouselApi}
            className="w-full"
          >
            <CarouselContent className="-ml-3">
              {breaches.map((breach) => (
                <CarouselItem
                  key={breach.id}
                  className="basis-[6.9rem] pl-3 sm:basis-[7.7rem]"
                >
                  <BreachCard breach={breach} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          {snapCount > 1 ? (
            <div className="mt-5 flex items-center justify-center gap-1.5" aria-hidden>
              {Array.from({ length: Math.min(snapCount, 6) }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === Math.min(active, 5) ? "w-4 bg-[#4E2FFF]" : "w-1.5 bg-[#D1D1D6]",
                  )}
                  onClick={() => carouselApi?.scrollTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          ) : null}
        </div>

        {/* Desktop: single row like ss1 */}
        <ul
          className="mx-auto mt-8 hidden w-full max-w-5xl items-start justify-between gap-3 md:flex lg:gap-4"
          role="list"
        >
          {breaches.map((breach) => (
            <li key={breach.id} role="listitem" className="min-w-0 flex-1">
              <div className="flex justify-center">
                <BreachCard breach={breach} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
