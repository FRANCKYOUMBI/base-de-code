import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import isEqual from 'lodash/isEqual';
import { pagesOptions } from './pages-options';
import { env } from '@/env.mjs';
import AuthService from "@/services/AuthsService";

export const authOptions: NextAuthOptions = {
  debug: false,
  pages: {
    ...pagesOptions,   
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async session({ session, token, user }) {
      return {
        ...session,
        user: {
          // @ts-ignore
          ...token.user,
          accessToken: token.accessToken as string,
        },
      } as any;
    },
    async jwt({ token, user }: any) {
      if (user && user.user) {
        // return user as JWT
        token.user = user.user;
      }
      if (user && user.token) {
        token.accessToken = user.token;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      const parsedUrl = new URL(url, baseUrl);
      if (parsedUrl.searchParams.has('callbackUrl')) {
        return `${baseUrl}${parsedUrl.searchParams.get('callbackUrl')}`;
      }
      if (parsedUrl.origin === baseUrl) {
        return url;
      }
      return baseUrl;
    },
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {},
      async authorize(credentials: any) {
        const authService = new AuthService();
        const auth_result = await authService.login({
          email: credentials.email,
          password: credentials.password
        })
        if ("statusCode" in auth_result && auth_result.statusCode) {
          throw new Error(auth_result.message);
        } else if ("token" in auth_result && auth_result.token) {
          return auth_result as any;
        }
        return null;
      },
    }),
  ],
};
