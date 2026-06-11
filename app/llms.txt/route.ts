import { getPublicSiteUrlForSitemap } from "@/lib/metadata-base-url";
import { buildLlmsTxtContent } from "@/lib/llms-site-index";

export async function GET() {
  const baseUrl = await getPublicSiteUrlForSitemap();

  return new Response(buildLlmsTxtContent(baseUrl), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
