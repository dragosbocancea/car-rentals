"use client";

import CarCard from "@/components/CarCard";
import { useRouter } from "next/navigation";

const Cars = ({ cars }) => {
  console.log("cars", cars);
  const router = useRouter();
  return (
    <>
      <div className="flex gap-2 flex-wrap justify-center mx-10">
        {!!!cars.length && (
          <div className="font-medium text-xl">
            There is no car available for renting at the moment
          </div>
        )}
        {cars.map((car) => {
          return (
            <CarCard
              onClick={() => {
                router.push(`/car/${car.id}`);
              }}
              key={car.id}
              {...car}
            />
          );
        })}
      </div>
    </>
  );
};

export default Cars;
