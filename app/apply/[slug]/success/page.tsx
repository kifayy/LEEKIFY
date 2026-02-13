import Link from "next/link";
import { getHostedScholarshipBySlug } from "@/lib/supabase/queries/hosted-scholarships";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export default async function ApplySuccessPage({ params }: Props) {
  const { slug } = await params;
  const scholarship = await getHostedScholarshipBySlug(slug);
  if (!scholarship) notFound();

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="container mx-auto max-w-[640px] px-4 py-16 md:px-6 md:py-24 text-center">
        <div className="rounded-full bg-[#E8F5E9] p-4 inline-flex mb-6">
          <svg
            className="h-12 w-12 text-[#2E7D32]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-[#181A1D] md:text-3xl mb-3">
          Application submitted
        </h1>
        <p className="text-[#4A4A4A] leading-relaxed mb-8">
          Your application for <strong>{scholarship.title}</strong> has been received. We&apos;ll be in touch if you&apos;re selected.
        </p>
        <Link
          href="/scholarships"
          className="inline-flex h-12 items-center justify-center rounded-xl bg-[#7C4EE4] px-8 text-base font-semibold text-white transition-all hover:bg-[#6B3ED4]"
        >
          Browse more scholarships
        </Link>
      </div>
    </div>
  );
}
