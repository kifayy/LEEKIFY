"use client";

import { useEffect, useState } from "react";

export function CircularMatchMeter({
  score,
  isLoading,
  size = 100,
}: {
  score: number;
  isLoading: boolean;
  size?: number;
}) {
  const [display, setDisplay] = useState(0);
  const stroke = 8;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (display / 100) * c;

  useEffect(() => {
    if (isLoading) return;
    const t = setTimeout(() => setDisplay(Math.min(100, Math.max(0, score))), 50);
    return () => clearTimeout(t);
  }, [score, isLoading]);

  if (isLoading) {
    return (
      <div
        className="rounded-full bg-gray-100 animate-pulse shrink-0"
        style={{ width: size, height: size }}
        aria-hidden
      />
    );
  }

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e5e7eb" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#matchGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
        <defs>
          <linearGradient id="matchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A084FF" />
            <stop offset="100%" stopColor="#6C5DD3" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold text-gray-900">{display}%</span>
        <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">Match</span>
      </div>
    </div>
  );
}
