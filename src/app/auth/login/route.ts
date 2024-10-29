import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const url = new URL(req.url);
  const cookieStore = cookies();
  const formData = await req.formData();
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));

  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });

  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return NextResponse.redirect(url.origin, {
    status: 301,
  });
};
