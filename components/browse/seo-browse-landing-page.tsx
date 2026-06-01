import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import { Directory } from "@/components/directory/Directory";
import { SeoBrowseLandingJsonLd } from "@/components/browse/seo-browse-landing-json-ld";
import { PATH_COLLEGE_MATCH_QUIZ_LABEL } from "@/components/home/path-quiz-cta";
import { COLLEGE_MATCH_QUIZ_URL } from "@/lib/constants";
import { shouldUseNextImageOptimizer } from "@/lib/remote-image-patterns";
import type { SeoBrowseLandingConfig } from "@/lib/seo-browse-landings";
import type { College } from "@/types/college";

function BrowseFallback() {
  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center gap-2 text-gray-600">
      <div className="text-3xl">🔍</div>
      <p>Loading schools…</p>
    </div>
  );
}

type Props = {
  config: SeoBrowseLandingConfig;
  canonicalUrl: string;
  baseUrl: string;
  initialColleges: College[];
};

export function SeoBrowseLandingPage({ config, canonicalUrl, baseUrl, initialColleges }: Props) {
  const landingPath = `/${config.slug}`;
  const useOptimizer = config.heroImage ? shouldUseNextImageOptimizer(config.heroImage.src) : false;

  return (
    <div className="min-h-screen bg-white">
      <SeoBrowseLandingJsonLd config={config} canonicalUrl={canonicalUrl} baseUrl={baseUrl} />

      <header className="border-b border-gray-100 bg-gradient-to-b from-[#f6f3ff] to-white">
        <div className="container mx-auto max-w-7xl px-4 py-10 sm:py-14">
          {config.heroImage ? (
            <div className="relative mb-8 aspect-[21/9] max-h-64 w-full overflow-hidden rounded-2xl shadow-md sm:max-h-80">
              <Image
                src={config.heroImage.src}
                alt={config.heroImage.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1200px"
                priority
                unoptimized={!useOptimizer}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
            </div>
          ) : null}

          <h1 className="text-3xl font-semibold tracking-tight text-[#0C1120] sm:text-4xl lg:text-5xl">
            {config.h1}
          </h1>
          <div className="mt-4 max-w-3xl space-y-3 text-base leading-relaxed text-gray-700 sm:text-lg">
            {config.intro.map((p) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}
          </div>
        </div>
      </header>

      <section aria-label="Matching colleges" className="border-t border-gray-100">
        <Suspense fallback={<BrowseFallback />}>
          <Directory
            initialColleges={initialColleges}
            defaultVibes={[...config.vibes]}
            urlSync={{ mode: "landing", basePath: landingPath }}
          />
        </Suspense>
      </section>

      <section className="container mx-auto max-w-3xl border-t border-gray-100 px-4 py-12 sm:py-16">
        <h2 className="text-lg font-semibold text-[#0C1120]">Frequently asked questions</h2>
        <dl className="mt-6 space-y-6">
          {config.faq.map((item) => (
            <div key={item.question}>
              <dt className="font-medium text-[#0C1120]">{item.question}</dt>
              <dd className="mt-2 text-gray-700 leading-relaxed">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section
        aria-label="About this school vibe"
        className="container mx-auto max-w-7xl border-t border-gray-100 bg-[#faf9fc] px-4 py-12 sm:py-16"
      >
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 className="text-xl font-semibold text-[#0C1120] sm:text-2xl">{config.whatIsTitle}</h2>
            <div className="mt-3 space-y-3 text-gray-700 leading-relaxed">
              {config.whatIsParagraphs.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[#0C1120] sm:text-2xl">{config.traitsTitle}</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-700 leading-relaxed">
              {config.traits.map((t) => (
                <li key={t.slice(0, 40)}>{t}</li>
              ))}
            </ul>
            <p className="mt-6 text-gray-800">
              {config.quizCtaLine}{" "}
              <Link
                href={COLLEGE_MATCH_QUIZ_URL}
                className="font-medium text-[#6836D5] underline-offset-2 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Take the PathPicker quiz →
              </Link>{" "}
              ({PATH_COLLEGE_MATCH_QUIZ_LABEL})
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
