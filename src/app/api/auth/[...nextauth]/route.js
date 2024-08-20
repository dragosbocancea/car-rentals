import User from "@/db/models/User";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const user = await User.findOne({
            where: {
              email: data.email,
            },
          });
          const isValid = verifyPassword(
            data.password,
            user.hashedPassword,
            user.salt
          );

          if (!isValid) {
            return Response.json(
              { message: "Invalid password" },
              { status: 401 }
            );
          }

          // const token = generateToken({
          //   _id: user.id,
          //   email: user.email,
          //   name: user.name,
          // });
          cookies().set("access-token", token);
          return Response.json({ token }, { status: 200 });
        } catch (error) {
          return Response.json({ error });
        }
        if (
          credentials.username === "user" &&
          credentials.password === "pass"
        ) {
          return { id: 1, name: "John Doe", email: "john@example.com" };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
};

export default NextAuth(authOptions);
