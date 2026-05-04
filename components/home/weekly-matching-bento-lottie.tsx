"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";

/** Must match `public/animations/` filename (JSON export). */
const BENTO_LOTTIE_FILE = "Bento Blocks _ Search Card (1).json";

export function WeeklyMatchingBentoLottie({ className }: { className?: string }) {
  const [data, setData] = useState<object | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const url = `/animations/${encodeURIComponent(BENTO_LOTTIE_FILE)}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("not ok");
        return res.json();
      })
      .then(setData)
      .catch(() => {})
      .finally(() => setDone(true));
  }, []);

  if (!done) {
    return (
      <div
        className={`min-h-[220px] w-full animate-pulse rounded-2xl bg-emerald-100/35 sm:min-h-[260px] ${className ?? ""}`}
        aria-busy="true"
        aria-label="Loading illustration"
      />
    );
  }

  if (!data) {
    return (
      <div
        className={`min-h-[220px] w-full rounded-2xl bg-emerald-100/25 ring-1 ring-inset ring-emerald-900/5 sm:min-h-[260px] ${className ?? ""}`}
        role="presentation"
      />
    );
  }

  return (
    <div className={`relative w-full max-w-[380px] ${className ?? ""}`}>
      <Lottie animationData={data} loop className="h-auto w-full" />
      <span className="sr-only">Scholarship search and match illustration</span>
    </div>
  );
}
