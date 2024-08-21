"use client";

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "./Button";

const Rent = ({ carData, onRent }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [hours, setHours] = useState(new Date());

  useEffect(() => {
    const period = endDate.getTime() - startDate.getTime();
    const differenceInHours = period / (1000 * 60 * 60);

    setHours(differenceInHours);
  }, [startDate, endDate]);

  const price = (hours * carData.cost_per_hour).toFixed(2);

  return (
    <>
      <div className="mt-20 text-2xl mb-4">Compute rental price</div>
      <div className="flex flex-row gap-2">
        <div className="font-bold">Start date:</div>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
      </div>
      <div className="flex flex-row gap-2">
        <div className="font-bold">End date:</div>
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
      </div>
      {price > 0 && (
        <>
          <div className="text-3xl font-black mt-10">
            {hours >= 0 ? `Rental cost: ${price} $` : ""}
          </div>
          <Button
            className="mt-4"
            onClick={() => {
              const rentalDetails = {
                start_date: startDate,
                end_date: endDate,
                total_price: price,
                car_id: carData.id,
              };
              onRent(rentalDetails);
            }}
          >
            Rent
          </Button>
        </>
      )}
    </>
  );
};

export default Rent;
