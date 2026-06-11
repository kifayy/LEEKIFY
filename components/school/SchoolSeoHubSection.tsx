import Link from "next/link";
import { MessageCircleQuestion } from "lucide-react";

import { SchoolSeoHubFaqAccordionItem } from "@/components/school/SchoolSeoHubFaqAccordionItem";
import type { CollegeDetail } from "@/types/college-detail";
import type { SchoolSeoFaqItem } from "@/lib/school-seo-hub-faq";
import { buildSchoolSeoHubFaq } from "@/lib/school-seo-hub-faq";

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
                href="/browse"
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
          return (
            <SchoolSeoHubFaqAccordionItem
              key={i}
              item={item}
              iconIndex={i}
              defaultOpen={i === 0}
              className="group rounded-xl border border-gray-200/90 bg-white/90 shadow-sm transition-[box-shadow,border-color] open:border-violet-200/70 open:shadow-md open:shadow-violet-500/5 hover:border-violet-200/50"
            />
          );
        })}
      </div>
    </section>
  );
}
