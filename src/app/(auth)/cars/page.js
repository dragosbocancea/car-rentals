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
  console.log("sessionnnn", session);
  const data = await Car.findAll({
    where: {
      owner_id: {
        [Op.ne]: loggedUser.getDataValue("id"),
      },
    },
  });
  const dataJSON = JSON.parse(JSON.stringify(data));
  return (
    <>
      <Cars cars={dataJSON} />
    </>
  );
};

export default Page;
