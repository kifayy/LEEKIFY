"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import type { RecentBreach } from "@/lib/recent-breaches";
import { resolveBreachLogoBg, resolveBreachLogoUrl } from "@/lib/recent-breaches";
import { cn } from "@/lib/utils";

type HomeRecentBreachesCarouselProps = {
  breaches: RecentBreach[];
};

/** Logos that already include their brand tile — fill the rounded square. */
const FILL_LOGO_SLUGS = new Set([
  "payup-2026",
  "virta-health-2026",
  "carhartt-2026",
  "uber-freight-2026",
  "allstate-2026",
]);

function formatBreachDate(value: string | null) {
  if (!value) return null;
  const d = new Date(`${value}T12:00:00Z`);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function BreachLogo({ breach }: { breach: RecentBreach }) {
  const src = resolveBreachLogoUrl(breach.slug, breach.logo_url);
  const bg = resolveBreachLogoBg(breach.slug, breach.logo_bg);
  const fill = FILL_LOGO_SLUGS.has(breach.slug);

  return (
    <span
      className={cn(
        "relative mx-auto flex h-28 w-28 items-center justify-center overflow-hidden rounded-[1.5rem] shadow-[0_12px_32px_rgba(24,6,46,0.14)] sm:h-32 sm:w-32 md:h-36 md:w-36 lg:h-40 lg:w-40 lg:rounded-[1.75rem]",
        (bg === "#FFFFFF" || bg.toLowerCase() === "#fff" || bg === "#000000") &&
          "ring-1 ring-black/[0.08]",
      )}
      style={{ backgroundColor: bg }}
    >
      {src ? (
        <Image
          src={src}
          alt=""
          width={160}
          height={160}
          className={cn("object-contain", fill ? "h-full w-full" : "h-[72%] w-[72%]")}
          aria-hidden
        />
      ) : (
        <span className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-white">
          {breach.organization.slice(0, 1)}
        </span>
      )}
    </span>
  );
}

function BreachCard({ breach }: { breach: RecentBreach }) {
  const dateLabel = formatBreachDate(breach.breach_date);

  return (
    <Link
      href={`/breach/${breach.slug}`}
      aria-label={`${breach.organization} breach — ${breach.rows_label}${dateLabel ? `, ${dateLabel}` : ""}`}
      className="group mx-auto flex w-[9.5rem] flex-col items-center text-center transition active:scale-[0.98] sm:w-[10.5rem] md:w-44 lg:w-48"
    >
      <BreachLogo breach={breach} />
      <span className="mt-3.5 inline-flex max-w-full items-center justify-center rounded-full border border-white/70 bg-white/55 px-3.5 py-1.5 font-[family-name:var(--font-poppins)] text-xs font-semibold leading-none tracking-tight text-[#18062E]/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_4px_14px_rgba(24,6,46,0.08)] ring-1 ring-black/[0.04] backdrop-blur-xl sm:text-[0.8125rem]">
        {breach.rows_label}
      </span>
      <p className="mt-2.5 font-[family-name:var(--font-poppins)] text-base font-bold leading-tight text-[#18062E] group-hover:text-[#4E2FFF] sm:text-[1.0625rem] md:text-lg">
        {breach.organization}
      </p>
      {dateLabel ? (
        <p className="mt-1 font-[family-name:var(--font-poppins)] text-[0.6875rem] font-medium leading-tight text-[#6B7280] sm:text-xs">
          {dateLabel}
        </p>
      ) : null}
    </Link>
  );
}

function TopArrow({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous breaches" : "More breaches"}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.08] bg-white text-[#18062E] shadow-[0_4px_16px_rgba(24,6,46,0.08)] transition hover:border-[#4E2FFF]/30 hover:text-[#4E2FFF] disabled:pointer-events-none disabled:opacity-30 sm:h-11 sm:w-11"
    >
      <Icon className="h-5 w-5" strokeWidth={2.25} aria-hidden />
    </button>
  );
}

export function HomeRecentBreachesCarousel({ breaches }: HomeRecentBreachesCarouselProps) {
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  React.useEffect(() => {
    if (!carouselApi) return;
    const onSelect = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    onSelect();
    carouselApi.on("select", onSelect);
    carouselApi.on("reInit", onSelect);
    return () => {
      carouselApi.off("select", onSelect);
      carouselApi.off("reInit", onSelect);
    };
  }, [carouselApi]);

  if (breaches.length === 0) return null;

  return (
    <section
      id="breaches"
      aria-label="Recent data breaches"
      className="w-full scroll-mt-28 overflow-x-hidden bg-white pb-10 pt-8 md:pb-14 md:pt-12"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <h2 className="text-center font-[family-name:var(--font-poppins)] text-[1.5rem] font-bold leading-[1.2] tracking-[-0.03em] text-[#18062E] md:text-[1.875rem] lg:text-[2.125rem]">
          Recent breaches in our database
          <span className="sr-only"> — check if your email was exposed on Leekify</span>
        </h2>
        <p className="mx-auto mt-2.5 max-w-xl text-center text-sm text-[#6B7280] md:text-base">
          Tap a company to learn what happened, then search your email.
        </p>
      </div>

      <div className="relative mx-auto mt-8 w-full max-w-[90rem]">
        <Carousel
          opts={{ align: "start", dragFree: true, containScroll: "trimSnaps" }}
          setApi={setCarouselApi}
          className="w-full"
        >
          <CarouselContent className="!-ml-0">
            {breaches.map((breach, index) => (
              <CarouselItem
                key={breach.id}
                className={cn(
                  "!pl-5 basis-[11.25rem] sm:!pl-6 sm:basis-[12.5rem] md:!pl-7 md:basis-[13.5rem] lg:!pl-8 lg:basis-[14.5rem]",
                  index === 0 && "!pl-6 sm:!pl-8 md:!pl-10",
                  index === breaches.length - 1 && "pr-6 sm:pr-8 md:pr-10",
                )}
              >
                <BreachCard breach={breach} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="mt-7 flex items-center justify-center gap-3 px-4">
          <TopArrow
            direction="prev"
            disabled={!canScrollPrev}
            onClick={() => carouselApi?.scrollPrev()}
          />
          <TopArrow
            direction="next"
            disabled={!canScrollNext}
            onClick={() => carouselApi?.scrollNext()}
          />
        </div>
      </div>
    </section>
  );
}
