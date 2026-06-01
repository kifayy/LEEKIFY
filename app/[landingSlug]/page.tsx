import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SeoBrowseLandingPage } from "@/components/browse/seo-browse-landing-page";
import { getBrowseCollegesInitial } from "@/lib/browse-colleges-server";
import { getBaseUrlForMetadata } from "@/lib/metadata-base-url";
import {
  getAllSeoBrowseLandingSlugs,
  getSeoBrowseLanding,
  isSeoBrowseLandingSlug,
} from "@/lib/seo-browse-landings";

type Props = { params: Promise<{ landingSlug: string }> };

export function generateStaticParams() {
  return getAllSeoBrowseLandingSlugs().map((landingSlug) => ({ landingSlug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { landingSlug } = await params;
  if (!isSeoBrowseLandingSlug(landingSlug)) return {};
  const config = getSeoBrowseLanding(landingSlug)!;
  const baseUrl = await getBaseUrlForMetadata();
  const canonical = `${baseUrl}/${config.slug}`;
  const ogImage = config.heroImage?.src;

  return {
    title: config.title,
    description: config.metaDescription,
    alternates: { canonical },
    openGraph: {
      type: "website",
      siteName: "PathPicker",
      title: config.title,
      description: config.metaDescription,
      url: canonical,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.metaDescription,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function SeoBrowseLandingRoute({ params }: Props) {
  const { landingSlug } = await params;
  const config = getSeoBrowseLanding(landingSlug);
  if (!config) notFound();

  const baseUrl = await getBaseUrlForMetadata();
  const canonicalUrl = `${baseUrl}/${config.slug}`;
  const initialColleges = await getBrowseCollegesInitial();

  return (
    <SeoBrowseLandingPage
      config={config}
      canonicalUrl={canonicalUrl}
      baseUrl={baseUrl}
      initialColleges={initialColleges}
    />
  );
}
