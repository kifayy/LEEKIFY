"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CollegeMatchQuizLink } from "@/components/college-match-quiz-link";

interface LoginToSaveSchoolDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginToSaveSchoolDialog({ open, onOpenChange }: LoginToSaveSchoolDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-lg sm:text-xl font-bold text-gray-900 leading-snug">
            You must take the college match quiz first!
          </DialogTitle>
          <DialogDescription className="sr-only">
            Take the PathPicker college match quiz to save schools to your list.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 flex flex-col gap-3">
          <Button
            asChild
            className="h-12 w-full rounded-full bg-[#956EFE] font-semibold text-white shadow-[0_8px_20px_rgba(149,110,254,0.35)] hover:bg-[#8B5CF6]"
          >
            <CollegeMatchQuizLink onClick={() => onOpenChange(false)}>Take the College Match Quiz</CollegeMatchQuizLink>
          </Button>
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="w-full text-gray-500 hover:text-gray-700">
            Not now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
