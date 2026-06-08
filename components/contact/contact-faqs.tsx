import { ChevronDown } from "lucide-react";

import { ContactFaqAnswer } from "@/components/contact/contact-faq-answer";
import { CONTACT_FAQ_SECTIONS } from "@/lib/contact-faq-content";

export function ContactFaqs() {
  return (
    <section className="mt-14 md:mt-16" aria-labelledby="contact-faq-heading">
      <header className="text-center">
        <h2 id="contact-faq-heading" className="text-2xl font-bold tracking-tight text-[#181A1D] md:text-3xl">
          Frequently asked questions
        </h2>
        <p className="mt-3 text-base text-[#6B7280]">Quick answers before you reach out.</p>
      </header>

      <div className="mt-8 space-y-8">
        {CONTACT_FAQ_SECTIONS.map((section) => (
          <div key={section.title ?? "general"}>
            {section.title ? (
              <h3 className="mb-4 text-left text-base font-semibold text-[#181A1D] md:text-lg">
                {section.title}
              </h3>
            ) : null}

            <div className="overflow-hidden rounded-2xl border border-[#E8E8EC] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              {section.items.map((item) => (
                <details
                  key={item.question}
                  className="group border-b border-[#F0F0F2] last:border-b-0 open:shadow-[inset_3px_0_0_0_#956EFE]"
                >
                  <summary className="cursor-pointer list-none px-5 py-4 outline-none marker:content-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#956EFE]/35 md:px-7 md:py-5 [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center gap-3">
                      <span className="min-w-0 flex-1 text-left text-[15px] font-medium leading-snug text-[#181A1D] md:text-base">
                        {item.question}
                      </span>
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#E8E8EC] bg-[#FAFAFC] text-[#6B7280] transition-colors group-open:border-[#956EFE]/25 group-open:bg-[#956EFE]/10 group-open:text-[#956EFE]"
                        aria-hidden
                      >
                        <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" strokeWidth={2.5} />
                      </span>
                    </span>
                  </summary>
                  <div className="border-t border-[#F0F0F2] bg-white px-5 pb-5 pt-4 md:px-7 md:pb-6">
                    <ContactFaqAnswer text={item.answer} />
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
