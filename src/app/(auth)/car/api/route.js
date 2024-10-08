import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Car from "@/db/models/Car";
import RentalRequest from "@/db/models/RentalRequest";
import User from "@/db/models/User";
import { getServerSession } from "next-auth";

export async function POST(request) {
  const data = await request.json();
  const session = await getServerSession(authOptions);

  try {
    await User.sync();
    const loggedUser = await User.findOne({
      where: {
        email: session.user.email,
      },
    });

    const requestEntry = {
      ...data,
      start_date: new Date(data.start_date),
      end_date: new Date(data.end_date),
      requesting_user: loggedUser.getDataValue("id"),
    };

    await Car.sync();
    const o = await Car.findOne({
      where: {
        id: data.car_id,
      },
    });
    await RentalRequest.sync();
    const r = await RentalRequest.create({
      ...requestEntry,
      owner_id: o.getDataValue("owner_id"),
    });

    const c = await Car.update(
      { status: "rented", available_on: new Date(data.end_date) },
      {
        where: {
          id: data.car_id,
        },
      }
    );

    return Response.json({ message: "success", status: 200 });
  } catch (error) {
    return Response.json({ message: error.message, status: 400 });
  }
}
