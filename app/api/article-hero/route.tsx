import { ImageResponse } from "next/og";

import { getClientIpFromHeaders, hashClientIp } from "@/lib/client-ip";
import { checkRateLimit, rateLimitResponse } from "@/lib/rate-limit";

const WIDTH = 1280;
const HEIGHT = 582;
const MAX_TITLE_LENGTH = 200;

/** Four background images; we pick one per article (by slug hash) and overlay emoji + article title. */
const BACKGROUND_IMAGES = [
  "https://storage.googleapis.com/images_592/vavasd%20(4).png",
  "https://storage.googleapis.com/images_592/vavasd%20(3).png",
  "https://storage.googleapis.com/images_592/vavasd%20(2).png",
  "https://storage.googleapis.com/images_592/vavasd%20(1).png",
];

const EMOJIS = ["📚", "🎓", "✨", "📝"];

/** Pick a stable index 0–3 from slug for background and emoji. */
function getSlugIndex(slug: string): number {
  if (!slug || typeof slug !== "string") return 0;
  let n = 0;
  for (let i = 0; i < slug.length; i++) n += slug.charCodeAt(i);
  return Math.abs(n) % 4;
}

export async function GET(request: Request) {
  const ipHash = hashClientIp(getClientIpFromHeaders(request.headers));
  const limit = await checkRateLimit(`article-hero:ip:${ipHash}`, 30, 15 * 60 * 1000);
  if (!limit.allowed) {
    return rateLimitResponse(limit.retryAfterSec ?? 60);
  }

  const { searchParams } = new URL(request.url);
  const slug = (searchParams.get("slug") ?? "").slice(0, 120);
  const titleRaw = searchParams.get("title")?.trim() || "";
  const title = titleRaw.slice(0, MAX_TITLE_LENGTH);
  const displayText = title || "Article";
  const idx = getSlugIndex(slug);
  const backgroundUrl = BACKGROUND_IMAGES[idx];
  const emoji = EMOJIS[idx];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src={backgroundUrl}
          alt=""
          width={WIDTH}
          height={HEIGHT}
          style={{ position: "absolute", inset: 0, objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px 48px",
            background: "rgba(0,0,0,0.5)",
            borderRadius: "16px",
            position: "relative",
            maxWidth: "90%",
          }}
        >
          <span
            style={{
              fontSize: 42,
              fontWeight: 700,
              color: "white",
              letterSpacing: "0.02em",
              lineHeight: 1.3,
              textAlign: "center",
            }}
          >
            {emoji} {displayText}
          </span>
        </div>
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
      headers: { "Cache-Control": "public, max-age=300, s-maxage=300" },
    }
  );
}
