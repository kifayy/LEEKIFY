"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { BROWSE_DEV_PATH, BROWSE_PUBLIC_PATH } from "@/lib/browse-routes";
import { isLocalDevHost } from "@/lib/dev-mode";
import { cn } from "@/lib/utils";

const DEV_LINKS = [
  { href: BROWSE_PUBLIC_PATH, label: "Browse (live)" },
  { href: BROWSE_DEV_PATH, label: "Browse schools (new)" },
  { href: "/llms", label: "AI index" },
  { href: "/llms.txt", label: "llms.txt" },
] as const;

export function DevToolbar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(isLocalDevHost(window.location.hostname));
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-4 left-4 z-[9999] flex max-w-[min(100vw-2rem,20rem)] flex-col gap-2 rounded-xl border-2 border-amber-400 bg-[#0C1120]/95 p-3 text-xs text-white shadow-lg backdrop-blur-sm"
      aria-label="Local dev shortcuts"
    >
      <p className="font-bold uppercase tracking-wide text-amber-300">Dev only</p>
      <div className="flex flex-col gap-1">
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
