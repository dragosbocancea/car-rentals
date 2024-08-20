"use client";

import { useParams } from "next/navigation";

const Page = () => {
  const { id: carId } = useParams();
  return (
    <>
      this is the page for car with id:{" "}
      <div className="font-black">{carId}</div>
      <div>form</div>
    </>
  );
};

export default Page;
