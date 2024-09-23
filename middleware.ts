import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { createClient } from './utils/supabase/server';


export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If the user is not signed in and the current path is not / or /admin/sign-in, redirect to /admin/sign-in
  if (!session && !req.nextUrl.pathname.startsWith('/admin/sign-in') && req.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/admin/sign-in', req.url))
  }

  // If the user is signed in and the current path is /admin/sign-in, redirect to /admin/protected/dashboard
  if (session && req.nextUrl.pathname === '/admin/sign-in') {
    return NextResponse.redirect(new URL('/admin/protected/dashboard', req.url))
  }

  return res
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
