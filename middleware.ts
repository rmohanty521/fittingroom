import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const PREVIEW_CODE = "FFFgetin3";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path.startsWith("/admin")) {
    return updateSession(request);
  }

  if (path.startsWith("/shop") || path.startsWith("/seller")) {
    const cookie = request.cookies.get("dev_preview")?.value;
    if (cookie !== PREVIEW_CODE) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      url.search = "";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/shop/:path*", "/seller/:path*"],
};
