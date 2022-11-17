import React from "react";
import Image from "next/image";
import { PlusIcon } from "@heroicons/react/24/outline";
import UserSubscriptionInfo from "./userSubscriptionInfo";

export default function UserSellingProfileCard({ user, setOpenModal }) {
  const subscription = user?.subscription;
  const subscriptionStatus = subscription?.status;

  const status = subscriptionStatus === "active" ? true : false;

  async function handlePremiumClick() {
    const data = await (
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/stripe/create-subscription?userId=${user.uid}`
      )
    ).json();
    window.open(data);
  }

  async function handleManageClick() {
    const { data } = await (
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/stripe/customer-portal?id=${user.uid}`
      )
    ).json();

    window.open(data);
  }

  return (
    <div className="flex flex-wrap lg:w-[80%] myLg:w-[80%] gap-x-10 gap-y-3 items-start justify-between rounded-md  border border-gray-200 px-5 py-3">
      <div className="flex flex-col gap-y-2  items-start">
        <div className="relative w-20 h-20">
          <Image
            fill
            sizes="10vh"
            className="w-full h-full rounded-full object-cover"
            alt="user-profile"
            src={user?.imgUrl}
          />
        </div>
        <p>{user.name}</p>
        <div>
          <p className=" bg-black/70  text-white  rounded-lg px-2">
            {status ? "Premium Account" : "Free Account"}
          </p>
        </div>
        <div>
          <button
            onClick={status ? handleManageClick : handlePremiumClick}
            className=" bg-orange-500 hover:bg-orange-400 text-white  rounded-md py-1 px-2"
          >
            {status ? "Manage Subscription" : "Subscribe To Premium"}
          </button>
        </div>
        {!status && <p className="text-[13px]">Monthly - $5.99</p>}

        {status && <UserSubscriptionInfo subscription={subscription} />}
      </div>

      <div className="flex flex-col lg:items-end gap-y-1">
        <div>
          <button
            onClick={() => setOpenModal(true)}
            className="flex gap-x-1 h rounded-md px-2 items-center bg-orange-500 hover:bg-orange-400 text-white"
          >
            <PlusIcon className="w-8" />
            <p>Add Product</p>
          </button>
        </div>
        {!status && (
          <p className="text-[13px] text-gray-500">
            Free users can only upload 3 products
          </p>
        )}
      </div>
    </div>
  );
}
