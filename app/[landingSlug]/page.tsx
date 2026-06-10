import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SeoBrowseLandingPage } from "@/components/browse/seo-browse-landing-page";
import { getBrowseCollegesInitial } from "@/lib/browse-colleges-server";
import { getBaseUrlForMetadata, getSiteUrlForCachedPages } from "@/lib/metadata-base-url";
import {
  getAllSeoBrowseLandingSlugs,
  getSeoBrowseLanding,
  isSeoBrowseLandingSlug,
} from "@/lib/seo-browse-landings";
import { hasBrowseFilterParams, metadataForFilterParams } from "@/lib/seo-filter-params";

type Props = {
  params: Promise<{ landingSlug: string }>;
  searchParams: Promise<{ search?: string; vibes?: string }>;
};

export function generateStaticParams() {
  return getAllSeoBrowseLandingSlugs().map((landingSlug) => ({ landingSlug }));
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { landingSlug } = await params;
  const sp = await searchParams;
  if (!isSeoBrowseLandingSlug(landingSlug)) return {};
  const config = getSeoBrowseLanding(landingSlug)!;
  const baseUrl = await getBaseUrlForMetadata();
  const canonical = `${baseUrl}/${config.slug}`;
  const ogImage = config.heroImage?.src;

  const base: Metadata = {
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

  return metadataForFilterParams(base, hasBrowseFilterParams(sp));
}

export default async function SeoBrowseLandingRoute({ params }: Props) {
  const { landingSlug } = await params;
  const config = getSeoBrowseLanding(landingSlug);
  if (!config) notFound();

  const baseUrl = getSiteUrlForCachedPages();
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
