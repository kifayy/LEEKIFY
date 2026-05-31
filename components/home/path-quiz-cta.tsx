import Link from "next/link";

import {
  PATHPICKER_BRAND_PURPLE,
  PATHPICKER_BRAND_PURPLE_RGB,
} from "@/components/home/hero-audience-theme";
import { CAREER_MATCH_QUIZ_URL, COLLEGE_MATCH_QUIZ_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const PATH_COLLEGE_MATCH_QUIZ_LABEL = "Find My Archetype";
export const PATH_CAREER_MATCH_QUIZ_LABEL = "Career Match Quiz";

/** @deprecated Use path quiz CTA labels; kept for existing imports. */
export const STUDENT_ARCHETYPE_TEST_LABEL = PATH_COLLEGE_MATCH_QUIZ_LABEL;
export const STUDENT_ARCHETYPE_QUIZ_LABEL = PATH_COLLEGE_MATCH_QUIZ_LABEL;

const PATH_QUIZ_CTA_CONFIG = {
  college: {
    label: PATH_COLLEGE_MATCH_QUIZ_LABEL,
    href: COLLEGE_MATCH_QUIZ_URL,
    ctaBg: PATHPICKER_BRAND_PURPLE,
    ctaShadow: `0 8px 28px rgba(${PATHPICKER_BRAND_PURPLE_RGB}, 0.32)`,
    ctaFocusClass: "focus-visible:outline-[#6836D5]",
    onDarkCtaBg: "#FFFFFF",
    onDarkCtaShadow: "0 8px 24px rgba(0, 0, 0, 0.22)",
    onDarkCtaFocusClass: "focus-visible:outline-white",
    onDarkTextClass: "text-[#6836D5]",
  },
  career: {
    label: PATH_CAREER_MATCH_QUIZ_LABEL,
    href: CAREER_MATCH_QUIZ_URL,
    ctaBg: "#E8489A",
    ctaShadow: "0 10px 32px rgba(232, 72, 154, 0.38)",
    ctaFocusClass: "focus-visible:outline-[#E8489A]",
    onDarkCtaBg: "#FFFFFF",
    onDarkCtaShadow: "0 8px 24px rgba(0, 0, 0, 0.22)",
    onDarkCtaFocusClass: "focus-visible:outline-white",
    onDarkTextClass: "text-[#5F1C99]",
  },
} as const;

export type PathQuizCtaVariant = keyof typeof PATH_QUIZ_CTA_CONFIG;

const PATH_QUIZ_CTA_BASE_CLASS =
  "inline-flex items-center justify-center rounded-full font-[family-name:var(--font-poppins)] font-bold text-white transition hover:opacity-95 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

const PATH_QUIZ_CTA_SIZE_CLASS = {
  column: "h-14 min-w-[12.5rem] px-9 text-base",
  section:
    "h-12 min-w-[11rem] px-8 text-[0.9375rem] md:h-[3.25rem] md:min-w-[12.5rem] md:px-8 md:text-base",
  hero:
    "mt-5 h-12 min-w-[11rem] px-8 text-[0.9375rem] md:mt-5 md:h-[3.25rem] md:min-w-[12.5rem] lg:mt-8 lg:h-14 lg:min-w-[14rem] lg:px-10 lg:text-lg xl:h-[3.75rem] xl:min-w-[15rem] xl:px-11 xl:text-[1.125rem]",
  desktop:
    "h-14 min-w-[14rem] px-10 text-lg lg:h-[3.75rem] lg:min-w-[15rem] lg:px-11 lg:text-[1.125rem]",
} as const;

type PathQuizCtaSize = keyof typeof PATH_QUIZ_CTA_SIZE_CLASS;

type PathQuizCtaButtonProps = {
  variant: PathQuizCtaVariant;
  size?: PathQuizCtaSize;
  appearance?: "default" | "onDark";
  className?: string;
  tabIndex?: number;
  children?: React.ReactNode;
};

export function PathQuizCtaButton({
  variant,
  size = "column",
  appearance = "default",
  className,
  tabIndex,
  children,
}: PathQuizCtaButtonProps) {
  const config = PATH_QUIZ_CTA_CONFIG[variant];
  const onDark = appearance === "onDark";

  return (
    <Link
      href={config.href}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={tabIndex}
      className={cn(
        PATH_QUIZ_CTA_BASE_CLASS,
        PATH_QUIZ_CTA_SIZE_CLASS[size],
        onDark ? config.onDarkCtaFocusClass : config.ctaFocusClass,
        onDark && config.onDarkTextClass,
        className,
      )}
      style={{
        backgroundColor: onDark ? config.onDarkCtaBg : config.ctaBg,
        boxShadow: onDark ? config.onDarkCtaShadow : config.ctaShadow,
      }}
    >
      {children ?? config.label}
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
