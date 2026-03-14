"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "https://my.pathpicker.com/login";
  };

  return <Button onClick={logout}>Logout</Button>;
}
