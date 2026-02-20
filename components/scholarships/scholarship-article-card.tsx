import Link from "next/link";
import type { ScholarshipsPageArticle } from "@/lib/supabase/queries/scholarships-page";

/** Preview image: use dynamic hero so listing always has a working image. */
function getArticlePreviewImageUrl(article: ScholarshipsPageArticle): string {
  const slug = encodeURIComponent(article.slug ?? "");
  const title = encodeURIComponent(article.title ?? "");
  return `/api/article-hero?slug=${slug}&title=${title}`;
}

type Props = {
  article: ScholarshipsPageArticle;
  categorySlug: string;
  href: string;
};

export function ScholarshipArticleCard({ article, href }: Props) {
  const dateLabel =
    article.published_at &&
    new Date(article.published_at).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  const imageUrl = getArticlePreviewImageUrl(article);

  return (
    <article>
      <Link
        href={href}
        className="group flex flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.06)] transition-all hover:border-pathpicker-purple/40 hover:shadow-[0_8px_30px_rgba(149,110,254,0.15)] md:flex-row"
        aria-label={`Read: ${article.title}`}
      >
        {/* Preview image: same hero as article page; object-contain so title on image isn't cropped */}
        <div className="relative flex w-full shrink-0 items-center justify-center overflow-hidden bg-white aspect-[1280/582] md:w-[400px] md:flex-shrink-0 md:rounded-l-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt=""
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            width={400}
            height={183}
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center px-5 py-5 md:min-w-[200px] md:px-6 md:py-6">
          <h2 className="break-words text-lg font-bold leading-snug text-[#181A1D] transition-colors group-hover:text-pathpicker-purple md:text-xl">
            {article.title}
          </h2>
          {article.meta_description && (
            <p className="mt-2 line-clamp-2 break-words text-sm leading-relaxed text-[#6B7280]">
              {article.meta_description}
            </p>
          )}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {dateLabel && (
              <time
                dateTime={article.published_at ?? undefined}
                className="text-xs font-medium text-[#9CA3AF]"
              >
                {dateLabel}
              </time>
            )}
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-pathpicker-purple">
              Read guide
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
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
