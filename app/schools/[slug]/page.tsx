import { notFound, redirect } from "next/navigation";
import { SchoolDetailsLayout } from "@/components/school/SchoolDetailsLayout";
import { SchoolPageJsonLd } from "@/components/school/school-page-json-ld";
import { fetchCollegeBySlugParam } from "@/lib/fetch-college-by-slug";
import { getBaseUrlForMetadata } from "@/lib/metadata-base-url";
import {
  buildSchoolPageDescription,
  buildSchoolPageKeywords,
  buildSchoolPageTitle,
} from "@/lib/school-page-metadata";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const result = await fetchCollegeBySlugParam(slug);
  if (!result.ok) {
    return { title: "School | PathPicker" };
  }
  const { college } = result;
  const baseUrl = await getBaseUrlForMetadata();
  const canonicalSlug = college.slug?.trim() || decodeURIComponent(slug);
  const canonical = `${baseUrl}/schools/${encodeURIComponent(canonicalSlug)}`;
  const title = buildSchoolPageTitle(college);
  const description = buildSchoolPageDescription(college);
  const ogImage = college.new_image_link || college.featured_image_url;

  return {
    title,
    description,
    keywords: buildSchoolPageKeywords(college),
    alternates: { canonical },
    openGraph: {
      type: "website",
      siteName: "PathPicker",
      title,
      description,
      url: canonical,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function SchoolPage({ params }: Props) {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug).trim();
  const result = await fetchCollegeBySlugParam(slug);

  if (!result.ok) notFound();

  const { college, canonicalPath } = result;
  const trueSlug = college.slug?.trim();
  if (trueSlug && trueSlug !== decoded) {
    redirect(canonicalPath);
  }

  const baseUrl = await getBaseUrlForMetadata();
  const canonicalUrl = `${baseUrl}${canonicalPath}`;

  return (
    <div className="min-h-screen bg-white">
      <SchoolPageJsonLd college={college} canonicalUrl={canonicalUrl} baseUrl={baseUrl} />
      <SchoolDetailsLayout collegeData={college} showSidebarNav={false} canonicalUrl={canonicalUrl} />
    </div>
  );
}
