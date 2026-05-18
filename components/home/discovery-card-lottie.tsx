"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { cn } from "@/lib/utils";

type DiscoveryCardLottieProps = {
  src: string;
  className?: string;
  /** Fits inside small step tiles (~4.5–5rem); default is full discovery card height. */
  compact?: boolean;
};

export function DiscoveryCardLottie({ src, className, compact }: DiscoveryCardLottieProps) {
  return (
    <div
      className={cn(
        compact
          ? "flex h-full w-full min-h-0 items-center justify-center overflow-hidden"
          : "flex min-h-[150px] w-full items-center justify-center overflow-hidden rounded-2xl sm:min-h-[170px]",
        className
      )}
      aria-hidden
    >
      <DotLottieReact
        src={src}
        loop
        autoplay
        className={cn(
          compact
            ? "h-[3.75rem] w-[3.75rem] shrink-0 sm:h-[4.25rem] sm:w-[4.25rem] [&_canvas]:!h-full [&_canvas]:!w-full [&_canvas]:object-contain"
            : "h-full w-full max-h-[190px] max-w-[320px]"
        )}
      />
    </div>
  );
}
