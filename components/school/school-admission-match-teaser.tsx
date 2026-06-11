"use client";

import { useMemo } from "react";

import { CollegeMatchQuizLink } from "@/components/college-match-quiz-link";
import { parseHumanStats } from "@/components/school/HumanStatsPanel";
import type { CollegeDetail } from "@/types/college-detail";

function seededPercent(seed: string, min: number, max: number): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const range = max - min + 1;
  return min + (Math.abs(h) % range);
}

function BlurredDonut({
  pct,
  titleLine,
  gradId,
}: {
  pct: number;
  titleLine: string;
  gradId: string;
}) {
  const size = 148;
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const v = Math.min(100, Math.max(0, pct));
  const offset = c - (v / 100) * c;

  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-gray-100 bg-white/80 p-5 shadow-sm">
      <p className="text-center text-sm font-semibold leading-snug text-gray-900 sm:text-[15px]">{titleLine}</p>
      <div className="relative h-[148px] w-[148px] shrink-0">
        <div
          className="flex h-full w-full items-center justify-center blur-md opacity-[0.38] sm:blur-lg sm:opacity-[0.32]"
          aria-hidden
        >
          <div className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90" aria-hidden>
              <defs>
                <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#94a3b8" />
                  <stop offset="100%" stopColor="#64748b" />
                </linearGradient>
              </defs>
              <circle
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke="#e5e7eb"
                strokeWidth={stroke}
              />
              <circle
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={`url(#${gradId})`}
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={c}
                strokeDashoffset={offset}
              />
            </svg>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold tabular-nums text-gray-900">{v}%</span>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center px-2">
          <CollegeMatchQuizLink
            className="max-w-[min(100%,200px)] rounded-full border border-gray-200/90 bg-white px-3 py-2 text-center text-[11px] font-semibold leading-tight text-gray-900 shadow-[0_2px_12px_rgba(0,0,0,0.08)] transition hover:bg-gray-50 sm:text-xs"
          >
            Unlock Full Stats
          </CollegeMatchQuizLink>
        </div>
      </div>
    </div>
  );
}

export function SchoolAdmissionMatchTeaser({ collegeData }: { collegeData: CollegeDetail }) {
  const { admissionPct, matchPct, gradAdm, gradMatch } = useMemo(() => {
    const idSafe = collegeData.id.replace(/[^a-zA-Z0-9]/g, "") || "school";
    const admission =
      collegeData.acceptance_rate != null && !Number.isNaN(Number(collegeData.acceptance_rate))
        ? Math.min(98, Math.max(4, Math.round(Number(collegeData.acceptance_rate))))
        : seededPercent(`${collegeData.id}:admission`, 18, 72);

    const parsed = parseHumanStats(collegeData.human_stats);
    let match: number;
    if (parsed && Object.keys(parsed).length > 0) {
      const vals = Object.values(parsed);
      match = Math.round(vals.reduce((sum, n) => sum + n, 0) / vals.length);
      match = Math.min(97, Math.max(38, match));
    } else {
      match = seededPercent(`${collegeData.id}:match`, 52, 91);
    }

    return {
      admissionPct: admission,
      matchPct: match,
      gradAdm: `donut-adm-${idSafe}`,
      gradMatch: `donut-match-${idSafe}`,
    };
  }, [collegeData]);

  return (
    <section
      id="admission-match"
      className="scroll-mt-24 rounded-2xl border border-violet-100/80 bg-gradient-to-b from-violet-50/50 to-white p-5 sm:p-8 shadow-sm"
      aria-label="Admission and match preview"
    >
      <h2 className="text-lg font-bold text-gray-900 sm:text-xl">Your fit with this school</h2>
      <p className="mt-1 max-w-2xl text-sm text-gray-500">
        See admission odds and overall match personalized to your profile—take the quiz to unlock the real numbers.
      </p>
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <BlurredDonut pct={admissionPct} titleLine="Your Admission Odds" gradId={gradAdm} />
        <BlurredDonut pct={matchPct} titleLine="Your Overall Match" gradId={gradMatch} />
      </div>
    </section>
  );
}
