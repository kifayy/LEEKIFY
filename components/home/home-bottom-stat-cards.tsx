"use client";

import {
  Columns2,
  Compass,
  Focus,
  Gauge,
  GitCompare,
  UserCheck,
  type LucideIcon,
} from "lucide-react";

import { CollegeMatchQuizCtaLink } from "@/components/home/college-match-quiz-cta-link";
import { STUDENT_ARCHETYPE_QUIZ_LABEL } from "@/components/home/student-archetype-test-cta";
import { HomeDesktopScholarshipInboxCta } from "@/components/home/home-desktop-scholarship-inbox-cta";

type BenefitItem = {
  title: string;
  description: string;
  Icon: LucideIcon;
  iconBg: string;
};

const MATCH_BENEFITS: BenefitItem[] = [
  {
    title: "Know yourself better",
    description:
      "Get clear on what drives you: your goals, values, and strengths, before you choose your next step.",
    Icon: Compass,
    iconBg: "#956EFE",
  },
  {
    title: "Less noise, more clarity",
    description: "Focus on what actually matters for your future and tune out the rest.",
    Icon: Focus,
    iconBg: "#7C3AED",
  },
  {
    title: "Check your fit, fast",
    description:
      "See which paths, careers, and options line up with you so the right direction feels obvious.",
    Icon: Gauge,
    iconBg: "#0EA5E9",
  },
  {
    title: "Narrow your options",
    description: "Compare your top fits and see exactly why each one works, or why it does not.",
    Icon: GitCompare,
    iconBg: "#10B981",
  },
  {
    title: "Decision-making tools",
    description: "Side-by-side insights and comparisons that make your next big decision easier.",
    Icon: Columns2,
    iconBg: "#F59E0B",
  },
  {
    title: "Built for you",
    description:
      "Guidance shaped around your archetype, your priorities, and the future you are building.",
    Icon: UserCheck,
    iconBg: "#EC4899",
  },
];

const MATCH_BENEFITS_MARQUEE_TRACK = [...MATCH_BENEFITS, ...MATCH_BENEFITS];

function MatchBenefitRow({ title, description, Icon, iconBg }: BenefitItem) {
  return (
    <div className="flex items-start gap-4 text-left">
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[13px] shadow-[0_4px_14px_rgba(35,57,91,0.12)]"
        style={{ backgroundColor: iconBg }}
      >
        <Icon className="h-6 w-6 text-white" strokeWidth={2} aria-hidden />
      </div>
      <div className="min-w-0 flex flex-col gap-1.5 pt-0.5">
        <h3 className="font-[family-name:var(--font-poppins)] text-base font-bold text-[#181A1D] md:text-[1.0625rem]">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-[#5E6282]">{description}</p>
      </div>
    </div>
  );
}

function MatchBenefitMarqueeTile({ benefit }: { benefit: BenefitItem }) {
  return (
    <div
      className="w-[16.5rem] shrink-0 rounded-2xl border border-slate-100 bg-white px-4 py-4 shadow-[0_4px_20px_rgba(35,57,91,0.06)] sm:w-[18rem] sm:px-5 sm:py-5 md:w-[19rem]"
    >
      <MatchBenefitRow {...benefit} />
    </div>
  );
}

/** Six benefit cards — infinite horizontal reel above FAQ on the home page. */
export function HomeMatchBenefitsSection() {
  return (
    <section
      className="w-full bg-white pb-10 pt-10 md:pb-14 md:pt-14 lg:pb-16 lg:pt-16"
      aria-label="Why use PathPicker"
    >
      <div
        className="mx-auto max-w-6xl px-4 md:px-6"
      >
        <div
          className="marquee-fade-edges relative overflow-hidden rounded-2xl"
          aria-label="PathPicker benefits"
        >
        <div className="flex w-max shrink-0 items-stretch gap-4 pr-4 motion-reduce:animate-none motion-safe:animate-[marquee-x_55s_linear_infinite] sm:gap-5">
          {MATCH_BENEFITS_MARQUEE_TRACK.map((benefit, i) => (
            <MatchBenefitMarqueeTile key={`${benefit.title}-${i}`} benefit={benefit} />
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Post-FAQ band — quiz CTA on mobile; scholarship inbox signup on desktop. */
export function HomeCollegeMatchQuizCta() {
  return (
    <section className="w-full border-t border-slate-200/80 bg-white py-10 md:py-0 lg:py-0">
      <div className="mx-auto max-w-6xl md:hidden">
        <div
          className="flex flex-col items-center gap-3 px-4 text-center sm:gap-4"
          aria-label="College match quiz"
        >
          <p className="font-[family-name:var(--font-poppins)] text-lg font-semibold text-[#181A1D]">
            Ready to see your college matches?
          </p>
          <p className="text-sm leading-relaxed text-[#3F3F46]">
            Take the free college match quiz for admission odds, personality fit, and happiness signals in
            minutes.
          </p>
          <CollegeMatchQuizCtaLink className="mt-1">{STUDENT_ARCHETYPE_QUIZ_LABEL}</CollegeMatchQuizCtaLink>
        </div>
      </div>

      <div className="mx-auto hidden max-w-6xl md:block" aria-label="Scholarship picks newsletter">
        <HomeDesktopScholarshipInboxCta />
      </div>
    </section>
  );
}
