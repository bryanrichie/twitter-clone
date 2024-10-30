import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/auth')) {
    return res;
  }

  if (error) {
    console.error('Middleware error:', error);
    return NextResponse.rewrite(new URL('/login', req.url));
  }

  if (!session) {
    return NextResponse.rewrite(new URL('/login', req.url));
  }

  return res;
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};
