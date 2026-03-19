"use client";

import { Heart } from "lucide-react";
import { useState } from "react";
import { useSavedColleges } from "@/hooks/useSavedColleges";
import { useAuth } from "@/hooks/useAuth";
import { LoginToSaveSchoolDialog } from "@/components/schools/login-to-save-dialog";

export function SchoolSaveButton({ collegeId, collegeName }: { collegeId: string; collegeName: string }) {
  const { user } = useAuth();
  const { savedColleges, toggleSavedCollege } = useSavedColleges();
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const isSignedIn = !!user;
  const isSaved = isSignedIn && savedColleges.has(collegeId);

  const handleClick = () => {
    if (!isSignedIn) {
      setShowLoginDialog(true);
      return;
    }
    void toggleSavedCollege(collegeId, collegeName);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
          isSaved
            ? "bg-red-500 text-white hover:bg-red-600 shadow-md"
            : "border-2 border-gray-200 bg-white text-gray-700 hover:border-[#A084FF] hover:text-[#A084FF]"
        }`}
      >
        <Heart className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`} />
        {isSaved ? "Saved" : "Save school"}
      </button>
      <LoginToSaveSchoolDialog open={showLoginDialog} onOpenChange={setShowLoginDialog} />
    </>
  );
}
