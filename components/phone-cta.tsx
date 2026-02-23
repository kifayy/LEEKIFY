"use client";

import Image from "next/image";
import Link from "next/link";

/** Reusable "Phone CTA" section: Win Scholarships From Your Texts + SMS CTA + phone mockups. Use on home, landing, or any page. */
const HEADING_COLOR = "#181A1D";
const BODY_COLOR = "rgb(88, 89, 93)";

export function PhoneCtaSection() {
  return (
    <section className="w-full min-w-0 overflow-x-hidden bg-white py-10 md:py-20">
      <div className="container mx-auto max-w-[1024px] min-w-0 px-4 md:px-6">
        <p
          className="mx-auto mb-3 max-w-[560px] text-center text-sm md:mb-4 md:text-base lg:mb-6"
          style={{ color: BODY_COLOR }}
        >
          🔥 3,241 students joined this month
        </p>

        <div className="mx-auto mb-4 flex justify-center md:mb-6">
          <Image
            src="https://storage.googleapis.com/images_592/42adasd%20.png"
            alt=""
            width={400}
            height={200}
            className="h-auto w-full max-w-[280px] object-contain md:max-w-[360px]"
            sizes="(max-width: 768px) 280px, 360px"
            unoptimized
          />
        </div>

        <h2
          className="mx-auto mb-4 max-w-[603px] text-center text-3xl font-bold leading-tight tracking-tight md:mb-5 md:text-4xl lg:mb-8 lg:leading-snug lg:text-[3.75rem]"
          style={{ color: HEADING_COLOR }}
        >
          Win Scholarships From Your Texts
        </h2>
        <p
          className="mx-auto mb-6 max-w-[560px] text-center text-base leading-relaxed md:mb-8 md:text-lg lg:mb-10 lg:leading-loose"
          style={{ color: BODY_COLOR }}
        >
          Our algorithm scans 1,000+ scholarships every week and sends you two easy ones you personally matched with.
        </p>

        <div className="mx-auto mb-3 flex flex-col items-center md:mb-4">
          <Link
            href="/newsletter"
            className="relative block h-[131px] w-full max-w-[582px] overflow-hidden rounded-lg transition-opacity hover:opacity-95 active:opacity-90 md:h-[160px] md:max-w-[692px]"
            aria-label="Go to newsletter signup"
          >
            <Image
              src="https://storage.googleapis.com/images_592/Group%201SS0.png"
              alt="Get started — go to newsletter"
              fill
              className="object-contain object-center"
              sizes="(max-width: 768px) 582px, 692px"
              unoptimized
            />
          </Link>
          <p className="mt-2 text-center text-sm font-medium md:text-base" style={{ color: BODY_COLOR }}>
            Free • No App Required • No Sign-up
          </p>
        </div>

        <div className="mx-auto mb-10 flex flex-wrap items-center justify-center gap-8 md:mb-14 md:max-w-6xl md:flex-nowrap md:gap-12">
          <div className="relative h-[560px] w-full min-w-0 max-w-[760px] overflow-hidden rounded-xl md:h-[760px] md:max-w-[840px] md:flex-1 md:min-w-0">
            <Image
              src="https://storage.googleapis.com/images_592/Secfftion.png"
              alt="Scholarships to your phone"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized
            />
          </div>
          <div className="relative h-[560px] w-full min-w-0 max-w-[760px] overflow-hidden rounded-xl md:h-[760px] md:max-w-[840px] md:flex-1 md:min-w-0">
            <Image
              src="https://storage.googleapis.com/images_592/Gro2up%205.png"
              alt="Only 2 texts a week"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized
            />
          </div>
        </div>

        <div className="mx-auto flex justify-center">
          <Image
            src="https://storage.googleapis.com/images_592/Group%2039885.png"
            alt=""
            width={512}
            height={200}
            className="h-auto w-full max-w-[180px] object-contain md:max-w-[358px]"
            sizes="(max-width: 768px) 180px, 358px"
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}
