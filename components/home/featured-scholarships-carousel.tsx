"use client";

import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import type { Scholarship } from "@/lib/supabase/queries/scholarships";

function formatDeadline(deadline: string | null): string {
  if (!deadline) return "No deadline";
  const d = new Date(deadline);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function FeaturedScholarshipsCarousel({ scholarships }: { scholarships: Scholarship[] }) {
  if (scholarships.length === 0) {
    return (
      <section className="w-full py-10 md:py-24">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-bold tracking-tight md:text-4xl">Featured scholarships</h2>
          <p className="mt-3 text-sm text-muted-foreground md:mt-4 md:text-base">Check back soon for featured scholarships.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-10 md:py-24">
      <div className="container mx-auto max-w-5xl px-4">
        <h2 className="text-2xl font-bold tracking-tight md:text-4xl">Featured scholarships</h2>
        <Carousel opts={{ align: "start", loop: false }} className="mt-6 w-full md:mt-10">
          <CarouselContent className="-ml-4">
            {scholarships.map((s) => (
              <CarouselItem key={s.id} className="min-w-[80%] basis-[80%] pl-4 sm:min-w-[60%] sm:basis-[60%] md:basis-1/2 md:min-w-0 lg:basis-1/3">
                <Link href={`/scholarships/${s.slug}`} className="block active:opacity-95">
                  <Card className="overflow-hidden transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] active:scale-[0.99]">
                    <div className="relative aspect-video w-full bg-muted">
                      {s.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={s.image_url}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-muted-foreground">
                          {s.provider.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <CardContent className="p-3 md:p-4">
                      <h3 className="font-semibold text-sm line-clamp-2 md:text-base">{s.title}</h3>
                      <p className="mt-1 text-xs text-muted-foreground md:text-sm">{s.provider}</p>
                      {s.amount && (
                        <p className="mt-1 text-xs font-medium text-pathpicker-purple md:text-sm">{s.amount}</p>
                      )}
                      <p className="mt-1 text-xs text-muted-foreground">
                        Deadline: {formatDeadline(s.deadline)}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
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
