/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/authContext";
import {
  Navbar,
  Footer,
  Container,
  LoadingSpinner,
  InputField,
  MyHeader,
} from "../../../components";
import { useRouter } from "next/router";

import { handleAddNewAddress } from "../../../lib/authFunctions";
import Link from "next/link";

export default function AddNewAddress() {
  const { user } = useAuth();
  const [isLoadingSpinner, setLoadingSpinner] = useState(false);
  const router = useRouter();

  if (user === null) {
    router.push("/");
    return;
  }

  if (user?.loading) return <LoadingSpinner />;

  const fields = [
    {
      type: "text",
      label: "State",
      name: "state",
      minLength: 3,
    },
    {
      type: "text",
      label: "City",
      name: "city",
      minLength: 3,
    },
    {
      type: "text",
      placeholder: "public places near you like malls, Cafe, school etc",
      label: "Meeting place",
      name: "mettingPlace",
      minLength: 5,
    },
  ];

  async function handleSubmitClick(data) {
    setLoadingSpinner(true);
    const status = await handleAddNewAddress(data);
    setLoadingSpinner(false);
    if (status) router.push("/account/address");
  }

  return (
    <main>
      <MyHeader title={"Add Address"} />
      <Navbar />
      <Container>
        <div className="mx-2 lg:mx-80 mt-5">
          <NavigationLinks />
          <div className="mt-6  mb-20 flex flex-col lg:w-4/5">
            <h1 className="text-3xl font-semibold">Add a new address</h1>
            <InputField
              isLoadingSpinner={isLoadingSpinner}
              buttonText={"Add address"}
              handleClick={handleSubmitClick}
              fields={fields}
            />
          </div>
        </div>
      </Container>
      <Footer />
    </main>
  );
}

function NavigationLinks() {
  return (
    <div className="flex gap-x-2 mt-5">
      <Link href={"/account/address"}>
        <p className="cursor-pointer hover:underline text-blue-700">
          Your Address
        </p>
      </Link>
      <p className="font-medium">{">"}</p>
      <p className=" text-orange-500 cursor-pointer">New Address</p>
    </div>
  );
}
