// "use client";

import Car from "@/db/models/Car";
import Cars from "./cars";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Op } from "sequelize";
import User from "@/db/models/User";

const Page = async () => {
  const session = await getServerSession(authOptions);
  await User.sync();
  const loggedUser = await User.findOne({
    where: {
      email: session.user.email,
    },
  });
  await Car.sync();
  const data = await Car.findAll({
    where: {
      status: "available",
      owner_id: {
        [Op.ne]: loggedUser.getDataValue("id"),
      },
    },
  });
  const dataJSON = JSON.parse(JSON.stringify(data));

  const models = [];
  const brands = [];
  dataJSON.forEach((car) => {
    if (!models.includes(car.model)) models.push(car.model);
    if (!models.includes(car.brand)) brands.push(car.brand);
  });
  return (
    <>
      <Cars cars={dataJSON} models={models} brands={brands} />
    </>
  );
};

export default Page;
