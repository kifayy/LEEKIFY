import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const FAQ_ITEMS: { question: string; answer: ReactNode }[] = [
  {
    question: "How does PathPicker's college match work?",
    answer:
      "You take a short quiz about your personality, goals, and academics. PathPicker compares your answers across 100+ datapoints and 2,000+ schools to surface colleges where you fit best, with context on admission odds and student-life signals, not a generic ranking list.",
  },
  {
    question: "Does PathPicker show admission odds?",
    answer:
      "Yes. Your results include admission chances alongside fit and happiness-style indicators, so you can balance where you can get in with where you are most likely to enjoy campus life.",
  },
  {
    question: "Can PathPicker help me know if I'll be happy at a school?",
    answer:
      "PathPicker weighs personality, social fit, pressure, and momentum-style signals, not grades alone. That helps you spot schools that match how you learn and live, and flag mismatches before you commit.",
  },
  {
    question: "What's the 30-day money-back guarantee?",
    answer:
      "If you're not satisfied with your report, contact us within 30 days of purchase and we'll refund you with no hassle. We want you to try PathPicker risk-free.",
  },
  {
    question: "Is my information secure?",
    answer: (
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
  },
];

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
    >
      <div className="container mx-auto max-w-3xl">
        <header className="text-center">
          <h2
            id="home-faq-heading"
            className="font-[family-name:var(--font-poppins)] text-[1.65rem] font-bold leading-[1.12] tracking-[-0.03em] text-[#181A1D] sm:text-3xl md:text-[2rem]"
          >
            College match FAQ
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[14px] leading-relaxed text-slate-600 sm:text-[15px] sm:leading-[1.65]">
            Answers about fit, admission odds, and finding the right school for your personality, not just your
            transcript.
          </p>
        </header>

        <div className="mt-9 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_48px_-12px_rgba(149,110,254,0.12)] md:mt-11 md:rounded-[1.35rem]">
          {FAQ_ITEMS.map(({ question, answer }) => (
            <details
              key={question}
              className="group border-b border-slate-100/90 transition-[background-color,box-shadow] duration-200 last:border-b-0 open:bg-white open:shadow-[inset_3px_0_0_0_#956EFE]"
            >
              <summary className="cursor-pointer list-none px-5 py-4 outline-none marker:content-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#956EFE]/35 md:px-7 md:py-[1.125rem] [&::-webkit-details-marker]:hidden">
                <span className="flex items-center gap-3 md:gap-4">
                  <span className="min-w-0 flex-1 text-left text-[15px] font-medium leading-snug tracking-[-0.01em] text-[#181A1D] transition-colors group-open:text-[#141416] md:text-base">
                    {question}
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
              <FaqAnswer>{answer}</FaqAnswer>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
