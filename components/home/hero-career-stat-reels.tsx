"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { HERO_CAREER_STATS, type HeroCareerStatLine } from "@/lib/hero-career-content";

const STATS: HeroCareerStatLine[] = [...HERO_CAREER_STATS];

type AccentPreset = {
  chip: string;
  stroke: string;
  fill: string;
  track: string;
  mute: string;
};

/** Chart inks + glass left rule — saturation tuned for white chips on teal. */
const ACCENT_PRESETS = [
  {
    chip: "border-l-teal-600",
    stroke: "#0f766e",
    fill: "#5eead4",
    track: "#ccfbf1",
    mute: "#94a3b8",
  },
  {
    chip: "border-l-cyan-600",
    stroke: "#0891b2",
    fill: "#67e8f9",
    track: "#cffafe",
    mute: "#94a3b8",
  },
  {
    chip: "border-l-sky-600",
    stroke: "#0284c7",
    fill: "#7dd3fc",
    track: "#e0f2fe",
    mute: "#94a3b8",
  },
  {
    chip: "border-l-indigo-600",
    stroke: "#4f46e5",
    fill: "#a5b4fc",
    track: "#e0e7ff",
    mute: "#94a3b8",
  },
  {
    chip: "border-l-violet-600",
    stroke: "#7c3aed",
    fill: "#c4b5fd",
    track: "#ede9fe",
    mute: "#94a3b8",
  },
  {
    chip: "border-l-amber-600",
    stroke: "#d97706",
    fill: "#fcd34d",
    track: "#fef3c7",
    mute: "#94a3b8",
  },
] as const satisfies readonly AccentPreset[];

/** Explicit palettes by sentiment — overrides rotating neutrals. */
const NEGATIVE_ACCENT: AccentPreset = {
  chip: "border-l-red-600",
  stroke: "#dc2626",
  fill: "#fca5a5",
  track: "#fee2e2",
  mute: "#fecaca",
};

const POSITIVE_ACCENT: AccentPreset = {
  chip: "border-l-emerald-600",
  stroke: "#059669",
  fill: "#6ee7b7",
  track: "#d1fae5",
  mute: "#a7f3d0",
};

const CAUTION_ACCENT: AccentPreset = {
  chip: "border-l-amber-600",
  stroke: "#d97706",
  fill: "#fcd34d",
  track: "#fef3c7",
  mute: "#fde68a",
};

function resolveAccentPreset(stat: HeroCareerStatLine, accentIndex: number): AccentPreset {
  switch (stat.tone ?? "neutral") {
    case "negative":
      return NEGATIVE_ACCENT;
    case "positive":
      return POSITIVE_ACCENT;
    case "caution":
      return CAUTION_ACCENT;
    default:
      return ACCENT_PRESETS[accentIndex % ACCENT_PRESETS.length]!;
  }
}

function chipToneClass(tone: HeroCareerStatLine["tone"]): string {
  switch (tone ?? "neutral") {
    case "negative":
      return "border-red-100/85 bg-[rgba(254,247,247,0.94)]";
    case "positive":
      return "border-emerald-100/85 bg-[rgba(244,253,249,0.94)]";
    case "caution":
      return "border-amber-100/85 bg-[rgba(255,252,245,0.94)]";
    default:
      return "";
  }
}

function chartShellToneClass(tone: HeroCareerStatLine["tone"]): string {
  switch (tone ?? "neutral") {
    case "negative":
      return "bg-red-50/95 ring-red-950/8";
    case "positive":
      return "bg-emerald-50/95 ring-emerald-950/8";
    case "caution":
      return "bg-amber-50/95 ring-amber-950/8";
    default:
      return "";
  }
}

function valueToneClass(tone: HeroCareerStatLine["tone"]): string {
  switch (tone ?? "neutral") {
    case "negative":
      return "text-red-900";
    case "positive":
      return "text-emerald-950";
    case "caution":
      return "text-amber-950";
    default:
      return "";
  }
}

function labelToneClass(tone: HeroCareerStatLine["tone"]): string {
  switch (tone ?? "neutral") {
    case "negative":
      return "text-red-800/92";
    case "positive":
      return "text-emerald-900/90";
    case "caution":
      return "text-amber-900/88";
    default:
      return "";
  }
}

/** Six distinct micro-viz styles (rotates per chip). */
const CHART_VARIANTS = [
  "donut",
  "pie",
  "vbars",
  "hbars",
  "spark",
  "heat",
] as const;

type ChartVariant = (typeof CHART_VARIANTS)[number];

