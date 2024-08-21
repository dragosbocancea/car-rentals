// "use client";

import Car from "@/db/models/Car";
import Cars from "./cars";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Op } from "sequelize";
import User from "@/db/models/User";

const Page = async () => {
  const session = await getServerSession(authOptions);
  const loggedUser = await User.findOne({
    where: {
      email: session.user.email,
    },
  });
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
      {/* <div className="flex gap-2 flex-wrap justify-center mx-10 mb-4">
        <div className="w-full flex flex-row justify-between mx-20">
          <select
            className="border rounded px-2 py-1"
            name="brands"
            id="select-brand"
            // onSelect={(val) => {
            //   console.log(val);
            // }}
          >
            <option value="">--Filter by brand--</option>
            {brands.map((brand) => (
              <option value={brand}>{brand}</option>
            ))}
          </select>
          <select
            className="border rounded px-2 py-1"
            name="models"
            id="select-model"
          >
            <option value="">--Filter by model--</option>
            {models.map((model) => (
              <option value={model}>{model}</option>
            ))}
          </select>
        </div>
      </div> */}
      <Cars cars={dataJSON} models={models} brands={brands} />
    </>
  );
};

export default Page;
