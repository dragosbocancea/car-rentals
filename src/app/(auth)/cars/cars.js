"use client";

import CarCard from "@/components/CarCard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Cars = ({ cars, models, brands }) => {
  const router = useRouter();

  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [filteredCars, setFilteredCars] = useState(cars);

  useEffect(() => {
    const fetchCars = async () => {
      const cars = await fetch("/cars/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ model, brand }),
      });
      const res = await cars.json();
      setFilteredCars(res.cars);
      return res;
    };
    fetchCars();
  }, [model, brand]);
  return (
    <>
      <div className="flex gap-2 flex-wrap justify-center mx-10">
        <div className="w-full flex flex-row justify-between mx-20">
          <select
            className="border rounded px-2 py-1"
            name="brands"
            id="select-brand"
            value={brand}
            onChange={(e) => {
              setBrand(e.target.value);
            }}
          >
            <option key="brands-no-value" value="">
              --Filter by brand--
            </option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
          <select
            className="border rounded px-2 py-1"
            name="models"
            id="select-model"
            value={model}
            onChange={(e) => {
              setModel(e.target.value);
            }}
          >
            <option key="models-no-value" value="">
              --Filter by model--
            </option>
            {models.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>

        {!!!filteredCars.length && (
          <div className="font-medium text-xl">
            There is no car available for renting at the moment
          </div>
        )}
        {filteredCars.map((car) => {
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
