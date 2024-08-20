import Car from "@/db/models/Car";

export async function POST(request) {
  const data = await request.json();

  try {
    const r = await Car.create(data);
    return Response.json(r);
  } catch (error) {
    return Response.json({ error });
  }
}
