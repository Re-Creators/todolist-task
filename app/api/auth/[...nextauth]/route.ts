import { Backend_URL } from "@/app/lib/constants";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        try {
          const res = await fetch(`${Backend_URL}/auth/signin`, {
            method: "POST",
            body: JSON.stringify({
              username_or_email: credentials.email,
              password: credentials.password,
            }),
            headers: { "Content-Type": "application/json" },
          });

          const user = await res.json();
          if (!res.ok) {
            return null;
          }

          return {
            ...user,
          };
        } catch (e) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      return { ...token, ...user };
    },
    async session({ session, token, user }: any) {
      session = token as any;
      return session;
    },
    pages: {
      signIn: "/signin",
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
