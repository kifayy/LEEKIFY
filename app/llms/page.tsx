import type { Metadata } from "next";
import Link from "next/link";

import { getBaseUrlForMetadata } from "@/lib/metadata-base-url";
import { buildLlmsSiteSections } from "@/lib/llms-site-index";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = await getBaseUrlForMetadata();
  return {
    title: "Site Index for AI & LLMs | PathPicker",
    description:
      "Structured PathPicker site map for AI assistants and LLM crawlers: college match quiz, browse schools, policies, and methodology.",
    alternates: { canonical: `${baseUrl}/llms` },
    robots: { index: true, follow: true },
  };
}

export default async function LlmsPage() {
  const baseUrl = await getBaseUrlForMetadata();
  const sections = buildLlmsSiteSections(baseUrl);

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 md:py-16">
      <h1 className="text-2xl font-bold tracking-tight text-[#181A1D] md:text-4xl">
        PathPicker site index
      </h1>
      <p className="mt-4 text-muted-foreground">
        Structured links for AI assistants and LLM crawlers. Plain-text version:{" "}
        <Link href="/llms.txt" className="font-medium text-[#6836D5] underline underline-offset-2">
          /llms.txt
        </Link>
      </p>

      <div className="mt-10 space-y-10">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-lg font-bold text-[#181A1D]">{section.title}</h2>
            <ul className="mt-4 space-y-3">
              {section.links.map((link) => (
                <li key={`${section.title}-${link.href}`} className="text-sm leading-relaxed">
                  <a
                    href={link.href}
                    className="font-medium text-[#6836D5] underline underline-offset-2"
                  >
                    {link.label}
                  </a>
                  <span className="block text-muted-foreground">{link.href}</span>
                  {link.note ? (
                    <span className="mt-1 block text-muted-foreground">{link.note}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">Methodology</h2>
          <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-muted-foreground">
            <li>
              School profiles include acceptance rates, tuition bands, and campus vibe tags from
              PathPicker research and public college data.
            </li>
            <li>
              Discover pages at {baseUrl}/discover/&#123;slug&#125; are generated from user intent and
              indexed when they meet editorial quality thresholds.
            </li>
            <li>
              Student archetype and fit scores combine quiz responses with campus-level intelligence
              signals across 100+ factors per school.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
