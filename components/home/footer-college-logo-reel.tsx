"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { HERO_COLLEGE_LOGO_URLS } from "@/lib/hero-college-logos";

type TrackCell =
  | { kind: "logo"; src: (typeof HERO_COLLEGE_LOGO_URLS)[number] }
  | { kind: "gap" };

function buildTrack(order: readonly (typeof HERO_COLLEGE_LOGO_URLS)[number][]): TrackCell[] {
  const cycle = order.flatMap((src): TrackCell[] => [
    { kind: "logo", src },
    { kind: "gap" },
  ]);
  return [...cycle, ...cycle];
}

/** Single horizontal strip — avoids stacked rows so logos never sit “on top of” each other. */
const TRACK = buildTrack(HERO_COLLEGE_LOGO_URLS);

/** One-row infinite college logo reel for footer / CTA bands (same CDN set as hero). */
export function FooterCollegeLogoReel({ className }: { className?: string }) {
  return (
    <div className={cn("w-full", className)} aria-hidden>
      <div className="marquee-fade-edges w-full overflow-hidden opacity-90">
        <div
          className={cn(
            "flex w-max shrink-0 items-center gap-0 px-2 motion-safe:animate-[marquee-x_50s_linear_infinite]",
            "motion-reduce:animate-none motion-reduce:opacity-80",
            "md:px-4"
          )}
        >
          {TRACK.map((cell, i) =>
            cell.kind === "gap" ? (
              <span key={`g-${i}`} className="inline-block w-6 shrink-0 md:w-10" aria-hidden />
            ) : (
              <span
                key={`l-${i}`}
                className="relative block size-9 shrink-0 overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-slate-200/90 md:size-11 md:rounded-xl"
              >
                <Image
                  src={cell.src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="44px"
                  unoptimized
                />
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
}
