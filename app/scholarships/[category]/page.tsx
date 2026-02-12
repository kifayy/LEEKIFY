import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCategoryBySlug } from "@/lib/supabase/queries/scholarship-categories";
import { getArticlesByCategory } from "@/lib/supabase/queries/scholarships-page";
import { Breadcrumbs } from "@/components/breadcrumbs";

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const cat = await getCategoryBySlug(category);
  if (!cat) return { title: "Category | Pathpicker" };
  return {
    title: cat.meta_title ?? `${cat.name} Scholarships | Pathpicker`,
    description: cat.meta_description ?? cat.description ?? undefined,
  };
}

async function CategoryContent({ params }: Props) {
  const { category } = await params;
  const cat = await getCategoryBySlug(category);
  if (!cat) notFound();

  const articles = await getArticlesByCategory(category);

  const categoryLabel = cat.name;
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Scholarships", href: "/scholarships" },
          { label: categoryLabel },
        ]}
      />
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-[#181A1D] md:text-4xl">{cat.name} Scholarships</h1>
        {cat.description && (
          <p className="mt-2 text-muted-foreground">{cat.description}</p>
        )}
      </header>
      {articles.length === 0 ? (
        <p className="text-muted-foreground">No articles in this category yet. Check back soon.</p>
      ) : (
        <ul className="space-y-4">
          {articles.map((a) => (
            <li key={a.id}>
              <Link
                href={`/scholarships/${category}/${a.slug}`}
                className="block rounded-2xl border border-black/[0.08] bg-white p-4 shadow-[0_1px_3px_0_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
              >
                <h2 className="font-semibold">{a.title}</h2>
                {a.meta_description && (
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{a.meta_description}</p>
                )}
                {a.published_at && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    {new Date(a.published_at).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-10">
        <Link href="/scholarships" className="text-sm text-muted-foreground hover:underline">
          ← Back to scholarships
        </Link>
      </p>
    </div>
  );
}

export default function CategoryPage(props: Props) {
  return (
    <Suspense fallback={<div className="container mx-auto max-w-4xl px-4 py-12 text-center text-muted-foreground">Loading…</div>}>
      <CategoryContent {...props} />
    </Suspense>
  );
}
