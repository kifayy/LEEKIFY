import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { GpaCalculator } from "@/components/calculators/gpa-calculator";
import { GpaCalculatorJsonLd } from "@/components/calculators/gpa-calculator-json-ld";
import { CollegeMatchQuizLink } from "@/components/college-match-quiz-link";
import { PATH_COLLEGE_MATCH_QUIZ_LABEL } from "@/components/home/path-quiz-cta";
import {
  GPA_CALCULATOR_FAQ,
  GPA_CALCULATOR_FEATURES,
  GPA_CALCULATOR_HERO_PILLS,
  GPA_CALCULATOR_H1,
  GPA_CALCULATOR_INTRO,
  GPA_HOW_TO_STEPS,
  GPA_SCALE_ROWS,
  GPA_TYPES_SECTIONS,
  type GpaCalculatorFeature,
} from "@/lib/gpa-calculator-seo";
import { cn } from "@/lib/utils";

type Props = {
  canonicalUrl: string;
  baseUrl: string;
};

const PAGE_WIDTH = "container mx-auto max-w-6xl px-4 md:px-6";

function ContentCard({
  title,
  children,
  tint = "default",
  compact = false,
}: {
  title: string;
  children: ReactNode;
  tint?: "default" | "purple";
  compact?: boolean;
}) {
  return (
    <article
      className={cn(
        "h-full overflow-hidden rounded-2xl border bg-white",
        tint === "purple"
          ? "border-[#956EFE]/25 shadow-[0_4px_20px_rgba(149,110,254,0.08)]"
          : "border-[#EBEBEA] shadow-[0_4px_20px_rgba(17,24,39,0.04)]",
      )}
    >
      <div
        className={cn(
          "border-b px-4 md:px-5",
          compact ? "py-3" : "py-3.5 md:py-4",
          tint === "purple" ? "border-[#956EFE]/10 bg-[#FAF8FF]" : "border-[#F0F0F2] bg-[#FAFAFA]",
        )}
      >
        <h3 className="text-[1.0625rem] font-bold leading-snug tracking-[-0.02em] text-[#111111] md:text-lg">
          {title}
        </h3>
      </div>
      <div className={cn("px-4 md:px-5", compact ? "py-3.5" : "py-4 md:py-5")}>{children}</div>
    </article>
  );
}

function FeatureCard({ title, description }: GpaCalculatorFeature) {
  return (
    <ContentCard title={title} compact>
      <p className="text-[0.9375rem] leading-[1.65] text-[#3A3E46] md:text-[15px]">{description}</p>
    </ContentCard>
  );
}

