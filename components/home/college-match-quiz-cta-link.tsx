import Link from "next/link";

import { COLLEGE_MATCH_QUIZ_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

type CollegeMatchQuizCtaLinkProps = {
  className?: string;
  children?: React.ReactNode;
  tabIndex?: number;
};

/** Site-wide primary CTA → college match quiz (external). */
export function CollegeMatchQuizCtaLink({
  className,
  children = "College Match Quiz",
  tabIndex,
}: CollegeMatchQuizCtaLinkProps) {
  return (
    <Link
      href={COLLEGE_MATCH_QUIZ_URL}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={tabIndex}
      className={cn(
        "inline-flex h-12 min-w-[200px] items-center justify-center gap-2 rounded-full border-2 border-[#7C3AED] bg-[#956EFE] px-8 text-base font-semibold text-white shadow-[0_4px_20px_rgba(149,110,254,0.35)] transition hover:opacity-95 active:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600",
        className,
      )}
    >
      <span className="text-lg leading-none" aria-hidden>
        🎯
      </span>
      {children}
    </Link>
  );
}
