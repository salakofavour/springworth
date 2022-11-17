import React, { useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import IconButton from "../navbar-mobile/iconButton";
import DrawerTopBar from "./drawerTopBar";
import DrawerLinks from "./drawerLinks";

export default function Darwer({ setToggleDrawer }) {
  return (
    <div
      className={`antialiased  bg-black bg-opacity-50 z-50 absolute inset-0 top-0 left-0 w-full h-full`}
    >
      <div className="absolute top-10 right-8 lg:top-5 cursor-pointer  lg:left-1/3 ">
        <IconButton
          handleClick={() => setToggleDrawer(false)}
          Icon={XMarkIcon}
        />
      </div>
      <div className="w-9/12 lg:w-4/12 bg-white h-full overflow-y-scroll">
        <DrawerTopBar />
        <DrawerLinks />
      </div>
    </div>
  );
}
