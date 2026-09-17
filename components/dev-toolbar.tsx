"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Eye, EyeOff } from "lucide-react";

import { useDevChromePreference } from "@/hooks/use-dev-chrome-preference";
import { isLocalDevHost } from "@/lib/dev-mode";
import { cn } from "@/lib/utils";

const DEV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
] as const;

const PANEL_CLASS =
  "fixed right-4 top-[8.75rem] z-[9999] flex w-[min(100vw-2rem,18rem)] flex-col gap-2 rounded-xl border-2 border-amber-400 bg-[#0C1120]/95 p-3 text-xs text-white shadow-lg backdrop-blur-sm md:top-48 lg:top-4";

const FAB_CLASS =
  "fixed right-4 top-[8.75rem] z-[9998] shadow-lg transition hover:scale-105 md:top-48 lg:top-4";

export function DevToolbar() {
  const pathname = usePathname();
  const [onLocalhost, setOnLocalhost] = useState(false);
  const { isExpanded, isMinimized, isHidden, expand, minimize, hide } = useDevChromePreference();

  useEffect(() => {
    setOnLocalhost(isLocalDevHost(window.location.hostname));
  }, []);

  if (!onLocalhost) return null;

  if (isHidden) {
    return (
      <button
        type="button"
        onClick={expand}
        className={cn(
          FAB_CLASS,
          "flex h-8 w-8 items-center justify-center rounded-full border border-amber-400/60 bg-[#0C1120]/90 text-amber-300 backdrop-blur-sm hover:border-amber-300",
        )}
        aria-label="Show dev tools"
        title="Show dev tools"
      >
        <Eye className="h-3.5 w-3.5" />
      </button>
    );
  }

  if (isMinimized) {
    return (
      <button
        type="button"
        onClick={expand}
        className={cn(
          FAB_CLASS,
          "rounded-full border border-amber-400 bg-amber-400 px-3 py-1.5 text-[0.6875rem] font-bold uppercase tracking-wide text-[#0C1120] hover:bg-amber-300",
        )}
        aria-label="Expand dev tools"
        title="Expand dev tools"
      >
        Dev
      </button>
    );
  }

  return (
    <div className={PANEL_CLASS} aria-label="Local dev shortcuts">
      <div className="flex items-start justify-between gap-2">
        <p className="font-bold uppercase tracking-wide text-amber-300">Dev only</p>
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={minimize}
            className="rounded-md p-1 text-amber-200 transition hover:bg-white/10"
            aria-label="Minimize dev tools"
            title="Minimize"
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={hide}
            className="rounded-md p-1 text-amber-200 transition hover:bg-white/10"
            aria-label="Hide dev tools"
            title="Hide"
          >
            <EyeOff className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-[0.625rem] font-semibold uppercase tracking-wide text-amber-200/80">Shortcuts</p>
        {DEV_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "rounded-md px-2 py-1.5 transition hover:bg-white/10",
              pathname === href && "bg-[#956EFE]/40 font-semibold",
            )}
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
