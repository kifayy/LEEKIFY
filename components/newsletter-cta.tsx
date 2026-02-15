"use client";

import { useState } from "react";
import Image from "next/image";
import { Send, Star } from "lucide-react";

const NEWSLETTER_URL = "https://awarded.app/newsletter";
const NEWSLETTER_IMAGE_URL = "https://storage.googleapis.com/images_592/Which%20College%20Path%20Unlocks%20The%20Most%20Scholarships%20(4).png";
const BEEHIIV_EMBED_URL = "https://subscribe-forms.beehiiv.com/22508440-48d4-4c89-845f-6e9406a7b6d2";

export function NewsletterCTA({
  variant = "default",
}: {
  variant?: "default" | "footer" | "want-scholarships";
}) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(NEWSLETTER_URL, "_blank", "noopener,noreferrer");
  };

  if (variant === "want-scholarships") {
    return (
      <section className="w-full min-w-0 overflow-x-hidden py-10 md:py-20">
        <div className="container mx-auto max-w-6xl px-4 md:px-6 min-w-0">
          {/* Newsletter: white bg, slight purple stroke, image + Beehiiv embed */}
          <div
            className="relative flex min-w-0 flex-col gap-6 rounded-[24px] border-2 bg-white px-4 py-8 md:flex-row md:items-center md:justify-between md:gap-8 md:rounded-[30px] md:px-16 md:py-16"
            style={{ borderColor: "rgba(149, 110, 254, 0.4)" }}
          >
            {/* Content - above image on mobile, left on desktop */}
            <div className="order-1 flex min-w-0 flex-1 flex-col gap-4 md:min-w-[320px] md:flex-shrink-0 md:order-1">
              <div className="inline-flex w-fit items-center gap-2">
                <div className="flex gap-0.5 text-pathpicker-gold" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm font-medium text-[#181A1D]">
                  Join 20k+ Students
                </span>
              </div>
              <h2 className="text-xl font-bold tracking-tight text-[#181A1D] md:text-3xl">
                Sign up to our newsletter
              </h2>
              <p
                className="text-sm font-normal leading-relaxed md:text-base"
                style={{ color: "rgba(25, 24, 37, 0.75)" }}
              >
                Get scholarship tips, new opportunities, and updates delivered to your inbox. Join thousands of students.
              </p>
              <div className="h-[80px] w-full max-w-full shrink-0 md:h-[80px] md:max-w-[450px]">
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
            {/* Image - below content on mobile, right on desktop (50% larger) */}
            <div className="order-2 min-w-0 shrink-0 md:order-2 md:max-w-[420px]">
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

  return (
    <div className="space-y-4">
      <h3 className="text-base font-bold md:text-xl">
        Join our <span className="font-script font-normal italic">newsletter</span> & win scholarships.
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex h-12 w-full rounded-xl border border-input bg-transparent px-4 py-3 text-base shadow-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-pathpicker-purple md:max-w-xs"
        />
        <button
          type="submit"
          className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-pathpicker-purple px-4 py-3 text-white hover:opacity-95 sm:w-auto"
        >
          <Send className="h-4 w-4" />
          Join
        </button>
      </form>
    </div>
  );
}
