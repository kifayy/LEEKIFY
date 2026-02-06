import { Suspense } from "react";
import { HeroQuizCards } from "@/components/home/hero-quiz-cards";
import { WhatYoullDiscover } from "@/components/home/what-youll-discover";
import { ReviewsCarousel } from "@/components/home/reviews-carousel";
import { FeaturedScholarshipsSection } from "@/components/home/featured-scholarships-section";
import { NewsletterCTA } from "@/components/newsletter-cta";

export default function Home() {
  return (
    <>
      <HeroQuizCards />
      <WhatYoullDiscover />
      <ReviewsCarousel />
      <Suspense fallback={<div className="container mx-auto max-w-5xl px-4 py-10 text-center text-sm text-muted-foreground md:py-16">Loading scholarships…</div>}>
        <FeaturedScholarshipsSection />
      </Suspense>
      <NewsletterCTA variant="want-scholarships" />
    </>
  );
}
