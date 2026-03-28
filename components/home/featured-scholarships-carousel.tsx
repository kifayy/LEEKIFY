"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";
import { ArrowRight } from "lucide-react";
import type { Scholarship } from "@/lib/supabase/queries/scholarships";

/** Default logo for featured scholarship cards when no provider-specific logo is set */
const DEFAULT_FEATURED_LOGO =
  "https://storage.googleapis.com/images_592/black%20white%20grow%20logo%20(2).png";

/** Provider name (lowercase) -> logo URL for featured scholarship cards */
const PROVIDER_LOGOS: Record<string, string> = {
  "us bank": "https://logo.clearbit.com/usbank.com",
  "u.s. bank": "https://logo.clearbit.com/usbank.com",
  "citizens bank": "https://logo.clearbit.com/citizensbank.com",
  "citizens": "https://logo.clearbit.com/citizensbank.com",
  "sofi": "https://logo.clearbit.com/sofi.com",
};

function getProviderLogoUrl(provider: string | null): string | null {
  if (!provider) return null;
  const lower = provider.toLowerCase();
  for (const [key, url] of Object.entries(PROVIDER_LOGOS)) {
    if (lower.includes(key)) return url;
  }
  return null;
}

const DEFAULT_FEATURED_DESTINATION =
  "https://apps.apple.com/us/app/awarded-win-scholarships/id6749553938";

/** Card link: scholarship external link when present; otherwise App Store */
function getCardHref(scholarship: Scholarship): string {
  const externalLink = scholarship.external_link?.trim();
  if (externalLink) return externalLink;
  return DEFAULT_FEATURED_DESTINATION;
}

/** Display name: US Bank → PathPicker; others unchanged */
function getDisplayProviderName(provider: string | null): string {
  if (!provider) return "";
  const lower = provider.toLowerCase();
  if (lower.includes("us bank") || lower.includes("u.s. bank")) return "PathPicker";
  return provider;
}

/** Title: PathPicker-hosted / US Bank sweepstake → canonical carousel name; others unchanged */
function getDisplayTitle(
  title: string | null,
  provider: string | null,
  slug: string | null
): string {
  if (!title) return "";
  const sl = (slug ?? "").toLowerCase();
  if (sl === "pathpicker-excellence-2026") return "PathPicker Excellence 2026";

  const p = (provider ?? "").toLowerCase();
  if (p.includes("us bank") || p.includes("u.s. bank")) return "PathPicker Excellence 2026";

  const t = title.toLowerCase();
  if (t.includes("awkward human")) return "PathPicker Excellence 2026";

  return title;
}

/** Amount: PathPicker (US Bank) → $3,100; others use actual amount */
function getDisplayAmount(amount: string | null, provider: string | null): string {
  const p = (provider ?? "").toLowerCase();
  if (p.includes("us bank") || p.includes("u.s. bank")) return "3,100";
  return formatAmount(amount);
}

