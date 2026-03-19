"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface MatchBreakdown {
  vibeMatch: { score: number; details: string };
  personalityMatch: { score: number; details: string };
  academicMatch: { score: number; details: string };
  preferenceMatch: { score: number; details: string };
}

interface MatchBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  schoolName: string;
  overallScore: number;
  breakdown: MatchBreakdown;
}

const getScoreColor = (score: number) => {
  if (score >= 85) return "text-green-600";
  if (score >= 75) return "text-green-500";
  if (score >= 60) return "text-yellow-600";
  if (score >= 40) return "text-orange-600";
  return "text-red-600";
};

const getProgressColor = (score: number) => {
  if (score >= 85) return "bg-green-600";
  if (score >= 75) return "bg-green-500";
  if (score >= 60) return "bg-yellow-500";
  if (score >= 40) return "bg-orange-500";
  return "bg-red-500";
};

export function MatchBreakdownModal({
  isOpen,
  onClose,
  schoolName,
  overallScore,
  breakdown,
}: MatchBreakdownModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-gray-900">🎯 Match Breakdown</DialogTitle>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{schoolName}</h3>
            <div className="mb-4">
              <div className={`text-3xl font-bold ${getScoreColor(overallScore)}`}>{overallScore}%</div>
              <div className="text-sm text-gray-600">Overall Match</div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {(
            [
              ["🌈", "Vibe Match", breakdown.vibeMatch, "35%"],
              ["🧠", "Personality Fit", breakdown.personalityMatch, "40%"],
              ["📚", "Academic Fit", breakdown.academicMatch, "15%"],
              ["⚡", "Preferences", breakdown.preferenceMatch, "10%"],
            ] as const
          ).map(([emoji, label, block, weight]) => (
            <div key={label} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{emoji}</span>
                  <span className="font-medium">{label}</span>
                  <Badge variant="outline" className="text-xs">
                    {weight}
                  </Badge>
                </div>
                <span className={`font-bold ${getScoreColor(block.score)}`}>{block.score}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(block.score)}`}
                  style={{ width: `${block.score}%` }}
                />
              </div>
              <p className="text-sm text-gray-600">{block.details}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600 text-center">
            Match scores are calculated based on your quiz responses and personality profile. Higher percentages
            indicate better alignment with your preferences.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
