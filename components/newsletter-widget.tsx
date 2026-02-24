"use client";

const BEEHIIV_EMBED_URL =
  "https://subscribe-forms.beehiiv.com/22508440-48d4-4c89-845f-6e9406a7b6d2";

export function NewsletterWidget() {
  return (
    <div className="h-[80px] w-full max-w-[450px] shrink-0">
      <iframe
        src={BEEHIIV_EMBED_URL}
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
        title="Scholarship Scanner signup"
      />
    </div>
  );
}
