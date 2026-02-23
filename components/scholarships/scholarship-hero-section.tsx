"use client";

import Link from "next/link";
import Image from "next/image";

const HEADING_COLOR = "#181A1D";
const BODY_COLOR = "rgb(88, 89, 93)";

export type ScholarshipHeroSectionProps = {
  /** Main heading, e.g. "Win Scholarships From Your Texts" or "{Category} Scholarships" */
  title: string;
  /** Body paragraph under the title. If category is provided, overrides with category-specific copy. */
  body: string;
  /** Optional category name (e.g. Gender, Ethnicity, STEM). When set, body becomes category-specific. */
  category?: string | null;
};

/**
 * Hero section: title, body, and CTA linking to /newsletter.
 * Each category gets a distinct rephrased body line.
 */
function getCategoryBody(category: string): string {
  const trimmed = category.trim();
  const lower = trimmed.toLowerCase();

  const copy: Record<string, string> = {
    "by major":
      "Find scholarships that match your field of study—our algorithm surfaces the best fits in seconds.",
    "by state":
      "Get matched to scholarships in your state and beat the competition with our algorithm.",
    "high school students":
      "Get matched to scholarships for high school students in seconds with our algorithm.",
    "college students":
      "Find scholarships built for undergrads and grad students—our algorithm matches you in seconds.",
    "easy to win":
      "Skip the essay pile—enter easy-to-win scholarships in seconds with our algorithm.",
  };

  return copy[lower] ?? `Beat the competition by entering scholarships tailored for you in seconds with our algorithm.`;
}

export function ScholarshipHeroSection({ title, body, category }: ScholarshipHeroSectionProps) {
  const displayBody = category?.trim() ? getCategoryBody(category) : body;

  return (
    <section className="w-full min-w-0 overflow-x-hidden bg-white py-10 md:py-20">
      <div className="container mx-auto max-w-[1024px] px-4 md:px-6 min-w-0">
        <h2
          className="mx-auto mb-4 max-w-[603px] text-center text-3xl font-bold leading-tight tracking-tight md:mb-5 md:text-4xl lg:mb-8 lg:leading-snug lg:text-[3.75rem]"
          style={{ color: HEADING_COLOR }}
        >
          {title}
        </h2>
        <p
          className="mx-auto mb-6 max-w-[560px] text-center text-base leading-relaxed md:mb-8 md:text-lg lg:mb-10 lg:leading-loose"
          style={{ color: BODY_COLOR }}
        >
          {displayBody}
        </p>

        {/* CTA — enter scholarships / newsletter */}
        <div className="mx-auto mb-3 flex justify-center md:mb-4">
          <Link
            href="/newsletter"
            className="relative block h-[144px] w-full max-w-[640px] overflow-hidden rounded-lg transition-opacity hover:opacity-95 active:opacity-90 md:h-[176px] md:max-w-[760px]"
            aria-label="Enter scholarships"
          >
            <Image
              src="https://storage.googleapis.com/images_592/Grou34p%206.png"
              alt="Enter scholarships"
              fill
              className="object-contain object-center"
              sizes="(max-width: 768px) 640px, 760px"
              unoptimized
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
