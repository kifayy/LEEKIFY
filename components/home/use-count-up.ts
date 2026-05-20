"use client";

import { useEffect, useState } from "react";

/** Eased count-up when `enabled` flips true (e.g. on scroll into view). */
export function useCountUp(
  end: number,
  { duration = 1600, enabled = true }: { duration?: number; enabled?: boolean } = {},
) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setValue(0);
      return;
    }

    let frame = 0;
    let start: number | null = null;

    const tick = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(eased * end));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [end, enabled, duration]);

  return value;
}
