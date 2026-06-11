"use client";

import { useEffect, useState } from "react";

export function useRotatingPreview<T>(items: readonly T[], holdMs = 2400): T {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, holdMs);
    return () => window.clearInterval(id);
  }, [items.length, holdMs]);

  return items[index] ?? items[0]!;
}
