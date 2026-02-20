"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Scholarship } from "@/lib/supabase/queries/scholarships";

function formatAmount(amount: string | null): string | null {
  if (!amount) return null;
  const cleaned = amount.replace(/[^0-9.]/g, "");
  if (!cleaned) return amount;
  const num = parseFloat(cleaned);
  if (isNaN(num)) return amount;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(num);
}

export type ScholarshipCardProps = {
  scholarship: Scholarship;
  /** Optional description snippet (e.g. ai_description from article context). Unused in current layout. */
  descriptionSnippet?: string | null;
};

export function ScholarshipCard({ scholarship: s }: ScholarshipCardProps) {
  const amountFormatted = formatAmount(s.amount);

  return (
    <Link
      href={`/scholarships/award/${s.slug}`}
      className="block rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg xl:rounded-2xl xl:shadow-lg"
    >
      <div className="flex min-h-0 flex-1 flex-col rounded-b-xl rounded-t-xl bg-white p-4 xl:p-6">
        {/* Amount, then tags underneath */}
        <div className="flex flex-col gap-1.5 xl:gap-2">
          <p className="shrink-0 text-xl font-bold text-[#181A1D] md:text-2xl xl:text-3xl">
            {amountFormatted ?? "—"}
          </p>
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            {s.highlight_1 && (
              <span className="whitespace-nowrap rounded-full bg-[#EEEEEE] px-3 py-1.5 text-xs font-medium text-[#0C1120]/90 xl:px-4 xl:py-2 xl:text-sm">
                {s.highlight_1}
              </span>
            )}
            {s.highlight_2 && (
              <span className="whitespace-nowrap rounded-full bg-[#EEEEEE] px-3 py-1.5 text-xs font-medium text-[#0C1120]/90 xl:px-4 xl:py-2 xl:text-sm">
                {s.highlight_2}
              </span>
            )}
          </div>
        </div>

        <h3 className="mt-1.5 text-base font-bold text-[#181A1D] md:text-lg xl:mt-3 xl:text-xl line-clamp-2">
          {s.title}
        </h3>
        <p className="mt-2 text-sm font-normal leading-snug text-[#0C1120]/60 xl:mt-3 xl:text-base">
          {s.provider}
        </p>
        {s.description_short?.trim() && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#0C1120]/70 xl:mt-3 xl:text-base">
            {s.description_short.trim()}…
          </p>
        )}

        <div className="mt-auto flex pt-4 justify-end xl:pt-6">
          <span className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-[#956EFE] px-5 py-2.5 text-sm font-medium text-[#EEE] shadow-[0_2px_5px_rgba(149,110,254,0.2)] transition-opacity hover:opacity-95 md:h-11 md:px-6 md:py-3 md:text-base xl:h-12 xl:px-8 xl:py-4 xl:text-lg">
            Quick Enter
            <ArrowRight className="h-5 w-5 shrink-0" strokeWidth={2.5} aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  );
}
