import type { Metadata } from "next";
import Link from "next/link";
import { getBaseUrlForMetadata } from "@/lib/metadata-base-url";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = await getBaseUrlForMetadata();
  return {
    title: "Support & contact | Pathpicker",
    description: "Get help with Pathpicker. Contact our team by email.",
    alternates: { canonical: `${baseUrl}/contact` },
  };
}

export default function ContactPage() {
  return (
    <div className="w-full min-w-0 overflow-hidden py-10 md:py-20">
      <div className="container mx-auto max-w-3xl px-4 md:px-6 min-w-0">
        <div
          className="flex flex-col gap-8 rounded-2xl bg-white p-8 md:p-10"
          style={{
            boxShadow: "0 8px 24px rgba(149,110,254,0.12), 0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <h1 className="text-2xl font-bold tracking-tight text-[#181A1D] md:text-3xl">Support</h1>
          <p className="text-base leading-relaxed text-[#181A1D]/85 md:text-lg">
            Questions about college matches, your account, or Pathpicker? Reach out—we read every message.
          </p>
          <p className="text-base text-[#181A1D]/85">
            Email:{" "}
            <a href="mailto:hi@awarded.app" className="font-semibold text-[#956EFE] underline hover:no-underline">
              hi@awarded.app
            </a>
          </p>
          <Link
            href="/"
            className="w-fit text-sm font-medium text-[#956EFE] hover:underline"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
