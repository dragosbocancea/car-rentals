import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Car from "@/db/models/Car";
import User from "@/db/models/User";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { Op } from "sequelize";

export async function updateCars() {
  try {
    const [cars] = await Car.update(
      { status: "available", available_on: null },
      {
        where: {
          available_on: {
            [Op.lte]: new Date(),
          },
          status: {
            [Op.ne]: "available",
          },
        },
      }
    );

    console.log(`${cars} cars updated.`);
  } catch (error) {
    console.error("Error updating car statuses:", error);
  }
}

export async function GET() {
  await updateCars();
  return NextResponse.json({ message: "Manual update triggered." });
}

export async function POST(request) {
  const data = await request.json();

  try {
    const session = await getServerSession(authOptions);
    const loggedUser = await User.findOne({
      where: {
        email: session.user.email,
      },
    });

    const searchObject = {
      where: {
        status: "available",
        owner_id: {
          [Op.ne]: loggedUser.getDataValue("id"),
        },
      },
    };
    if (data.model) searchObject.where.model = data.model;
    if (data.brand) searchObject.where.brand = data.brand;
    const cars = await Car.findAll(searchObject);

    return Response.json({ cars: cars, status: 200 });
  } catch (error) {
    return Response.json({ message: error.message, status: 400 });
  }
}
