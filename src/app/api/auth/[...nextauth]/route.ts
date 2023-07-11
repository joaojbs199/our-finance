import { getUser } from '@/lib/user/helpers';
import { isValid } from '@/src/utils/validators';
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
      const registeredUser = await getUser(user?.email as string);
      const isAllowedToSignIn = isValid(registeredUser);

      if (isAllowedToSignIn) {
        return true;
      } else {
        return '/unauthorized';
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };