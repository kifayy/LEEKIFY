import { DesktopDataEngineSection } from "@/components/home/desktop-data-engine-section";
import { MobileDataEngineSection } from "@/components/home/mobile-data-engine-section";
import { SocialRatingsBar } from "@/components/home/social-ratings-bar";
import { StudentsLoveSection } from "@/components/home2/StudentsLoveSection";

export function AboutProfileSchoolsSection() {
  return (
    <section
      id="about"
      aria-label="College match reviews and trust ratings"
      className="w-full scroll-mt-8 bg-white"
    >
      <div className="md:hidden">
        <div className="mx-auto max-w-2xl px-4 py-8 pb-0">
          <SocialRatingsBar />
          <MobileDataEngineSection />
        </div>
        <StudentsLoveSection className="-mx-0 border-x-0 border-b-0" />
      </div>

      <div className="hidden md:block">
        <DesktopDataEngineSection />
      </div>
    </section>
  );
}
