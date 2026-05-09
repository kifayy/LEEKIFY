import Image from "next/image";

import { cn } from "@/lib/utils";
import { HERO_COLLEGE_LOGO_URLS } from "@/lib/hero-college-logos";

const PCT_POOL_MIN = 32;
const PCT_POOL_MAX = 80;

function hashSeed(s: string): number {
  let h = 0x9e3779b9;
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(h, 31) + s.charCodeAt(i)) >>> 0;
  }
  return h >>> 0;
}

/** Deterministic [0,1) from seed (stable across SSR). */
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle<T>(seedStr: string, arr: readonly T[]): T[] {
  const rand = mulberry32(hashSeed(seedStr));
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out;
}

/**
 * Slots per marquee row are logo list × 2 (looped seam). Both rows share one pool of unique ints in 32–80.
 */
function uniquePercentsBothRows(slotCountBothRows: number): { rowA: number[]; rowB: number[] } {
  const poolSize = PCT_POOL_MAX - PCT_POOL_MIN + 1;
  if (slotCountBothRows > poolSize) {
    throw new Error(
      `admission-chance-pills-reel: need ${slotCountBothRows} unique percents but pool is only ${poolSize}`
    );
  }
  const pool = Array.from({ length: poolSize }, (_, i) => i + PCT_POOL_MIN);
  const shuffled = seededShuffle(
    `admission-pills-pcts-v1:${HERO_COLLEGE_LOGO_URLS.join("|")}`,
    pool
  );
  const pick = shuffled.slice(0, slotCountBothRows);
  const half = slotCountBothRows / 2;
  return { rowA: pick.slice(0, half), rowB: pick.slice(half) };
}

function rotateOrder<T>(arr: readonly T[], shift: number): T[] {
  const n = arr.length;
  if (n === 0) return [];
  const s = ((shift % n) + n) % n;
  return [...arr.slice(s), ...arr.slice(0, s)];
}

function buildChanceTrack(
  order: readonly (typeof HERO_COLLEGE_LOGO_URLS)[number][],
  slotPercents: readonly number[]
): { src: (typeof HERO_COLLEGE_LOGO_URLS)[number]; percent: number }[] {
  const doubled = [...order, ...order];
  if (doubled.length !== slotPercents.length) {
    throw new Error("admission-chance-pills-reel: slotPercents length must match doubled order");
  }
  return doubled.map((src, i) => ({
    src,
    percent: slotPercents[i]!,
  }));
}

const SLOT_COUNT_TOTAL = HERO_COLLEGE_LOGO_URLS.length * 2 * 2;
const { rowA: ROW1_PERCENTS, rowB: ROW2_PERCENTS } = uniquePercentsBothRows(SLOT_COUNT_TOTAL);

const ROW1 = buildChanceTrack(HERO_COLLEGE_LOGO_URLS, ROW1_PERCENTS);
const ROW2 = buildChanceTrack(rotateOrder(HERO_COLLEGE_LOGO_URLS, 5), ROW2_PERCENTS);

/** Below this → amber/orange styling and cautionary BAD_STAT_SUFFIXES. */
const PILLS_BAD_STATS_BELOW_PERCENT = 57;

/** Visual tier from hash percent (≈32–80): ≥57 green/teal positive fit; beneath = caution + bad-stats copy. */
function matchStrengthClasses(percent: number) {
  if (percent >= 70)
    return {
      card: "border-emerald-200/90 bg-emerald-50/90",
      pct: "text-emerald-700",
      suffix: "text-emerald-950/[0.72]",
    };
  if (percent >= PILLS_BAD_STATS_BELOW_PERCENT)
    return {
      card: "border-teal-200/90 bg-teal-50/80",
      pct: "text-teal-700",
      suffix: "text-teal-950/[0.68]",
    };
  if (percent >= 45)
    return {
      card: "border-amber-200/95 bg-amber-50/70",
      pct: "text-amber-700",
      suffix: "text-amber-950/[0.70]",
    };
  return {
    card: "border-orange-200/90 bg-orange-50/65",
    pct: "text-orange-700",
    suffix: "text-orange-950/[0.70]",
  };
}

