"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Play } from "lucide-react";

const VIMEO_URL =
  "https://player.vimeo.com/video/1171648381?title=0&byline=0&portrait=0&loop=1&muted=1&controls=0&background=1&badge=0";

declare global {
  interface Window {
    Vimeo?: { Player: new (el: HTMLIFrameElement) => VimeoPlayer };
  }
}

interface VimeoPlayer {
  getMuted(): Promise<boolean>;
  setMuted(muted: boolean): Promise<void>;
  getPaused(): Promise<boolean>;
  play(): Promise<void>;
  pause(): Promise<void>;
  setCurrentTime(seconds: number): Promise<void>;
  on(event: "play" | "pause", callback: () => void): void;
}

type VimeoInTikTokMockupProps = {
  /** Overlay CTA label (default matches home). */
  ctaLabel?: string;
  /** Use `/…` for in-app navigation; default opens App Store short link. */
  ctaHref?: string;
  /** Subtle repeating bounce (e.g. Awarded “Take on iOS”). */
  ctaBounce?: boolean;
};

const CTA_WRAP_CLASS =
  "pointer-events-none absolute bottom-4 left-0 right-0 z-20 flex justify-center";

const ctaButtonClass = (bounce: boolean) =>
  [
    "pointer-events-auto inline-flex h-14 min-w-[200px] items-center justify-center gap-2 rounded-full bg-[#956EFE] px-8 text-base font-medium text-white shadow-[0_2px_8px_rgba(149,110,254,0.25)] transition-opacity hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black",
    bounce ? "animate-ios-cta-bounce" : "",
  ]
    .filter(Boolean)
    .join(" ");

/** Phone mockup with Vimeo video; tap to play/pause. */
export function VimeoInTikTokMockup({
  ctaLabel = "Get on iOS",
  ctaHref = "https://awarded.short.gy/9iTh",
  ctaBounce = false,
}: VimeoInTikTokMockupProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<VimeoPlayer | null>(null);
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const initPlayer = () => {
      if (!window.Vimeo || !iframeRef.current) return;
      try {
        const player = new window.Vimeo.Player(iframeRef.current);
        playerRef.current = player;
        player.setMuted(false); // volume always on
        player.pause(); // start paused – play button shows until user taps
        setIsPaused(true);
        player.on("play", () => setIsPaused(false));
        player.on("pause", () => setIsPaused(true));
      } catch {
        // ignore if embed not ready
      }
    };

    if (window.Vimeo) {
      initPlayer();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://player.vimeo.com/api/player.js";
    script.async = true;
    script.onload = initPlayer;
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);

  const handlePlayPause = () => {
    const player = playerRef.current;
    if (!player) return;
    if (isPaused) {
      player.setCurrentTime(0).catch(() => {}); // seek to 0, don't block
      player.play();
    } else {
      player.pause();
    }
  };

  return (
    <div
      className="relative mx-auto w-full max-w-[320px] overflow-hidden rounded-[2.5rem] bg-black shadow-[0_24px_48px_rgba(0,0,0,0.25)]"
      style={{ aspectRatio: "9 / 16" }}
    >
      {/* Video layer – full frame, no black overlays */}
      <div className="absolute inset-0">
        <iframe
          ref={iframeRef}
          src={VIMEO_URL}
          className="absolute inset-0 h-full w-full border-0"
          allowFullScreen
          allow="autoplay; fullscreen; picture-in-picture"
          title="Awarded App"
        />
      </div>

      {/* When playing: click video to pause (play button will appear). When paused: play button only. */}
      {!isPaused ? (
        <button
          type="button"
          onClick={handlePlayPause}
          className="absolute inset-0 z-10 cursor-pointer"
          aria-label="Pause video"
        />
      ) : (
        <button
          type="button"
          onClick={handlePlayPause}
          className="absolute left-1/2 top-1/2 z-10 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Play video"
        >
          <Play className="h-7 w-7 ml-0.5" strokeWidth={2} fill="currentColor" />
        </button>
      )}

      {/* CTA overlay at bottom of video */}
      <div className={CTA_WRAP_CLASS}>
        {ctaHref.startsWith("/") ? (
          <Link href={ctaHref} className={ctaButtonClass(ctaBounce)}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Apple_logo_white.svg/1920px-Apple_logo_white.svg.png"
              alt=""
              className="h-6 w-6 object-contain"
              aria-hidden
            />
            {ctaLabel}
          </Link>
        ) : (
          <a href={ctaHref} target="_blank" rel="noopener noreferrer" className={ctaButtonClass(ctaBounce)}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Apple_logo_white.svg/1920px-Apple_logo_white.svg.png"
              alt=""
              className="h-6 w-6 object-contain"
              aria-hidden
            />
            {ctaLabel}
          </a>
        )}
      </div>

    </div>
  );
}
