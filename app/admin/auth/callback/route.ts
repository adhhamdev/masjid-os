import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;

  if (code) {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.exchangeCodeForSession(code);
    if (session) {
      await supabase.from('users').update({ last_sign_in_at: new Date().toISOString() }).eq('id', session.user.id);
    }
  }

  return NextResponse.redirect(`${origin}/admin/protected/dashboard`);
}
