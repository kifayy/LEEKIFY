"use client";

import * as React from "react";
import {
  Columns2,
  Compass,
  Focus,
  Gauge,
  GitCompare,
  UserCheck,
  type LucideIcon,
} from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { CollegeMatchQuizCtaLink } from "@/components/home/college-match-quiz-cta-link";
import { HomeDesktopScholarshipInboxCta } from "@/components/home/home-desktop-scholarship-inbox-cta";
import { cn } from "@/lib/utils";

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
      "Get clear on what drives you—your goals, values, and strengths—before you pick a school.",
    Icon: Compass,
    iconBg: "#956EFE",
  },
  {
    title: "Less noise, more clarity",
    description: "Spot what actually matters for your list and tune out the rest.",
    Icon: Focus,
    iconBg: "#7C3AED",
  },
  {
    title: "Check your fit, fast",
    description: "See which campuses line up with you so the right choice feels obvious.",
    Icon: Gauge,
    iconBg: "#0EA5E9",
  },
  {
    title: "Narrow your options",
    description: "Compare schools and see exactly why each one fits—or why it does not.",
    Icon: GitCompare,
    iconBg: "#10B981",
  },
  {
    title: "Decision-making tools",
    description: "Side-by-side insights and comparisons that make your final call easier.",
    Icon: Columns2,
    iconBg: "#F59E0B",
  },
  {
    title: "Built for you",
    description: "Guidance shaped around your profile, your priorities, and your college goals.",
    Icon: UserCheck,
    iconBg: "#EC4899",
  },
];

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

/** Six benefit rows — placed above FAQ on the home page. */
export function HomeMatchBenefitsSection() {
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi>();
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    if (!carouselApi) return;
    const onSelect = () => setActive(carouselApi.selectedScrollSnap());
    onSelect();
    carouselApi.on("select", onSelect);
    carouselApi.on("reInit", onSelect);
    return () => {
      carouselApi.off("select", onSelect);
      carouselApi.off("reInit", onSelect);
    };
  }, [carouselApi]);

  return (
    <section
      className="w-full border-t border-slate-200/80 bg-white py-10 md:py-12 lg:py-14"
      aria-label="Why use PathPicker for college matching"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="sm:hidden">
          <Carousel
            aria-label="College match benefits"
            opts={{ loop: false, align: "start", duration: 20 }}
            setApi={setCarouselApi}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {MATCH_BENEFITS.map((benefit) => (
                <CarouselItem key={benefit.title} className="basis-full pl-4">
                  <MatchBenefitRow {...benefit} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <nav className="flex justify-center gap-1.5 pt-6" aria-label="Benefit slides">
            {MATCH_BENEFITS.map((benefit, i) => (
              <button
                key={benefit.title}
                type="button"
                aria-label={benefit.title}
                aria-current={active === i ? "true" : undefined}
                className={cn(
                  "h-1.5 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300",
                  active === i
                    ? "w-6 bg-violet-400"
                    : "w-1.5 bg-neutral-200 hover:bg-neutral-300",
                )}
                onClick={() => carouselApi?.scrollTo(i)}
              />
            ))}
          </nav>
        </div>

        <ul className="hidden grid-cols-1 gap-8 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
          {MATCH_BENEFITS.map((benefit) => (
            <li key={benefit.title}>
              <MatchBenefitRow {...benefit} />
            </li>
          ))}
        </ul>
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
          <CollegeMatchQuizCtaLink className="mt-1" />
        </div>
      </div>

      <div className="mx-auto hidden max-w-6xl md:block" aria-label="Scholarship picks newsletter">
        <HomeDesktopScholarshipInboxCta />
      </div>
    </section>
  );
}
