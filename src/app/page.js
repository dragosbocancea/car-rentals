import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

export default function Home() {
  const token = cookies().get("access-token")?.value;
  console.log("token", token);

  if (!token) {
    redirect("/login");
  }

  let user;
  try {
    user = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.error("Invalid token", err);
    redirect("/login");
  }

  console.log(user);

  return (
    <>
      <div className="text-2xl flex self-center justify-center">
        Welcome to Car Rentals!
      </div>
    </>
  );
}
