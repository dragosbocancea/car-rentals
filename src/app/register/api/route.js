import User from "@/db/models/User";
import sequelize from "@/utils/sequelize";

export async function POST(request) {
  const data = await request.json();

  try {
    const createdUser = await User.create(data);
    console.log("createdUser", createdUser);
    return Response.json({ message: "success", status: 200 });
  } catch (error) {
    return Response.json({ error: error?.errors[0]?.message, status: 401 });
  }
}
