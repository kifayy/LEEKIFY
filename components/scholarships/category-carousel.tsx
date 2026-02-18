"use client";

import Link from "next/link";
import { useRef } from "react";
import type { ScholarshipCategory } from "@/lib/supabase/queries/scholarship-categories";

const CATEGORY_EMOJI: Record<string, string> = {
  "by-major": "📚",
  "by-state": "🗺️",
  "by-grade-level": "🎓",
  "easy-to-win": "✨",
  "by-ethnicity": "🤝",
  "by-amount": "💰",
};

type Props = { categories: ScholarshipCategory[] };

export function CategoryCarousel({ categories }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const step = el.clientWidth * 0.7;
    el.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" });
  };

  if (categories.length === 0) return null;

  return (
    <nav className="mb-10">
      <div className="relative flex items-center gap-3">
        <button
          type="button"
          onClick={() => scroll("left")}
          aria-label="Previous categories"
          className="absolute left-0 z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-md transition-opacity hover:bg-[#F3EEFE] disabled:opacity-40"
        >
          ←
        </button>
        <div
          ref={scrollRef}
          className="flex flex-1 snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-12 py-1 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden"
        >
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/scholarships/${cat.slug}`}
              className="flex min-w-[200px] shrink-0 snap-center items-center justify-center gap-2 rounded-2xl border border-[#E8E4F3] bg-[#FAF9FE] px-6 py-4 text-base font-medium text-[#5B4B8A] transition-colors hover:border-[#7C4EE4] hover:bg-[#F3EEFE]"
            >
              <span className="text-xl">{CATEGORY_EMOJI[cat.slug] ?? "📋"}</span>
              {cat.name}
            </Link>
          ))}
        </div>
        <button
          type="button"
          onClick={() => scroll("right")}
          aria-label="Next categories"
          className="absolute right-0 z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-md transition-opacity hover:bg-[#F3EEFE] disabled:opacity-40"
        >
          →
        </button>
      </div>
    </nav>
  );
}
