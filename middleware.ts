import { updateSession } from '@/utils/supabase/middleware'
import { createClient } from '@/utils/supabase/server'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // First, update the session to refresh tokens if necessary
  const response = await updateSession(request)

  // If updateSession returns a response, it means a redirect occurred (e.g., to login page)
  if (response) return response

  const supabase = createClient()
  
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user && !request.nextUrl.pathname.startsWith('/admin/sign-in') && request.nextUrl.pathname !== '/') {
      return NextResponse.redirect(new URL('/admin/sign-in', request.url));
    }

    if (user && request.nextUrl.pathname === '/admin/sign-in') {
      return NextResponse.redirect(new URL('/admin/protected/dashboard', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Authentication error:', error);
    // If there's an authentication error, redirect to sign-in
    return NextResponse.redirect(new URL('/admin/sign-in', request.url));
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}