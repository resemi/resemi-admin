import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import pick from 'lodash-es/pick';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        // custom sign-in page
        username: {},
        password: {},
      },
      async authorize({ username, password }) {
        console.log('login >', username, password);

        if (username === 'anguer' && password === '123456') {
          return { id: 1, name: 'Anguer' };
        }

        // Return null if user data could not be retrieved
        return Promise.reject(new Error('Username or password not correct'));
      },
    }),
  ],
  callbacks: {
    async signIn() {
      return true;
    },
    // async redirect({ baseUrl }) {
    //   return baseUrl;
    // },
    async session({ session, token }) {
      const theSession = session;
      theSession.user = { ...theSession.user, ...pick(token, ['id', 'name']) };

      return theSession;
    },
    async jwt({ token, user }) {
      // console.log('jwt callback', token, user);
      return {
        ...token,
        ...user,
      };
    },
  },
  session: {
    strategy: 'jwt',
    // Seconds
    // maxAge: 30 * 24 * 60 * 60,
    maxAge: 60 * 60 * 2,
    // updateAge: 24 * 60 * 60,
  },
  pages: {
    signIn: '/login',
    // error: '/500',
  },
  debug: false,
  events: {},
  theme: {
    colorScheme: 'auto',
  },
  // secret: process.env.NEXTAUTH_SECRET,
});
