import User from "@/db/models/User";

export async function POST(request) {
  const data = await request.json();

  console.log("data", data);

  User.create(data);

  try {
    // const r = await Car.create(data);
    return Response.json();
  } catch (error) {
    return Response.json({ error });
  }
}
