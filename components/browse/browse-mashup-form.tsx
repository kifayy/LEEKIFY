"use client";

import { useState } from "react";

import { MASHUP_DIMENSIONS } from "@/lib/directory/vibe-options";

type MashupPayload = {
  query: string;
  reference_schools: { slug: string; dimension: string }[];
};

type Props = {
  onSubmit: (payload: MashupPayload) => void;
};

function slugify(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function BrowseMashupForm({ onSubmit }: Props) {
  const [dimA, setDimA] = useState("academics");
  const [schoolA, setSchoolA] = useState("");
  const [dimB, setDimB] = useState("social_life");
  const [schoolB, setSchoolB] = useState("");

  return (
    <div className="max-w-2xl mx-auto rounded-2xl border border-gray-100 bg-[#faf9fc] p-6 space-y-4">
      <p className="text-sm text-gray-600 text-center">
        Imagine the <strong>best of two schools</strong> combined — we find colleges that match the mix.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-medium text-gray-500">Dimension</label>
          <select
            value={dimA}
            onChange={(e) => setDimA(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
          >
            {MASHUP_DIMENSIONS.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="School name (e.g. Harvard)"
            value={schoolA}
            onChange={(e) => setSchoolA(e.target.value)}
            className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500">Dimension</label>
          <select
            value={dimB}
            onChange={(e) => setDimB(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
          >
            {MASHUP_DIMENSIONS.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="School name (e.g. SDSU)"
            value={schoolB}
            onChange={(e) => setSchoolB(e.target.value)}
            className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
        </div>
      </div>
      <button
        type="button"
        disabled={!schoolA.trim() || !schoolB.trim()}
        className="w-full rounded-xl bg-[#956EFE] py-3 font-semibold text-white disabled:opacity-40"
        onClick={() =>
          onSubmit({
            query: `${dimA} of ${schoolA} with ${dimB} of ${schoolB}`,
            reference_schools: [
              { slug: slugify(schoolA), dimension: dimA },
              { slug: slugify(schoolB), dimension: dimB },
            ],
          })
        }
      >
        Mash it up
      </button>
    </div>
  );
}
