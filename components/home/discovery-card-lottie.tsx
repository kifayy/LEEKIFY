"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { cn } from "@/lib/utils";

type DiscoveryCardLottieProps = {
  src: string;
  className?: string;
};

export function DiscoveryCardLottie({ src, className }: DiscoveryCardLottieProps) {
  return (
    <div
      className={cn(
        "flex min-h-[200px] w-full items-center justify-center overflow-hidden rounded-2xl sm:min-h-[220px]",
        className
      )}
      aria-hidden
    >
      <DotLottieReact
        src={src}
        loop
        autoplay
        className="h-full max-h-[240px] w-full max-w-[420px]"
      />
    </div>
  );
}
