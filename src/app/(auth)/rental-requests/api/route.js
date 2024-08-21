import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Car from "@/db/models/Car";
import RentalRequest from "@/db/models/RentalRequest";
import User from "@/db/models/User";
import { getServerSession } from "next-auth";
import { Op } from "sequelize";

export async function POST(request) {
  const data = await request.json();
  const session = await getServerSession(authOptions);

  try {
    const loggedUser = await User.findOne({
      where: {
        email: session.user.email,
      },
    });

    // console.log("loggedUser", loggedUser);
    console.log("[rental-req] data", data);

    switch (data.action) {
      case "accept":
        const declineRemainingRequests = await RentalRequest.update(
          { status: "declined" },
          {
            where: {
              status: "active",
              car_id: data.car.id,
              id: {
                [Op.ne]: data.request.id,
              },
            },
          }
        );
        const updatedRequest = await RentalRequest.update(
          { status: "accepted" },
          {
            where: {
              id: data.request.id,
            },
          }
        );

      case "decline":
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
