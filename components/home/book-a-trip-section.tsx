"use client";

import Image from "next/image";
import { ClipboardList, Target, Send, MapPin, Heart, Users } from "lucide-react";

const VALUES = [
  {
    title: "Choose Destination",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna, tortor tempus.",
    iconBg: "#F0BB1F",
    Icon: ClipboardList,
  },
  {
    title: "Make Payment",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna, tortor tempus.",
    iconBg: "#F15A2B",
    Icon: Target,
  },
  {
    title: "Reach Airport on Selected Date",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna, tortor tempus.",
    iconBg: "#006380",
    Icon: Send,
  },
];

const CARD_IMAGE =
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=642&h=322&fit=crop";
const AVATAR_IMAGE =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face";

export function BookATripSection() {
  return (
    <section className="w-full overflow-x-hidden bg-white py-10 md:py-24">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          {/* Left: Subheading, Heading, Values */}
          <div className="flex max-w-[500px] flex-col items-center text-center md:items-start md:text-left">
            <p
              className="mb-2 text-sm font-normal"
              style={{ color: "#5E6282" }}
            >
              Subheading
            </p>
            <h2
              className="mb-6 text-xl font-bold leading-tight md:mb-10 md:text-3xl lg:text-4xl"
              style={{ color: "#181A1D" }}
            >
              Easy and Fast Way to Book Your Next Trip
            </h2>
            <div className="flex flex-col items-center gap-6 md:items-stretch md:gap-8">
              {VALUES.map((item) => {
                const Icon = item.Icon;
                return (
                  <div key={item.title} className="flex flex-col items-center gap-4 md:flex-row md:gap-6 md:text-left">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[13px] md:shrink-0"
                      style={{ backgroundColor: item.iconBg }}
                    >
                      <Icon className="h-6 w-6 text-white" strokeWidth={2} />
                    </div>
                    <div className="text-center md:text-left">
                      <h3
                        className="mb-1 text-base font-bold"
                        style={{ color: "#181A1D" }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="text-sm font-normal leading-relaxed"
                        style={{ color: "#5E6282" }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Image group with cards */}
          <div className="relative w-full max-w-[485px] shrink-0 lg:mt-0">
            {/* Purple blur ellipse behind */}
            <div
              className="absolute -bottom-12 left-1/2 h-[280px] w-[280px] -translate-x-1/2 rounded-full opacity-70 blur-[150px] md:h-[367px] md:w-[354px]"
              style={{ backgroundColor: "#956EFE" }}
            />

            {/* Main card - Trip To Greece */}
            <div className="relative z-10 overflow-hidden rounded-[26px] bg-white shadow-[0_2px_3px_rgba(0,0,0,0.005),0_8px_13px_rgba(0,0,0,0.008),0_20px_13px_rgba(0,0,0,0.01),0_39px_25px_rgba(0,0,0,0.012),0_65px_47px_rgba(0,0,0,0.015),0_100px_80px_rgba(0,0,0,0.02)]">
              <div className="relative h-[161px] w-full overflow-hidden rounded-t-[24px]">
                <Image
                  src={CARD_IMAGE}
                  alt="Trip"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 321px"
                />
              </div>
              <div className="p-5">
                <div className="mb-3 flex items-center justify-between">
                  <h3
                    className="text-lg font-bold"
                    style={{ color: "#181A1D" }}
                  >
                    Trip To Greece
                  </h3>
                </div>
                <div className="mb-4 flex flex-wrap items-center gap-2 text-sm" style={{ color: "#5E6282" }}>
                  <span>14-29 June</span>
                  <span>|</span>
                  <span>by Robbin joseph</span>
                </div>
                {/* Option icons */}
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F5F5F5]">
                    <MapPin className="h-4 w-4" style={{ color: "#83839A" }} />
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F5F5F5]">
                    <Users className="h-4 w-4" style={{ color: "#83839A" }} />
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F5F5F5]">
                    <Send className="h-4 w-4" style={{ color: "#83839A" }} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2" style={{ color: "#5E6282" }}>
                    <Users className="h-4 w-4" />
                    <span className="text-sm">24 people going</span>
                  </div>
                  <Heart className="h-5 w-5" style={{ color: "#4152CA" }} />
                </div>
              </div>
            </div>

            {/* Small card - Trip to Rome */}
            <div
              className="relative z-20 -mt-16 ml-auto mr-2 w-[min(263px,calc(100%-1rem))] max-w-[calc(100%-1rem)] overflow-hidden rounded-[18px] bg-white p-4 shadow-[0_2px_3px_rgba(0,0,0,0.005),0_8px_13px_rgba(0,0,0,0.008),0_20px_13px_rgba(0,0,0,0.01),0_39px_25px_rgba(0,0,0,0.012),0_65px_47px_rgba(0,0,0,0.015),0_100px_80px_rgba(0,0,0,0.02)] md:mr-8 md:w-[263px] md:max-w-none"
            >
              <div className="flex items-start gap-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-white shadow-[0_1px_9px_rgba(105,104,104,0.13)]">
                  <Image
                    src={AVATAR_IMAGE}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className="mb-1 text-xs font-normal"
                    style={{ color: "#5E6282" }}
                  >
                    Ongoing
                  </p>
                  <h4
                    className="text-base font-bold"
                    style={{ color: "#181A1D" }}
                  >
                    Trip to rome
                  </h4>
                  <p
                    className="mb-3 text-xs"
                    style={{ color: "#5E6282" }}
                  >
                    40% completed
                  </p>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#F5F5F5]">
                    <div
                      className="h-full w-[40%] rounded-full"
                      style={{ backgroundColor: "#8A79DF" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
