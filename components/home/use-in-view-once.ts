"use client";

import { useEffect, useRef, useState } from "react";

/** Fires once when the element enters the viewport. */
export function useInViewOnce<T extends HTMLElement = HTMLDivElement>(
  rootMargin = "0px 0px -8% 0px",
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [inView, rootMargin]);

  return { ref, inView };
}
