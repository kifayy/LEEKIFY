"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { SCHOOL_DETAIL_IMAGES, SECTION_CARD } from "./school-detail-assets";

export function SchoolHighlightsSection({
  highlights,
  isOpen,
  onOpenChange,
  universityName,
}: {
  highlights: string[];
  isOpen: boolean;
  onOpenChange: (v: boolean) => void;
  universityName: string;
}) {
  return (
    <section className={SECTION_CARD}>
      <div className="p-4 sm:p-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={SCHOOL_DETAIL_IMAGES.highlightsHeader}
          alt=""
          className="w-3/4 mx-auto rounded-xl mb-5 object-contain max-h-40"
        />
        <button
          type="button"
          onClick={() => onOpenChange(!isOpen)}
          className="w-full flex items-center justify-between gap-2 text-left group"
        >
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            Why {universityName} is perfect
          </h2>
          <ChevronDown
            className={cn(
              "w-6 h-6 text-violet-600 shrink-0 transition-transform",
              isOpen && "rotate-180",
            )}
          />
        </button>
        {isOpen && (
          <ul className="mt-4 space-y-3 list-none border-t border-violet-100 pt-4">
            {highlights.map((h, i) => (
              <li key={i} className="flex gap-3 text-gray-700 pl-2">
                <span className="text-violet-500 font-bold shrink-0">•</span>
                <span className="leading-relaxed">{h}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
