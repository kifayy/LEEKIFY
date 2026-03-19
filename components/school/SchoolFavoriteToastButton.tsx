"use client";

import { useState, useCallback, useEffect } from "react";
import { Heart } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { LoginToSaveSchoolDialog } from "@/components/schools/login-to-save-dialog";

/**
 * After scrolling: toast + heart animation + heartJump event for signed-in users.
 * For logged-out users: opens the same Google login dialog (does not persist to DB per dashboard spec).
 */
export function SchoolFavoriteToastButton({ collegeId, collegeName }: { collegeId: string; collegeName: string }) {
  const { user } = useAuth();
  const isSignedIn = !!user;
  const [toast, setToast] = useState<string | null>(null);
  const [popped, setPopped] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Match the "as user scrolls" feel from the dashboard experience.
      setShowButton(window.scrollY > 200);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onClick = useCallback(() => {
    if (!isSignedIn) {
      setOpenLogin(true);
      return;
    }
    setPopped(true);
    setToast(`Added ${collegeName} to favorites`);
    window.dispatchEvent(new CustomEvent("heartJump", { detail: { collegeId, collegeName } }));
    window.setTimeout(() => setToast(null), 2800);
    window.setTimeout(() => setPopped(false), 600);
  }, [collegeId, collegeName, isSignedIn]);

  return (
    <>
      {showButton && (
        <button
          type="button"
          onClick={onClick}
          className={cn(
            "fixed top-4 right-4 z-50 inline-flex items-center gap-2 rounded-full border-2 border-rose-100 bg-white px-4 py-2.5 text-sm font-semibold text-rose-600 shadow-lg hover:bg-rose-50 transition-colors",
            popped && "scale-110",
          )}
          aria-label="Add to favorites"
        >
          <Heart className={cn("w-5 h-5 transition-transform", popped && "fill-rose-500 text-rose-500 scale-125")} />
          Fav
        </button>
      )}
      {toast && (
        <div
          className="fixed bottom-8 left-1/2 z-[60] -translate-x-1/2 rounded-full bg-gray-900 px-5 py-3 text-sm font-medium text-white shadow-xl"
          role="status"
        >
          {toast}
        </div>
      )}
      <LoginToSaveSchoolDialog open={openLogin} onOpenChange={setOpenLogin} />
    </>
  );
}
