"use client";

import { cn } from "@/lib/utils";

type Props = {
  text: string;
  className?: string;
};

/** Cross-fades when `text` changes — used for empty Baby Maker field previews. */
export function BrowseVibePreviewText({ text, className }: Props) {
  return (
    <span
      key={text}
      className={cn(className, "animate-mobile-hero-line-in motion-reduce:animate-none")}
    >
      {text}
    </span>
  );
}
