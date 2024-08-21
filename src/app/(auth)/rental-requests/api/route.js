import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Car from "@/db/models/Car";
import RentalRequest from "@/db/models/RentalRequest";
import User from "@/db/models/User";
import { getServerSession } from "next-auth";
import { literal, Op } from "sequelize";

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

    switch (data.action) {
      case "accept":
        await RentalRequest.sync();
        RentalRequest.update(
          { status: "declined" },
          {
            where: {
              car_id: data.car.id,
              id: {
                [Op.ne]: data.request.id,
              },
            },
          }
        ).then(() => {
          RentalRequest.update(
            { status: "accepted" },
            {
              where: {
                id: data.request.id,
              },
            }
          );
        });

      case "decline":
        await RentalRequest.sync();
        const declinedRequest = await RentalRequest.update(
          { status: "declined" },
          {
            where: {
              id: data.request.id,
            },
          }
        );
    }

    return Response.json({ message: "success", status: 200 });
  } catch (error) {
    return Response.json({ message: error.message, status: 400 });
  }
}
