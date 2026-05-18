import { HERO_PURPLE } from "@/components/home/hero-audience-theme";
import { cn } from "@/lib/utils";

/** Shared desktop marketing section h2 — color, size, font, weight. */
export const DESKTOP_SECTION_HEADING_CLASS =
  "font-[family-name:var(--font-poppins)] text-[clamp(1.75rem,2.8vw,2.625rem)] font-extrabold leading-[1.12] tracking-[-0.03em] text-[#18062E]";

/** Shared body copy under desktop section headings. */
export const DESKTOP_SECTION_SUBTEXT_CLASS =
  "font-[family-name:var(--font-poppins)] text-[0.9375rem] leading-relaxed text-neutral-500 md:text-base";

/** Shared list / card titles in desktop feature sections. */
export const DESKTOP_SECTION_ITEM_TITLE_CLASS =
  "font-[family-name:var(--font-poppins)] text-lg font-bold text-[#18062E]";

export function DesktopHeadingSwoosh({ className }: { className?: string }) {
  return (
    <svg
      className={cn(
        "pointer-events-none absolute left-0 top-full mt-1.5 h-3 w-full min-w-[6.5rem]",
        className,
      )}
      viewBox="0 0 140 12"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d="M2 8C32 2 58 2 88 6C108 8 124 9 138 7"
        stroke={HERO_PURPLE}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
