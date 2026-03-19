"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface VibeMixerProps {
  selectedVibes: string[];
  onVibeChange: (vibes: string[]) => void;
  vibeOptions: Array<{ value: string; label: string; emoji: string }>;
  size?: "default" | "compact";
}

export function VibeMixer({ selectedVibes, onVibeChange, vibeOptions, size = "default" }: VibeMixerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleVibeRemove = (vibeToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onVibeChange(selectedVibes.filter((v) => v !== vibeToRemove));
  };

  const handleVibeSelect = (vibeValue: string) => {
    if (selectedVibes.includes(vibeValue)) {
      onVibeChange(selectedVibes.filter((v) => v !== vibeValue));
    } else if (selectedVibes.length < 2) {
      onVibeChange([...selectedVibes, vibeValue]);
    } else {
      onVibeChange([selectedVibes[0], vibeValue]);
    }
  };

  const getSelectedVibeLabel = (vibe: string) => {
    const option = vibeOptions.find((opt) => opt.value === vibe);
    return option ? option.label : vibe;
  };

  const isCompact = size === "compact";

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div
        className={`bg-white rounded-3xl border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 ${isCompact ? "p-6" : "p-8"}`}
      >
        <div className="text-center">
          <div
            className={`text-gray-800 leading-relaxed font-light ${isCompact ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"}`}
          >
            In my dream school, I want a mix of{" "}
            <span className="inline-block mx-2">
              {selectedVibes[0] ? (
                <Badge
                  className={`text-white border-0 cursor-pointer transition-all duration-200 inline-flex items-center gap-2 rounded-full font-medium ${isCompact ? "py-1.5 px-3 text-sm" : "py-2 px-4 text-sm"} bg-[#A084FF] hover:bg-[#8B6CF7]`}
                  onClick={() => setIsOpen(true)}
                >
                  {getSelectedVibeLabel(selectedVibes[0])}
                  <X
                    className="hover:bg-white/20 rounded-full p-0.5 transition-colors w-3 h-3"
                    onClick={(e) => handleVibeRemove(selectedVibes[0], e)}
                  />
                </Badge>
              ) : (
                <span
                  className={`inline-block border-2 border-dashed border-gray-300 rounded-full text-gray-400 transition-all duration-200 font-medium cursor-default ${isCompact ? "py-1.5 px-3 text-sm" : "py-2 px-4 text-sm"}`}
                >
                  ___
                </span>
              )}
            </span>{" "}
            with a splash of{" "}
            <span className="inline-block mx-2">
              {selectedVibes[1] ? (
                <Badge
                  className={`text-white border-0 cursor-pointer transition-all duration-200 inline-flex items-center gap-2 rounded-full font-medium ${isCompact ? "py-1.5 px-3 text-sm" : "py-2 px-4 text-sm"} bg-[#A084FF] hover:bg-[#8B6CF7]`}
                  onClick={() => setIsOpen(true)}
                >
                  {getSelectedVibeLabel(selectedVibes[1])}
                  <X
                    className="hover:bg-white/20 rounded-full p-0.5 transition-colors w-3 h-3"
                    onClick={(e) => handleVibeRemove(selectedVibes[1], e)}
                  />
                </Badge>
              ) : (
                <span
                  className={`inline-block border-2 border-dashed border-gray-300 rounded-full text-gray-400 transition-all duration-200 font-medium cursor-default ${isCompact ? "py-1.5 px-3 text-sm" : "py-2 px-4 text-sm"}`}
                >
                  ___
                </span>
              )}
            </span>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-light text-gray-900">Choose Your Vibes</h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {vibeOptions.map((vibe) => (
                <button
                  key={vibe.value}
                  type="button"
                  onClick={() => {
                    handleVibeSelect(vibe.value);
                    if (selectedVibes.length < 2) setIsOpen(false);
                  }}
                  className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
                    selectedVibes.includes(vibe.value)
                      ? "border-gray-900 bg-gray-900 text-white shadow-lg"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 hover:shadow-md"
                  }`}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">{vibe.emoji}</div>
                    <div className="text-sm font-medium">{vibe.label}</div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500 mb-4">Selected: {selectedVibes.length}/2 vibes</p>
              <Button
                onClick={() => setIsOpen(false)}
                className="px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-full font-medium transition-all duration-200"
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
