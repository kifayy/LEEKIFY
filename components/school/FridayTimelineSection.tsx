"use client";

import type { FridayTimelineEntry } from "@/types/college-detail";
import { SCHOOL_DETAIL_IMAGES, SECTION_CARD } from "./school-detail-assets";
import { emojiForFridaySlot } from "./friday-timeline-emoji";
import { HumanStatsPanel } from "./HumanStatsPanel";

export function FridayTimelineSection({
  fridayTimeline,
  universityName,
  humanStats,
}: {
  fridayTimeline: FridayTimelineEntry[];
  universityName: string;
  humanStats?: Record<string, unknown> | null;
}) {
  return (
    <section className={SECTION_CARD}>
      <div className="p-4 sm:p-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={SCHOOL_DETAIL_IMAGES.fridayHeader}
          alt=""
          className="w-full rounded-xl mb-5 object-cover max-h-48 sm:max-h-56"
        />
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center sm:text-left">
          A Typical Friday at {universityName}
        </h2>
      </div>

      <div className="px-4 sm:px-6 pb-6">
        <ul className="space-y-6">
          {fridayTimeline.map((slot, i) => (
            <li key={i} className="flex gap-4 pl-1 sm:pl-2">
              <div
                className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-violet-100 to-indigo-100 text-lg shadow-md"
                aria-hidden
              >
                {emojiForFridaySlot(slot, i)}
              </div>
              <div className="flex-1 min-w-0 rounded-2xl border border-violet-100 bg-white p-4 shadow-sm">
                <span className="inline-block rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-800 mb-2">
                  {slot.time}
                </span>
                <p className="font-semibold text-gray-900">{slot.activity}</p>
                <p className="text-sm text-gray-500 mt-1">{slot.location}</p>
                {slot.vibe && (
                  <p className="text-xs text-violet-600 mt-2 font-medium">{slot.vibe}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <HumanStatsPanel humanStats={humanStats} universityName={universityName} />
    </section>
  );
}
