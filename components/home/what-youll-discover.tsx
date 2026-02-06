import { Sparkles, User } from "lucide-react";
import Image from "next/image";

const DISCOVER_ITEMS = [
  {
    title: "16 Archetypes",
    icon: Sparkles,
    subtext:
      "Unlock your unique student profile from our 16-type system to see how you truly compare to 40,000+ peers.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=280&fit=crop",
    borderClass: "border-green-500/30",
  },
  {
    title: "Personality Rank",
    icon: User,
    subtext:
      "Uncover your social DNA and campus vibe to see your real popularity scores, and influence.",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=280&fit=crop",
    borderClass: "border-yellow-500/30",
  },
];

export function WhatYoullDiscover() {
  return (
    <section className="w-full py-10 md:py-24">
      <div className="container mx-auto max-w-5xl px-4">
        <h2 className="text-2xl font-bold tracking-tight md:text-4xl">
          What you&apos;ll <span className="font-script text-3xl md:text-5xl">discover</span>
        </h2>
        <p className="mt-3 text-sm text-muted-foreground md:mt-4 md:text-base max-w-2xl">
          Take our 16-question archetype quiz to reveal your student persona, social habits, and
          financial cheat codes built for your student profile.
        </p>
        <div className="mt-6 grid gap-4 sm:gap-6 sm:grid-cols-2 md:mt-10">
          {DISCOVER_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] ${item.borderClass} p-0`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <div className="p-4 md:p-5">
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 shrink-0 text-pathpicker-purple" aria-hidden />
                    <h3 className="font-semibold text-base text-foreground">{item.title}</h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.subtext}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
