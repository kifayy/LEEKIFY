"use client";

import { useState } from "react";
import { Send } from "lucide-react";

const NEWSLETTER_URL = "https://awarded.app/newsletter";

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
      <section className="w-full py-12 md:py-20">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          {/* Figma Newsletter: gold background, rounded, decorative shapes */}
          <div
            className="relative overflow-hidden rounded-[30px] px-6 py-12 md:px-16 md:py-16"
            style={{ backgroundColor: "#FAE049" }}
          >
            {/* Decorative white shapes - Figma left/right vectors */}
            <div
              className="pointer-events-none absolute left-6 top-6 h-48 w-64 rounded-[40px] bg-white/95 md:left-10 md:h-64 md:w-80"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute bottom-6 right-6 h-56 w-40 rounded-[30px] bg-white/95 md:right-10 md:h-72 md:w-56"
              aria-hidden
            />

            <div className="relative mx-auto max-w-2xl text-center">
              <h2
                className="text-2xl font-bold tracking-tight md:text-3xl"
                style={{ color: "#2D3134" }}
              >
                Sign up to our newsletter
              </h2>
              <p
                className="mt-4 text-sm leading-relaxed md:text-base"
                style={{ color: "rgba(25, 24, 37, 0.75)" }}
              >
                Get scholarship tips, new opportunities, and updates delivered to your inbox. Join thousands of students.
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-stretch"
              >
                <input
                  type="email"
                  placeholder="Enter Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-xl border-0 bg-white px-6 py-4 text-base shadow-sm outline-none placeholder:text-[#5F5F62] focus:ring-2 focus:ring-[#5D50C6]/30"
                  required
                />
                <button
                  type="submit"
                  className="flex h-[59px] min-h-[59px] w-full items-center justify-center gap-2 rounded-xl bg-[#816AFF] px-6 text-white shadow-[0_5px_14px_rgba(255,100,50,0.25)] transition-opacity hover:opacity-95 sm:w-auto sm:min-w-[60px]"
                  aria-label="Subscribe"
                >
                  <Send className="h-5 w-5" strokeWidth={2} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-base font-semibold md:text-xl">
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
