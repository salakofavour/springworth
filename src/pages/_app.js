import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { AuthContextProvider } from "../context/authContext";
import { CartProvider } from "react-use-cart";
import { DrawerToggleProvider } from "../context/drawerToggleState";
import { Toaster } from "react-hot-toast";

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
          <Toaster gutter={5} />
          <Component {...pageProps} />
        </DrawerToggleProvider>
      </CartProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
