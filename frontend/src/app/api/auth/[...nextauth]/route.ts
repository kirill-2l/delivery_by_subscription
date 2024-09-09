import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { Api } from '@/shared/services/api-client';

export const authOptions: AuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          type: 'text',
        },
        password: { type: 'password' },
      },
      async authorize(credentials, req) {
        console.log('authorize');
        try {
          if (!credentials?.email || !credentials?.password) return null;
          const tokens = await Api.auth.signin(credentials);
          const user = await Api.auth.me(tokens.access_token);
          return { tokens, user, id: user.id };
        } catch (err) {
          // console.error('Error [JWT authorize]', err);
          return null;
        }
      },
    }),
  ],
  pages: {
    // ?? how to disable?
    signIn: undefined,
    signOut: undefined,
    error: undefined,
    verifyRequest: undefined,
    newUser: undefined,
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log('jwt');

      try {
        if (user) return { ...token, ...user };
        if (new Date().getTime() < token.tokens.expires_in) return token;
        console.log('refresh token');
        const refreshedTokens = await Api.auth.refresh(
          token.tokens.refresh_token
        );
        console.log('refresh token', refreshedTokens);
        return refreshedTokens;
      } catch (err) {
        // console.error('Error [JWT CALLBACK]', err);
        return null;
      }
    },

    session({ token, session }) {
      console.log('session', session);

      if (!token) return session;
      const { tokens, user } = token;
      session.user = user;
      session.tokens = tokens;
      console.log(session);
      return session;
    },
  },
  debug: true,
  events: {
    async signOut({ session, token }) {
      console.log('signOut', session, token);
      await Api.auth.logout(token.tokens?.access_token || '');
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
