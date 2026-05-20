"use client";

import { useEffect, useState } from "react";

import { CollegeMatchQuizCtaLink } from "@/components/home/college-match-quiz-cta-link";
import { STUDENT_ARCHETYPE_QUIZ_LABEL } from "@/components/home/student-archetype-test-cta";
import { cn } from "@/lib/utils";

/** 0–1: how far the page has been scrolled through its scrollable range. */
function scrollDepthRatio(): number {
  const el = document.documentElement;
  const top = el.scrollTop || document.body.scrollTop;
  const scrollable = el.scrollHeight - el.clientHeight;
  if (scrollable <= 0) return 1;
  return top / scrollable;
}

/** Site-wide (layout): floating College Match Quiz on small screens only, after ~30% scroll depth. */
export function MobileScholarshipQuizStickyFooter() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      setVisible(scrollDepthRatio() >= 0.3);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className={`pointer-events-none fixed bottom-0 left-0 right-0 z-40 flex justify-center px-4 md:hidden ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      } transition-[transform,opacity] duration-200 ease-out`}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      role="complementary"
      aria-label={STUDENT_ARCHETYPE_QUIZ_LABEL}
      aria-hidden={!visible}
    >
      <div className={cn("pointer-events-auto py-2", !visible && "pointer-events-none")}>
        <CollegeMatchQuizCtaLink tabIndex={visible ? undefined : -1}>
          {STUDENT_ARCHETYPE_QUIZ_LABEL}
        </CollegeMatchQuizCtaLink>
      </div>
    </div>
  );
}
