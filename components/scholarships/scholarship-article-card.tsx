import Link from "next/link";
import Image from "next/image";
import type { ScholarshipsPageArticle } from "@/lib/supabase/queries/scholarships-page";

const CATEGORY_EMOJI: Record<string, string> = {
  "by-major": "📚",
  "by-state": "🗺️",
  "by-city": "🏙️",
  "by-ethnicity": "🤝",
  "by-gender": "⚧️",
  "by-grade-level": "🎓",
  "by-gpa": "📊",
  "by-deadline": "📅",
  "by-amount": "💰",
  "by-type": "🏷️",
  "by-sport": "⚽",
  "by-interest": "💡",
  "by-career-goal": "🎯",
  "by-school-type": "🏫",
  "by-military": "🎖️",
  "by-disability": "♿",
  "by-religion": "🙏",
  "by-first-generation": "🌟",
  "by-international": "🌍",
  "easy-to-win": "✨",
};

type Props = {
  article: ScholarshipsPageArticle;
  categorySlug: string;
  href: string;
};

export function ScholarshipArticleCard({ article, categorySlug, href }: Props) {
  const emoji = CATEGORY_EMOJI[categorySlug] ?? "📄";
  const dateLabel =
    article.published_at &&
    new Date(article.published_at).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  return (
    <article>
      <Link
        href={href}
        className="group flex gap-4 overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-0 shadow-[0_1px_3px_0_rgba(0,0,0,0.06)] transition-all hover:border-pathpicker-purple/30 hover:shadow-[0_8px_24px_rgba(149,110,254,0.12)] md:gap-6"
        aria-label={`Read: ${article.title}`}
      >
        {/* Thumbnail or emoji accent */}
        <div className="flex h-28 w-24 shrink-0 items-center justify-center bg-gradient-to-br from-pathpicker-purple/10 to-pathpicker-purple/5 md:h-auto md:w-44 md:min-h-[140px]">
          {article.og_image ? (
            <div className="relative h-full w-full">
              <Image
                src={article.og_image}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 96px, 176px"
                unoptimized
              />
            </div>
          ) : (
            <span className="text-4xl md:text-5xl" aria-hidden>
              {emoji}
            </span>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center py-4 pr-4 md:py-5 md:pr-6">
          <h2 className="text-lg font-bold leading-snug text-[#181A1D] transition-colors group-hover:text-pathpicker-purple md:text-xl">
            {article.title}
          </h2>
          {article.meta_description && (
            <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-[#6B7280] md:line-clamp-2">
              {article.meta_description}
            </p>
          )}
          <div className="mt-3 flex flex-wrap items-center gap-3">
            {dateLabel && (
              <time
                dateTime={article.published_at ?? undefined}
                className="text-xs font-medium text-[#9CA3AF]"
              >
                {dateLabel}
              </time>
            )}
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-pathpicker-purple">
              Read guide
              <svg
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
