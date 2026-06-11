"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const HATCH_LOTTIE_SRC = "/animations/hatch.lottie";
const ENTER_MS = 420;
const HATCH_MS = 2800;
const EXIT_MS = 380;

type Props = {
  active: boolean;
  onFinished: () => void;
};

export function BrowseHatchOverlay({ active, onFinished }: Props) {
  const [mounted, setMounted] = useState(false);
  const [presented, setPresented] = useState(false);
  const [exiting, setExiting] = useState(false);
  const finishedRef = useRef(onFinished);
  finishedRef.current = onFinished;

  useEffect(() => {
    if (!active) {
      setMounted(false);
      setPresented(false);
      setExiting(false);
      return;
    }

    setMounted(true);
    setPresented(false);
    setExiting(false);

    const enterTimer = window.setTimeout(() => setPresented(true), 32);
    const exitTimer = window.setTimeout(() => setExiting(true), ENTER_MS + HATCH_MS);
    const finishTimer = window.setTimeout(() => {
      setMounted(false);
      setPresented(false);
      setExiting(false);
      finishedRef.current();
    }, ENTER_MS + HATCH_MS + EXIT_MS);

    return () => {
      window.clearTimeout(enterTimer);
      window.clearTimeout(exitTimer);
      window.clearTimeout(finishTimer);
    };
  }, [active]);

  if (!mounted) return null;

  const showContent = presented && !exiting;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[200] flex flex-col items-center justify-center lg:hidden",
        "backdrop-blur-xl transition-all duration-300",
        exiting ? "bg-white/0 opacity-0" : "bg-white/55 opacity-100",
      )}
      aria-live="polite"
      aria-busy={!exiting}
    >
      <div
        className={cn(
          "flex flex-col items-center px-8 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          showContent ? "scale-100 opacity-100" : "scale-[0.92] opacity-0",
          exiting && "duration-[380ms] ease-in",
        )}
      >
        <div className="h-[min(78vw,22rem)] w-[min(78vw,22rem)]">
          {presented ? (
            <DotLottieReact src={HATCH_LOTTIE_SRC} autoplay loop={false} className="h-full w-full" />
          ) : null}
        </div>
      </div>
    </div>
  );
}
