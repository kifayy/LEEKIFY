import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getHostedScholarshipBySlug } from "@/lib/supabase/queries/hosted-scholarships";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { submitApplication } from "./actions";
import { ApplyForm } from "./apply-form";

function formatDeadline(deadline: string | null): string {
  if (!deadline) return "Rolling";
  const d = new Date(deadline);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const scholarship = await getHostedScholarshipBySlug(slug);
  if (!scholarship) return { title: "Apply | Pathpicker" };
  return {
    title: `Apply: ${scholarship.title} | Pathpicker`,
    description: scholarship.description ?? undefined,
  };
}

async function ApplyContent({ params }: Props) {
  const { slug } = await params;
  const scholarship = await getHostedScholarshipBySlug(slug);
  if (!scholarship) notFound();

  const fields = scholarship.form_schema?.fields ?? [];

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="container mx-auto max-w-[640px] px-4 py-8 md:px-6 md:py-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Scholarships", href: "/scholarships" },
            { label: scholarship.title },
          ]}
        />

        <article className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="p-6 md:p-10">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#F3EEFE] px-3 py-1 text-sm font-medium text-[#5B4B8A]">
                PathPicker Scholarship
              </span>
              {scholarship.amount && (
                <span className="rounded-full bg-[#F5F5F5] px-3 py-1 text-sm font-semibold text-[#7C4EE4]">
                  {scholarship.amount}
                </span>
              )}
              <span className="rounded-full bg-[#F5F5F5] px-3 py-1 text-sm text-[#666666]">
                Deadline: {formatDeadline(scholarship.deadline)}
              </span>
            </div>

            <h1 className="mb-4 text-2xl font-bold tracking-tight text-[#181A1D] md:text-3xl">
              {scholarship.title}
            </h1>

            {scholarship.description && (
              <p className="mb-8 text-[#4A4A4A] leading-relaxed">{scholarship.description}</p>
            )}

            <ApplyForm
              scholarshipId={scholarship.id}
              slug={scholarship.slug}
              fields={fields}
              submitAction={submitApplication}
            />
          </div>
        </article>

        <p className="mt-8">
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

export default function ApplyPage(props: Props) {
  return (
    <Suspense fallback={<div className="container mx-auto max-w-3xl px-4 py-12 text-muted-foreground">Loading…</div>}>
      <ApplyContent {...props} />
    </Suspense>
  );
}
