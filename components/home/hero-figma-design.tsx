"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const HERO_IMAGE = "https://my.pathpicker.com/images/hero-student.png";

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

export function HeroFigmaDesign() {
  return (
    <section className="relative w-full overflow-hidden bg-white pt-6 md:pt-12">
      {/* Blurred blue glow */}
      <div
        className="absolute left-1/2 top-8 -translate-x-1/2 h-[305px] w-[312px] rounded-full opacity-[0.18] blur-[197px] md:left-[45%] md:top-12"
        style={{ backgroundColor: "rgb(61, 159, 251)" }}
      />

      <div className="container relative mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:gap-12">
          {/* Left: Content */}
          <div className="flex max-w-[421px] flex-1 flex-col gap-8 lg:pt-6">
            {/* Badge */}
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 shadow-[0_0_0_1px_rgba(0,0,0,0.07),0_74px_74px_rgba(0,0,0,0.07)]">
              <span
                className="text-sm font-medium"
                style={{ color: "#F85E9F" }}
              >
                Explore opportunities!
              </span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="shrink-0"
                style={{ color: "#F85E9F" }}
              >
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Character logos marquee */}
            <div className="marquee-fade-edges -mx-2 max-w-md overflow-hidden px-2 py-3 md:max-w-lg">
              <div className="flex w-max animate-marquee-x">
                {[...PLACEHOLDER_LOGOS, ...PLACEHOLDER_LOGOS].map((src, i) => (
                  <LogoSlot key={i} src={src} />
                ))}
              </div>
            </div>

            {/* Headline */}
            <h1 className="font-volkhov text-3xl font-bold leading-tight tracking-tight text-[#181A1D] md:text-4xl lg:text-5xl">
              Travel top destination of the world
            </h1>

            {/* Subtitle */}
            <p className="max-w-[421px] text-base leading-relaxed text-[#181A1D]/75 md:text-lg">
              Where adventure meets comfort. We create unforgettable travel
              experiences
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Button
                asChild
                className="rounded-full bg-[#5D50C6] px-6 py-3 text-[#EEE] shadow-[0_2px_5px_rgba(85,51,209,0.1)] hover:bg-[#5245b0]"
              >
                <Link href="/student-archetype-quiz">Get Started</Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="rounded-full border-[#EEE] bg-white px-6 py-3 text-[#22231B] hover:bg-gray-50"
              >
                <Link
                  href="/student-archetype-quiz"
                  className="flex items-center gap-2"
                >
                  <Play
                    className="size-6 fill-[#5D50C6] text-[#5D50C6]"
                    strokeWidth={2}
                  />
                  Watch Demo
                </Link>
              </Button>
            </div>
          </div>

          {/* Right: Image + decorative elements */}
          <div className="relative w-full max-w-[580px] lg:min-h-[520px]">
            {/* Blue circle */}
            <div
              className="absolute right-0 top-0 hidden h-[320px] w-[320px] rounded-full opacity-100 md:block lg:right-8 lg:h-[400px] lg:w-[400px] xl:h-[528px] xl:w-[528px]"
              style={{ backgroundColor: "rgb(57, 160, 255)" }}
            />

            {/* Decorative pink vectors - simplified */}
            <div
              className="absolute right-12 top-6 hidden h-6 w-5 opacity-100 md:block"
              style={{ color: "#F85E9F" }}
            >
              <svg viewBox="0 0 20 30" fill="currentColor">
                <path d="M10 0L0 30h20L10 0z" />
              </svg>
            </div>

            {/* Hero image */}
            <div className="relative z-10 mx-auto mt-4 aspect-[3/4] max-h-[480px] w-full max-w-[400px] overflow-hidden rounded-2xl md:absolute md:right-0 md:top-8 md:mt-0 md:max-h-[520px] md:max-w-[420px] lg:max-h-[560px] lg:max-w-[460px]">
              <Image
                src={HERO_IMAGE}
                alt="Traveler"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 420px"
                priority
              />
            </div>

            {/* Stats card */}
            <div className="absolute right-0 top-[45%] z-20 hidden w-[171px] rounded-[10px] bg-white p-4 shadow-[0_9px_59px_rgba(174,165,114,0.08)] md:block lg:right-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-white to-transparent">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-[#FACD49]"
                  >
                    <path
                      d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
                <div>
                  <p
                    className="text-xl font-bold"
                    style={{ color: "#5D50C6" }}
                  >
                    5000+
                  </p>
                  <p className="text-xs text-[#5B5F62]">Customers</p>
                </div>
              </div>
            </div>

            {/* Top Places pill */}
            <div className="absolute bottom-[28%] left-0 z-20 hidden items-center gap-2 rounded-full bg-white px-5 py-2.5 shadow-[0_42px_26px_rgba(0,0,0,0.05)] md:flex lg:left-4">
              <MapPin className="size-6 text-[#FACD49]" />
              <span className="text-sm font-medium text-[#3A3E46]">
                Top Places
              </span>
            </div>

            {/* Top Hotels pill */}
            <div className="absolute bottom-[12%] right-0 z-20 flex items-center gap-2 rounded-full bg-white px-5 py-2.5 shadow-[0_42px_26px_rgba(0,0,0,0.05)] md:right-8">
              <MapPin className="size-6 text-[#FACD49]" />
              <span className="text-sm font-medium text-[#3A3E46]">
                Top Hotels
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Soft pink glow bottom-right */}
      <div
        className="pointer-events-none absolute -bottom-20 right-0 h-[260px] w-[400px] opacity-10 md:-right-20"
        style={{
          background:
            "radial-gradient(ellipse at center, rgb(250, 134, 183) 0%, transparent 70%)",
        }}
      />
    </section>
  );
}
