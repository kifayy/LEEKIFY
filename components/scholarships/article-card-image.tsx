"use client";

import { useState } from "react";

type Props = {
  primarySrc: string | null;
  fallbackSrc: string;
  alt: string;
  className?: string;
};

/** Article card image with fallback when primary fails to load (e.g. broken og_image). */
export function ArticleCardImage({ primarySrc, fallbackSrc, alt, className }: Props) {
  const [src, setSrc] = useState(primarySrc ?? fallbackSrc);
  const [triedFallback, setTriedFallback] = useState(false);

  const handleError = () => {
    if (!triedFallback && primarySrc) {
      setTriedFallback(true);
      setSrc(fallbackSrc);
    } else {
      setSrc("");
    }
  };

  if (!src) {
    return (
      <div
        className={className}
        style={{
          background: "linear-gradient(135deg, #7C4EE4 0%, #9C6EE6 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-hidden
      >
        <span className="text-4xl text-white/90" aria-hidden>📚</span>
      </div>
    );
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={handleError}
    />
  );
}
