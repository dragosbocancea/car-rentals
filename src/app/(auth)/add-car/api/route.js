import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Car from "@/db/models/Car";
import User from "@/db/models/User";
import { getServerSession } from "next-auth";

export async function POST(request) {
  const data = await request.json();
  const session = await getServerSession(authOptions);
  const loggedUser = await User.findOne({
    where: {
      email: session.user.email,
    },
  });

  try {
    const r = await Car.create({
      ...data,
      owner_id: loggedUser.getDataValue("id"),
    });
    return Response.json(r);
  } catch (error) {
    return Response.json({ error });
  }
}
