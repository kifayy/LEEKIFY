import { NextResponse, type NextRequest } from "next/server";

import { BROWSE_DEV_PATH, BROWSE_PUBLIC_PATH } from "@/lib/browse-routes";
import { isLocalDevHost } from "@/lib/dev-mode";
import { updateSession } from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === BROWSE_DEV_PATH || pathname.startsWith(`${BROWSE_DEV_PATH}/`)) {
    if (!isLocalDevHost(request.headers.get("host"))) {
      const url = request.nextUrl.clone();
      url.pathname = BROWSE_PUBLIC_PATH;
      return NextResponse.redirect(url);
    }
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
