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
  /** `countdown`: first section is #N, last is #1 (most important). Default: 1, 2, 3… */
  sectionNumbering?: SectionNumbering;
  /** Shown above the section list when using countdown ranking. */
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

function riskLabel(rank: number): string | null {
  if (rank !== 1) return null;
  return "Highest extinction risk";
}

function ArticleSectionCard({
  section,
  rank,
  total,
  numbering,
}: {
  section: InfoArticleSection;
  rank: number;
  total: number;
  numbering: SectionNumbering;
}) {
  const isTopRisk = numbering === "countdown" && rank === 1;
  const label = riskLabel(rank);

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
          "flex gap-4 px-4 py-4 md:px-5 md:py-5",
          isTopRisk ? "bg-[#FAF8FF]" : "bg-[#FAFAFA]",
        )}
      >
        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-[family-name:var(--font-inter)] text-[1.125rem] font-bold tabular-nums",
            isTopRisk
              ? "bg-[#956DFE] text-white shadow-[0_4px_14px_rgba(149,109,254,0.35)]"
              : "bg-white text-[#956DFE] ring-1 ring-[#956DFE]/20",
          )}
          aria-hidden
        >
          #{rank}
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          {label ? (
            <p className="mb-1 font-[family-name:var(--font-inter)] text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[#956DFE]">
              {label}
            </p>
          ) : numbering === "countdown" ? (
            <p className="mb-1 font-[family-name:var(--font-inter)] text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-[#9CA3AF]">
              Risk rank {rank} of {total}
            </p>
          ) : null}
          <h2 className="font-[family-name:var(--font-inter)] text-[1.125rem] font-bold leading-snug tracking-[-0.02em] text-[#111111] md:text-xl">
            <span className="mr-2" aria-hidden>
              {section.emoji}
            </span>
            {section.title}
          </h2>
        </div>
      </div>

      {section.visual ??
        (section.image ? (
          <ArticleImage
            src={section.image.src}
            alt={section.image.alt}
            className="rounded-none"
          />
        ) : null)}

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
                rank={sectionRank(index, sectionCount, sectionNumbering)}
                total={sectionCount}
                numbering={sectionNumbering}
              />
            ))}
            {footerCta ? <div className="pt-2">{footerCta}</div> : null}
          </div>
        </article>
      </div>
    </div>
  );
}
