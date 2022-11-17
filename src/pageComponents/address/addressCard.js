import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { handleAddressDelete } from "../../lib/authFunctions";

export default function AddressCard({ item }) {
  const userAddress = {
    state: item.state,
    city: item.city,
    meetingPlace: item.mettingPlace,
  };

  const router = useRouter();

  async function handleAddressDeleteCick() {
    const status = await handleAddressDelete(item.id);
    if (status) {
      router.reload();
    }
  }

  return (
    <div className=" border rounded-md border-gray-200 w-full ">
      <div>
        <div className={` px-4 py-2 flex flex-col`}>
          <p>State : {userAddress.state}</p>
          <p>City : {userAddress.city}</p>
          <p>MettingPlace : {userAddress.meetingPlace}</p>
        </div>
        <div className="px-4 my-5 ">
          <div className="flex gap-x-4 items-center">
            <Link href={`/account/address/update-address/${item.id}`}>
              <p className="text-blue-500 hover:underline cursor-pointer">
                Edit
              </p>
            </Link>
            <div className="w-[1.6px] h-5 bg-gray-400"></div>
            <p
              onClick={handleAddressDeleteCick}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Remove
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
