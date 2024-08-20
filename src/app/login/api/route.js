import User from "@/db/models/User";
import { generateToken } from "@/utils/generateToken";
import sequelize from "@/utils/sequelize";
import { verifyPassword } from "@/utils/verifyPassword";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {
  const data = await request.json();

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
      return Response.json({ message: "Invalid password" }, { status: 401 });
    }

    const token = generateToken({
      _id: user.id,
      email: user.email,
      name: user.name,
    });
    cookies().set("access-token", token);
    return Response.json({ token }, { status: 200 });
  } catch (error) {
    return Response.json({ error });
  }
}

export async function GET(req) {
  const token = req.cookies.get("access-token")?.value;

  if (!token) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return Response.json({ message: "Welcome!", user });
  } catch (err) {
    return Response.json({ message: "Invalid token" }, { status: 401 });
  }
}