function formatDeadline(deadline: string | null): string {
  if (!deadline) return "No deadline";
  const d = new Date(deadline);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

/** Format amount with commas e.g. "20000" -> "20,000", "$1,500" -> "1,500" */
function formatAmount(amount: string | null): string {
  if (amount == null || amount === "") return "—";
  const digits = amount.replace(/\D/g, "");
  if (digits === "") return "—";
  return parseInt(digits, 10).toLocaleString();
}

function truncate(str: string, max: number): string {
  if (str.length <= max) return str;
  return str.slice(0, max).trim() + "...";
}

export function FeaturedScholarshipsCarousel({
  scholarships,
}: {
  scholarships: Scholarship[];
}) {
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
    <section
      className="w-full min-w-0 overflow-x-hidden py-10 md:py-20"
      style={{ backgroundColor: "rgb(243, 250, 250)" }}
    >
      <div className="container mx-auto max-w-6xl px-4 md:px-6 min-w-0">
        {/* Header - Figma Frame 29 */}
        <div className="mb-6 flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8 md:mb-10 md:items-end">
          <div className="space-y-1 text-center md:text-left">
            <p className="text-sm font-normal md:text-base" style={{ color: "#956EFE" }}>
              Fund Your Education
            </p>
            <h2 className="text-xl font-bold tracking-tight text-[#181A1D] md:text-4xl lg:text-[2.9rem]">
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
              <ArrowRight className="h-5 w-5 rotate-180 text-[#956EFE]" strokeWidth={2.5} />
            </button>
            <button
              type="button"
              onClick={() => api?.scrollNext()}
              disabled={!canScrollNext}
              aria-label="Next"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#956EFE] shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_6.9px_15.8px_rgba(0,0,0,0.07)] transition-opacity disabled:opacity-50"
            >
              <ArrowRight className="h-5 w-5 text-white" strokeWidth={2.5} />
            </button>
          </div>
          )}
        </div>

        {scholarships.length === 0 ? (
          <p className="text-sm font-normal text-[#181A1D]/60 md:text-base">
            Check back soon for featured scholarships.
          </p>
        ) : (
          <Carousel
            opts={{ align: "start", loop: false, containScroll: "trimSnaps" }}
            setApi={setApi}
            className="w-full min-w-0 overflow-hidden"
          >
            <CarouselContent className="-ml-3 gap-3 md:-ml-4 md:gap-4">
              {scholarships.map((s, index) => {
                const isComingSoon = index === 2;
                const cardContent = (
                  <>
                    {/* Card - Figma travel_card structure */}
                    <div className={`relative flex min-h-0 flex-1 flex-col ${isComingSoon ? "blur-[6px] select-none" : ""}`}>
                      {/* Image area */}
                      <div className="relative aspect-[385/274] w-full shrink-0 overflow-hidden rounded-t-[29px] bg-[#956EFE]">
                        {getProviderLogoUrl(s.provider) ? (
                          <Image
                            src={getProviderLogoUrl(s.provider)!}
                            alt=""
                            fill
                            className="object-contain object-center p-8"
                            sizes="(max-width: 768px) 92vw, 420px"
                            unoptimized
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                              const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                              if (fallback) fallback.style.display = "flex";
                            }}
                          />
                        ) : null}
                        <div
                          className="absolute inset-0 flex items-center justify-center p-8"
                          style={getProviderLogoUrl(s.provider) ? { display: "none" } : undefined}
                        >
                          <Image
                            src={DEFAULT_FEATURED_LOGO}
                            alt=""
                            fill
                            className="object-contain object-center"
                            sizes="(max-width: 768px) 92vw, 420px"
                            unoptimized
                          />
                        </div>
                        {/* Frosted $ amount badge */}
                        <div
                          className="absolute right-4 top-4 flex items-center rounded-[22px] px-3 py-2"
                          style={{
                            backgroundColor: "rgba(12, 17, 32, 0.24)",
                            backdropFilter: "blur(8px)",
                            boxShadow: "inset 7px 0 19px rgba(255,255,255,0.15)",
                          }}
                        >
                          <span className="text-lg font-bold text-white">
                            ${getDisplayAmount(s.amount, s.provider)}
                          </span>
                        </div>
                      </div>

                      {/* Content area - white block: amount + tags, title, provider/deadline, button */}
                      <div className="flex min-h-0 flex-1 flex-col rounded-b-[29px] bg-white p-5 pb-8 pt-5">
                        {/* Amount, then tags underneath */}
                        <div className="flex flex-col gap-2">
                          <p className="shrink-0 text-2xl font-bold text-[#181A1D] md:text-3xl">
                            ${getDisplayAmount(s.amount, s.provider)}
                          </p>
                          {(s.highlight_1 || s.highlight_2) && (
                            <div className="flex min-w-0 flex-wrap items-center gap-2">
                              {s.highlight_1 && (
                                <span className="whitespace-nowrap rounded-full bg-[#EEEEEE] px-3 py-1.5 text-xs font-medium text-[#0C1120]/90">
                                  {s.highlight_1}
                                </span>
                              )}
                              {s.highlight_2 && (
                                <span className="whitespace-nowrap rounded-full bg-[#EEEEEE] px-3 py-1.5 text-xs font-medium text-[#0C1120]/90">
                                  {s.highlight_2}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                        <h3 className="mt-2 text-lg font-bold text-[#181A1D] md:text-xl">
                          {truncate(getDisplayTitle(s.title, s.provider, s.slug), 40)}
                        </h3>
                        <p className="mt-3 text-sm font-normal leading-relaxed text-[#0C1120]/60">
                          {getDisplayProviderName(s.provider)} | Closing Soon
                        </p>
                      </div>
                    </div>
                    {isComingSoon && (
                      <div
                        className="absolute inset-0 flex items-center justify-center rounded-[29px] bg-white/60 backdrop-blur-[2px]"
                        aria-hidden
                      >
                        <span className="text-xl font-bold text-[#181A1D] md:text-2xl">
                          Coming Soon
                        </span>
                      </div>
                    )}
                  </>
                );
                return (
                  <CarouselItem
                    key={s.id}
                    className="min-w-[92%] basis-[92%] pl-3 sm:min-w-[88%] sm:basis-[88%] md:min-w-[420px] md:basis-[420px] md:pl-4"
                  >
                    {isComingSoon ? (
                      <div className="group relative flex h-full flex-col overflow-hidden rounded-[29px] bg-white">
                        {cardContent}
                      </div>
                    ) : (
                      <Link
                        href={getCardHref(s)}
                        className="group flex h-full flex-col overflow-hidden rounded-[29px] bg-white transition-shadow hover:shadow-[0_9px_59px_rgba(174,165,114,0.12)]"
                        {...(getCardHref(s).startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {cardContent}
                      </Link>
                    )}
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        )}
      </div>
    </section>
  );
}
