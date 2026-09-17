import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock3 } from "lucide-react";

import { EmailBreachSearchForm } from "@/components/home/email-breach-search-form";
import { getBaseUrlForMetadata } from "@/lib/metadata-base-url";
import { resolveBreachLogoBg, resolveBreachLogoUrl } from "@/lib/recent-breaches";
import { getBreachBySlug } from "@/lib/supabase/queries/recent-breaches";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function formatBreachDate(value: string | null) {
  if (!value) return null;
  const d = new Date(`${value}T12:00:00Z`);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const breach = await getBreachBySlug(slug);
  if (!breach) {
    return { title: "Breach not found | Leekify" };
  }
  const baseUrl = await getBaseUrlForMetadata();
  const title = `${breach.organization} data breach — check your email | Leekify`;
  const description =
    breach.summary ??
    `See if your email was exposed in the ${breach.organization} breach (${breach.rows_label}). Search free on Leekify.`;

  return {
    title,
    description,
    alternates: { canonical: `${baseUrl}/breach/${breach.slug}` },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/breach/${breach.slug}`,
      siteName: "Leekify",
      type: "article",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function BreachDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const breach = await getBreachBySlug(slug);
  if (!breach) notFound();

  const breachDateLabel = formatBreachDate(breach.breach_date);
  const logoSrc = resolveBreachLogoUrl(breach.slug, breach.logo_url);
  const logoBg = resolveBreachLogoBg(breach.slug, breach.logo_bg);

  return (
    <main className="min-h-[70vh] bg-[#FAFAFC] pb-16 pt-6 md:pb-20 md:pt-10">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <Link
          href="/#breaches"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6B7280] transition hover:text-[#4E2FFF]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          All recent breaches
        </Link>

        <section className="mt-5 overflow-hidden rounded-3xl bg-white shadow-[0_8px_32px_rgba(24,6,46,0.08)] ring-1 ring-black/[0.04]">
          <div
            className="relative flex min-h-[11rem] items-end px-6 pb-6 pt-10 sm:min-h-[13rem] sm:px-8"
            style={{ backgroundColor: logoBg }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
            {logoSrc ? (
              <div className="absolute right-6 top-6 flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-white/95 p-2 shadow-lg sm:h-20 sm:w-20">
                <Image
                  src={logoSrc}
                  alt=""
                  width={80}
                  height={80}
                  className="h-full w-full object-contain"
                  aria-hidden
                />
              </div>
            ) : null}
            <div className="relative z-[1] max-w-[85%]">
              <p className="font-[family-name:var(--font-poppins)] text-sm font-medium text-white/85">
                {breach.organization}
              </p>
              <h1 className="mt-1 font-[family-name:var(--font-poppins)] text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {breach.rows_label} exposed
              </h1>
            </div>
          </div>

          <div className="space-y-8 px-6 py-7 sm:px-8 sm:py-8">
            <div className="flex items-start gap-3 rounded-2xl bg-[#F5F3FF] px-4 py-3.5">
              <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-[#4E2FFF]" aria-hidden />
              <div>
                <p className="text-sm font-semibold text-[#18062E]">
                  {breachDateLabel ? `Estimated breach date: ${breachDateLabel}` : "Breach date unknown"}
                </p>
                <p className="mt-0.5 text-sm text-[#6B7280]">
                  Search your email below to see if you were affected.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E8E4F5] bg-[#FAFAFC] p-5 sm:p-6">
              <h2 className="font-[family-name:var(--font-poppins)] text-base font-bold text-[#18062E]">
                Check if your data was in the {breach.organization} breach
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-[#6B7280]">
                Enter the email you used with {breach.organization}. We&apos;ll search known breach
                databases and show matches without hiding results behind a blur.
              </p>
              <EmailBreachSearchForm appearance="default" className="mt-5" />
            </div>

            {breach.what_happened ? (
              <div>
                <h2 className="font-[family-name:var(--font-poppins)] text-base font-bold text-[#18062E]">
                  What happened?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#4B5563]">{breach.what_happened}</p>
              </div>
            ) : null}

            {breach.data_exposed ? (
              <div>
                <h2 className="font-[family-name:var(--font-poppins)] text-base font-bold text-[#18062E]">
                  What may have been exposed?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#4B5563]">{breach.data_exposed}</p>
              </div>
            ) : null}

            {breach.eligibility ? (
              <div>
                <h2 className="font-[family-name:var(--font-poppins)] text-base font-bold text-[#18062E]">
                  Should I check?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#4B5563]">{breach.eligibility}</p>
              </div>
            ) : null}

            {breach.disclaimer ? (
              <div>
                <h2 className="font-[family-name:var(--font-poppins)] text-base font-bold text-[#18062E]">
                  Disclaimer
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{breach.disclaimer}</p>
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}
