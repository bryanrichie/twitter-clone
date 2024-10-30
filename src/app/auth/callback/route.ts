import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({
      cookies: () => cookieStore,
    });

    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(url.origin);
};
