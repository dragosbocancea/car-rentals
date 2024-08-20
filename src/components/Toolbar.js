"use client";

import { useState } from "react";
import Button from "./Button";
import { usePathname, useRouter } from "next/navigation";

const MenuEntry = ({ children, path, closeMenu }) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div
      className={`cursor-pointer hover:underline ${
        path === pathname ? "font-bold text-sky-400" : "font-medium"
      }`}
      onClick={() => {
        closeMenu();
        router.push(path);
      }}
    >
      {children}
    </div>
  );
};

const Toolbar = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const closeMenu = () => setMenuOpened(false);
  const router = useRouter();

  return (
    <>
      <div className="bg-emerald-400 p-2 flex justify-between	items-center">
        <div
          className="font-bold cursor-pointer"
          onClick={() => router.push("/")}
        >
          Car Rentals
        </div>
        <div id="controls" className="flex flex-row gap-2">
          <Button
            onClick={() => {
              setMenuOpened((prev) => !prev);
            }}
          >{`${menuOpened ? "Close" : "Open"} menu`}</Button>
        </div>
      </div>
      {menuOpened && (
        <>
          <div className="absolute bg-white text-black min-h-72 w-full flex justify-between flex-row p-2 z-10">
            <div className="font-bold">
              <MenuEntry path="/add-car" closeMenu={closeMenu}>
                Add Car
              </MenuEntry>
              <MenuEntry path="/cars" closeMenu={closeMenu}>
                View All Listed Cars
              </MenuEntry>
              <MenuEntry path="/rental-history" closeMenu={closeMenu}>
                Rental History
              </MenuEntry>
              <MenuEntry path="/rental-requests" closeMenu={closeMenu}>
                Rental Requests
              </MenuEntry>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                onClick={() => {
                  setMenuOpened(false);
                  router.push("/login");
                }}
              >
                Login
              </Button>
              <Button
                onClick={() => {
                  setMenuOpened(false);
                  router.push("/register");
                }}
              >
                Register
              </Button>
            </div>
          </div>
          <div
            id="backdrop"
            className="absolute h-full w-full backdrop-blur-sm bg-black bg-opacity-20 z-0"
            onClick={() => {
              setMenuOpened(false);
            }}
          />
        </>
      )}
    </>
  );
};

export default Toolbar;
