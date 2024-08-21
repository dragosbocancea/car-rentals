import RentalRequest from "@/db/models/RentalRequest";
import RentalRequests from "./rental-requests";
import { Op } from "sequelize";
import { getServerSession } from "next-auth";
import User from "@/db/models/User";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const Page = async () => {
  const session = await getServerSession(authOptions);
  await User.sync();
  const loggedUser = await User.findOne({
    where: {
      email: session.user.email,
    },
  });
  await RentalRequest.sync();
  const requests = await RentalRequest.findAll({
    where: {
      owner_id: loggedUser.getDataValue("id"),
      status: "active",
    },
  });
  return <RentalRequests requests={JSON.parse(JSON.stringify(requests))} />;
};

export default Page;
