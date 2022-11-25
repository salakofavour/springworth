import React from "react";
import LinkItem from "./linkItem";

import { useAuth } from "../../../context/authContext";
import { auth } from "../../../config/firebase";
import toast from "react-hot-toast";

export default function DrawerLinks() {
  const { user } = useAuth();

  async function handleLogout() {
    await auth.signOut();
    toast.success("you loged out");
  }

  const links = [
    {
      id: 1,
      name: "Home",
      href: "/",
      fun: null,
    },
    {
      id: 2,
      name: "Profile",
      href: user?.name ? "/account/profile" : "/account/signin",
      fun: null,
    },
    {
      id: 3,
      name: "Sell",
      href: user?.name ? "/sell" : "/account/signin",
      fun: null,
    },
    {
      id: 4,
      name: "Chats",
      href: user?.name ? "/chats" : "/account/signin",
      fun: null,
    },
    {
      id: 5,
      name: "Settings",
      href: user?.name ? "/account/setting" : "/account/signin",
      fun: null,
    },
    {
      id: 6,
      name: "Logout",
      href: "#",
      fun: handleLogout,
    },
  ];

  return (
    <div>
      <LinkItem linkItem={links} />
    </div>
  );
}
