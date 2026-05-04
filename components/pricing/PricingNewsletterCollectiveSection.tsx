"use client";

import Image from "next/image";
import Script from "next/script";
import { BeehiivEmbedIframe } from "@/components/beehiiv-embed-iframe";
import {
  BRAND_MEDIA,
  BEEHIIV_EMBED_SCRIPT_SRC,
  BEEHIIV_SUBSCRIBE_IFRAME_SRC,
} from "@/components/landing/constants";

type NewsletterPlacement = "default" | "belowHomeMarquee";

type PricingNewsletterCollectiveSectionProps = {
  /** `belowHomeMarquee`: no community headline, tighter spacing under the home review carousel. */
  placement?: NewsletterPlacement;
};

/** Newsletter block (Beehiiv embed) — pricing page bottom or compact under home marquee. */
export function PricingNewsletterCollectiveSection({
  placement = "default",
}: PricingNewsletterCollectiveSectionProps) {
  const stackAvatars = BRAND_MEDIA.testimonialAvatars.slice(0, 4);
  const belowMarquee = placement === "belowHomeMarquee";
  const sectionClass = belowMarquee
    ? "w-full pb-2 pt-5 sm:pt-6 md:pt-7"
    : "w-full pb-4 pt-10 sm:pt-14";
  const cardTopClass = belowMarquee ? "mt-0" : "mt-8 md:mt-12";
  const cardBodyClass = belowMarquee
    ? "flex min-w-0 flex-col items-stretch justify-center gap-4 px-4 pb-1 pt-4 sm:gap-5 sm:p-6 md:p-8 lg:flex-row lg:items-start lg:gap-6 lg:p-8 xl:gap-8 xl:p-10 2xl:p-12"
    : "flex min-w-0 flex-col items-stretch justify-center gap-4 px-4 pb-3 pt-4 sm:gap-5 sm:p-6 md:p-8 lg:flex-row lg:items-start lg:gap-6 lg:p-8 xl:gap-8 xl:p-10 2xl:p-12";
  const iframeClass = belowMarquee
    ? "beehiiv-embed mx-auto block !h-[74px] !w-full max-w-full rounded-lg border-0 bg-transparent shadow-none sm:!h-[78px] md:!h-[82px] lg:mx-0"
    : "beehiiv-embed mx-auto block !h-[210px] !w-full max-w-full rounded-lg border-0 bg-transparent shadow-none sm:!h-[206px] md:!h-[207px] lg:mx-0";

  const cardSurfaceClass =
    "overflow-hidden rounded-2xl border-2 border-pathpicker-purple/30 bg-pathpicker-purple/[0.07] sm:rounded-[1.75rem] sm:border-[3px] md:border-4";

  return (
    <section
      className={sectionClass}
      {...(belowMarquee
        ? { "aria-label": "Newsletter signup" }
        : { "aria-labelledby": "pricing-newsletter-heading" })}
    >
      {!belowMarquee ? <Script src={BEEHIIV_EMBED_SCRIPT_SRC} strategy="lazyOnload" /> : null}
      <div className="mx-auto w-full min-w-0 max-w-6xl px-3 sm:px-5 lg:px-8">
        {!belowMarquee ? (
          <h2
            id="pricing-newsletter-heading"
            className="mx-auto max-w-5xl text-center font-hero text-xl font-extrabold tracking-tight text-foreground sm:text-2xl md:text-3xl lg:text-4xl lg:leading-tight"
          >
            Join the Awarded community, students and families who refuse to leave scholarship money on
            the table
          </h2>
        ) : null}
        <div className={`${cardSurfaceClass} ${cardTopClass}`}>
          <div className={cardBodyClass}>
            <div className="min-w-0 text-center lg:mb-0 lg:max-w-sm lg:shrink-0 lg:pt-0.5 lg:text-left xl:max-w-md">
              <h3 className="font-hero text-lg font-bold leading-snug tracking-tight text-foreground sm:text-xl lg:text-2xl">
                Get high-impact scholarship picks in your inbox
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base lg:mx-0 lg:mt-2 lg:text-lg">
                Scholarships straight to your inbox, so you can win more, with less work.
              </p>
            </div>
            <div className="flex min-w-0 w-full max-w-xl shrink-0 justify-center lg:max-w-none lg:flex-1 lg:justify-start">
              <div className="flex w-full min-w-0 max-w-[20.5rem] flex-col items-center gap-3 sm:max-w-[24rem] sm:gap-3.5 md:max-w-[560px] lg:mx-0 lg:max-w-[560px] lg:items-stretch lg:gap-2">
                <div className="flex w-full flex-col items-center gap-2 sm:gap-2.5 lg:items-start lg:gap-1">
                  <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 lg:justify-start">
                    <div className="flex items-center pl-1 sm:pl-1.5 lg:pl-0">
                      {stackAvatars.map((src, i) => (
                        <Image
                          key={src}
                          src={src}
                          alt=""
                          width={28}
                          height={28}
                          unoptimized
                          loading="lazy"
                          fetchPriority={i === 0 ? "auto" : "low"}
                          className={`h-6 w-6 rounded-full border-2 border-pathpicker-purple/25 object-cover sm:h-7 sm:w-7 ${i > 0 ? "-ml-1 sm:-ml-1.5" : ""}`}
                          sizes="28px"
                        />
                      ))}
                    </div>
                    <span className="inline-block bg-amber-300 px-1.5 py-0.5 font-mono text-xs font-bold tabular-nums text-neutral-900 sm:text-sm">
                      100% free
                    </span>
                  </div>
                  <p className="text-center text-sm font-bold text-foreground sm:text-base lg:text-left">
                    20k+ Readers
                  </p>
                </div>
                <div className="w-full shrink-0 lg:mt-0">
                  <BeehiivEmbedIframe
                    title="Subscribe to the Awarded newsletter"
                    src={BEEHIIV_SUBSCRIBE_IFRAME_SRC}
                    className={iframeClass}
                    scrolling="no"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
