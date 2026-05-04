"use client";

import { useEffect, useState } from "react";

const FLAG_IMAGE = "https://em-content.zobj.net/source/facebook/65/flag-for-united-states_1f1fa-1f1f8.png";
const GO_LINK = "https://my.pathpicker.com/archetype";
const SHOW_INTERVAL_MS = 7000;
const VISIBLE_DURATION_MS = 3500;

const PEOPLE: { name: string; location: string }[] = [
  { name: "Lauren W.", location: "Austin, TX" },
  { name: "Marcus T.", location: "Atlanta, GA" },
  { name: "Jasmine K.", location: "Denver, CO" },
  { name: "David R.", location: "Seattle, WA" },
  { name: "Emma S.", location: "Boston, MA" },
  { name: "Jordan M.", location: "Chicago, IL" },
  { name: "Taylor L.", location: "Phoenix, AZ" },
  { name: "Alex P.", location: "Miami, FL" },
  { name: "Morgan C.", location: "Nashville, TN" },
  { name: "Riley J.", location: "Portland, OR" },
  { name: "Casey B.", location: "San Diego, CA" },
  { name: "Quinn H.", location: "Minneapolis, MN" },
  { name: "Avery N.", location: "Charlotte, NC" },
  { name: "Sam K.", location: "Dallas, TX" },
  { name: "Jamie L.", location: "Detroit, MI" },
  { name: "Drew M.", location: "Tampa, FL" },
  { name: "Skyler F.", location: "Las Vegas, NV" },
  { name: "Reese D.", location: "Columbus, OH" },
  { name: "Parker G.", location: "Indianapolis, IN" },
  { name: "Cameron V.", location: "San Antonio, TX" },
];

const AMOUNTS = [
  "82", "84", "86", "88", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99",
];

const STORAGE_KEY = "pathpicker-mobile-social-proof-disabled";

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function MobileSocialProofPopup() {
  const [visible, setVisible] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [notification, setNotification] = useState(() => ({
    ...pickRandom(PEOPLE),
    amount: pickRandom(AMOUNTS),
  }));
  const [isMobile, setIsMobile] = useState(false);

  // Respect user preference from localStorage (and sync on mount)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(STORAGE_KEY)) setDisabled(true);
  }, []);

  useEffect(() => {
    const checkMobile = () =>
      setIsMobile(typeof window !== "undefined" && window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    let hideTimeout: ReturnType<typeof setTimeout> | null = null;
    const interval = setInterval(() => {
      if (typeof window !== "undefined" && window.innerWidth >= 768) return;
      if (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY)) return;
      setNotification({
        ...pickRandom(PEOPLE),
        amount: pickRandom(AMOUNTS),
      });
      setVisible(true);
      if (hideTimeout) clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => setVisible(false), VISIBLE_DURATION_MS);
    }, SHOW_INTERVAL_MS);

    return () => {
      window.removeEventListener("resize", checkMobile);
      clearInterval(interval);
      if (hideTimeout) clearTimeout(hideTimeout);
    };
  }, []);

  const handleDisable = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, "1");
      setDisabled(true);
      setVisible(false);
    }
  };

  if (!isMobile || disabled) return null;

  return (
    <div
      className={`fixed bottom-5 left-4 z-50 w-[min(100vw-2rem,300px)] rounded-2xl border border-[#E8E8E8] bg-white/95 px-3.5 py-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.02)] backdrop-blur-sm transition-all duration-300 md:hidden ${
        visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0 pointer-events-none"
      }`}
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="flex items-start gap-2.5">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[15px] font-semibold text-[#181A1D]">{notification.name}</span>
            <span className="text-xs text-[#6B7280]">{notification.location}</span>
            <img
              src={FLAG_IMAGE}
              alt=""
              className="h-3.5 w-5 object-contain shrink-0"
              aria-hidden
            />
          </div>
          <p className="mt-0.5 text-[13px] leading-snug text-[#3A3E46]">
            just saw a {notification.amount}% college match on PathPicker!
          </p>
          <button
            type="button"
            onClick={handleDisable}
            className="mt-1.5 text-xs text-[#6B7280] underline hover:text-[#181A1D]"
          >
            Disable
          </button>
        </div>
        <a
          href={GO_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 self-center rounded-xl bg-[#956EFE] px-3.5 py-2 text-sm font-semibold text-white shadow-[0_2px_6px_rgba(149,110,254,0.35)] transition hover:opacity-95 active:scale-[0.98]"
        >
          Go
        </a>
      </div>
    </div>
  );
}
