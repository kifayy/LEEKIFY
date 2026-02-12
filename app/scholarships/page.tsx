import { Suspense } from "react";
import Link from "next/link";
import { getScholarshipsForMonth, getFeaturedScholarships, getAllScholarships } from "@/lib/supabase/queries/scholarships";
import { getCategories } from "@/lib/supabase/queries/scholarship-categories";
import { getRandomPublishedArticles } from "@/lib/supabase/queries/scholarships-page";
import { CategoryCarousel } from "@/components/scholarships/category-carousel";
import { NewsletterCTA } from "@/components/newsletter-cta";

function formatDeadline(deadline: string | null): string {
  if (!deadline) return "No deadline";
  const d = new Date(deadline);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim().slice(0, 140);
}

export const metadata = {
  title: "Scholarships | Pathpicker",
  description:
    "Browse featured scholarships for students. Find opportunities matched to your profile and apply with ease.",
};

async function ScholarshipsPageContent() {
  const [scholarshipsResult, categories, articles] = await Promise.all([
    (async () => {
      let s = await getScholarshipsForMonth();
      if (s.length === 0) s = await getFeaturedScholarships();
      if (s.length === 0) s = await getAllScholarships();
      return s;
    })(),
    getCategories(),
    getRandomPublishedArticles(9),
  ]);

  const recent = scholarshipsResult[0];

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="container mx-auto max-w-[1232px] px-4 py-8 md:px-6 md:py-12">
        <CategoryCarousel categories={categories} />

        {/* Our Recent Post */}
        {recent && (
          <section className="mt-8">
            <h2 className="text-2xl font-bold text-[#333333] md:text-3xl">
              Our Recent Post
            </h2>
            <Link
              href={`/scholarships/award/${recent.slug}`}
              className="mt-4 flex flex-col gap-6 overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md md:flex-row"
            >
              <div className="relative h-[280px] w-full overflow-hidden rounded-t-2xl bg-[#CCE8FF] md:h-[360px] md:w-[48%] md:rounded-l-2xl md:rounded-tr-none">
                {recent.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={recent.image_url}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-5xl">
                    🎓
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
                <div className="flex items-center gap-4 text-sm">
                  <span className="font-medium text-[#333333]">{recent.provider}</span>
                  <span className="text-[#999999]">{formatDeadline(recent.deadline)}</span>
                </div>
                <h3 className="mt-3 text-xl font-bold text-[#333333] md:text-2xl line-clamp-2">
                  {recent.title}
                </h3>
                <p className="mt-3 text-[#666666] line-clamp-3">
                  {recent.content ? stripHtml(recent.content) : `${recent.provider} – ${recent.amount ?? "Scholarship"}`}
                </p>
              </div>
            </Link>
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
                    <div className="relative aspect-[400/360] w-full overflow-hidden rounded-t-2xl bg-[#CCE8FF]">
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

      <NewsletterCTA variant="want-scholarships" />
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
