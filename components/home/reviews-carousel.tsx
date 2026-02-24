"use client";

import Image from "next/image";
import { Star } from "lucide-react";

const REVIEWS = [
  {
    name: "Sharlet Gonzalez",
    quote:
      "My counselor told me about them and I had to try it out. 10/10 would recommend to all high school and college students!",
    avatar:
      "https://storage.googleapis.com/images_592/Gemini_Generated_Image_4poid84poid84poi.png",
  },
  {
    name: "Jeyson Dowle",
    quote:
      "I usually hate signing up to things like this, but they really do text only twice a week. Thanks, guys!",
    avatar:
      "https://storage.googleapis.com/images_592/Gemini_Generated_Image_wqfcnkwqfcnkwqfc.png",
    avatarPosition: "top",
  },
  {
    name: "Claudia Hader",
    quote:
      "I entered $4k worth of nursing scholarships within 2 days! Love how all the ones they send are no-essay.",
    avatar:
      "https://storage.googleapis.com/images_592/Gemini_Generated_Image_po0e4bpo0e4bpo0e.png",
  },
];

const TRUSTPILOT_BADGE_URL =
  "https://zensignglobal.com/wp-content/uploads/2024/09/trustpilot-stars9095-696x522.jpg";

function StarRating({ className = "" }: { className?: string }) {
  return (
    <div className={`flex gap-0.5 text-pathpicker-gold ${className}`} aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="text-base leading-none md:text-lg" aria-hidden>
          ★
        </span>
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
      className="flex min-w-0 flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] sm:flex-row sm:items-start sm:gap-4"
    >
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg sm:h-16 sm:w-16">
        <Image
          src={review.avatar}
          alt=""
          width={64}
          height={64}
          className={`h-full w-full object-cover ${"avatarPosition" in review && review.avatarPosition === "top" ? "object-top" : "object-center"}`}
          unoptimized
        />
      </div>
      <div className="min-w-0 flex-1 overflow-hidden sm:min-w-[180px]">
        <p className="text-base font-bold text-[#181A1D] sm:text-lg">
          {review.name}
        </p>
        <StarRating className="mt-1" />
        <p className="mt-2 text-sm leading-[1.6] text-[#181A1D]/80 sm:text-base sm:leading-[1.65]">
          {review.quote}
        </p>
      </div>
    </div>
  );
}

/** Compact Reviews card (white box with header + marquee). Use as sidebar e.g. in phone-cta. */
export function ReviewsCard() {
  return (
    <div
      className="flex min-w-0 flex-col gap-6 rounded-2xl bg-white p-8 md:p-10"
      style={{
        boxShadow: "0 8px 24px rgba(149,110,254,0.12), 0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      <div className="flex min-w-0 flex-col gap-3">
        <div className="flex min-w-0 flex-wrap items-center gap-4">
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
              alt="Trustpilot 4.8 stars"
              width={240}
              height={180}
              className="h-24 w-auto object-contain md:h-28"
              unoptimized
            />
          </a>
        </div>
        <span className="w-fit inline-flex items-center gap-2 rounded-full bg-[#956EFE] px-4 py-2 text-sm font-medium text-white shadow-[0_2px_8px_rgba(149,110,254,0.3)]">
          <Star className="h-4 w-4 fill-white" />
          4.8 · 322+ reviews
        </span>
      </div>
      <div className="marquee-fade-edges-y min-w-0 max-h-[280px] overflow-hidden md:max-h-[320px]">
        <div className="flex flex-col animate-marquee-y gap-4">
          {[...REVIEWS, ...REVIEWS].map((review, i) => (
            <ReviewCard key={`${review.name}-${i}`} review={review} />
          ))}
        </div>
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
          {/* Header: Reviews + Trustpilot badge, then rating pill on its own row */}
          <div className="flex flex-col gap-3">
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
                  alt="Trustpilot 4.8 stars"
                  width={240}
                  height={180}
                  className="h-24 w-auto object-contain md:h-28"
                  unoptimized
                />
              </a>
            </div>
            <span className="w-fit inline-flex items-center gap-2 rounded-full bg-[#956EFE] px-4 py-2 text-sm font-medium text-white shadow-[0_2px_8px_rgba(149,110,254,0.3)]">
              <Star className="h-4 w-4 fill-white" />
              4.8 · 322+ reviews
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
