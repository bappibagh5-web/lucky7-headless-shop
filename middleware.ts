import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /shop routes
  if (!pathname.startsWith('/shop')) {
    return NextResponse.next();
  }

  // Check for WooCommerce / WordPress login cookie
  const isLoggedIn = request.cookies
    .getAll()
    .some((cookie) => cookie.name.startsWith('wordpress_logged_in_'));

  // If not logged in, redirect to locked page
  if (!isLoggedIn) {
    const redirectUrl = new URL(
      '/wholesale-distributor-partner/',
      request.url
    );
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

// Apply middleware only to /shop routes
export const config = {
  matcher: ['/shop/:path*'],
};
