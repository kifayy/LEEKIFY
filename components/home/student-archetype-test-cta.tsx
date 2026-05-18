import Link from "next/link";

import { HERO_PURPLE, HERO_PURPLE_RGB } from "@/components/home/hero-audience-theme";
import { COLLEGE_MATCH_QUIZ_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const STUDENT_ARCHETYPE_TEST_LABEL = "Student Archetype Test";

type StudentArchetypeTestCtaProps = {
  className?: string;
  wrapperClassName?: string;
  /** Only render from the `md` breakpoint up */
  desktopOnly?: boolean;
  align?: "center" | "left";
  size?: "hero" | "section";
};

export function StudentArchetypeTestCta({
  className,
  wrapperClassName,
  desktopOnly = false,
  align = "center",
  size = "section",
}: StudentArchetypeTestCtaProps) {
  return (
    <div
      className={cn(
        "w-full",
        desktopOnly ? "hidden md:flex" : "flex",
        align === "center" ? "justify-center" : "justify-start",
        wrapperClassName,
      )}
    >
      <Link
        href={COLLEGE_MATCH_QUIZ_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex items-center justify-center font-[family-name:var(--font-poppins)] font-semibold text-white transition hover:opacity-95 active:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600",
          size === "hero"
            ? "mt-5 h-12 min-w-[13.5rem] rounded-[2rem] px-7 text-[0.9375rem] md:mt-6 md:h-[3.25rem] md:min-w-[14.5rem] md:rounded-[2.25rem] md:px-8 lg:mt-10 lg:h-[4.75rem] lg:min-w-[15rem] lg:rounded-[2.5rem] lg:px-10 lg:text-lg"
            : "h-12 min-w-[13.5rem] rounded-[2rem] px-7 text-[0.9375rem] md:h-[3.25rem] md:min-w-[14.5rem] md:rounded-[2.25rem] md:px-8 md:text-base",
          className,
        )}
        style={{
          backgroundColor: HERO_PURPLE,
          boxShadow: `0 8px 28px rgba(${HERO_PURPLE_RGB}, 0.35)`,
        }}
      >
        {STUDENT_ARCHETYPE_TEST_LABEL}
      </Link>
    </div>
  );
}
