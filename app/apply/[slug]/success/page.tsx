import { Suspense } from "react";
import Link from "next/link";
import { getHostedScholarshipBySlugForMeta } from "@/lib/supabase/queries/hosted-scholarships";
import { notFound } from "next/navigation";
import { AwardedAppLanding } from "@/app/awarded-app/awarded-app-landing";
import { ExcellenceApplySuccessSequence } from "./excellence-apply-success-sequence";

const PATHPICKER_EXCELLENCE_2026_SLUG = "pathpicker-excellence-2026";

type Props = { params: Promise<{ slug: string }> };

async function SuccessContent({ params }: Props) {
  const { slug } = await params;
  const scholarship = await getHostedScholarshipBySlugForMeta(slug);
  if (!scholarship) notFound();

  if (slug === PATHPICKER_EXCELLENCE_2026_SLUG) {
    return (
      <ExcellenceApplySuccessSequence scholarshipTitle={scholarship.title}>
        <AwardedAppLanding />
      </ExcellenceApplySuccessSequence>
    );
  }

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

export default function ApplySuccessPage(props: Props) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center text-[#4A4A4A]">Loading…</div>}>
      <SuccessContent {...props} />
    </Suspense>
  );
}
