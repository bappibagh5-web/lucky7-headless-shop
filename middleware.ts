import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow Next.js internals and static assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/robots.txt')
  ) {
    return NextResponse.next();
  }

  // Check for WooCommerce / WordPress login cookie
  const isLoggedIn = request.cookies
    .getAll()
    .some((cookie) => cookie.name.startsWith('wordpress_logged_in_'));

  // If not logged in, redirect to WordPress locked page
  if (!isLoggedIn) {
    return NextResponse.redirect(
      new URL(
        'https://lucky7distribution.com/wholesale-distributor-partner/'
      )
    );
  }

  return NextResponse.next();
}

// Apply middleware to ALL routes
export const config = {
  matcher: ['/:path*'],
};
