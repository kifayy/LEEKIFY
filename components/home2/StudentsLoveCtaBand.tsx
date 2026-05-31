"use client";

import { Star } from "lucide-react";
import { StudentsLoveHeadlineTypewriter } from "@/components/home2/students-love-headline-typewriter";
import { StudentsLoveTestimonialMarquee } from "@/components/home2/students-love-testimonial-marquee";
import { getActiveStudentsLoveSectionTheme } from "@/components/home2/students-love-section-themes";

export function StudentsLoveCtaBand() {
  const sectionTheme = getActiveStudentsLoveSectionTheme();

  return (
    <div className="flex w-full flex-col items-center px-4 pb-8 pt-2 md:pb-12 md:pt-4 lg:pb-14">
      <div className="w-full max-w-4xl md:mr-0 md:w-full">
        <div className="mb-3 flex justify-center md:mb-4">
          <div
            className="flex items-center gap-0.5"
            role="img"
            aria-label="Rated 5 out of 5 stars"
          >
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className="h-4 w-4 fill-amber-400 text-amber-400 md:h-[1.125rem] md:w-[1.125rem]"
                strokeWidth={0}
              />
            ))}
          </div>
        </div>
        <h3 className={`text-center ${sectionTheme.headlineClass}`}>
          <span className={`block ${sectionTheme.headlineLeadClass}`}>50k+ Found Their</span>
          <span className="mt-0.5 flex flex-wrap items-baseline justify-center">
            <span className={sectionTheme.headlineLeadClass}>Dream&nbsp;</span>
            <StudentsLoveHeadlineTypewriter className={sectionTheme.accentPhraseClass} />
          </span>
        </h3>
        <p className={`mx-auto mt-4 max-w-2xl text-center ${sectionTheme.subtextClass}`}>
          Personality matters. See fit, admission odds, and campus happiness, not just where you
          can get in.
        </p>
        <StudentsLoveTestimonialMarquee />
      </div>
    </div>
  );
}
