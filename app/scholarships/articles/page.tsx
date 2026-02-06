import { Suspense } from "react";
import Link from "next/link";
import { getAllPublishedArticles } from "@/lib/supabase/queries/scholarships-page";

function formatDate(published_at: string | null): string {
  if (!published_at) return "";
  const d = new Date(published_at);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export const metadata = {
  title: "Scholarship Guides & Articles | Pathpicker",
  description:
    "Guides and roundups for students: best scholarships by major, application tips, and more.",
};

async function ArticlesList() {
  const articles = await getAllPublishedArticles();

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 md:py-16">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Scholarship guides & articles</h1>
      <p className="mt-2 text-muted-foreground">
        Curated lists and guides to help you find and win scholarships.
      </p>
      {articles.length === 0 ? (
        <p className="mt-8 text-muted-foreground">No articles yet. Check back soon.</p>
      ) : (
        <ul className="mt-8 space-y-4">
          {articles.map((a) => (
            <li key={a.id}>
              <Link
                href={`/scholarships/articles/${a.slug}`}
                className="block rounded-2xl border border-black/[0.08] bg-white p-4 shadow-[0_1px_3px_0_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
              >
                <h2 className="font-semibold">{a.title}</h2>
                {a.published_at && (
                  <p className="mt-1 text-sm text-muted-foreground">{formatDate(a.published_at)}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-8">
        <Link href="/scholarships" className="text-sm text-muted-foreground hover:underline">
          ← Back to scholarships
        </Link>
      </p>
    </div>
  );
}

export default function ScholarshipsArticlesPage() {
  return (
    <Suspense fallback={<div className="container mx-auto max-w-3xl px-4 py-12 text-center text-muted-foreground">Loading…</div>}>
      <ArticlesList />
    </Suspense>
  );
}
