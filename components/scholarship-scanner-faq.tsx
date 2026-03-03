"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "Is it really free?",
    answer:
      "Yes. Awarded is free for students. No sign-up fees, no app purchase. You just text the number to opt in and get matched scholarships sent to your phone.",
  },
  {
    question: "Do I need to download an app?",
    answer:
      "Nope. Everything happens over text. You get scholarship matches and can reply with EDIT anytime to update your profile—all in your messaging app.",
  },
  {
    question: "How often will I get texts?",
    answer:
      "We text you tailored matches about twice a week so you’re not overwhelmed. You’ll only see opportunities that fit your profile.",
  },
  {
    question: "Can I change what kinds of scholarships I get?",
    answer:
      "Yes. Just reply EDIT to any message and you can update your interests, grade level, or other details. Our algorithm will then match you to new opportunities based on your updated profile.",
  },
];

export function ScholarshipScannerFaq() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section
      className="w-full min-w-0 overflow-x-hidden bg-white py-12 md:py-16"
      aria-labelledby="scholarship-scanner-faq-heading"
    >
      <div className="container mx-auto max-w-[843px] px-4 md:px-6">
        <h2
          id="scholarship-scanner-faq-heading"
          className="text-[1.95rem] font-bold text-[#181A1D] md:text-[2.44rem]"
        >
          FAQs
        </h2>
        <ul className="mt-6 space-y-0" role="list">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <li key={i} className="border-b border-[#E5E5E7]">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-3 py-4 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`scanner-faq-answer-${i}`}
                  id={`scanner-faq-question-${i}`}
                >
                  <h3 className="text-lg font-semibold text-[#181A1D]">{item.question}</h3>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-[#6E6E73] transition-transform ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden
                  />
                </button>
                <div
                  id={`scanner-faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`scanner-faq-question-${i}`}
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
      </div>
    </section>
  );
}
