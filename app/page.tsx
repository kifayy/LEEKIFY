import { Suspense } from "react";
import { DesktopHeroBanner } from "@/components/home/desktop-hero-banner";
import { HeroFigmaDesign } from "@/components/home/hero-figma-design";
import { FeaturesSection } from "@/components/home/features-section";
import { EnterScholarshipsSectionLayout } from "@/components/enter-scholarships-section-layout";
import { ReviewsCarousel } from "@/components/home/reviews-carousel";
import { WhyDirectMailSection } from "@/components/home/why-direct-mail-section";
import { FeaturedScholarshipsSection } from "@/components/home/featured-scholarships-section";
import { VimeoInTikTokMockup } from "@/components/home/vimeo-tiktok-mockup";
import { getBaseUrlForMetadata } from "@/lib/metadata-base-url";
import { DesktopBottomCta } from "@/components/home/desktop-bottom-cta";

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
      <EnterScholarshipsSectionLayout />
      {/* Hidden for now – Featured scholarships carousel (Fund Your Education); restore when needed */}
      {/* <Suspense fallback={<div className="container mx-auto max-w-5xl px-4 py-10 text-center text-sm text-muted-foreground md:py-16">Loading scholarships…</div>}>
        <FeaturedScholarshipsSection />
      </Suspense> */}
      <WhyDirectMailSection />
      {/* Mobile-only: Awarded app video in TikTok-style phone mockup */}
      <section className="w-full px-4 pt-0 pb-6 md:hidden" aria-label="Awarded app video">
        <div className="container mx-auto max-w-lg">
          <VimeoInTikTokMockup />
        </div>
      </section>
      <ReviewsCarousel />
      <DesktopBottomCta />
    </>
  );
}
