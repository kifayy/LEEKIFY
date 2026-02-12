import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticleByCategoryAndSlug, getSimilarArticles } from "@/lib/supabase/queries/scholarships-page";
import { getScholarshipsForArticle } from "@/lib/supabase/queries/scholarships";
import { Breadcrumbs } from "@/components/breadcrumbs";

function formatDate(date: string | null): string {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function formatDeadline(deadline: string | null): string {
  if (!deadline) return "Rolling";
  const d = new Date(deadline);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim().slice(0, 140);
}

function formatAmount(amount: string | null): string | null {
  if (!amount) return null;
  const cleaned = amount.replace(/[^0-9.]/g, "");
  if (!cleaned) return amount;
  const num = parseFloat(cleaned);
  if (isNaN(num)) return amount;
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(num);
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

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto max-w-[1280px] px-4 py-8 md:px-6 md:py-12">
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

          {/* Scholarships section - linked awards (slugs) */}
          {items.length > 0 && (
            <section className="mx-auto mt-16 max-w-[1280px]">
              <h2 className="text-2xl font-bold text-[#181A1D] md:text-3xl">Scholarships</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map(({ scholarship: s, ai_description }) => (
                  <Link
                    key={s.id}
                    href={`/scholarships/award/${s.slug}`}
                    className="group block overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="relative aspect-[405/318] w-full overflow-hidden rounded-t-2xl bg-[#CCE8FF]">
                      {s.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={s.image_url}
                          alt=""
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-5xl">
                          🎓
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <p className="text-xs text-[#999999]">{formatDeadline(s.deadline)}</p>
                      {s.amount && (
                        <p className="mt-2 text-xl font-bold text-[#7C4EE4]">
                          {formatAmount(s.amount) ?? s.amount}
                        </p>
                      )}
                      <h3 className="mt-2 font-semibold text-[#181A1D] line-clamp-2">{s.title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm text-[#6E6E73]">
                        {ai_description ? stripHtml(ai_description) : s.description_short ?? s.provider}
                      </p>
                    </div>
                  </Link>
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
