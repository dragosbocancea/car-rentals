import User from "@/db/models/User";
import { verifyPassword } from "@/utils/verifyPassword";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";

export const authOptions = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt(props) {
      console.log("props", props);
      return props.token;
    },
    async session({ session, token }) {
      console.log("props session", session, token);
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const user = await User.findOne({
            where: {
              email: credentials.email,
            },
          });
          const isValid = verifyPassword(
            credentials.password,
            user.hashedPassword,
            user.salt
          );

          if (!isValid) {
            return Response.json(
              { message: "Invalid password" },
              { status: 401 }
            );
          }

          console.log("isValid", isValid);

          return {
            id: user.getDataValue("id"),
            name: user.getDataValue("name"),
            email: user.getDataValue("email"),
          };
        } catch (error) {
          return Response.json({ error });
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  cookies: {
    sessionToken: {
      name: "session-token",
      options: {
        httpOnly: false,
        secure: false,
        path: "/",
      },
    },
  },
  jwt: {
    async encode(props) {
      const token = jwt.sign(
        { email: props.token.email, name: props.token.name },
        props.secret,
        { expiresIn: "1h" }
      );
      return token;
    },
    async decode({ token, secret }) {
      const verified = jwt.verify(token, secret);
      return verified;
    },
    secret: process.env.JWT_SECRET,
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
