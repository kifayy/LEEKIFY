import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCategoryBySlug, getCategories } from "@/lib/supabase/queries/scholarship-categories";
import { getArticlesByCategory } from "@/lib/supabase/queries/scholarships-page";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CategoryCarousel } from "@/components/scholarships/category-carousel";
import { ScholarshipArticleCard } from "@/components/scholarships/scholarship-article-card";
import { ScholarshipHeroSection } from "@/components/scholarships/scholarship-hero-section";

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

  const [articles, categories] = await Promise.all([
    getArticlesByCategory(category),
    getCategories(),
  ]);
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
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="container mx-auto max-w-[1232px] px-4 pt-8 md:px-6 md:pt-12">
        <CategoryCarousel categories={categories} />
      </div>
      {itemListJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
        />
      )}
      <ScholarshipHeroSection
        title={`${cat.name} Scholarships`}
        body={cat.description ?? ""}
        category={cat.name}
      />
      <div className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Scholarships", href: "/scholarships" },
            { label: categoryLabel },
          ]}
        />
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
