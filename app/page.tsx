import { Suspense } from "react";
import { DesktopHeroBanner } from "@/components/home/desktop-hero-banner";
import { HeroFigmaDesign } from "@/components/home/hero-figma-design";
import { FeaturesSection } from "@/components/home/features-section";
import { ReviewsCarousel } from "@/components/home/reviews-carousel";
import { WhyDirectMailSection } from "@/components/home/why-direct-mail-section";
import { FeaturedScholarshipsSection } from "@/components/home/featured-scholarships-section";
export default function Home() {
  return (
    <>
      <DesktopHeroBanner />
      <div className="md:hidden">
        <HeroFigmaDesign />
      </div>
      <FeaturesSection />
      <Suspense fallback={<div className="container mx-auto max-w-5xl px-4 py-10 text-center text-sm text-muted-foreground md:py-16">Loading scholarships…</div>}>
        <FeaturedScholarshipsSection />
      </Suspense>
      <WhyDirectMailSection />
      <ReviewsCarousel />
    </>
  );
}
