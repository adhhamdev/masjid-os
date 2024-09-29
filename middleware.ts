import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { updateSession } from './utils/supabase/middleware';

export async function middleware(req: NextRequest) {
  await updateSession(req);
    return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|clock/.*|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}