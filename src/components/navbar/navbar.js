import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useMediaQuery } from "react-responsive";
import { useDrawer } from "../../context/drawerToggleState";

// Dynamics import components
const NavbarDesktop = dynamic(() => import("./navbar-desktop/navbarDesktop"));
const NavbarMobile = dynamic(() => import("./navbar-mobile/navbarMobile"));
import Drawer from "./darwer/darwer";

export default function Navbar() {
  // checking device sizes
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 900px)" });

  // Local States

  const { toggleDrawer, setToggleDrawer } = useDrawer();

  useEffect(() => {
    toggleDrawer
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [toggleDrawer]);

  return (
    <div>
      {isTabletOrMobile ? (
        <NavbarMobile
          toggleDrawer={toggleDrawer}
          setToggleDrawer={setToggleDrawer}
        />
      ) : (
        <NavbarDesktop setToggleDrawer={setToggleDrawer} />
      )}
      {toggleDrawer && <Drawer setToggleDrawer={setToggleDrawer} />}
    </div>
  );
}
