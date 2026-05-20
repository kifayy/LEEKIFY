"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { STUDENTS_LOVE_HEADLINE_TYPEWRITER_WORDS } from "@/lib/students-love-headline-typewriter-words";

const TYPE_DELAY_MS = 90;
const HOLD_DELAY_MS = 1800;
const DELETE_DELAY_MS = 55;

export function StudentsLoveHeadlineTypewriter({ className }: { className?: string }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const word = STUDENTS_LOVE_HEADLINE_TYPEWRITER_WORDS[wordIndex];
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
          setWordIndex((i) => (i + 1) % STUDENTS_LOVE_HEADLINE_TYPEWRITER_WORDS.length);
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
        className,
      )}
    >
      {displayedText || "\u00a0"}
    </span>
  );
}
