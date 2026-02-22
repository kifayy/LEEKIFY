import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getHostedScholarshipBySlug } from "@/lib/supabase/queries/hosted-scholarships";
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
    <div>
      {/* Hero: light green bar with title, deadline, award */}
      <div className="w-full border-b border-gray-200 bg-[#e8f5e9]">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:py-6 md:py-10">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-6 md:justify-between md:gap-8">
            <div className="order-2 w-full shrink-0 max-w-[160px] sm:order-1 sm:max-w-[200px] md:mx-0 md:max-w-[280px] lg:max-w-[320px]">
              <img
                src="https://storage.googleapis.com/images_592/books-1012088_1280.jpg"
                alt="Books"
                className="h-auto w-full object-contain"
              />
            </div>
            <div className="order-1 min-w-0 flex-1 text-center sm:order-2 md:text-left">
              <p className="mb-1 text-base font-medium text-[#5B4B8A] sm:mb-2 sm:text-lg md:text-xl">
                For high school and college students
              </p>
              <h1 className="text-2xl font-normal leading-tight text-[#5B4B8A] sm:text-3xl md:text-4xl lg:text-5xl" style={{ fontWeight: 400 }}>
                <strong>{scholarship.title}</strong>
              </h1>
              <h3 className="my-3 text-lg text-[#5B4B8A] sm:my-4 sm:text-xl md:text-2xl">
                Current Deadline: <strong>{formatDeadline(scholarship.deadline)}</strong>
              </h3>
              {scholarship.amount && (
                <h3 className="my-3 text-lg text-[#5B4B8A] sm:my-4 sm:text-xl md:text-2xl">
                  Award: <strong>{scholarship.amount}</strong>
                </h3>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Eligibility + deadline — make sure they know */}
      <div className="border-b border-amber-200 bg-amber-50 px-3 py-2.5 text-center sm:px-4 sm:py-3">
        <p className="text-sm font-semibold leading-snug text-amber-900 sm:text-base md:text-lg">
          Open to <strong>high school and college students</strong>.
          {scholarship.deadline && (
            <> Applications close <strong>{formatDeadline(scholarship.deadline)}</strong>. Submit before the deadline — no late applications accepted.</>
          )}
        </p>
      </div>

      {/* Form card */}
      <div className="mx-auto max-w-7xl px-3 pt-4 pb-10 sm:px-4 sm:pt-6 sm:pb-12">
        <div className="flex justify-center">
          <div className="w-full min-w-0 md:max-w-[66.666%] lg:mt-8">
            <div className="rounded-lg bg-white p-4 shadow-md sm:p-6 md:p-10">
              <ApplyForm
                scholarshipId={scholarship.id}
                slug={scholarship.slug}
                fields={fields}
                submitAction={submitApplication}
              />
              <p className="mt-6 text-xs leading-relaxed text-gray-500 sm:text-sm">
                By clicking or tapping &apos;Submit Application&apos; you acknowledge and agree to our{" "}
                <a className="text-[#5B4B8A] underline" href="/privacy-policy">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a className="text-[#5B4B8A] underline" href="/scholarship-rules">
                  Scholarship Rules
                </a>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Past Winners section */}
      <section className="border-t border-gray-100 py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-3 sm:px-4">
          <div className="flex justify-center">
            <div className="w-full max-w-3xl text-center">
              <h2 className="mb-6 inline-block text-2xl font-bold text-[#5B4B8A] sm:mb-8 sm:text-3xl md:text-4xl">
                Past Winners
              </h2>
            </div>
          </div>
          <div className="mx-auto max-w-3xl">
            <ul className="list-unstyled space-y-0">
              <li className="relative flex gap-3">
                <div className="absolute left-0 top-0 bottom-0 flex justify-center">
                  <div className="w-px bg-gray-300 opacity-30" aria-hidden />
                </div>
                <div className="relative flex h-6 w-6 shrink-0 items-center justify-center bg-white">
                  <div className="h-2 w-2 rounded-full border border-gray-400 bg-gray-400" />
                </div>
                <div className="flex-1 pb-8 pt-0">
                  <h3 className="mb-4 text-2xl font-bold text-[#5B4B8A] opacity-70">2025</h3>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="flex flex-col gap-3">
                      <div>
                        <h5 className="font-bold text-[#5B4B8A]">January</h5>
                        <ul className="list-none">
                          <li className="font-medium text-[#5B4B8A]"><span className="me-1">•</span> Maya, Lincoln High School &apos;28</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-bold text-[#5B4B8A]">February</h5>
                        <ul className="list-none">
                          <li className="font-medium text-[#5B4B8A]"><span className="me-1">•</span> James, North Carolina State University &apos;27</li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div>
                        <h5 className="font-bold text-[#5B4B8A]">March</h5>
                        <ul className="list-none">
                          <li className="font-medium text-[#5B4B8A]"><span className="me-1">•</span> Sofia, Westview High School &apos;29</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-bold text-[#5B4B8A]">April</h5>
                        <ul className="list-none">
                          <li className="font-medium text-[#5B4B8A]"><span className="me-1">•</span> Marcus, Howard University &apos;28</li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div>
                        <h5 className="font-bold text-[#5B4B8A]">May</h5>
                        <ul className="list-none">
                          <li className="font-medium text-[#5B4B8A]"><span className="me-1">•</span> Emma, Central Valley High School &apos;29</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
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
