import React from "react";

import Header from "./header";
import SearchField from "../navbar-desktop/searchFields";
import CategoryLinksBar from "./categoryLinkBar";

import { useAuth } from "../../../context/authContext";

export default function NavbarMobile({ toggleDrawer, setToggleDrawer }) {
  const { user } = useAuth();

  return (
    <div
      className={`${
        toggleDrawer && "brightness-50"
      } flex flex-col bg-[#054902] `}
    >
      <Header user={user} setToogleDrawer={setToggleDrawer} />
      <hr className="mb-2" />
      <div className="mx-2">
        <SearchField />
      </div>
      <hr className="my-1" />
      <CategoryLinksBar />
    </div>
  );
}
