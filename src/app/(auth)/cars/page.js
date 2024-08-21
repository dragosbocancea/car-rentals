import Car from "@/db/models/Car";
import Cars from "./cars";

const Page = async () => {
  const data = await Car.findAll();
  const dataJSON = JSON.parse(JSON.stringify(data));
  return (
    <>
      <Cars cars={dataJSON} />
    </>
  );
};

export default Page;
