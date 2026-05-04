"use client";

import { BeehiivEmbedIframe } from "@/components/beehiiv-embed-iframe";
import { BEEHIIV_EMBED_SUBSCRIBE_URL } from "@/lib/constants";

export function NewsletterWidget() {
  return (
    <div className="h-[80px] w-full max-w-[450px] shrink-0">
      <BeehiivEmbedIframe
        src={BEEHIIV_EMBED_SUBSCRIBE_URL}
        className="beehiiv-embed h-full w-full"
        data-test-id="beehiiv-embed"
        frameBorder={0}
        scrolling="no"
        style={{
          width: "100%",
          minWidth: "0",
          maxWidth: "100%",
          height: "80px",
          margin: 0,
          borderRadius: 0,
          backgroundColor: "transparent",
          boxShadow: "0 0 #0000",
        }}
        title="Newsletter signup"
      />
    </div>
  );
}
