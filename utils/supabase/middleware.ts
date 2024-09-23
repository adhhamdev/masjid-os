import { createClient } from "@/utils/supabase/server";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createClient();

    const { data: { session } } = await supabase.auth.getSession();

    if (request.nextUrl.pathname.startsWith("/admin/protected")) {
      if (!session) {
        // If there's no session, redirect to sign-in
        return NextResponse.redirect(new URL("/admin/sign-in", request.url));
      }
    }

    return response;
};
