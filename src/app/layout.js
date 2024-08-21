import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "./clientLayout";
import { updateCars } from "./(auth)/cars/api/route";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Car Rentals",
  description: "Car Rentals",
};

export default async function RootLayout({ children }) {
  await updateCars();
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
