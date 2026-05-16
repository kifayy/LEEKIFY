import { SocialRatingsBar } from "@/components/home/social-ratings-bar";

export function AboutProfileSchoolsSection() {
  return (
    <section
      id="about"
      aria-label="College match reviews and trust ratings"
      className="w-full scroll-mt-8 bg-white"
    >
      <div className="mx-auto max-w-2xl px-4 py-8 pb-12 md:max-w-3xl md:pb-14 lg:max-w-4xl lg:pb-16">
        <SocialRatingsBar />
      </div>
    </section>
  );
}
