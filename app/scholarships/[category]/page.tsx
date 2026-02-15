import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCategoryBySlug } from "@/lib/supabase/queries/scholarship-categories";
import { getArticlesByCategory } from "@/lib/supabase/queries/scholarships-page";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ScholarshipArticleCard } from "@/components/scholarships/scholarship-article-card";

type Props = { params: Promise<{ category: string }> };

const SITE_URL = "https://pathpicker.com";

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

  const itemListJsonLd =
    articles.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `${cat.name} Scholarships`,
          description: cat.description ?? undefined,
          numberOfItems: articles.length,
          itemListElement: articles.map((a, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE_URL}/scholarships/${category}/${a.slug}`,
            name: a.title,
            description: a.meta_description ?? undefined,
            datePublished: a.published_at ?? undefined,
          })),
        }
      : null;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
      {itemListJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
        />
      )}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Scholarships", href: "/scholarships" },
          { label: categoryLabel },
        ]}
      />
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-[#181A1D] md:text-4xl">
          {cat.name} Scholarships
        </h1>
        {cat.description && (
          <p className="mt-2 text-[#6B7280] md:text-lg">{cat.description}</p>
        )}
      </header>
      {articles.length === 0 ? (
        <p className="text-muted-foreground">No articles in this category yet. Check back soon.</p>
      ) : (
        <ul className="space-y-5 md:space-y-6" role="list">
          {articles.map((a) => (
            <li key={a.id}>
              <ScholarshipArticleCard
                article={a}
                categorySlug={category}
                href={`/scholarships/${category}/${a.slug}`}
              />
            </li>
          ))}
        </ul>
      )}
      <p className="mt-10">
        <Link
          href="/scholarships"
          className="inline-flex items-center gap-1 text-sm font-medium text-[#6B7280] transition-colors hover:text-pathpicker-purple hover:underline"
        >
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
