"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export type FaqItem = { question: string; answer: string };

export function NewsletterFaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section className="mx-auto mt-16 max-w-[843px]" aria-labelledby="newsletter-faq-heading">
      <h2 id="newsletter-faq-heading" className="text-2xl font-bold text-[#181A1D] md:text-3xl">
        FAQs
      </h2>
      <ul className="mt-6 space-y-0" role="list">
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <li key={i} className="border-b border-[#E5E5E7]">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between gap-3 py-4 text-left"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${i}`}
                id={`faq-question-${i}`}
              >
                <h3 className="text-lg font-semibold text-[#181A1D]">{item.question}</h3>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-[#6E6E73] transition-transform ${isOpen ? "rotate-180" : ""}`}
                  aria-hidden
                />
              </button>
              <div
                id={`faq-answer-${i}`}
                role="region"
                aria-labelledby={`faq-question-${i}`}
                className="grid transition-[grid-template-rows] duration-200 ease-out"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p className="pb-4 text-[#6E6E73] leading-relaxed">{item.answer}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
