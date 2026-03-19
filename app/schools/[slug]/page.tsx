import { notFound, redirect } from "next/navigation";
import { SchoolDetailsLayout } from "@/components/school/SchoolDetailsLayout";
import { fetchCollegeBySlugParam } from "@/lib/fetch-college-by-slug";
import { getBaseUrlForMetadata } from "@/lib/metadata-base-url";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const result = await fetchCollegeBySlugParam(slug);
  if (!result.ok) {
    return { title: "School | Pathpicker" };
  }
  const { college } = result;
  const baseUrl = await getBaseUrlForMetadata();
  const canonicalSlug = college.slug?.trim() || decodeURIComponent(slug);
  const canonical = `${baseUrl}/schools/${encodeURIComponent(canonicalSlug)}`;
  const title = college.meta_title?.trim() || (college.name ? `${college.name} | Pathpicker` : "School | Pathpicker");
  const description =
    college.meta_description?.trim() ||
    college.description?.slice(0, 160) ||
    college.personality_line?.slice(0, 160) ||
    undefined;

  return {
    title,
    description,
    keywords: college.keywords?.length ? college.keywords : undefined,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      images: college.new_image_link || college.featured_image_url ? [college.new_image_link || college.featured_image_url!] : undefined,
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
      <SchoolDetailsLayout collegeData={college} showSidebarNav={false} canonicalUrl={canonicalUrl} />
    </div>
  );
}
