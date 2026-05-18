"use client";

import { useEffect, useState } from "react";
import { HERO_PURPLE } from "@/components/home/hero-audience-theme";
import {
  HERO_PATH_TYPEWRITER_SPACER,
  HERO_PATH_TYPEWRITER_WORDS,
} from "@/lib/hero-path-typewriter-words";

const TYPE_DELAY_MS = 90;
const HOLD_DELAY_MS = 1800;
const DELETE_DELAY_MS = 55;

export function DesktopHeroPathTypewriter() {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const word = HERO_PATH_TYPEWRITER_WORDS[wordIndex];
  const displayedText = word.slice(0, charIndex);

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
      isDeleting ? DELETE_DELAY_MS : charIndex === word.length ? HOLD_DELAY_MS : TYPE_DELAY_MS
    );
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, word]);

  return (
    <span className="relative inline-block" style={{ color: HERO_PURPLE }}>
      <span className="invisible" aria-hidden>
        {HERO_PATH_TYPEWRITER_SPACER}
      </span>
      <span className="absolute left-0 top-0 whitespace-nowrap">{displayedText}</span>
    </span>
  );
}
