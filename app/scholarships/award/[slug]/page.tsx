import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getScholarshipBySlug, getSweepstakeScholarships } from "@/lib/supabase/queries/scholarships";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ScholarshipCard } from "@/components/scholarships/scholarship-card";

function formatDeadline(deadline: string | null): string {
  if (!deadline) return "Rolling";
  const d = new Date(deadline);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function formatAmount(amount: string | null): string | null {
  if (!amount) return null;
  const cleaned = amount.replace(/[^0-9.]/g, "");
  if (!cleaned) return amount;
  const num = parseFloat(cleaned);
  if (isNaN(num)) return amount;
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(num);
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const scholarship = await getScholarshipBySlug(slug);
  if (!scholarship) return { title: "Scholarship | Pathpicker" };
  const title = `${scholarship.title} | Pathpicker`;
  const description = `${scholarship.provider} – ${scholarship.amount ?? "Scholarship"}. Deadline: ${formatDeadline(scholarship.deadline)}.`;
  return {
    title,
    description,
    openGraph: { title, description, siteName: "Pathpicker" },
    twitter: { card: "summary_large_image" as const, title, description },
  };
}

async function ScholarshipDetail({ params }: Props) {
  const { slug } = await params;
  const scholarship = await getScholarshipBySlug(slug);
  if (!scholarship) notFound();

  const related = (await getSweepstakeScholarships(12))
    .filter((s) => s.id !== scholarship.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="container mx-auto max-w-[1232px] px-4 py-8 md:px-6 md:py-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Scholarships", href: "/scholarships" },
            { label: scholarship.title },
          ]}
        />

        <article className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="p-6 md:p-10">
            {/* Meta badges */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#F3EEFE] px-3 py-1 text-sm font-medium text-[#5B4B8A]">
                {scholarship.provider}
              </span>
              <span className="rounded-full bg-[#F5F5F5] px-3 py-1 text-sm text-[#666666]">
                Deadline: {formatDeadline(scholarship.deadline)}
              </span>
            </div>

            {/* Title + Amount row */}
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
              <h1 className="text-2xl font-bold tracking-tight text-[#181A1D] md:text-3xl md:leading-tight">
                {scholarship.title}
              </h1>
              {scholarship.amount && (
                <span className="shrink-0 text-2xl font-bold text-[#7C4EE4] md:text-3xl">
                  {formatAmount(scholarship.amount) ?? scholarship.amount}
                </span>
              )}
            </div>

            {/* CTA */}
            <div className="mb-8 flex flex-wrap gap-3">
              <a
                href="https://joinawarded.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 min-w-[200px] items-center justify-center rounded-xl bg-[#7C4EE4] px-10 text-lg font-semibold text-white shadow-sm transition-all hover:bg-[#6B3ED4] hover:shadow"
              >
                Enter
              </a>
              {scholarship.external_link && (
                <a
                  href={scholarship.external_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-14 items-center justify-center rounded-xl border-2 border-[#7C4EE4] bg-transparent px-8 text-base font-semibold text-[#7C4EE4] transition-all hover:bg-[#F3EEFE]"
                >
                  Apply or learn more
                </a>
              )}
            </div>

            {/* Short description */}
            {scholarship.description_short && (
              <p className="mb-6 text-lg leading-relaxed text-[#4A4A4A]">
                {scholarship.description_short}
              </p>
            )}

            {/* Highlights as pills */}
            {(scholarship.highlight_1 || scholarship.highlight_2 || scholarship.highlight_3 || scholarship.highlight_4 || scholarship.highlight_5) && (
              <div className="mb-8 flex flex-wrap gap-2">
                {[scholarship.highlight_1, scholarship.highlight_2, scholarship.highlight_3, scholarship.highlight_4, scholarship.highlight_5]
                  .filter(Boolean)
                  .map((h, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center rounded-lg border border-[#E8E4F3] bg-[#FAF9FE] px-4 py-2 text-sm font-medium text-[#5B4B8A]"
                    >
                      {h}
                    </span>
                  ))}
              </div>
            )}

            {/* Requirements summary */}
            {scholarship.requirements_summary && (
              <div className="mb-8 rounded-xl border border-[#EEEEEE] bg-[#FAFAFA] p-6">
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#888888]">Eligibility</h2>
                <p className="text-[#4A4A4A] leading-relaxed">{scholarship.requirements_summary}</p>
              </div>
            )}

            {/* Body content */}
            {scholarship.content && (
              <div
                className="space-y-6 border-t border-[#EEEEEE] pt-8 text-[#4A4A4A] [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[#181A1D] [&_p]:leading-relaxed [&_ul]:list-inside [&_ul]:list-disc [&_a]:text-[#7C4EE4] [&_a]:underline"
                dangerouslySetInnerHTML={{ __html: scholarship.content }}
              />
            )}
          </div>
        </article>

        {/* Popular / Related scholarships */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 text-xl font-bold text-[#181A1D]">Related scholarships</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {related.map((s) => (
                <ScholarshipCard key={s.id} scholarship={s} />
              ))}
            </div>
          </section>
        )}

        <p className="mt-12">
          <Link
            href="/scholarships"
            className="inline-flex items-center gap-1 text-sm font-medium text-[#666666] transition-colors hover:text-[#181A1D]"
          >
            ← Back to scholarships
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function ScholarshipDetailPage(props: Props) {
  return (
    <Suspense fallback={<div className="container mx-auto max-w-3xl px-4 py-12 text-muted-foreground">Loading…</div>}>
      <ScholarshipDetail {...props} />
    </Suspense>
  );
}
