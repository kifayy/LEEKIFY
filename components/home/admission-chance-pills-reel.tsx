import Image from "next/image";

import { cn } from "@/lib/utils";
import { HERO_COLLEGE_LOGO_URLS, heroCollegeLogoTileBgClass } from "@/lib/hero-college-logos";
import { collegeLogoAlt } from "@/lib/home-image-seo";

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

/** One percent per logo (32–80), stable for both marquee rows and both loop halves. */
function logoUrlToPercent(): Map<(typeof HERO_COLLEGE_LOGO_URLS)[number], number> {
  const n = HERO_COLLEGE_LOGO_URLS.length;
  const poolSize = PCT_POOL_MAX - PCT_POOL_MIN + 1;
  if (n > poolSize) {
    throw new Error(
      `admission-chance-pills-reel: need ${n} unique percents but pool is only ${poolSize}`
    );
  }
  const pool = Array.from({ length: poolSize }, (_, i) => i + PCT_POOL_MIN);
  const shuffled = seededShuffle(
    `admission-pills-pcts-v2:${HERO_COLLEGE_LOGO_URLS.join("|")}`,
    pool
  );
  const chosen = shuffled.slice(0, n);
  return new Map(HERO_COLLEGE_LOGO_URLS.map((url, i) => [url, chosen[i]!]));
}

type ChancePillData = {
  src: (typeof HERO_COLLEGE_LOGO_URLS)[number];
  percent: number;
  suffix: string;
};

/** Below this → amber/orange styling and cautionary BAD_STAT_SUFFIXES. */
const PILLS_BAD_STATS_BELOW_PERCENT = 57;

/**
 * Pill body copy max length so rows stay readable in the marquee (characters).
 */
const PILLS_SUFFIX_MAX_CHARS = 73;

/** Green/teal pills: personality, happiness, relationships — broad, human. */
const GOOD_STAT_SUFFIXES = [
  "more likely to make friendships that actually last",
  "increased chance of a healthy, low-stress balance",
  "more likely to feel completely at home by year two",
  "increased chance of finding love by end of year one",
] as const;

