import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <>
      <div className="text-2xl flex self-center justify-center">
        {`Welcome to Car Rentals, ${session.user.name}!`}
      </div>
    </>
  );
}
