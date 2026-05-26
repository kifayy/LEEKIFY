import type { ReactNode } from "react";

export type InfoArticleSection = {
  emoji: string;
  title: string;
  paragraphs: string[];
  image?: { src: string; alt: string };
  visual?: ReactNode;
};

type InfoArticlePageProps = {
  emoji: string;
  title: string;
  subtitle?: string;
  lead: string[];
  sections: InfoArticleSection[];
  heroImage?: { src: string; alt: string };
  leadVisual?: ReactNode;
};

function ArticleImage({ src, alt, priority }: { src: string; alt: string; priority?: boolean }) {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-100">
      {/* Native img — article hero/section photos are external CDN URLs (Pexels). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    </div>
  );
}

export function InfoArticlePage({
  emoji,
  title,
  subtitle,
  lead,
  sections,
  heroImage,
  leadVisual,
}: InfoArticlePageProps) {
  return (
    <div className="w-full min-w-0 overflow-hidden py-8 md:py-16">
      <div className="container mx-auto max-w-2xl px-4 md:px-6 min-w-0">
        <article
          className="flex flex-col gap-8 rounded-2xl bg-white p-6 md:gap-10 md:p-10"
          style={{
            boxShadow: "0 8px 24px rgba(149,110,254,0.12), 0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <header className="space-y-4">
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-[#181A1D] md:text-[1.75rem] md:leading-snug">
              <span className="mr-2" aria-hidden>
                {emoji}
              </span>
              {title}
            </h1>
            {subtitle ? (
              <p className="text-base leading-relaxed text-[#181A1D]/75 md:text-lg">{subtitle}</p>
            ) : null}
            {heroImage ? <ArticleImage src={heroImage.src} alt={heroImage.alt} priority /> : null}
            {leadVisual}
            <div className="space-y-3 rounded-xl border border-[#956EFE]/15 bg-[#956EFE]/5 px-4 py-4 md:px-5 md:py-5">
              {lead.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="text-[15px] leading-relaxed text-[#181A1D]/90 md:text-base">
                  {paragraph}
                </p>
              ))}
            </div>
          </header>

          <div className="space-y-8 md:space-y-10">
            {sections.map((section, index) => (
              <section key={section.title} className="space-y-4">
                <h2 className="text-lg font-bold leading-snug text-[#181A1D] md:text-xl">
                  <span className="mr-2" aria-hidden>
                    {section.emoji}
                  </span>
                  {index + 1}. {section.title}
                </h2>
                {section.visual ??
                  (section.image ? (
                    <ArticleImage src={section.image.src} alt={section.image.alt} />
                  ) : null)}
                <div className="space-y-3">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 48)}
                      className="text-[15px] leading-relaxed text-[#181A1D]/85 md:text-base"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}