/** Amber/orange pills: personality misfit vibes — still broad, not scene-specific. */
const BAD_STAT_SUFFIXES = [
  "higher risk of reporting social isolation despite a busy campus",
  "more likely to consider transferring during heavy exam periods",
  "higher probability of experiencing cultural friction or imposter syndrome",
  "increased risk of severe academic burnout in the first semester",
  "more likely to actively browse other schools within the first year",
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

/** One stat line per logo within good/bad pools — no duplicate copy on distinct cards. */
function logoUrlToSuffix(
  pctByUrl: ReadonlyMap<(typeof HERO_COLLEGE_LOGO_URLS)[number], number>
): Map<(typeof HERO_COLLEGE_LOGO_URLS)[number], string> {
  const goodUrls: (typeof HERO_COLLEGE_LOGO_URLS)[number][] = [];
  const badUrls: (typeof HERO_COLLEGE_LOGO_URLS)[number][] = [];

  for (const url of HERO_COLLEGE_LOGO_URLS) {
    const pct = pctByUrl.get(url);
    if (pct === undefined) throw new Error(`admission-chance-pills-reel: missing percent for ${url}`);
    if (pct >= PILLS_BAD_STATS_BELOW_PERCENT) goodUrls.push(url);
    else badUrls.push(url);
  }

  const map = new Map<(typeof HERO_COLLEGE_LOGO_URLS)[number], string>();

  function assignTier(
    urls: (typeof HERO_COLLEGE_LOGO_URLS)[number][],
    pool: readonly string[],
    seed: string
  ) {
    const shuffledUrls = seededShuffle(`${seed}:urls`, urls);
    const shuffledSuffixes = seededShuffle(`${seed}:suffixes`, pool);
    const used = new Set<string>();

    shuffledUrls.forEach((url, i) => {
      const unused = shuffledSuffixes.find((s) => !used.has(s));
      const suffix = unused ?? shuffledSuffixes[i % shuffledSuffixes.length]!;
      used.add(suffix);
      map.set(url, suffix);
    });
  }

  assignTier(goodUrls, GOOD_STAT_SUFFIXES, "admission-pills-suffix-good-v4");
  assignTier(badUrls, BAD_STAT_SUFFIXES, "admission-pills-suffix-bad-v4");

  return map;
}

type LogoUrl = (typeof HERO_COLLEGE_LOGO_URLS)[number];
type PillPolarity = "good" | "bad";

const PILLS_MAX_SAME_POLARITY_RUN = 2;

function pillPolarity(percent: number): PillPolarity {
  return percent >= PILLS_BAD_STATS_BELOW_PERCENT ? "good" : "bad";
}

/** No 3+ good or bad pills adjacent (including across the seamless loop join). */
function orderLogosWithMaxPolarityRun(
  urls: readonly LogoUrl[],
  pctByUrl: ReadonlyMap<LogoUrl, number>,
  seed: string
): LogoUrl[] {
  if (urls.length <= 1) return [...urls];

  const items = urls.map((url) => ({
    url,
    polarity: pillPolarity(pctByUrl.get(url)!),
  }));

  const good = items.filter((i) => i.polarity === "good");
  const bad = items.filter((i) => i.polarity === "bad");

  function violatesRun(seq: PillPolarity[]): boolean {
    let run = 1;
    for (let i = 1; i < seq.length; i++) {
      if (seq[i] === seq[i - 1]) {
        run++;
        if (run > PILLS_MAX_SAME_POLARITY_RUN) return true;
      } else {
        run = 1;
      }
    }
    const n = seq.length;
    if (n >= 3 && seq[n - 2] === seq[n - 1] && seq[n - 1] === seq[0]) return true;
    if (n >= 3 && seq[n - 1] === seq[0] && seq[0] === seq[1]) return true;
    return false;
  }

  function backtrack(remaining: typeof items, seq: LogoUrl[], polSeq: PillPolarity[]): LogoUrl[] | null {
    if (remaining.length === 0) {
      return violatesRun(polSeq) ? null : seq;
    }

    const candidates = seededShuffle(`${seed}:bt:${seq.length}`, remaining);
    for (const pick of candidates) {
      const nextPol = [...polSeq, pick.polarity];
      if (violatesRun(nextPol)) continue;
      const rest = remaining.filter((r) => r.url !== pick.url);
      const out = backtrack(rest, [...seq, pick.url], nextPol);
      if (out) return out;
    }
    return null;
  }

  const greedy = interleaveLogosMaxRun(good, bad);
  if (greedy && !violatesRun(greedy.map((url) => pillPolarity(pctByUrl.get(url)!)))) {
    return greedy;
  }

  const solved = backtrack(items, [], []);
  if (solved) return solved;

  return breakPolarityRunsBySwaps([...urls], pctByUrl);
}

/** Last resort: swap pills to break 3+ runs without changing which logos appear. */
function breakPolarityRunsBySwaps(
  arr: LogoUrl[],
  pctByUrl: ReadonlyMap<LogoUrl, number>
): LogoUrl[] {
  const polSeq = () => arr.map((url) => pillPolarity(pctByUrl.get(url)!));

  function violatesLinear(seq: PillPolarity[]): boolean {
    let run = 1;
    for (let i = 1; i < seq.length; i++) {
      if (seq[i] === seq[i - 1]) {
        run++;
        if (run > PILLS_MAX_SAME_POLARITY_RUN) return true;
      } else {
        run = 1;
      }
    }
    return false;
  }

  function violatesWrap(seq: PillPolarity[]): boolean {
    const n = seq.length;
    if (n >= 3 && seq[n - 2] === seq[n - 1] && seq[n - 1] === seq[0]) return true;
    if (n >= 3 && seq[n - 1] === seq[0] && seq[0] === seq[1]) return true;
    return false;
  }

  for (let guard = 0; guard < arr.length * 8; guard++) {
    const seq = polSeq();
    if (!violatesLinear(seq) && !violatesWrap(seq)) return arr;

    const n = seq.length;
    for (let i = 0; i < n; i++) {
      const triple =
        (i + 2 < n && seq[i] === seq[i + 1] && seq[i + 1] === seq[i + 2]) ||
        (i === n - 2 && n >= 3 && seq[n - 2] === seq[n - 1] && seq[n - 1] === seq[0]) ||
        (i === n - 1 && n >= 3 && seq[n - 1] === seq[0] && seq[0] === seq[1]);

      if (!triple) continue;

      const need = seq[i] === "good" ? "bad" : "good";
      const j = arr.findIndex((url) => pillPolarity(pctByUrl.get(url)!) === need);
      if (j < 0) continue;

      const swapAt = i + 1 < n ? i + 1 : 0;
      [arr[swapAt], arr[j]] = [arr[j]!, arr[swapAt]!];
      break;
    }
  }

  return arr;
}

function interleaveLogosMaxRun(
  good: { url: LogoUrl; polarity: PillPolarity }[],
  bad: { url: LogoUrl; polarity: PillPolarity }[]
): LogoUrl[] | null {
  const goodQ = good.map((i) => i.url);
  const badQ = bad.map((i) => i.url);
  const result: LogoUrl[] = [];
  let last: PillPolarity | null = null;
  let run = 0;

  while (goodQ.length > 0 || badQ.length > 0) {
    const canGood = goodQ.length > 0 && !(last === "good" && run >= PILLS_MAX_SAME_POLARITY_RUN);
    const canBad = badQ.length > 0 && !(last === "bad" && run >= PILLS_MAX_SAME_POLARITY_RUN);

    let pick: PillPolarity;
    if (canGood && canBad) {
      if (last === "good") pick = "bad";
      else if (last === "bad") pick = "good";
      else pick = goodQ.length >= badQ.length ? "good" : "bad";
    } else if (canGood) pick = "good";
    else if (canBad) pick = "bad";
    else return null;

    const url = (pick === "good" ? goodQ : badQ).shift()!;
    result.push(url);
    run = last === pick ? run + 1 : 1;
    last = pick;
  }

  return result;
}

/**
 * Doubled for seamless infinity scroll: second half repeats the same (logo, percent, suffix) as the first.
 */
function buildChanceTrack(
  order: readonly (typeof HERO_COLLEGE_LOGO_URLS)[number][],
  pctByUrl: ReadonlyMap<(typeof HERO_COLLEGE_LOGO_URLS)[number], number>,
  suffixByUrl: ReadonlyMap<(typeof HERO_COLLEGE_LOGO_URLS)[number], string>
): ChancePillData[] {
  const once = order.map((src) => {
    const percent = pctByUrl.get(src);
    const suffix = suffixByUrl.get(src);
    if (percent === undefined) throw new Error(`admission-chance-pills-reel: missing percent for ${src}`);
    if (suffix === undefined) throw new Error(`admission-chance-pills-reel: missing suffix for ${src}`);
    return { src, percent, suffix };
  });
  return [...once, ...once];
}

const PCT_BY_LOGO_URL = logoUrlToPercent();
const SUFFIX_BY_LOGO_URL = logoUrlToSuffix(PCT_BY_LOGO_URL);

/** Each school appears in one marquee row only (6 per row), interleaved good/bad. */
const ROW1_LOGO_ORDER = orderLogosWithMaxPolarityRun(
  HERO_COLLEGE_LOGO_URLS.slice(0, 6),
  PCT_BY_LOGO_URL,
  "admission-pills-row1-order-v1"
);
const ROW2_LOGO_ORDER = orderLogosWithMaxPolarityRun(
  HERO_COLLEGE_LOGO_URLS.slice(6),
  PCT_BY_LOGO_URL,
  "admission-pills-row2-order-v1"
);

const ROW1 = buildChanceTrack(ROW1_LOGO_ORDER, PCT_BY_LOGO_URL, SUFFIX_BY_LOGO_URL);
const ROW2 = buildChanceTrack(ROW2_LOGO_ORDER, PCT_BY_LOGO_URL, SUFFIX_BY_LOGO_URL);

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

function ChancePill({ src, percent, suffix }: ChancePillData) {
  const tier = matchStrengthClasses(percent);
  return (
    <div
      className={cn(
        "inline-flex max-w-[min(272px,calc(100vw-5rem))] shrink-0 items-start gap-2.5 rounded-[2rem] border py-2.5 pl-2.5 pr-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]",
        "sm:max-w-[300px]",
        tier.card
      )}
    >
      <span
        className={cn(
          "relative mt-0.5 size-8 shrink-0 overflow-hidden rounded-full ring-1 ring-white/35",
          heroCollegeLogoTileBgClass(src)
        )}
      >
        <Image
          src={src}
          alt={collegeLogoAlt(src)}
          fill
          loading="lazy"
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
            <ChancePill key={`r1-${i}`} {...item} />
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
            <ChancePill key={`r2-${i}`} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
