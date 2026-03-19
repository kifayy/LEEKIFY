"use client";

import { SCHOOL_DETAIL_IMAGES, SECTION_CARD } from "./school-detail-assets";
import { seededShuffle } from "@/lib/seeded-shuffle";

export function StudySpotsSection({ studySpots, universityName }: { studySpots: string[]; universityName: string }) {
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

  const styles = seededShuffle(TAG_STYLES, `${universityName}:${studySpots.slice(0, 20).join("|")}`);

  return (
    <section className={SECTION_CARD}>
      <div className="p-4 sm:p-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={SCHOOL_DETAIL_IMAGES.studySpotsHeader}
          alt=""
          className="w-full rounded-xl mb-4 object-cover max-h-52"
        />
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">Study spots</h2>
        <p className="text-sm text-gray-500 mt-1 mb-5">Your go-to zone on this campus</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {studySpots.map((spot, i) => (
            <div
              key={i}
              className={`rounded-xl border ${styles[i % styles.length].bg} ${styles[i % styles.length].border} px-4 py-3 text-sm font-medium ${styles[i % styles.length].text} text-center sm:text-left`}
            >
              {spot}
            </div>
          ))}
        </div>
        <span className="sr-only">Study locations at {universityName}</span>
      </div>
    </section>
  );
}
