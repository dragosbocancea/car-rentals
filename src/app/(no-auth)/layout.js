import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

const Layout = async ({ children }) => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }
  return children;
};

export default Layout;
