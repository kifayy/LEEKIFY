import Image from "next/image";
import { DesktopHeroBanner } from "@/components/home/desktop-hero-banner";
import { HeroFigmaDesign } from "@/components/home/hero-figma-design";
import { FeaturesSection } from "@/components/home/features-section";
import { HomeScholarshipFeatureShowcase } from "@/components/home/home-scholarship-feature-showcase";
import { EnterScholarshipsSectionLayout } from "@/components/enter-scholarships-section-layout";
import { StudentsLoveSection } from "@/components/home2/StudentsLoveSection";
import { WhyDirectMailSection } from "@/components/home/why-direct-mail-section";
import { FeaturedScholarshipsSection } from "@/components/home/featured-scholarships-section";
import { getBaseUrlForMetadata } from "@/lib/metadata-base-url";
import { DesktopBottomCta } from "@/components/home/desktop-bottom-cta";

const HOME_PREVIEW_IMAGE_URL = "https://storage.googleapis.com/images_592/bsa.png";

const PUBLISHED_ON_BANNER_URL =
  "https://storage.googleapis.com/images_592/chicago%20(1).png";

export async function generateMetadata() {
  const baseUrl = await getBaseUrlForMetadata();
  return {
    alternates: { canonical: baseUrl },
    openGraph: {
      images: [{ url: HOME_PREVIEW_IMAGE_URL }],
    },
    twitter: {
      images: [HOME_PREVIEW_IMAGE_URL],
    },
  };
}

export default async function Home() {
  const baseUrl = await getBaseUrlForMetadata();
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: "PathPicker",
    alternateName: ["Pathpicker"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <DesktopHeroBanner />
      <div className="md:hidden">
        <HeroFigmaDesign />
      </div>
      <section className="w-full bg-background" aria-label="Published on">
        <div className="mx-auto w-full max-w-[1600px] px-4 py-6 md:py-8">
          <Image
            src={PUBLISHED_ON_BANNER_URL}
            alt="Published on The Reportly, NY Zeal, and WhoChicago"
            width={1000}
            height={500}
            className="mx-auto block h-auto w-[52%] md:w-[40%]"
            sizes="(max-width: 767px) 52vw, (max-width: 1600px) 40vw, 640px"
          />
        </div>
      </section>
      <HomeScholarshipFeatureShowcase />
      <FeaturesSection />
      <EnterScholarshipsSectionLayout />
      <StudentsLoveSection />
      {/* Hidden for now – Featured scholarships carousel (Fund Your Education); restore when needed */}
      {/* <Suspense fallback={<div className="container mx-auto max-w-5xl px-4 py-10 text-center text-sm text-muted-foreground md:py-16">Loading scholarships…</div>}>
        <FeaturedScholarshipsSection />
      </Suspense> */}
      <WhyDirectMailSection />
      <DesktopBottomCta />
    </>
  );
}
