"use client";

import { Badge } from "@/components/ui/badge";
import type { CollegeDetail } from "@/types/college-detail";
import { SCHOOL_DETAIL_IMAGES } from "./school-detail-assets";
import { seededShuffle } from "@/lib/seeded-shuffle";

function parseEmojiDescSafe(emojiDesc?: string | null): string[] {
  if (!emojiDesc?.trim()) return [];
  try {
    const p = JSON.parse(emojiDesc);
    if (Array.isArray(p)) return p.map(String).filter(Boolean);
  } catch {
    /* invalid JSON — do not throw */
  }
  if (emojiDesc.startsWith("[") && emojiDesc.endsWith("]")) {
    return emojiDesc
      .slice(1, -1)
      .split(",")
      .map((s) => s.trim().replace(/^["']|["']$/g, ""))
      .filter(Boolean);
  }
  return [emojiDesc];
}

function tuitionDisplay(tuitionRange: string | null | undefined, avgPrice: number | null | undefined) {
  const range = tuitionRange?.trim();
  if (range) {
    const parts = range.split(/\s*-\s*/);
    const mobile = parts[0]?.trim() || range;
    return { mobile, desktop: range };
  }
  if (avgPrice != null && !Number.isNaN(avgPrice)) {
    const formatted = `$${Math.round(avgPrice).toLocaleString()} avg`;
    return { mobile: formatted, desktop: formatted };
  }
  return null;
}

export function SchoolHeader({ collegeData }: { collegeData: CollegeDetail }) {
  const badges = parseEmojiDescSafe(collegeData.emoji_desc);
  const TAG_STYLES = [
    { bg: "bg-violet-100/70", border: "border-violet-200/60", text: "text-violet-800" },
    { bg: "bg-indigo-100/70", border: "border-indigo-200/60", text: "text-indigo-800" },
    { bg: "bg-fuchsia-100/70", border: "border-fuchsia-200/60", text: "text-fuchsia-800" },
    { bg: "bg-sky-100/70", border: "border-sky-200/60", text: "text-sky-800" },
    { bg: "bg-emerald-100/70", border: "border-emerald-200/60", text: "text-emerald-800" },
    { bg: "bg-amber-100/70", border: "border-amber-200/60", text: "text-amber-900" },
    { bg: "bg-rose-100/70", border: "border-rose-200/60", text: "text-rose-800" },
    { bg: "bg-teal-100/70", border: "border-teal-200/60", text: "text-teal-800" },
    { bg: "bg-lime-100/70", border: "border-lime-200/60", text: "text-lime-900" },
    { bg: "bg-cyan-100/70", border: "border-cyan-200/60", text: "text-cyan-800" },
  ];

  const badgesToRender = badges.slice(0, 10);
  const styles = seededShuffle(TAG_STYLES, `${collegeData.id}:${badgesToRender.join("|")}`);
  const tuition = tuitionDisplay(collegeData.tuition_range, collegeData.avg_price);
  const showStatsCard = Boolean(collegeData.why_perfect_match?.trim());

  return (
    <div className="space-y-6">
      <div id="match" className="scroll-mt-24 space-y-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
          {collegeData.name}
        </h1>
        {collegeData.location && (
          <p className="flex items-center gap-2 text-lg text-gray-600">
            <span className="text-xl" aria-hidden>
              📍
            </span>
            {collegeData.location}
          </p>
        )}
        {badgesToRender.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {badgesToRender.map((b, i) => (
              <Badge
                key={i}
                variant="secondary"
                className={`text-xs font-medium shadow-none px-3 py-1 border ${styles[i % styles.length].bg} ${styles[i % styles.length].text} ${styles[i % styles.length].border}`}
              >
                {b}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {showStatsCard && (
        <div className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8 shadow-lg">
          <p className="text-gray-800 text-base sm:text-lg leading-relaxed mb-8">{collegeData.why_perfect_match}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4">
            {tuition && (
              <div className="flex items-start gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={SCHOOL_DETAIL_IMAGES.statTuition}
                  alt=""
                  className="w-12 h-12 object-contain shrink-0"
                  width={48}
                  height={48}
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Tuition</p>
                  <p className="font-semibold text-gray-900 mt-1 sm:hidden">{tuition.mobile}</p>
                  <p className="font-semibold text-gray-900 mt-1 hidden sm:block">{tuition.desktop}</p>
                </div>
              </div>
            )}
            {collegeData.acceptance_rate != null && (
              <div className="flex items-start gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={SCHOOL_DETAIL_IMAGES.statAcceptance}
                  alt=""
                  className="w-12 h-12 object-contain shrink-0"
                  width={48}
                  height={48}
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Acceptance</p>
                  <p className="font-semibold text-gray-900 mt-1">{collegeData.acceptance_rate}%</p>
                </div>
              </div>
            )}
            {collegeData.student_body_size != null && (
              <div className="flex items-start gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={SCHOOL_DETAIL_IMAGES.statStudents}
                  alt=""
                  className="w-12 h-12 object-contain shrink-0"
                  width={48}
                  height={48}
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Students</p>
                  <p className="font-semibold text-gray-900 mt-1">
                    {collegeData.student_body_size.toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
