import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { updateSession } from './utils/supabase/middleware';
import { createAdminClient, createClient } from './utils/supabase/server';

export async function middleware(req: NextRequest) {
  await updateSession(req);

  const path = req.nextUrl.pathname;

  // Admin routes
  if (path.startsWith('/admin')) {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user && path !== '/admin/sign-in') {
      return NextResponse.redirect(new URL('/admin/sign-in', req.url));
    }
    if (user && path !== '/admin/sign-in' && user.role !== 'authenticated') {
      return NextResponse.redirect(new URL('/admin/sign-in', req.url));
    }
  }

  // Superadmin routes
  if (path.startsWith('/superadmin')) {
    const supabase = createAdminClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user && path !== '/superadmin/sign-in') {
      return NextResponse.redirect(new URL('/superadmin/sign-in', req.url));
    }
    if (
      user &&
      path !== '/superadmin/sign-in' &&
      user.role !== 'service_role'
    ) {
      return NextResponse.redirect(new URL('/superadmin/sign-in', req.url));
    }
    if (
      user &&
      path === '/superadmin/sign-in' &&
      user.role === 'service_role'
    ) {
      return NextResponse.redirect(new URL('/superadmin', req.url));
    }
  }

  // Allow access to the home page
  if (path === '/') {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|clock/.*|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
