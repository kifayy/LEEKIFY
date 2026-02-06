import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticleBySlug } from "@/lib/supabase/queries/scholarships-page";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Article | Pathpicker" };
  return {
    title: article.meta_title ?? `${article.title} | Pathpicker`,
    description: article.meta_description ?? undefined,
  };
}

async function ArticleContent({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 md:py-16">
      <article>
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{article.title}</h1>
        </header>
        {article.content && (
          <div
            className="space-y-4 text-foreground [&_h2]:mt-6 [&_h2]:text-xl [&_h2]:font-semibold [&_p]:leading-relaxed [&_ul]:list-inside [&_ul]:list-disc [&_a]:text-pathpicker-purple [&_a]:underline"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
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
