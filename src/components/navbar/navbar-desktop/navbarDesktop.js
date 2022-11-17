import React from "react";

import dynamic from "next/dynamic";
import { useAuth } from "../../../context/authContext";

const Header = dynamic(() => import("./header"));
import CategoryLinksBar from "./categoryLinksBar";

export default function NavbarDesktop({ setToggleDrawer }) {
  const { user } = useAuth();

  return (
    <>
      <Header user={user} />
      <CategoryLinksBar setToggleDrawer={setToggleDrawer} />
    </>
  );
}
