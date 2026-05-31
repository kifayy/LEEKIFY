import {
  PATH_COLLEGE_MATCH_QUIZ_LABEL,
  PathQuizCtaButton,
} from "@/components/home/path-quiz-cta";
import { cn } from "@/lib/utils";

type CollegeMatchQuizCtaLinkProps = {
  className?: string;
  children?: React.ReactNode;
  tabIndex?: number;
};

/** Site-wide primary CTA → college match quiz (external). */
export function CollegeMatchQuizCtaLink({
  className,
  children = PATH_COLLEGE_MATCH_QUIZ_LABEL,
  tabIndex,
}: CollegeMatchQuizCtaLinkProps) {
  return (
    <PathQuizCtaButton
      variant="college"
      size="section"
      tabIndex={tabIndex}
      className={cn(
        "h-14 min-w-[min(100%,16rem)] px-10 text-[1.0625rem] md:h-[3.75rem] md:min-w-[18rem] md:text-lg",
        className,
      )}
    >
      {children}
    </PathQuizCtaButton>
  );
}
