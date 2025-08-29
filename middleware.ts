import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

const isPublicRoute = ["/api/auth/login-callback", "/login"];

// List of static file extensions to bypass the middleware
// const staticExtensions = [".png", ".jpg", ".jpeg", ".gif", ".svg", ".ico"];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const access_token = request.cookies.get("ipc_inTake_access_token");

  try {
    // Bypass if the URL has a static asset extension
    // if (staticExtensions.some((ext) => path.endsWith(ext))) {
    //   return NextResponse.next();
    // }

    if (isPublicRoute.includes(path)) {
      return NextResponse.next();
    }

    if (!access_token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const decodedToken = jwtDecode(access_token.value);
    const currentTime = Date.now() / 1000;

    if (!decodedToken.exp || decodedToken.exp < currentTime) {
      console.warn("token expired");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public|oauth-callback).*)",
  ],
};
