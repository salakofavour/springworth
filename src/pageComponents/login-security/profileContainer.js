import Link from "next/link";
import React, { useState } from "react";

import { Navbar, Footer, Container } from "../../components";
import UserInfoCard from "./userInfoCard";

export default function ProfileContainer({
  userData,
  setToggleModal,
  setTabIndex,
}) {
  function NavigationLinks() {
    return (
      <div className="flex gap-x-2 mt-5 text-[13px] lg:text-[15px]">
        <Link href={"/account"}>
          <p className="cursor-pointer hover:underline text-blue-700">
            Your Account
          </p>
        </Link>
        <p className="font-medium">{">"}</p>

        <p className=" text-orange-500 cursor-pointer">Profile</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Container>
        <div className="mx-4 mb-5 lg:mx-36 myLg:mx-72">
          <NavigationLinks />
          <div className="mt-4">
            <h4 className="text-3xl">Profile</h4>
            <div className="mt-5 rounded-md border border-gray-500  w-full lg:w-10/12">
              {userData.map((item, i) => (
                <UserInfoCard
                  key={item.value}
                  i={i}
                  data={item}
                  setTabIndex={setTabIndex}
                  setToggleModal={setToggleModal}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
