import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { AuthContextProvider } from "../context/authContext";
import { CartProvider } from "react-use-cart";
import { DrawerToggleProvider } from "../context/drawerToggleState";

function MyApp({ Component, pageProps }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  return (
    <AuthContextProvider>
      <CartProvider>
        <DrawerToggleProvider>
          <ToastContainer />
          <Component {...pageProps} />
        </DrawerToggleProvider>
      </CartProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
