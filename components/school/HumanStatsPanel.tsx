"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import { CollegeMatchQuizLink } from "@/components/college-match-quiz-link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type StatDef = {
  normKey: string;
  defaultVal: number;
  emoji: string;
  label: string;
  line: string;
  info: string;
  mobileExpand: boolean;
  careerSpan?: boolean;
};

const STATS: StatDef[] = [
  {
    normKey: "happiness",
    defaultVal: 92,
    emoji: "😊",
    label: "Happiness",
    line: "What percent of students report feeling happy or satisfied with campus life?",
    info: "Based on self-reported wellness and satisfaction surveys. Higher means more students say they’re thriving day to day.",
    mobileExpand: true,
  },
  {
    normKey: "findlove",
    defaultVal: 68,
    emoji: "💕",
    label: "Find Love",
    line: "What percent of students report meeting a romantic partner on or through campus?",
    info: "Reflects how many students felt the social scene helped them form dating relationships.",
    mobileExpand: true,
  },
  {
    normKey: "feelathome",
    defaultVal: 85,
    emoji: "🤝",
    label: "Feel at Home",
    line: "What percent of students report feeling like they truly belong?",
    info: "Measures sense of community, inclusion, and fitting in with campus culture.",
    mobileExpand: true,
  },
  {
    normKey: "lowstress",
    defaultVal: 74,
    emoji: "🌿",
    label: "Low Stress",
    line: "What percent of students report manageable academic and social stress?",
    info: "Higher values mean more students describe workload and pressure as balanced, not overwhelming.",
    mobileExpand: false,
  },
  {
    normKey: "careerreadiness",
    defaultVal: 89,
    emoji: "💰",
    label: "Career Readiness",
    line: "What percent of students report feeling prepared for internships and careers?",
    info: "Captures confidence in career services, networking, and skills gained for the job market.",
    mobileExpand: true,
    careerSpan: true,
  },
];

function toPct(v: unknown): number | undefined {
  if (v == null) return undefined;
  const n = typeof v === "number" ? v : Number(String(v).trim());
  if (Number.isNaN(n)) return undefined;
  const x = n > 1 && n <= 100 ? n : n <= 1 ? n * 100 : Math.min(100, Math.max(0, n));
  return Math.round(Math.min(100, Math.max(0, x)));
}

function normalizeObjectKey(k: string): string {
  return k.toLowerCase().replace(/[\s_]/g, "");
}

export function parseHumanStats(raw: unknown): Record<string, number> | null {
  if (raw == null) return null;
  let obj: Record<string, unknown>;
  if (typeof raw === "string") {
    try {
      const p = JSON.parse(raw) as unknown;
      if (!p || typeof p !== "object" || Array.isArray(p)) return null;
      obj = p as Record<string, unknown>;
    } catch {
      return null;
    }
  } else if (typeof raw === "object" && !Array.isArray(raw)) {
    obj = raw as Record<string, unknown>;
  } else {
    return null;
  }

  const byNorm: Record<string, number> = {};
  for (const [k, v] of Object.entries(obj)) {
    const pct = toPct(v);
    if (pct !== undefined) byNorm[normalizeObjectKey(k)] = pct;
  }
  return byNorm;
}

/** Uniform fill so color never hints at the underlying percentage (bars are blurred + gated). */
const BAR_FILL_CLASS = "bg-gradient-to-r from-neutral-400 to-neutral-500";

function StatRow({
  def,
  value,
}: {
  def: StatDef;
  value: number;
}) {
  const [open, setOpen] = useState(false);
  const w = Math.min(100, Math.max(0, value));

  const infoButton = (
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="inline-flex rounded-full p-1 text-gray-400 hover:bg-violet-50 hover:text-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-200"
          aria-label={`More about ${def.label}`}
        >
          <Info className="h-4 w-4" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs text-left font-normal leading-snug">
        {def.info}
      </TooltipContent>
    </Tooltip>
  );

  return (
    <div
      className={cn(
        "rounded-xl border border-gray-100 bg-white p-4 shadow-sm",
        def.careerSpan && "md:col-span-2",
      )}
    >
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className="text-lg" aria-hidden>
          {def.emoji}
        </span>
        <span className="font-semibold text-gray-900">{def.label}</span>
        <span className="hidden md:inline">{infoButton}</span>
        {def.mobileExpand ? (
          <>
            <button
              type="button"
              className="md:hidden ml-auto text-violet-600 text-xs font-medium"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
            >
              {open ? "Hide info" : "Info"}
            </button>
            {open && (
              <div className="md:hidden w-full rounded-lg bg-blue-50 border border-blue-100 px-3 py-2 text-xs text-blue-900 leading-relaxed">
                {def.info}
              </div>
            )}
          </>
        ) : (
          <span className="md:hidden ml-auto">{infoButton}</span>
        )}
      </div>
      <p className="text-sm text-gray-500 mb-3 leading-snug">{def.line}</p>
      <div className="relative w-full">
        <div className="select-none pointer-events-none blur-md opacity-40 sm:blur-lg sm:opacity-[0.35]" aria-hidden>
          <div
            className={cn(
              "relative h-5 w-full rounded-full bg-gray-200",
              def.careerSpan && "md:max-w-md md:mx-auto",
            )}
          >
            <div
              className={cn(
                "h-full flex items-center justify-end rounded-full transition-all duration-500 overflow-hidden",
                BAR_FILL_CLASS,
              )}
              style={{ width: `${w}%` }}
            >
              {w >= 16 ? (
                <span className="text-xs sm:text-sm font-bold text-white drop-shadow-sm pr-2.5 tabular-nums shrink-0">
                  {value}%
                </span>
              ) : null}
            </div>
            {w < 16 ? (
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-700 tabular-nums pointer-events-none">
                {value}%
              </span>
            ) : null}
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center px-1">
          <CollegeMatchQuizLink
            className="max-w-[min(100%,280px)] rounded-full border border-gray-200/90 bg-white px-3 py-2 text-center text-[11px] font-semibold leading-tight text-gray-900 shadow-[0_2px_12px_rgba(0,0,0,0.08)] transition hover:bg-gray-50 hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] active:scale-[0.98] sm:text-xs"
          >
            Unlock Full Stats
          </CollegeMatchQuizLink>
        </div>
      </div>
    </div>
  );
}

export function HumanStatsPanel({
  humanStats,
  universityName,
}: {
  humanStats?: Record<string, unknown> | null;
  universityName: string;
}) {
  const parsed = parseHumanStats(humanStats);

  return (
    <TooltipProvider>
      <div className="border-t border-violet-100 bg-gradient-to-b from-violet-50/30 to-white px-4 sm:px-6 py-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{universityName} Stats</h3>
        <p className="text-sm text-gray-500 mb-6 max-w-2xl leading-relaxed">
          Self-reported student experience scores. Percentages show roughly how many students rated each area
          positively in recent surveys.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {STATS.map((def) => {
            const value = parsed?.[def.normKey] ?? def.defaultVal;
            return <StatRow key={def.normKey} def={def} value={value} />;
          })}
        </div>
      </div>
    </TooltipProvider>
  );
}
