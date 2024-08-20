"use client";

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ComputePrice = ({ costPerHour }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [hours, setHours] = useState(new Date());

  useEffect(() => {
    const period = endDate.getTime() - startDate.getTime();
    const differenceInHours = period / (1000 * 60 * 60);

    setHours(differenceInHours);

    console.log("differenceInHours", differenceInHours);
  }, [startDate, endDate]);

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
      <div className="text-3xl font-black mt-10">
        {hours >= 0 ? `Rental cost: ${hours * costPerHour} $` : ""}
      </div>
    </>
  );
};

export default ComputePrice;
