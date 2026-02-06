"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

const NEWSLETTER_URL = "https://awarded.app/newsletter";

export function NewsletterCTA({
  variant = "default",
}: {
  variant?: "default" | "footer" | "want-scholarships";
}) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(NEWSLETTER_URL, "_blank", "noopener,noreferrer");
  };

  if (variant === "want-scholarships") {
    return (
      <section className="w-full py-10 md:py-16">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-xl font-bold tracking-tight md:text-3xl">
            Want <span className="font-serif italic">scholarships?</span>
          </h2>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">Scholarships from 1000+ brands</p>
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full max-w-sm mx-auto sm:mx-0"
            />
            <Button type="submit" variant="pathpicker" className="w-full sm:w-auto">
              <Send className="h-4 w-4" />
              Join
            </Button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-base font-semibold md:text-xl">
        Join our <span className="font-script font-normal italic">newsletter</span> & win scholarships.
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-2">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full sm:max-w-xs"
        />
        <Button type="submit" variant="pathpicker" className="w-full shrink-0 sm:w-auto">
          <Send className="h-4 w-4" />
          Join
        </Button>
      </form>
    </div>
  );
}
