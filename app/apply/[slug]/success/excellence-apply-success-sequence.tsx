"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const SUCCESS_MS = 2800;

type Props = {
  scholarshipTitle: string;
  children: React.ReactNode;
};

/** After PathPicker Excellence apply: full-screen success, then Awarded landing (children). */
export function ExcellenceApplySuccessSequence({ scholarshipTitle, children }: Props) {
  const [showAwarded, setShowAwarded] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setShowAwarded(true), SUCCESS_MS);
    return () => window.clearTimeout(id);
  }, []);

  if (!showAwarded) {
    return (
      <div className="min-h-screen bg-[#FAFAFA]">
        <div
          className="container mx-auto max-w-[640px] px-4 py-16 md:px-6 md:py-24 text-center"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="mb-6 inline-flex rounded-full bg-[#E8F5E9] p-4">
            <svg className="h-12 w-12 text-[#2E7D32]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="mb-3 text-2xl font-bold text-[#181A1D] md:text-3xl">Application submitted</h1>
          <p className="mb-2 text-[#4A4A4A] leading-relaxed">
            Your application for <strong>{scholarshipTitle}</strong> has been received. We&apos;ll be in touch if
            you&apos;re selected.
          </p>
          <p className="text-sm text-[#4A4A4A]/80">Next up: win scholarships faster with Awarded…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-w-0">
      <div className="border-b border-emerald-200/80 bg-emerald-50/95 px-4 py-3 text-center shadow-sm backdrop-blur-sm">
        <p className="text-sm font-medium text-emerald-900 md:text-base">
          <span className="me-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-xs text-white">
            ✓
          </span>
          Application submitted for <strong>{scholarshipTitle}</strong>
          <span className="mx-2 hidden text-emerald-700/60 sm:inline">·</span>
          <Link href="/scholarships" className="mt-2 block text-[#5B4B8A] underline underline-offset-2 sm:mt-0 sm:inline">
            Browse more scholarships
          </Link>
        </p>
      </div>
      {children}
    </div>
  );
}