function chartSeries(seed: number, len: number): number[] {
  const out: number[] = [];
  let s = seed >>> 0;
  let prev = 0.52;
  for (let i = 0; i < len; i++) {
    s = (Math.imul(s, 1103515245) + 12345) >>> 0;
    const jitter = (s % 1000) / 1000 - 0.48;
    prev = Math.min(0.94, Math.max(0.22, prev + jitter * 0.26));
    out.push(prev);
  }
  return out;
}

function pickVariant(rowIndex: number, cellIndex: number, seed: number): ChartVariant {
  const i = (rowIndex * 7 + cellIndex * 11 + (seed & 0x1ff)) % CHART_VARIANTS.length;
  return CHART_VARIANTS[i]!;
}

function MiniDonut({
  seed,
  stroke,
  track,
}: {
  seed: number;
  stroke: string;
  track: string;
}) {
  const cx = 17;
  const cy = 14;
  const r = 10;
  const sw = 3.25;
  const c = 2 * Math.PI * r;
  const pct = 0.34 + (seed % 48) / 100;
  const dash = pct * c;

  return (
    <svg width={36} height={28} viewBox="0 0 36 28" className="shrink-0" aria-hidden>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={track} strokeWidth={sw} />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={stroke}
        strokeWidth={sw}
        strokeDasharray={`${dash} ${c}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cy})`}
      />
    </svg>
  );
}

function MiniPie({
  seed,
  primary,
  secondary,
}: {
  seed: number;
  primary: string;
  secondary: string;
}) {
  const cx = 17;
  const cy = 14;
  const r = 12;
  const split = 0.28 + (seed % 52) / 100;
  const tau = Math.PI * 2;
  const start = -Math.PI / 2;
  const mid = start + split * tau;
  const end = start + tau;

  const wedge = (a0: number, a1: number, fill: string, k: string) => {
    const x0 = cx + r * Math.cos(a0);
    const y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    const large = a1 - a0 > Math.PI ? 1 : 0;
    return (
      <path
        key={k}
        d={`M ${cx} ${cy} L ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1} Z`}
        fill={fill}
      />
    );
  };

  return (
    <svg width={36} height={28} viewBox="0 0 36 28" className="shrink-0" aria-hidden>
      {wedge(start, mid, primary, "a")}
      {wedge(mid, end, secondary, "b")}
    </svg>
  );
}

function MiniHBars({
  seed,
  stroke,
  track,
}: {
  seed: number;
  stroke: string;
  track: string;
}) {
  const vals = chartSeries(seed, 4);
  const w = 36;
  const h = 28;
  const barH = 4;
  const gap = 2;
  const maxW = w - 4;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="shrink-0" aria-hidden>
      {vals.map((b, i) => {
        const y = 3 + i * (barH + gap);
        const bw = Math.max(6, b * maxW);
        return (
          <g key={i}>
            <rect x={2} y={y} width={maxW} height={barH} rx={1} fill={track} />
            <rect x={2} y={y} width={bw} height={barH} rx={1} fill={stroke} opacity={0.88} />
          </g>
        );
      })}
    </svg>
  );
}

function MiniVBars({
  seed,
  stroke,
  fill,
}: {
  seed: number;
  stroke: string;
  fill: string;
}) {
  const vals = chartSeries(seed, 5);
  const w = 36;
  const h = 28;
  const gap = 2.25;
  const barW = (w - gap * (vals.length - 1)) / vals.length;
  const maxH = h - 5;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="shrink-0" aria-hidden>
      {vals.map((b, i) => {
        const bh = Math.max(4, b * maxH);
        const x = i * (barW + gap);
        const y = h - 3 - bh;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={barW}
            height={bh}
            rx={1.2}
            fill={fill}
            stroke={stroke}
            strokeWidth={0.55}
            opacity={0.72 + i * 0.055}
          />
        );
      })}
    </svg>
  );
}

