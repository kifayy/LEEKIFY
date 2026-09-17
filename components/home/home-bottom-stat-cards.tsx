"use client";

import * as React from "react";
import {
  Bell,
  FileText,
  Radar,
  Scale,
  ShieldCheck,
  Unlock,
  type LucideIcon,
} from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

type BenefitItem = {
  title: string;
  description: string;
  Icon: LucideIcon;
  iconBg: string;
};

const MATCH_BENEFITS: BenefitItem[] = [
  {
    title: "Full exposure ledger",
    description:
      "See every leak tied to your monitored IDs with unblurred breach names, exposed data types, and dates.",
    Icon: Unlock,
    iconBg: "#0EA5E9",
  },
  {
    title: "Watch 3 IDs",
    description: "Monitor email, phone, and additional identifiers from one Leekify dashboard.",
    Icon: Radar,
    iconBg: "#10B981",
  },
  {
    title: "Real-time breach alerts",
    description: "Get text and email notifications the moment your data appears in a new breach.",
    Icon: Bell,
    iconBg: "#2563EB",
  },
  {
    title: "Settlement notifications",
    description:
      "Learn when leaked brands face class-action settlements so you can claim what you may be owed.",
    Icon: Scale,
    iconBg: "#14B8A6",
  },
  {
    title: "24/7 data monitoring",
    description: "Continuous scanning keeps watch even while you sleep—no manual rechecks required.",
    Icon: ShieldCheck,
    iconBg: "#F59E0B",
  },
  {
    title: "PDF digital risk report",
    description: "Export a shareable PDF summary of your exposures anytime for records or support.",
    Icon: FileText,
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

function MatchBenefitCard({ benefit }: { benefit: BenefitItem }) {
  return (
    <div className="h-full w-full rounded-2xl border border-slate-100 bg-white px-4 py-4 shadow-[0_4px_20px_rgba(35,57,91,0.06)] sm:px-5 sm:py-5">
      <MatchBenefitRow {...benefit} />
    </div>
  );
}

function MatchBenefitsCarousel() {
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
    <div className="w-full">
      <Carousel
        aria-label="Leekify Premium benefits"
        setApi={setCarouselApi}
        opts={{ loop: false, align: "start", duration: 0 }}
        className={cn(
          "w-full [--benefit-gap:1rem]",
          "[--slide-w:min(18rem,calc(100%-2.5rem))]",
          "md:[--slide-w:calc((100%-var(--benefit-gap))/2)]",
          "lg:[--slide-w:calc((100%-2*var(--benefit-gap))/3)]",
        )}
      >
        <CarouselContent className="-ml-0 gap-[var(--benefit-gap)]">
          {MATCH_BENEFITS.map((benefit) => (
            <CarouselItem
              key={benefit.title}
              className="flex min-w-0 flex-[0_0_var(--slide-w)] pl-0"
            >
              <MatchBenefitCard benefit={benefit} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <nav className="flex justify-center gap-1.5 pt-5" aria-label="Benefit slides">
        {MATCH_BENEFITS.map((benefit, i) => (
          <button
            key={benefit.title}
            type="button"
            aria-label={benefit.title}
            aria-current={active === i ? "true" : undefined}
            className={cn(
              "h-1.5 rounded-full transition-[width,background-color] duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300",
              active === i
                ? "w-6 bg-violet-400"
                : "w-1.5 bg-neutral-200 hover:bg-neutral-300",
            )}
            onClick={() => carouselApi?.scrollTo(i)}
          />
        ))}
      </nav>
    </div>
  );
}

/** Six benefit cards — swipeable carousel above FAQ on the home page. */
export function HomeMatchBenefitsSection() {
  return (
    <section
      className="w-full bg-white pb-10 pt-10 md:pb-14 md:pt-14 lg:pb-16 lg:pt-16"
      aria-label="Why use Leekify"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <MatchBenefitsCarousel />
      </div>
    </section>
  );
}

