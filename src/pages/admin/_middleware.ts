import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    // authorized: ({ token }) => token?.role === 'admin',
  },
});
