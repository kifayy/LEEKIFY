"use client";

import { SCHOOL_DETAIL_IMAGES, SECTION_CARD } from "./school-detail-assets";

export function SchoolVibeSection({ campusVibe, universityName }: { campusVibe: string; universityName: string }) {
  return (
    <section className={SECTION_CARD}>
      <div className="p-4 sm:p-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={SCHOOL_DETAIL_IMAGES.vibeHeader}
          alt=""
          className="w-3/4 mx-auto rounded-xl mb-6 object-contain max-h-40"
        />
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 text-center mb-4">
          What {universityName} is in one sentence
        </h2>
        <div className="rounded-2xl bg-gradient-to-br from-violet-100 via-purple-50 to-sky-100 p-6 sm:p-8 shadow-inner border border-violet-100/80">
          <p className="text-violet-950/90 text-lg sm:text-xl leading-relaxed text-center font-medium italic">
            &ldquo;{campusVibe}&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
