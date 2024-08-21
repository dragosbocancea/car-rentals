import Page404 from "@/app/404/page";
import ComputePrice from "@/components/ComputePrice";
import Car from "@/db/models/Car";
import Image from "next/image";

const Page = async ({ params }) => {
  const data = await Car.findOne({ where: { id: params.id } });

  console.log("data", data);
  if (!data) return <Page404 />;
  const dataJSON = JSON.parse(JSON.stringify(data));

  return (
    <div className="flex flex-col items-center">
      <Image
        src={dataJSON.imageURL}
        objectFit="cover"
        alt="Car Image"
        width={400}
        height={400}
        className="mb-10 rounded"
      />
      <div className="flex flex-row gap-2 text-3xl">
        Brand: <div className="font-black">{dataJSON.brand}</div>
      </div>
      <div className="flex flex-row gap-2 text-3xl">
        Model: <div className="font-black">{dataJSON.model}</div>
      </div>
      <div className="flex flex-row gap-2 text-3xl">
        Year of Production:{" "}
        <div className="font-black">{dataJSON.year_of_production}</div>
      </div>
      <div className="flex flex-row gap-2 text-3xl">
        Cost per Hour:{" "}
        <div className="font-black">{dataJSON.cost_per_hour}$</div>
      </div>
      {dataJSON.description && (
        <div className="flex flex-row gap-2 text-3xl">
          <div className="font-black">{dataJSON.description}</div>
        </div>
      )}

      <ComputePrice costPerHour={dataJSON.cost_per_hour} />
    </div>
  );
};

export default Page;
