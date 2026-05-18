"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

import { isCareerAudience } from "@/components/home/hero-audience-theme";
import { HOME_HERO_UNIVERSITY_STUDENT_ENABLED } from "@/lib/home-hero-university-student-variant";

/** HS vs current college students — drives hero copy + quiz CTA label/link. */
export type HeroAudience = "highSchool" | "college";

type HeroAudienceContextValue = {
  audience: HeroAudience;
  setAudience: (audience: HeroAudience) => void;
};

const HeroAudienceContext = createContext<HeroAudienceContextValue | null>(null);

export function HeroAudienceProvider({ children }: { children: ReactNode }) {
  const [audience, setAudienceState] = useState<HeroAudience>("highSchool");

  const setAudience = useCallback((next: HeroAudience) => {
    if (!HOME_HERO_UNIVERSITY_STUDENT_ENABLED && next === "college") return;
    setAudienceState(next);
  }, []);

  const value = useMemo(
    () => ({ audience, setAudience }),
    [audience, setAudience]
  );

  return (
    <HeroAudienceContext.Provider value={value}>
      {children}
    </HeroAudienceContext.Provider>
  );
}

export function useHeroAudience(): HeroAudienceContextValue {
  const ctx = useContext(HeroAudienceContext);
  if (!ctx) {
    throw new Error("useHeroAudience must be used within HeroAudienceProvider");
  }
  return ctx;
}

const LABELS: Record<HeroAudience, string> = {
  highSchool: "High Schooler",
  college: "University Student",
};

type HeroAudienceToggleProps = {
  className?: string;
  /** Larger tap targets / text on mobile hero */
  size?: "default" | "compact";
};

export function HeroAudienceToggle({ className, size = "default" }: HeroAudienceToggleProps) {
  const { audience, setAudience } = useHeroAudience();
  const career = isCareerAudience(audience);

  const compact = size === "compact";

  if (!HOME_HERO_UNIVERSITY_STUDENT_ENABLED) return null;

  return (
    <div className={cn("flex w-full max-w-[min(100%,26rem)] flex-col sm:max-w-none", className)}>
      {/* Switch-track layout (rounded-xl + sliding thumb) — reads differently than pill CTAs below */}
      <div
        className={cn(
          "relative isolate w-full rounded-[11px] shadow-inner backdrop-blur-sm ring-1 ring-inset md:rounded-[13px] md:shadow-[inset_0_1px_2px_rgba(15,23,42,0.06)]",
          compact ? "p-[3px] md:p-[6px]" : "p-[4px] md:rounded-[14px] md:p-[6px]",
          compact ? "h-[3.15rem] md:h-[2.85rem]" : "h-[2.7rem] md:h-[2.85rem]",
          career
            ? "bg-white/95 shadow-[0_3px_14px_rgba(15,118,110,0.12)] ring-teal-800/22 md:bg-teal-100/95 md:ring-teal-900/15"
            : "bg-black/25 shadow-black/20 ring-white/25 md:bg-violet-100/70 md:ring-violet-400/25"
        )}
        role="group"
        aria-label="Student type: high school or university"
      >
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute rounded-[8px] shadow-[0_4px_12px_-2px_rgba(15,23,42,0.3),0_0_0_1px_rgba(255,255,255,0.55)_inset] transition-[left,background-color] duration-300 ease-[cubic-bezier(0.34,1.3,0.64,1)] md:rounded-[10px]",
            compact ? "bottom-[3px] top-[3px] w-[calc(50%-5px)] md:bottom-[6px] md:top-[6px] md:w-[calc(50%-9px)]" : "bottom-[4px] top-[4px] w-[calc(50%-6px)] md:bottom-[6px] md:top-[6px] md:w-[calc(50%-9px)] md:rounded-[11px]",
            audience === "college"
              ? "left-[calc(50%+2px)] md:left-[calc(50%+4px)]"
              : compact
                ? "left-[3px] md:left-[6px]"
                : "left-[4px] md:left-[6px]",
            audience === "college"
              ? career
                ? "bg-gradient-to-br from-teal-600 via-teal-600 to-emerald-700 md:from-teal-600 md:to-teal-700"
                : "bg-[#956DFE] md:bg-[#8568ED]"
              : "bg-white md:bg-white"
          )}
        />

        <div className="relative z-[1] grid h-full grid-cols-2 gap-0">
          {(["highSchool", "college"] as const).map((key) => {
            const selected = audience === key;
            return (
              <button
                key={key}
                type="button"
                aria-pressed={selected}
                onClick={() => setAudience(key)}
                className={cn(
                  "flex items-center justify-center rounded-[8px] font-[family-name:var(--font-poppins)] leading-[1.1] tracking-[-0.02em] transition-colors duration-200 md:rounded-[10px]",
                  compact ? "px-1 py-0.5 sm:px-1.5" : "px-1.5 py-0.5 sm:px-2",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                  career ? "focus-visible:outline-teal-200 md:focus-visible:outline-teal-600" : "focus-visible:outline-white/90 md:focus-visible:outline-[#956DFE]",
                  compact
                    ? "text-[0.625rem] font-semibold sm:text-[0.6875rem] md:text-sm"
                    : "text-[0.625rem] font-semibold sm:text-[0.6875rem] md:text-xs lg:text-sm",
                  selected
                    ? audience === "college" && key === "college"
                      ? "text-white"
                      : key === "highSchool"
                        ? career
                          ? "text-teal-950 md:text-teal-950"
                          : "text-violet-950 md:text-violet-950"
                        : "text-white"
                    : career
                      ? compact
                        ? "text-teal-900 hover:text-teal-950 md:text-teal-900/55 md:hover:text-teal-950"
                        : "text-teal-900/75 hover:text-teal-950 md:text-teal-900/55 md:hover:text-teal-950"
                      : "text-white/80 hover:text-white md:text-violet-950/55 md:hover:text-violet-950"
                )}
              >
                {LABELS[key]}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
