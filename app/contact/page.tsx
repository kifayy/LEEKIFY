import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Handshake, Headphones } from "lucide-react";

import { ContactFaqs } from "@/components/contact/contact-faqs";
import { MANAGE_BILLING_URL } from "@/lib/constants";
import { getBaseUrlForMetadata } from "@/lib/metadata-base-url";

const SUPPORT_EMAIL = "support@leekify.com";
const PARTNERSHIPS_EMAIL = "support@leekify.com";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = await getBaseUrlForMetadata();
  return {
    title: "Contact | Leekify",
    description: "Reach Leekify support directly by email for account, billing, or partnership questions.",
    alternates: { canonical: `${baseUrl}/contact` },
  };
}

type ContactCardProps = {
  icon: ReactNode;
  iconGlow: string;
  title: string;
  description: string;
  email: string;
};

function ContactCard({ icon, iconGlow, title, description, email }: ContactCardProps) {
  return (
    <article
      className="flex flex-col rounded-2xl border border-[#E8E8EC] bg-[#F7F7F8] p-6 sm:p-8"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
    >
      <div
        className="mb-5 flex h-14 w-14 items-center justify-center rounded-full"
        style={{ backgroundColor: iconGlow, boxShadow: `0 8px 24px ${iconGlow}66` }}
      >
        {icon}
      </div>
      <h2 className="text-xl font-bold tracking-tight text-[#181A1D] sm:text-2xl">{title}</h2>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-[#6B7280] sm:text-base">{description}</p>
      <a
        href={`mailto:${email}`}
        className="mt-6 text-base font-medium text-[#956EFE] transition-opacity hover:opacity-80 sm:text-lg"
      >
        {email}
      </a>
    </article>
  );
}

export default function ContactPage() {
  return (
    <div className="w-full min-w-0 overflow-hidden bg-white py-12 md:py-20">
      <div className="container mx-auto max-w-4xl px-4 md:px-6">
        <header className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[#181A1D] md:text-4xl">
            Reach us directly
          </h1>
          <p className="mt-3 text-base text-[#6B7280] md:text-lg">
            Get in touch with the Leekify team.
          </p>
        </header>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 sm:gap-8 md:mt-12">
          <ContactCard
            icon={<Headphones className="h-7 w-7 text-white" strokeWidth={2} aria-hidden />}
            iconGlow="#3B82F6"
            title="Support"
            description="Have an issue with your account, monitoring, or subscription?"
            email={SUPPORT_EMAIL}
          />
          <ContactCard
            icon={<Handshake className="h-7 w-7 text-white" strokeWidth={2} aria-hidden />}
            iconGlow="#14B8A6"
            title="Partnerships"
            description="For business partnerships, media inquiries, or general questions."
            email={PARTNERSHIPS_EMAIL}
          />
        </div>

        <ContactFaqs />

        <section
          className="mt-14 flex flex-col items-center rounded-2xl border border-[#E8E8EC] bg-[#FAFAFC] px-6 py-10 text-center md:mt-16 md:px-10"
          aria-labelledby="account-help-heading"
        >
          <h2 id="account-help-heading" className="text-xl font-bold tracking-tight text-[#181A1D] md:text-2xl">
            Manage Your Billing In One Click
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-[#6B7280] md:text-base">
            Update your plan, change payment method, or manage your subscription in one place.
          </p>
          <Link
            href={MANAGE_BILLING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-xl bg-[#6836D5] px-8 py-3 text-base font-semibold text-white shadow-[0_4px_16px_rgba(104,54,213,0.3)] transition hover:bg-[#5a2ebf]"
          >
            Manage Your Subscription
          </Link>
        </section>
      </div>
    </div>
  );
}
