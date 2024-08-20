import User from "@/db/models/User";
import { generateToken } from "@/utils/generateToken";
import sequelize from "@/utils/sequelize";
import { verifyPassword } from "@/utils/verifyPassword";
import { cookies } from "next/headers";

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

    const token = generateToken({ _id: user.id, email: user.email });
    cookies().set("access-token", token);
    return Response.json({ token }, { status: 200 });
  } catch (error) {
    return Response.json({ error });
  }
}
