/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useAuth } from "../../../context/authContext";
import { LoadingSpinner, MyHeader } from "../../../components";
import { useRouter } from "next/router";
import Link from "next/link";

import { Navbar, Container, Footer } from "../../../components";
import AddAddressCard from "../../../pageComponents/address/addAddressCard";
import AddressCardContainer from "../../../pageComponents/address/addressCardContainer";

export default function AddressPage() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push("/");
    return;
  }

  if (user?.loading) return <LoadingSpinner />;

  function NavigationLinks() {
    return (
      <div className="flex gap-x-2 mt-5">
        <Link href={"/account"}>
          <p className="cursor-pointer hover:underline text-blue-700">
            Your Account
          </p>
        </Link>
        <p className="font-medium">{">"}</p>
        <p className=" text-orange-500 cursor-pointer">Your Address</p>
      </div>
    );
  }

  return (
    <main>
      <MyHeader title={"Address"} />
      <Navbar />
      <Container>
        <div className="mx-2  mr-2 lg:mx-36 lg:mr-48 my-4 ">
          <NavigationLinks />
          <h4 className="text-3xl mt-5">Your Addresses</h4>
          <div className="grid grid-cols-12 gap-y-4 mt-8 lg:gap-x-5">
            <div className="col-span-12 lg:col-span-4 w-full">
              <AddAddressCard />
            </div>
            <AddressCardContainer uid={user.uid} />
          </div>
        </div>
      </Container>
      <Footer />
    </main>
  );
}
