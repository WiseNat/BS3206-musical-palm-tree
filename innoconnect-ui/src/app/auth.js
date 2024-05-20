/**
 * @author Tom Shortridge
 *
 * Handles authentication of a user
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
        // Connects to the database
        connect();

        // Finds the user
        const user = await User.findOne({ email: credentials.email });

        // Rejects sign in if user does not exist
        if (!user) {
          throw new Error(JSON.stringify({ errors: "User not found!" }));
        }

        // Validates the user's password
        const passwordValidation = await bcrypt.compare(
          credentials.password,
          user.password
        );

        // Rejects sign in if the user's password is incorrect
        if (!passwordValidation) {
          throw new Error(JSON.stringify({ errors: "Password is invalid" }));
        }

        return user;
      },
    }),
  ],
  callbacks: {
    // Creates the JWT for the basic user information
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
    // Creates session
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
