import Link from "next/link";
import React from "react";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function AddAddressCard() {
  return (
    <Link href={"/account/address/add-new-address"}>
      <div className="w-full cursor-pointer h-64 border-spacing-10 rounded-md  border-dotted border-4">
        <div className="flex flex-col h-full justify-center items-center">
          <PlusIcon className="w-14 text-gray-500" />
          <p className="text-2xl font-medium text-gray-600">Add address</p>
        </div>
      </div>
    </Link>
  );
}
