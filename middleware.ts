import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { createClient } from './utils/supabase/server';

export async function middleware(req: NextRequest) {
  const supabase = createClient();
  const { data: {user} } = await supabase.auth.getUser();

  if (!user && !req.nextUrl.pathname.startsWith('/admin/sign-in') && req.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/admin/sign-in?', req.url));
  }

  if (user && req.nextUrl.pathname === '/admin/sign-in') {
    return NextResponse.redirect(new URL('/admin/protected/dashboard', req.url));
  }

  // Check for inactivity
  const lastActivity = user?.last_sign_in_at;
  const currentTime = new Date().getTime(); 
  const inactivityLimit = 5 * 60 * 1000; // 5 minutes in milliseconds

  if (lastActivity && (currentTime - new Date(lastActivity).getTime()) > inactivityLimit) {
    console.log('User is inactive');
    await supabase.auth.signOut();
    return NextResponse.redirect(new URL('/admin/sign-in?timeout=true', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|mosque.png).*)']
}
