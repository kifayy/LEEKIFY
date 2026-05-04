"use client";

import { useEffect, useState, type IframeHTMLAttributes } from "react";

type BeehiivEmbedIframeProps = IframeHTMLAttributes<HTMLIFrameElement> & {
  /** Reserves layout before mount; defaults to `className` when omitted. */
  placeholderClassName?: string;
};

/**
 * Beehiiv’s embed script mutates iframe attributes before hydration, which causes
 * React SSR/client mismatches. Render the iframe only after mount so the server and
 * first client pass both output a stable placeholder.
 */
export function BeehiivEmbedIframe({
  placeholderClassName,
  className,
  ...rest
}: BeehiivEmbedIframeProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={placeholderClassName ?? className}
        aria-hidden
      />
    );
  }

  return <iframe className={className} {...rest} />;
}