/**
 * Pill body copy max length so rows stay readable in the marquee (characters).
 */
const PILLS_SUFFIX_MAX_CHARS = 64;

/** Green/teal pills: personality, happiness, relationships — broad, human. */
const GOOD_STAT_SUFFIXES = [
  "more likely to be happy here by year two",
  "increased chance of falling in love here by year three",
  "more likely to feel like yourself again by sophomore year",
  "more likely to find friends you still care about by graduation",
  "increased chance of calm weeks here throughout junior year",
  "more likely to become who you actually want to become here",
] as const;

/** Amber/orange pills: personality misfit vibes — still broad, not scene-specific. */
const BAD_STAT_SUFFIXES = [
  "more likely to feel restless or boxed in here by year two",
  "increased chance of feeling lonely here even when you're busy",
  "more likely to second-guess this fit when pressure spikes",
  "more likely to feel you're performing a version that's not you",
  "increased chance of burnout after one semester",
  "more likely to quietly imagine being happier somewhere else",
] as const;

(() => {
  const max = PILLS_SUFFIX_MAX_CHARS;
  for (const line of [...GOOD_STAT_SUFFIXES, ...BAD_STAT_SUFFIXES]) {
    if (line.length > max) {
      throw new Error(
        `admission-chance-pills-reel: suffix longer than ${max} chars (${line.length}): ${JSON.stringify(line)}`
      );
    }
  }
})();

function ChancePill({
  src,
  percent,
  lineIndex,
}: {
  src: string;
  percent: number;
  lineIndex: number;
}) {
  const isBadFitCopy = percent < PILLS_BAD_STATS_BELOW_PERCENT;
  const suffixPool = isBadFitCopy ? BAD_STAT_SUFFIXES : GOOD_STAT_SUFFIXES;
  const suffix = suffixPool[lineIndex % suffixPool.length]!;
  const tier = matchStrengthClasses(percent);
  return (
    <div
      className={cn(
        "inline-flex max-w-[min(272px,calc(100vw-5rem))] shrink-0 items-start gap-2.5 rounded-[2rem] border py-2.5 pl-2.5 pr-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]",
        "sm:max-w-[300px]",
        tier.card
      )}
    >
      <span className="relative mt-0.5 size-8 shrink-0 overflow-hidden rounded-full bg-white/80 ring-1 ring-neutral-200/70">
        <Image
          src={src}
          alt=""
          fill
          className="object-cover"
          sizes="32px"
          unoptimized
        />
      </span>
      <p className="min-w-0 flex-1 text-left text-[11px] font-medium leading-snug sm:text-[12px] sm:leading-snug md:text-[13px]">
        <span className={cn("font-semibold tabular-nums", tier.pct)}>{percent}%</span>{" "}
        <span className={cn("font-medium", tier.suffix)}>{suffix}</span>
      </p>
    </div>
  );
}

export function AdmissionChancePillsReel({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-2.5", className)} aria-hidden>
      <div className="marquee-fade-edges overflow-hidden">
        <div
          className={cn(
            "flex w-max shrink-0 items-start gap-3 pr-3 motion-safe:animate-[marquee-x_52s_linear_infinite]",
            "motion-reduce:animate-none motion-reduce:opacity-80"
          )}
        >
          {ROW1.map((item, i) => (
            <ChancePill
              key={`r1-${i}-${item.src}`}
              src={item.src}
              percent={item.percent}
              lineIndex={i}
            />
          ))}
        </div>
      </div>
      <div className="marquee-fade-edges overflow-hidden">
        <div
          className={cn(
            "flex w-max shrink-0 items-start gap-3 pl-10 pr-3 motion-safe:animate-[home2-marquee-back_58s_linear_infinite]",
            "motion-reduce:animate-none motion-reduce:opacity-80"
          )}
          style={{ animationDelay: "-4s" }}
        >
          {ROW2.map((item, i) => (
            <ChancePill
              key={`r2-${i}-${item.src}`}
              src={item.src}
              percent={item.percent}
              lineIndex={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
