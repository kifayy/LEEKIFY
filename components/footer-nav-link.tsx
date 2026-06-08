"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";

type FooterNavLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  external?: boolean;
};

function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

export function FooterNavLink({
  href,
  external = false,
  className,
  style,
  children,
  onClick,
  ...props
}: FooterNavLinkProps) {
  const hasHash = href.includes("#");

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || external) return;

    if (!hasHash) {
      scrollToTop();
    }
  };

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={style}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      scroll={!hasHash}
      className={className}
      style={style}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Link>
  );
}
