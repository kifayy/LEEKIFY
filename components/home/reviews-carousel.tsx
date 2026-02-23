"use client";

import Image from "next/image";
import Link from "next/link";
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
      "hate signing up to things like this usually but they really do text only twice a week. thanks guys",
    avatar:
      "https://storage.googleapis.com/images_592/Gemini_Generated_Image_wqfcnkwqfcnkwqfc.png",
    avatarPosition: "top",
  },
  {
    name: "Claudia Hader",
    quote:
      "Entered $4k worth of nursing scholarships within 2 days! Love how all the ones they send are no-essays",
    avatar:
      "https://storage.googleapis.com/images_592/Gemini_Generated_Image_po0e4bpo0e4bpo0e.png",
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
        {/* Get started button — links to newsletter */}
        <div className="mb-6 flex flex-col items-center">
          <Link
            href="/newsletter"
            className="relative mx-auto block w-full max-w-[582px] overflow-hidden rounded-lg transition-opacity hover:opacity-95 active:opacity-90"
            aria-label="Get started — go to newsletter"
          >
            <Image
              src="https://storage.googleapis.com/images_592/Group%201SS0.png"
              alt="Get started — go to newsletter"
              width={640}
              height={176}
              className="h-auto w-full object-contain object-center"
              sizes="(max-width: 768px) 100vw, 582px"
              unoptimized
            />
          </Link>
          <p className="mt-2 text-center text-sm font-medium text-[#58595D] md:text-base">
            Free • No App Required • No Sign-up
          </p>
        </div>

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
                  alt="Trustpilot 4.8 stars"
                  width={240}
                  height={180}
                  className="h-24 w-auto object-contain md:h-28"
                  unoptimized
                />
              </a>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#956EFE] px-4 py-2 text-sm font-medium text-white shadow-[0_2px_8px_rgba(149,110,254,0.3)]">
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
