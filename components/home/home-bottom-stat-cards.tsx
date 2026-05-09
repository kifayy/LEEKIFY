import Link from "next/link";

import { COLLEGE_MATCH_QUIZ_URL } from "@/lib/constants";

/** Home page footer band: match quiz CTA */
export function HomeBottomStatCards() {
  return (
    <section
      className="w-full border-t border-slate-200/80 bg-white py-10 md:py-14 lg:py-16"
      aria-label="College match quiz"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-3 text-center sm:gap-4">
          <p className="font-[family-name:var(--font-poppins)] text-lg font-semibold text-[#181A1D] md:text-xl">
            Ready to see your matches?
          </p>
          <p className="text-sm leading-relaxed text-[#3F3F46] md:text-base">
            Take the college match quiz and get your personalized fit scores in minutes.
          </p>
          <Link
            href={COLLEGE_MATCH_QUIZ_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex h-12 min-w-[200px] items-center justify-center gap-2 rounded-full border-2 border-[#7C3AED] bg-[#956EFE] px-8 text-base font-semibold text-white shadow-[0_4px_20px_rgba(149,110,254,0.35)] transition hover:opacity-95 active:opacity-90"
          >
            <span className="text-lg leading-none" aria-hidden>
              🎯
            </span>
            College Match Quiz
          </Link>
        </div>
      </div>
    </section>
  );
}
