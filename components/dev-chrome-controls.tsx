"use client";

import { usePathname } from "next/navigation";
import { ChevronDown, ChevronUp, Eye, EyeOff } from "lucide-react";

import { useDevChromePreference } from "@/hooks/use-dev-chrome-preference";
import { BROWSE_DEV_PATH } from "@/lib/browse-routes";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** Compact icon-only buttons for tight spaces. */
  compact?: boolean;
  /** Slim bar already minimized — show expand instead of minimize. */
  minimized?: boolean;
};

export function DevChromeControls({ className, compact, minimized }: Props) {
  const { minimize, hide, expand } = useDevChromePreference();

  if (compact) {
    return (
      <div className={cn("flex items-center gap-0.5", className)}>
        {minimized ? (
          <button
            type="button"
            onClick={expand}
            className="rounded-md p-1 text-amber-700/80 transition hover:bg-amber-100 hover:text-amber-900"
            aria-label="Expand dev tools"
            title="Expand"
          >
            <ChevronUp className="h-3.5 w-3.5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={minimize}
            className="rounded-md p-1 text-amber-700/80 transition hover:bg-amber-100 hover:text-amber-900"
            aria-label="Minimize dev tools"
            title="Minimize"
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        )}
        <button
          type="button"
          onClick={hide}
          className="rounded-md p-1 text-amber-700/80 transition hover:bg-amber-100 hover:text-amber-900"
          aria-label="Hide dev tools"
          title="Hide"
        >
          <EyeOff className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {minimized ? (
        <button
          type="button"
          onClick={expand}
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[0.6875rem] font-medium text-amber-800/90 transition hover:bg-amber-100"
        >
          <ChevronUp className="h-3 w-3" />
          Expand
        </button>
      ) : (
        <button
          type="button"
          onClick={minimize}
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[0.6875rem] font-medium text-amber-800/90 transition hover:bg-amber-100"
        >
          <ChevronDown className="h-3 w-3" />
          Minimize
        </button>
      )}
      <button
        type="button"
        onClick={hide}
        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[0.6875rem] font-medium text-amber-800/90 transition hover:bg-amber-100"
      >
        <EyeOff className="h-3 w-3" />
        Hide
      </button>
    </div>
  );
}

/** Tiny affordance to bring dev chrome back after fully hidden. */
export function DevChromeRestoreFab() {
  const pathname = usePathname();
  const { expand, isHidden, isMinimized } = useDevChromePreference();

  if (!isHidden && !(isMinimized && pathname !== BROWSE_DEV_PATH)) return null;

  return (
    <button
      type="button"
      onClick={expand}
      className={cn(
        "fixed right-4 top-[8.75rem] z-[9998] shadow-lg transition hover:scale-105 md:top-48 lg:top-4",
        isHidden
          ? "flex h-8 w-8 items-center justify-center rounded-full border border-amber-400/60 bg-[#0C1120]/90 text-amber-300 backdrop-blur-sm hover:border-amber-300"
          : "rounded-full border border-amber-400 bg-amber-400 px-3 py-1.5 text-[0.6875rem] font-bold uppercase tracking-wide text-[#0C1120] hover:bg-amber-300",
      )}
      aria-label="Show dev tools"
      title="Show dev tools"
    >
      {isHidden ? <Eye className="h-3.5 w-3.5" /> : "Dev"}
    </button>
  );
}
