"use client";

import { useCallback, useEffect, useState } from "react";

import { MOBILE_HERO_ROTATING_LINE_CLASS } from "@/components/home/mobile-hero-typography";
import { cn } from "@/lib/utils";

const HOLD_MS = 2600;
const EXIT_MS = 420;

type MobileHeroRotatingLineProps = {
  lines: readonly string[];
  className?: string;
};

/**
 * Second headline line — fades out upward, next phrase rises in from below.
 */
export function MobileHeroRotatingLine({ lines, className }: MobileHeroRotatingLineProps) {
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

  const handleAnimationEnd = (e: React.AnimationEvent<HTMLParagraphElement>) => {
    if (e.animationName !== "mobile-hero-line-out" || !isExiting) return;
    setIndex((i) => (i + 1) % lines.length);
    setIsExiting(false);
  };

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        "min-h-[3.2rem] sm:min-h-[3.65rem]",
        className,
      )}
      aria-live="polite"
    >
      <p
        key={index}
        onAnimationEnd={handleAnimationEnd}
        className={cn(
          MOBILE_HERO_ROTATING_LINE_CLASS,
          isExiting
            ? "animate-mobile-hero-line-out motion-reduce:opacity-0"
            : "animate-mobile-hero-line-in motion-reduce:opacity-100",
        )}
        style={isExiting ? { animationDuration: `${EXIT_MS}ms` } : undefined}
      >
        {lines[index]}
      </p>
    </div>
  );
}
