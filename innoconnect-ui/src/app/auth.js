/**
 * @author Tom Shortridge
 */
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connect } from "@/app/config/databaseConnection";
import User from "@/app/models/user";
import bcrypt from "bcryptjs";

export const { auth, handlers, signIn, signOut } = NextAuth({
  session: {
    jwt: true,
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        connect();

        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("User not found!");
        }

        const passwordValidation = bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordValidation) {
          throw new Error("Password is invalid!");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          _id: user._id,
          email: user.email,
          firstname: user.firstname,
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
