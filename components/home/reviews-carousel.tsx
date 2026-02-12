"use client";

import { Star } from "lucide-react";

const REVIEWS = [
  {
    name: "Maudie",
    quote: "Itaque dolor fuga natus eveniet.",
    initial: "M",
    avatarColor: "bg-[#5D5DFF]", // rgb(0.365, 0.365, 1)
  },
  {
    name: "Davion",
    quote: "Laboriosam voluptatibus voluptatibus deserunt repellendus.",
    initial: "D",
    avatarColor: "bg-[#3E66DF]", // rgb(0.243, 0.4, 0.875)
  },
];

const STAR_COLOR = "#F7871C"; // rgb(0.969, 0.529, 0.106)

function StarRating() {
  return (
    <div className="flex gap-0" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="h-7 w-7 fill-current"
          style={{ color: STAR_COLOR }}
        />
      ))}
    </div>
  );
}

export function ReviewsCarousel() {
  return (
    <section className="w-full overflow-x-hidden py-8 md:py-24">
      <div className="container mx-auto max-w-3xl px-4 md:px-6">
        {/* Frame 27: white card, rounded-2xl, shadow, vertical spacing 24 */}
        <div
          className="flex flex-col gap-6 rounded-2xl bg-white p-8 md:p-10"
          style={{
            boxShadow: "0 8px 20px rgba(0,0,0,0.16)",
          }}
        >
          {/* Header row: Reviews (left) | 4.5 + 322+ reviews pill (right) */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-bold tracking-tight text-black md:text-3xl">
              Reviews
            </h2>
            <div className="flex flex-col items-end gap-0">
              <span className="text-2xl font-bold text-black">4.5</span>
              <span
                className="mt-2 inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium text-white"
                style={{ backgroundColor: "#5D5DFF" }}
              >
                322+ reviews
              </span>
            </div>
          </div>

          {/* Review cards: white, border, rounded-xl, shadow */}
          {REVIEWS.map((review) => (
            <div
              key={review.name}
              className="flex flex-col gap-4 rounded-xl border border-[#EFEFEF] bg-white p-4 shadow-[0_8px_20px_rgba(0,0,0,0.04)] sm:flex-row sm:items-start sm:justify-between sm:gap-4"
            >
              <div className="flex min-w-0 flex-1 gap-3 sm:gap-4">
                {/* Avatar: colored square with initial */}
                <div
                  className={`flex h-16 w-16 shrink-0 items-center justify-center rounded text-2xl font-semibold text-white ${review.avatarColor}`}
                >
                  {review.initial}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-lg font-bold text-[#050505]">
                    {review.name}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-[#868686]">
                    {review.quote}
                  </p>
                </div>
              </div>
              <div className="shrink-0 sm:pt-1">
                <StarRating />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
