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

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|public).*)']
}
