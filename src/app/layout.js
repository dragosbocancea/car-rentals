import { Inter } from "next/font/google";
import "./globals.css";
import Toolbar from "@/components/Toolbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Car Rentals",
  description: "Car Rentals",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toolbar />
        <div className="p-2">{children}</div>
      </body>
    </html>
  );
}
