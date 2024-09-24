import { createClient } from "@/utils/supabase/server";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser  ();

    if (request.nextUrl.pathname.startsWith("/admin/protected")) {
      if (!user) {
        // If there's no session, redirect to sign-in
        return NextResponse.redirect(new URL("/admin/sign-in", request.url));
      }
    }

    return response;
};
