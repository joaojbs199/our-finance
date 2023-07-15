import { makeRequestHandlerFactory } from '@/src/integration/domain/factories/services/request-service-factory';
import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      let isRegisteredUser = false;

      try {
        const request = makeRequestHandlerFactory();
        const response = await request.handle<boolean>({
          url: '/api/auth/isRegisteredUser',
          method: 'post',
          body: {
            email: user.email,
          },
        });

        isRegisteredUser = response;
      } catch (error) {
        console.log('DEBUG_OUR-FINANCE <-----> error:', error);
      }

      if (isRegisteredUser) {
        return true;
      } else {
        return '/unauthorized';
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
