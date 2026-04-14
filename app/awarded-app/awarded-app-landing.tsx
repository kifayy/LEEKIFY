import Image from "next/image";
import Link from "next/link";
import { AwardedIosStickyFooter } from "./awarded-ios-sticky-footer";
import { AwardedRotatingScholarshipCard } from "./rotating-scholarship-card";
import { AwardedReviewsCarousel } from "./awarded-reviews-carousel";
import { VimeoInTikTokMockup } from "@/components/home/vimeo-tiktok-mockup";

const APP_STORE_URL = "https://apps.apple.com/us/app/awarded-win-scholarships/id6749553938";
const QR_SRC = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(APP_STORE_URL)}`;

/** Main marketing body for Awarded (shared with `/awarded-app` and post–PathPicker Excellence apply). */
export function AwardedAppLanding() {
  return (
    <main className="min-w-0 bg-white py-8 pb-28 md:py-12 md:pb-12">
      <div className="container mx-auto max-w-[1024px] min-w-0 px-4 md:px-6">
        <div className="mx-auto mb-4 flex justify-center md:mb-6">
          <Image
            alt="Student freebies you match with"
            src="https://storage.googleapis.com/images_592/Untitled%20design%20(42).png"
            width={400}
            height={200}
            priority
            fetchPriority="high"
            sizes="(max-width: 768px) 240px, 316px"
            unoptimized
            className="h-auto w-full max-w-[240px] translate-x-2 object-contain md:max-w-[316px] md:translate-x-3"
          />
        </div>
        <h2
          className="mx-auto mb-4 hidden max-w-[603px] text-center text-[2.44rem] font-bold leading-tight tracking-tight md:mb-5 md:block md:text-[2.93rem] lg:mb-8 lg:leading-snug lg:text-[4.875rem]"
          style={{ color: "#181A1D" }}
        >
          Scholarship Money <span className="text-[#956EFE]">In Minutes</span>
        </h2>
        <h2
          className="mx-auto mb-4 max-w-[603px] text-center text-[2.44rem] font-bold leading-tight tracking-tight md:mb-5 md:hidden md:text-[2.93rem]"
          style={{ color: "#181A1D" }}
        >
          Scholarship Money <span className="text-[#956EFE]">In Minutes</span>
        </h2>
        <p
          className="mx-auto mb-4 max-w-[560px] text-center text-base leading-relaxed md:mb-6 md:hidden md:text-lg"
          style={{ color: "rgb(88, 89, 93)" }}
        >
          How many scholarships can you win? Take the quiz and see!
        </p>
        <div className="mx-auto mb-4 flex justify-center md:mb-6 md:hidden">
          <Link
            href="https://awarded.short.gy/9iTh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-16 min-w-[200px] w-full max-w-sm animate-ios-cta-bounce items-center justify-center gap-2 rounded-full bg-[#956EFE] px-8 text-xl font-semibold text-white shadow-[0_2px_8px_rgba(149,110,254,0.25)] transition-opacity hover:opacity-95 active:opacity-90"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Apple_logo_white.svg/1920px-Apple_logo_white.svg.png"
              alt=""
              className="h-6 w-6 object-contain"
              aria-hidden
            />
            Take on iOS
          </Link>
        </div>
        <p
          className="mx-auto mb-4 max-w-[560px] text-center text-base leading-relaxed md:mb-6 md:text-lg max-md:hidden"
          style={{ color: "rgb(88, 89, 93)" }}
        >
          Scholarships, brand giveaways, and exclusive student deals; Awarded scans and finds student money
          with your name on it.
        </p>
        <div className="mx-auto mb-4 hidden md:mb-6 md:flex md:justify-center">
          <div className="flex flex-col items-center">
            <p className="mb-3 text-center text-sm font-semibold text-[#007aff] md:text-base">
              Scan with your phone
            </p>
            <div className="flex w-full max-w-[420px] items-center justify-center">
              <div className="flex items-center justify-center rounded-2xl bg-white p-4 shadow-[0_2px_12px_rgba(15,23,42,0.18)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Scan to download Awarded on the App Store"
                  src={QR_SRC}
                  width={220}
                  height={220}
                  className="h-[220px] w-[220px] object-contain"
                />
              </div>
            </div>
            <p className="mt-1 text-center text-sm font-semibold md:text-base" style={{ color: "#007aff" }}>
              Take Scholarship Quiz!
            </p>
          </div>
        </div>
        <AwardedRotatingScholarshipCard />
        <div className="mx-auto mb-4 flex flex-col items-center gap-5 md:mb-6 md:hidden">
          <Image
            alt=""
            src="https://storage.googleapis.com/images_592/4.8%20(7).png"
            width={512}
            height={200}
            sizes="179px"
            unoptimized
            className="h-auto w-full max-w-[179px] object-contain"
          />
          <AwardedReviewsCarousel />
          <section className="w-full px-0 pt-1 pb-2" aria-label="Awarded app video">
            <div className="container mx-auto max-w-lg">
              <VimeoInTikTokMockup ctaLabel="Take on iOS" ctaBounce />
            </div>
          </section>
        </div>
      </div>

      <AwardedIosStickyFooter />
    </main>
  );
}
