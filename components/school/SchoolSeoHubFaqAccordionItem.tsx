"use client";

import { BarChart3, CalendarDays, ChevronDown, FileText, Sparkles, Target, Users, Wallet } from "lucide-react";
import { useState } from "react";

import type { SchoolSeoFaqItem } from "@/lib/school-seo-hub-faq";

const FAQ_ICONS = [Target, Wallet, Sparkles, BarChart3, FileText, CalendarDays, Users] as const;

export function SchoolSeoHubFaqAccordionItem({
  item,
  iconIndex,
  defaultOpen,
  className,
}: {
  item: SchoolSeoFaqItem;
  iconIndex: number;
  defaultOpen: boolean;
  className: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const Icon = FAQ_ICONS[iconIndex % FAQ_ICONS.length]!;

  return (
    <details
      className={className}
      open={open}
      onToggle={(e) => setOpen(e.currentTarget.open)}
    >
      <summary className="flex cursor-pointer list-none items-center gap-3 px-3 py-3 sm:gap-3.5 sm:px-4 sm:py-3.5 [&::-webkit-details-marker]:hidden">
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-700 transition-colors group-open:bg-violet-200/80 group-open:text-violet-800"
          aria-hidden
        >
          <Icon className="h-4 w-4" strokeWidth={2} />
        </span>
        <span className="min-w-0 flex-1 text-left text-xs font-semibold leading-snug text-gray-900 sm:text-sm">
          {item.question}
        </span>
        <ChevronDown
          className="h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 group-open:rotate-180 group-open:text-violet-600"
          aria-hidden
        />
      </summary>
      <div className="border-t border-gray-100/90 bg-gray-50/40 px-3 pb-3 pt-1 sm:px-4 sm:pb-4">
        <p className="text-[11px] leading-relaxed text-gray-600 sm:pl-12 sm:text-xs sm:text-gray-700">
          {item.answer}
        </p>
      </div>
    </details>
  );
}
