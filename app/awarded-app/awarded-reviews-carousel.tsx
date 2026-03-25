"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";

const REVIEWS = [
  {
    name: "Sharlet G.",
    quote:
      "My counselor told me about them and I had to try it out. 10/10 would recommend to all high school and college students!",
    avatar:
      "https://storage.googleapis.com/images_592/Gemini_Generated_Image_4poid84poid84poi.png",
  },
  {
    name: "Valentina R.",
    quote: "actually unreal. matched with $72k in scholarships!!",
    avatar:
      "https://storage.googleapis.com/images_592/Gemini_Generated_Image_4pojec4pojec4poj.png",
  },
  {
    name: "Claudia H.",
    quote:
      "I entered $4k worth of nursing scholarships within 2 days! Love how all the ones they send are no-essay.",
    avatar:
      "https://storage.googleapis.com/images_592/Gemini_Generated_Image_po0e4bpo0e4bpo0e.png",
  },
] as const;

function Stars() {
  return (
    <div className="mt-1 flex gap-0.5 text-amber-400" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" strokeWidth={1.5} />
      ))}
    </div>
  );
}

export function AwardedReviewsCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const syncActive = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const slideW = el.offsetWidth;
    if (slideW <= 0) return;
    const i = Math.round(el.scrollLeft / slideW);
    setActive(Math.min(Math.max(0, i), REVIEWS.length - 1));
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", syncActive, { passive: true });
    syncActive();
    return () => el.removeEventListener("scroll", syncActive);
  }, [syncActive]);

  const scrollTo = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.offsetWidth, behavior: "smooth" });
  };

  return (
    <div className="mx-auto w-full max-w-[420px] px-1">
      <p className="mb-3 text-center text-sm font-semibold text-[#181A1D]">App reviews</p>
      <div
        ref={scrollerRef}
        className="flex touch-pan-x snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {REVIEWS.map((review) => (
          <article
            key={review.name}
            className="box-border flex-[0_0_100%] snap-center snap-always"
          >
              <div className="mx-0.5 flex gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-[0_2px_12px_rgba(15,23,42,0.08)]">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={review.avatar}
                    alt=""
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                    unoptimized
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-bold text-[#181A1D]">{review.name}</p>
                    <span className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                      App user
                    </span>
                  </div>
                  <Stars />
                  <p className="mt-2 text-sm leading-relaxed text-[#181A1D]/85">{review.quote}</p>
                </div>
              </div>
          </article>
        ))}
      </div>
      <div className="mt-3 flex justify-center gap-2" role="tablist" aria-label="Review slides">
        {REVIEWS.map((r, i) => (
          <button
            key={r.name}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`Show review ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === active ? "w-6 bg-[#956EFE]" : "w-2 bg-gray-300"
            }`}
            onClick={() => scrollTo(i)}
          />
        ))}
      </div>
    </div>
  );
}
