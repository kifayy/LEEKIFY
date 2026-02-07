import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticleBySlug } from "@/lib/supabase/queries/scholarships-page";
import { getScholarshipsForArticle } from "@/lib/supabase/queries/scholarships";
import { Card, CardContent } from "@/components/ui/card";

function formatDeadline(deadline: string | null): string {
  if (!deadline) return "No deadline";
  const d = new Date(deadline);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Article | Pathpicker" };
  return {
    title: article.meta_title ?? `${article.title} | Pathpicker`,
    description: article.meta_description ?? undefined,
    openGraph: article.og_image ? { images: [article.og_image] } : undefined,
  };
}

async function ArticleContent({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const scholarships = await getScholarshipsForArticle(article.id, article.auto_tag);

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 md:py-16">
      <article>
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-[#181A1D] md:text-4xl">{article.title}</h1>
        </header>
        {article.content && (
          <div
            className="space-y-4 text-foreground [&_h2]:mt-6 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[#181A1D] [&_p]:leading-relaxed [&_ul]:list-inside [&_ul]:list-disc [&_a]:text-pathpicker-purple [&_a]:underline"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        )}
        {scholarships.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-bold text-[#181A1D] md:text-2xl">Scholarships</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {scholarships.map((s) => (
                <li key={s.id}>
                  <Link href={`/scholarships/${s.slug}`} className="block active:opacity-95">
                    <Card className="h-full overflow-hidden transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] active:scale-[0.99]">
                      <div className="relative aspect-video w-full bg-muted">
                        {s.image_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={s.image_url} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full items-center justify-center text-muted-foreground">
                            {s.provider.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold line-clamp-2">{s.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{s.provider}</p>
                        {s.amount && (
                          <p className="mt-1 text-sm font-medium text-pathpicker-purple">{s.amount}</p>
                        )}
                        <p className="mt-1 text-xs text-muted-foreground">
                          Deadline: {formatDeadline(s.deadline)}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
      <p className="mt-8">
        <Link href="/scholarships/articles" className="text-sm text-muted-foreground hover:underline">
          ← Back to articles
        </Link>
      </p>
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