function GradeScaleTable({ className }: { className?: string }) {
  const midpoint = Math.ceil(GPA_SCALE_ROWS.length / 2);
  const columns = [GPA_SCALE_ROWS.slice(0, midpoint), GPA_SCALE_ROWS.slice(midpoint)];

  return (
    <div className={cn("grid gap-3 sm:grid-cols-2", className)}>
      {columns.map((rows, columnIndex) => (
        <div
          key={columnIndex === 0 ? "lower" : "upper"}
          className="overflow-hidden rounded-2xl border border-[#EBEBEA] bg-white"
        >
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#EBEBEA] bg-[#FAFAFA]">
                <th scope="col" className="px-4 py-2.5 font-semibold text-[#111111]">
                  Grade
                </th>
                <th scope="col" className="px-4 py-2.5 font-semibold text-[#111111]">
                  Points
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={row.letter} className={index % 2 === 1 ? "bg-[#FAFAFA]/60" : undefined}>
                  <td className="px-4 py-1.5 font-medium text-[#111111]">{row.letter}</td>
                  <td className="px-4 py-1.5 tabular-nums text-[#3A3E46]">{row.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export function GpaCalculatorPageContent({ canonicalUrl, baseUrl }: Props) {
  return (
    <div className="w-full min-w-0 overflow-hidden bg-white">
      <GpaCalculatorJsonLd canonicalUrl={canonicalUrl} baseUrl={baseUrl} />

      <header className="border-b border-[#EBEBEA] bg-white">
        <div className={cn(PAGE_WIDTH, "py-10 md:py-12 lg:py-14")}>
          <div className="lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)] lg:items-center lg:gap-12 xl:gap-16">
            <div className="text-center lg:text-left">
              <p className="text-sm text-[#6B7280]">student tools · free · no login</p>
              <h1 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-[#111111] md:text-[2.75rem] md:leading-tight">
                {GPA_CALCULATOR_H1}
              </h1>
              <div className="mx-auto mt-4 max-w-xl space-y-2 text-[0.9375rem] leading-[1.65] text-[#3A3E46] md:text-base lg:mx-0 lg:max-w-none">
                {GPA_CALCULATOR_INTRO.map((paragraph) => (
                  <p key={paragraph.slice(0, 36)}>{paragraph}</p>
                ))}
              </div>
            </div>

            <ul className="mx-auto mt-8 grid max-w-md grid-cols-1 gap-2 sm:grid-cols-2 lg:mx-0 lg:mt-0 lg:max-w-none">
              {GPA_CALCULATOR_HERO_PILLS.map((pill) => (
                <li
                  key={pill.label}
                  className="rounded-xl border border-[#EBEBEA] bg-[#FAFAFA] px-3.5 py-2.5 text-[13px] font-medium text-[#3A3E46] md:text-sm"
                >
                  <span aria-hidden>{pill.emoji} </span>
                  {pill.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      <section
        id="gpa-calculator-tool"
        className={cn(PAGE_WIDTH, "scroll-mt-36 py-10 md:py-12")}
        aria-labelledby="calculator-heading"
      >
        <div className="text-center lg:text-left">
          <h2
            id="calculator-heading"
            className="text-2xl font-bold tracking-[-0.02em] text-[#111111] md:text-[1.75rem]"
          >
            Calculate your GPA online
          </h2>
          <p className="mt-2 max-w-xl text-[0.9375rem] leading-relaxed text-[#6B7280] md:text-base lg:mx-0">
            Grades and credits below — your semester and cumulative GPA update as you go.
          </p>
        </div>

        <div className="mt-8">
          <GpaCalculator />
        </div>
      </section>

      <section className="border-y border-[#EBEBEA] bg-[#FAFAFA]" aria-labelledby="features-heading">
        <div className={cn(PAGE_WIDTH, "py-10 md:py-12")}>
          <header className="text-center lg:text-left">
            <h2
              id="features-heading"
              className="text-2xl font-bold tracking-[-0.02em] text-[#111111] md:text-[1.75rem]"
            >
              One calculator, three ways to use it
            </h2>
            <p className="mt-2 text-[0.9375rem] text-[#6B7280]">
              Weighted, cumulative, and semester GPA — no switching tabs.
            </p>
          </header>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {GPA_CALCULATOR_FEATURES.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      <section className={cn(PAGE_WIDTH, "py-10 md:py-12")} aria-labelledby="reference-heading">
        <h2 id="reference-heading" className="sr-only">
          GPA reference and how-to
        </h2>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-12">
          <div>
            <h3 className="text-xl font-bold tracking-[-0.02em] text-[#111111] md:text-2xl">
              4.0 GPA scale
            </h3>
            <p className="mt-2 text-[0.9375rem] leading-[1.65] text-[#3A3E46] md:text-[15px]">
              Pluses and minuses sit between whole steps — A- is 3.7, B+ is 3.3.
            </p>
            <GradeScaleTable className="mt-4" />
          </div>

          <div>
            <h3 className="text-xl font-bold tracking-[-0.02em] text-[#111111] md:text-2xl">
              How to calculate your GPA
            </h3>
            <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {GPA_HOW_TO_STEPS.map((step, index) => (
                <li key={step.title} className="min-h-0">
                  <ContentCard title={`${index + 1}. ${step.title}`} compact>
                    <p className="text-[0.9375rem] leading-[1.65] text-[#3A3E46] md:text-[15px]">
                      {step.body}
                    </p>
                  </ContentCard>
                </li>
              ))}
            </ol>
            <p className="mt-4 rounded-2xl border border-[#EBEBEA] bg-[#FAFAFA] px-4 py-3.5 text-[0.9375rem] leading-relaxed text-[#3A3E46] md:text-[15px]">
              <strong className="font-semibold text-[#111111]">The math:</strong> GPA = quality
              points ÷ credits.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-[#EBEBEA] bg-[#FAFAFA]" aria-labelledby="help-heading">
        <div className={cn(PAGE_WIDTH, "py-10 md:py-12")}>
          <h2 id="help-heading" className="sr-only">
            Definitions and FAQ
          </h2>

          <div className="grid gap-3 md:grid-cols-3">
            {GPA_TYPES_SECTIONS.map((section) => (
              <article key={section.id} id={section.id}>
                <ContentCard title={section.title} compact>
                  <p className="text-[0.9375rem] leading-[1.65] text-[#3A3E46] md:text-[15px]">
                    {section.body}
                  </p>
                </ContentCard>
              </article>
            ))}
          </div>

          <div className="mt-10 lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-10 xl:gap-12">
            <div className="hidden lg:block">
              <h3 className="text-xl font-bold tracking-[-0.02em] text-[#111111]">
                Common questions
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-[#6B7280]">
                Quick answers about weighted GPA, cumulative averages, and the 4.0 scale.
              </p>
            </div>

            <div>
              <h3 className="mb-4 text-center text-xl font-bold tracking-[-0.02em] text-[#111111] lg:hidden">
                Common questions
              </h3>
              <div className="grid gap-2 lg:grid-cols-2 lg:gap-3">
                {GPA_CALCULATOR_FAQ.map((item) => (
                  <details
                    key={item.question}
                    className="group overflow-hidden rounded-2xl border border-[#EBEBEA] bg-white open:border-[#956EFE]/30"
                  >
                    <summary className="cursor-pointer list-none px-4 py-3.5 outline-none marker:content-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#956EFE]/35 md:px-4 [&::-webkit-details-marker]:hidden">
                      <span className="flex items-start gap-2 text-left">
                        <span className="min-w-0 flex-1 text-[0.875rem] font-medium leading-snug text-[#111111]">
                          {item.question}
                        </span>
                        <ChevronDown
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#9CA3AF] transition-transform group-open:rotate-180"
                          strokeWidth={2.5}
                          aria-hidden
                        />
                      </span>
                    </summary>
                    <div className="border-t border-[#F0F0F2] px-4 pb-3.5 pt-2.5">
                      <p className="text-[0.875rem] leading-[1.65] text-[#3A3E46]">{item.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={cn(PAGE_WIDTH, "pb-14 pt-2 md:pb-16")}>
        <ContentCard title="Know your GPA — now find your fit" tint="purple">
          <div className="lg:flex lg:items-center lg:justify-between lg:gap-8">
            <p className="max-w-2xl text-[0.9375rem] leading-[1.75] text-[#3A3E46] md:text-[15px]">
              PathPicker matches your personality and goals to colleges where you&apos;re actually
              likely to be happy — not just schools that look good on paper.
            </p>
            <div className="mt-5 shrink-0 lg:mt-0 lg:text-right">
              <CollegeMatchQuizLink className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#956EFE] px-6 text-sm font-semibold text-white transition hover:brightness-95 sm:w-auto">
                {PATH_COLLEGE_MATCH_QUIZ_LABEL}
              </CollegeMatchQuizLink>
              <p className="mt-3 text-sm text-[#6B7280]">
                or{" "}
                <Link href="/browse" className="font-medium text-[#956EFE] hover:underline">
                  browse schools
                </Link>
              </p>
            </div>
          </div>
        </ContentCard>
      </section>
    </div>
  );
}
