"use client";

import Button from "@/components/Button";
import { useRouter } from "next/navigation";

const HandleRequest = ({ data }) => {
  const router = useRouter();

  const handleRequest = async (action) => {
    const res = await fetch("/rental-requests/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, action: action }),
    });
    const resJson = await res.json();
    if (resJson?.message === "success") {
      router.refresh();
    }
  };

  return (
    <>
      <Button
        className="bg-green-700 hover:bg-green-800"
        onClick={() => {
          handleRequest("accept");
        }}
      >
        Accept
      </Button>
      <Button
        className="bg-red-700 hover:bg-red-800"
        onClick={() => {
          handleRequest("decline");
        }}
      >
        Decline
      </Button>
    </>
  );
};
export default HandleRequest;