function MiniSparkline({
  gradientId,
  seed,
  stroke,
  fill,
}: {
  gradientId: string;
  seed: number;
  stroke: string;
  fill: string;
}) {
  const pts = chartSeries(seed, 8);
  const w = 36;
  const h = 28;
  const padX = 2;
  const padY = 3;
  const n = pts.length;
  const xs = pts.map((_, i) => padX + (i * (w - 2 * padX)) / Math.max(1, n - 1));
  const ys = pts.map((p) => padY + (1 - p) * (h - 2 * padY));
  let lineD = "";
  for (let i = 0; i < n; i++) {
    lineD += `${i === 0 ? "M" : "L"} ${xs[i]!.toFixed(2)} ${ys[i]!.toFixed(2)} `;
  }
  const baseY = h - padY;
  const areaD = `${lineD} L ${xs[n - 1]!.toFixed(2)} ${baseY} L ${xs[0]!.toFixed(2)} ${baseY} Z`;

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      className="shrink-0 overflow-visible"
      aria-hidden
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={fill} stopOpacity="0.5" />
          <stop offset="100%" stopColor={fill} stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#${gradientId})`} />
      <path
        d={lineD}
        fill="none"
        stroke={stroke}
        strokeWidth={1.65}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={xs[n - 1]!} cy={ys[n - 1]!} r={2.15} fill={stroke} />
    </svg>
  );
}

/** 3×3 heat tiles — sixth viz type (distinct from bars/spark). */
function MiniHeat({ seed, stroke }: { seed: number; stroke: string }) {
  const w = 36;
  const h = 28;
  const cols = 3;
  const rows = 3;
  const gap = 2;
  const cellW = (w - 2 - gap * (cols - 1)) / cols;
  const cellH = (h - 2 - gap * (rows - 1)) / rows;
  let s = seed >>> 0;
  const cells: { opacity: number }[] = [];
  for (let i = 0; i < 9; i++) {
    s = (Math.imul(s, 1103515245) + 12345) >>> 0;
    cells.push({ opacity: 0.22 + ((s % 70) / 100) * 0.78 });
  }

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="shrink-0" aria-hidden>
      {cells.map((cell, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = 1 + col * (cellW + gap);
        const y = 1 + row * (cellH + gap);
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={cellW}
            height={cellH}
            rx={1.25}
            fill={stroke}
            opacity={cell.opacity}
          />
        );
      })}
    </svg>
  );
}

function MiniChart({
  variant,
  seed,
  preset,
  gradientId,
}: {
  variant: ChartVariant;
  seed: number;
  preset: AccentPreset;
  gradientId: string;
}) {
  switch (variant) {
    case "donut":
      return <MiniDonut seed={seed} stroke={preset.stroke} track={preset.track} />;
    case "pie":
      return (
        <MiniPie seed={seed} primary={preset.stroke} secondary={preset.mute} />
      );
    case "hbars":
      return <MiniHBars seed={seed} stroke={preset.stroke} track={preset.track} />;
    case "vbars":
      return <MiniVBars seed={seed} stroke={preset.stroke} fill={preset.fill} />;
    case "spark":
      return (
        <MiniSparkline
          gradientId={gradientId}
          seed={seed}
          stroke={preset.stroke}
          fill={preset.fill}
        />
      );
    default:
      return <MiniHeat seed={seed} stroke={preset.stroke} />;
  }
}

/** Distinct seed from logo reels so row mixes differ. */
const STAT_BASE_SEED = 0x51c4f02a >>> 0;
const ROW_SEED_MIX = 0x85ebca6b >>> 0;

