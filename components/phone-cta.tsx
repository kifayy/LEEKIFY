"use client";

import Image from "next/image";
import Link from "next/link";
import { ReviewsCard } from "@/components/home/reviews-carousel";
import { SCHOLARSHIP_SCANNER_SMS_URL } from "@/lib/constants";

/** Reusable "Phone CTA" section: Win Scholarships From Your Texts + SMS CTA + phone mockups. Use on home, landing, or any page. */
const HEADING_COLOR = "#181A1D";
const BODY_COLOR = "rgb(88, 89, 93)";

type PhoneCtaSectionProps = {
  /** When true, show the Reviews card to the left (e.g. newsletter page). */
  showReviewsSidebar?: boolean;
};

export function PhoneCtaSection({ showReviewsSidebar }: PhoneCtaSectionProps = {}) {
  return (
    <section className="w-full min-w-0 overflow-x-hidden bg-white py-10 md:py-20">
      <div className="container mx-auto max-w-[1024px] min-w-0 px-4 md:px-6">
        <div className="mx-auto mb-4 flex justify-center md:mb-6">
          <Image
            src="https://storage.googleapis.com/images_592/Group%2039885.png"
            alt=""
            width={512}
            height={200}
            className="h-auto w-full max-w-[137px] object-contain md:max-w-[180px]"
            sizes="(max-width: 768px) 137px, 180px"
            unoptimized
          />
        </div>

        <h2
          className="mx-auto mb-4 max-w-[603px] text-center text-3xl font-bold leading-tight tracking-tight md:mb-5 md:text-4xl lg:mb-8 lg:leading-snug lg:text-[3.75rem]"
          style={{ color: HEADING_COLOR }}
        >
          Win Scholarships From <span style={{ color: "#007aff" }}>Your Texts</span>
        </h2>

        <div className="mx-auto mb-3 flex flex-col items-center md:mb-4">
          <Link
            href={SCHOLARSHIP_SCANNER_SMS_URL}
            className="relative block h-[131px] w-full max-w-[582px] overflow-hidden rounded-lg transition-opacity hover:opacity-95 active:opacity-90 md:h-[160px] md:max-w-[692px]"
            aria-label="Get started — Scholarship Scanner (opens SMS)"
          >
            <Image
              src="https://storage.googleapis.com/images_592/Group%201SS0.png"
              alt="Get started — Scholarship Scanner"
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

        <div className="mx-auto mb-4 flex justify-center md:mb-6">
          <Image
            src="https://storage.googleapis.com/images_592/Yellow%20and%20Blue%20Simple%20Message%20Conservation%20Instagram%20Post.png"
            alt="Message conversation — win scholarships from your texts"
            width={400}
            height={200}
            className="h-auto w-full max-w-[420px] object-contain md:max-w-[720px]"
            sizes="(max-width: 768px) 420px, 720px"
            unoptimized
          />
        </div>

        <p
          className="mx-auto mb-6 max-w-[560px] text-center text-base leading-relaxed md:mb-8 md:text-lg lg:mb-10 lg:leading-loose"
          style={{ color: BODY_COLOR }}
        >
          Our algorithm scans 1,000+ scholarships every week and sends you two easy ones you personally matched with.
        </p>

        {(showReviewsSidebar && (
          <div className="mx-auto mb-10 flex flex-col items-stretch gap-8 md:mb-14 md:max-w-6xl md:flex-row md:flex-nowrap md:items-center md:justify-center md:gap-12 md:hidden">
            <div className="w-full min-w-0 shrink-0 md:w-[420px] md:min-w-0 md:max-w-[420px] md:flex-none">
              <ReviewsCard />
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}
