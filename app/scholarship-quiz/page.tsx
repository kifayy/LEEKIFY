import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const SECTION_BG = "#EEECFF";
const TEXT_DARK = "#2E2F35";   // 208:54, 208:59, 208:65, 208:68
const TEXT_MUTED = "#58595D";  // 208:56, 208:60, 208:66
const HERO_IMAGE_LEFT =
  "https://storage.googleapis.com/images_592/Group%201000001386.png";

const CAROUSEL_IMAGES = [
  "https://storage.googleapis.com/images_592/51.png",
  "https://storage.googleapis.com/images_592/72.png",
  "https://storage.googleapis.com/images_592/612.png",
  "https://storage.googleapis.com/images_592/721.png",
  "https://storage.googleapis.com/images_592/22.png",
];

export const metadata = {
  title: "Scholarship Quiz | Pathpicker",
  description:
    "Find scholarships matched to your profile. Quick apply, no-essay options. Join thousands of students.",
};

const OUTCOMES = [
  "Scholarships matched to your profile and goals",
  "No-essay and quick-apply options",
  "Deadline and amount at a glance",
  "Direct links to apply",
  "Updated monthly with new opportunities",
];

export default function ScholarshipQuizPage() {
  return (
    <div className="min-w-0 overflow-x-hidden">
      {/* Section 208:40 – Figma section */}
      <section
        className="w-full min-w-0"
        style={{ backgroundColor: SECTION_BG }}
        aria-label="Scholarship Quiz"
      >
        {/* div#w-node-... 208:41 – container 1290px, padding from frame */}
        <div
          className="mx-auto flex min-w-0 max-w-[1290px] flex-col px-4 py-12 sm:px-10 md:px-[75px] md:py-16"
          style={{ maxWidth: 1290 }}
        >
          {/* Main row 208:51 – image left + content right; on mobile appears below carousel (order-2) */}
          <div className="order-2 mt-6 flex min-w-0 flex-col gap-10 md:order-1 md:mt-0 lg:flex-row lg:items-start lg:gap-0">
            {/* 208:52 – left image (613×601.5 in Figma), replaced with Group image */}
            <div className="relative flex min-h-[280px] w-full min-w-0 shrink-0 items-center sm:min-h-[340px] lg:max-w-[613px] lg:min-h-[502px] lg:basis-[613px]">
              <div className="relative aspect-[613/601.5] w-full max-w-[613px]">
                <Image
                  src={HERO_IMAGE_LEFT}
                  alt=""
                  fill
                  className="object-contain object-center"
                  sizes="(min-width: 1024px) 613px, 100vw"
                  priority
                  unoptimized
                />
              </div>
            </div>

            {/* 208:53 – right column, vertical stack, itemSpacing 36 */}
            <div className="flex min-w-0 flex-1 flex-col gap-9 lg:pl-12">
              {/* 208:54 – intro text (title-style like home hero, 20% larger) */}
              <h2
                className="max-w-[565px] text-[1.8rem] font-bold leading-tight tracking-tight md:text-[2.25rem] lg:text-[2.7rem]"
                style={{ color: TEXT_DARK }}
              >
                Our algorithm scans scholarships you match with...
              </h2>

              {/* Take quiz button – under title on mobile only */}
              <Link
                href="/scholarship-quiz"
                className="inline-flex h-[5.6rem] min-w-[263px] max-w-full items-center justify-center rounded-[15px] border-2 bg-white px-11 text-xl font-medium shadow-[3px_3px_0_0_#2E2F35] transition hover:opacity-95 md:hidden"
                style={{ borderColor: TEXT_DARK, color: TEXT_DARK }}
              >
                💸 Take quiz
              </Link>

              {/* 208:55 – block: CTA copy + stats + button, itemSpacing 48 */}
              <div className="flex flex-col gap-12">
                {/* 208:56 */}
                <p
                  className="max-w-[556px] text-base leading-relaxed md:text-lg"
                  style={{ color: TEXT_MUTED }}
                >
                  🚀 Beat the competition by getting matched to over 1,000+
                  brands offering scholarships to high school and college
                  students. Ready to see how many you qualify for?
                </p>

                {/* 208:57 – stats row, itemSpacing 48 */}
                <div className="flex flex-wrap gap-8 sm:gap-12">
                  <div className="flex flex-col gap-0.5">
                    <span
                      className="text-2xl font-bold leading-tight md:text-3xl"
                      style={{ color: TEXT_DARK }}
                    >
                      1,000+
                    </span>
                    <span
                      className="text-sm md:text-base"
                      style={{ color: TEXT_MUTED }}
                    >
                      Brands We Search
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span
                      className="text-2xl font-bold leading-tight md:text-3xl"
                      style={{ color: TEXT_DARK }}
                    >
                      $1.5m+
                    </span>
                    <span
                      className="text-sm md:text-base"
                      style={{ color: TEXT_MUTED }}
                    >
                      Live Scholarships
                    </span>
                  </div>
                </div>

                {/* 208:67 – CTA link: 2x size, hidden on mobile (button under title there) */}
                <Link
                  href="/scholarship-quiz"
                  className="hidden min-w-fit items-center justify-center rounded-[15px] border-2 bg-white px-11 font-medium shadow-[3px_3px_0_0_#2E2F35] transition hover:opacity-95 md:inline-flex md:h-[5.6rem] md:min-w-[263px] md:text-xl"
                  style={{ borderColor: TEXT_DARK, color: TEXT_DARK }}
                >
                  💸 Take quiz
                </Link>
              </div>
            </div>
          </div>

          {/* Image carousel – above main content on mobile (order-1), below on md+ (order-2) */}
          <div className="order-1 marquee-fade-edges -mx-4 overflow-hidden md:order-2 md:mt-12 md:-mx-[75px]">
            <div className="flex w-max gap-6 py-4 animate-scholarship-quiz-marquee">
              {[...CAROUSEL_IMAGES, ...CAROUSEL_IMAGES, ...CAROUSEL_IMAGES, ...CAROUSEL_IMAGES].map((src, i) => (
                <div
                  key={i}
                  className="relative h-16 w-[120px] shrink-0 overflow-hidden rounded-3xl md:h-20 md:w-[140px] md:rounded-[2rem]"
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-contain rounded-9xl md:rounded-[5rem]"
                    sizes="140px"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="container mx-auto max-w-2xl px-4 py-8 md:py-16">
        <h2 className="text-lg font-bold text-[#181A1D] md:text-xl">What you’ll get</h2>
        <ul className="mt-2 list-inside list-disc space-y-1.5 text-sm font-normal text-muted-foreground md:mt-3 md:space-y-2">
          {OUTCOMES.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap items-center gap-3 md:mt-8 md:gap-4">
          <div className="flex gap-0.5 text-pathpicker-gold" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-lg md:text-xl">★</span>
            ))}
          </div>
          <span className="text-sm text-muted-foreground">40k+ Students Matched</span>
        </div>
        <div className="mt-6 md:mt-8">
          <Button asChild size="lg" variant="pathpicker" className="w-full sm:w-auto">
            <Link href="/scholarship-quiz">
              <Sparkles className="mr-2 h-4 w-4" />
              Start quiz
            </Link>
          </Button>
        </div>
        <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
          Pathpicker is built by the same team as{" "}
          <a href="https://awarded.app" className="text-pathpicker-purple underline" target="_blank" rel="noopener noreferrer">
            Awarded
          </a>
          . We help students avoid scams and find real opportunities.
        </p>
      </div>
    </div>
  );
}
