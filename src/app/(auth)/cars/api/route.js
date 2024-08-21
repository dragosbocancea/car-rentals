import Car from "@/db/models/Car";
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
