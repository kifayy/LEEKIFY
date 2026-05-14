import type { ReactNode } from "react";
import Link from "next/link";

const FAQ_ITEMS: { question: string; answer: ReactNode }[] = [
  {
    question: "How does the analysis work?",
    answer:
      "We use your quiz answers and student profile to match you across 106+ datapoints and 2,000+ schools, and find you the colleges where you fit best—not generic, one-size-fits-all rankings.",
  },
  {
    question: "What's the 30-day money-back guarantee?",
    answer:
      "If you're not satisfied with your report, contact us within 30 days of purchase and we'll refund you—no hassle. We want you to try PathPicker risk-free.",
  },
  {
    question: "Is my information secure?",
    answer: (
      <>
        We follow industry-standard practices to protect your data, use encryption in transit, and do not sell your
        personal information. Details are in our{" "}
        <Link href="https://pathpicker.com/privacy" className="font-semibold text-[#956EFE] underline underline-offset-2 hover:text-[#7c4fe0]">
          Privacy Policy
        </Link>
        .
      </>
    ),
  },
];

export function HomePageFaqs() {
  return (
    <section className="w-full scroll-mt-28 bg-white px-4 py-12 md:px-6 md:py-16" aria-labelledby="home-faq-heading">
      <div className="container mx-auto max-w-2xl">
        <h2 id="home-faq-heading" className="text-center text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">
          FAQ
        </h2>
        <div className="mt-8 space-y-3 md:mt-10">
          {FAQ_ITEMS.map(({ question, answer }) => (
            <details
              key={question}
              className="group rounded-2xl border border-slate-200/90 bg-slate-50/50 px-4 py-1 shadow-sm open:bg-white open:shadow-[0_4px_24px_rgba(0,0,0,0.06)] md:px-5"
            >
              <summary className="cursor-pointer list-none py-3 text-left text-[15px] font-semibold text-neutral-900 marker:content-none md:text-base [&::-webkit-details-marker]:hidden">
                <span className="flex w-full items-center justify-between gap-3">
                  <span>{question}</span>
                  <span className="shrink-0 text-neutral-400 transition group-open:rotate-180" aria-hidden>
                    ▼
                  </span>
                </span>
              </summary>
              <div className="border-t border-slate-100 pb-4 pt-1 text-left text-[14px] leading-relaxed text-[#4B5563] md:text-[15px]">
                {answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
