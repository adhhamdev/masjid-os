import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { updateSession } from './utils/supabase/middleware';
import { createClient } from './utils/supabase/server';

export async function middleware(req: NextRequest) {
  await updateSession(req);

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user && !req.nextUrl.pathname.startsWith('/admin/sign-in') && req.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/admin/sign-in', req.url));
  }

  if (user && req.nextUrl.pathname === '/admin/sign-in') {
    return NextResponse.redirect(new URL('/admin/protected/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|clock/.*|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}