"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

import { useCollegeMatchQuizUrl } from "@/hooks/useCollegeMatchQuizUrl";
import { trackLandingCtaToQuiz } from "@/lib/snapchat-pixel";

type CollegeMatchQuizLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  trackCta?: boolean;
};

/** External link to my.pathpicker.com/archetype with session attribution. */
export function CollegeMatchQuizLink({
  trackCta = true,
  onClick,
  target = "_blank",
  rel = "noopener noreferrer",
  ...props
}: CollegeMatchQuizLinkProps) {
  const href = useCollegeMatchQuizUrl();

  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      onClick={(event) => {
        if (trackCta) trackLandingCtaToQuiz();
        onClick?.(event);
      }}
      {...props}
    />
  );
}
