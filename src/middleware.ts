import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    console.log('#withAuth', req.nextauth.token);
  },
  {
    callbacks: {
      // authorized: ({ token }) => token?.role === 'admin',
    },
  },
);

// Supports both a single string value or an array of matchers
export const config = {
  matcher: ['/admin'],
};
