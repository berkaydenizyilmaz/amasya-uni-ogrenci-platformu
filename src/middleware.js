import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdmin = token?.role === "ADMIN";
    const pathname = req.nextUrl.pathname;

    // Admin sayfaları kontrolü
    if (pathname.startsWith("/admin") && !isAdmin) {
      return NextResponse.redirect(new URL("/giris", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/not-paylasimi/:path*",
    "/etkinlikler/:path*",
    "/admin/:path*",
  ],
}; 