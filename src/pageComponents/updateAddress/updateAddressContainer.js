import React, { useState } from "react";
import useSWR from "swr";

import { handleUpdateAddress } from "../../lib/authFunctions";

import { InputField, Navbar, Footer, Container } from "../../components";
import { useRouter } from "next/router";

export default function UpdateAddressContainer({ id, uid }) {
  const [isLoadingSpinner, setLoadingSpinner] = useState(false);
  const router = useRouter();

  async function fetchSingleAddress() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/getAddressByIdApi?uid=${uid}&id=${id}`
    );
    return res.json();
  }

  const { data } = useSWR(id, fetchSingleAddress);

  if (!data)
    return (
      <div className=" h-screen w-full flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );

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

  async function handleUpdateClick(data) {
    setLoadingSpinner(true);
    const status = await handleUpdateAddress(id, data);
    setLoadingSpinner(false);
    if (status) router.push("/account/address");
  }

  return (
    <div>
      <div>
        <Navbar />
        <Container>
          <div className="mx-2 lg:mx-80 mt-5">
            <div className="mt-6 mb-20 flex flex-col lg:w-4/5">
              <p className="text-3xl font-semibold">Update Address</p>
              <div className="flex justify-between w-full gap-4 mt-5 flex-wrap">
                <InputField
                  isLoadingSpinner={isLoadingSpinner}
                  handleClick={handleUpdateClick}
                  buttonText={"Update address"}
                  fields={fields}
                  defaulValue={{
                    ...data.address,
                  }}
                />
              </div>
            </div>
          </div>
        </Container>
        <Footer />
      </div>
    </div>
  );
}
