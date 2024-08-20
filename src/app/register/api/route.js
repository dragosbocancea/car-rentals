import User from "@/db/models/User";
import sequelize from "@/utils/sequelize";

export async function POST(request) {
  const data = await request.json();

  try {
    const r = await User.create(data);
    return Response.json().status(200);
  } catch (error) {
    return Response.json({ error });
  }
}
