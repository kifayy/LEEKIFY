"use client";

import Link from "next/link";
import { useEffect } from "react";

export function RefundPolicyRedirect() {
  useEffect(() => {
    window.location.replace("/terms#refund-policy");
  }, []);

  return (
    <div className="container mx-auto max-w-2xl px-4 py-16 text-center">
      <p className="text-muted-foreground">Redirecting to refund policy…</p>
      <Link
        href="/terms#refund-policy"
        className="mt-4 inline-block text-[#956EFE] underline hover:no-underline"
      >
        View Refund Policy
      </Link>
    </div>
  );
}
