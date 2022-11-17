/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useAuth } from "../../context/authContext";
import { useRouter } from "next/router";

const LoadingSpinner = dynamic(() =>
  import("../../components").then((mod) => mod.LoadingSpinner)
);

import { Navbar, Container, MyHeader, Footer } from "../../components";
import AccountOptionCard from "../../pageComponents/account/accountOptionsCard";
import { auth } from "../../config/firebase";
import { toast } from "react-toastify";

export default function AccountPage() {
  const { user } = useAuth();
  const router = useRouter();

  const accountLinksInfo = [
    {
      icon: "https://images-na.ssl-images-amazon.com/images/G/31/x-locale/cs/ya/images/sign-in-lock._CB485931504_.png",
      name: "Profile",
      href: "/account/profile",
      description: "Edit your information",
    },
    {
      icon: "https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/settings-512.png",
      name: "Settings",
      href: "/account/setting",
      description: "Edit email, password",
    },
    {
      icon: "https://images-na.ssl-images-amazon.com/images/G/31/x-locale/cs/ya/images/address-map-pin._CB485934183_.png",
      name: "Your Addresses",
      href: "/account/address",
      description: "Edit addresses for orders",
    },
    {
      icon: "https://images-na.ssl-images-amazon.com/images/G/31/x-locale/cs/ya/images/address-map-pin._CB485934183_.png",
      name: "Sell",
      href: "/sell",
      description: "Add and Manage products",
    },
    {
      icon: "https://images-na.ssl-images-amazon.com/images/G/31/x-locale/cs/help/images/gateway/self-service/contact_us._CB623781998_.png",
      name: "Contact Us",
      href: "#",
      description: "",
    },
  ];

  if (!user) {
    router.push("/");
    return;
  }
  if (user?.loading) return <LoadingSpinner />;

  async function handleLogoutClick() {
    await auth.signOut();
    toast.success("You Logedout");
  }

  return (
    <section>
      <MyHeader title={"Account"} description="Manage Account" />
      <Navbar />
      <Container>
        <div className="mx-2 lg:mx-24 myLg:mx-48 mt-5 mb-10">
          <button
            className="my-3 hover:text-orange-500"
            onClick={handleLogoutClick}
          >
            Logout
          </button>
          <h4 className="text-3xl ">Your Account</h4>
          <div className="grid grid-cols-12 mt-8 gap-4">
            {accountLinksInfo.map((item) => (
              <div
                key={item.name}
                className="col-span-12 md:col-span-6 lg:col-span-4"
              >
                <AccountOptionCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </Container>
      <Footer />
    </section>
  );
}
