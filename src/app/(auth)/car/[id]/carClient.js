"use client";

import Rent from "@/components/Rent";
import { useSession } from "next-auth/react";
import Image from "next/image";

const CarClient = ({ data }) => {
  const session = useSession();
  console.log(session);

  const onRent = async (rentalData) => {
    console.log("rentalData", rentalData);
    const res = await fetch("/car/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rentalData),
    });
    console.log(await res.json());
  };
  return (
    <div className="flex flex-col items-center">
      <Image
        src={data.imageURL}
        objectFit="cover"
        alt="Car Image"
        width={400}
        height={400}
        className="mb-10 rounded"
      />
      <div className="flex flex-row gap-2 text-3xl">
        Brand: <div className="font-black">{data.brand}</div>
      </div>
      <div className="flex flex-row gap-2 text-3xl">
        Model: <div className="font-black">{data.model}</div>
      </div>
      <div className="flex flex-row gap-2 text-3xl">
        Year of Production:{" "}
        <div className="font-black">{data.year_of_production}</div>
      </div>
      <div className="flex flex-row gap-2 text-3xl">
        Cost per Hour: <div className="font-black">{data.cost_per_hour}$</div>
      </div>
      {data.description && (
        <div className="flex flex-row gap-2 text-3xl">
          <div className="font-black">{data.description}</div>
        </div>
      )}

      <Rent carData={data} onRent={onRent} />
    </div>
  );
};
export default CarClient;
