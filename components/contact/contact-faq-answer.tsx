import Link from "next/link";
import type { ReactNode } from "react";

const LINK_CLASS = "text-[#956EFE] underline hover:no-underline";

/** Emails, external URLs, and leekify.com paths in FAQ copy. */
const LINK_TOKEN_REGEX =
  /(\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b|https?:\/\/[^\s,]+|leekify\.com\/[^\s,]+)/g;

const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

function siteHref(path: string) {
  const pathname = path.replace(/^leekify\.com/, "");
  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

function isLinkToken(part: string) {
  return (
    EMAIL_REGEX.test(part) ||
    part.startsWith("http://") ||
    part.startsWith("https://") ||
    part.startsWith("leekify.com/")
  );
}

function linkifyToken(token: string, key: number): ReactNode {
  if (EMAIL_REGEX.test(token)) {
    return (
      <a key={key} href={`mailto:${token}`} className={LINK_CLASS}>
        {token}
      </a>
    );
  }

  if (token.startsWith("http://") || token.startsWith("https://")) {
    return (
      <a
        key={key}
        href={token}
        target="_blank"
        rel="noopener noreferrer"
        className={LINK_CLASS}
      >
        {token}
      </a>
    );
  }

  if (token.startsWith("leekify.com")) {
    return (
      <Link key={key} href={siteHref(token)} className={LINK_CLASS}>
        {token}
      </Link>
    );
  }

  return token;
}

export function ContactFaqAnswer({ text }: { text: string }) {
  const parts = text.split(LINK_TOKEN_REGEX);

  return (
    <p className="max-w-[58ch] text-sm leading-relaxed text-[#6B7280] md:text-[15px] md:leading-[1.7]">
      {parts.map((part, index) => {
        if (!part) return null;
        return isLinkToken(part) ? linkifyToken(part, index) : part;
      })}
    </p>
  );
}
