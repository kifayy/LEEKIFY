import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getArticleByCategoryAndSlug, getSimilarArticles } from "@/lib/supabase/queries/scholarships-page";
import type { FAQItem } from "@/lib/supabase/queries/scholarships-page";
import { getRandomSweepstakeScholarships } from "@/lib/supabase/queries/scholarships";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ScholarshipCard } from "@/components/scholarships/scholarship-card";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "");

function formatDate(date: string | null): string {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim().slice(0, 140);
}

type TocItem = { id: string; text: string; level: 2 | 3 };

/** Extract h2/h3 from HTML, add id attributes, return TOC and modified HTML. */
function buildToc(html: string): { contentWithIds: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const used = new Set<string>();
  const slugify = (s: string) =>
    s
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9-]/g, "")
      .toLowerCase()
      .slice(0, 60) || "section";
  const makeId = (text: string): string => {
    let id = slugify(text);
    if (used.has(id)) {
      let n = 1;
      while (used.has(`${id}-${n}`)) n++;
      id = `${id}-${n}`;
    }
    used.add(id);
    return id;
  };
  const contentWithIds = html.replace(/<h([23])>([\s\S]*?)<\/h\1>/gi, (_, level, inner) => {
    const text = inner.replace(/<[^>]+>/g, "").trim();
    const id = makeId(text);
    toc.push({ id, text, level: parseInt(level, 10) as 2 | 3 });
    return `<h${level} id="${id}">${inner}</h${level}>`;
  });
  return { contentWithIds, toc };
}

type Props = { params: Promise<{ category: string; slug: string }> };

/** Dynamic hero image (template + article title). Used for hero and SEO. */
function getArticleHeroImageUrl(slug: string, title: string, siteUrl: string): string {
  const slugQ = encodeURIComponent(slug);
  const titleQ = encodeURIComponent(title);
  const base = siteUrl ? `${siteUrl}/api/article-hero` : "/api/article-hero";
  return `${base}?slug=${slugQ}&title=${titleQ}`;
}

