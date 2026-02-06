"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const REVIEWS = [
  {
    name: "Kate Gylambos",
    quote:
      '"I\'m a high school senior and had no idea what campus would fit me... this was SOO helpful!"',
    initials: "KG",
  },
  {
    name: "Sarah Hueller",
    quote:
      '"Seeing my popularity stats and social rank was fun, but also getting a tailored financial roadmap to help me avoid debt traps was very cool"',
    initials: "SH",
  },
  {
    name: "Isaiah Rowe",
    quote: '"They laid out my profile in a really cool way! It\'s like a wrapped for my personality lol"',
    initials: "IR",
  },
];

function StarRating() {
  return (
    <div className="flex gap-0.5 text-pathpicker-gold" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-current" />
      ))}
    </div>
  );
}

export function ReviewsCarousel() {
  return (
    <section className="w-full py-10 md:py-24">
      <div className="container mx-auto max-w-5xl px-4">
        <h2 className="text-2xl font-bold tracking-tight md:text-4xl">
          Why students <span className="font-script text-3xl md:text-5xl">love us.</span>
        </h2>
        <Carousel opts={{ align: "start", loop: true }} className="mt-6 w-full md:mt-10">
          <CarouselContent className="-ml-4">
            {REVIEWS.map((review) => (
              <CarouselItem key={review.name} className="min-w-[85%] basis-[85%] pl-4 md:basis-1/2 md:min-w-0">
                <Card className="relative overflow-hidden bg-white">
                  <div
                    className="absolute right-3 top-3 text-5xl font-serif text-black/[0.06] md:right-4 md:top-4 md:text-6xl"
                    aria-hidden
                  >
                    &rdquo;
                  </div>
                  <CardContent className="relative p-4 md:p-6">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/[0.06] text-sm font-medium text-foreground md:h-12 md:w-12">
                        {review.initials}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-foreground truncate">{review.name}</p>
                        <StarRating />
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-foreground leading-relaxed md:mt-4 md:text-base">{review.quote}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 h-10 w-10 md:h-8 md:w-8" />
          <CarouselNext className="right-0 h-10 w-10 md:h-8 md:w-8" />
        </Carousel>
      </div>
    </section>
  );
}
