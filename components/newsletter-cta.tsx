"use client";

import { useState } from "react";
import { Send } from "lucide-react";

const NEWSLETTER_URL = "https://awarded.app/newsletter";

export function NewsletterCTA({
  variant = "default",
}: {
  variant?: "default" | "footer";
}) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(NEWSLETTER_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="space-y-4">
      <h3 className="text-base font-bold md:text-xl">
        Join our <span className="font-script font-normal italic">newsletter</span> for college planning updates.
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex h-12 w-full rounded-xl border border-input bg-transparent px-4 py-3 text-base shadow-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-pathpicker-purple md:max-w-xs"
        />
        <button
          type="submit"
          className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-pathpicker-purple px-4 py-3 text-white hover:opacity-95 sm:w-auto"
        >
          <Send className="h-4 w-4" />
          Join
        </button>
      </form>
    </div>
  );
}
