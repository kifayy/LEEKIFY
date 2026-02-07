import { Suspense } from "react";
import { HeroFigmaDesign } from "@/components/home/hero-figma-design";
import { FeaturesSection } from "@/components/home/features-section";
import { HeroQuizCards } from "@/components/home/hero-quiz-cards";
import { BookATripSection } from "@/components/home/book-a-trip-section";
import { ReviewsCarousel } from "@/components/home/reviews-carousel";
import { FeaturedScholarshipsSection } from "@/components/home/featured-scholarships-section";
import { NewsletterCTA } from "@/components/newsletter-cta";

export default function Home() {
  return (
    <>
      <HeroFigmaDesign />
      <FeaturesSection />
      <HeroQuizCards />
      <BookATripSection />
      <Suspense fallback={<div className="container mx-auto max-w-5xl px-4 py-10 text-center text-sm text-muted-foreground md:py-16">Loading scholarships…</div>}>
        <FeaturedScholarshipsSection />
      </Suspense>
      <ReviewsCarousel />
      <NewsletterCTA variant="want-scholarships" />
    </>
  );
}
