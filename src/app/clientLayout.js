"use client";
import Toolbar from "@/components/Toolbar";
import { SessionProvider } from "next-auth/react";

const ClientLayout = ({ children }) => {
  return (
    <>
      <SessionProvider>
        <Toolbar />
        <div className="p-2">{children}</div>
      </SessionProvider>
    </>
  );
};
export default ClientLayout;
