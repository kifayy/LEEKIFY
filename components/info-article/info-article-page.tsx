import Image from "next/image";
import type { ReactNode } from "react";

import { shouldUseNextImageOptimizer } from "@/lib/remote-image-patterns";
import { cn } from "@/lib/utils";

export type InfoArticleSection = {
  emoji: string;
  title: string;
  paragraphs: readonly string[];
  image?: { src: string; alt: string };
  visual?: ReactNode;
  /** 0–100; shown in the section header when set. */
  automationRiskScore?: number;
};

type HeroImageConfig = {
  src: string;
  alt: string;
  /** Full-bleed cover at top of card, or inline below the title block. */
  placement?: "cover" | "inline";
  /** Portrait promos (Instagram-style) vs standard article photos. */
  aspect?: "portrait" | "landscape";
};

type SectionNumbering = "ascending" | "countdown";

type InfoArticlePageProps = {
  emoji?: string;
  title: string;
  subtitle?: string;
  /** Small label above the title (e.g. student news). */
  eyebrow?: string;
  lead: string[];
  sections: InfoArticleSection[];
  heroImage?: HeroImageConfig;
  leadVisual?: ReactNode;
  /** `countdown`: last section in the array is treated as highest risk. Default: first section is highest. */
  sectionNumbering?: SectionNumbering;
  /** Shown above the section list. */
  sectionsIntro?: string;
  /** Optional block below career sections (e.g. newsletter CTA). */
  footerCta?: ReactNode;
};

function sectionRank(
  index: number,
  total: number,
  numbering: SectionNumbering,
): number {
  return numbering === "countdown" ? total - index : index + 1;
}

function AutomationRiskOverlay({
  score,
  isTopRisk = false,
}: {
  score: number;
  isTopRisk?: boolean;
}) {
  return (
    <div
      className={cn(
        "absolute bottom-3 right-3 z-10 overflow-hidden rounded-xl shadow-[0_4px_18px_rgba(0,0,0,0.22)]",
        isTopRisk && "ring-2 ring-[#DC2626]/70 ring-offset-2 ring-offset-transparent",
      )}
      aria-label={`${score} percent automation risk`}
    >
      <div className="flex items-stretch">
        <div
          className={cn(
            "flex items-center justify-center px-3 py-2",
            isTopRisk ? "bg-[#B91C1C]" : "bg-[#DC2626]",
          )}
        >
          <span className="font-[family-name:var(--font-inter)] text-[1.125rem] font-extrabold leading-none tabular-nums text-white">
            {score}%
          </span>
        </div>
        <div className="flex items-center bg-[#111111] px-2.5 py-2">
          <span className="font-[family-name:var(--font-inter)] text-[0.5625rem] font-semibold uppercase leading-[1.15] tracking-[0.07em] text-white">
            Automation
            <br />
            risk
          </span>
        </div>
      </div>
    </div>
  );
}

function ArticleSectionCard({
  section,
  isTopRisk = false,
}: {
  section: InfoArticleSection;
  isTopRisk?: boolean;
}) {
  const score = section.automationRiskScore;

  return (
    <section
      className={cn(
        "overflow-hidden rounded-2xl border bg-white",
        isTopRisk
          ? "border-[#956DFE]/35 shadow-[0_8px_32px_rgba(149,109,254,0.14)]"
          : "border-[#EBEBEA] shadow-[0_4px_20px_rgba(17,24,39,0.04)]",
      )}
    >
      <div
        className={cn(
          "px-4 py-3.5 md:px-5 md:py-4",
          isTopRisk ? "bg-[#FAF8FF]" : "bg-[#FAFAFA]",
        )}
      >
        {isTopRisk ? (
          <p className="mb-1 font-[family-name:var(--font-inter)] text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-[#956DFE]">
            Highest automation risk
          </p>
        ) : null}
        <h2 className="font-[family-name:var(--font-inter)] text-[1.0625rem] font-bold leading-snug tracking-[-0.02em] text-[#111111] md:text-lg">
          <span className="mr-1.5" aria-hidden>
            {section.emoji}
          </span>
          {section.title}
        </h2>
      </div>

      {section.visual ? (
        <div className="relative">
          {section.visual}
          {score != null ? (
            <AutomationRiskOverlay score={score} isTopRisk={isTopRisk} />
          ) : null}
        </div>
      ) : section.image ? (
        <div className="relative">
          <ArticleImage
            src={section.image.src}
            alt={section.image.alt}
            className="rounded-none"
          />
          {score != null ? (
            <AutomationRiskOverlay score={score} isTopRisk={isTopRisk} />
          ) : null}
        </div>
      ) : null}

      <div className="space-y-3.5 border-t border-[#F0F0F2] px-4 py-4 md:px-5 md:py-5">
        {section.paragraphs.map((paragraph) => (
          <p
            key={paragraph.slice(0, 48)}
            className="font-[family-name:var(--font-inter)] text-[0.9375rem] leading-[1.75] text-[#3A3E46] md:text-[15px]"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}

const LANDSCAPE_ASPECT = "aspect-[16/10]";
const PORTRAIT_ASPECT = "aspect-[4/5] sm:aspect-[5/6]";

function ArticleImage({
  src,
  alt,
  priority,
  aspect = "landscape",
  className,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  aspect?: "portrait" | "landscape";
  className?: string;
}) {
  const aspectClass = aspect === "portrait" ? PORTRAIT_ASPECT : LANDSCAPE_ASPECT;
  const optimize = shouldUseNextImageOptimizer(src);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-slate-100",
        aspectClass,
        className,
      )}
    >
      {optimize ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 42rem"
          priority={priority}
          loading={priority ? "eager" : "lazy"}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover object-center"
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
      )}
    </div>
  );
}

