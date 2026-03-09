"use client";

import { useEffect, useState } from "react";

const FLAG_IMAGE = "https://em-content.zobj.net/source/facebook/65/flag-for-united-states_1f1fa-1f1f8.png";
const GO_LINK = "https://awarded.short.gy/DSNy";
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
  "1,200", "1,500", "1,750", "2,000", "2,250", "2,500", "2,800", "3,000",
  "3,200", "3,500", "3,800", "4,000", "4,200", "4,500", "4,900", "5,100",
  "5,500", "6,000", "6,500", "7,200", "8,000", "9,500", "10,000",
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function MobileSocialProofPopup() {
  const [visible, setVisible] = useState(false);
  const [notification, setNotification] = useState(() => ({
    ...pickRandom(PEOPLE),
    amount: pickRandom(AMOUNTS),
  }));
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () =>
      setIsMobile(typeof window !== "undefined" && window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    let hideTimeout: ReturnType<typeof setTimeout> | null = null;
    const interval = setInterval(() => {
      if (typeof window !== "undefined" && window.innerWidth >= 768) return;
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

  if (!isMobile) return null;

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
            just entered a ${notification.amount} scholarship in our app!
          </p>
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
