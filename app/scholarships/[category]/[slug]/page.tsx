import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getArticleByCategoryAndSlug, getSimilarArticles } from "@/lib/supabase/queries/scholarships-page";
import type { FAQItem } from "@/lib/supabase/queries/scholarships-page";
import { getScholarshipsForArticle } from "@/lib/supabase/queries/scholarships";
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

type Props = { params: Promise<{ category: string; slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { category, slug } = await params;
  const article = await getArticleByCategoryAndSlug(category, slug);
  if (!article) return { title: "Article | Pathpicker" };
  return {
    title: article.meta_title ?? `${article.title} | Pathpicker`,
    description: article.meta_description ?? undefined,
    openGraph: article.og_image ? { images: [article.og_image] } : undefined,
  };
}

async function ArticleContent({ params }: Props) {
  const { category, slug } = await params;
  const article = await getArticleByCategoryAndSlug(category, slug);
  if (!article) notFound();

  const [items, similar] = await Promise.all([
    getScholarshipsForArticle(article.id, article.auto_tag),
    getSimilarArticles(category, article.id, 3),
  ]);

  const categoryLabel = article.category_slug
    ? article.category_slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "Scholarships";

  const articleUrl = SITE_URL ? `${SITE_URL}/scholarships/${category}/${slug}` : "";
  const articleSchema = SITE_URL
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.meta_description ?? undefined,
        image: article.og_image ?? undefined,
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
            {article.published_at && (
              <p className="mt-4 text-[#6E6E73]">Posted on {formatDate(article.published_at)}</p>
            )}
          </header>

          {/* Summary (answer at top) - AI-overview friendly */}
          {article.summary && (
            <div className="mx-auto mt-6 max-w-[843px] rounded-lg border border-[#E5E5E7] bg-[#FAFAFA] px-5 py-4">
              <p className="text-[#181A1D] leading-relaxed">{article.summary}</p>
            </div>
          )}

          {/* Hero image */}
          {article.og_image && (
            <div className="relative mt-8 aspect-[1280/582] w-full overflow-hidden rounded-lg bg-[#F5F5F5]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.og_image}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          )}

          {/* Body content */}
          {article.content && (
            <div
              className="prose prose-neutral mx-auto mt-10 max-w-[843px] [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[#181A1D] [&_p]:mb-4 [&_p]:leading-relaxed [&_ul]:my-6 [&_ul]:list-inside [&_ul]:list-disc [&_ul]:space-y-2 [&_li]:mb-1 [&_a]:font-medium [&_a]:text-[#7C4EE4] [&_a]:underline [&_a]:underline-offset-2 [&_a]:transition-colors hover:[&_a]:text-[#6B3ED4]"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          )}

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
              <h2 className="text-2xl font-bold text-[#181A1D] md:text-3xl">Scholarships</h2>
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
                {similar.map((a) => (
                  <Link
                    key={a.id}
                    href={a.category_slug ? `/scholarships/${a.category_slug}/${a.slug}` : "#"}
                    className="group block overflow-hidden"
                  >
                    <div className="relative aspect-[405/318] w-full overflow-hidden rounded-t-2xl bg-[#CCE8FF]">
                      {a.og_image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={a.og_image}
                          alt=""
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-5xl">
                          📚
                        </div>
                      )}
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
                ))}
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
