import React from "react";
import useSWR from "swr";
import AddressCard from "../../pageComponents/address/addressCard";

export default function AddressCardContainer({ uid }) {
  async function fetchAllUserAddress() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/getAllAddressApi?uId=${uid}`
    );
    return res.json();
  }

  const { data } = useSWR(["allAddress"], fetchAllUserAddress);

  if (!data) return <div>Loading...</div>;

  return (
    <>
      {data.allAddress.map((item) => (
        <div key={item.id} className="col-span-12 lg:col-span-4 w-full">
          <AddressCard item={item} />
        </div>
      ))}
    </>
  );
}
