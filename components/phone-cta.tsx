"use client";

import Image from "next/image";
import Link from "next/link";
import { ReviewsCard } from "@/components/home/reviews-carousel";

/** Reusable "Phone CTA" section: Student Money In Your Texts + SMS CTA + phone mockups. Use on home, landing, or any page. */
const HEADING_COLOR = "#181A1D";
const BODY_COLOR = "rgb(88, 89, 93)";

type PhoneCtaSectionProps = {
  /** When true, show the Reviews card to the left (e.g. newsletter page). */
  showReviewsSidebar?: boolean;
  /** When true (e.g. home page), use mobile-only alternate copy, image, and Take Quiz CTA. */
  isHomePage?: boolean;
};

const MOBILE_HOME_IMAGE =
  "https://storage.googleapis.com/images_592/Untitled%20design%20(42).png";

const SMS_HREF =
  "sms:+18559224190?&body=" + encodeURIComponent("Hey! Send me any scholarships!");

export function PhoneCtaSection({ showReviewsSidebar, isHomePage }: PhoneCtaSectionProps = {}) {
  return (
    <section className="w-full min-w-0 overflow-x-hidden bg-white py-10 md:py-20">
      <div className="container mx-auto max-w-[1024px] min-w-0 px-4 md:px-6">
        <div className="mx-auto mb-4 flex justify-center md:mb-6">
          <Image
            src="https://storage.googleapis.com/images_592/23adasd.png"
            alt=""
            width={512}
            height={200}
            className="h-auto w-full max-w-[274px] object-contain md:max-w-[360px]"
            sizes="(max-width: 768px) 274px, 360px"
            unoptimized
          />
        </div>

        <h2
          className={`mx-auto mb-4 max-w-[603px] text-center text-[2.44rem] font-bold leading-tight tracking-tight md:mb-5 md:text-[2.93rem] lg:mb-8 lg:leading-snug lg:text-[4.875rem] ${isHomePage ? "hidden md:block" : ""}`}
          style={{ color: HEADING_COLOR }}
        >
          Student Money In <span style={{ color: "#007aff" }}>Your Texts</span>
        </h2>
        {isHomePage && (
          <>
            <h2
              className="mx-auto mb-4 max-w-[603px] text-center text-[2.44rem] font-bold leading-tight tracking-tight md:mb-5 md:hidden md:text-[2.93rem]"
              style={{ color: HEADING_COLOR }}
            >
              Win Scholarships <span style={{ color: "#aa8afe" }}>4.2x FASTER</span>
            </h2>
            <p
              className="mx-auto mb-4 max-w-[560px] text-center text-base leading-relaxed md:mb-6 md:hidden md:text-lg"
              style={{ color: BODY_COLOR }}
            >
              Awarded is used by students who want to beat the competition, with less work.
            </p>
          </>
        )}
        <p
          className={`mx-auto mb-4 max-w-[560px] text-center text-base leading-relaxed md:mb-6 md:text-lg ${isHomePage ? "max-md:hidden" : ""}`}
          style={{ color: BODY_COLOR }}
        >
          Scholarships, brand giveaways, and exclusive student deals; Awarded scans and finds student money with your name on it.
        </p>

        {/* Mobile (non-home): tap-to-text — QR is desktop-only (scanning on same device is awkward). */}
        {!isHomePage && (
          <div className="mx-auto mb-4 flex flex-col items-center md:hidden">
            <a
              href={SMS_HREF}
              className="inline-flex h-14 min-w-[220px] items-center justify-center rounded-full bg-[#007aff] px-8 text-base font-semibold text-white shadow-[0_2px_12px_rgba(0,122,255,0.25)] transition hover:opacity-95"
            >
              Text us to start
            </a>
            <p className="mt-2 text-center text-xs font-medium" style={{ color: BODY_COLOR }}>
              Free • No App Required • No Sign-up
            </p>
          </div>
        )}

        {/* Desktop: QR on the right, image on the left. QR hidden below md — use SMS button above on mobile. */}
        <div
          className={`mx-auto mb-4 flex flex-col md:mb-6 md:flex-row-reverse md:items-center md:gap-8 ${
            isHomePage ? "hidden md:flex" : ""
          }`}
        >
          {/* QR column (visually right on desktop via md:flex-row-reverse) — md+ only */}
          <div className="hidden flex-col items-center md:flex">
            <p className="mb-3 text-center text-sm font-semibold text-[#007aff] md:text-base">
              Scan with your phone
            </p>
            <div className="flex w-full max-w-[420px] items-center justify-center">
              <div className="flex items-center justify-center rounded-2xl bg-white p-4 shadow-[0_2px_12px_rgba(15,23,42,0.18)]">
                <Image
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
                    "sms:+18559224190?&body=Hey! Send me any scholarships!"
                  )}`}
                  alt="Scan to text us about scholarships"
                  width={220}
                  height={220}
                  className="h-[220px] w-[220px] object-contain"
                  unoptimized
                />
              </div>
            </div>
            <p className="mt-1 text-center text-sm font-medium md:text-base" style={{ color: BODY_COLOR }}>
              Free • No App Required • No Sign-up
            </p>
          </div>

          {/* Image column (visually left on desktop via md:flex-row-reverse) */}
          <div className="flex justify-center">
            <Image
              src="https://storage.googleapis.com/images_592/fas22.png"
              alt="Message conversation — win scholarships from your texts"
              width={400}
              height={200}
              className="h-auto w-full max-w-[420px] object-contain md:max-w-[720px]"
              sizes="(max-width: 768px) 420px, 720px"
              unoptimized
            />
          </div>
        </div>
        {isHomePage && (
          <div className="mx-auto mb-3 flex flex-col items-center md:mb-4 md:hidden">
            <Link
              href="/awarded-app"
              className="inline-flex h-16 min-w-[200px] items-center justify-center gap-2 rounded-full bg-[#956EFE] px-8 text-base font-medium text-white shadow-[0_2px_8px_rgba(149,110,254,0.25)] transition hover:opacity-95"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Apple_logo_white.svg/1920px-Apple_logo_white.svg.png"
                alt=""
                className="h-6 w-6 object-contain"
                aria-hidden
              />
              Take Quiz
            </Link>
          </div>
        )}

        {isHomePage && (
          <div className="mx-auto mb-4 flex justify-center md:mb-6 md:hidden">
            <Image
              src={MOBILE_HOME_IMAGE}
              alt="Student freebies you match with"
              width={400}
              height={200}
              className="h-auto w-full max-w-[420px] object-contain"
              sizes="(max-width: 768px) 420px, 720px"
              unoptimized
            />
          </div>
        )}

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
