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
        try {
          if (!credentials?.email || !credentials?.password) return null;
          const tokens = await Api.auth.signin(credentials);
          const user = await Api.auth.me(tokens.access_token);
          return { tokens, user, id: user.id };
        } catch (err) {
          console.log(err);
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
      if (user) return { ...token, ...user };
      if (new Date().getTime() < token.tokens.expires_in) return token;
      return await Api.auth.refresh();
    },
    session({ token, session }) {
      const { tokens, user } = token;
      session.user = user;
      session.tokens = tokens;
      return session;
    },
  },
  events: {
    async signOut(message) {
      const res = await Api.auth.logout();
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
