"use client";

import Image from "next/image";
import { Star } from "lucide-react";

const REVIEWS = [
  {
    name: "Kate W.",
    quote:
      "I got matched with scholarships I didn't even know existed. The archetype quiz showed me exactly what I needed to focus on.",
    initial: "K",
    avatarColor: "bg-[#956EFE]",
  },
  {
    name: "Marcus J.",
    quote:
      "PathPicker matched me to scholarships that actually fit my profile. The archetype quiz was fun and super insightful.",
    initial: "M",
    avatarColor: "bg-[#0D9488]",
  },
  {
    name: "Sarah L.",
    quote:
      "Finally found scholarships that match my background. The archetype quiz helped me see my strengths as a student.",
    initial: "S",
    avatarColor: "bg-[#E11D48]",
  },
  {
    name: "Jordan K.",
    quote:
      "Got matched with scholarships in minutes. The archetype quiz made me realize how I actually study best.",
    initial: "J",
    avatarColor: "bg-[#7C3AED]",
  },
];

const TRUSTPILOT_BADGE_URL =
  "https://zensignglobal.com/wp-content/uploads/2024/09/trustpilot-stars9095-696x522.jpg";

function StarRating() {
  return (
    <div className="flex justify-end gap-0.5 text-pathpicker-gold" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-6 w-6 fill-current md:h-7 md:w-7" />
      ))}
    </div>
  );
}

function ReviewCard({
  review,
}: {
  review: (typeof REVIEWS)[0];
}) {
  return (
    <div
      key={review.name}
      className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] sm:flex-row sm:items-start sm:justify-between sm:gap-4"
    >
      <div className="flex min-w-0 flex-1 gap-3 sm:gap-4">
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-lg text-xl font-semibold text-white sm:h-16 sm:w-16 sm:text-2xl ${review.avatarColor}`}
          style={{
            boxShadow: "0 2px 8px rgba(149,110,254,0.25)",
          }}
        >
          {review.initial}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-base font-bold text-[#181A1D] sm:text-lg">
            {review.name}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-[#181A1D]/70">
            {review.quote}
          </p>
        </div>
      </div>
      <div className="shrink-0 self-end sm:pt-1">
        <StarRating />
      </div>
    </div>
  );
}

export function ReviewsCarousel() {
  return (
    <section className="w-full min-w-0 overflow-hidden py-10 md:py-24">
      <div className="container mx-auto max-w-3xl px-4 md:px-6 min-w-0">
        {/* White card - theme aligned */}
        <div
          className="flex flex-col gap-6 rounded-2xl bg-white p-8 md:p-10"
          style={{
            boxShadow: "0 8px 24px rgba(149,110,254,0.12), 0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          {/* Header: Reviews + Trustpilot badge + rating pill */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <h2 className="text-2xl font-bold tracking-tight text-[#181A1D] md:text-3xl">
                Reviews
              </h2>
              <a
                href="https://www.trustpilot.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block shrink-0"
                aria-label="Trustpilot"
              >
                <Image
                  src={TRUSTPILOT_BADGE_URL}
                  alt="Trustpilot 4.5 stars"
                  width={240}
                  height={180}
                  className="h-24 w-auto object-contain md:h-28"
                  unoptimized
                />
              </a>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#956EFE] px-4 py-2 text-sm font-medium text-white shadow-[0_2px_8px_rgba(149,110,254,0.3)]">
              <Star className="h-4 w-4 fill-white" />
              4.5 · 322+ reviews
            </span>
          </div>

          {/* Vertical auto-loop carousel */}
          <div className="marquee-fade-edges-y max-h-[280px] overflow-hidden md:max-h-[320px]">
            <div className="flex flex-col animate-marquee-y gap-4">
              {[...REVIEWS, ...REVIEWS].map((review, i) => (
                <ReviewCard key={`${review.name}-${i}`} review={review} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
