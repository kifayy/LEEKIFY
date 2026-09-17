"use client";

import Image from "next/image";
import { useState, useTransition } from "react";
import { Loader2, Search, ShieldAlert, ShieldCheck } from "lucide-react";

import type { BreachResult, BreachSearchResponse } from "@/lib/breach/types";
import { cn } from "@/lib/utils";

type Appearance = "onDark" | "default";

type EmailBreachSearchFormProps = {
  appearance?: Appearance;
  className?: string;
};

function formatRows(rows: number | null) {
  if (rows == null) return null;
  return new Intl.NumberFormat("en-US", { notation: "compact" }).format(rows);
}

function BreachCard({ breach }: { breach: BreachResult }) {
  const rows = formatRows(breach.rows);
  return (
    <article className="rounded-2xl border border-black/10 bg-white p-4 text-left shadow-sm">
      <div className="flex items-start gap-3">
        {breach.icon ? (
          <Image
            src={breach.icon}
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 rounded-lg bg-[#F5F3FF] object-contain p-1"
            unoptimized
          />
        ) : (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F5F3FF] text-[#6836D5]">
            <ShieldAlert className="h-5 w-5" aria-hidden />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-[#181A1D]">{breach.name}</h3>
          <p className="mt-0.5 text-xs text-[#6B7280]">
            {[breach.breach_date ? `Breached ${breach.breach_date}` : null, rows ? `${rows} records` : null]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </div>
      </div>
      {breach.found.length > 0 ? (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {breach.found.map((f) => (
            <li
              key={`${breach.id}-${f.field}-${f.label}`}
              className="rounded-full bg-[#F5F3FF] px-2.5 py-1 text-xs font-medium text-[#6836D5]"
            >
              {f.label}
              {f.redacted ? " (hidden)" : f.value ? `: ${f.value}` : ""}
            </li>
          ))}
        </ul>
      ) : null}
      {breach.summary ? (
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#4B5563]">{breach.summary}</p>
      ) : null}
    </article>
  );
}

export function EmailBreachSearchForm({
  appearance = "onDark",
  className,
}: EmailBreachSearchFormProps) {
  const onDark = appearance === "onDark";
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<BreachSearchResponse | null>(null);
  const [pending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      try {
        const res = await fetch("/api/breach/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const data = (await res.json()) as BreachSearchResponse & { error?: string };
        if (!res.ok) {
          setResult(null);
          setError(data.error || "Lookup failed.");
          return;
        }
        setResult(data);
      } catch {
        setResult(null);
        setError("Network error. Try again.");
      }
    });
  }

  return (
    <div className={cn("w-full max-w-xl", className)}>
      <form
        onSubmit={onSubmit}
        className={cn(
          "flex w-full flex-col gap-3 sm:flex-row sm:items-stretch",
          onDark ? "" : "",
        )}
      >
        <label className="sr-only" htmlFor="leekify-email-search">
          Email address to check for breaches
        </label>
        <input
          id="leekify-email-search"
          type="email"
          name="email"
          autoComplete="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={cn(
            "h-14 w-full flex-1 rounded-full border-2 bg-white px-5 text-base text-[#181A1D] outline-none transition placeholder:text-[#9CA3AF] focus-visible:ring-2 focus-visible:ring-offset-2",
            onDark
              ? "border-white/40 focus-visible:ring-white focus-visible:ring-offset-transparent"
              : "border-[#E5E5E7] focus-visible:ring-[#6836D5] focus-visible:ring-offset-white",
          )}
        />
        <button
          type="submit"
          disabled={pending}
          className={cn(
            "inline-flex h-14 shrink-0 items-center justify-center gap-2 rounded-full px-8 text-base font-bold transition hover:opacity-95 disabled:opacity-70",
            onDark
              ? "bg-white text-[#6836D5] shadow-[0_8px_24px_rgba(0,0,0,0.22)]"
              : "bg-[#6836D5] text-white shadow-[0_8px_28px_rgba(104,54,213,0.32)]",
          )}
        >
          {pending ? (
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
          ) : (
            <Search className="h-5 w-5" aria-hidden />
          )}
          {pending ? "Searching…" : "Check for leaks"}
        </button>
      </form>

      {error ? (
        <p className={cn("mt-3 text-sm font-medium", onDark ? "text-white" : "text-red-600")} role="alert">
          {error}
        </p>
      ) : null}

      {result ? (
        <div
          className={cn(
            "mt-5 rounded-2xl p-4 sm:p-5",
            onDark ? "bg-white/95 text-[#181A1D] shadow-lg backdrop-blur" : "border border-[#E5E5E7] bg-white",
          )}
          aria-live="polite"
        >
          <div className="flex items-start gap-2">
            {result.count > 0 ? (
              <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-[#DC2626]" aria-hidden />
            ) : (
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#059669]" aria-hidden />
            )}
            <div>
              <p className="text-sm font-semibold">
                {result.count > 0
                  ? `Found in ${result.count} breach${result.count === 1 ? "" : "es"}`
                  : "No known breaches found"}
              </p>
              <p className="mt-0.5 text-xs text-[#6B7280]">
                Results for <span className="font-medium text-[#181A1D]">{result.email}</span>. Sensitive
                values are hidden — unlock full ledger on Premium.
              </p>
            </div>
          </div>

          {result.breaches.length > 0 ? (
            <div className="mt-4 grid max-h-[28rem] gap-3 overflow-y-auto pr-1">
              {result.breaches.map((b) => (
                <BreachCard key={b.id} breach={b} />
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
