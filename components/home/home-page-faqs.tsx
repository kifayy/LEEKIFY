import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import {
  DESKTOP_SECTION_HEADING_CLASS,
  DESKTOP_SECTION_SUBTEXT_CLASS,
} from "@/components/home/desktop-section-typography";
import { StudentArchetypeTestCta } from "@/components/home/student-archetype-test-cta";
import { HOME_FAQ_ITEMS } from "@/lib/home-faq-content";

const FAQ_ANSWERS: Record<(typeof HOME_FAQ_ITEMS)[number]["question"], ReactNode> = {
  "How does PathPicker's college match work?": HOME_FAQ_ITEMS[0].answer,
  "Does PathPicker show admission odds?": HOME_FAQ_ITEMS[1].answer,
  "Can PathPicker help me know if I'll be happy at a school?": HOME_FAQ_ITEMS[2].answer,
  "What's the 30-day money-back guarantee?": HOME_FAQ_ITEMS[3].answer,
  "Is my information secure?": (
    <>
      We follow industry-standard practices to protect your data, use encryption in transit, and do not sell your
      personal information. Details are in our{" "}
      <Link
        href="https://pathpicker.com/privacy"
        className="font-medium text-[#956EFE] underline decoration-[#956EFE]/35 underline-offset-[3px] transition-colors hover:text-[#7C3AED] hover:decoration-[#7C3AED]/50"
      >
        Privacy Policy
      </Link>
      .
    </>
  ),
};

function FaqAnswer({ children }: { children: ReactNode }) {
  return (
    <div className="border-t border-slate-100/80 bg-white px-5 pb-5 pt-4 md:px-7 md:pb-6 md:pt-4">
      <div className="max-w-[58ch] text-[14px] leading-[1.72] text-slate-600 md:text-[15px] md:leading-[1.75]">
        {children}
      </div>
    </div>
  );
}

export function HomePageFaqs() {
  return (
    <section
      className="w-full scroll-mt-28 bg-white px-4 py-14 md:px-6 md:py-20"
      aria-labelledby="home-faq-heading"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <div className="container mx-auto max-w-3xl">
        <header className="text-center">
          <h2 id="home-faq-heading" className={DESKTOP_SECTION_HEADING_CLASS}>
            PathPicker FAQ
          </h2>
          <p className={`mx-auto mt-5 max-w-xl ${DESKTOP_SECTION_SUBTEXT_CLASS}`}>
            Clear answers on your archetype, career fit, and planning your next step—beyond grades and rankings
            alone.
          </p>
        </header>

        <div className="mt-9 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_48px_-12px_rgba(149,110,254,0.12)] md:mt-11 md:rounded-[1.35rem]">
          {HOME_FAQ_ITEMS.map((item) => (
            <details
              key={item.question}
              className="group border-b border-slate-100/90 transition-[background-color,box-shadow] duration-200 last:border-b-0 open:bg-white open:shadow-[inset_3px_0_0_0_#956EFE]"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <summary className="cursor-pointer list-none px-5 py-4 outline-none marker:content-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#956EFE]/35 md:px-7 md:py-[1.125rem] [&::-webkit-details-marker]:hidden">
                <span className="flex items-center gap-3 md:gap-4">
                  <span
                    className="min-w-0 flex-1 text-left text-[15px] font-medium leading-snug tracking-[-0.01em] text-[#181A1D] transition-colors group-open:text-[#141416] md:text-base"
                    itemProp="name"
                  >
                    {item.question}
                  </span>
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200/80 bg-slate-50/90 text-slate-500 transition-all duration-200 group-open:border-[#956EFE]/25 group-open:bg-[#956EFE]/10 group-open:text-[#956EFE] md:h-9 md:w-9"
                    aria-hidden
                  >
                    <ChevronDown
                      className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180"
                      strokeWidth={2.25}
                    />
                  </span>
                </span>
              </summary>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <meta itemProp="text" content={item.answer} />
                <FaqAnswer>{FAQ_ANSWERS[item.question]}</FaqAnswer>
              </div>
            </details>
          ))}
        </div>

        <StudentArchetypeTestCta desktopOnly wrapperClassName="mt-10 md:mt-12" />
      </div>
    </section>
  );
}
