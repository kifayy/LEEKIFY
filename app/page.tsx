import { Suspense } from "react";
import { DesktopHeroBanner } from "@/components/home/desktop-hero-banner";
import { HeroFigmaDesign } from "@/components/home/hero-figma-design";
import { FeaturesSection } from "@/components/home/features-section";
import { ReviewsCarousel } from "@/components/home/reviews-carousel";
import { WhyDirectMailSection } from "@/components/home/why-direct-mail-section";
import { FeaturedScholarshipsSection } from "@/components/home/featured-scholarships-section";
import { getBaseUrlForMetadata } from "@/lib/metadata-base-url";

export async function generateMetadata() {
  const baseUrl = await getBaseUrlForMetadata();
  return { alternates: { canonical: baseUrl } };
}

export default function Home() {
  return (
    <>
      <DesktopHeroBanner />
      <div className="md:hidden">
        <HeroFigmaDesign />
      </div>
      <FeaturesSection />
      {/* Hidden for now – Featured scholarships carousel (Fund Your Education); restore when needed */}
      {/* <Suspense fallback={<div className="container mx-auto max-w-5xl px-4 py-10 text-center text-sm text-muted-foreground md:py-16">Loading scholarships…</div>}>
        <FeaturedScholarshipsSection />
      </Suspense> */}
      <WhyDirectMailSection />
      {/* Mobile-only: Awarded app video above reviews */}
      <section className="w-full px-4 pt-0 pb-6 md:hidden" aria-label="Awarded app video">
        <div className="container mx-auto max-w-lg">
          <div className="relative w-full overflow-hidden rounded-xl bg-black" style={{ paddingBottom: "177.78%" }}>
            <iframe
              src="https://player.vimeo.com/video/1171648381?title=0&byline=0&portrait=0&loop=1"
              className="absolute inset-0 h-full w-full"
              allowFullScreen
              allow="autoplay; fullscreen; picture-in-picture"
              title="Awarded App"
            />
          </div>
          <div className="mt-4 flex justify-center">
            <a
              href="https://awarded.short.gy/9iTh"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-16 min-w-[200px] items-center justify-center gap-2 rounded-full bg-[#956EFE] px-8 text-base font-medium text-white shadow-[0_2px_8px_rgba(149,110,254,0.25)] transition hover:opacity-95"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Apple_logo_white.svg/1920px-Apple_logo_white.svg.png"
                alt=""
                className="h-6 w-6 object-contain"
                aria-hidden
              />
              Get on iOS
            </a>
          </div>
        </div>
      </section>
      <ReviewsCarousel />
    </>
  );
}