export function InfoArticlePage({
  emoji,
  title,
  subtitle,
  eyebrow,
  lead,
  sections,
  heroImage,
  leadVisual,
  sectionNumbering = "ascending",
  sectionsIntro,
  footerCta,
}: InfoArticlePageProps) {
  const heroPlacement = heroImage?.placement ?? "inline";
  const heroAspect = heroImage?.aspect ?? "landscape";
  const isCoverHero = Boolean(heroImage && heroPlacement === "cover");
  const sectionCount = sections.length;

  return (
    <div className="w-full min-w-0 overflow-hidden bg-white py-8 md:py-14">
      <div className="container mx-auto max-w-2xl px-4 md:px-6 min-w-0">
        <article
          className={cn(
            "flex flex-col overflow-hidden rounded-2xl border border-[#EBEBEA] bg-white",
            "shadow-[0_12px_40px_rgba(17,24,39,0.06)]",
            isCoverHero ? "gap-0" : "gap-8 p-6 md:gap-10 md:p-10",
          )}
        >
          {isCoverHero && heroImage ? (
            <ArticleImage
              src={heroImage.src}
              alt={heroImage.alt}
              priority
              aspect={heroAspect}
              className="rounded-t-2xl"
            />
          ) : null}

          <header
            className={cn(
              "space-y-5",
              isCoverHero ? "px-6 pb-2 pt-7 md:px-10 md:pt-9" : "space-y-4",
            )}
          >
            {eyebrow ? (
              <p className="font-[family-name:var(--font-inter)] text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[#956DFE]">
                {eyebrow}
              </p>
            ) : null}

            <h1 className="font-[family-name:var(--font-inter)] text-[1.625rem] font-bold leading-[1.2] tracking-[-0.03em] text-[#111111] md:text-[1.875rem]">
              {emoji ? (
                <span className="mr-2" aria-hidden>
                  {emoji}
                </span>
              ) : null}
              {title}
            </h1>

            {subtitle ? (
              <p className="font-[family-name:var(--font-inter)] text-[0.9375rem] leading-[1.65] text-[#5C6370] md:text-base">
                {subtitle}
              </p>
            ) : null}

            {!isCoverHero && heroImage ? (
              <ArticleImage
                src={heroImage.src}
                alt={heroImage.alt}
                priority
                aspect={heroAspect}
                className="rounded-xl"
              />
            ) : null}

            {leadVisual}

            <div className="space-y-3.5 rounded-xl bg-[#F4F2FF] px-4 py-4 md:px-5 md:py-5">
              {lead.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="font-[family-name:var(--font-inter)] text-[0.9375rem] leading-[1.7] text-[#2A2D33] md:text-[15px]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </header>

          <div
            className={cn(
              "space-y-6 md:space-y-8",
              isCoverHero ? "px-6 pb-8 pt-4 md:px-10 md:pb-10" : "",
            )}
          >
            {sectionsIntro ? (
              <p className="font-[family-name:var(--font-inter)] text-center text-[0.8125rem] font-medium leading-relaxed text-[#6B7280] md:text-sm">
                {sectionsIntro}
              </p>
            ) : null}
            {sections.map((section, index) => (
              <ArticleSectionCard
                key={section.title}
                section={section}
                isTopRisk={
                  sectionRank(index, sectionCount, sectionNumbering) === 1
                }
              />
            ))}
            {footerCta ? <div className="pt-2">{footerCta}</div> : null}
          </div>
        </article>
      </div>
    </div>
  );
}
