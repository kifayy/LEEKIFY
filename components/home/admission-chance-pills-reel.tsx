import Image from "next/image";

import { cn } from "@/lib/utils";
import { HERO_COLLEGE_LOGO_URLS } from "@/lib/hero-college-logos";

/** One match % per logo URL (same in every row / repeat; position-independent). */
function stablePercentForLogo(src: string): number {
  let h = 0x9e3779b9;
  for (let i = 0; i < src.length; i++) {
    h = (Math.imul(h, 31) + src.charCodeAt(i)) >>> 0;
  }
  return 32 + (h % 49);
}

function rotateOrder<T>(arr: readonly T[], shift: number): T[] {
  const n = arr.length;
  if (n === 0) return [];
  const s = ((shift % n) + n) % n;
  return [...arr.slice(s), ...arr.slice(0, s)];
}

function buildChanceTrack(
  order: readonly (typeof HERO_COLLEGE_LOGO_URLS)[number][]
): { src: (typeof HERO_COLLEGE_LOGO_URLS)[number]; percent: number }[] {
  const items = order.map((src) => ({ src, percent: stablePercentForLogo(src) }));
  return [...items, ...items];
}

const ROW1 = buildChanceTrack(HERO_COLLEGE_LOGO_URLS);
const ROW2 = buildChanceTrack(rotateOrder(HERO_COLLEGE_LOGO_URLS, 5));

function ChancePill({ src, percent }: { src: string; percent: number }) {
  return (
    <div className="inline-flex shrink-0 items-center gap-2.5 rounded-full border border-neutral-200/95 bg-white py-1.5 pl-2 pr-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <span className="relative size-8 shrink-0 overflow-hidden rounded-full bg-neutral-100 ring-1 ring-neutral-100">
        <Image
          src={src}
          alt=""
          fill
          className="object-cover"
          sizes="32px"
          unoptimized
        />
      </span>
      <span className="text-[13px] font-medium tabular-nums text-neutral-900 sm:text-sm">
        {percent}% Match
      </span>
    </div>
  );
}

export function AdmissionChancePillsReel({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-2.5", className)} aria-hidden>
      <div className="marquee-fade-edges overflow-hidden">
        <div
          className={cn(
            "flex w-max shrink-0 items-center gap-3 pr-3 motion-safe:animate-[marquee-x_52s_linear_infinite]",
            "motion-reduce:animate-none motion-reduce:opacity-80"
          )}
        >
          {ROW1.map((item, i) => (
            <ChancePill key={`r1-${i}-${item.src}`} src={item.src} percent={item.percent} />
          ))}
        </div>
      </div>
      <div className="marquee-fade-edges overflow-hidden">
        <div
          className={cn(
            "flex w-max shrink-0 items-center gap-3 pl-10 pr-3 motion-safe:animate-[home2-marquee-back_58s_linear_infinite]",
            "motion-reduce:animate-none motion-reduce:opacity-80"
          )}
          style={{ animationDelay: "-4s" }}
        >
          {ROW2.map((item, i) => (
            <ChancePill key={`r2-${i}-${item.src}`} src={item.src} percent={item.percent} />
          ))}
        </div>
      </div>
    </div>
  );
}
