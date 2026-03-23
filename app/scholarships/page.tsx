import { Suspense } from "react";
import Link from "next/link";
import { getAllScholarships } from "@/lib/supabase/queries/scholarships";
import { getCategories } from "@/lib/supabase/queries/scholarship-categories";
import { getRandomPublishedArticles } from "@/lib/supabase/queries/scholarships-page";
import { getBaseUrlForMetadata } from "@/lib/metadata-base-url";
import { CategoryCarousel } from "@/components/scholarships/category-carousel";
import { ScholarshipCard } from "@/components/scholarships/scholarship-card";
import { ArticleCardImage } from "@/components/scholarships/article-card-image";
import { FeaturedScholarshipsSection } from "@/components/home/featured-scholarships-section";

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim().slice(0, 140);
}

export async function generateMetadata() {
  const baseUrl = await getBaseUrlForMetadata();
  return {
    title: "Scholarships | Pathpicker",
    description:
      "Browse featured scholarships for students. Find opportunities matched to your profile and apply with ease.",
    alternates: { canonical: `${baseUrl}/scholarships` },
  };
}

async function ScholarshipsPageContent() {
  const [scholarshipsResult, categories, articles] = await Promise.all([
    getAllScholarships(),
    getCategories(),
    getRandomPublishedArticles(9),
  ]);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="container mx-auto max-w-[1232px] px-4 pt-8 md:px-6 md:pt-12">
        <CategoryCarousel categories={categories} />
      </div>
      <Suspense fallback={<div className="w-full min-w-0 overflow-x-hidden py-10 md:py-20" style={{ backgroundColor: "rgb(243, 250, 250)" }}><div className="container mx-auto max-w-6xl px-4 md:px-6 min-w-0 py-8 text-center text-sm text-[#181A1D]/60">Loading featured scholarships…</div></div>}>
        <FeaturedScholarshipsSection />
      </Suspense>
      <div className="container mx-auto max-w-[1232px] px-4 py-8 md:px-6 md:py-12">

        {/* Featured / recent scholarships */}
        {scholarshipsResult.length > 0 && (
          <section>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 xl:gap-8">
              {scholarshipsResult.map((s) => (
                <ScholarshipCard key={s.id} scholarship={s} />
              ))}
            </div>
          </section>
        )}

        {/* Scholarship articles */}
        {articles.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-[#333333]">Scholarship guides & articles</h2>
            <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => (
                <li key={a.id}>
                  <Link
                    href={a.category_slug ? `/scholarships/${a.category_slug}/${a.slug}` : "#"}
                    className="group block overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="relative aspect-[400/270] w-full overflow-hidden rounded-t-2xl bg-white">
                      <ArticleCardImage
                        primarySrc={a.og_image}
                        fallbackSrc={`/api/article-hero?slug=${encodeURIComponent(a.slug ?? "")}&title=${encodeURIComponent(a.title ?? "")}`}
                        alt=""
                        className="size-full min-w-0 object-contain object-center transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      {a.category_slug && (
                        <span className="text-xs font-medium uppercase tracking-wide text-[#7C4EE4]">
                          {a.category_slug.replace(/-/g, " ")}
                        </span>
                      )}
                      <h3 className="mt-2 font-semibold text-[#333333] line-clamp-2">{a.title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm text-[#666666]">
                        {a.meta_description ?? (a.content ? stripHtml(a.content) : "")}…
                      </p>
                      <span className="mt-3 inline-block text-sm font-medium text-[#7C4EE4]">
                        Read more
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {scholarshipsResult.length === 0 && articles.length === 0 && (
          <p className="mt-12 text-center text-[#666666]">
            No scholarships at the moment. Check back soon.
          </p>
        )}
      </div>
    </div>
  );
}

export default function ScholarshipsPage() {
  return (
    <Suspense fallback={<div className="container mx-auto max-w-5xl px-4 py-12 text-center text-[#666666]">Loading…</div>}>
      <ScholarshipsPageContent />
    </Suspense>
  );
}