function seededOrder(
  seed: number,
  stats: readonly HeroCareerStatLine[] = STATS,
): HeroCareerStatLine[] {
  const a = [...stats];
  let state = seed >>> 0;
  if (state === 0) state = 0x6eed3849;
  for (let i = a.length - 1; i > 0; i--) {
    state = (Math.imul(state, 1103515245) + 12345) >>> 0;
    const j = state % (i + 1);
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

function statOrderForRow(
  rowIndex: number,
  stats: readonly HeroCareerStatLine[] = STATS,
): HeroCareerStatLine[] {
  return seededOrder((STAT_BASE_SEED + Math.imul(rowIndex, ROW_SEED_MIX)) >>> 0, stats);
}

const STAT_REEL_ROWS = [
  { animationClass: "motion-safe:animate-[marquee-x_40s_linear_infinite]", delaySec: 0 },
  {
    animationClass: "motion-safe:animate-[home2-marquee-back_46s_linear_infinite]",
    delaySec: -7.25,
  },
  { animationClass: "motion-safe:animate-[marquee-x_34s_linear_infinite]", delaySec: -14.5 },
  {
    animationClass: "motion-safe:animate-[home2-marquee-back_52s_linear_infinite]",
    delaySec: -21.125,
  },
  { animationClass: "motion-safe:animate-[marquee-x_38s_linear_infinite]", delaySec: -31.75 },
] as const;

type TrackCell =
  | { kind: "stat"; stat: HeroCareerStatLine; accentIndex: number }
  | { kind: "gap" };

function buildTrack(order: readonly HeroCareerStatLine[], rowIndex: number): TrackCell[] {
  const cycle = order.flatMap((stat, ordIndex): TrackCell[] => {
    const accentIndex =
      (rowIndex * 17 + ordIndex * 5 + stat.value.length + stat.label.length) %
      ACCENT_PRESETS.length;
    return [{ kind: "stat", stat, accentIndex }, { kind: "gap" }];
  });
  return [...cycle, ...cycle];
}

const chipBase =
  "relative flex min-h-[3rem] min-w-[10.5rem] max-w-[14.75rem] shrink-0 items-center gap-2 rounded-xl border border-white/90 bg-[rgba(255,255,255,0.88)] py-2 pl-2 pr-2.5 shadow-[0_18px_44px_-22px_rgba(15,118,110,0.35),0_1px_0_rgba(255,255,255,1)_inset,inset_0_1px_0_rgba(255,255,255,1)] backdrop-blur-[14px] sm:min-w-[11.125rem] sm:max-w-[15.25rem] sm:gap-2.5 sm:rounded-[13px] sm:py-2.5 sm:pl-2 sm:pr-3 lg:min-h-[3.35rem] lg:min-w-[11.875rem] lg:max-w-[15.75rem] xl:min-w-[12.35rem] xl:max-w-[16rem]";

const chartShell =
  "flex h-[2.85rem] w-[2.85rem] shrink-0 items-center justify-center rounded-[10px] bg-white/90 shadow-[inset_0_1px_0_rgba(255,255,255,1)] ring-1 ring-neutral-950/[0.07] sm:h-[3rem] sm:w-[3rem]";

const valueClass =
  "font-[family-name:var(--font-poppins)] text-[0.6875rem] font-bold tracking-[-0.02em] text-neutral-950 tabular-nums sm:text-[0.78125rem] lg:text-[0.8125rem]";

const labelClass =
  "font-[family-name:var(--font-poppins)] text-[0.5rem] font-semibold uppercase leading-[1.2] tracking-[0.07em] text-neutral-800/95 sm:text-[0.5625rem] lg:text-[0.59375rem]";

export type HeroCareerStatReelsProps = {
  idPrefix: string;
  className?: string;
  rowGapClassName?: string;
  spacerClassName?: string;
  chipClassName?: string;
  labelClassName?: string;
  iconShellClassName?: string;
  careerNameClassName?: string;
  trackPaddingClassName?: string;
  rowWrapperClassName?: string;
  hiddenFirstRowsBelowMd?: number;
  /** Override default hero stats (e.g. path widget copy). */
  stats?: readonly HeroCareerStatLine[];
  /** Cap how many marquee rows render. */
  maxRows?: number;
  /** Tighter chips with small career icons (path widget). */
  variant?: "default" | "path-widget";
};

export function HeroCareerStatReels({
  idPrefix,
  className,
  rowGapClassName = "gap-3 py-5 md:gap-3.5",
  spacerClassName = "inline-block w-[3.75rem] shrink-0 md:w-[5.25rem] lg:w-32 xl:w-40",
  chipClassName,
  labelClassName,
  iconShellClassName,
  careerNameClassName,
  trackPaddingClassName = "px-6 lg:px-8",
  rowWrapperClassName = "marquee-fade-edges mx-auto w-full overflow-hidden",
  hiddenFirstRowsBelowMd,
  stats = STATS,
  maxRows,
  variant = "default",
}: HeroCareerStatReelsProps) {
  const rows = maxRows != null ? STAT_REEL_ROWS.slice(0, maxRows) : STAT_REEL_ROWS;

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-[5] flex flex-col justify-center",
        rowGapClassName,
        className,
      )}
      aria-hidden
    >
      {rows.map(({ animationClass, delaySec }, rowIndex) => {
        const track = buildTrack(statOrderForRow(rowIndex, stats), rowIndex);
        return (
          <div
            key={`${idPrefix}-stat-row-${rowIndex}`}
            className={cn(
              rowWrapperClassName,
              hiddenFirstRowsBelowMd !== undefined &&
                rowIndex < hiddenFirstRowsBelowMd &&
                "max-md:hidden"
            )}
          >
            <div
              className={cn(
                "flex w-max shrink-0 items-center gap-0 motion-reduce:animate-none",
                trackPaddingClassName,
                animationClass
              )}
              style={{ animationDelay: `${delaySec}s` }}
            >
              {track.map((cell, i) =>
                cell.kind === "gap" ? (
                  <span
                    key={`${idPrefix}-${rowIndex}-gap-${i}`}
                    className={spacerClassName}
                    aria-hidden
                  />
                ) : (
                  <StatChip
                    key={`${idPrefix}-${rowIndex}-stat-${i}`}
                    idPrefix={idPrefix}
                    rowIndex={rowIndex}
                    cellIndex={i}
                    stat={cell.stat}
                    accentIndex={cell.accentIndex}
                    chipClassName={chipClassName}
                    labelClassName={labelClassName}
                    iconShellClassName={iconShellClassName}
                    careerNameClassName={careerNameClassName}
                    variant={variant}
                  />
                )
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function StatChip({
  idPrefix,
  rowIndex,
  cellIndex,
  stat,
  accentIndex,
  chipClassName,
  labelClassName,
  iconShellClassName,
  careerNameClassName,
  variant: chipVariant = "default",
}: {
  idPrefix: string;
  rowIndex: number;
  cellIndex: number;
  stat: HeroCareerStatLine;
  accentIndex: number;
  chipClassName?: string;
  labelClassName?: string;
  iconShellClassName?: string;
  careerNameClassName?: string;
  variant?: "default" | "path-widget";
}) {
  const preset = resolveAccentPreset(stat, accentIndex);
  const seed =
    (rowIndex * 0x9e37_79b9 + cellIndex * 0x517cc1b7 + stat.label.length * 31) >>> 0;
  const chartVariant = pickVariant(rowIndex, cellIndex, seed);
  const toneKey = stat.tone ?? "neutral";
  const gradId = `${idPrefix}-spark-${rowIndex}-${cellIndex}-${accentIndex}-${toneKey}`;
  const showIcon = Boolean(stat.iconSrc);
  const isPathWidget = chipVariant === "path-widget";

  return (
    <span
      className={cn(
        isPathWidget
          ? "relative flex min-h-0 min-w-[12.25rem] max-w-[17rem] shrink-0 items-center gap-2.5 rounded-xl border border-violet-100/90 bg-white py-2 pl-2.5 pr-3 shadow-[0_2px_10px_rgba(149,109,254,0.12)] sm:min-w-[13rem] sm:max-w-[17.5rem]"
          : chipBase,
        !isPathWidget && chipToneClass(stat.tone),
        isPathWidget ? "border-l-2" : "border-l-[3px]",
        preset.chip,
        chipClassName,
      )}
    >
      {showIcon ? (
        <span
          className={cn(
            "flex w-[2.375rem] shrink-0 flex-col items-center justify-center gap-0.5",
            isPathWidget && "w-[2.125rem]",
          )}
        >
          <span
            className={cn(
              isPathWidget
                ? "relative h-7 w-7 shrink-0 overflow-hidden rounded-lg bg-white ring-1 ring-violet-100/90"
                : chartShell,
              !isPathWidget && "relative overflow-hidden bg-white p-0.5 ring-violet-100",
              iconShellClassName,
            )}
          >
            <Image
              src={stat.iconSrc!}
              alt={stat.careerName ?? ""}
              fill
              loading="lazy"
              className="object-contain p-0.5"
              sizes={isPathWidget ? "28px" : "48px"}
            />
          </span>
          {stat.careerName ? (
            <span
              className={cn(
                "w-full text-center font-[family-name:var(--font-poppins)] text-[0.5rem] font-semibold leading-none text-neutral-500",
                !isPathWidget && "max-w-[3.25rem] truncate text-neutral-600",
                careerNameClassName,
              )}
            >
              {stat.careerName}
            </span>
          ) : null}
        </span>
      ) : (
        <span className={cn(chartShell, chartShellToneClass(stat.tone))}>
          <MiniChart
            variant={chartVariant}
            seed={seed}
            preset={preset}
            gradientId={gradId}
          />
        </span>
      )}
      <span className="flex min-w-0 flex-1 flex-col justify-center gap-0.5 text-left leading-snug">
        <span
          className={cn(
            valueClass,
            valueToneClass(stat.tone),
            isPathWidget && "text-[0.75rem] sm:text-[0.8125rem]",
          )}
        >
          {stat.value}
        </span>
        <span
          className={cn(
            isPathWidget
              ? "font-[family-name:var(--font-poppins)] text-[0.625rem] font-medium leading-snug text-neutral-600"
              : labelClass,
            !isPathWidget && labelToneClass(stat.tone),
            !isPathWidget && "mt-px max-w-[11rem] sm:max-w-[11.75rem] lg:max-w-[12.5rem]",
            isPathWidget && "line-clamp-2",
            labelClassName,
          )}
        >
          {stat.label}
        </span>
      </span>
    </span>
  );
}
