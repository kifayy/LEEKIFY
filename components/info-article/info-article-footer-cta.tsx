"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

type InfoArticleFooterCtaProps = {
  /** Short line above the headline (e.g. subscriber thank-you). */
  eyebrow?: string;
  headline: string;
  body: string;
};

export function InfoArticleFooterCta({ eyebrow, headline, body }: InfoArticleFooterCtaProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, website: "" }),
      });
      if (res.ok) {
        setStatus("done");
        setEmail("");
        return;
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#E8E4F8] bg-white shadow-[0_10px_36px_rgba(149,109,254,0.1)]">
      <div className="h-1 w-full bg-[#956DFE]" aria-hidden />
      <div className="px-6 py-8 text-center md:px-10 md:py-10">
        {eyebrow ? (
          <p className="font-[family-name:var(--font-inter)] text-[0.9375rem] font-semibold text-[#956DFE] md:text-base">
            {eyebrow}
          </p>
        ) : null}
        <p
          className={cn(
            "font-[family-name:var(--font-inter)] text-[1.5rem] font-bold leading-[1.22] tracking-[-0.035em] text-[#111111] md:text-[1.625rem]",
            eyebrow ? "mt-2" : "",
          )}
        >
          {headline}
        </p>
        <p className="mx-auto mt-4 max-w-[26rem] font-[family-name:var(--font-inter)] text-[0.9375rem] leading-[1.7] text-[#5C6370] md:text-base">
          {body}
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-7 w-full max-w-md"
        >
          <label htmlFor="article-newsletter-email" className="sr-only">
            Your email
          </label>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch sm:overflow-hidden sm:rounded-xl sm:border sm:border-[#D8D2F0] sm:bg-white sm:shadow-[0_2px_8px_rgba(17,24,39,0.04)] sm:focus-within:border-[#956DFE] sm:focus-within:ring-2 sm:focus-within:ring-[#956DFE]/20">
            <input
              id="article-newsletter-email"
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              disabled={status === "loading" || status === "done"}
              className="h-12 w-full min-w-0 rounded-xl border border-[#D8D2F0] bg-white px-4 font-[family-name:var(--font-inter)] text-[0.9375rem] text-[#111111] outline-none transition placeholder:text-[#9CA3AF] focus-visible:border-[#956DFE] focus-visible:ring-2 focus-visible:ring-[#956DFE]/20 disabled:opacity-60 sm:h-12 sm:flex-1 sm:rounded-none sm:border-0 sm:shadow-none sm:focus-visible:ring-0"
            />
            <button
              type="submit"
              disabled={status === "loading" || status === "done"}
              className="inline-flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[#956DFE] px-6 font-[family-name:var(--font-inter)] text-[0.9375rem] font-semibold text-white transition hover:bg-[#8558F0] active:bg-[#7A4FE8] disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#956DFE] sm:w-auto sm:min-w-[7.5rem] sm:rounded-none sm:px-8"
            >
              {status === "loading" ? "Joining…" : status === "done" ? "You're in" : "Join"}
              {status === "idle" || status === "error" ? (
                <ArrowRight className="h-4 w-4" aria-hidden />
              ) : null}
            </button>
          </div>
        </form>

        {status === "done" ? (
          <p className="mt-3 font-[family-name:var(--font-inter)] text-[0.8125rem] font-medium text-[#956DFE]">
            Check your inbox to confirm.
          </p>
        ) : null}
        {status === "error" ? (
          <p className="mt-3 font-[family-name:var(--font-inter)] text-[0.8125rem] text-[#B45309]">
            Something went wrong. Try again in a moment.
          </p>
        ) : null}
      </div>
    </div>
  );
}
