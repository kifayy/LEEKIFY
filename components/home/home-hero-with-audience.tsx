"use client";

import { DesktopHeroBanner } from "@/components/home/desktop-hero-banner";
import { HeroAudienceProvider } from "@/components/home/hero-audience-context";
import { HeroFigmaDesign } from "@/components/home/hero-figma-design";

export function HomeHeroWithAudience() {
  return (
    <HeroAudienceProvider>
      <DesktopHeroBanner />
      <div className="md:hidden">
        <HeroFigmaDesign />
      </div>
    </HeroAudienceProvider>
  );
}
