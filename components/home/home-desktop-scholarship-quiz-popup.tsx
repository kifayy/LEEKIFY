"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Star, X } from "lucide-react";
import { SCHOLARSHIP_QUIZ_URL } from "@/lib/constants";

const DELAY_MS = 10_000;
const SESSION_KEY = "pathpicker-home-scholarship-quiz-popup-dismissed";
const IMAGE_URL =
  "https://storage.googleapis.com/images_592/NY%20zeal%20(4).png";

/** Desktop (md+): home only — modal after 10s with image, headline, and quiz CTA. */
export function HomeDesktopScholarshipQuizPopup() {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
    setOpen(false);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") return;
    } catch {
      /* ignore */
    }

    const mq = window.matchMedia("(min-width: 768px)");
    if (!mq.matches) return;

    const timer = window.setTimeout(() => {
      if (window.matchMedia("(min-width: 768px)").matches) setOpen(true);
    }, DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, handleClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[110] hidden items-center justify-center bg-black/50 p-4 backdrop-blur-sm md:flex"
      role="dialog"
      aria-modal="true"
      aria-labelledby="home-scholarship-quiz-popup-title"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Close dialog"
        onClick={handleClose}
      />
      <div
        className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-[#E5E5E7] bg-white shadow-[0_24px_64px_rgba(15,23,42,0.18)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full text-[#6B7280] transition-colors hover:bg-[#F3F4F6] hover:text-[#181A1D]"
          aria-label="Close"
        >
          <X className="h-5 w-5" strokeWidth={2} />
        </button>

        <div className="relative aspect-[4/3] w-full bg-white">
          <Image
            src={IMAGE_URL}
            alt=""
            fill
            className="object-contain object-center"
            sizes="(min-width: 768px) 448px, 0px"
            unoptimized
          />
        </div>

        <div className="bg-white px-6 pb-6 pt-4 text-center">
          <div className="mb-4 flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-0.5 text-pathpicker-gold" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current sm:h-[1.125rem] sm:w-[1.125rem]" />
              ))}
            </div>
            <p className="text-sm font-semibold text-[#181A1D]">10k+ Students</p>
          </div>
          <h2
            id="home-scholarship-quiz-popup-title"
            className="text-xl font-bold leading-snug tracking-tight text-[#181A1D] md:text-2xl"
          >
            <span className="block">How Many Scholarships</span>
            <span className="block">Can You Get?</span>
          </h2>
          <Link
            href={SCHOLARSHIP_QUIZ_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex h-12 w-full max-w-xs items-center justify-center rounded-full bg-[#956EFE] px-8 text-base font-semibold text-white shadow-[0_2px_8px_rgba(149,110,254,0.25)] transition-opacity hover:opacity-95"
          >
            Take the Quiz
          </Link>
        </div>
      </div>
    </div>
  );
}
