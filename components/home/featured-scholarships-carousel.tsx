"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";
import { ArrowRight, Star } from "lucide-react";
import type { Scholarship } from "@/lib/supabase/queries/scholarships";

function formatDeadline(deadline: string | null): string {
  if (!deadline) return "No deadline";
  const d = new Date(deadline);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function truncate(str: string, max: number): string {
  if (str.length <= max) return str;
  return str.slice(0, max).trim() + "...";
}

export function FeaturedScholarshipsCarousel({ scholarships }: { scholarships: Scholarship[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <section className="w-full bg-white py-14 md:py-20">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        {/* Header - Figma Frame 29 */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <div className="space-y-1">
            <p className="text-sm font-medium md:text-base" style={{ color: "#F85E9F" }}>
              fund your education
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-[#181A1D] md:text-4xl lg:text-[2.9rem]">
              Featured scholarships
            </h2>
          </div>
          {/* Nav buttons - Figma Group 9238 */}
          {scholarships.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => api?.scrollPrev()}
              disabled={!canScrollPrev}
              aria-label="Previous"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F6F6F6] shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_6.9px_15.8px_rgba(0,0,0,0.07)] transition-opacity disabled:opacity-50"
            >
              <ArrowRight className="h-5 w-5 rotate-180 text-[#5D50C6]" strokeWidth={2.5} />
            </button>
            <button
              type="button"
              onClick={() => api?.scrollNext()}
              disabled={!canScrollNext}
              aria-label="Next"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#5D50C6] shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_6.9px_15.8px_rgba(0,0,0,0.07)] transition-opacity disabled:opacity-50"
            >
              <ArrowRight className="h-5 w-5 text-white" strokeWidth={2.5} />
            </button>
          </div>
          )}
        </div>

        {scholarships.length === 0 ? (
          <p className="text-sm text-[#181A1D]/60 md:text-base">
            Check back soon for featured scholarships.
          </p>
        ) : (
          <Carousel
            opts={{ align: "start", loop: false, containScroll: "trimSnaps" }}
            setApi={setApi}
            className="overflow-hidden"
          >
            <CarouselContent className="-ml-3 gap-3 md:-ml-4 md:gap-4">
              {scholarships.map((s) => (
                <CarouselItem
                  key={s.id}
                  className="min-w-[85%] basis-[85%] pl-3 md:min-w-[380px] md:basis-[380px] md:pl-4"
                >
                  <Link
                    href={`/scholarships/${s.slug}`}
                    className="group block overflow-hidden rounded-[29px] bg-white transition-shadow hover:shadow-[0_9px_59px_rgba(174,165,114,0.12)]"
                  >
                    {/* Card - Figma travel_card structure */}
                    <div className="relative">
                      {/* Image area */}
                      <div className="relative aspect-[385/274] w-full overflow-hidden rounded-t-[29px] bg-[#F7F7F7]">
                        {s.image_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={s.image_url}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-4xl font-bold text-[#181A1D]/20">
                            {s.provider.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                        {/* Frosted rating badge */}
                        <div
                          className="absolute right-4 top-4 flex items-center gap-2 rounded-[22px] px-3 py-2"
                          style={{
                            backgroundColor: "rgba(12, 17, 32, 0.24)",
                            backdropFilter: "blur(8px)",
                            boxShadow: "inset 7px 0 19px rgba(255,255,255,0.15)",
                          }}
                        >
                          <Star className="h-4 w-4 fill-[#FACD6B] text-[#FACD6B]" />
                          <span className="text-base font-semibold text-white">5.0</span>
                        </div>
                      </div>

                      {/* Content area - white block */}
                      <div className="rounded-b-[29px] bg-white p-5 pb-6">
                        <h3 className="text-lg font-bold text-[#0C1120] md:text-xl">
                          {truncate(s.title, 40)}
                        </h3>
                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#0C1120]/60">
                          {s.content
                            ? truncate(s.content.replace(/\s+/g, " "), 80)
                            : s.provider}
                        </p>
                        <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
                          <div>
                            <p className="text-sm text-[#0C1120]/60">{s.provider}</p>
                            <div className="mt-1 flex items-baseline gap-2">
                              <span className="text-lg font-bold text-[#0C1120]">
                                {s.amount ?? "—"}
                              </span>
                              <span className="text-sm text-[#0C1120]/28">
                                {formatDeadline(s.deadline)}
                              </span>
                            </div>
                          </div>
                          <span
                            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white transition-opacity group-hover:opacity-95"
                            style={{
                              background: "linear-gradient(135deg, #8482FF 0%, #7700FF 100%)",
                            }}
                          >
                            See More
                            <ArrowRight className="h-4 w-4" strokeWidth={2} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
      </div>
    </section>
  );
}
