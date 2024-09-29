import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { createClient } from './utils/supabase/server';

export async function middleware(req: NextRequest) {
  const supabase = createClient();
  
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user && !req.nextUrl.pathname.startsWith('/admin/sign-in') && req.nextUrl.pathname !== '/') {
      return NextResponse.redirect(new URL('/admin/sign-in', req.url));
    }

    if (user && req.nextUrl.pathname === '/admin/sign-in') {
      return NextResponse.redirect(new URL('/admin/protected/dashboard', req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Authentication error:', error);
    // If there's an authentication error, redirect to sign-in
    return NextResponse.redirect(new URL('/admin/sign-in', req.url));
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|clock/.*|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}