import Rent from "@/components/Rent";
import Car from "@/db/models/Car";
import Image from "next/image";
import { redirect } from "next/navigation";
import CarClient from "./carClient";

const Page = async ({ params }) => {
  await Car.sync();
  const data = await Car.findOne({
    where: { id: params.id, status: "available" },
  });

  if (!data) redirect("/404");

  const dataJSON = JSON.parse(JSON.stringify(data));

  return <CarClient data={dataJSON} />;
};

export default Page;
