"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { SCHOOL_DETAIL_IMAGES, SECTION_CARD } from "./school-detail-assets";
import { seededShuffle } from "@/lib/seeded-shuffle";

export function StudentFoodSection({
  studentFood,
  isOpen,
  onOpenChange,
  universityName,
}: {
  studentFood: string[];
  isOpen: boolean;
  onOpenChange: (v: boolean) => void;
  universityName: string;
}) {
  const TAG_STYLES = [
    { bg: "bg-violet-100/70", border: "border-violet-200/60", text: "text-violet-900" },
    { bg: "bg-indigo-100/70", border: "border-indigo-200/60", text: "text-indigo-900" },
    { bg: "bg-fuchsia-100/70", border: "border-fuchsia-200/60", text: "text-fuchsia-900" },
    { bg: "bg-sky-100/70", border: "border-sky-200/60", text: "text-sky-900" },
    { bg: "bg-emerald-100/70", border: "border-emerald-200/60", text: "text-emerald-900" },
    { bg: "bg-amber-100/70", border: "border-amber-200/60", text: "text-amber-900" },
    { bg: "bg-rose-100/70", border: "border-rose-200/60", text: "text-rose-900" },
    { bg: "bg-teal-100/70", border: "border-teal-200/60", text: "text-teal-900" },
    { bg: "bg-lime-100/70", border: "border-lime-200/60", text: "text-lime-900" },
    { bg: "bg-cyan-100/70", border: "border-cyan-200/60", text: "text-cyan-900" },
  ];

  const styles = seededShuffle(
    TAG_STYLES,
    `${universityName}:${studentFood.slice(0, 20).join("|")}`,
  );

  return (
    <section className={SECTION_CARD}>
      <div className="p-4 sm:p-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={SCHOOL_DETAIL_IMAGES.foodHeader}
          alt=""
          className="w-3/4 mx-auto rounded-xl mb-5 object-contain max-h-40"
          onError={(e) => {
            const el = e.currentTarget;
            if (!el.dataset.fallback) {
              el.dataset.fallback = "1";
              el.src = "/images/school-detail/food-header.png";
            }
          }}
        />
        <button
          type="button"
          onClick={() => onOpenChange(!isOpen)}
          className="w-full flex items-center justify-between gap-2 text-left"
        >
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Food &amp; dining</h2>
          <ChevronDown className={cn("w-6 h-6 text-orange-500 shrink-0 transition-transform", isOpen && "rotate-180")} />
        </button>
        {isOpen && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-orange-100 pt-4">
            {studentFood.map((item, i) => (
              <div
                key={i}
                className={`rounded-xl border px-4 py-3 text-sm ${styles[i % styles.length].bg} ${styles[i % styles.length].border} ${styles[i % styles.length].text}`}
              >
                {item}
              </div>
            ))}
          </div>
        )}
        <span className="sr-only">Dining at {universityName}</span>
      </div>
    </section>
  );
}
