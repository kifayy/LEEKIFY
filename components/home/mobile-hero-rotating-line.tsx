"use client";

import { useCallback, useEffect, useState } from "react";

import {
  MOBILE_HERO_ROTATING_ACCENT_CLASS,
  MOBILE_HERO_ROTATING_LINE_CLASS,
  MOBILE_HERO_ROTATING_PREFIX_CLASS,
} from "@/components/home/mobile-hero-typography";
import { cn } from "@/lib/utils";

const HOLD_MS = 2600;
const EXIT_MS = 420;

type MobileHeroRotatingLineProps = {
  lines: readonly string[];
  prefix?: string;
  className?: string;
  /** Override rotating phrase typography (e.g. desktop hero scale). */
  lineClassName?: string;
};

/**
 * Second headline line — static prefix + accent phrase that cycles in/out.
 */
export function MobileHeroRotatingLine({
  lines,
  prefix = "",
  className,
  lineClassName,
}: MobileHeroRotatingLineProps) {
  const [index, setIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const advance = useCallback(() => {
    if (lines.length <= 1) return;
    setIsExiting(true);
  }, [lines.length]);

  useEffect(() => {
    if (lines.length <= 1 || isExiting) return;
    const hold = setTimeout(advance, HOLD_MS);
    return () => clearTimeout(hold);
  }, [index, isExiting, lines.length, advance]);

  useEffect(() => {
    if (!isExiting) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reducedMotion) return;
    const t = setTimeout(() => {
      setIndex((i) => (i + 1) % lines.length);
      setIsExiting(false);
    }, 280);
    return () => clearTimeout(t);
  }, [isExiting, lines.length]);

  const handleAnimationEnd = (e: React.AnimationEvent<HTMLSpanElement>) => {
    if (e.animationName !== "mobile-hero-line-out" || !isExiting) return;
    setIndex((i) => (i + 1) % lines.length);
    setIsExiting(false);
  };

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        "min-h-[2.85rem] sm:min-h-[3.25rem]",
        className,
      )}
      aria-live="polite"
    >
      <p className={cn(MOBILE_HERO_ROTATING_LINE_CLASS, lineClassName)}>
        {prefix ? (
          <span className={MOBILE_HERO_ROTATING_PREFIX_CLASS}>{prefix}</span>
        ) : null}
        <span
          key={index}
          onAnimationEnd={handleAnimationEnd}
          className={cn(
            MOBILE_HERO_ROTATING_ACCENT_CLASS,
            "inline-block",
            isExiting
              ? "animate-mobile-hero-line-out motion-reduce:opacity-0"
              : "animate-mobile-hero-line-in motion-reduce:opacity-100",
          )}
          style={isExiting ? { animationDuration: `${EXIT_MS}ms` } : undefined}
        >
          {lines[index]}
        </span>
      </p>
    </div>
  );
}
