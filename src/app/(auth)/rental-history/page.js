import { getServerSession } from "next-auth";
import RentalHistory from "./rental-history";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/db/models/User";
import RentalRequest from "@/db/models/RentalRequest";

const Page = async () => {
  const session = await getServerSession(authOptions);
  const loggedUser = await User.findOne({
    where: {
      email: session.user.email,
    },
  });
  const requests = await RentalRequest.findAll({
    where: {
      requesting_user: loggedUser.getDataValue("id"),
      status: "accepted",
    },
    order: [["end_date", "DESC"]],
  });
  return (
    <RentalHistory requestsHistory={JSON.parse(JSON.stringify(requests))} />
  );
};

export default Page;
