import { useState, useContext, createContext } from "react";

const DrawerToggleContext = createContext();

export function DrawerToggleProvider({ children }) {
  const [toggleDrawer, setToggleDrawer] = useState(false);

  return (
    <DrawerToggleContext.Provider value={{ toggleDrawer, setToggleDrawer }}>
      {children}
    </DrawerToggleContext.Provider>
  );
}

export const useDrawer = () => useContext(DrawerToggleContext);