export async function generateMetadata({ params }: Props) {
  const { category, slug } = await params;
  const article = await getArticleByCategoryAndSlug(category, slug);
  if (!article) return { title: "Article | Pathpicker" };
  const heroImage = getArticleHeroImageUrl(slug, article.title, SITE_URL);
  const canonicalPath = article.canonical_url?.startsWith("http")
    ? article.canonical_url
    : article.canonical_url || `/scholarships/${category}/${slug}`;
  const canonicalUrl =
    canonicalPath.startsWith("http") ? canonicalPath : SITE_URL ? `${SITE_URL}${canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`}` : undefined;
  const ogImage = article.og_image ?? heroImage;
  const fullOgImage = ogImage.startsWith("http") ? ogImage : SITE_URL ? `${SITE_URL}${ogImage}` : undefined;
  return {
    title: article.meta_title ?? `${article.title} | Pathpicker`,
    description: article.meta_description ?? undefined,
    alternates: canonicalUrl ? { canonical: canonicalUrl } : undefined,
    openGraph: {
      type: "article",
      title: article.meta_title ?? article.title,
      description: article.meta_description ?? undefined,
      images: fullOgImage ? [{ url: fullOgImage, width: 1280, height: 582, alt: article.title }] : undefined,
      publishedTime: article.published_at ?? undefined,
      modifiedTime: article.updated_at ?? undefined,
      siteName: "Pathpicker",
    },
    twitter: {
      card: "summary_large_image",
      title: article.meta_title ?? article.title,
      description: article.meta_description ?? undefined,
      images: fullOgImage ? [fullOgImage] : undefined,
    },
  };
}

async function ArticleContent({ params }: Props) {
  const { category, slug } = await params;
  const article = await getArticleByCategoryAndSlug(category, slug);
  if (!article) notFound();

  const [sweepstakes, similar] = await Promise.all([
    getRandomSweepstakeScholarships(4),
    getSimilarArticles(category, article.id, 3),
  ]);
  const items = sweepstakes.map((scholarship) => ({ scholarship, ai_description: null as string | null }));

  const categoryLabel = article.category_slug
    ? article.category_slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "Scholarships";

  const articleUrl = SITE_URL ? `${SITE_URL}/scholarships/${category}/${slug}` : "";
  const heroImageUrl = getArticleHeroImageUrl(slug, article.title, SITE_URL);
  const articleSchema = SITE_URL
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.meta_description ?? undefined,
        image: article.og_image ?? heroImageUrl,
        datePublished: article.published_at ?? undefined,
        dateModified: article.updated_at ?? article.published_at ?? undefined,
        author: { "@type": "Organization", name: "Pathpicker" },
        publisher: { "@type": "Organization", name: "Pathpicker" },
        mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
      }
    : null;

  const faqItems: FAQItem[] = Array.isArray(article.faq)
    ? article.faq.filter((q): q is FAQItem => q && typeof q === "object" && "question" in q && "answer" in q)
    : [];
  const faqSchema =
    faqItems.length > 0 && SITE_URL
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map(({ question, answer }) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: { "@type": "Answer", text: answer },
          })),
        }
      : null;

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto max-w-[1280px] px-4 py-8 md:px-6 md:py-12">
        {articleSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
          />
        )}
        {faqSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
        )}
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Scholarships", href: "/scholarships" },
            { label: categoryLabel, href: article.category_slug ? `/scholarships/${article.category_slug}` : undefined },
            { label: article.title },
          ]}
        />

        <article>
          {/* Header: category, title, meta */}
          <header className="mx-auto mt-8 max-w-[843px]">
            {article.category_slug && (
              <p className="mb-3 text-sm font-medium text-[#181A1D]">{categoryLabel}</p>
            )}
            <h1 className="text-3xl font-bold tracking-tight text-[#181A1D] md:text-4xl md:leading-tight">
              {article.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#6E6E73]">
              {article.published_at && (
                <time dateTime={article.published_at}>Posted on {formatDate(article.published_at)}</time>
              )}
              {article.published_at && <span aria-hidden>·</span>}
              <span>By Pathpicker</span>
            </div>
          </header>

          {/* Summary (answer at top) - AI-overview friendly */}
          {article.summary && (
            <div className="mx-auto mt-6 max-w-[843px] rounded-lg border border-[#E5E5E7] bg-[#FAFAFA] px-5 py-4">
              <p className="text-[#181A1D] leading-relaxed">{article.summary}</p>
            </div>
          )}

          {/* Hero image: dynamic template with article title (SEO-friendly image) */}
          <div className="relative mt-8 aspect-[1280/582] w-full overflow-hidden rounded-lg bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/api/article-hero?slug=${encodeURIComponent(slug)}&title=${encodeURIComponent(article.title)}`}
              alt={article.title}
              className="h-full w-full object-cover"
              width={1280}
              height={582}
            />
          </div>

          {/* Table of contents + body in a row on desktop when TOC has items */}
          {article.content && (() => {
            const { contentWithIds, toc } = buildToc(article.content);
            const hasToc = toc.length > 0;
            return (
              <div
                className={`mx-auto mt-10 ${hasToc ? "max-w-[843px] lg:flex lg:max-w-[1280px] lg:gap-12" : "max-w-[843px]"}`}
              >
                {hasToc && (
                  <nav
                    aria-label="Table of contents"
                    className="mb-8 shrink-0 lg:sticky lg:top-8 lg:mb-0 lg:w-56 lg:self-start"
                  >
                    <h2 className="text-sm font-semibold uppercase tracking-wide text-[#6E6E73]">
                      On this page
                    </h2>
                    <ul className="mt-3 space-y-2 border-l-2 border-[#E5E5E7] pl-4" role="list">
                      {toc.map((item) => (
                        <li key={item.id} className={item.level === 3 ? "pl-3" : ""}>
                          <a
                            href={`#${item.id}`}
                            className="text-sm text-[#6E6E73] underline-offset-2 hover:text-[#7C4EE4] hover:underline"
                          >
                            {item.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}
                <div
                  className={`prose prose-neutral min-w-0 [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[#181A1D] [&_h2]:scroll-mt-24 [&_h3]:scroll-mt-24 [&_p]:mb-4 [&_p]:leading-relaxed [&_ul]:my-6 [&_ul]:list-inside [&_ul]:list-disc [&_ul]:space-y-2 [&_li]:mb-1 [&_a]:font-medium [&_a]:text-[#7C4EE4] [&_a]:underline [&_a]:underline-offset-2 [&_a]:transition-colors hover:[&_a]:text-[#6B3ED4] ${hasToc ? "lg:max-w-[643px]" : ""}`}
                  dangerouslySetInnerHTML={{ __html: contentWithIds }}
                />
              </div>
            );
          })()}

          {/* Internal links – explore more */}
          <section className="mx-auto mt-12 max-w-[843px]" aria-label="Explore more">
            <h2 className="text-xl font-bold text-[#181A1D] md:text-2xl">Explore more</h2>
            <ul className="mt-4 flex flex-wrap gap-3" role="list">
              <li>
                <Link
                  href="/scholarships"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#E5E5E7] bg-white px-4 py-2.5 text-sm font-medium text-[#181A1D] transition-colors hover:border-[#7C4EE4] hover:bg-[#7C4EE4]/5 hover:text-[#7C4EE4]"
                >
                  Browse all scholarships
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </li>
              {article.category_slug && (
                <li>
                  <Link
                    href={`/scholarships/${article.category_slug}`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#E5E5E7] bg-white px-4 py-2.5 text-sm font-medium text-[#181A1D] transition-colors hover:border-[#7C4EE4] hover:bg-[#7C4EE4]/5 hover:text-[#7C4EE4]"
                  >
                    {categoryLabel} guides
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </li>
              )}
              <li>
                <Link
                  href="/scholarships"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#E5E5E7] bg-white px-4 py-2.5 text-sm font-medium text-[#181A1D] transition-colors hover:border-[#7C4EE4] hover:bg-[#7C4EE4]/5 hover:text-[#7C4EE4]"
                >
                  Browse scholarships
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </li>
              <li>
                <Link
                  href="/archetype-quiz"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#E5E5E7] bg-white px-4 py-2.5 text-sm font-medium text-[#181A1D] transition-colors hover:border-[#7C4EE4] hover:bg-[#7C4EE4]/5 hover:text-[#7C4EE4]"
                >
                  Find your archetype
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </li>
            </ul>
          </section>

          {/* FAQ block - visible + FAQPage schema */}
          {faqItems.length > 0 && (
            <section className="mx-auto mt-16 max-w-[843px]" aria-labelledby="faq-heading">
              <h2 id="faq-heading" className="text-2xl font-bold text-[#181A1D] md:text-3xl">
                FAQs
              </h2>
              <ul className="mt-6 space-y-6" role="list">
                {faqItems.map((item, i) => (
                  <li key={i} className="border-b border-[#E5E5E7] pb-6 last:border-0 last:pb-0">
                    <h3 className="text-lg font-semibold text-[#181A1D]">{item.question}</h3>
                    <p className="mt-2 text-[#6E6E73] leading-relaxed">{item.answer}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Scholarships section - suggested scholarships (same card style as index) */}
          {items.length > 0 && (
            <section className="mx-auto mt-16 max-w-[1280px]">
              <h2 className="text-2xl font-bold text-[#181A1D] md:text-3xl">Recommend Scholarships</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {items.map(({ scholarship, ai_description }) => (
                  <ScholarshipCard
                    key={scholarship.id}
                    scholarship={scholarship}
                    descriptionSnippet={ai_description}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Similar articles */}
          {similar.length > 0 && (
            <section className="mx-auto mt-16 max-w-[1280px] border-t border-[#E5E5E7] pt-12">
              <h2 className="text-2xl font-bold text-[#181A1D] md:text-3xl">Similar articles</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {similar.map((a) => {
                  const similarHref = a.category_slug ? `/scholarships/${a.category_slug}/${a.slug}` : "#";
                  const similarImageUrl = `/api/article-hero?slug=${encodeURIComponent(a.slug ?? "")}&title=${encodeURIComponent(a.title ?? "")}`;
                  return (
                  <Link
                    key={a.id}
                    href={similarHref}
                    className="group block overflow-hidden"
                  >
                    <div className="relative flex aspect-[405/318] w-full items-center justify-center overflow-hidden rounded-t-2xl bg-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={similarImageUrl}
                        alt={a.title}
                        className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="mt-4">
                      {a.published_at && (
                        <p className="text-xs text-[#999999]">{formatDate(a.published_at)}</p>
                      )}
                      <h3 className="mt-2 font-semibold text-[#181A1D] line-clamp-2 group-hover:text-[#7C4EE4]">
                        {a.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-[#6E6E73]">
                        {a.meta_description ?? (a.content ? stripHtml(a.content) : "")}
                      </p>
                    </div>
                  </Link>
                  );
                })}
              </div>
            </section>
          )}
        </article>

        <p className="mt-12">
          <Link
            href={`/scholarships/${category}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-[#6E6E73] transition-colors hover:text-[#181A1D]"
          >
            ← Back to {category.replace(/-/g, " ")}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function ScholarshipArticlePage(props: Props) {
  return (
    <Suspense fallback={<div className="container mx-auto max-w-3xl px-4 py-12 text-muted-foreground">Loading…</div>}>
      <ArticleContent {...props} />
    </Suspense>
  );
}
