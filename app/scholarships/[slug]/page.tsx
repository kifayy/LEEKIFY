import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getScholarshipBySlug } from "@/lib/supabase/queries/scholarships";
import { Button } from "@/components/ui/button";

function formatDeadline(deadline: string | null): string {
  if (!deadline) return "No deadline";
  const d = new Date(deadline);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const scholarship = await getScholarshipBySlug(slug);
  if (!scholarship) return { title: "Scholarship | Pathpicker" };
  return {
    title: `${scholarship.title} | Pathpicker`,
    description: `${scholarship.provider} – ${scholarship.amount ?? "Scholarship"}. Deadline: ${formatDeadline(scholarship.deadline)}.`,
  };
}

async function ScholarshipDetail({ params }: Props) {
  const { slug } = await params;
  const scholarship = await getScholarshipBySlug(slug);
  if (!scholarship) notFound();

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8 md:py-16">
      <article>
        {scholarship.image_url && (
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={scholarship.image_url}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <header className="mt-4 md:mt-6">
          <h1 className="text-xl font-bold tracking-tight md:text-4xl">{scholarship.title}</h1>
          <p className="mt-1.5 text-sm text-muted-foreground md:mt-2 md:text-base">{scholarship.provider}</p>
          <div className="mt-2 flex flex-wrap gap-4 text-sm">
            {scholarship.amount && (
              <span className="font-medium text-pathpicker-purple">{scholarship.amount}</span>
            )}
            <span className="text-muted-foreground">
              Deadline: {formatDeadline(scholarship.deadline)}
            </span>
          </div>
        </header>
        {scholarship.content && (
          <div
            className="mt-8 space-y-4 text-foreground [&_h2]:mt-6 [&_h2]:text-xl [&_h2]:font-semibold [&_p]:leading-relaxed [&_ul]:list-inside [&_ul]:list-disc [&_a]:text-pathpicker-purple [&_a]:underline"
            dangerouslySetInnerHTML={{ __html: scholarship.content }}
          />
        )}
        {scholarship.external_link && (
          <div className="mt-6 md:mt-8">
            <Button asChild variant="pathpicker" className="w-full sm:w-auto">
              <a
                href={scholarship.external_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply or learn more
              </a>
            </Button>
          </div>
        )}
      </article>
      <p className="mt-8">
        <Link href="/scholarships" className="text-sm text-muted-foreground hover:underline">
          ← Back to scholarships
        </Link>
      </p>
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
