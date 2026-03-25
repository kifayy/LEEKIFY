import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AwardedRotatingScholarshipCard } from "./rotating-scholarship-card";
import { AwardedReviewsCarousel } from "./awarded-reviews-carousel";
import { VimeoInTikTokMockup } from "@/components/home/vimeo-tiktok-mockup";

const QR_SRC =
  "https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=sms%3A%2B18559224190%3F%26body%3DHey!%20Send%20me%20any%20scholarships!";

export const metadata: Metadata = {
  title: "Awarded — Student money in your texts",
  description:
    "Scholarships, brand giveaways, and exclusive student deals; Awarded finds student money with your name on it.",
};

export default function AwardedAppPage() {
  return (
    <main className="min-w-0 bg-white py-8 pb-28 md:py-12 md:pb-12">
      <div className="container mx-auto max-w-[1024px] min-w-0 px-4 md:px-6">
        <div className="mx-auto mb-4 flex justify-center md:mb-6">
          <Image
            alt=""
            src="https://storage.googleapis.com/images_592/4.8%20(7).png"
            width={512}
            height={200}
            priority
            fetchPriority="high"
            sizes="(max-width: 768px) 154px, 202px"
            className="h-auto w-full max-w-[154px] translate-x-2 object-contain md:max-w-[202px] md:translate-x-3"
          />
        </div>
        <h2
          className="mx-auto mb-4 hidden max-w-[603px] text-center text-[2.44rem] font-bold leading-tight tracking-tight md:mb-5 md:block md:text-[2.93rem] lg:mb-8 lg:leading-snug lg:text-[4.875rem]"
          style={{ color: "#181A1D" }}
        >
          Student Money In <span style={{ color: "#007aff" }}>Your Texts</span>
        </h2>
        <h2
          className="mx-auto mb-4 max-w-[603px] text-center text-[2.44rem] font-bold leading-tight tracking-tight md:mb-5 md:hidden md:text-[2.93rem]"
          style={{ color: "#181A1D" }}
        >
          Win Scholarships <span className="text-black">4.2x FASTER</span>
        </h2>
        <p
          className="mx-auto mb-4 max-w-[560px] text-center text-base leading-relaxed md:mb-6 md:hidden md:text-lg"
          style={{ color: "rgb(88, 89, 93)" }}
        >
          How many scholarships can you win? Take the quiz and see!
        </p>
        <p
          className="mx-auto mb-4 max-w-[560px] text-center text-base leading-relaxed md:mb-6 md:text-lg max-md:hidden"
          style={{ color: "rgb(88, 89, 93)" }}
        >
          Scholarships, brand giveaways, and exclusive student deals; Awarded scans and finds student money
          with your name on it.
        </p>
        <AwardedRotatingScholarshipCard />
        <div className="mx-auto mb-4 hidden flex-col md:mb-6 md:flex md:flex-row-reverse md:items-center md:gap-8">
          <div className="hidden flex-col items-center md:flex">
            <p className="mb-3 text-center text-sm font-semibold text-[#007aff] md:text-base">
              Scan with your phone
            </p>
            <div className="flex w-full max-w-[420px] items-center justify-center">
              <div className="flex items-center justify-center rounded-2xl bg-white p-4 shadow-[0_2px_12px_rgba(15,23,42,0.18)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Scan to text us about scholarships"
                  src={QR_SRC}
                  width={220}
                  height={220}
                  className="h-[220px] w-[220px] object-contain"
                />
              </div>
            </div>
            <p className="mt-1 text-center text-sm font-medium md:text-base" style={{ color: "rgb(88, 89, 93)" }}>
              Free • No App Required • No Sign-up
            </p>
          </div>
          <div className="flex justify-center">
            <Image
              alt="Message conversation — win scholarships from your texts"
              src="https://storage.googleapis.com/images_592/fas22.png"
              width={400}
              height={200}
              className="h-auto w-full max-w-[420px] object-contain md:max-w-[720px]"
              unoptimized
            />
          </div>
        </div>
        <div className="mx-auto mb-4 flex flex-col items-center gap-5 md:mb-6 md:hidden">
          <Image
            alt="Student freebies you match with"
            src="https://storage.googleapis.com/images_592/Untitled%20design%20(42).png"
            width={400}
            height={200}
            className="h-auto w-full max-w-[420px] object-contain"
            unoptimized
          />
          <AwardedReviewsCarousel />
          <section className="w-full px-0 pt-1 pb-2" aria-label="Awarded app video">
            <div className="container mx-auto max-w-lg">
              <VimeoInTikTokMockup ctaLabel="Take on iOS" />
            </div>
          </section>
        </div>
      </div>

      <div
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-black/[0.06] bg-white/95 px-4 py-3 shadow-[0_-4px_24px_rgba(15,23,42,0.08)] backdrop-blur-md supports-[backdrop-filter]:bg-white/85"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <div className="mx-auto flex max-w-[1024px] justify-center">
          <Link
            href="https://awarded.short.gy/9iTh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-16 min-w-[200px] w-full max-w-sm items-center justify-center gap-2 rounded-full bg-[#956EFE] px-8 text-xl font-semibold text-white shadow-[0_2px_8px_rgba(149,110,254,0.25)] transition hover:opacity-95 active:opacity-90"
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
      </div>
    </main>
  );
}
