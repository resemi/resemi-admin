import { withAuth } from 'next-auth/middleware';

export const middleware = withAuth({
  callbacks: {
    // authorized: ({ token }) => token?.role === 'admin',
  },
});

// Supports both a single string value or an array of matchers
export const config = {
  matcher: ['/admin/:path*'],
};
