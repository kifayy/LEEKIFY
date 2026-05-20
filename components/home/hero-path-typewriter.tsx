"use client";

import { useEffect, useLayoutEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { HERO_PATH_TYPEWRITER_WORDS } from "@/lib/hero-path-typewriter-words";

const TYPE_DELAY_MS = 90;
const HOLD_DELAY_MS = 1800;
const DELETE_DELAY_MS = 55;

const HS_BADGE_CLASS =
  "rounded-lg bg-[#956EFE] px-2 py-0.5 text-white shadow-[0_2px_10px_rgba(149,110,254,0.35)]";

const CAREER_BADGE_CLASS =
  "rounded-lg bg-teal-600 px-2 py-0.5 text-white shadow-[0_2px_10px_rgba(4,47,46,0.35)]";

export function HeroPathTypewriter({
  career = false,
  className,
}: {
  career?: boolean;
  className?: string;
}) {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const word = HERO_PATH_TYPEWRITER_WORDS[wordIndex];
  const displayedText = word.slice(0, charIndex);

  useLayoutEffect(() => {
    setWordIndex(0);
    setCharIndex(0);
    setIsDeleting(false);
  }, [career]);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (charIndex < word.length) {
            setCharIndex((c) => c + 1);
          } else {
            setIsDeleting(true);
          }
        } else if (charIndex > 0) {
          setCharIndex((c) => c - 1);
        } else {
          setIsDeleting(false);
          setWordIndex((i) => (i + 1) % HERO_PATH_TYPEWRITER_WORDS.length);
        }
      },
      isDeleting ? DELETE_DELAY_MS : charIndex === word.length ? HOLD_DELAY_MS : TYPE_DELAY_MS,
    );
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, word]);

  return (
    <span
      className={cn(
        "inline-block w-fit whitespace-nowrap align-baseline",
        career ? CAREER_BADGE_CLASS : HS_BADGE_CLASS,
        className,
      )}
    >
      {displayedText || "\u00a0"}
    </span>
  );
}
