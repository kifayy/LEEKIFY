import Image from "next/image";
import dynamic from "next/dynamic";

import { HomeCommunityCtaBand } from "@/components/home/home-community-cta-band";
import {
  DESKTOP_SECTION_SUBTEXT_CLASS,
} from "@/components/home/desktop-section-typography";
import { HOME_HOW_IT_WORKS_FEATURES } from "@/lib/home-how-it-works-features";
import { HOME_REVIEWS_TRUST_TITLE } from "@/lib/home-reviews-trust-copy";
import { cn } from "@/lib/utils";

const StudentsLoveTestimonialMarquee = dynamic(
  () =>
    import("@/components/home2/students-love-testimonial-marquee").then((m) => ({
      default: m.StudentsLoveTestimonialMarquee,
    })),
  { ssr: true },
);

function FeatureTextCard({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-xl">
      <p className="font-[family-name:var(--font-poppins)] text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-[#4E2FFF] md:text-xs">
        {eyebrow}
      </p>
      <h3 className="mt-3 font-[family-name:var(--font-poppins)] text-[1.5rem] font-bold leading-[1.15] tracking-[-0.03em] text-[#18062E] md:mt-4 md:text-[1.75rem] lg:text-[2rem]">
        {title}
      </h3>
      <p className={cn(DESKTOP_SECTION_SUBTEXT_CLASS, "mt-4 md:mt-5")}>
        {description}
      </p>
    </div>
  );
}

export function HomeHowItWorksSection() {
  return (
    <section
      id="how-it-works"
      aria-label="How PathPicker works"
      className="w-full scroll-mt-28 bg-white"
    >
      {HOME_HOW_IT_WORKS_FEATURES.map((feature, index) => {
        const mediaFirst = index % 2 === 1;

        return (
          <article
            key={feature.id}
            className="border-t border-[#EBEBEA] first:border-t-0"
          >
            <div className="container mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14 lg:px-8 lg:py-16">
              <div
                className={cn(
                  "grid items-center gap-8 md:gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20",
                  mediaFirst && "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1",
                )}
              >
                <div
                  className={cn(
                    "flex justify-center lg:justify-start",
                    mediaFirst && "lg:justify-end",
                  )}
                >
                  <FeatureTextCard
                    eyebrow={feature.eyebrow}
                    title={feature.title}
                    description={feature.description}
                  />
                </div>

                <div className="flex justify-center">
                  <Image
                    src={feature.imageSrc}
                    alt={feature.imageAlt}
                    width={feature.imageWidth}
                    height={feature.imageHeight}
                    loading={index === 0 ? "eager" : "lazy"}
                    quality={85}
                    sizes={
                      index < 2
                        ? "(min-width: 1024px) 17rem, 16rem"
                        : "(min-width: 1024px) 22rem, 100vw"
                    }
                    className={cn(
                      "h-auto w-full object-contain",
                      index < 2
                        ? "max-w-[16rem] sm:max-w-[17rem] md:max-w-[18rem] lg:max-w-[17rem]"
                        : "max-w-[min(100%,22rem)] md:max-w-[26rem] lg:max-w-[20rem] xl:max-w-[22rem]",
                    )}
                  />
                </div>
              </div>
            </div>
          </article>
        );
      })}

      <div className="border-t border-[#EBEBEA]">
        <div className="container mx-auto max-w-6xl px-4 pb-2 pt-10 md:px-6 md:pt-12 lg:px-8">
          <h2 className="text-center font-[family-name:var(--font-poppins)] text-[1.625rem] font-bold leading-[1.22] tracking-[-0.03em] text-[#18062E] md:text-[1.875rem] md:leading-[1.2] lg:text-[2.25rem]">
            <span className="md:hidden">
              Trusted by our
              <br />
              global community of
              <br />
              100k+ students
            </span>
            <span className="hidden md:inline">{HOME_REVIEWS_TRUST_TITLE}</span>
            <span className="sr-only">
              PathPicker college matching — schools and student archetype fit
            </span>
          </h2>
        </div>
        <StudentsLoveTestimonialMarquee className="mt-4 md:mt-6" />
        <div className="bg-white py-10 md:py-12 lg:py-14" aria-hidden />
        <HomeCommunityCtaBand />
      </div>
    </section>
  );
}
