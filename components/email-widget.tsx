"use client";

import Image from "next/image";
import { Star } from "lucide-react";

const BEEHIIV_EMBED_URL = "https://subscribe-forms.beehiiv.com/22508440-48d4-4c89-845f-6e9406a7b6d2";
const NEWSLETTER_IMAGE_URL =
  "https://storage.googleapis.com/images_592/Which%20College%20Path%20Unlocks%20The%20Most%20Scholarships%20(4).png";

/**
 * Reusable email signup widget: purple-bordered card with stars, "Want emails instead?", Beehiiv embed, and image.
 * Use in any page or section where you want to capture email signups.
 */
export function EmailWidget() {
  return (
    <section className="w-full min-w-0 overflow-x-hidden py-10 md:py-20">
      <div className="container mx-auto max-w-6xl px-4 md:px-6 min-w-0">
        <div
          className="relative flex min-w-0 flex-col gap-6 rounded-[24px] border-2 bg-white px-4 py-8 md:flex-row md:items-center md:justify-between md:gap-8 md:rounded-[30px] md:px-16 md:py-16"
          style={{ borderColor: "rgba(149, 110, 254, 0.4)" }}
        >
          {/* Content - above image on mobile, left on desktop; centered text on mobile */}
          <div className="order-1 flex min-w-0 flex-1 flex-col items-center gap-4 text-center md:min-w-[320px] md:flex-shrink-0 md:order-1 md:items-start md:text-left">
            <div className="inline-flex w-fit items-center gap-2">
              <div className="flex gap-0.5 text-pathpicker-gold" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <span className="text-sm font-medium text-[#181A1D]">Join 40k+ Students</span>
            </div>
            <h2 className="text-[1.95rem] font-bold tracking-tight text-[#181A1D] md:text-[2.44rem]">
              <span className="mr-2" aria-hidden>
                📧
              </span>
              Want emails instead?
            </h2>
            <p
              className="text-sm font-normal leading-relaxed md:text-base"
              style={{ color: "rgba(25, 24, 37, 0.75)" }}
            >
              Get scholarship tips, new opportunities, and updates delivered to your inbox. Join thousands of students.
            </p>
            <div className="mx-auto h-[100px] w-full max-w-full shrink-0 md:mx-0 md:h-[80px] md:max-w-[450px]">
              <iframe
                src={BEEHIIV_EMBED_URL}
                className="beehiiv-embed h-full w-full"
                data-test-id="beehiiv-embed"
                frameBorder={0}
                scrolling="no"
                style={{
                  width: "100%",
                  minWidth: "0",
                  maxWidth: "100%",
                  height: "80px",
                  margin: 0,
                  borderRadius: 0,
                  backgroundColor: "transparent",
                  boxShadow: "0 0 #0000",
                }}
                title="Newsletter signup"
              />
            </div>
          </div>
          {/* Image - below content on mobile, right on desktop */}
          <div className="order-2 mt-8 min-w-0 shrink-0 md:mt-0 md:order-2 md:max-w-[420px]">
            <Image
              src={NEWSLETTER_IMAGE_URL}
              alt="Which College Path Unlocks The Most Scholarships"
              width={675}
              height={450}
              className="w-full rounded-lg object-cover"
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
}
