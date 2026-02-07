import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";

const SCHOLARSHIP_IMAGE =
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=778&h=552&fit=crop";
const ARCHETYPE_IMAGE =
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=778&h=552&fit=crop";

const CARDS = [
  {
    href: "/scholarship-quiz",
    title: "Scholarship Quiz",
    description:
      "Find scholarships matched to your profile. Quick apply, no-essay options. Get money without the grind.",
    image: SCHOLARSHIP_IMAGE,
    cta: "See More",
  },
  {
    href: "/student-archetype-quiz",
    title: "Archetype Quiz",
    description:
      "Find your Student archetype. Join 40k+ peers and see what type of student you are. Discover your profile.",
    image: ARCHETYPE_IMAGE,
    cta: "See More",
  },
];

export function HeroQuizCards() {
  return (
    <section className="w-full overflow-x-hidden py-6 md:py-20">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col items-stretch gap-5 sm:flex-row sm:items-center sm:justify-center sm:gap-5">
          {CARDS.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group relative block w-full max-w-[389px] overflow-hidden rounded-[29px] bg-white transition-shadow hover:shadow-[0_9px_59px_rgba(174,165,114,0.12)] sm:w-[389px] sm:max-w-none"
            >
              {/* Card - Figma travel_card structure */}
              <div className="relative">
                {/* Image area */}
                <div className="relative aspect-[389/276] w-full overflow-hidden rounded-t-[39px] bg-[#F7F7F7]">
                  <Image
                    src={card.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 389px"
                  />
                  {/* White blur ellipse top-left */}
                  <div
                    className="absolute -left-12 -top-12 h-48 w-48 rounded-full bg-white blur-[88px]"
                    aria-hidden
                  />
                  {/* Frosted 5.0 badge - top right */}
                  <div
                    className="absolute right-4 top-4 flex items-center gap-2 rounded-[45px] px-3 py-2 backdrop-blur-md"
                    style={{
                      backgroundColor: "rgba(12, 17, 32, 0.24)",
                      boxShadow: "inset 7px 0 19px rgba(255,255,255,0.15)",
                    }}
                  >
                    <Star className="h-4 w-4 fill-[#FACD6B] text-[#FACD6B]" />
                    <span className="text-base font-bold text-white">5.0</span>
                  </div>
                </div>

                {/* Content - white section + gray bottom */}
                <div className="rounded-b-[29px] bg-white">
                  {/* Title + description */}
                  <div className="px-5 pt-4 text-center md:text-left">
                    <h2 className="text-xl font-bold text-[#0C1120]">{card.title}</h2>
                    <p
                      className="mt-2 line-clamp-2 text-sm leading-relaxed"
                      style={{ color: "rgba(12, 17, 32, 0.6)" }}
                    >
                      {card.description}
                    </p>
                  </div>
                  {/* Big See More button at bottom */}
                  <div className="px-4 pb-5 pt-4">
                    <span
                      className="flex w-full items-center justify-center gap-2 rounded-full py-4 text-base font-normal text-white transition-opacity group-hover:opacity-95"
                      style={{
                        background: "#956EFE",
                      }}
                    >
                      {card.cta}
                      <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
                    </span>
                  </div>
                </div>
                {/* Purple blur blob - decorative */}
                <div
                  className="pointer-events-none absolute -bottom-4 right-0 h-10 w-28 rounded-full opacity-50 blur-[33px]"
                  style={{ backgroundColor: "#7723FF" }}
                  aria-hidden
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
