import Link from "next/link";

import { CAREER_MATCH_QUIZ_URL, COLLEGE_MATCH_QUIZ_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const PATH_COLLEGE_MATCH_QUIZ_LABEL = "Find My Path";
export const PATH_CAREER_MATCH_QUIZ_LABEL = "Career Match Quiz";

/** @deprecated Use path quiz CTA labels; kept for existing imports. */
export const STUDENT_ARCHETYPE_TEST_LABEL = PATH_COLLEGE_MATCH_QUIZ_LABEL;
export const STUDENT_ARCHETYPE_QUIZ_LABEL = PATH_COLLEGE_MATCH_QUIZ_LABEL;

const PATH_QUIZ_CTA_CONFIG = {
  college: {
    label: PATH_COLLEGE_MATCH_QUIZ_LABEL,
    href: COLLEGE_MATCH_QUIZ_URL,
    ctaBg: "#3DB8A8",
    ctaShadow: "0 10px 32px rgba(61, 184, 168, 0.42)",
    ctaFocusClass: "focus-visible:outline-[#3DB8A8]",
  },
  career: {
    label: PATH_CAREER_MATCH_QUIZ_LABEL,
    href: CAREER_MATCH_QUIZ_URL,
    ctaBg: "#E8489A",
    ctaShadow: "0 10px 32px rgba(232, 72, 154, 0.38)",
    ctaFocusClass: "focus-visible:outline-[#E8489A]",
  },
} as const;

export type PathQuizCtaVariant = keyof typeof PATH_QUIZ_CTA_CONFIG;

const PATH_QUIZ_CTA_BASE_CLASS =
  "inline-flex items-center justify-center rounded-full font-[family-name:var(--font-poppins)] font-semibold text-white transition hover:opacity-95 active:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

const PATH_QUIZ_CTA_SIZE_CLASS = {
  column: "h-14 min-w-[12.5rem] px-9 text-base",
  section:
    "h-12 min-w-[11rem] px-8 text-[0.9375rem] md:h-[3.25rem] md:min-w-[12.5rem] md:px-8 md:text-base",
  hero: "mt-5 h-12 min-w-[11rem] px-8 text-[0.9375rem] md:mt-5 md:h-[3.25rem] md:min-w-[12.5rem] lg:mt-8",
} as const;

type PathQuizCtaSize = keyof typeof PATH_QUIZ_CTA_SIZE_CLASS;

type PathQuizCtaButtonProps = {
  variant: PathQuizCtaVariant;
  size?: PathQuizCtaSize;
  className?: string;
};

export function PathQuizCtaButton({
  variant,
  size = "column",
  className,
}: PathQuizCtaButtonProps) {
  const { label, href, ctaBg, ctaShadow, ctaFocusClass } =
    PATH_QUIZ_CTA_CONFIG[variant];

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        PATH_QUIZ_CTA_BASE_CLASS,
        PATH_QUIZ_CTA_SIZE_CLASS[size],
        ctaFocusClass,
        className,
      )}
      style={{
        backgroundColor: ctaBg,
        boxShadow: ctaShadow,
      }}
    >
      {label}
    </Link>
  );
}

type PathQuizDualCtaProps = {
  className?: string;
  wrapperClassName?: string;
  buttonClassName?: string;
  desktopOnly?: boolean;
  align?: "center" | "left";
  size?: PathQuizCtaSize;
  gapClassName?: string;
};

export function PathQuizDualCta({
  className,
  wrapperClassName,
  buttonClassName,
  desktopOnly = false,
  align = "center",
  size = "section",
  gapClassName = "gap-3 sm:gap-4",
}: PathQuizDualCtaProps) {
  return (
    <div
      className={cn(
        "w-full",
        desktopOnly ? "hidden md:flex" : "flex",
        align === "center" ? "justify-center" : "justify-start",
        wrapperClassName,
      )}
    >
      <div
        className={cn(
          "flex flex-wrap items-center",
          align === "center" ? "justify-center" : "justify-start",
          gapClassName,
          className,
        )}
      >
        <PathQuizCtaButton
          variant="college"
          size={size}
          className={buttonClassName}
        />
        <PathQuizCtaButton
          variant="career"
          size={size}
          className={buttonClassName}
        />
      </div>
    </div>
  );
}
