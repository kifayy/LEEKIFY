"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Lottie from "lottie-react";
import { ArrowRight, Star } from "lucide-react";

const SCHOLARSHIP_IMAGE =
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=778&h=552&fit=crop";
const ARCHETYPE_IMAGE =
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=778&h=552&fit=crop";

const GREEKER_URL = "https://storage.googleapis.com/images_592/Greeker%20(3).png";
const PLACEHOLDER_LOGOS = [
  "https://storage.googleapis.com/images_592/P1laceholder%20Logo%404x.png",
  "https://storage.googleapis.com/images_592/Placeholder%20Log7o%404x.png",
  "https://storage.googleapis.com/images_592/Placeholder%20Logo%404x.png",
  GREEKER_URL,
];

function LogoSlot({ src }: { src: string }) {
  const isGreeker = src === GREEKER_URL;
  return (
    <div
      className={`flex shrink-0 items-center justify-center px-4 md:px-6 ${isGreeker ? "pt-[0.6rem]" : ""}`}
    >
      <Image
        src={src}
        alt=""
        width={isGreeker ? 230 : 200}
        height={isGreeker ? 138 : 120}
        className={
          isGreeker
            ? "h-[5.75rem] w-auto object-contain md:h-[6.9rem]"
            : "h-20 w-auto object-contain md:h-24"
        }
        unoptimized
      />
    </div>
  );
}

const CARDS = [
  {
    href: "/scholarship-quiz",
    title: "Scholarship Quiz",
    description:
      "Find scholarships matched to your profile. Quick apply, no-essay options. Get money without the grind.",
    image: SCHOLARSHIP_IMAGE,
    cta: "Take Quiz",
  },
  {
    href: "http://my.pathpicker.com/archetype",
    title: "Archetype Quiz",
    description:
      "Find your archetype. Join 40k+ peers and see what type of student you are. Discover your profile.",
    image: ARCHETYPE_IMAGE,
    cta: "Take Quiz",
  },
];

export function HeroQuizCards() {
  const [scholarshipAnimationData, setScholarshipAnimationData] = useState<object | null>(null);

  useEffect(() => {
    fetch("/animations/9_16.json")
      .then((res) => res.json())
      .then(setScholarshipAnimationData)
      .catch(() => {});
  }, []);

  return (
    <section className="w-full min-w-0 overflow-x-hidden py-6 md:py-20">
      <div className="container mx-auto max-w-6xl px-4 md:px-6 min-w-0">
        <div className="flex flex-col items-stretch gap-5 sm:flex-row sm:items-stretch sm:justify-center sm:gap-5">
          {CARDS.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              target={card.href.includes("archetype") || card.href.includes("pathpicker.com") ? "_blank" : undefined}
              rel={card.href.includes("archetype") || card.href.includes("pathpicker.com") ? "noopener noreferrer" : undefined}
              className="group relative flex h-full w-full max-w-[389px] flex-col overflow-hidden rounded-[29px] bg-white transition-shadow hover:shadow-[0_9px_59px_rgba(174,165,114,0.12)] sm:w-[389px] sm:max-w-[480px] md:max-w-[480px] md:w-[480px] lg:max-w-[520px] lg:w-[520px]"
            >
              {/* Card - Figma travel_card structure */}
              <div className="relative flex min-h-0 flex-1 flex-col">
                {/* Image area - hidden for Archetype and Scholarship cards (they use marquee/Lottie) */}
                {!card.href.includes("archetype") && card.href !== "/scholarship-quiz" && (
                  <div className="relative aspect-[389/276] w-full overflow-hidden rounded-t-[39px] bg-[#F7F7F7] md:aspect-[480/320] lg:aspect-[520/346]">
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
                )}

                {/* Content - white section + gray bottom */}
                <div
                  className={
                    card.href.includes("archetype") || card.href === "/scholarship-quiz"
                      ? "flex min-h-0 flex-1 flex-col rounded-t-[29px] rounded-b-[29px] bg-white"
                      : "flex min-h-0 flex-1 flex-col rounded-b-[29px] bg-white"
                  }
                >
                  {/* Title + description */}
                  <div className="min-h-0 flex-1 px-5 pt-4 font-sans text-center md:text-left">
                    {/* Fixed-height slot so both cards match; h-[11rem] md:h-[13rem] */}
                    {card.href.includes("archetype") && (
                      <div className="mb-3 flex h-[11rem] min-h-[11rem] items-center md:h-[13rem] md:min-h-[13rem]">
                        <div className="marquee-fade-edges -mx-2 max-w-full overflow-hidden px-0 py-2">
                          <div className="flex w-max animate-marquee-x">
                            {[...PLACEHOLDER_LOGOS, ...PLACEHOLDER_LOGOS].map((src, i) => (
                              <LogoSlot key={i} src={src} />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    {card.href === "/scholarship-quiz" && (
                      <div className="mb-3 flex h-[11rem] min-h-[11rem] items-center justify-center md:h-[13rem] md:min-h-[13rem]">
                        {scholarshipAnimationData && (
                          <Lottie
                            animationData={scholarshipAnimationData}
                            loop
                            className="h-44 w-full max-w-[400px] md:h-52 md:max-w-[420px] lg:h-56 lg:max-w-[460px]"
                          />
                        )}
                      </div>
                    )}
                    <h2 className="text-xl font-bold text-[#0C1120]">
                      {card.title}
                    </h2>
                    <p
                      className="mt-2 line-clamp-2 text-sm font-sans leading-relaxed"
                      style={{ color: "rgba(12, 17, 32, 0.6)" }}
                    >
                      {card.description}
                    </p>
                  </div>
                  {/* Take Quiz button at bottom - mt-auto so buttons align across cards */}
                  <div className="mt-auto shrink-0 px-4 pb-5 pt-4">
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
