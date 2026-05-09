import Link from "next/link";
import {
  BarChart3,
  CalendarDays,
  ChevronDown,
  FileText,
  MessageCircleQuestion,
  Sparkles,
  Target,
  Users,
  Wallet,
} from "lucide-react";

import type { CollegeDetail } from "@/types/college-detail";
import type { SchoolSeoFaqItem } from "@/lib/school-seo-hub-faq";
import { buildSchoolSeoHubFaq } from "@/lib/school-seo-hub-faq";

const FAQ_ICONS = [Target, Wallet, Sparkles, BarChart3, FileText, CalendarDays, Users] as const;

/** Crawlable SEO hub: common questions mirroring student search intents (see docs/SCHOOL_PAGE_SEO_HUB_SPEC.md). */
export function SchoolSeoHubSection({
  college,
  items,
}: {
  college: CollegeDetail;
  /** When omitted, builds via `buildSchoolSeoHubFaq` (prefer passing from the page to match JSON-LD). */
  items?: SchoolSeoFaqItem[];
}) {
  const faqItems = items ?? buildSchoolSeoHubFaq(college);
  const name = college.name?.trim() || "This school";

  return (
    <section
      id="seo-hub"
      className="scroll-mt-24 overflow-hidden rounded-2xl border border-violet-100/80 bg-gradient-to-br from-violet-50/40 via-white to-indigo-50/30 shadow-[0_1px_3px_rgba(0,0,0,0.06)] ring-1 ring-violet-200/25"
      aria-labelledby="seo-hub-heading"
    >
      <div className="border-b border-violet-100/60 bg-white/50 px-4 py-4 backdrop-blur-[2px] sm:px-6 sm:py-5">
        <div className="flex items-start gap-3">
          <div
            className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-white shadow-sm shadow-violet-600/25"
            aria-hidden
          >
            <MessageCircleQuestion className="h-5 w-5" strokeWidth={2} />
          </div>
          <div className="min-w-0 flex-1">
            <h2 id="seo-hub-heading" className="text-sm font-semibold tracking-tight text-gray-900 sm:text-base">
              Common questions about {name}
            </h2>
            <p className="mt-1.5 max-w-3xl text-xs leading-relaxed text-gray-600 sm:text-[13px]">
              Quick answers for searches like admission chances, cost, campus life, and decisions—explore more on
              PathPicker or{" "}
              <Link
                href="/browse-schools"
                className="font-medium text-violet-700 underline-offset-2 hover:text-violet-900 hover:underline"
              >
                browse similar schools
              </Link>
              .
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2 p-3 sm:p-4">
        {faqItems.map((item, i) => {
          const Icon = FAQ_ICONS[i % FAQ_ICONS.length];
          return (
            <details
              key={i}
              className="group rounded-xl border border-gray-200/90 bg-white/90 shadow-sm transition-[box-shadow,border-color] open:border-violet-200/70 open:shadow-md open:shadow-violet-500/5 hover:border-violet-200/50"
              defaultOpen={i === 0}
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
        })}
      </div>
    </section>
  );
}
